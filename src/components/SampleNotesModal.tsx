import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight, Download, BookOpen, Sparkles, CheckCircle2, ShieldCheck, ZoomIn, ZoomOut } from 'lucide-react';
import { ProductItem } from '../data/products';

interface SampleNotesModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: ProductItem | null;
  onProceedToCheckout: (product: ProductItem) => void;
  currency: 'USD' | 'INR';
}

interface SamplePage {
  pageNumber: number;
  chapterTitle: string;
  topic: string;
  badge: string;
  content: {
    heading: string;
    subheading: string;
    summary: string;
    bullets: string[];
    table?: {
      headers: string[];
      rows: string[][];
    };
    clinicalCallout?: {
      title: string;
      body: string;
    };
  };
}

const samplePages: SamplePage[] = [
  {
    pageNumber: 12,
    chapterTitle: 'Domain 4: Behavior Reduction & Skill Acquisition',
    topic: 'Differential Reinforcement Procedures',
    badge: 'Core Clinical Matrix',
    content: {
      heading: 'Differential Reinforcement Decision Matrix',
      subheading: 'Selecting between DRA, DRI, DRO, and DRL based on learner topography and functional needs',
      summary:
        'Differential reinforcement is an evidence-informed strategy that reinforces desired behaviors while withholding reinforcement (extinction) for interfering behaviors, without resorting to punitive consequences.',
      bullets: [
        'DRA (Alternative): Reinforces a functional communicative replacement behavior serving the identical function (e.g., teaching "break" card to replace task avoidance screaming).',
        'DRI (Incompatible): Reinforces a specific behavior that is topographically impossible to perform concurrently (e.g., hands in pockets vs. surface hand-mouthing).',
        'DRO (Other): Reinforces the complete zero-occurrence of the target behavior across a scheduled time interval.',
        'DRL (Low Rates): Reinforces behavior only when delivered at an acceptable, lower frequency (e.g., raising hand 2 times per hour instead of 20).'
      ],
      table: {
        headers: ['Procedure', 'Reinforcement Contingency', 'Primary Functional Purpose', 'Key Ethical Consideration'],
        rows: [
          ['DRA', 'Alternative functional replacement', 'Builds functional communication', 'Replacement must require equal or less response effort'],
          ['DRI', 'Topographically incompatible action', 'Physically prevents interfering behavior', 'Must be a socially valid, comfortable movement'],
          ['DRO', 'Zero occurrence during interval', 'Rapid reduction of high-risk behavior', 'Does not explicitly teach a replacement skill alone'],
          ['DRL', 'Frequency below predetermined limit', 'Moderates acceptable behaviors', 'Useful when behavior is acceptable in moderation']
        ]
      },
      clinicalCallout: {
        title: 'QASP-S Exam Strategy Note',
        body:
          'When questions ask for the most sustainable, neurodiversity-affirming reduction procedure, always check whether a functional replacement (DRA/FCT) is present before selecting extinction or interval-only withholding.'
      }
    }
  },
  {
    pageNumber: 24,
    chapterTitle: 'Domain 6: Ethical Conduct, Assent & Cultural Humility',
    topic: 'Learner Dignity & Assent Verification',
    badge: 'Ethical Standards Spotlight',
    content: {
      heading: 'Contemporary Assent Framework in Clinical Practice',
      subheading: 'Moving beyond legal consent: Operationalizing ongoing learner assent and honoring withdrawal',
      summary:
        'Contemporary behavior analysis requires active, moment-by-moment assent monitoring. Even when legal parental consent is granted, the practitioner is ethically bound to recognize implicit and explicit withdrawal of learner participation.',
      bullets: [
        'Active Assent: Smiles, eager approach to materials, initiating instructional interactions, sustained voluntary engagement.',
        'Assent Withdrawal (Vocal): Direct statements such as "Stop", "No more", "I want to leave", or elevated vocal protest.',
        'Assent Withdrawal (Non-Vocal): Pushing instructional items away, turning torso >90° away from workspace, micro-freezing, covering eyes/ears.',
        'Protocol Upon Withdrawal: Immediately pause demand, acknowledge emotional state, examine response effort, and provide an ethical reset window.'
      ],
      clinicalCallout: {
        title: 'Supervisory Practice Note (Reema Singh, QASP-S)',
        body:
          'In tele-supervision, supervisees are assessed on how rapidly they detect non-vocal assent withdrawal during video observations. Compliance-based forcing violates learner dignity and compromises trust.'
      }
    }
  },
  {
    pageNumber: 48,
    chapterTitle: 'Domain 2: Measurement & Data Collection',
    topic: 'Discontinuous Measurement Systems',
    badge: 'Applied Measurement Guide',
    content: {
      heading: 'Discontinuous Measurement Decision Ladder',
      subheading: 'Determining when to use Partial Interval, Whole Interval, or Momentary Time Sampling',
      summary:
        'Discontinuous measurement samples behavior across intervals rather than capturing every discrete instance. Choosing the correct system is vital to prevent severe overestimation or underestimation.',
      bullets: [
        'Whole Interval Recording (WIR): Behavior must persist across the entire interval. Underestimates duration/rate. Best used when the goal is to increase continuous engagement (e.g. on-task independent play).',
        'Partial Interval Recording (PIR): Behavior is scored if it occurs at any second during the interval. Overestimates duration/rate. Best used when the goal is to decrease high-priority behaviors (e.g. self-injury, aggression).',
        'Momentary Time Sampling (MTS): Behavior is scored only at the exact conclusion of the interval. Most feasible in busy classrooms with multiple learners.'
      ],
      table: {
        headers: ['System', 'Scoring Rule', 'Estimation Tendency', 'Best Applied Context'],
        rows: [
          ['Whole Interval', 'Entire duration of interval', 'Underestimates occurrence', 'Goal: Increase sustained on-task engagement'],
          ['Partial Interval', 'Any moment during interval', 'Overestimates occurrence', 'Goal: Reduce interfering target behavior'],
          ['Momentary Time', 'Exact second interval ends', 'Moderate / Balanced', 'Classrooms with high supervisor-to-student ratio']
        ]
      }
    }
  },
  {
    pageNumber: 82,
    chapterTitle: 'Domain 3: Applied Scenario Question Vignette',
    topic: 'Mock Question Stem with Distractor Analysis',
    badge: 'Scenario Workbook Preview',
    content: {
      heading: 'Scenario Vignette: Evaluating Function vs. Topography',
      subheading: 'Case study analysis with complete rationales for correct and incorrect answers',
      summary:
        'A 6-year-old student frequently tears worksheets during small-group phonics instruction. When the teacher sends the student to the quiet corner for a 5-minute timeout, worksheet tearing increases over the subsequent 3 weeks. What behavioral principle explains this trend?',
      bullets: [
        'A) Positive Punishment: An aversive timeout stimulus decreased behavior over time.',
        'B) Negative Reinforcement: The removal of phonics worksheets during timeout reinforced tearing behavior via escape.',
        'C) Automatic Reinforcement: The physical sensation of tearing paper was intrinsically gratifying.',
        'D) Extinction Burst: The student is testing the teacher’s timeout boundaries.'
      ],
      clinicalCallout: {
        title: 'Distractor Rationale Breakdown',
        body:
          'Correct: (B). The teacher intended timeout as a consequence, but worksheet tearing increased. Because the demand was removed (negative) and the future frequency increased (reinforcement), the timeout functionally operated as negative reinforcement (escape function).'
      }
    }
  }
];

export const SampleNotesModal: React.FC<SampleNotesModalProps> = ({
  isOpen,
  onClose,
  product,
  onProceedToCheckout,
  currency
}) => {
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [zoomLevel, setZoomLevel] = useState<'normal' | 'zoomed'>('normal');

  if (!isOpen || !product) return null;

  const currentSymbol = currency === 'USD' ? '$' : '₹';
  const price = currency === 'USD' ? product.priceUSD : product.priceINR;
  const page = samplePages[currentPageIndex];

  const handleNext = () => {
    setCurrentPageIndex((prev) => (prev < samplePages.length - 1 ? prev + 1 : 0));
  };

  const handlePrev = () => {
    setCurrentPageIndex((prev) => (prev > 0 ? prev - 1 : samplePages.length - 1));
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-[#1E1120]/70 backdrop-blur-sm transition-opacity"
      role="dialog"
      aria-modal="true"
      aria-labelledby="sample-modal-title"
    >
      <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-[#EDE2EB] overflow-hidden max-h-[94vh] flex flex-col">
        {/* Top Control Bar */}
        <div className="flex items-center justify-between px-6 py-4 bg-gradient-to-r from-[#FAF6F8] via-white to-[#FAF6F8] border-b border-[#EDE2EB] shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#583256]/10 text-[#583256] flex items-center justify-center shrink-0">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 id="sample-modal-title" className="text-sm font-bold text-[#2A182C] line-clamp-1">
                  {product.title}
                </h2>
                <span className="text-[10px] font-semibold tracking-wider uppercase px-2 py-0.5 rounded-full bg-[#FAF2F8] text-[#583256] border border-[#EDE2EB] hidden sm:inline-block">
                  Verified Sample Pages
                </span>
              </div>
              <p className="text-[11px] text-[#7A677D]">
                Interactive Reader · Page {page.pageNumber} of {product.fileSpecs.estimatedPages}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setZoomLevel(zoomLevel === 'normal' ? 'zoomed' : 'normal')}
              className="p-2 text-[#7A677D] hover:text-[#2A182C] hover:bg-[#FAF2F8] rounded-lg transition-colors hidden sm:inline-flex"
              title="Toggle Zoom"
              aria-label="Toggle Zoom"
            >
              {zoomLevel === 'normal' ? <ZoomIn className="w-4 h-4" /> : <ZoomOut className="w-4 h-4" />}
            </button>
            <button
              onClick={onClose}
              className="p-2 text-[#7A677D] hover:text-[#2A182C] hover:bg-[#FAF2F8] rounded-lg transition-colors"
              aria-label="Close Preview"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Page Content Viewport */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-8 bg-[#FBF9FA]">
          <div
            className={`max-w-3xl mx-auto bg-white rounded-2xl border border-[#EDE2EB] shadow-md p-6 sm:p-10 transition-all relative ${
              zoomLevel === 'zoomed' ? 'scale-102 text-base' : 'text-sm'
            }`}
          >
            {/* Watermark */}
            <div className="absolute inset-0 pointer-events-none flex items-center justify-center overflow-hidden opacity-[0.035] select-none">
              <span className="text-8xl font-black text-[#583256] rotate-[-25deg] uppercase">
                Sample Preview
              </span>
            </div>

            {/* Document Header */}
            <div className="border-b border-[#EDE2EB] pb-4 mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <span className="text-[11px] font-semibold text-[#583256] uppercase tracking-wider block">
                  {page.chapterTitle}
                </span>
                <span className="text-xs text-[#7A677D]">Topic: {page.topic}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-medium text-[#583256] bg-[#FAF2F8] px-2.5 py-1 rounded-md border border-[#EDE2EB]">
                  {page.badge}
                </span>
                <span className="text-xs font-mono font-bold text-[#7A677D]">
                  Pg. {page.pageNumber}
                </span>
              </div>
            </div>

            {/* Main Article Body */}
            <div className="space-y-6 relative z-10">
              <div>
                <h3 className="text-2xl font-bold font-serif text-[#2A182C] tracking-tight">
                  {page.content.heading}
                </h3>
                <p className="text-xs sm:text-sm text-[#7A677D] mt-1 font-medium">
                  {page.content.subheading}
                </p>
              </div>

              <p className="text-xs sm:text-sm text-[#4A3B4D] leading-relaxed">
                {page.content.summary}
              </p>

              {/* Bullets */}
              <div className="space-y-2.5 bg-[#FAF6F8] p-4 sm:p-5 rounded-xl border border-[#EDE2EB]">
                <h4 className="text-xs font-bold text-[#2A182C] uppercase tracking-wider">
                  Core Analytical Principles
                </h4>
                <ul className="space-y-2 text-xs text-[#3D2D40] leading-relaxed">
                  {page.content.bullets.map((b, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#583256] mt-1.5 shrink-0" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Table if present */}
              {page.content.table && (
                <div className="overflow-x-auto rounded-xl border border-[#EDE2EB]">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-[#FAF2F8] text-[#2A182C] font-semibold border-b border-[#EDE2EB]">
                        {page.content.table.headers.map((h, i) => (
                          <th key={i} className="p-2.5 whitespace-nowrap">
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#EDE2EB] text-[#4A3B4D]">
                      {page.content.table.rows.map((row, rIdx) => (
                        <tr key={rIdx} className="hover:bg-[#FAF8FA] transition-colors">
                          {row.map((cell, cIdx) => (
                            <td
                              key={cIdx}
                              className={`p-2.5 ${cIdx === 0 ? 'font-bold text-[#2A182C]' : ''}`}
                            >
                              {cell}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* Clinical Callout */}
              {page.content.clinicalCallout && (
                <div className="p-4 rounded-xl bg-gradient-to-r from-[#FAF2F8] to-white border border-[#DACFDB] space-y-1">
                  <div className="text-xs font-bold text-[#583256] flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#583256]" />
                    <span>{page.content.clinicalCallout.title}</span>
                  </div>
                  <p className="text-xs text-[#5C4A60] leading-relaxed">
                    {page.content.clinicalCallout.body}
                  </p>
                </div>
              )}
            </div>

            {/* Document Footer */}
            <div className="mt-8 pt-4 border-t border-[#EDE2EB] flex items-center justify-between text-[11px] text-[#7A677D]">
              <span>© The Behavior Canvas · Reema Singh (QASP-S)</span>
              <span>All Rights Reserved · Licensed Study Edition</span>
            </div>
          </div>
        </div>

        {/* Bottom Pagination & Buy Strip */}
        <div className="px-6 py-4 bg-white border-t border-[#EDE2EB] flex flex-col sm:flex-row items-center justify-between gap-4 shrink-0">
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrev}
              className="p-2 text-xs font-semibold text-[#583256] hover:bg-[#FAF2F8] rounded-lg transition-colors border border-[#EDE2EB] flex items-center gap-1"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Previous Sample</span>
            </button>
            <div className="flex items-center gap-1 px-2">
              {samplePages.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentPageIndex(idx)}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${
                    currentPageIndex === idx
                      ? 'bg-[#583256] w-6'
                      : 'bg-[#DACFDB] hover:bg-[#BAA6BC]'
                  }`}
                  aria-label={`Jump to sample page ${idx + 1}`}
                />
              ))}
            </div>
            <button
              onClick={handleNext}
              className="p-2 text-xs font-semibold text-[#583256] hover:bg-[#FAF2F8] rounded-lg transition-colors border border-[#EDE2EB] flex items-center gap-1"
            >
              <span>Next Sample</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="text-right hidden sm:block">
              <span className="text-xs text-[#7A677D] block leading-none">Full Publication</span>
              <span className="text-sm font-bold text-[#2A182C] tabular-nums">
                {currentSymbol}{price.toLocaleString()} ({currency})
              </span>
            </div>
            <button
              onClick={() => {
                onClose();
                onProceedToCheckout(product);
              }}
              className="flex-1 sm:flex-none px-5 py-2.5 bg-[#583256] hover:bg-[#482746] text-white text-xs font-semibold rounded-xl transition-all shadow-md active:scale-98 flex items-center justify-center gap-2 whitespace-nowrap"
            >
              <Download className="w-4 h-4" />
              <span>Get Full Guide ({currentSymbol}{price})</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
