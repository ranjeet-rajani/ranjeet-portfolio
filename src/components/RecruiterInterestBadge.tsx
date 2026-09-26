import { useState, useEffect, useRef } from 'react';
import {
  TrendingUp,
  Calendar,
  Download,
  Mail,
  RotateCcw,
  X,
  Sparkles,
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
  Globe,
} from 'lucide-react';
import {
  getStoredAnalytics,
  recordCtaClick,
  resetStoredAnalytics,
  computeRecruiterInterestTier,
} from '../utils/analyticsTracker';
import { RecruiterAnalyticsState } from '../types';

export default function RecruiterInterestBadge() {
  const isAdmin = typeof window !== 'undefined' && window.location.search.includes('admin=true');
  if (!isAdmin) {
    return null;
  }

  const [analytics, setAnalytics] = useState<RecruiterAnalyticsState>(getStoredAnalytics);
  const [isPopoverOpen, setIsPopoverOpen] = useState<boolean>(false);
  const [justUpdated, setJustUpdated] = useState<boolean>(false);
  const popoverRef = useRef<HTMLDivElement>(null);

  // Subscribe to real-time CTA tracking events
  useEffect(() => {
    const handleCtaTracked = (e: Event) => {
      const customEvent = e as CustomEvent<{ state: RecruiterAnalyticsState }>;
      if (customEvent.detail?.state) {
        setAnalytics(customEvent.detail.state);
      } else {
        setAnalytics(getStoredAnalytics());
      }
      setJustUpdated(true);
      setTimeout(() => setJustUpdated(false), 1400);
    };

    window.addEventListener('rkr_cta_tracked', handleCtaTracked);
    return () => {
      window.removeEventListener('rkr_cta_tracked', handleCtaTracked);
    };
  }, []);

  // Close popover when clicking outside
  useEffect(() => {
    if (!isPopoverOpen) return;
    const handleClickOutside = (event: MouseEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
        setIsPopoverOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isPopoverOpen]);

  const tier = computeRecruiterInterestTier(analytics);

  const handleTestScheduleClick = () => {
    recordCtaClick('schedule', 'Simulated Schedule CTA Click');
  };

  const handleReset = () => {
    resetStoredAnalytics();
  };

  const formatTimestamp = (ts: number) => {
    const diff = Math.floor((Date.now() - ts) / 1000);
    if (diff < 10) return 'Just now';
    if (diff < 60) return `${diff}s ago`;
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    return new Date(ts).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="relative inline-block font-body" ref={popoverRef}>
      {/* Recruiter Interest Badge Button */}
      <button
        id="footer-recruiter-interest-badge"
        type="button"
        onClick={() => setIsPopoverOpen((prev) => !prev)}
        aria-expanded={isPopoverOpen}
        aria-haspopup="dialog"
        title="View Recruiter Engagement & Intent Telemetry"
        className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full border transition-all duration-200 cursor-pointer shadow-sm ${
          tier.badgeBgColor
        } ${tier.badgeBorderColor} ${
          justUpdated ? 'scale-105 ring-2 ring-[#7bd0ff]' : ''
        }`}
      >
        <span className="relative flex h-2 w-2">
          <span
            className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${tier.dotColor}`}
          />
          <span className={`relative inline-flex rounded-full h-2 w-2 ${tier.dotColor}`} />
        </span>

        <TrendingUp className={`w-3.5 h-3.5 ${tier.textColor}`} />

        <span className="font-mono text-[11px] font-medium tracking-wide text-white">
          Recruiter Interest:
        </span>

        <span
          className={`font-mono text-[10px] font-bold px-1.5 py-0.5 rounded tracking-wider uppercase ${tier.textColor} bg-[#060e20]/60 border border-white/10`}
        >
          {tier.level} ({analytics.totalClicks})
        </span>
      </button>

      {/* Telemetry Popover Modal */}
      {isPopoverOpen && (
        <div
          id="recruiter-analytics-popover"
          role="dialog"
          aria-label="Recruiter Interest Telemetry"
          className="absolute bottom-full mb-3 left-1/2 -translate-x-1/2 sm:left-auto sm:right-0 sm:translate-x-0 w-[340px] sm:w-[380px] bg-[#0f172a] border border-[#222a3d] rounded-xl shadow-2xl p-4.5 z-50 text-left animate-in fade-in zoom-in-95 duration-150 backdrop-blur-md"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-[#1e293b] pb-3 mb-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-[#2563eb]/20 text-[#7bd0ff] flex items-center justify-center">
                <TrendingUp className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-mono text-xs font-bold text-white tracking-wide uppercase flex items-center gap-1.5">
                  RECRUITER ENGAGEMENT
                  <span className="text-[9px] bg-[#10b981]/20 text-[#4edea3] border border-[#10b981]/40 px-1.5 py-0.2 rounded font-bold">
                    ACTIVE
                  </span>
                </h4>
                <p className="text-[10px] text-[#8d90a0]">Stored in browser localStorage telemetry</p>
              </div>
            </div>

            <button
              onClick={() => setIsPopoverOpen(false)}
              className="p-1 rounded text-[#8d90a0] hover:text-white hover:bg-[#1e293b] transition-colors"
              title="Close Telemetry"
              aria-label="Close Telemetry"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Current Score & Status Card */}
          <div className="bg-[#131b2e] border border-[#1e293b] rounded-lg p-3 mb-3">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs text-[#8d90a0] font-mono">Current Intent Index:</span>
              <span className={`text-xs font-mono font-bold ${tier.textColor}`}>
                {tier.badgeTitle}
              </span>
            </div>
            <p className="text-xs text-[#dae2fd] leading-relaxed">
              {tier.description}
            </p>
            {/* Progress gauge */}
            <div className="w-full bg-[#1e293b] rounded-full h-1.5 mt-2.5 overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-500 ${
                  analytics.totalClicks >= 5
                    ? 'bg-[#4edea3]'
                    : analytics.totalClicks >= 3
                    ? 'bg-amber-400'
                    : analytics.totalClicks >= 1
                    ? 'bg-[#7bd0ff]'
                    : 'bg-slate-600'
                }`}
                style={{
                  width: `${Math.min(100, Math.max(12, (analytics.totalClicks / 6) * 100))}%`,
                }}
              />
            </div>
          </div>

          {/* Breakdown Grid */}
          <div className="grid grid-cols-4 gap-1.5 mb-3">
            <div className="bg-[#0b1326] border border-[#1e293b] rounded p-1.5 text-center">
              <div className="flex items-center justify-center gap-1 text-[9px] font-mono text-[#4edea3] mb-1">
                <Calendar className="w-2.5 h-2.5" />
                <span>Call</span>
              </div>
              <span className="font-mono text-sm font-bold text-white">
                {analytics.byType.schedule}
              </span>
            </div>

            <div className="bg-[#0b1326] border border-[#1e293b] rounded p-1.5 text-center">
              <div className="flex items-center justify-center gap-1 text-[9px] font-mono text-[#7bd0ff] mb-1">
                <Download className="w-2.5 h-2.5" />
                <span>CV</span>
              </div>
              <span className="font-mono text-sm font-bold text-white">
                {analytics.byType.resume}
              </span>
            </div>

            <div className="bg-[#0b1326] border border-[#1e293b] rounded p-1.5 text-center">
              <div className="flex items-center justify-center gap-1 text-[9px] font-mono text-amber-400 mb-1">
                <Mail className="w-2.5 h-2.5" />
                <span>Contact</span>
              </div>
              <span className="font-mono text-sm font-bold text-white">
                {analytics.byType.contact + analytics.byType.email + analytics.byType.phone}
              </span>
            </div>

            <div className="bg-[#0b1326] border border-[#1e293b] rounded p-1.5 text-center">
              <div className="flex items-center justify-center gap-1 text-[9px] font-mono text-[#38bdf8] mb-1">
                <Globe className="w-2.5 h-2.5" />
                <span>Socials</span>
              </div>
              <span className="font-mono text-sm font-bold text-white">
                {analytics.byType.social || 0}
              </span>
            </div>
          </div>

          {/* Recent Event Log */}
          <div className="mb-3">
            <div className="flex items-center justify-between text-[11px] font-mono text-[#8d90a0] mb-1.5">
              <span>RECENT CTA CLICKS</span>
              <span>TOTAL: {analytics.totalClicks}</span>
            </div>
            <div className="max-h-[110px] overflow-y-auto space-y-1 pr-1 custom-scrollbar">
              {analytics.events.length === 0 ? (
                <div className="text-[11px] text-[#64748b] italic py-2 text-center bg-[#0b1326]/40 rounded border border-[#1e293b]">
                  No CTA clicks logged yet. Click &apos;Schedule&apos; or &apos;Download Resume&apos; above!
                </div>
              ) : (
                analytics.events.slice(0, 5).map((ev) => (
                  <div
                    key={ev.id}
                    className="flex items-center justify-between p-1.5 rounded bg-[#0b1326]/60 border border-[#1e293b] text-[10px] font-mono"
                  >
                    <div className="flex items-center gap-1.5 truncate mr-2">
                      <CheckCircle2 className="w-3 h-3 text-[#4edea3] shrink-0" />
                      <span className="text-[#dae2fd] truncate">{ev.label}</span>
                    </div>
                    <span className="text-[#64748b] shrink-0">{formatTimestamp(ev.timestamp)}</span>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Quick Actions / Reset / Test */}
          <div className="pt-2 border-t border-[#1e293b] flex items-center justify-between gap-2 text-[10px] font-mono">
            <button
              onClick={handleTestScheduleClick}
              className="px-2.5 py-1.5 rounded bg-[#131b2e] hover:bg-[#1e293b] border border-[#222a3d] hover:border-[#4edea3]/50 text-[#4edea3] flex items-center gap-1 transition-colors cursor-pointer"
              title="Simulate Schedule Click to test tracker"
            >
              <Sparkles className="w-3 h-3" />
              <span>+ Log Schedule</span>
            </button>

            <button
              onClick={handleReset}
              className="px-2.5 py-1.5 rounded text-[#8d90a0] hover:text-red-400 hover:bg-red-500/10 flex items-center gap-1 transition-colors cursor-pointer ml-auto"
              title="Reset recruiter telemetry in localStorage"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
