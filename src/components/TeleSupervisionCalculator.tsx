import React, { useState } from 'react';
import { Calendar, Clock, Globe, CheckCircle2, ShieldCheck, ArrowRight, UserCheck, MessageSquare } from 'lucide-react';
import { brandConfig } from '../data/brand';

interface TeleSupervisionCalculatorProps {
  onOpenEnquiry: (category?: string, subject?: string) => void;
}

interface TimezoneOption {
  code: string;
  name: string;
  city: string;
  offset: string;
  recommendedSlotIST: string;
  localConvertedTime: string;
  suitability: string;
}

const timezones: TimezoneOption[] = [
  {
    code: 'EST',
    name: 'Eastern Time (US & Canada)',
    city: 'New York / Toronto',
    offset: 'UTC-5',
    recommendedSlotIST: '7:30 PM - 9:30 PM IST',
    localConvertedTime: '10:00 AM - 12:00 PM EST (Morning)',
    suitability: 'Ideal for US candidates before lunch or during clinical day'
  },
  {
    code: 'PST',
    name: 'Pacific Time (US & Canada)',
    city: 'Los Angeles / Vancouver',
    offset: 'UTC-8',
    recommendedSlotIST: '8:30 PM - 10:30 PM IST',
    localConvertedTime: '8:00 AM - 10:00 AM PST (Early Morning)',
    suitability: 'Convenient morning consultation before caseload sessions'
  },
  {
    code: 'GMT',
    name: 'Greenwich Mean Time (UK & Ireland)',
    city: 'London / Dublin',
    offset: 'UTC+0',
    recommendedSlotIST: '4:00 PM - 7:00 PM IST',
    localConvertedTime: '10:30 AM - 1:30 PM GMT (Midday)',
    suitability: 'Comfortable mid-day scheduling with optimal bandwidth'
  },
  {
    code: 'GST',
    name: 'Gulf Standard Time (UAE & Middle East)',
    city: 'Dubai / Abu Dhabi / Riyadh',
    offset: 'UTC+4',
    recommendedSlotIST: '3:00 PM - 6:00 PM IST',
    localConvertedTime: '1:30 PM - 4:30 PM GST (Afternoon)',
    suitability: 'Highly synchronized afternoon appointments'
  },
  {
    code: 'IST',
    name: 'India Standard Time',
    city: 'Mumbai / Delhi / Bengaluru',
    offset: 'UTC+5:30',
    recommendedSlotIST: '10:00 AM - 7:00 PM IST',
    localConvertedTime: '10:00 AM - 7:00 PM IST (Full Day)',
    suitability: 'Flexible weekday & Saturday slots across India'
  },
  {
    code: 'AEST',
    name: 'Australian Eastern Standard Time',
    city: 'Sydney / Melbourne',
    offset: 'UTC+10',
    recommendedSlotIST: '11:00 AM - 2:00 PM IST',
    localConvertedTime: '4:30 PM - 7:30 PM AEST (Evening)',
    suitability: 'Relaxed after-work evening supervision sessions'
  }
];

export const TeleSupervisionCalculator: React.FC<TeleSupervisionCalculatorProps> = ({
  onOpenEnquiry
}) => {
  const [selectedGoal, setSelectedGoal] = useState<'qasps' | 'abat'>('qasps');
  const [selectedTz, setSelectedTz] = useState<string>('EST');
  const [monthlyHoursTarget, setMonthlyHoursTarget] = useState<number>(4);

  const tz = timezones.find((t) => t.code === selectedTz) || timezones[0];
  const totalRequiredHours = selectedGoal === 'qasps' ? 80 : 15;
  const estimatedMonths = Math.ceil(totalRequiredHours / monthlyHoursTarget);

  const handleBook = () => {
    const credName = selectedGoal === 'qasps' ? 'QASP-S (80 hours)' : 'ABAT (15 hours)';
    const context = `Tele-Supervision Plan: ${credName} in ${tz.name} (${tz.city}). Target: ${monthlyHoursTarget} hrs/month (est. ${estimatedMonths} months). Converted time: ${tz.localConvertedTime}`;
    onOpenEnquiry('Professional Mentoring & Supervision', context);
  };

  return (
    <div className="bg-white rounded-3xl border border-[#EDE2EB] shadow-xl overflow-hidden p-6 sm:p-10 relative">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#EDE2EB]">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-semibold text-[#583256] uppercase tracking-wider">
              International Tele-Supervision
            </span>
            <span aria-hidden="true" className="text-[#DACFDB]">·</span>
            <span className="text-xs text-[#7A677D]">
              QABA® Board Approved Supervisor
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold font-serif text-[#2A182C]">
            Worldwide Tele-Supervision Timezone & Hours Estimator
          </h3>
        </div>

        <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-100">
          <UserCheck className="w-4 h-4 text-emerald-600" />
          <span>Supervised by Reema Singh (QASP-S)</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-6">
        {/* Left Config Controls */}
        <div className="lg:col-span-7 space-y-6">
          {/* Goal Selector */}
          <div>
            <label className="block text-xs font-semibold text-[#2A182C] mb-2">
              1. Select Your Credential Goal
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setSelectedGoal('qasps')}
                className={`p-3.5 rounded-2xl border text-left transition-all ${
                  selectedGoal === 'qasps'
                    ? 'border-[#583256] bg-[#FAF2F8] ring-1 ring-[#583256] shadow-xs'
                    : 'border-[#EDE2EB] bg-white hover:border-[#DACFDB]'
                }`}
              >
                <div className="font-bold text-sm text-[#2A182C]">QASP-S® Credential</div>
                <div className="text-xs text-[#7A677D] mt-0.5">80 Fieldwork Hours Required</div>
              </button>

              <button
                type="button"
                onClick={() => setSelectedGoal('abat')}
                className={`p-3.5 rounded-2xl border text-left transition-all ${
                  selectedGoal === 'abat'
                    ? 'border-[#583256] bg-[#FAF2F8] ring-1 ring-[#583256] shadow-xs'
                    : 'border-[#EDE2EB] bg-white hover:border-[#DACFDB]'
                }`}
              >
                <div className="font-bold text-sm text-[#2A182C]">ABAT® Credential</div>
                <div className="text-xs text-[#7A677D] mt-0.5">15 Fieldwork Hours Required</div>
              </button>
            </div>
          </div>

          {/* Timezone Selector */}
          <div>
            <label className="block text-xs font-semibold text-[#2A182C] mb-2 flex items-center justify-between">
              <span>2. Choose Your Local Timezone</span>
              <span className="text-[11px] font-normal text-[#7A677D]">Synchronized live slots</span>
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {timezones.map((item) => (
                <button
                  key={item.code}
                  type="button"
                  onClick={() => setSelectedTz(item.code)}
                  className={`p-2.5 rounded-xl border text-left transition-all ${
                    selectedTz === item.code
                      ? 'border-[#583256] bg-[#FAF2F8] ring-1 ring-[#583256]'
                      : 'border-[#EDE2EB] bg-white hover:border-[#DACFDB]'
                  }`}
                >
                  <div className="font-bold text-xs text-[#2A182C] flex items-center justify-between">
                    <span>{item.code}</span>
                    <span className="text-[10px] text-[#7A677D] font-mono">{item.offset}</span>
                  </div>
                  <div className="text-[11px] text-[#5C4A60] truncate mt-0.5">{item.city}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Monthly Pacing Slider */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-semibold text-[#2A182C]">
                3. Planned Monthly Supervision Pacing
              </label>
              <span className="text-xs font-bold text-[#583256] bg-[#FAF2F8] px-2.5 py-0.5 rounded-md border border-[#EDE2EB]">
                {monthlyHoursTarget} hours / month
              </span>
            </div>
            <input
              type="range"
              min={1}
              max={selectedGoal === 'qasps' ? 10 : 5}
              value={monthlyHoursTarget}
              onChange={(e) => setMonthlyHoursTarget(Number(e.target.value))}
              className="w-full accent-[#583256] cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-[#7A677D] mt-1">
              <span>Paced (1-2 hrs/mo)</span>
              <span>Standard (3-5 hrs/mo)</span>
              <span>Accelerated (6+ hrs/mo)</span>
            </div>
          </div>
        </div>

        {/* Right Output Card */}
        <div className="lg:col-span-5 bg-gradient-to-br from-[#FAF6F8] to-[#F5EEF4] rounded-2xl border border-[#EDE2EB] p-6 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#EDE2EB]">
              <span className="text-xs font-semibold text-[#583256] uppercase tracking-wider">
                Personalized Plan Summary
              </span>
              <Globe className="w-4 h-4 text-[#583256]" />
            </div>

            <div>
              <div className="text-xs text-[#7A677D]">Estimated Time to Completion</div>
              <div className="text-3xl font-bold font-serif text-[#2A182C] tabular-nums mt-0.5">
                ~{estimatedMonths} Months
              </div>
              <div className="text-xs text-[#5C4A60] mt-1">
                Based on <span className="font-semibold text-[#2A182C]">{totalRequiredHours} hours</span> total requirement for {selectedGoal.toUpperCase()}.
              </div>
            </div>

            {/* Time conversion strip */}
            <div className="p-3.5 bg-white rounded-xl border border-[#EDE2EB] space-y-2 text-xs">
              <div className="flex items-center gap-1.5 font-bold text-[#2A182C]">
                <Clock className="w-4 h-4 text-[#583256]" />
                <span>Your Local Supervision Window:</span>
              </div>
              <div className="p-2 bg-[#FAF8FA] rounded-lg border border-[#EDE2EB] font-mono text-xs font-semibold text-[#583256]">
                {tz.localConvertedTime}
              </div>
              <div className="text-[11px] text-[#7A677D]">
                Correspond to India Standard Time: <span className="font-semibold">{tz.recommendedSlotIST}</span>
              </div>
              <div className="text-[11px] text-emerald-800 pt-1 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                <span>{tz.suitability}</span>
              </div>
            </div>

            {/* Features list */}
            <ul className="space-y-1.5 text-xs text-[#5C4A60]">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Monthly QABA Verification Documentation signed</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Live video analysis & case presentation coaching</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Ethical decision-making & assent audit guidance</span>
              </li>
            </ul>
          </div>

          <button
            onClick={handleBook}
            className="w-full py-3 px-4 bg-[#583256] hover:bg-[#482746] text-white text-xs font-semibold rounded-xl transition-all shadow-md active:scale-98 flex items-center justify-center gap-2"
          >
            <span>Enquire for {selectedGoal.toUpperCase()} Supervision Slot</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
