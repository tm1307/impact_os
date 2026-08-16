'use client';

import { useState } from 'react';
import {
  Shield,
  CheckCircle2,
  XCircle,
  Clock,
  FileText,
  User,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Star,
  Building2,
  Eye,
} from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

interface VerificationRequest {
  id: string;
  studentName: string;
  studentAvatar: string;
  university: string;
  project: string;
  program: string;
  role: string;
  submittedDate: string;
  evidence: string[];
  skills: string[];
  impactStatement: string;
  status: 'pending' | 'approved' | 'rejected';
}

const verificationRequests: VerificationRequest[] = [
  {
    id: '1',
    studentName: 'Tanvi Sharma',
    studentAvatar: 'TS',
    university: 'IIT Delhi',
    project: 'Multi-Sensor Anomaly Detection Prototype',
    program: 'Climate AI Fellowship',
    role: 'Lead ML Engineer',
    submittedDate: '2025-11-12',
    evidence: ['GitHub Repository (142 commits)', 'Demo Video (8 min)', 'Technical Report (24 pages)', 'Mentor Evaluation Form'],
    skills: ['Python', 'Edge AI', 'TensorFlow', 'Data Analysis', 'IoT'],
    impactStatement: 'Built and deployed a real-time anomaly detection system across 3 urban monitoring stations, processing 50,000+ sensor readings daily to detect environmental anomalies with 94% accuracy.',
    status: 'pending',
  },
  {
    id: '2',
    studentName: 'Arjun Patel',
    studentAvatar: 'AP',
    university: 'NIT Trichy',
    project: 'Accessible Navigation App',
    program: 'Open Source Summer Code',
    role: 'Mobile Developer',
    submittedDate: '2025-11-10',
    evidence: ['GitHub Repository (89 commits)', 'User Testing Report', 'App Store Listing Screenshot'],
    skills: ['React Native', 'Accessibility', 'UX Research', 'Firebase'],
    impactStatement: 'Developed a navigation app for visually impaired users, tested with 30 users at a local NGO. App rated 4.6/5 in usability testing.',
    status: 'pending',
  },
  {
    id: '3',
    studentName: 'Maria Chen',
    studentAvatar: 'MC',
    university: 'Peking University',
    project: 'Youth Policy Brief on Digital Inclusion',
    program: 'Youth Policy Research Lab',
    role: 'Research Lead',
    submittedDate: '2025-11-08',
    evidence: ['Published Policy Brief (PDF)', 'Research Dataset', 'Presentation Slides', 'Peer Review Comments'],
    skills: ['Policy Analysis', 'Academic Writing', 'Data Visualization', 'Research Methods'],
    impactStatement: 'Authored a 15-page policy brief analyzing digital inclusion programs in 5 Southeast Asian countries, cited by 2 subsequent UNESCO working papers.',
    status: 'approved',
  },
  {
    id: '4',
    studentName: 'James Okafor',
    studentAvatar: 'JO',
    university: 'University of Lagos',
    project: 'Solar-Powered Community Charging Station',
    program: 'Sustainable Design Hackathon',
    role: 'Hardware Lead',
    submittedDate: '2025-11-05',
    evidence: ['Prototype Photos', 'Circuit Diagrams', 'Cost Analysis Report'],
    skills: ['Electrical Engineering', 'Solar Energy', 'Prototyping', 'CAD'],
    impactStatement: 'Designed and built a solar charging station prototype capable of charging 20 devices simultaneously, reducing community energy costs by an estimated 40%.',
    status: 'approved',
  },
];

export default function VerifyPage() {
  const [requests, setRequests] = useState(verificationRequests);
  const [expandedId, setExpandedId] = useState<string | null>('1');
  const [filter, setFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all');

  const handleVerify = (id: string, newStatus: 'approved' | 'rejected') => {
    setRequests(prev =>
      prev.map(r => (r.id === id ? { ...r, status: newStatus } : r))
    );
  };

  const filtered = requests.filter(r => filter === 'all' || r.status === filter);
  const pendingCount = requests.filter(r => r.status === 'pending').length;
  const approvedCount = requests.filter(r => r.status === 'approved').length;

  return (
    <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      {/* Header */}
      <div className="mb-2 flex items-center gap-2">
        <Badge variant="warning" size="md">
          <Building2 className="mr-1 h-3.5 w-3.5" />
          Organization View
        </Badge>
      </div>
      <h1 className="text-3xl font-bold tracking-tight text-slate-900">
        Verification Dashboard
      </h1>
      <p className="mt-2 text-slate-600">
        Review student evidence, verify contributions, and endorse skills for Impact Passports.
      </p>

      {/* Stats */}
      <div className="mt-8 grid grid-cols-3 gap-4">
        <Card>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-50">
              <Clock className="h-5 w-5 text-amber-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-900">{pendingCount}</p>
              <p className="text-xs text-slate-500">Pending Review</p>
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-50">
              <CheckCircle2 className="h-5 w-5 text-emerald-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-900">{approvedCount}</p>
              <p className="text-xs text-slate-500">Verified</p>
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-50">
              <Star className="h-5 w-5 text-indigo-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-900">{requests.length}</p>
              <p className="text-xs text-slate-500">Total Submissions</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Filters */}
      <div className="mt-8 flex items-center gap-2">
        {(['all', 'pending', 'approved', 'rejected'] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors cursor-pointer ${
              filter === f
                ? 'bg-indigo-50 text-indigo-700'
                : 'text-slate-500 hover:bg-slate-100 hover:text-slate-700'
            }`}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      {/* Verification Cards */}
      <div className="mt-6 space-y-4">
        {filtered.map((req) => {
          const isExpanded = expandedId === req.id;
          return (
            <div
              key={req.id}
              className={`rounded-xl border bg-white shadow-sm transition-all ${
                req.status === 'pending'
                  ? 'border-amber-200'
                  : req.status === 'approved'
                  ? 'border-emerald-200'
                  : 'border-slate-200'
              }`}
            >
              {/* Summary row */}
              <button
                onClick={() => setExpandedId(isExpanded ? null : req.id)}
                className="flex w-full items-center gap-4 p-5 text-left cursor-pointer"
              >
                <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white ${
                  req.status === 'pending' ? 'bg-amber-500' : req.status === 'approved' ? 'bg-emerald-500' : 'bg-slate-400'
                }`}>
                  {req.studentAvatar}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-semibold text-slate-900 truncate">{req.studentName}</p>
                    <Badge
                      variant={req.status === 'pending' ? 'warning' : req.status === 'approved' ? 'success' : 'danger'}
                    >
                      {req.status === 'pending' && <Clock className="mr-1 h-3 w-3" />}
                      {req.status === 'approved' && <CheckCircle2 className="mr-1 h-3 w-3" />}
                      {req.status === 'rejected' && <XCircle className="mr-1 h-3 w-3" />}
                      {req.status.charAt(0).toUpperCase() + req.status.slice(1)}
                    </Badge>
                  </div>
                  <p className="text-xs text-slate-500 truncate">
                    {req.project} · {req.program}
                  </p>
                </div>
                <div className="shrink-0 text-slate-400">
                  {isExpanded ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                </div>
              </button>

              {/* Expanded detail */}
              {isExpanded && (
                <div className="border-t border-slate-100 px-5 pb-5 pt-4">
                  <div className="grid gap-6 lg:grid-cols-2">
                    {/* Left: Details */}
                    <div className="space-y-4">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Student</p>
                        <div className="mt-2 flex items-center gap-2">
                          <User className="h-4 w-4 text-slate-400" />
                          <span className="text-sm text-slate-700">{req.studentName} · {req.university}</span>
                        </div>
                      </div>
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Role</p>
                        <p className="mt-1 text-sm text-slate-700">{req.role} at {req.program}</p>
                      </div>
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Impact Statement</p>
                        <p className="mt-1 text-sm leading-relaxed text-slate-700">{req.impactStatement}</p>
                      </div>
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Skills to Verify</p>
                        <div className="mt-2 flex flex-wrap gap-1.5">
                          {req.skills.map((skill) => (
                            <Badge key={skill} variant="outline">{skill}</Badge>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Right: Evidence */}
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Submitted Evidence</p>
                      <div className="mt-2 space-y-2">
                        {req.evidence.map((item, i) => (
                          <div
                            key={i}
                            className="flex items-center gap-3 rounded-lg border border-slate-100 bg-slate-50 px-3 py-2.5"
                          >
                            <FileText className="h-4 w-4 shrink-0 text-slate-400" />
                            <span className="flex-1 text-sm text-slate-700">{item}</span>
                            <button className="text-indigo-600 hover:text-indigo-800 cursor-pointer">
                              <Eye className="h-4 w-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                      <p className="mt-3 text-xs text-slate-400">
                        Submitted on {new Date(req.submittedDate).toLocaleDateString('en-US', {
                          year: 'numeric', month: 'long', day: 'numeric',
                        })}
                      </p>

                      {/* Action buttons */}
                      {req.status === 'pending' && (
                        <div className="mt-5 flex gap-3">
                          <Button
                            onClick={() => handleVerify(req.id, 'approved')}
                            className="flex-1"
                          >
                            <CheckCircle2 className="h-4 w-4" />
                            Verify & Approve
                          </Button>
                          <Button
                            variant="secondary"
                            onClick={() => handleVerify(req.id, 'rejected')}
                            className="flex-1"
                          >
                            <XCircle className="h-4 w-4" />
                            Request Changes
                          </Button>
                        </div>
                      )}

                      {req.status === 'approved' && (
                        <div className="mt-5 rounded-lg border border-emerald-200 bg-emerald-50 p-3 text-center">
                          <CheckCircle2 className="mx-auto h-6 w-6 text-emerald-600" />
                          <p className="mt-1 text-sm font-medium text-emerald-700">Verified & Added to Passport</p>
                          <p className="text-xs text-emerald-600">Skills and impact permanently recorded</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </main>
  );
}
