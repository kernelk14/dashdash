/**
 * DashPulse Admin Dashboard Template
 * Page: Dashboard Overview (CoreUI Inspired Flagship Layout)
 */

window.DashboardPage = (function () {
  let trafficTimeframe = "Month";

  function render(container) {
    DashComponents.updateBreadcrumbs([{ label: "Home", href: "#dashboard" }, { label: "Dashboard", href: "#dashboard" }]);

    container.innerHTML = `
      <div class="space-y-6">
        <!-- Top 4 Signature Metric Widget Cards with Embedded Sparklines -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <!-- Card 1: Users -->
          <div class="bg-blue-600 text-white rounded-2xl p-5 shadow-sm relative overflow-hidden flex flex-col justify-between">
            <div>
              <div class="flex items-center justify-between">
                <span class="text-xs font-semibold uppercase tracking-wider text-blue-100">Active Users</span>
                <div class="relative">
                  <button type="button" class="text-blue-100 hover:text-white p-1">
                    <i data-lucide="more-vertical" class="w-4 h-4"></i>
                  </button>
                </div>
              </div>
              <div class="flex items-baseline gap-2 mt-2">
                <div class="text-3xl font-extrabold font-mono tracking-tight">26K</div>
                <span class="text-xs font-semibold text-blue-100 flex items-center">
                  <i data-lucide="arrow-down" class="w-3.5 h-3.5 mr-0.5"></i> -12.4%
                </span>
              </div>
            </div>
            <!-- Sparkline Canvas -->
            <div class="h-16 w-full mt-4 -mb-2 -mx-2">
              <canvas id="sparkline-users"></canvas>
            </div>
          </div>

          <!-- Card 2: Income -->
          <div class="bg-indigo-600 text-white rounded-2xl p-5 shadow-sm relative overflow-hidden flex flex-col justify-between">
            <div>
              <div class="flex items-center justify-between">
                <span class="text-xs font-semibold uppercase tracking-wider text-indigo-100">Gross Income</span>
                <div class="relative">
                  <button type="button" class="text-indigo-100 hover:text-white p-1">
                    <i data-lucide="more-vertical" class="w-4 h-4"></i>
                  </button>
                </div>
              </div>
              <div class="flex items-baseline gap-2 mt-2">
                <div class="text-3xl font-extrabold font-mono tracking-tight">$6,200</div>
                <span class="text-xs font-semibold text-emerald-300 flex items-center">
                  <i data-lucide="arrow-up" class="w-3.5 h-3.5 mr-0.5"></i> +40.9%
                </span>
              </div>
            </div>
            <!-- Sparkline Canvas -->
            <div class="h-16 w-full mt-4 -mb-2 -mx-2">
              <canvas id="sparkline-income"></canvas>
            </div>
          </div>

          <!-- Card 3: Conversion Rate -->
          <div class="bg-amber-500 text-white rounded-2xl p-5 shadow-sm relative overflow-hidden flex flex-col justify-between">
            <div>
              <div class="flex items-center justify-between">
                <span class="text-xs font-semibold uppercase tracking-wider text-amber-100">Conversion Rate</span>
                <div class="relative">
                  <button type="button" class="text-amber-100 hover:text-white p-1">
                    <i data-lucide="more-vertical" class="w-4 h-4"></i>
                  </button>
                </div>
              </div>
              <div class="flex items-baseline gap-2 mt-2">
                <div class="text-3xl font-extrabold font-mono tracking-tight">2.49%</div>
                <span class="text-xs font-semibold text-amber-100 flex items-center">
                  <i data-lucide="arrow-up" class="w-3.5 h-3.5 mr-0.5"></i> +84.7%
                </span>
              </div>
            </div>
            <!-- Sparkline Canvas (Bar) -->
            <div class="h-16 w-full mt-4 -mb-2 -mx-2">
              <canvas id="sparkline-conversion"></canvas>
            </div>
          </div>

          <!-- Card 4: Sessions -->
          <div class="bg-rose-600 text-white rounded-2xl p-5 shadow-sm relative overflow-hidden flex flex-col justify-between">
            <div>
              <div class="flex items-center justify-between">
                <span class="text-xs font-semibold uppercase tracking-wider text-rose-100">Visitor Sessions</span>
                <div class="relative">
                  <button type="button" class="text-rose-100 hover:text-white p-1">
                    <i data-lucide="more-vertical" class="w-4 h-4"></i>
                  </button>
                </div>
              </div>
              <div class="flex items-baseline gap-2 mt-2">
                <div class="text-3xl font-extrabold font-mono tracking-tight">44K</div>
                <span class="text-xs font-semibold text-rose-200 flex items-center">
                  <i data-lucide="arrow-down" class="w-3.5 h-3.5 mr-0.5"></i> -23.6%
                </span>
              </div>
            </div>
            <!-- Sparkline Canvas -->
            <div class="h-16 w-full mt-4 -mb-2 -mx-2">
              <canvas id="sparkline-sessions"></canvas>
            </div>
          </div>
        </div>

        <!-- Main Traffic Chart Card (CoreUI Signature) -->
        <div class="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 shadow-sm overflow-hidden">
          <div class="p-6 border-b border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h2 class="text-lg font-bold text-slate-900 dark:text-white tracking-tight">Global Traffic & Recurring Revenue</h2>
              <p class="text-xs text-slate-500 mt-0.5" id="traffic-period-subtitle">January - December 2026</p>
            </div>

            <div class="flex items-center gap-3">
              <!-- Day / Month / Year Button Group -->
              <div class="inline-flex rounded-xl border border-slate-200 dark:border-slate-800 p-0.5 bg-slate-50 dark:bg-slate-800 text-xs">
                <button type="button" data-tf="Day" class="traffic-tf-btn px-3 py-1.5 rounded-lg font-medium transition-colors ${trafficTimeframe === 'Day' ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-sm font-semibold' : 'text-slate-600 dark:text-slate-400'}">Day</button>
                <button type="button" data-tf="Month" class="traffic-tf-btn px-3 py-1.5 rounded-lg font-medium transition-colors ${trafficTimeframe === 'Month' ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-sm font-semibold' : 'text-slate-600 dark:text-slate-400'}">Month</button>
                <button type="button" data-tf="Year" class="traffic-tf-btn px-3 py-1.5 rounded-lg font-medium transition-colors ${trafficTimeframe === 'Year' ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-sm font-semibold' : 'text-slate-600 dark:text-slate-400'}">Year</button>
              </div>

              <button id="btn-traffic-download" type="button" class="p-2 text-slate-500 hover:text-slate-900 dark:hover:text-white rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 shadow-sm" title="Download Report">
                <i data-lucide="download" class="w-4 h-4"></i>
              </button>
            </div>
          </div>

          <!-- Chart Area -->
          <div class="p-6 h-80 w-full">
            <canvas id="dashboard-revenue-chart"></canvas>
          </div>

          <!-- Bottom 5 Progress KPI Metric Meters (CoreUI Signature) -->
          <div class="grid grid-cols-2 md:grid-cols-5 divide-x divide-y md:divide-y-0 divide-slate-100 dark:divide-slate-800 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/20 text-center text-xs">
            <div class="p-4 space-y-2">
              <span class="text-slate-500 font-medium">Visited</span>
              <div class="font-bold text-slate-900 dark:text-white text-sm">29.703 Users (40%)</div>
              <div class="w-full bg-slate-200 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden">
                <div class="bg-emerald-500 h-full rounded-full" style="width: 40%"></div>
              </div>
            </div>

            <div class="p-4 space-y-2">
              <span class="text-slate-500 font-medium">Unique</span>
              <div class="font-bold text-slate-900 dark:text-white text-sm">24.093 Users (20%)</div>
              <div class="w-full bg-slate-200 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden">
                <div class="bg-blue-500 h-full rounded-full" style="width: 20%"></div>
              </div>
            </div>

            <div class="p-4 space-y-2">
              <span class="text-slate-500 font-medium">Pageviews</span>
              <div class="font-bold text-slate-900 dark:text-white text-sm">78.706 Views (60%)</div>
              <div class="w-full bg-slate-200 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden">
                <div class="bg-amber-500 h-full rounded-full" style="width: 60%"></div>
              </div>
            </div>

            <div class="p-4 space-y-2">
              <span class="text-slate-500 font-medium">New Users</span>
              <div class="font-bold text-slate-900 dark:text-white text-sm">22.123 Users (80%)</div>
              <div class="w-full bg-slate-200 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden">
                <div class="bg-rose-500 h-full rounded-full" style="width: 80%"></div>
              </div>
            </div>

            <div class="p-4 space-y-2 col-span-2 md:col-span-1">
              <span class="text-slate-500 font-medium">Bounce Rate</span>
              <div class="font-bold text-slate-900 dark:text-white text-sm">40.15% (Average)</div>
              <div class="w-full bg-slate-200 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden">
                <div class="bg-purple-500 h-full rounded-full" style="width: 40.15%"></div>
              </div>
            </div>
          </div>
        </div>

        <!-- Social Media / Channel Traffic Cards -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div class="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 shadow-sm p-5 flex items-center justify-between">
            <div>
              <span class="text-xs font-bold text-slate-400 uppercase tracking-wider">GitHub Stargazers</span>
              <div class="text-2xl font-black text-slate-900 dark:text-white font-mono mt-1">12,840</div>
              <span class="text-xs text-emerald-600 font-semibold">+18% this month</span>
            </div>
            <div class="w-12 h-12 rounded-2xl bg-slate-900 text-white flex items-center justify-center dark:bg-slate-800">
              <i data-lucide="github" class="w-6 h-6"></i>
            </div>
          </div>

          <div class="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 shadow-sm p-5 flex items-center justify-between">
            <div>
              <span class="text-xs font-bold text-slate-400 uppercase tracking-wider">Twitter / X</span>
              <div class="text-2xl font-black text-slate-900 dark:text-white font-mono mt-1">48.2K</div>
              <span class="text-xs text-blue-500 font-semibold">+1,420 followers</span>
            </div>
            <div class="w-12 h-12 rounded-2xl bg-sky-500 text-white flex items-center justify-center">
              <i data-lucide="twitter" class="w-6 h-6"></i>
            </div>
          </div>

          <div class="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 shadow-sm p-5 flex items-center justify-between">
            <div>
              <span class="text-xs font-bold text-slate-400 uppercase tracking-wider">LinkedIn Network</span>
              <div class="text-2xl font-black text-slate-900 dark:text-white font-mono mt-1">18,500</div>
              <span class="text-xs text-emerald-600 font-semibold">+412 connections</span>
            </div>
            <div class="w-12 h-12 rounded-2xl bg-blue-700 text-white flex items-center justify-center">
              <i data-lucide="linkedin" class="w-6 h-6"></i>
            </div>
          </div>

          <div class="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 shadow-sm p-5 flex items-center justify-between">
            <div>
              <span class="text-xs font-bold text-slate-400 uppercase tracking-wider">Discord Community</span>
              <div class="text-2xl font-black text-slate-900 dark:text-white font-mono mt-1">9,240</div>
              <span class="text-xs text-indigo-500 font-semibold">1,820 online now</span>
            </div>
            <div class="w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center">
              <i data-lucide="message-square" class="w-6 h-6"></i>
            </div>
          </div>
        </div>

        <!-- Detailed Traffic & Sales Table with Country Flags & Usage Bars (CoreUI Signature) -->
        <div class="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 shadow-sm overflow-hidden">
          <div class="p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <div>
              <h2 class="text-base font-bold text-slate-900 dark:text-white">Traffic & Customer Sales Ledger</h2>
              <p class="text-xs text-slate-500 mt-0.5">Real-time user sessions, geographic distribution, and payment methods</p>
            </div>
            <a href="#users" class="text-xs font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-400">View All Users &rarr;</a>
          </div>

          <div class="table-scroll-container">
            <table class="w-full text-left text-xs">
              <thead class="bg-slate-50/75 dark:bg-slate-800/50 text-slate-500 font-semibold border-b border-slate-100 dark:border-slate-800">
                <tr>
                  <th class="p-3.5 pl-6">User Account</th>
                  <th class="p-3.5">Country</th>
                  <th class="p-3.5">Usage / Capacity</th>
                  <th class="p-3.5">Payment Method</th>
                  <th class="p-3.5 pr-6">Last Activity</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-100 dark:divide-slate-800/60">
                <tr class="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                  <td class="p-3.5 pl-6">
                    <div class="flex items-center gap-3">
                      <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80" alt="Sophia Martinez" class="w-8 h-8 rounded-full object-cover">
                      <div>
                        <div class="font-bold text-slate-900 dark:text-white">Sophia Martinez</div>
                        <div class="text-[11px] text-slate-400">Registered: Mar 15, 2024</div>
                      </div>
                    </div>
                  </td>
                  <td class="p-3.5">
                    <div class="flex items-center gap-2">
                      <span class="text-base">🇺🇸</span>
                      <span class="font-medium text-slate-700 dark:text-slate-300">United States</span>
                    </div>
                  </td>
                  <td class="p-3.5">
                    <div class="w-48 space-y-1">
                      <div class="flex justify-between text-[11px]">
                        <span class="font-semibold text-slate-900 dark:text-white font-mono">50%</span>
                        <span class="text-slate-400">Jun 11 - Jul 10</span>
                      </div>
                      <div class="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
                        <div class="bg-emerald-500 h-full rounded-full" style="width: 50%"></div>
                      </div>
                    </div>
                  </td>
                  <td class="p-3.5">
                    <div class="font-mono text-slate-700 dark:text-slate-300">Visa •••• 4242</div>
                    <div class="text-[10px] text-slate-400">Paid Nov 12, 2026</div>
                  </td>
                  <td class="p-3.5 pr-6 text-slate-500">10 seconds ago</td>
                </tr>

                <tr class="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                  <td class="p-3.5 pl-6">
                    <div class="flex items-center gap-3">
                      <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80" alt="Marcus Vance" class="w-8 h-8 rounded-full object-cover">
                      <div>
                        <div class="font-bold text-slate-900 dark:text-white">Marcus Vance</div>
                        <div class="text-[11px] text-slate-400">Registered: Jun 22, 2024</div>
                      </div>
                    </div>
                  </td>
                  <td class="p-3.5">
                    <div class="flex items-center gap-2">
                      <span class="text-base">🇩🇪</span>
                      <span class="font-medium text-slate-700 dark:text-slate-300">Germany</span>
                    </div>
                  </td>
                  <td class="p-3.5">
                    <div class="w-48 space-y-1">
                      <div class="flex justify-between text-[11px]">
                        <span class="font-semibold text-slate-900 dark:text-white font-mono">10%</span>
                        <span class="text-slate-400">Jun 11 - Jul 10</span>
                      </div>
                      <div class="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
                        <div class="bg-blue-500 h-full rounded-full" style="width: 10%"></div>
                      </div>
                    </div>
                  </td>
                  <td class="p-3.5">
                    <div class="font-mono text-slate-700 dark:text-slate-300">Mastercard •••• 8812</div>
                    <div class="text-[10px] text-slate-400">Paid Nov 11, 2026</div>
                  </td>
                  <td class="p-3.5 pr-6 text-slate-500">5 minutes ago</td>
                </tr>

                <tr class="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                  <td class="p-3.5 pl-6">
                    <div class="flex items-center gap-3">
                      <img src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80" alt="Karan Patel" class="w-8 h-8 rounded-full object-cover">
                      <div>
                        <div class="font-bold text-slate-900 dark:text-white">Karan Patel</div>
                        <div class="text-[11px] text-slate-400">Registered: May 30, 2024</div>
                      </div>
                    </div>
                  </td>
                  <td class="p-3.5">
                    <div class="flex items-center gap-2">
                      <span class="text-base">🇮🇳</span>
                      <span class="font-medium text-slate-700 dark:text-slate-300">India</span>
                    </div>
                  </td>
                  <td class="p-3.5">
                    <div class="w-48 space-y-1">
                      <div class="flex justify-between text-[11px]">
                        <span class="font-semibold text-slate-900 dark:text-white font-mono">74%</span>
                        <span class="text-slate-400">Jun 11 - Jul 10</span>
                      </div>
                      <div class="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
                        <div class="bg-amber-500 h-full rounded-full" style="width: 74%"></div>
                      </div>
                    </div>
                  </td>
                  <td class="p-3.5">
                    <div class="font-mono text-slate-700 dark:text-slate-300">Stripe ACH</div>
                    <div class="text-[10px] text-slate-400">Paid Nov 06, 2026</div>
                  </td>
                  <td class="p-3.5 pr-6 text-slate-500">1 hour ago</td>
                </tr>

                <tr class="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                  <td class="p-3.5 pl-6">
                    <div class="flex items-center gap-3">
                      <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80" alt="Elena Rostova" class="w-8 h-8 rounded-full object-cover">
                      <div>
                        <div class="font-bold text-slate-900 dark:text-white">Elena Rostova</div>
                        <div class="text-[11px] text-slate-400">Registered: Apr 18, 2024</div>
                      </div>
                    </div>
                  </td>
                  <td class="p-3.5">
                    <div class="flex items-center gap-2">
                      <span class="text-base">🇫🇷</span>
                      <span class="font-medium text-slate-700 dark:text-slate-300">France</span>
                    </div>
                  </td>
                  <td class="p-3.5">
                    <div class="w-48 space-y-1">
                      <div class="flex justify-between text-[11px]">
                        <span class="font-semibold text-slate-900 dark:text-white font-mono">98%</span>
                        <span class="text-slate-400">Jun 11 - Jul 10</span>
                      </div>
                      <div class="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
                        <div class="bg-rose-500 h-full rounded-full" style="width: 98%"></div>
                      </div>
                    </div>
                  </td>
                  <td class="p-3.5">
                    <div class="font-mono text-slate-700 dark:text-slate-300">PayPal Enterprise</div>
                    <div class="text-[10px] text-slate-400">Paid Nov 11, 2026</div>
                  </td>
                  <td class="p-3.5 pr-6 text-slate-500">Last month</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `;

    if (window.lucide) window.lucide.createIcons({ root: container });

    // Render sparklines
    setTimeout(() => {
      DashCharts.renderSparkline("sparkline-users", "line", [26, 32, 28, 41, 38, 52, 48], "rgba(255,255,255,0.9)");
      DashCharts.renderSparkline("sparkline-income", "line", [35, 41, 62, 42, 63, 75, 82], "rgba(255,255,255,0.9)");
      DashCharts.renderSparkline("sparkline-conversion", "bar", [2.5, 3.1, 2.8, 3.4, 4.2, 3.8, 4.5], "rgba(255,255,255,0.85)");
      DashCharts.renderSparkline("sparkline-sessions", "line", [42, 35, 55, 40, 68, 59, 72], "rgba(255,255,255,0.9)");
      DashCharts.renderDashboardRevenueChart("dashboard-revenue-chart", "30d");
    }, 50);

    // Bind Day / Month / Year timeframe buttons
    container.querySelectorAll(".traffic-tf-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const tf = btn.dataset.tf;
        trafficTimeframe = tf;
        container.querySelectorAll(".traffic-tf-btn").forEach(b => {
          b.className = "traffic-tf-btn px-3 py-1.5 rounded-lg font-medium transition-colors text-slate-600 dark:text-slate-400";
        });
        btn.className = "traffic-tf-btn px-3 py-1.5 rounded-lg font-medium transition-colors bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-sm font-semibold";

        const sub = document.getElementById("traffic-period-subtitle");
        if (sub) {
          sub.textContent = tf === "Day" ? "Today (Hourly Aggregation)" : tf === "Month" ? "January - December 2026" : "2024 - 2026 Annual Overview";
        }

        DashCharts.renderDashboardRevenueChart("dashboard-revenue-chart", tf === "Day" ? "7d" : tf === "Month" ? "30d" : "90d");
        DashComponents.showToast(`Traffic filtered by ${tf}`, "info", 1500);
      });
    });

    // Download action
    document.getElementById("btn-traffic-download")?.addEventListener("click", () => {
      DashComponents.exportToCSV("traffic_sales_report", ["Metric", "Value"], [["Active Users", "26K"], ["Gross Income", "$6,200"], ["Conversion", "2.49%"], ["Sessions", "44K"]]);
    });
  }

  return { render };
})();
