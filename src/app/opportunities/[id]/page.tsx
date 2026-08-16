'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import {
  ArrowLeft,
  MapPin,
  Clock,
  Stamp,
  Users,
  CheckCircle2,
  Circle,
  ChevronRight,
  ExternalLink,
  GraduationCap,
  Square,
  CheckSquare,
} from 'lucide-react';
import {
  getOpportunityById,
  getApplicationTracker,
  type Opportunity,
  type ApplicationTracker,
} from '@/data/mockDb';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { AiChat } from '@/components/AiChat';

export default function OpportunityDetailPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const [opportunity, setOpportunity] = useState<Opportunity | null>(null);
  const [tracker, setTracker] = useState<ApplicationTracker | null>(null);
  const [loading, setLoading] = useState(true);
  const [checklist, setChecklist] = useState<{ item: string; checked: boolean }[]>([]);
  const [applied, setApplied] = useState(false);

  useEffect(() => {
    if (!params.id) return;
    Promise.all([
      getOpportunityById(params.id),
      getApplicationTracker(params.id),
    ]).then(([opp, track]) => {
      setOpportunity(opp ?? null);
      if (track) {
        setTracker(track);
        setChecklist(track.checklist.map(c => ({ ...c })));
        setApplied(!!track.appliedDate);
      }
      setLoading(false);
    });
  }, [params.id]);

  const toggleChecklist = (index: number) => {
    setChecklist(prev =>
      prev.map((item, i) => (i === index ? { ...item, checked: !item.checked } : item))
    );
  };

  const completedChecklist = checklist.filter(c => c.checked).length;
  const checklistProgress = checklist.length > 0 ? Math.round((completedChecklist / checklist.length) * 100) : 0;

  if (loading) {
    return (
      <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
        <div className="h-8 w-48 animate-pulse rounded-lg bg-slate-200" />
        <div className="mt-6 h-64 animate-pulse rounded-xl border border-slate-200 bg-slate-100" />
        <div className="mt-6 h-96 animate-pulse rounded-xl border border-slate-200 bg-slate-100" />
      </main>
    );
  }

  if (!opportunity) {
    return (
      <main className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6">
        <p className="text-lg font-medium text-slate-900">Opportunity not found</p>
        <p className="mt-2 text-sm text-slate-500">This opportunity may have been removed.</p>
        <div className="mt-6">
          <Button href="/opportunities" variant="secondary">
            <ArrowLeft className="h-4 w-4" />
            Back to Opportunities
          </Button>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
      {/* Back button */}
      <button
        onClick={() => router.push('/opportunities')}
        className="mb-6 inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 transition-colors hover:text-slate-900 cursor-pointer"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Opportunities
      </button>

      {/* Header */}
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                {opportunity.title}
              </h1>
              <Badge variant={opportunity.matchScore >= 90 ? 'success' : 'default'} size="md">
                <Stamp className="mr-1 h-3.5 w-3.5" />
                {opportunity.matchScore}% Match
              </Badge>
            </div>
            <p className="mt-2 text-slate-500">{opportunity.organization}</p>
          </div>
          <div className="shrink-0">
            {applied ? (
              <div className="flex items-center gap-2 rounded-lg bg-emerald-50 px-4 py-2.5 text-sm font-medium text-emerald-700 border border-emerald-200">
                <CheckCircle2 className="h-4 w-4" />
                Applied
              </div>
            ) : (
              <Button
                size="lg"
                onClick={() => setApplied(true)}
              >
                Apply Now
                <ExternalLink className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>

        {/* Details grid */}
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          <div className="flex items-center gap-2 rounded-lg bg-slate-50 px-4 py-3">
            <MapPin className="h-4 w-4 text-slate-500" />
            <div>
              <p className="text-xs text-slate-500">Location</p>
              <p className="text-sm font-medium text-slate-900">{opportunity.location} · {opportunity.format}</p>
            </div>
          </div>
          <div className={`flex items-center gap-2 rounded-lg px-4 py-3 ${
            opportunity.daysUntilDeadline <= 5 ? 'bg-red-50' : opportunity.daysUntilDeadline <= 10 ? 'bg-amber-50' : 'bg-slate-50'
          }`}>
            <Clock className={`h-4 w-4 ${
              opportunity.daysUntilDeadline <= 5 ? 'text-red-500' : opportunity.daysUntilDeadline <= 10 ? 'text-amber-500' : 'text-slate-500'
            }`} />
            <div>
              <p className="text-xs text-slate-500">Deadline</p>
              <p className={`text-sm font-medium ${
                opportunity.daysUntilDeadline <= 5 ? 'text-red-700' : opportunity.daysUntilDeadline <= 10 ? 'text-amber-700' : 'text-slate-900'
              }`}>
                {opportunity.daysUntilDeadline} days remaining
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 rounded-lg bg-slate-50 px-4 py-3">
            <GraduationCap className="h-4 w-4 text-slate-500" />
            <div>
              <p className="text-xs text-slate-500">Eligibility</p>
              <p className="text-sm font-medium text-slate-900">{opportunity.eligibility}</p>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="mt-6">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-500">About this opportunity</h2>
          <p className="mt-3 text-sm leading-relaxed text-slate-700">
            {opportunity.description}
          </p>
        </div>

        {/* Skills */}
        <div className="mt-6">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-500">Required Skills</h2>
          <div className="mt-3 flex flex-wrap gap-2">
            {opportunity.skills.map((skill) => (
              <Badge key={skill} variant="outline" size="md">
                {skill}
              </Badge>
            ))}
          </div>
        </div>

        {/* AI Match Explanation */}
        <div className="mt-6 rounded-lg border border-indigo-100 bg-indigo-50/50 p-4">
          <div className="flex items-start gap-3">
            <Stamp className="mt-0.5 h-5 w-5 text-indigo-600 shrink-0" />
            <div>
              <p className="text-sm font-semibold text-indigo-900">AI Match Analysis</p>
              <p className="mt-1 text-sm text-indigo-700">
                {opportunity.matchScore >= 90
                  ? `Strong match — you meet the education and interest requirements. Your profile aligns well with this ${opportunity.type.toLowerCase()}'s focus on ${opportunity.domain.toLowerCase()}.`
                  : opportunity.matchScore >= 80
                  ? `Good match — you meet most requirements. Consider strengthening your profile in ${opportunity.skills[opportunity.skills.length - 1].toLowerCase()} to improve your chances.`
                  : `Partial match — review the eligibility requirements carefully. You may need additional qualifications in ${opportunity.skills.slice(0, 2).join(' and ').toLowerCase()}.`
                }
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Application Tracker — THE WINNING FEATURE */}
      {tracker && (
        <div className="mt-8 grid gap-8 lg:grid-cols-5">
          {/* Steps - vertical stepper */}
          <div className="lg:col-span-3">
            <Card>
              <div className="mb-4 flex items-center gap-2">
                <Users className="h-5 w-5 text-indigo-600" />
                <h2 className="text-lg font-bold text-slate-900">Application Tracker</h2>
              </div>
              <p className="mb-6 text-sm text-slate-500">
                Track your progress from discovery to verified impact.
              </p>
              <div className="space-y-0">
                {tracker.steps.map((step, index) => {
                  const isLast = index === tracker.steps.length - 1;
                  return (
                    <div key={step.id} className="flex gap-4">
                      {/* Step indicator + line */}
                      <div className="flex flex-col items-center">
                        {step.status === 'completed' ? (
                          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-100">
                            <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                          </div>
                        ) : step.status === 'current' ? (
                          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-indigo-600 shadow-sm shadow-indigo-200">
                            <div className="h-2.5 w-2.5 rounded-full bg-white animate-pulse" />
                          </div>
                        ) : (
                          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 border-slate-200 bg-white">
                            <Circle className="h-4 w-4 text-slate-300" />
                          </div>
                        )}
                        {!isLast && (
                          <div className={`w-0.5 grow my-1 min-h-[24px] ${
                            step.status === 'completed' ? 'bg-emerald-200' : 'bg-slate-200'
                          }`} />
                        )}
                      </div>
                      {/* Step content */}
                      <div className={`pb-6 ${isLast ? 'pb-0' : ''}`}>
                        <div className="flex items-center gap-2">
                          <p className={`text-sm font-semibold ${
                            step.status === 'completed' ? 'text-emerald-700'
                            : step.status === 'current' ? 'text-indigo-700'
                            : 'text-slate-400'
                          }`}>
                            {step.label}
                          </p>
                          {step.status === 'current' && (
                            <Badge variant="default" size="sm">Current</Badge>
                          )}
                          {step.status === 'completed' && (
                            <Badge variant="success" size="sm">Done</Badge>
                          )}
                        </div>
                        <p className={`mt-0.5 text-xs ${
                          step.status === 'upcoming' ? 'text-slate-400' : 'text-slate-500'
                        }`}>
                          {step.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>
          </div>

          {/* Checklist sidebar */}
          <div className="lg:col-span-2">
            <Card>
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-lg font-bold text-slate-900">Checklist</h2>
                <span className="text-xs font-medium text-slate-500">
                  {completedChecklist}/{checklist.length}
                </span>
              </div>

              {/* Progress bar */}
              <div className="mb-5">
                <div className="flex items-center justify-between text-xs text-slate-500 mb-1.5">
                  <span>Progress</span>
                  <span className="font-medium">{checklistProgress}%</span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
                  <div
                    className="h-full rounded-full bg-indigo-600 transition-all duration-500"
                    style={{ width: `${checklistProgress}%` }}
                  />
                </div>
              </div>

              <div className="space-y-1">
                {checklist.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => toggleChecklist(index)}
                    className="flex w-full items-start gap-3 rounded-lg px-2 py-2 text-left transition-colors hover:bg-slate-50 cursor-pointer"
                  >
                    {item.checked ? (
                      <CheckSquare className="mt-0.5 h-4 w-4 shrink-0 text-indigo-600" />
                    ) : (
                      <Square className="mt-0.5 h-4 w-4 shrink-0 text-slate-300" />
                    )}
                    <span className={`text-sm ${
                      item.checked ? 'text-slate-400 line-through' : 'text-slate-700'
                    }`}>
                      {item.item}
                    </span>
                  </button>
                ))}
              </div>

              {checklistProgress === 100 && !applied && (
                <div className="mt-5">
                  <Button
                    className="w-full"
                    onClick={() => setApplied(true)}
                  >
                    All set — Submit Application
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              )}

              {applied && (
                <div className="mt-5 rounded-lg bg-emerald-50 border border-emerald-200 p-3 text-center">
                  <CheckCircle2 className="mx-auto h-6 w-6 text-emerald-600" />
                  <p className="mt-1 text-sm font-medium text-emerald-700">Application Submitted</p>
                  <p className="text-xs text-emerald-600">Track your progress above</p>
                </div>
              )}
            </Card>
          </div>
        </div>
      )}
      {/* AI Chat Widget */}
      {opportunity && (
        <AiChat
          opportunityTitle={opportunity.title}
          matchScore={opportunity.matchScore}
          domain={opportunity.domain}
          skills={opportunity.skills}
          eligibility={opportunity.eligibility}
        />
      )}
    </main>
  );
}
