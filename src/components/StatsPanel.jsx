import React from 'react';

const StatsPanel = ({ visitorCount = 0, clickStats = {} }) => {
  const statEntries = Object.entries(clickStats)
    .sort(([, countA], [, countB]) => countB - countA)
    .slice(0, 8);

  return (
    <section className="w-full px-6 md:px-12 pb-12">
      <div className="max-w-7xl mx-auto glass-card rounded-[2rem] border border-theme p-6 md:p-8">
        <div className="flex flex-col gap-3 mb-8">
          <p className="text-xs uppercase tracking-[0.32em] text-theme-secondary">Local Stats</p>
          <h3 className="text-2xl md:text-3xl font-bold text-theme-primary">On-site activity preview</h3>
          <p className="text-theme-secondary">
            This panel shows browser-side visit and click counts for your current device. Dashboard analytics will still be available separately in Vercel and Google Analytics.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[0.7fr_1.3fr] gap-6">
          <div className="glass-card rounded-[1.6rem] border border-theme p-6">
            <p className="text-xs uppercase tracking-[0.24em] text-theme-secondary">Visits</p>
            <div className="mt-4 text-5xl font-black text-theme-primary">{visitorCount}</div>
            <p className="mt-3 text-sm text-theme-secondary">Tracked in this browser for quick local preview.</p>
          </div>

          <div className="glass-card rounded-[1.6rem] border border-theme p-6">
            <p className="text-xs uppercase tracking-[0.24em] text-theme-secondary">Top Clicks</p>
            <div className="mt-5 space-y-3">
              {statEntries.length === 0 && (
                <p className="text-sm text-theme-secondary">No tracked clicks yet. Resume, social, and certificate interactions will appear here.</p>
              )}

              {statEntries.map(([key, count]) => (
                <div key={key} className="flex items-center justify-between gap-4 rounded-xl border border-theme px-4 py-3">
                  <span className="text-sm text-theme-primary break-all">{key}</span>
                  <span className="text-sm font-semibold text-[#00f0ff]">{count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsPanel;
