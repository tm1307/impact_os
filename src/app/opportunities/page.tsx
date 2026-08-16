'use client';

import { useEffect, useState } from 'react';
import { Search, Filter, MapPin, Clock, ArrowUpRight, Stamp } from 'lucide-react';
import { getOpportunities, type Opportunity } from '@/data/mockDb';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

const domains = ['All', 'Climate & AI', 'Technology', 'Community', 'Policy & Research', 'Design & Sustainability'];
const types = ['All', 'Fellowship', 'Internship', 'Volunteering', 'Research', 'Hackathon'];

export default function OpportunitiesPage() {
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDomain, setSelectedDomain] = useState('All');
  const [selectedType, setSelectedType] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    getOpportunities().then((data) => {
      setOpportunities(data);
      setLoading(false);
    });
  }, []);

  const filtered = opportunities.filter((opp) => {
    const matchesDomain = selectedDomain === 'All' || opp.domain === selectedDomain;
    const matchesType = selectedType === 'All' || opp.type === selectedType;
    const matchesSearch =
      searchQuery === '' ||
      opp.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      opp.organization.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesDomain && matchesType && matchesSearch;
  });

  return (
    <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">
          Opportunities
        </h1>
        <p className="mt-2 text-slate-600">
          Discover programs matched to your profile, interests, and eligibility.
        </p>
      </div>

      <div className="flex flex-col gap-8 lg:flex-row">
        {/* Sidebar Filters */}
        <aside className="w-full shrink-0 lg:w-64">
          <div className="sticky top-24 space-y-6">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search opportunities..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-lg border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-sm text-slate-900 placeholder:text-slate-400 focus:border-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-100"
              />
            </div>

            {/* Domain Filter */}
            <div>
              <div className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
                <Filter className="h-3.5 w-3.5" />
                Domain
              </div>
              <div className="space-y-1">
                {domains.map((domain) => (
                  <button
                    key={domain}
                    onClick={() => setSelectedDomain(domain)}
                    className={`w-full rounded-lg px-3 py-2 text-left text-sm transition-colors cursor-pointer ${
                      selectedDomain === domain
                        ? 'bg-indigo-50 font-medium text-indigo-700'
                        : 'text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    {domain}
                  </button>
                ))}
              </div>
            </div>

            {/* Type Filter */}
            <div>
              <div className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
                <Filter className="h-3.5 w-3.5" />
                Type
              </div>
              <div className="space-y-1">
                {types.map((type) => (
                  <button
                    key={type}
                    onClick={() => setSelectedType(type)}
                    className={`w-full rounded-lg px-3 py-2 text-left text-sm transition-colors cursor-pointer ${
                      selectedType === type
                        ? 'bg-indigo-50 font-medium text-indigo-700'
                        : 'text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* Opportunities List */}
        <div className="flex-1">
          {loading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-48 animate-pulse rounded-xl border border-slate-200 bg-slate-100" />
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="rounded-xl border border-slate-200 bg-white px-6 py-16 text-center">
              <Search className="mx-auto h-10 w-10 text-slate-300" />
              <p className="mt-4 text-lg font-medium text-slate-900">No opportunities found</p>
              <p className="mt-1 text-sm text-slate-500">Try adjusting your filters</p>
            </div>
          ) : (
            <div className="space-y-4">
              <p className="text-sm text-slate-500">
                Showing {filtered.length} {filtered.length === 1 ? 'opportunity' : 'opportunities'}
              </p>
              {filtered.map((opp) => (
                <Card key={opp.id} hover>
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-lg font-semibold text-slate-900">
                          {opp.title}
                        </h3>
                        <Badge variant={opp.matchScore >= 90 ? 'success' : 'default'}>
                          <Stamp className="mr-1 h-3 w-3" />
                          {opp.matchScore}% Match
                        </Badge>
                      </div>
                      <p className="mt-1 text-sm text-slate-500">{opp.organization}</p>
                      <p className="mt-3 text-sm leading-relaxed text-slate-600">
                        {opp.description}
                      </p>
                      <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-slate-500">
                        <span className="flex items-center gap-1">
                          <MapPin className="h-3.5 w-3.5" />
                          {opp.location} · {opp.format}
                        </span>
                        <span className={`flex items-center gap-1 font-medium ${
                          opp.daysUntilDeadline <= 5 ? 'text-red-600' : opp.daysUntilDeadline <= 10 ? 'text-amber-600' : 'text-slate-500'
                        }`}>
                          <Clock className="h-3.5 w-3.5" />
                          {opp.daysUntilDeadline} days left
                        </span>
                      </div>
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {opp.skills.map((skill) => (
                          <Badge key={skill} variant="outline">{skill}</Badge>
                        ))}
                      </div>
                    </div>
                    <div className="shrink-0">
                      <Button variant="primary" size="sm" href={`/opportunities/${opp.id}`}>
                        View & Apply
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
