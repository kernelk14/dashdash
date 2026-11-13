/**
 * DashPulse Admin Dashboard Template
 * Page: Widgets Gallery (CoreUI Inspired)
 */

window.DemoWidgetsPage = (function () {
  function render(container) {
    DashComponents.updateBreadcrumbs([
      { label: "Widgets", href: "#widgets" },
      { label: "Widgets Showcase", href: "#widgets" }
    ]);

    container.innerHTML = `
      <div class="space-y-8">
        <div>
          <h1 class="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">Widgets Collection</h1>
          <p class="text-sm text-slate-500 dark:text-slate-400 mt-1">Reusable metric cards, live sparkline widgets, user summary cards, and social telemetry blocks.</p>
        </div>

        <!-- Row 1: Sparkline KPI Widgets -->
        <div>
          <h2 class="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Stat & Sparkline Widgets</h2>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <!-- Widget 1: Users -->
            <div class="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 shadow-sm p-5 flex flex-col justify-between hover:shadow-md transition-shadow">
              <div class="flex items-start justify-between">
                <div>
                  <span class="text-xs font-semibold text-slate-500 dark:text-slate-400">Total Users</span>
                  <div class="text-2xl font-bold text-slate-900 dark:text-white tracking-tight mt-1 font-mono">26,450</div>
                </div>
                <div class="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                  <i data-lucide="users" class="w-5 h-5"></i>
                </div>
              </div>
              <div class="mt-4 flex items-center justify-between">
                <span class="text-xs font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                  <i data-lucide="trending-up" class="w-3.5 h-3.5"></i> +14.2%
                </span>
                <div class="w-24 h-8 relative">
                  <canvas id="widget-spark-1"></canvas>
                </div>
              </div>
            </div>

            <!-- Widget 2: Income -->
            <div class="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 shadow-sm p-5 flex flex-col justify-between hover:shadow-md transition-shadow">
              <div class="flex items-start justify-between">
                <div>
                  <span class="text-xs font-semibold text-slate-500 dark:text-slate-400">Total Income</span>
                  <div class="text-2xl font-bold text-slate-900 dark:text-white tracking-tight mt-1 font-mono">$84,230</div>
                </div>
                <div class="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                  <i data-lucide="dollar-sign" class="w-5 h-5"></i>
                </div>
              </div>
              <div class="mt-4 flex items-center justify-between">
                <span class="text-xs font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                  <i data-lucide="trending-up" class="w-3.5 h-3.5"></i> +8.5%
                </span>
                <div class="w-24 h-8 relative">
                  <canvas id="widget-spark-2"></canvas>
                </div>
              </div>
            </div>

            <!-- Widget 3: Conversion -->
            <div class="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 shadow-sm p-5 flex flex-col justify-between hover:shadow-md transition-shadow">
              <div class="flex items-start justify-between">
                <div>
                  <span class="text-xs font-semibold text-slate-500 dark:text-slate-400">Conversion Rate</span>
                  <div class="text-2xl font-bold text-slate-900 dark:text-white tracking-tight mt-1 font-mono">3.85%</div>
                </div>
                <div class="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 flex items-center justify-center">
                  <i data-lucide="activity" class="w-5 h-5"></i>
                </div>
              </div>
              <div class="mt-4 flex items-center justify-between">
                <span class="text-xs font-semibold text-amber-600 dark:text-amber-400 flex items-center gap-1">
                  <i data-lucide="trending-up" class="w-3.5 h-3.5"></i> +2.1%
                </span>
                <div class="w-24 h-8 relative">
                  <canvas id="widget-spark-3"></canvas>
                </div>
              </div>
            </div>

            <!-- Widget 4: Sessions -->
            <div class="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 shadow-sm p-5 flex flex-col justify-between hover:shadow-md transition-shadow">
              <div class="flex items-start justify-between">
                <div>
                  <span class="text-xs font-semibold text-slate-500 dark:text-slate-400">Active Sessions</span>
                  <div class="text-2xl font-bold text-slate-900 dark:text-white tracking-tight mt-1 font-mono">48,910</div>
                </div>
                <div class="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 flex items-center justify-center">
                  <i data-lucide="bar-chart-2" class="w-5 h-5"></i>
                </div>
              </div>
              <div class="mt-4 flex items-center justify-between">
                <span class="text-xs font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                  <i data-lucide="trending-up" class="w-3.5 h-3.5"></i> +18.4%
                </span>
                <div class="w-24 h-8 relative">
                  <canvas id="widget-spark-4"></canvas>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Row 2: Progress & Metric Meters -->
        <div>
          <h2 class="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Resource & KPI Meters</h2>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div class="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 shadow-sm p-6 space-y-3">
              <div class="flex items-center justify-between">
                <span class="text-xs font-bold text-slate-700 dark:text-slate-300">Cluster CPU Load</span>
                <span class="text-xs font-mono font-bold text-blue-600 dark:text-blue-400">72.4%</span>
              </div>
              <div class="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                <div class="bg-blue-600 h-full rounded-full" style="width: 72.4%"></div>
              </div>
              <p class="text-[11px] text-slate-400">18 out of 24 dedicated virtual cores currently active</p>
            </div>

            <div class="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 shadow-sm p-6 space-y-3">
              <div class="flex items-center justify-between">
                <span class="text-xs font-bold text-slate-700 dark:text-slate-300">NVMe Bucket Storage</span>
                <span class="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400">41.8%</span>
              </div>
              <div class="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                <div class="bg-emerald-500 h-full rounded-full" style="width: 41.8%"></div>
              </div>
              <p class="text-[11px] text-slate-400">418 GB consumed out of 1.0 TB total pool</p>
            </div>

            <div class="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 shadow-sm p-6 space-y-3">
              <div class="flex items-center justify-between">
                <span class="text-xs font-bold text-slate-700 dark:text-slate-300">Monthly Bandwidth Egress</span>
                <span class="text-xs font-mono font-bold text-amber-500">88.5%</span>
              </div>
              <div class="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                <div class="bg-amber-500 h-full rounded-full" style="width: 88.5%"></div>
              </div>
              <p class="text-[11px] text-slate-400">Warning: quota resets in 3 days (8.85 TB utilized)</p>
            </div>
          </div>
        </div>

        <!-- Row 3: User Cards & Social Media Widgets -->
        <div>
          <h2 class="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Profile & Social Widgets</h2>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <!-- User Widget 1 -->
            <div class="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 shadow-sm overflow-hidden text-center">
              <div class="h-20 bg-gradient-to-r from-blue-600 to-indigo-600"></div>
              <div class="px-6 pb-6 relative -mt-10">
                <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80" class="w-20 h-20 rounded-2xl border-4 border-white dark:border-slate-900 mx-auto object-cover shadow-sm">
                <h3 class="text-sm font-bold text-slate-900 dark:text-white mt-3">Elena Rostova</h3>
                <p class="text-xs text-slate-500">Lead Design Architect</p>
                <div class="grid grid-cols-3 gap-2 py-4 mt-2 border-y border-slate-100 dark:border-slate-800 text-xs">
                  <div>
                    <span class="font-bold font-mono text-slate-900 dark:text-white">142</span>
                    <p class="text-[10px] text-slate-400">Projects</p>
                  </div>
                  <div>
                    <span class="font-bold font-mono text-slate-900 dark:text-white">12.4k</span>
                    <p class="text-[10px] text-slate-400">Followers</p>
                  </div>
                  <div>
                    <span class="font-bold font-mono text-slate-900 dark:text-white">99.4%</span>
                    <p class="text-[10px] text-slate-400">Rating</p>
                  </div>
                </div>
                <button type="button" class="w-full mt-4 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-xs transition-colors demo-widget-action" data-user="Elena Rostova">
                  Send Direct Message
                </button>
              </div>
            </div>

            <!-- Social Card 1: Twitter / X -->
            <div class="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 shadow-sm overflow-hidden">
              <div class="p-6 bg-sky-500 text-white flex items-center justify-between">
                <i data-lucide="twitter" class="w-8 h-8"></i>
                <div class="text-right">
                  <div class="text-2xl font-bold font-mono">973k</div>
                  <span class="text-xs text-white/80">Followers</span>
                </div>
              </div>
              <div class="p-4 grid grid-cols-2 text-center text-xs divide-x divide-slate-100 dark:divide-slate-800">
                <div>
                  <div class="font-bold font-mono text-slate-900 dark:text-white">1,792</div>
                  <span class="text-[10px] text-slate-400">Tweets</span>
                </div>
                <div>
                  <div class="font-bold font-mono text-slate-900 dark:text-white">84.9k</div>
                  <span class="text-[10px] text-slate-400">Retweets</span>
                </div>
              </div>
            </div>

            <!-- Social Card 2: LinkedIn -->
            <div class="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 shadow-sm overflow-hidden">
              <div class="p-6 bg-blue-700 text-white flex items-center justify-between">
                <i data-lucide="linkedin" class="w-8 h-8"></i>
                <div class="text-right">
                  <div class="text-2xl font-bold font-mono">500+</div>
                  <span class="text-xs text-white/80">Connections</span>
                </div>
              </div>
              <div class="p-4 grid grid-cols-2 text-center text-xs divide-x divide-slate-100 dark:divide-slate-800">
                <div>
                  <div class="font-bold font-mono text-slate-900 dark:text-white">459</div>
                  <span class="text-[10px] text-slate-400">Feeds</span>
                </div>
                <div>
                  <div class="font-bold font-mono text-slate-900 dark:text-white">12.8k</div>
                  <span class="text-[10px] text-slate-400">Impressions</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    if (window.lucide) window.lucide.createIcons();

    // Render sparklines
    DashCharts.renderSparkline("widget-spark-1", "line", [26, 32, 28, 41, 38, 52, 48], "#3b82f6");
    DashCharts.renderSparkline("widget-spark-2", "line", [35, 41, 62, 42, 63, 75, 82], "#10b981");
    DashCharts.renderSparkline("widget-spark-3", "bar", [2.5, 3.1, 2.8, 3.4, 4.2, 3.8, 4.5], "#f59e0b");
    DashCharts.renderSparkline("widget-spark-4", "line", [42, 35, 55, 40, 68, 59, 72], "#8b5cf6");

    container.querySelectorAll(".demo-widget-action").forEach(btn => {
      btn.addEventListener("click", () => {
        const u = btn.getAttribute("data-user");
        DashComponents.showToast(`Conversation opened with ${u}`, "info");
      });
    });
  }

  return {
    render
  };
})();
