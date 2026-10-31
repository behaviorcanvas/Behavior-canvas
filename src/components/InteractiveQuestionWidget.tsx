import React, { useState } from 'react';
import { CheckCircle2, XCircle, HelpCircle, ArrowRight, Sparkles, BookOpen, RotateCcw } from 'lucide-react';
import { RoutePath } from '../types';

interface QuestionScenario {
  id: string;
  domain: string;
  stem: string;
  options: {
    key: string;
    text: string;
    isCorrect: boolean;
    rationale: string;
  }[];
  keyConcept: string;
  sourceReference: string;
}

const practiceQuestions: QuestionScenario[] = [
  {
    id: 'q1',
    domain: 'Domain 4: Skill Acquisition & Behavior Reduction',
    stem:
      'A 7-year-old student engages in vocal protests and pushes worksheets away when math pages containing more than 10 problems are presented. A functional behavior assessment (FBA) confirms the behavior is maintained by escape from dense academic demands. Prior to implementing an extinction protocol, which intervention plan is the most ethically sound and neurodiversity-affirming?',
    options: [
      {
        key: 'A',
        text: 'Implement demand fading by presenting 2 problems per card alongside teaching a functional communication response (FCR) to request a brief break.',
        isCorrect: true,
        rationale:
          'Correct! Contemporary ethical standards require addressing response effort through antecedent adjustments (demand fading) and functional communication training (FCT) before or in conjunction with extinction, honoring learner assent.'
      },
      {
        key: 'B',
        text: 'Enforce escape extinction immediately by physically preventing worksheet pushing and withholding all breaks until all 10 problems are completed.',
        isCorrect: false,
        rationale:
          'Incorrect. Implementing pure escape extinction without antecedent adaptations or functional replacement communication induces significant distress, escalation, and violates learner dignity.'
      },
      {
        key: 'C',
        text: 'Switch exclusively to positive punishment by taking away preferred recess time each time the student protests.',
        isCorrect: false,
        rationale:
          'Incorrect. Response cost / punishment fails to teach an adaptive communication skill and does not alter the underlying motivating operation (demand density).'
      },
      {
        key: 'D',
        text: 'Allow the student to leave the classroom permanently whenever math begins to eliminate problem behavior completely.',
        isCorrect: false,
        rationale:
          'Incorrect. Complete avoidance of academic tasks halts learning progression. The goal is to build tolerance and communicative autonomy through structured pacing.'
      }
    ],
    keyConcept: 'Antecedent Modification + Functional Communication Training (DRA/FCT)',
    sourceReference: 'QASP-S Task List Domain 4.02 · Ethical Guidelines for Applied Behavior Analysts'
  },
  {
    id: 'q2',
    domain: 'Domain 6: Ethics, Assent & Learner Dignity',
    stem:
      'During a discrete trial session, a 5-year-old non-speaking learner turns their body 90 degrees away from the table, crosses their arms, and lowers their head after four consecutive trials. The child does not engage in aggression or self-injury. Legal consent from the parents is fully documented. What is the supervisor’s ethical instruction to the interventionist?',
    options: [
      {
        key: 'A',
        text: 'Honor non-vocal assent withdrawal: pause instructional demands, offer a brief choice or sensory reset, and evaluate reinforcer effectiveness.',
        isCorrect: true,
        rationale:
          'Correct! Non-vocal disengagement indicates assent withdrawal. Ethical behavior practitioners prioritize learner autonomy over rote compliance, pausing demands to reassess motivation.'
      },
      {
        key: 'B',
        text: 'Hand-over-hand prompt the learner back toward the table immediately, since parental consent legally overrides student assent.',
        isCorrect: false,
        rationale:
          'Incorrect. Parental consent provides legal permission to deliver services, but moment-to-moment assent reflects the learner’s voluntary cooperation and dignity.'
      },
      {
        key: 'C',
        text: 'Deliver a verbal reprimand and mark the session as a failure due to non-compliance.',
        isCorrect: false,
        rationale:
          'Incorrect. Disengagement is a form of functional communication. Reprimanding quiet disengagement promotes trauma and breaks therapeutic rapport.'
      },
      {
        key: 'D',
        text: 'Immediately terminate the contract and discharge the child for lack of treatment readiness.',
        isCorrect: false,
        rationale:
          'Incorrect. Momentary disengagement is normal; the clinician must adjust instructional pacing, stimuli, and reinforcement schedules.'
      }
    ],
    keyConcept: 'Assent vs. Consent · Non-Vocal Withdrawal Recognition',
    sourceReference: 'QABA Code of Ethics · Principle 2.0: Dignity, Rights & Compassion'
  }
];

interface InteractiveQuestionWidgetProps {
  onNavigate: (route: RoutePath, param?: string) => void;
}

export const InteractiveQuestionWidget: React.FC<InteractiveQuestionWidgetProps> = ({
  onNavigate
}) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const question = practiceQuestions[currentIdx];

  const handleSelect = (key: string) => {
    if (isSubmitted) return;
    setSelectedOption(key);
  };

  const handleSubmit = () => {
    if (!selectedOption) return;
    setIsSubmitted(true);
  };

  const handleReset = () => {
    setSelectedOption(null);
    setIsSubmitted(false);
  };

  const handleNextQuestion = () => {
    setSelectedOption(null);
    setIsSubmitted(false);
    setCurrentIdx((prev) => (prev + 1) % practiceQuestions.length);
  };

  const selectedOptObj = question.options.find((o) => o.key === selectedOption);

  return (
    <div className="bg-white rounded-3xl border border-[#EDE2EB] shadow-xl overflow-hidden p-6 sm:p-10 relative">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#EDE2EB]">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-semibold text-[#583256] uppercase tracking-wider">
              {question.domain}
            </span>
            <span aria-hidden="true" className="text-[#DACFDB]">·</span>
            <span className="text-xs text-[#7A677D]">
              Scenario Question {currentIdx + 1} of {practiceQuestions.length}
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold font-serif text-[#2A182C]">
            Interactive QASP-S Exam Scenario Simulator
          </h3>
        </div>

        <div className="flex items-center gap-2">
          {isSubmitted && (
            <button
              onClick={handleNextQuestion}
              className="px-3.5 py-1.5 text-xs font-semibold text-[#583256] bg-[#FAF2F8] hover:bg-[#F2EBF1] border border-[#DACFDB] rounded-lg transition-colors flex items-center gap-1.5"
            >
              <span>Next Scenario</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
          <button
            onClick={handleReset}
            className="p-1.5 text-[#7A677D] hover:text-[#2A182C] rounded-lg transition-colors"
            title="Reset question"
            aria-label="Reset question"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Stem */}
      <div className="py-6">
        <p className="text-sm sm:text-base text-[#2A182C] font-medium leading-relaxed bg-[#FAF8FA] p-5 rounded-2xl border border-[#EDE2EB]">
          {question.stem}
        </p>
      </div>

      {/* Options */}
      <div className="space-y-3">
        {question.options.map((opt) => {
          const isSelected = selectedOption === opt.key;
          let containerClass = 'border-[#EDE2EB] bg-white hover:border-[#DACFDB] hover:bg-[#FAF8FA]';

          if (isSubmitted) {
            if (opt.isCorrect) {
              containerClass = 'border-emerald-500 bg-emerald-50/70 text-emerald-950 ring-1 ring-emerald-500';
            } else if (isSelected && !opt.isCorrect) {
              containerClass = 'border-rose-400 bg-rose-50/70 text-rose-950 ring-1 ring-rose-400';
            } else {
              containerClass = 'border-[#EDE2EB] bg-white/60 opacity-60';
            }
          } else if (isSelected) {
            containerClass = 'border-[#583256] bg-[#FAF2F8] ring-1 ring-[#583256] shadow-xs';
          }

          return (
            <div
              key={opt.key}
              onClick={() => handleSelect(opt.key)}
              className={`p-4 rounded-xl border text-xs sm:text-sm cursor-pointer transition-all flex items-start gap-3.5 ${containerClass}`}
            >
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs shrink-0 mt-0.5 ${
                  isSubmitted && opt.isCorrect
                    ? 'bg-emerald-600 text-white'
                    : isSubmitted && isSelected && !opt.isCorrect
                    ? 'bg-rose-500 text-white'
                    : isSelected
                    ? 'bg-[#583256] text-white'
                    : 'bg-[#F2EBF1] text-[#583256]'
                }`}
              >
                {opt.key}
              </div>
              <div className="flex-1 leading-relaxed">
                <span className="font-medium">{opt.text}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Action / Feedback Section */}
      <div className="pt-6 mt-6 border-t border-[#EDE2EB] flex flex-col sm:flex-row items-center justify-between gap-4">
        {!isSubmitted ? (
          <>
            <span className="text-xs text-[#7A677D]">
              Select the best answer and click Submit to reveal clinical rationales.
            </span>
            <button
              onClick={handleSubmit}
              disabled={!selectedOption}
              className="w-full sm:w-auto px-6 py-2.5 bg-[#583256] hover:bg-[#482746] disabled:opacity-40 text-white text-xs font-semibold rounded-xl transition-all shadow-xs"
            >
              Submit Answer & Check Rationale
            </button>
          </>
        ) : (
          <div className="w-full space-y-4">
            <div
              className={`p-4 rounded-2xl border flex items-start gap-3 ${
                selectedOptObj?.isCorrect
                  ? 'bg-emerald-50 border-emerald-200 text-emerald-950'
                  : 'bg-rose-50 border-rose-200 text-rose-950'
              }`}
            >
              {selectedOptObj?.isCorrect ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              ) : (
                <XCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
              )}
              <div className="space-y-1 text-xs sm:text-sm">
                <p className="font-bold">
                  {selectedOptObj?.isCorrect
                    ? 'Excellent Reasoning! That is the correct answer.'
                    : 'Not quite. Here is the clinical rationale breakdown:'}
                </p>
                <p className="leading-relaxed">{selectedOptObj?.rationale}</p>
                <p className="text-[11px] text-[#5C4A60] pt-1">
                  <span className="font-semibold text-[#2A182C]">Core Principle:</span>{' '}
                  {question.keyConcept} · {question.sourceReference}
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
              <span className="text-xs text-[#7A677D]">
                Want 150+ comprehensive scenario questions with distractor analysis?
              </span>
              <button
                onClick={() => onNavigate('product-detail', 'qasps-practice-questions-book')}
                className="w-full sm:w-auto px-4 py-2 bg-[#FAF2F8] hover:bg-[#F2EBF1] border border-[#583256]/30 text-[#583256] text-xs font-semibold rounded-xl transition-colors flex items-center justify-center gap-1.5"
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>Explore Full 150-Question Bank</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
