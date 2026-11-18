import React, { useState } from 'react';
import { ShieldCheck, Search, CheckCircle2, AlertTriangle, XCircle } from 'lucide-react';
import { usePlatform } from '../contexts/PlatformContext';
import { CertificateRecord } from '../types';

export const VerifyCertificatePage: React.FC = () => {
  const { verifyCertificateById } = usePlatform();
  const [certInput, setCertInput] = useState('');
  const [searching, setSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [result, setResult] = useState<CertificateRecord | null>(null);
  const [errorMsg, setErrorMsg] = useState('');

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!certInput.trim()) return;
    setSearching(true);
    setHasSearched(false);
    setErrorMsg('');
    try {
      const record = await verifyCertificateById(certInput);
      setResult(record);
      setHasSearched(true);
    } catch (err: any) {
      setErrorMsg(err?.message || 'Unable to verify certificate right now.');
    } finally {
      setSearching(false);
    }
  };

  return (
    <div className="bg-[#F8F5EF] py-14 lg:py-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-[#E9E1F4] text-[#514458] flex items-center justify-center mx-auto">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-[#514458]">
            Certificate Verification
          </h1>
          <p className="text-sm sm:text-base text-[#6E6474] max-w-xl mx-auto leading-relaxed">
            Enter a unique Certificate ID issued by The Behavior Canvas – Academy of Behavioural Science to verify its authenticity and status.
          </p>
        </div>

        <form
          onSubmit={handleVerify}
          className="bg-white p-6 sm:p-8 rounded-2xl border border-[#514458]/10 shadow-xs space-y-4"
        >
          <label className="block text-xs font-semibold uppercase tracking-wider text-[#6E6474]">
            Certificate ID
          </label>
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-[#6E6474] absolute left-3.5 top-3.5" />
              <input
                type="text"
                value={certInput}
                onChange={(e) => setCertInput(e.target.value)}
                placeholder="e.g. BC-ACAD-2026-001"
                className="w-full pl-10 pr-4 py-3 text-sm rounded-xl border border-[#514458]/20 text-[#514458] uppercase font-mono focus:outline-hidden focus:border-[#514458]"
              />
            </div>
            <button
              type="submit"
              disabled={searching}
              className="px-6 py-3 bg-[#514458] hover:bg-[#3f3445] text-white text-xs font-semibold rounded-xl cursor-pointer disabled:opacity-50"
            >
              {searching ? 'Checking...' : 'Verify Certificate'}
            </button>
          </div>
          {errorMsg && <p className="text-xs text-rose-600">{errorMsg}</p>}
        </form>

        {hasSearched && result && (
          <div className="bg-white p-8 rounded-2xl border border-[#514458]/15 shadow-xs space-y-5">
            <div className="flex items-center justify-between pb-4 border-b border-[#514458]/10">
              <div className="flex items-center gap-2.5">
                {result.verificationStatus === 'valid' ? (
                  <CheckCircle2 className="w-6 h-6 text-emerald-700" />
                ) : (
                  <XCircle className="w-6 h-6 text-rose-600" />
                )}
                <span className="font-serif text-xl font-semibold text-[#514458]">
                  {result.verificationStatus === 'valid'
                    ? 'Verified Authentic Certificate'
                    : 'Certificate Revoked'}
                </span>
              </div>
              <span className="font-mono text-xs text-[#6E6474]">{result.certificateId}</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-xs text-[#6E6474] block">Learner Name</span>
                <strong className="text-[#514458]">{result.learnerName}</strong>
              </div>
              <div>
                <span className="text-xs text-[#6E6474] block">Certificate Type</span>
                <strong className="text-[#514458]">{result.certificateType}</strong>
              </div>
              <div>
                <span className="text-xs text-[#6E6474] block">Programme / Workshop</span>
                <strong className="text-[#514458]">{result.programmeTitle}</strong>
              </div>
              <div>
                <span className="text-xs text-[#6E6474] block">Issue Date</span>
                <strong className="text-[#514458]">{result.issueDate}</strong>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#F8F5EF] border border-[#514458]/10 text-xs text-[#6E6474] leading-relaxed">
              This independent educational certificate verifies participation or completion within The Behavior Canvas – Academy of Behavioural Science. It does not grant clinical licensure, QABA board certification, or statutory university accreditation.
            </div>
          </div>
        )}

        {hasSearched && !result && (
          <div className="bg-white p-8 rounded-2xl border border-[#514458]/10 text-center space-y-2">
            <AlertTriangle className="w-7 h-7 text-amber-600 mx-auto" />
            <h2 className="font-serif text-lg font-medium text-[#514458]">
              No Matching Certificate Found
            </h2>
            <p className="text-xs text-[#6E6474]">
              Please verify the exact Certificate ID characters or email info@behaviorcanvas.com for verification assistance.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
