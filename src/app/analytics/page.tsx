'use client';

import { useState } from 'react';
import {
  TrendingUp,
  Award,
  GitCommitHorizontal,
  Globe,
  Calendar,
  ChevronDown,
} from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';

// Radar chart data
const radarLabels = ['Technical', 'Leadership', 'Communication', 'Research', 'Creative', 'Community'];
const radarValues = [0.92, 0.65, 0.78, 0.7, 0.55, 0.88]; // 0-1 scale

// Skill bars
const topSkills = [
  { name: 'Python', level: 92, projects: 4 },
  { name: 'React / TypeScript', level: 85, projects: 3 },
  { name: 'Data Analysis', level: 78, projects: 3 },
  { name: 'Edge AI / IoT', level: 72, projects: 2 },
  { name: 'Teaching & Mentoring', level: 88, projects: 3 },
  { name: 'Technical Writing', level: 65, projects: 2 },
  { name: 'API Design', level: 60, projects: 1 },
  { name: 'Accessibility', level: 70, projects: 1 },
];

// Heatmap data - 20 weeks x 7 days
const generateHeatmap = () => {
  const data: number[][] = [];
  for (let w = 0; w < 20; w++) {
    const week: number[] = [];
    for (let d = 0; d < 7; d++) {
      // Generate deterministic pseudo-random patterns based on indices to prevent hydration errors
      const base = ((w * 13 + d * 7) % 100) / 100;
      const isWeekday = d < 5;
      const recentBoost = w > 14 ? 0.2 : 0;
      const val = isWeekday ? base * 0.7 + recentBoost : base * 0.3;
      week.push(val);
    }
    data.push(week);
  }
  return data;
};

const heatmapData = generateHeatmap();

const getHeatColor = (val: number): string => {
  if (val < 0.1) return 'bg-slate-100';
  if (val < 0.3) return 'bg-indigo-100';
  if (val < 0.5) return 'bg-indigo-200';
  if (val < 0.7) return 'bg-indigo-400';
  return 'bg-indigo-600';
};

// Timeline data
const timeline = [
  { month: 'Jul 2025', projects: 1, hours: 45, highlight: 'Started Carbon Footprint Calculator API' },
  { month: 'Jun 2025', projects: 1, hours: 38, highlight: 'Completed Digital Literacy Workshop Series' },
  { month: 'May 2025', projects: 0, hours: 22, highlight: 'Ongoing open source contributions' },
  { month: 'Apr 2025', projects: 1, hours: 52, highlight: 'Finished Accessibility Toolkit contributions' },
];

// SVG radar helper
function polarToCartesian(cx: number, cy: number, r: number, angleDeg: number) {
  const angleRad = ((angleDeg - 90) * Math.PI) / 180;
  return { x: cx + r * Math.cos(angleRad), y: cy + r * Math.sin(angleRad) };
}

function radarPoints(cx: number, cy: number, maxR: number, values: number[]): string {
  return values
    .map((v, i) => {
      const angle = (360 / values.length) * i;
      const { x, y } = polarToCartesian(cx, cy, maxR * v, angle);
      return `${x},${y}`;
    })
    .join(' ');
}

function gridPolygon(cx: number, cy: number, maxR: number, scale: number, n: number): string {
  return Array.from({ length: n })
    .map((_, i) => {
      const angle = (360 / n) * i;
      const { x, y } = polarToCartesian(cx, cy, maxR * scale, angle);
      return `${x},${y}`;
    })
    .join(' ');
}

export default function AnalyticsPage() {
  const [dateRange] = useState('Last 6 months');
  const cx = 150, cy = 150, maxR = 110;

  return (
    <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      {/* Header */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            Impact Analytics
          </h1>
          <p className="mt-2 text-slate-600">
            Track your growth, skills, and contributions over time.
          </p>
        </div>
        <button className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50 cursor-pointer">
          <Calendar className="h-4 w-4" />
          {dateRange}
          <ChevronDown className="h-3.5 w-3.5 text-slate-400" />
        </button>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {[
          { icon: TrendingUp, label: 'Impact Score', value: '847', change: '+12%', changeColor: 'text-emerald-600' },
          { icon: Award, label: 'Total Skills', value: '16', change: '+3 new', changeColor: 'text-indigo-600' },
          { icon: GitCommitHorizontal, label: 'Contributions', value: '47', change: '+8 this mo.', changeColor: 'text-emerald-600' },
          { icon: Globe, label: 'Global Rank', value: '#342', change: 'Top 5%', changeColor: 'text-amber-600' },
        ].map((stat) => (
          <Card key={stat.label}>
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-medium text-slate-500">{stat.label}</p>
                <p className="mt-1 text-2xl font-bold text-slate-900">{stat.value}</p>
              </div>
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100">
                <stat.icon className="h-4 w-4 text-slate-600" />
              </div>
            </div>
            <p className={`mt-2 text-xs font-medium ${stat.changeColor}`}>
              {stat.change}
            </p>
          </Card>
        ))}
      </div>

      {/* Radar + Heatmap Row */}
      <div className="mt-8 grid gap-8 lg:grid-cols-2">
        {/* Skill Radar */}
        <Card>
          <h2 className="text-lg font-bold text-slate-900">Skill Radar</h2>
          <p className="mt-1 text-sm text-slate-500">Your competency profile across 6 dimensions</p>
          <div className="mt-4 flex justify-center">
            <svg viewBox="0 0 300 300" className="h-64 w-64 sm:h-72 sm:w-72">
              <defs>
                <linearGradient id="radarGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#6366f1" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#818cf8" stopOpacity="0.1" />
                </linearGradient>
              </defs>
              {/* Grid rings */}
              {[0.25, 0.5, 0.75, 1].map((scale) => (
                <polygon
                  key={scale}
                  points={gridPolygon(cx, cy, maxR, scale, 6)}
                  fill="none"
                  stroke="#e2e8f0"
                  strokeWidth="1"
                />
              ))}
              {/* Axis lines */}
              {radarLabels.map((_, i) => {
                const angle = (360 / 6) * i;
                const { x, y } = polarToCartesian(cx, cy, maxR, angle);
                return <line key={i} x1={cx} y1={cy} x2={x} y2={y} stroke="#e2e8f0" strokeWidth="1" />;
              })}
              {/* Data polygon */}
              <polygon
                points={radarPoints(cx, cy, maxR, radarValues)}
                fill="url(#radarGrad)"
                stroke="#6366f1"
                strokeWidth="2"
              />
              {/* Data points */}
              {radarValues.map((v, i) => {
                const angle = (360 / 6) * i;
                const { x, y } = polarToCartesian(cx, cy, maxR * v, angle);
                return <circle key={i} cx={x} cy={y} r="4" fill="#6366f1" stroke="white" strokeWidth="2" />;
              })}
              {/* Labels */}
              {radarLabels.map((label, i) => {
                const angle = (360 / 6) * i;
                const { x, y } = polarToCartesian(cx, cy, maxR + 20, angle);
                return (
                  <text
                    key={label}
                    x={x}
                    y={y}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className="fill-slate-600 text-[11px] font-medium"
                  >
                    {label}
                  </text>
                );
              })}
            </svg>
          </div>
        </Card>

        {/* Contribution Heatmap */}
        <Card>
          <h2 className="text-lg font-bold text-slate-900">Contribution Activity</h2>
          <p className="mt-1 text-sm text-slate-500">Your activity over the past 20 weeks</p>
          <div className="mt-6 overflow-x-auto">
            <div className="inline-grid grid-rows-7 gap-[3px]" style={{ gridAutoFlow: 'column' }}>
              {/* Transpose: iterate days first, then weeks */}
              {Array.from({ length: 7 }).map((_, dayIdx) =>
                heatmapData.map((week, weekIdx) => (
                  <div
                    key={`${weekIdx}-${dayIdx}`}
                    className={`h-3 w-3 rounded-sm ${getHeatColor(week[dayIdx])}`}
                    title={`Week ${weekIdx + 1}, Day ${dayIdx + 1}`}
                  />
                ))
              )}
            </div>
          </div>
          <div className="mt-4 flex items-center justify-end gap-1.5 text-xs text-slate-500">
            <span>Less</span>
            <div className="h-3 w-3 rounded-sm bg-slate-100" />
            <div className="h-3 w-3 rounded-sm bg-indigo-100" />
            <div className="h-3 w-3 rounded-sm bg-indigo-200" />
            <div className="h-3 w-3 rounded-sm bg-indigo-400" />
            <div className="h-3 w-3 rounded-sm bg-indigo-600" />
            <span>More</span>
          </div>
        </Card>
      </div>

      {/* Skill Breakdown */}
      <div className="mt-8">
        <Card>
          <h2 className="text-lg font-bold text-slate-900">Skill Breakdown</h2>
          <p className="mt-1 text-sm text-slate-500">Verified skill levels based on project work</p>
          <div className="mt-6 space-y-4">
            {topSkills.map((skill) => (
              <div key={skill.name}>
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium text-slate-700">{skill.name}</span>
                  <span className="text-slate-500">{skill.level}% · {skill.projects} {skill.projects === 1 ? 'project' : 'projects'}</span>
                </div>
                <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-slate-100">
                  <div
                    className="h-full rounded-full bg-indigo-500 transition-all duration-700"
                    style={{ width: `${skill.level}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Monthly Timeline */}
      <div className="mt-8">
        <Card>
          <h2 className="text-lg font-bold text-slate-900">Monthly Activity</h2>
          <p className="mt-1 text-sm text-slate-500">Recent contributions and milestones</p>
          <div className="mt-6 space-y-4">
            {timeline.map((month) => (
              <div key={month.month} className="flex items-start gap-4 rounded-lg border border-slate-100 p-4">
                <div className="shrink-0 rounded-lg bg-indigo-50 px-3 py-2 text-center">
                  <p className="text-xs font-bold text-indigo-600">{month.month.split(' ')[0]}</p>
                  <p className="text-[10px] text-indigo-400">{month.month.split(' ')[1]}</p>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-slate-900">{month.highlight}</p>
                  <div className="mt-1 flex gap-3">
                    <Badge variant="outline">{month.projects} {month.projects === 1 ? 'project' : 'projects'}</Badge>
                    <Badge variant="outline">{month.hours} hours</Badge>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </main>
  );
}
