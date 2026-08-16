'use client';

import { useEffect, useState } from 'react';
import {
  Award,
  CheckCircle2,
  Clock,
  FolderGit2,
  Loader2,
  Timer,
  Trophy,
  Zap,
  ExternalLink,
  Calendar,
  Shield,
  Link2,
  X,
} from 'lucide-react';
import {
  getPassportEntries,
  getUserProfile,
  type PassportEntry,
  type UserProfile,
} from '@/data/mockDb';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

const statusConfig: Record<
  string,
  { label: string; variant: 'success' | 'warning' | 'default'; icon: typeof CheckCircle2 }
> = {
  verified: { label: 'Verified', variant: 'success', icon: CheckCircle2 },
  pending: { label: 'Pending Review', variant: 'warning', icon: Clock },
  'in-progress': { label: 'In Progress', variant: 'default', icon: Loader2 },
};

export default function PassportPage() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [entries, setEntries] = useState<PassportEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [showShareModal, setShowShareModal] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    Promise.all([getUserProfile(), getPassportEntries()]).then(
      ([profileData, entriesData]) => {
        setProfile(profileData);
        setEntries(entriesData);
        setLoading(false);
      }
    );
  }, []);

  const handleShare = () => {
    setShowShareModal(true);
    setCopied(false);
  };

  const handleCopyLink = () => {
    const shareUrl = `${window.location.origin}/passport?user=tanvi-sharma`;
    navigator.clipboard.writeText(shareUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  if (loading || !profile) {
    return (
      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <div className="h-32 animate-pulse rounded-xl border border-slate-200 bg-slate-100" />
        <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-20 animate-pulse rounded-xl border border-slate-200 bg-slate-100" />
          ))}
        </div>
      </main>
    );
  }

  const verifiedCount = entries.filter((e) => e.status === 'verified').length;
  const totalSkills = [...new Set(entries.flatMap((e) => e.skills))].length;

  return (
    <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      {/* Share Modal */}
      {showShareModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="relative mx-4 w-full max-w-md rounded-xl border border-slate-200 bg-white p-6 shadow-xl">
            <button
              onClick={() => setShowShareModal(false)}
              className="absolute right-4 top-4 rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600 cursor-pointer"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>
            <div className="text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-indigo-100">
                <Link2 className="h-6 w-6 text-indigo-600" />
              </div>
              <h3 className="mt-4 text-lg font-bold text-slate-900">
                Share Your Impact Passport
              </h3>
              <p className="mt-2 text-sm text-slate-500">
                Share your verified achievements with employers, universities, or collaborators.
              </p>
            </div>
            <div className="mt-5 flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5">
              <input
                type="text"
                readOnly
                value={`${typeof window !== 'undefined' ? window.location.origin : ''}/passport?user=tanvi-sharma`}
                className="flex-1 bg-transparent text-sm text-slate-700 outline-none"
              />
              <button
                onClick={handleCopyLink}
                className={`shrink-0 rounded-md px-3 py-1.5 text-xs font-medium transition-all cursor-pointer ${
                  copied
                    ? 'bg-emerald-100 text-emerald-700'
                    : 'bg-indigo-600 text-white hover:bg-indigo-700'
                }`}
              >
                {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-2">
              <button className="rounded-lg border border-slate-200 px-3 py-2 text-xs font-medium text-slate-600 transition-colors hover:bg-slate-50 cursor-pointer">
                LinkedIn
              </button>
              <button className="rounded-lg border border-slate-200 px-3 py-2 text-xs font-medium text-slate-600 transition-colors hover:bg-slate-50 cursor-pointer">
                Email
              </button>
              <button className="rounded-lg border border-slate-200 px-3 py-2 text-xs font-medium text-slate-600 transition-colors hover:bg-slate-50 cursor-pointer">
                Download PDF
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Profile Header */}
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-indigo-600 text-xl font-bold text-white">
              {profile.avatar}
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-slate-900">
                {profile.name}
              </h1>
              <p className="text-sm text-slate-500">{profile.university}</p>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {profile.interests.map((interest) => (
                  <Badge key={interest} variant="outline">
                    {interest}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3 rounded-xl border border-indigo-100 bg-indigo-50 px-5 py-4">
            <Trophy className="h-8 w-8 text-indigo-600" />
            <div>
              <p className="text-sm font-medium text-indigo-600">
                Verified Impact Score
              </p>
              <p className="text-3xl font-bold tracking-tight text-indigo-700">
                {profile.impactScore}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {[
          {
            icon: FolderGit2,
            label: 'Completed Projects',
            value: profile.completedProjects,
          },
          {
            icon: Zap,
            label: 'Active Challenges',
            value: profile.activeChallenges,
          },
          {
            icon: Award,
            label: 'Unique Skills',
            value: totalSkills,
          },
          {
            icon: Timer,
            label: 'Hours Contributed',
            value: profile.hoursContributed,
          },
        ].map((stat) => (
          <Card key={stat.label}>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100">
                <stat.icon className="h-5 w-5 text-slate-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
                <p className="text-xs text-slate-500">{stat.label}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Impact Log */}
      <div className="mt-10">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold tracking-tight text-slate-900">
              Impact Log
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              {verifiedCount} verified ·{' '}
              {entries.length - verifiedCount} in progress or pending
            </p>
          </div>
          <Button variant="secondary" size="sm" onClick={handleShare}>
            Share Passport
            <ExternalLink className="h-3.5 w-3.5" />
          </Button>
        </div>

        <div className="space-y-4">
          {entries.map((entry) => {
            const config = statusConfig[entry.status];
            const StatusIcon = config.icon;
            return (
              <Card key={entry.id} hover>
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-lg font-semibold text-slate-900">
                        {entry.project}
                      </h3>
                      <Badge variant={config.variant}>
                        <StatusIcon className="mr-1 h-3 w-3" />
                        {config.label}
                      </Badge>
                    </div>
                    <p className="mt-1 text-sm text-slate-500">
                      {entry.role} · {entry.organization}
                    </p>
                    <p className="mt-3 text-sm leading-relaxed text-slate-600">
                      {entry.description}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {entry.skills.map((skill) => (
                        <Badge key={skill} variant="outline">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                    <div className="mt-4 grid gap-2 text-xs text-slate-500 sm:grid-cols-2">
                      {entry.verifiedBy && (
                        <span className="flex items-center gap-1">
                          <Shield className="h-3.5 w-3.5 text-emerald-500" />
                          Verified by {entry.verifiedBy}
                        </span>
                      )}
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3.5 w-3.5" />
                        {new Date(entry.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </span>
                    </div>
                    {entry.evidence && entry.status === 'verified' && (
                      <div className="mt-3 rounded-lg bg-slate-50 px-3 py-2 text-xs text-slate-600">
                        <span className="font-medium">Evidence:</span>{' '}
                        {entry.evidence}
                      </div>
                    )}
                    {entry.impactMetric && (
                      <div className="mt-2 flex items-center gap-1 text-xs font-medium text-indigo-600">
                        <Zap className="h-3 w-3" />
                        {entry.impactMetric}
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </main>
  );
}
