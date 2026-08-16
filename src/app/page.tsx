import { ArrowRight, Search, Clock, Award, Stamp, Target, Users, CheckCircle2, GraduationCap, Briefcase, Globe, Handshake, BarChart3 } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';

export default function Home() {
  return (
    <main>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-100 via-white to-white" />
        <div className="relative mx-auto max-w-6xl px-4 py-24 sm:px-6 sm:py-32 lg:py-40">
          <div className="mx-auto max-w-3xl text-center">
            <Badge variant="outline" size="md">
              <Stamp className="mr-1.5 h-3.5 w-3.5 text-indigo-600" />
              Youth Opportunity Intelligence Platform
            </Badge>
            <h1 className="mt-6 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
              Find your opportunity.{' '}
              <span className="text-indigo-600">Make your impact.</span>{' '}
              Prove it.
            </h1>
            <p className="mt-6 text-lg leading-8 text-slate-600">
              IMPACT OS connects young people with the right programs before deadlines,
              tracks verified contributions, and builds a lifelong Impact Passport
              that proves what certificates can&apos;t.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button href="/opportunities" size="lg">
                View Opportunities
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button href="/passport" variant="secondary" size="lg">
                My Passport
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Impact in Numbers */}
      <section className="border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
            {[
              { value: '12,000+', label: 'Youth Matched', icon: Users },
              { value: '850+', label: 'Verified Passports', icon: Stamp },
              { value: '45', label: 'Countries Reached', icon: Globe },
              { value: '200+', label: 'Partner Organizations', icon: Handshake },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-indigo-50">
                  <stat.icon className="h-5 w-5 text-indigo-600" />
                </div>
                <p className="mt-3 text-3xl font-bold tracking-tight text-slate-900">
                  {stat.value}
                </p>
                <p className="mt-1 text-sm text-slate-500">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Problem / Solution Grid */}
      <section className="border-t border-slate-200 bg-slate-50/50">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-indigo-600">
              The Problem
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900">
              Why youth opportunities are broken
            </h2>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: Search,
                title: 'Scattered Opportunities',
                description:
                  'Programs are spread across dozens of websites, social media pages, and institutional portals. Students waste hours searching instead of preparing.',
              },
              {
                icon: Clock,
                title: 'Missed Deadlines',
                description:
                  'Without a centralized system, students discover opportunities after applications have already closed. Timing is everything.',
              },
              {
                icon: Award,
                title: 'Meaningless Certificates',
                description:
                  'Traditional certificates show attendance, not real contribution. They fail to capture skills, outcomes, or measurable impact.',
              },
            ].map((item) => (
              <Card key={item.title} hover>
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-50">
                  <item.icon className="h-5 w-5 text-indigo-600" />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-slate-900">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  {item.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="border-t border-slate-200">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-indigo-600">
              How It Works
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900">
              From discovery to verified impact
            </h2>
          </div>
          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                step: '01',
                icon: Search,
                title: 'Discover',
                description:
                  'Browse curated opportunities matched to your profile, interests, and eligibility.',
              },
              {
                step: '02',
                icon: Target,
                title: 'Match',
                description:
                  'AI analyzes your profile against program requirements and gives you a personalized match score.',
              },
              {
                step: '03',
                icon: Users,
                title: 'Participate',
                description:
                  'Apply, join, and contribute to fellowships, hackathons, research labs, and volunteer programs.',
              },
              {
                step: '04',
                icon: CheckCircle2,
                title: 'Verify',
                description:
                  'Your contributions are verified and permanently added to your Impact Passport.',
              },
            ].map((item) => (
              <div key={item.step} className="relative text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-indigo-600 text-white">
                  <item.icon className="h-5 w-5" />
                </div>
                <p className="mt-1 text-xs font-bold text-indigo-600">
                  STEP {item.step}
                </p>
                <h3 className="mt-3 text-lg font-semibold text-slate-900">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm text-slate-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SDG Alignment */}
      <section className="border-t border-slate-200 bg-slate-50/50">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-indigo-600">
              Global Framework
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900">
              Aligned with UN Sustainable Development Goals
            </h2>
            <p className="mt-4 text-slate-600">
              IMPACT OS directly contributes to four key SDGs by empowering youth participation worldwide.
            </p>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                sdg: 'SDG 4',
                icon: GraduationCap,
                title: 'Quality Education',
                description:
                  'Connecting youth with learning opportunities, mentorships, and skill-building programs globally.',
                color: 'bg-red-50 text-red-600 border-red-100',
              },
              {
                sdg: 'SDG 8',
                icon: Briefcase,
                title: 'Decent Work',
                description:
                  'Building verified skill portfolios that improve employability and create pathways to meaningful careers.',
                color: 'bg-amber-50 text-amber-600 border-amber-100',
              },
              {
                sdg: 'SDG 10',
                icon: BarChart3,
                title: 'Reduced Inequalities',
                description:
                  'Democratizing access to opportunities for youth from underserved and less-connected communities.',
                color: 'bg-pink-50 text-pink-600 border-pink-100',
              },
              {
                sdg: 'SDG 17',
                icon: Handshake,
                title: 'Partnerships',
                description:
                  'Creating a bridge between organizations offering programs and the youth who need them most.',
                color: 'bg-blue-50 text-blue-600 border-blue-100',
              },
            ].map((item) => (
              <div
                key={item.sdg}
                className={`rounded-xl border p-6 ${item.color}`}
              >
                <div className="flex items-center gap-2">
                  <item.icon className="h-5 w-5" />
                  <span className="text-xs font-bold uppercase tracking-wider">
                    {item.sdg}
                  </span>
                </div>
                <h3 className="mt-3 text-base font-semibold text-slate-900">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-slate-200 bg-slate-900">
        <div className="mx-auto max-w-6xl px-4 py-20 text-center sm:px-6">
          <h2 className="text-3xl font-bold tracking-tight text-white">
            Ready to build your Impact Passport?
          </h2>
          <p className="mt-4 text-lg text-slate-400">
            Join thousands of young people discovering opportunities and proving their impact.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button href="/opportunities" size="lg">
              Explore Opportunities
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
          <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <div className="flex items-center gap-2">
                <div className="flex h-7 w-7 items-center justify-center rounded-md bg-indigo-600">
                  <Stamp className="h-3.5 w-3.5 text-white" />
                </div>
                <span className="text-sm font-semibold text-slate-900">
                  IMPACT <span className="text-indigo-600">OS</span>
                </span>
              </div>
              <p className="mt-3 max-w-xs text-sm text-slate-500">
                AI-powered youth opportunity intelligence and verified impact tracking.
                Built for the UNESCO Youth Hackathon.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-8 text-sm">
              <div>
                <p className="font-semibold text-slate-900">Platform</p>
                <ul className="mt-3 space-y-2 text-slate-500">
                  <li><a href="/opportunities" className="hover:text-slate-900 transition-colors">Opportunities</a></li>
                  <li><a href="/passport" className="hover:text-slate-900 transition-colors">Impact Passport</a></li>
                </ul>
              </div>
              <div>
                <p className="font-semibold text-slate-900">About</p>
                <ul className="mt-3 space-y-2 text-slate-500">
                  <li>SDG Alignment</li>
                  <li>Open Source</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="mt-8 border-t border-slate-100 pt-6 text-center text-xs text-slate-400">
            &copy; {new Date().getFullYear()} IMPACT OS &middot; Youth Opportunity Intelligence Platform
          </div>
        </div>
      </footer>
    </main>
  );
}
