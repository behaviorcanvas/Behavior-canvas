import React, { useState } from 'react';
import { Calendar, Clock, Video, CheckCircle2, ArrowRight, Send, HelpCircle, Users, Award } from 'lucide-react';
import { workshopsData, WorkshopItem } from '../data/workshops';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { brandConfig } from '../data/brand';
import { RoutePath } from '../types';

interface WorkshopsPageProps {
  onNavigate: (route: RoutePath, param?: string) => void;
  onOpenEnquiry: (category?: string, subject?: string) => void;
}

export const WorkshopsPage: React.FC<WorkshopsPageProps> = ({
  onNavigate,
  onOpenEnquiry
}) => {
  const [activeTab, setActiveTab] = useState<'All' | 'Registration Open' | 'Upcoming'>('All');

  // Custom institutional workshop form state
  const [orgName, setOrgName] = useState('');
  const [contactPerson, setContactPerson] = useState('');
  const [orgEmail, setOrgEmail] = useState('');
  const [orgTopic, setOrgTopic] = useState('');
  const [orgMessage, setOrgMessage] = useState('');
  const [submittedOrg, setSubmittedOrg] = useState(false);

  const filteredWorkshops = workshopsData.filter((w) => {
    if (activeTab === 'All') return true;
    return w.status === activeTab;
  });

  const handleOrgSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactPerson.trim() || !orgEmail.trim() || !orgTopic.trim()) return;
    setSubmittedOrg(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-16">
      <Breadcrumbs items={[{ label: 'Workshops & Training' }]} />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#EDE2EB] pb-8">
        <div className="space-y-3 max-w-2xl">
          <span className="text-xs font-semibold tracking-wider uppercase text-[#7A5B79]">
            Live Collaborative Learning
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-[#2A182C]">
            Workshops & Educational Training
          </h1>
          <p className="text-sm sm:text-base text-[#5A475D] leading-relaxed">
            Interactive, research-grounded online workshops designed for parents, educators, special educators, and psychology professionals across India.
          </p>
        </div>

        {/* Filter */}
        <div className="flex items-center gap-1.5 p-1 bg-[#FAF6F8] rounded-xl border border-[#EDE2EB] shrink-0 self-start md:self-auto">
          {(['All', 'Registration Open', 'Upcoming'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                activeTab === tab
                  ? 'bg-white text-[#2A182C] shadow-xs'
                  : 'text-[#6B5A6E] hover:text-[#2A182C]'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Workshops List */}
      <div className="space-y-8">
        {filteredWorkshops.length === 0 ? (
          <div className="p-12 text-center bg-white rounded-3xl border border-[#EDE2EB] space-y-3">
            <Calendar className="w-10 h-10 text-[#8C7A8F] mx-auto" />
            <h3 className="text-base font-bold text-[#2A182C]">No workshops match this filter currently</h3>
            <p className="text-xs text-[#5C4A60] max-w-sm mx-auto">
              Please check back soon or submit an enquiry below to be notified when upcoming cohorts open for registration.
            </p>
          </div>
        ) : (
          filteredWorkshops.map((workshop) => (
            <div
              key={workshop.id}
              className="bg-white rounded-3xl border border-[#EDE2EB] p-8 sm:p-10 shadow-xs hover:border-[#DACFDB] transition-all grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
            >
              {/* Left / Middle: Title, Audience, Objectives, Descriptions */}
              <div className="lg:col-span-8 space-y-5">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-100">
                    {workshop.status}
                  </span>
                  <span className="text-xs text-[#6B5A6E] flex items-center gap-1.5">
                    <Video className="w-3.5 h-3.5 text-[#583256]" />
                    <span>{workshop.deliveryFormat}</span>
                  </span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-bold text-[#2A182C]">
                  {workshop.title}
                </h2>

                <div className="p-3 bg-[#FAF8FA] rounded-xl text-xs text-[#5C4A60]">
                  <span className="font-semibold text-[#2A182C]">Intended Audience: </span>
                  {workshop.audience}
                </div>

                <div className="space-y-3 text-xs sm:text-sm text-[#5C4A60] leading-relaxed">
                  {workshop.fullDescription.map((p, idx) => (
                    <p key={idx}>{p}</p>
                  ))}
                </div>

                {/* Objectives */}
                <div className="space-y-2 pt-2">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[#2A182C]">
                    Key Learning Objectives
                  </h3>
                  <ul className="space-y-2">
                    {workshop.learningObjectives.map((obj, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-xs text-[#2A182C]">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{obj}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Right: Date, Fee, Registration Card */}
              <div className="lg:col-span-4 bg-[#FAF8FA] rounded-2xl border border-[#EDE2EB] p-6 space-y-5">
                <div className="space-y-3 text-xs text-[#5C4A60]">
                  <div className="space-y-1">
                    <span className="text-[11px] font-semibold text-[#7A677D] uppercase">Date & Timing</span>
                    <p className="font-bold text-[#2A182C] text-sm flex items-center gap-1.5">
                      <Calendar className="w-4 h-4 text-[#583256]" />
                      <span>{workshop.dateTime}</span>
                    </p>
                  </div>

                  <div className="space-y-1">
                    <span className="text-[11px] font-semibold text-[#7A677D] uppercase">Duration</span>
                    <p className="font-medium text-[#2A182C] flex items-center gap-1.5">
                      <Clock className="w-4 h-4 text-[#583256]" />
                      <span>{workshop.duration}</span>
                    </p>
                  </div>

                  <div className="space-y-1 pt-2 border-t border-[#EDE2EB]">
                    <span className="text-[11px] font-semibold text-[#7A677D] uppercase">Fee Structure</span>
                    <p className="text-lg font-bold text-[#583256] tabular-nums">
                      {workshop.fee}
                    </p>
                  </div>

                  <div className="pt-2 text-[11px] text-[#6B5A6E] space-y-1 border-t border-[#EDE2EB]">
                    <p className="font-semibold text-[#2A182C]">Includes:</p>
                    <ul className="space-y-1 list-disc list-inside">
                      {workshop.takeaways.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <button
                  onClick={() => onOpenEnquiry('Workshops & Training', `Workshop Registration: ${workshop.title}`)}
                  className="w-full py-3 text-center text-xs font-semibold text-white bg-[#583256] hover:bg-[#482746] rounded-xl transition-all shadow-xs"
                >
                  Register / Enquire for this Session
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Propose a Workshop / Institutional Training Form */}
      <section className="bg-white rounded-3xl border border-[#EDE2EB] p-8 sm:p-12 shadow-xs space-y-8">
        <div className="max-w-2xl space-y-2">
          <span className="text-xs font-semibold tracking-wider uppercase text-[#7A5B79]">
            Schools, Universities & Non-Profits
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#2A182C] tracking-tight">
            Request a Custom Workshop for Your Team
          </h2>
          <p className="text-xs sm:text-sm text-[#5C4A60] leading-relaxed">
            We partner with educational institutions and organizations across India to conduct customized workshops on Positive Behavior Support, inclusive classroom structuring, and functional communication.
          </p>
        </div>

        {submittedOrg ? (
          <div className="p-6 bg-[#FAF8FA] rounded-2xl border border-[#EDE2EB] text-center space-y-3">
            <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
            <h3 className="text-base font-bold text-[#2A182C]">
              Institutional Request Received
            </h3>
            <p className="text-xs text-[#5C4A60] max-w-md mx-auto leading-relaxed">
              Thank you, {contactPerson}! We have received your training request for {orgName || 'your organization'}. Reema Singh will connect with you at {orgEmail} to discuss learning objectives and available dates.
            </p>
            <button
              onClick={() => setSubmittedOrg(false)}
              className="text-xs font-semibold text-[#583256] underline"
            >
              Submit another request
            </button>
          </div>
        ) : (
          <form onSubmit={handleOrgSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl">
            <div>
              <label className="block text-xs font-semibold text-[#3B223D] mb-1">
                Organization / School Name
              </label>
              <input
                type="text"
                value={orgName}
                onChange={(e) => setOrgName(e.target.value)}
                placeholder="e.g. Modern Academy / Special Needs Learning Center"
                className="w-full px-3.5 py-2.5 text-xs rounded-lg border border-[#DACFDB] bg-white text-[#2A182C] focus:outline-hidden focus:border-[#583256]"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#3B223D] mb-1">
                Contact Person Name *
              </label>
              <input
                type="text"
                required
                value={contactPerson}
                onChange={(e) => setContactPerson(e.target.value)}
                placeholder="e.g. Radhika Sen (Coordinator)"
                className="w-full px-3.5 py-2.5 text-xs rounded-lg border border-[#DACFDB] bg-white text-[#2A182C] focus:outline-hidden focus:border-[#583256]"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#3B223D] mb-1">
                Official Email Address *
              </label>
              <input
                type="email"
                required
                value={orgEmail}
                onChange={(e) => setOrgEmail(e.target.value)}
                placeholder="radhika@school.org"
                className="w-full px-3.5 py-2.5 text-xs rounded-lg border border-[#DACFDB] bg-white text-[#2A182C] focus:outline-hidden focus:border-[#583256]"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#3B223D] mb-1">
                Proposed Training Topic *
              </label>
              <input
                type="text"
                required
                value={orgTopic}
                onChange={(e) => setOrgTopic(e.target.value)}
                placeholder="e.g. Positive Classroom Support for Primary Teachers"
                className="w-full px-3.5 py-2.5 text-xs rounded-lg border border-[#DACFDB] bg-white text-[#2A182C] focus:outline-hidden focus:border-[#583256]"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs font-semibold text-[#3B223D] mb-1">
                Expected Participants & Approximate Timeline
              </label>
              <textarea
                rows={3}
                value={orgMessage}
                onChange={(e) => setOrgMessage(e.target.value)}
                placeholder="Share estimated participant count, target date range (e.g. November/December 2026), and specific team challenges you want to address."
                className="w-full px-3.5 py-2.5 text-xs rounded-lg border border-[#DACFDB] bg-white text-[#2A182C] focus:outline-hidden focus:border-[#583256]"
              />
            </div>
            <div className="md:col-span-2 pt-2">
              <button
                type="submit"
                className="px-6 py-3 text-xs font-semibold text-white bg-[#583256] hover:bg-[#482746] rounded-xl transition-all shadow-xs flex items-center gap-2"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Submit Institutional Request</span>
              </button>
            </div>
          </form>
        )}
      </section>
    </div>
  );
};
