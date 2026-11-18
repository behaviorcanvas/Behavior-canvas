import React, { useState, useEffect } from 'react';
import {
  X,
  CheckCircle2,
  Download,
  ShieldCheck,
  Lock,
  ArrowRight,
  CreditCard,
  QrCode,
  Copy,
  Check,
  LogIn,
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { usePlatform } from '../contexts/PlatformContext';
import { ProductItem } from '../data/products';

export interface CheckoutItem {
  itemType: 'product' | 'programme' | 'workshop';
  id: string;
  title: string;
  subtitle?: string;
  priceINR: number;
  priceUSD: number;
  productRef?: ProductItem;
}

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: ProductItem | null;
  checkoutItem?: CheckoutItem | null;
  currency: 'USD' | 'INR';
  onCurrencyChange?: (c: 'USD' | 'INR') => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  product,
  checkoutItem,
  currency: initialCurrency = 'INR',
  onCurrencyChange,
}) => {
  const { user, signInWithGoogle } = useAuth();
  const {
    siteSettings,
    validateCoupon,
    createPendingOrder,
    attachPaymentVerification,
    createInitialEnrolment,
  } = usePlatform();

  const activeItem: CheckoutItem | null = checkoutItem
    ? checkoutItem
    : product
    ? {
        itemType: 'product',
        id: product.id,
        title: product.title,
        subtitle: product.format,
        priceINR: product.priceINR,
        priceUSD: product.priceUSD,
        productRef: product,
      }
    : null;

  const [currency, setCurrency] = useState<'USD' | 'INR'>(initialCurrency);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [gateway, setGateway] = useState<'razorpay' | 'stripe' | 'upi_manual'>(
    siteSettings.activeGateway || 'razorpay'
  );
  const [step, setStep] = useState<'details' | 'gateway_pay' | 'processing' | 'confirmed'>('details');
  const [agreedTerms, setAgreedTerms] = useState(false);
  const [couponCode, setCouponCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState<{
    type: 'percent' | 'fixed_inr';
    value: number;
    code: string;
  } | null>(null);
  const [couponMsg, setCouponMsg] = useState<{ text: string; isError: boolean } | null>(null);

  const [utrRef, setUtrRef] = useState('');
  const [copiedUpi, setCopiedUpi] = useState(false);
  const [gatewayOrderId, setGatewayOrderId] = useState('');
  const [orderCode, setOrderCode] = useState('');
  const [orderDocId, setOrderDocId] = useState('');
  const [downloadToken, setDownloadToken] = useState('');
  const [verifiedTxId, setVerifiedTxId] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    setCurrency(initialCurrency);
  }, [initialCurrency]);

  useEffect(() => {
    if (user) {
      if (!name) setName(user.displayName || '');
      if (!email) setEmail(user.email || '');
    }
  }, [user]);

  useEffect(() => {
    setGateway(siteSettings.activeGateway || 'razorpay');
  }, [siteSettings.activeGateway]);

  if (!isOpen || !activeItem) return null;

  const baseAmount = currency === 'INR' ? activeItem.priceINR : activeItem.priceUSD;
  let finalAmount = baseAmount;
  if (appliedDiscount) {
    if (appliedDiscount.type === 'percent') {
      finalAmount = Math.max(0, baseAmount - (baseAmount * appliedDiscount.value) / 100);
    } else if (currency === 'INR') {
      finalAmount = Math.max(0, baseAmount - appliedDiscount.value);
    }
    finalAmount = currency === 'INR' ? Math.round(finalAmount) : Number(finalAmount.toFixed(2));
  }

  const symbol = currency === 'INR' ? '₹' : '$';
  const upiId = siteSettings.upiId || 'behaviorcanvas@okhdfcbank';
  const payee = siteSettings.payeeName || 'The Behavior Canvas';
  const inrFinal =
    currency === 'INR'
      ? finalAmount
      : Math.max(0, Math.round(activeItem.priceINR * (finalAmount / Math.max(1, baseAmount))));
  const upiUrl = `upi://pay?pa=${upiId}&pn=${encodeURIComponent(payee)}&am=${inrFinal}&cu=INR&tn=${encodeURIComponent(activeItem.title.slice(0, 24))}`;
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=240x240&margin=6&data=${encodeURIComponent(upiUrl)}`;

  const handleApplyCoupon = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponCode.trim()) return;
    const found = await validateCoupon(couponCode);
    if (!found) {
      setCouponMsg({ text: 'Coupon code is invalid or expired.', isError: true });
      return;
    }
    setAppliedDiscount({
      type: found.discountType,
      value: found.value,
      code: found.code,
    });
    setCouponMsg({
      text:
        found.discountType === 'percent'
          ? `${found.code} applied (${found.value}% off)`
          : `${found.code} applied (₹${found.value} off INR)`,
      isError: false,
    });
  };

  const handleStartOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!user || !user.emailVerified) {
      setErrorMsg('Please sign in with Google below so your order & access link are saved securely to your Learner Portal.');
      return;
    }
    if (!name.trim() || !email.trim()) {
      setErrorMsg('Please enter your full name and email address.');
      return;
    }
    if (!agreedTerms) {
      setErrorMsg('Please confirm the Digital Product Terms and Cancellation/Refund Policy.');
      return;
    }

    setStep('processing');
    try {
      const code = `BC-${Date.now().toString().slice(-6)}`;
      setOrderCode(code);

      // 1. Create pending order in Firestore
      const createdOrder = await createPendingOrder({
        orderCode: code,
        userId: user.uid,
        itemType: activeItem.itemType,
        itemId: activeItem.id,
        itemTitle: activeItem.title,
        customerName: name.trim(),
        customerEmail: email.trim(),
        amount: finalAmount,
        currency,
        couponApplied: appliedDiscount?.code,
        gateway,
        paymentStatus: 'pending',
      });
      setOrderDocId(createdOrder.id);

      // Free resource/programme fast path
      if (finalAmount === 0) {
        const verifyRes = await fetch('/api/payments/verify', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            orderCode: code,
            itemId: activeItem.id,
            customerEmail: email.trim(),
            gateway,
            mode: 'test',
            transactionReference: `FREE_${code}`,
          }),
        });
        const verifiedData = await verifyRes.json();
        await attachPaymentVerification(createdOrder.id, {
          gateway,
          transactionId: verifiedData.transactionId || `FREE_${code}`,
          gatewayOrderId: verifiedData.gatewayOrderId,
          downloadToken: verifiedData.downloadToken,
        });
        if (activeItem.itemType === 'programme' || activeItem.itemType === 'workshop') {
          await createInitialEnrolment({
            userId: user.uid,
            learnerName: name.trim(),
            learnerEmail: email.trim(),
            itemType: activeItem.itemType,
            itemId: activeItem.id,
            itemTitle: activeItem.title,
            orderId: createdOrder.id,
          });
        }
        setVerifiedTxId(verifiedData.transactionId);
        setDownloadToken(verifiedData.downloadToken);
        setStep('confirmed');
        return;
      }

      // 2. Request server-side gateway order creation
      const orderRes = await fetch('/api/payments/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orderCode: code,
          amount: finalAmount,
          currency,
          gateway,
          mode: siteSettings.gatewayMode || 'test',
          itemTitle: activeItem.title,
        }),
      });
      const orderData = await orderRes.json();
      if (!orderRes.ok) {
        throw new Error(orderData?.error || 'Unable to create payment gateway order.');
      }

      const resolvedOrderId = orderData.gatewayOrderId || code;
      setGatewayOrderId(resolvedOrderId);

      // 3. If Razorpay live mode is active and a live Razorpay order was created, invoke Checkout.js
      if (
        gateway === 'razorpay' &&
        siteSettings.gatewayMode === 'live' &&
        orderData.liveOrderCreated &&
        orderData.razorpayKeyId
      ) {
        const loaded = await new Promise<boolean>((resolve) => {
          if ((window as any).Razorpay) return resolve(true);
          const script = document.createElement('script');
          script.src = 'https://checkout.razorpay.com/v1/checkout.js';
          script.onload = () => resolve(true);
          script.onerror = () => resolve(false);
          document.body.appendChild(script);
        });

        if (loaded && (window as any).Razorpay) {
          const rzp = new (window as any).Razorpay({
            key: orderData.razorpayKeyId,
            amount: orderData.amount,
            currency: orderData.currency || currency,
            name: 'The Behavior Canvas',
            description: activeItem.title,
            order_id: resolvedOrderId,
            prefill: {
              name: name.trim(),
              email: email.trim(),
            },
            theme: { color: '#514458' },
            handler: async (rzpResponse: {
              razorpay_order_id: string;
              razorpay_payment_id: string;
              razorpay_signature: string;
            }) => {
              setStep('processing');
              try {
                const verifyRes = await fetch('/api/payments/verify', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({
                    orderCode: code,
                    itemId: activeItem.id,
                    customerEmail: email.trim(),
                    gateway: 'razorpay',
                    mode: 'live',
                    razorpay_order_id: rzpResponse.razorpay_order_id,
                    razorpay_payment_id: rzpResponse.razorpay_payment_id,
                    razorpay_signature: rzpResponse.razorpay_signature,
                  }),
                });
                const verifyData = await verifyRes.json();
                if (!verifyRes.ok || !verifyData.verified) {
                  throw new Error(verifyData?.error || 'Razorpay signature verification failed.');
                }
                await attachPaymentVerification(createdOrder.id, {
                  gateway: 'razorpay',
                  gatewayOrderId: verifyData.gatewayOrderId || rzpResponse.razorpay_order_id,
                  transactionId: verifyData.transactionId || rzpResponse.razorpay_payment_id,
                  downloadToken: verifyData.downloadToken,
                });
                if (activeItem.itemType === 'programme' || activeItem.itemType === 'workshop') {
                  await createInitialEnrolment({
                    userId: user.uid,
                    learnerName: name.trim(),
                    learnerEmail: email.trim(),
                    itemType: activeItem.itemType,
                    itemId: activeItem.id,
                    itemTitle: activeItem.title,
                    orderId: createdOrder.id,
                  });
                }
                setVerifiedTxId(verifyData.transactionId);
                setDownloadToken(verifyData.downloadToken);
                setStep('confirmed');
              } catch (err: any) {
                setErrorMsg(err?.message || 'Payment verification failed.');
                setStep('gateway_pay');
              }
            },
            modal: {
              ondismiss: () => {
                setStep('gateway_pay');
              },
            },
          });
          rzp.open();
          return;
        }
      }

      setStep('gateway_pay');
    } catch (err: any) {
      setErrorMsg(err?.message || 'Unable to initiate checkout.');
      setStep('details');
    }
  };

  const handleVerifyAndComplete = async () => {
    setErrorMsg('');
    if (gateway === 'upi_manual' && utrRef.trim().length < 6) {
      setErrorMsg('Please enter your valid UPI / UTR reference (at least 6 characters).');
      return;
    }

    setStep('processing');
    try {
      const res = await fetch('/api/payments/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orderCode,
          itemId: activeItem.id,
          customerEmail: email.trim(),
          gateway,
          mode: siteSettings.gatewayMode || 'test',
          razorpay_order_id: gatewayOrderId,
          transactionReference:
            utrRef.trim() || `SANDBOX_${gateway.toUpperCase()}_${orderCode}`,
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.verified) {
        throw new Error(data.error || 'Payment verification failed.');
      }

      await attachPaymentVerification(orderDocId, {
        gateway,
        gatewayOrderId: data.gatewayOrderId || gatewayOrderId,
        transactionId: data.transactionId,
        downloadToken: data.downloadToken,
      });

      if (activeItem.itemType === 'programme' || activeItem.itemType === 'workshop') {
        await createInitialEnrolment({
          userId: user!.uid,
          learnerName: name.trim(),
          learnerEmail: email.trim(),
          itemType: activeItem.itemType,
          itemId: activeItem.id,
          itemTitle: activeItem.title,
          orderId: orderDocId,
        });
      }

      setVerifiedTxId(data.transactionId);
      setDownloadToken(data.downloadToken);
      setStep('confirmed');
    } catch (err: any) {
      setErrorMsg(err?.message || 'Verification could not be completed.');
      setStep('gateway_pay');
    }
  };

  const resetAndClose = () => {
    setStep('details');
    setErrorMsg('');
    setUtrRef('');
    setCouponMsg(null);
    setAppliedDiscount(null);
    setCouponCode('');
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#514458]/55 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
    >
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-[#514458]/10 overflow-hidden max-h-[92vh] flex flex-col">
        <div className="flex items-center justify-between px-6 py-4 bg-[#F8F5EF] border-b border-[#514458]/10">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#F4E4ED] flex items-center justify-center text-[#514458]">
              <Lock className="w-4 h-4" />
            </div>
            <div>
              <h2 className="font-serif text-base font-semibold text-[#514458]">
                Checkout & Enrolment
              </h2>
              <p className="text-[11px] text-[#6E6474]">
                The Behavior Canvas · {siteSettings.gatewayMode === 'live' ? 'Live Gateway' : 'Sandbox / Test Mode Ready'}
              </p>
            </div>
          </div>
          <button
            onClick={resetAndClose}
            className="p-1.5 rounded-lg text-[#6E6474] hover:text-[#514458] cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto">
          {step === 'processing' && (
            <div className="py-12 text-center space-y-4">
              <div className="w-10 h-10 mx-auto rounded-full border-2 border-[#514458] border-t-transparent animate-spin" />
              <p className="text-sm font-medium text-[#514458]">
                Verifying payment & issuing your secure access...
              </p>
            </div>
          )}

          {step === 'gateway_pay' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-[#F8F5EF] border border-[#514458]/10 text-center space-y-1">
                <p className="text-xs text-[#6E6474]">Order {orderCode}</p>
                <p className="font-serif text-2xl font-semibold text-[#514458]">
                  {symbol}
                  {finalAmount.toLocaleString()} {currency}
                </p>
                <p className="text-xs text-[#6E6474]">{activeItem.title}</p>
              </div>

              {gateway === 'upi_manual' || gateway === 'razorpay' ? (
                <div className="p-4 rounded-xl border border-[#514458]/10 bg-white space-y-3 text-center">
                  {gateway === 'razorpay' && siteSettings.gatewayMode === 'test' && (
                    <p className="text-xs bg-[#E9E1F4]/60 text-[#514458] p-2.5 rounded-lg">
                      Razorpay Test Mode Active ({gatewayOrderId}). You can simulate test verification below or scan UPI QR directly.
                    </p>
                  )}
                  <img
                    src={qrUrl}
                    alt="UPI Payment QR"
                    className="w-44 h-44 mx-auto rounded-xl border border-[#514458]/10"
                  />
                  <div className="flex items-center justify-between p-2.5 bg-[#F8F5EF] rounded-xl text-xs">
                    <span className="font-mono text-[#514458]">{upiId}</span>
                    <button
                      type="button"
                      onClick={() => {
                        navigator.clipboard?.writeText(upiId);
                        setCopiedUpi(true);
                        setTimeout(() => setCopiedUpi(false), 1800);
                      }}
                      className="flex items-center gap-1 px-2.5 py-1 bg-white rounded-lg border border-[#514458]/15 text-[#514458] cursor-pointer"
                    >
                      {copiedUpi ? <Check className="w-3.5 h-3.5 text-emerald-700" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedUpi ? 'Copied' : 'Copy UPI'}</span>
                    </button>
                  </div>
                  <div className="text-left">
                    <label className="block text-xs font-medium text-[#514458] mb-1">
                      Transaction / UTR Reference {gateway === 'upi_manual' ? '*' : '(Optional in Sandbox)'}
                    </label>
                    <input
                      type="text"
                      value={utrRef}
                      onChange={(e) => setUtrRef(e.target.value)}
                      placeholder="e.g. 418290184712"
                      className="w-full px-3 py-2 text-xs rounded-lg border border-[#514458]/20 font-mono"
                    />
                  </div>
                </div>
              ) : (
                <div className="p-4 rounded-xl border border-[#514458]/10 bg-[#F8F5EF] space-y-2 text-xs text-[#514458]">
                  <p className="font-semibold">Stripe Sandbox Session ({gatewayOrderId})</p>
                  <p className="text-[#6E6474]">
                    Verify transaction below to unlock your resource in your Learner Portal.
                  </p>
                </div>
              )}

              {errorMsg && <p className="text-xs text-rose-600">{errorMsg}</p>}

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setStep('details')}
                  className="px-4 py-2.5 text-xs font-medium text-[#6E6474] hover:text-[#514458] cursor-pointer"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={handleVerifyAndComplete}
                  className="flex-1 py-3 px-4 bg-[#514458] hover:bg-[#3f3445] text-white text-xs font-semibold rounded-xl flex items-center justify-center gap-2 cursor-pointer"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Complete Verification & Unlock Access</span>
                </button>
              </div>
            </div>
          )}

          {step === 'confirmed' && (
            <div className="py-4 text-center space-y-4">
              <div className="w-12 h-12 mx-auto rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <h3 className="font-serif text-xl font-semibold text-[#514458]">
                {activeItem.itemType === 'product' ? 'Resource Unlocked' : 'Registration Recorded'}
              </h3>
              <p className="text-xs text-[#6E6474] leading-relaxed">
                Order <strong className="text-[#514458]">{orderCode}</strong> ({verifiedTxId}) has been saved to your Student & Learner Portal.
              </p>

              {downloadToken && (
                <a
                  href={`/api/downloads/resource?token=${encodeURIComponent(downloadToken)}&title=${encodeURIComponent(activeItem.title)}${
                    activeItem.productRef?.downloadPath?.startsWith('https://')
                      ? `&fileUrl=${encodeURIComponent(activeItem.productRef.downloadPath)}`
                      : ''
                  }`}
                  className="w-full py-3 px-4 bg-[#514458] hover:bg-[#3f3445] text-white text-xs font-semibold rounded-xl flex items-center justify-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Verified Resource Packet</span>
                </a>
              )}

              <button
                type="button"
                onClick={resetAndClose}
                className="px-5 py-2 text-xs text-[#6E6474] hover:text-[#514458] cursor-pointer"
              >
                Close
              </button>
            </div>
          )}

          {step === 'details' && (
            <form onSubmit={handleStartOrder} className="space-y-4">
              <div className="p-4 rounded-xl bg-[#F8F5EF] border border-[#514458]/10 flex items-center justify-between gap-3">
                <div>
                  <h4 className="text-sm font-semibold text-[#514458]">{activeItem.title}</h4>
                  {activeItem.subtitle && (
                    <p className="text-xs text-[#6E6474] mt-0.5">{activeItem.subtitle}</p>
                  )}
                </div>
                <div className="text-right shrink-0">
                  <span className="text-base font-bold text-[#514458]">
                    {finalAmount === 0 ? 'Free' : `${symbol}${finalAmount.toLocaleString()}`}
                  </span>
                  {onCurrencyChange && (
                    <div className="flex gap-1 mt-1 justify-end">
                      {(['INR', 'USD'] as const).map((c) => (
                        <button
                          key={c}
                          type="button"
                          onClick={() => {
                            setCurrency(c);
                            onCurrencyChange(c);
                          }}
                          className={`px-2 py-0.5 text-[10px] rounded cursor-pointer ${
                            currency === c ? 'bg-[#514458] text-white' : 'bg-white text-[#6E6474]'
                          }`}
                        >
                          {c}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {!user ? (
                <div className="p-4 rounded-xl bg-[#F4E4ED]/60 border border-[#514458]/15 space-y-2.5">
                  <p className="text-xs font-medium text-[#514458]">
                    Sign in with Google to attach this purchase & unlock permanent access in your Learner Portal:
                  </p>
                  <button
                    type="button"
                    onClick={() => signInWithGoogle()}
                    className="w-full py-2.5 px-4 bg-[#514458] text-white text-xs font-semibold rounded-xl flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <LogIn className="w-4 h-4" />
                    <span>Continue with Google Sign-In</span>
                  </button>
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-[#514458] mb-1">Full Name</label>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-3 py-2 text-xs rounded-xl border border-[#514458]/15"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-[#514458] mb-1">Email</label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-3 py-2 text-xs rounded-xl border border-[#514458]/15"
                      />
                    </div>
                  </div>

                  {finalAmount > 0 && (
                    <div>
                      <label className="block text-xs font-medium text-[#514458] mb-1.5">
                        Payment Method
                      </label>
                      <div className="grid grid-cols-3 gap-2">
                        {siteSettings.razorpayEnabled && (
                          <button
                            type="button"
                            onClick={() => setGateway('razorpay')}
                            className={`p-2.5 rounded-xl border text-left text-xs cursor-pointer ${
                              gateway === 'razorpay'
                                ? 'border-[#514458] bg-[#F4E4ED]/50 font-semibold'
                                : 'border-[#514458]/10'
                            }`}
                          >
                            <QrCode className="w-3.5 h-3.5 mb-1 text-[#514458]" />
                            Razorpay
                          </button>
                        )}
                        {siteSettings.stripeEnabled && (
                          <button
                            type="button"
                            onClick={() => setGateway('stripe')}
                            className={`p-2.5 rounded-xl border text-left text-xs cursor-pointer ${
                              gateway === 'stripe'
                                ? 'border-[#514458] bg-[#F4E4ED]/50 font-semibold'
                                : 'border-[#514458]/10'
                            }`}
                          >
                            <CreditCard className="w-3.5 h-3.5 mb-1 text-[#514458]" />
                            Stripe Cards
                          </button>
                        )}
                        {siteSettings.upiEnabled && (
                          <button
                            type="button"
                            onClick={() => setGateway('upi_manual')}
                            className={`p-2.5 rounded-xl border text-left text-xs cursor-pointer ${
                              gateway === 'upi_manual'
                                ? 'border-[#514458] bg-[#F4E4ED]/50 font-semibold'
                                : 'border-[#514458]/10'
                            }`}
                          >
                            <QrCode className="w-3.5 h-3.5 mb-1 text-[#514458]" />
                            Direct UPI
                          </button>
                        )}
                      </div>
                    </div>
                  )}

                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      placeholder="Coupon code (optional)"
                      className="flex-1 px-3 py-2 text-xs rounded-xl border border-[#514458]/15 uppercase"
                    />
                    <button
                      type="button"
                      onClick={handleApplyCoupon}
                      className="px-3.5 py-2 text-xs font-medium bg-[#F8F5EF] border border-[#514458]/15 rounded-xl text-[#514458] cursor-pointer"
                    >
                      Apply
                    </button>
                  </div>
                  {couponMsg && (
                    <p className={`text-xs ${couponMsg.isError ? 'text-rose-600' : 'text-emerald-700'}`}>
                      {couponMsg.text}
                    </p>
                  )}

                  <label className="flex items-start gap-2.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={agreedTerms}
                      onChange={(e) => setAgreedTerms(e.target.checked)}
                      className="mt-0.5 w-4 h-4 rounded border-[#514458]/30 text-[#514458]"
                    />
                    <span className="text-[11px] text-[#6E6474] leading-relaxed">
                      I agree to the Single-User Digital Product Terms & Cancellation/Refund Policy.
                    </span>
                  </label>
                </>
              )}

              {errorMsg && <p className="text-xs text-rose-600">{errorMsg}</p>}

              <div className="pt-3 flex items-center justify-between border-t border-[#514458]/10">
                <span className="flex items-center gap-1.5 text-[11px] text-[#6E6474]">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
                  Server-verified checkout
                </span>
                {user && (
                  <button
                    type="submit"
                    className="px-5 py-2.5 text-xs font-semibold text-white bg-[#514458] hover:bg-[#3f3445] rounded-xl flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>{finalAmount === 0 ? 'Confirm Access' : 'Continue to Payment'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
