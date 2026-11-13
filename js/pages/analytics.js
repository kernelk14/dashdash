/**
 * DashPulse Admin Dashboard Template
 * Page: Analytics & Deep Metrics
 */

window.AnalyticsPage = (function () {
  let compareEnabled = true;
  let activeTimeframe = "7d";
  let activeCategory = "all";

  function render(container) {
    DashComponents.updateBreadcrumbs([
      { label: "Dashboard", href: "#dashboard" },
      { label: "Analytics", href: "#analytics" }
    ]);

    container.innerHTML = `
      <div class="space-y-6">
        <!-- Page Header & Filter Bar -->
        <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 class="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">Analytics & Intelligence</h1>
            <p class="text-sm text-slate-500 dark:text-slate-400 mt-1">Cross-platform traffic, conversion funnels, and product cohort performance.</p>
          </div>

          <div class="flex flex-wrap items-center gap-3">
            <!-- Comparison Toggle -->
            <label class="inline-flex items-center gap-2 text-xs font-medium text-slate-600 dark:text-slate-300 cursor-pointer bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-3 py-2 rounded-lg shadow-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
              <input type="checkbox" id="compare-toggle" class="rounded border-slate-300 text-blue-600 focus:ring-blue-500" ${compareEnabled ? 'checked' : ''}>
              <span>Compare Previous Period</span>
            </label>

            <!-- Export Dropdown / Button -->
            <div class="relative inline-block text-left" id="export-dropdown-wrapper">
              <button id="btn-analytics-export" type="button" class="inline-flex items-center gap-2 px-3.5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold shadow-sm transition-colors">
                <i data-lucide="download" class="w-3.5 h-3.5"></i>
                Export Dataset
                <i data-lucide="chevron-down" class="w-3.5 h-3.5"></i>
              </button>
              <div id="analytics-export-menu" class="hidden absolute right-0 mt-2 w-44 rounded-xl shadow-lg bg-white dark:bg-slate-900 ring-1 ring-black ring-opacity-5 border border-slate-200 dark:border-slate-800 z-30 py-1">
                <button type="button" id="export-csv-opt" class="w-full text-left px-4 py-2 text-xs text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-2">
                  <i data-lucide="file-spreadsheet" class="w-3.5 h-3.5 text-emerald-500"></i> Export as CSV
                </button>
                <button type="button" id="export-json-opt" class="w-full text-left px-4 py-2 text-xs text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-2">
                  <i data-lucide="file-code" class="w-3.5 h-3.5 text-blue-500"></i> Export as JSON
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Filter Sub-bar (Date Range & Category Selectors) -->
        <div class="p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200/80 dark:border-slate-800/80 shadow-sm flex flex-wrap items-center justify-between gap-4">
          <div class="flex flex-wrap items-center gap-3">
            <span class="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Filters:</span>
            
            <div class="inline-flex rounded-lg border border-slate-200 dark:border-slate-800 p-0.5 text-xs bg-slate-50 dark:bg-slate-800/50">
              <button type="button" data-tf="7d" class="tf-btn px-3 py-1.5 rounded-md font-medium transition-colors ${activeTimeframe === '7d' ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-sm font-semibold' : 'text-slate-600 dark:text-slate-400'}">Last 7 Days</button>
              <button type="button" data-tf="30d" class="tf-btn px-3 py-1.5 rounded-md font-medium transition-colors ${activeTimeframe === '30d' ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-sm font-semibold' : 'text-slate-600 dark:text-slate-400'}">Last 30 Days</button>
              <button type="button" data-tf="90d" class="tf-btn px-3 py-1.5 rounded-md font-medium transition-colors ${activeTimeframe === '90d' ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-sm font-semibold' : 'text-slate-600 dark:text-slate-400'}">Last Quarter</button>
              <button type="button" data-tf="1y" class="tf-btn px-3 py-1.5 rounded-md font-medium transition-colors ${activeTimeframe === '1y' ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-sm font-semibold' : 'text-slate-600 dark:text-slate-400'}">Past Year</button>
            </div>

            <select id="analytics-category-select" class="text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg px-3 py-1.5 text-slate-700 dark:text-slate-300 focus:ring-blue-500 focus:border-blue-500">
              <option value="all">All Product Categories</option>
              <option value="cloud">Cloud Storage</option>
              <option value="compute">Compute Nodes</option>
              <option value="api">API Gateways</option>
              <option value="support">SLA Enterprise Support</option>
            </select>
          </div>

          <div class="text-xs text-slate-500 flex items-center gap-1.5">
            <i data-lucide="clock" class="w-3.5 h-3.5"></i>
            Data updated: <span class="font-medium text-slate-700 dark:text-slate-300">Today at 11:58 AM</span>
          </div>
        </div>

        <!-- Metric Stat Cards -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div class="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 shadow-sm">
            <div class="text-xs font-semibold text-slate-500 uppercase tracking-wider">Avg Session Duration</div>
            <div class="text-2xl font-bold text-slate-900 dark:text-white mt-1">4m 38s</div>
            <div class="flex items-center text-xs text-emerald-600 dark:text-emerald-400 mt-2 font-medium">
              <i data-lucide="trending-up" class="w-3.5 h-3.5 mr-1"></i> +18.4% vs prev period
            </div>
          </div>
          <div class="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 shadow-sm">
            <div class="text-xs font-semibold text-slate-500 uppercase tracking-wider">Bounce Rate</div>
            <div class="text-2xl font-bold text-slate-900 dark:text-white mt-1">28.4%</div>
            <div class="flex items-center text-xs text-emerald-600 dark:text-emerald-400 mt-2 font-medium">
              <i data-lucide="trending-down" class="w-3.5 h-3.5 mr-1"></i> -3.2% (Improved)
            </div>
          </div>
          <div class="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 shadow-sm">
            <div class="text-xs font-semibold text-slate-500 uppercase tracking-wider">Pageviews / Session</div>
            <div class="text-2xl font-bold text-slate-900 dark:text-white mt-1">5.82</div>
            <div class="flex items-center text-xs text-emerald-600 dark:text-emerald-400 mt-2 font-medium">
              <i data-lucide="trending-up" class="w-3.5 h-3.5 mr-1"></i> +0.65 pages
            </div>
          </div>
          <div class="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 shadow-sm">
            <div class="text-xs font-semibold text-slate-500 uppercase tracking-wider">Net Revenue Retention</div>
            <div class="text-2xl font-bold text-slate-900 dark:text-white mt-1">118.2%</div>
            <div class="flex items-center text-xs text-emerald-600 dark:text-emerald-400 mt-2 font-medium">
              <i data-lucide="trending-up" class="w-3.5 h-3.5 mr-1"></i> Top decile SaaS
            </div>
          </div>
        </div>

        <!-- Charts Grid (2 columns) -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <!-- Traffic and Pageviews Chart -->
          <div class="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 shadow-sm">
            <div class="flex items-center justify-between mb-4">
              <div>
                <h2 class="text-base font-semibold text-slate-900 dark:text-white">Traffic Volume vs. Page Views</h2>
                <p class="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Dual-metric audience engagement</p>
              </div>
              <span class="text-xs font-mono px-2 py-1 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">Daily Aggregation</span>
            </div>
            <div class="h-72 w-full">
              <canvas id="analytics-traffic-chart"></canvas>
            </div>
          </div>

          <!-- Category Breakdown Chart -->
          <div class="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 shadow-sm">
            <div class="flex items-center justify-between mb-4">
              <div>
                <h2 class="text-base font-semibold text-slate-900 dark:text-white">Product Category Breakdown</h2>
                <p class="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Revenue generated by core modules ($)</p>
              </div>
              <span class="text-xs font-mono px-2 py-1 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">YTD Revenue</span>
            </div>
            <div class="h-72 w-full">
              <canvas id="analytics-category-chart"></canvas>
            </div>
          </div>
        </div>

        <!-- Geographic & Cohort Performance Table -->
        <div class="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 shadow-sm overflow-hidden">
          <div class="p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <div>
              <h2 class="text-base font-semibold text-slate-900 dark:text-white">Top Regional Markets</h2>
              <p class="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Audience distribution and revenue contributions</p>
            </div>
            <span class="text-xs text-slate-400">5 Active Regions</span>
          </div>
          <div class="table-scroll-container">
            <table class="w-full text-left text-xs">
              <thead class="bg-slate-50/75 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400 font-semibold border-b border-slate-100 dark:border-slate-800">
                <tr>
                  <th class="p-3.5 pl-6">Region</th>
                  <th class="p-3.5">Active Users</th>
                  <th class="p-3.5">Total Revenue</th>
                  <th class="p-3.5">Market Share</th>
                  <th class="p-3.5 pr-6">Progress</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-100 dark:divide-slate-800/60">
                <tr class="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                  <td class="p-3.5 pl-6 font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                    <span class="text-base">🇺🇸</span> United States & Canada
                  </td>
                  <td class="p-3.5 text-slate-700 dark:text-slate-300">14,820</td>
                  <td class="p-3.5 font-semibold text-slate-900 dark:text-white">$68,400</td>
                  <td class="p-3.5 text-slate-600 dark:text-slate-400 font-mono">53.2%</td>
                  <td class="p-3.5 pr-6 w-48">
                    <div class="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                      <div class="bg-blue-600 h-full rounded-full" style="width: 53.2%"></div>
                    </div>
                  </td>
                </tr>
                <tr class="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                  <td class="p-3.5 pl-6 font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                    <span class="text-base">🇩🇪</span> European Union (EU)
                  </td>
                  <td class="p-3.5 text-slate-700 dark:text-slate-300">7,240</td>
                  <td class="p-3.5 font-semibold text-slate-900 dark:text-white">$32,150</td>
                  <td class="p-3.5 text-slate-600 dark:text-slate-400 font-mono">25.0%</td>
                  <td class="p-3.5 pr-6 w-48">
                    <div class="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                      <div class="bg-indigo-600 h-full rounded-full" style="width: 25.0%"></div>
                    </div>
                  </td>
                </tr>
                <tr class="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                  <td class="p-3.5 pl-6 font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                    <span class="text-base">🇯🇵</span> Japan & APAC
                  </td>
                  <td class="p-3.5 text-slate-700 dark:text-slate-300">3,490</td>
                  <td class="p-3.5 font-semibold text-slate-900 dark:text-white">$15,480</td>
                  <td class="p-3.5 text-slate-600 dark:text-slate-400 font-mono">12.1%</td>
                  <td class="p-3.5 pr-6 w-48">
                    <div class="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                      <div class="bg-emerald-600 h-full rounded-full" style="width: 12.1%"></div>
                    </div>
                  </td>
                </tr>
                <tr class="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                  <td class="p-3.5 pl-6 font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                    <span class="text-base">🇬🇧</span> United Kingdom
                  </td>
                  <td class="p-3.5 text-slate-700 dark:text-slate-300">2,110</td>
                  <td class="p-3.5 font-semibold text-slate-900 dark:text-white">$8,900</td>
                  <td class="p-3.5 text-slate-600 dark:text-slate-400 font-mono">6.9%</td>
                  <td class="p-3.5 pr-6 w-48">
                    <div class="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                      <div class="bg-amber-600 h-full rounded-full" style="width: 6.9%"></div>
                    </div>
                  </td>
                </tr>
                <tr class="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                  <td class="p-3.5 pl-6 font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                    <span class="text-base">🇧🇷</span> Latin America (LATAM)
                  </td>
                  <td class="p-3.5 text-slate-700 dark:text-slate-300">1,020</td>
                  <td class="p-3.5 font-semibold text-slate-900 dark:text-white">$3,500</td>
                  <td class="p-3.5 text-slate-600 dark:text-slate-400 font-mono">2.8%</td>
                  <td class="p-3.5 pr-6 w-48">
                    <div class="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                      <div class="bg-purple-600 h-full rounded-full" style="width: 2.8%"></div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `;

    if (window.lucide) window.lucide.createIcons({ root: container });

    // Render charts
    setTimeout(() => {
      DashCharts.renderAnalyticsTrafficChart("analytics-traffic-chart", compareEnabled);
      DashCharts.renderAnalyticsCategoryChart("analytics-category-chart");
    }, 50);

    // Bind compare toggle
    const compareCheck = document.getElementById("compare-toggle");
    if (compareCheck) {
      compareCheck.addEventListener("change", (e) => {
        compareEnabled = e.target.checked;
        DashCharts.renderAnalyticsTrafficChart("analytics-traffic-chart", compareEnabled);
        DashComponents.showToast(`Comparison line ${compareEnabled ? 'enabled' : 'disabled'}`, "info", 1500);
      });
    }

    // Bind timeframe buttons
    container.querySelectorAll(".tf-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const tf = btn.dataset.tf;
        activeTimeframe = tf;
        container.querySelectorAll(".tf-btn").forEach(b => {
          b.className = "tf-btn px-3 py-1.5 rounded-md font-medium transition-colors text-slate-600 dark:text-slate-400";
        });
        btn.className = "tf-btn px-3 py-1.5 rounded-md font-medium transition-colors bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-sm font-semibold";

        DashCharts.renderAnalyticsTrafficChart("analytics-traffic-chart", compareEnabled);
        DashComponents.showToast(`Analytics filtered by ${btn.textContent}`, "info", 1500);
      });
    });

    // Category select
    const catSelect = document.getElementById("analytics-category-select");
    if (catSelect) {
      catSelect.addEventListener("change", (e) => {
        activeCategory = e.target.value;
        DashCharts.renderAnalyticsCategoryChart("analytics-category-chart");
        DashComponents.showToast(`Filtered category: ${catSelect.options[catSelect.selectedIndex].text}`, "info", 1500);
      });
    }

    // Export Dropdown menu toggle
    const exportBtn = document.getElementById("btn-analytics-export");
    const exportMenu = document.getElementById("analytics-export-menu");
    if (exportBtn && exportMenu) {
      exportBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        exportMenu.classList.toggle("hidden");
      });

      document.addEventListener("click", () => {
        exportMenu.classList.add("hidden");
      });
    }

    // Export actions
    const exportCsv = document.getElementById("export-csv-opt");
    if (exportCsv) {
      exportCsv.addEventListener("click", () => {
        const headers = ["Region", "Active Users", "Revenue", "Market Share"];
        const rows = [
          ["United States & Canada", "14820", "$68,400", "53.2%"],
          ["European Union (EU)", "7240", "$32,150", "25.0%"],
          ["Japan & APAC", "3490", "$15,480", "12.1%"],
          ["United Kingdom", "2110", "$8,900", "6.9%"],
          ["Latin America (LATAM)", "1020", "$3,500", "2.8%"]
        ];
        DashComponents.exportToCSV("analytics_regional_breakdown", headers, rows);
      });
    }

    const exportJson = document.getElementById("export-json-opt");
    if (exportJson) {
      exportJson.addEventListener("click", () => {
        const payload = {
          timeframe: activeTimeframe,
          generatedAt: new Date().toISOString(),
          metrics: {
            sessionDuration: "4m 38s",
            bounceRate: "28.4%",
            pageviewsPerSession: 5.82,
            netRevenueRetention: "118.2%"
          },
          regions: [
            { region: "US & Canada", users: 14820, revenue: 68400, share: 0.532 },
            { region: "EU", users: 7240, revenue: 32150, share: 0.250 },
            { region: "Japan & APAC", users: 3490, revenue: 15480, share: 0.121 },
            { region: "UK", users: 2110, revenue: 8900, share: 0.069 },
            { region: "LATAM", users: 1020, revenue: 3500, share: 0.028 }
          ]
        };
        DashComponents.exportToJSON("analytics_report", payload);
      });
    }
  }

  return { render };
})();
