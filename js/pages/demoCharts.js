/**
 * DashPulse Admin Dashboard Template
 * Page: Charts Gallery (CoreUI Inspired Chart.js Showcase)
 */

window.DemoChartsPage = (function () {
  function render(container) {
    DashComponents.updateBreadcrumbs([
      { label: "Components", href: "#charts" },
      { label: "Charts", href: "#charts" }
    ]);

    container.innerHTML = `
      <div class="space-y-6">
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 class="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">Chart.js Visualizations</h1>
            <p class="text-sm text-slate-500 dark:text-slate-400 mt-1">Responsive, theme-synced data visualizations featuring Line, Bar, Doughnut, Radar, Pie, and Polar Area charts.</p>
          </div>
          <div class="flex items-center gap-2">
            <button type="button" id="charts-refresh-btn" class="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 shadow-xs transition-colors">
              <i data-lucide="refresh-cw" class="w-3.5 h-3.5"></i>
              <span>Refresh Charts</span>
            </button>
          </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <!-- Line Chart -->
          <div class="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 shadow-sm p-6 space-y-4">
            <div class="flex items-center justify-between">
              <div>
                <h3 class="text-sm font-bold text-slate-900 dark:text-white">Multi-Axis Line Chart</h3>
                <p class="text-xs text-slate-500">Historical performance metrics across consecutive periods.</p>
              </div>
              <span class="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-50 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400">Line</span>
            </div>
            <div class="h-64 relative">
              <canvas id="charts-demo-line"></canvas>
            </div>
          </div>

          <!-- Bar Chart -->
          <div class="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 shadow-sm p-6 space-y-4">
            <div class="flex items-center justify-between">
              <div>
                <h3 class="text-sm font-bold text-slate-900 dark:text-white">Grouped Bar Chart</h3>
                <p class="text-xs text-slate-500">Monthly breakdown comparing base vs target expectations.</p>
              </div>
              <span class="px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-50 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400">Bar</span>
            </div>
            <div class="h-64 relative">
              <canvas id="charts-demo-bar"></canvas>
            </div>
          </div>

          <!-- Doughnut Chart -->
          <div class="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 shadow-sm p-6 space-y-4">
            <div class="flex items-center justify-between">
              <div>
                <h3 class="text-sm font-bold text-slate-900 dark:text-white">Doughnut Chart</h3>
                <p class="text-xs text-slate-500">Traffic distribution across client platform form-factors.</p>
              </div>
              <span class="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-50 dark:bg-amber-900/40 text-amber-600 dark:text-amber-400">Doughnut</span>
            </div>
            <div class="h-64 relative">
              <canvas id="charts-demo-doughnut"></canvas>
            </div>
          </div>

          <!-- Radar Chart -->
          <div class="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 shadow-sm p-6 space-y-4">
            <div class="flex items-center justify-between">
              <div>
                <h3 class="text-sm font-bold text-slate-900 dark:text-white">Radar Chart</h3>
                <p class="text-xs text-slate-500">Multivariate performance evaluation of team disciplines.</p>
              </div>
              <span class="px-2 py-0.5 rounded text-[10px] font-bold bg-purple-50 dark:bg-purple-900/40 text-purple-600 dark:text-purple-400">Radar</span>
            </div>
            <div class="h-64 relative">
              <canvas id="charts-demo-radar"></canvas>
            </div>
          </div>

          <!-- Pie Chart -->
          <div class="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 shadow-sm p-6 space-y-4">
            <div class="flex items-center justify-between">
              <div>
                <h3 class="text-sm font-bold text-slate-900 dark:text-white">Pie Chart</h3>
                <p class="text-xs text-slate-500">Cloud compute allocation across global hosting data centers.</p>
              </div>
              <span class="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400">Pie</span>
            </div>
            <div class="h-64 relative">
              <canvas id="charts-demo-pie"></canvas>
            </div>
          </div>

          <!-- Polar Area Chart -->
          <div class="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 shadow-sm p-6 space-y-4">
            <div class="flex items-center justify-between">
              <div>
                <h3 class="text-sm font-bold text-slate-900 dark:text-white">Polar Area Chart</h3>
                <p class="text-xs text-slate-500">Telemetry variance and compute latency distributions.</p>
              </div>
              <span class="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-50 dark:bg-rose-900/40 text-rose-600 dark:text-rose-400">Polar Area</span>
            </div>
            <div class="h-64 relative">
              <canvas id="charts-demo-polar"></canvas>
            </div>
          </div>
        </div>
      </div>
    `;

    if (window.lucide) window.lucide.createIcons();

    // Render charts
    renderAllCharts();

    const refreshBtn = container.querySelector("#charts-refresh-btn");
    if (refreshBtn) {
      refreshBtn.addEventListener("click", () => {
        renderAllCharts();
        DashComponents.showToast("Chart instances re-rendered with active theme tokens.", "success");
      });
    }
  }

  function renderAllCharts() {
    DashCharts.renderChartsPageLine();
    DashCharts.renderChartsPageBar();
    DashCharts.renderChartsPageDoughnut();
    DashCharts.renderChartsPageRadar();
    DashCharts.renderChartsPagePie();
    DashCharts.renderChartsPagePolarArea();
  }

  return {
    render
  };
})();
