/**
 * DashPulse Admin Dashboard Template
 * Page: Dashboard Overview
 */

window.DashboardPage = (function () {
  let currentPeriod = "30d";

  function render(container) {
    DashComponents.updateBreadcrumbs([{ label: "Dashboard", href: "#dashboard" }]);

    container.innerHTML = `
      <div class="space-y-6">
        <!-- Top Title & Controls Header -->
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 class="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">Executive Overview</h1>
            <p class="text-sm text-slate-500 dark:text-slate-400 mt-1">Real-time performance metrics, subscriptions, and financial activity.</p>
          </div>
          <div class="flex flex-wrap items-center gap-3">
            <!-- Date Range Selector -->
            <div class="inline-flex items-center bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-1 shadow-sm text-xs font-medium">
              <button type="button" data-period="7d" class="period-btn px-3 py-1.5 rounded-md transition-colors ${currentPeriod === '7d' ? 'bg-blue-50 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400 font-semibold' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'}">7 Days</button>
              <button type="button" data-period="30d" class="period-btn px-3 py-1.5 rounded-md transition-colors ${currentPeriod === '30d' ? 'bg-blue-50 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400 font-semibold' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'}">30 Days</button>
              <button type="button" data-period="90d" class="period-btn px-3 py-1.5 rounded-md transition-colors ${currentPeriod === '90d' ? 'bg-blue-50 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400 font-semibold' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'}">Quarter</button>
            </div>

            <!-- Quick Action Buttons -->
            <button id="btn-quick-export" type="button" class="inline-flex items-center gap-1.5 px-3 py-2 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-800 rounded-lg text-xs font-medium shadow-sm transition-colors">
              <i data-lucide="download" class="w-3.5 h-3.5"></i>
              Export Summary
            </button>
            <a href="#users" class="inline-flex items-center gap-1.5 px-3.5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold shadow-sm transition-colors">
              <i data-lucide="user-plus" class="w-3.5 h-3.5"></i>
              Add User
            </a>
          </div>
        </div>

        <!-- KPI Metrics Grid -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4" id="kpi-grid">
          <!-- KPI 1 -->
          <div class="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 shadow-sm hover:shadow-md transition-shadow">
            <div class="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-2">
              <span class="text-xs font-semibold uppercase tracking-wider">Total Revenue</span>
              <div class="p-2 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400">
                <i data-lucide="dollar-sign" class="w-4 h-4"></i>
              </div>
            </div>
            <div class="flex items-baseline justify-between mt-1">
              <div class="text-2xl font-bold text-slate-900 dark:text-white" id="kpi-revenue">$128,430</div>
              <span class="inline-flex items-center text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                <i data-lucide="trending-up" class="w-3.5 h-3.5 mr-0.5"></i>
                +14.2%
              </span>
            </div>
            <p class="text-xs text-slate-400 dark:text-slate-500 mt-2">vs. $112,450 previous period</p>
          </div>

          <!-- KPI 2 -->
          <div class="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 shadow-sm hover:shadow-md transition-shadow">
            <div class="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-2">
              <span class="text-xs font-semibold uppercase tracking-wider">Active Subscriptions</span>
              <div class="p-2 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400">
                <i data-lucide="users" class="w-4 h-4"></i>
              </div>
            </div>
            <div class="flex items-baseline justify-between mt-1">
              <div class="text-2xl font-bold text-slate-900 dark:text-white" id="kpi-subs">2,845</div>
              <span class="inline-flex items-center text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                <i data-lucide="trending-up" class="w-3.5 h-3.5 mr-0.5"></i>
                +8.1%
              </span>
            </div>
            <p class="text-xs text-slate-400 dark:text-slate-500 mt-2">Net +214 new enterprise accounts</p>
          </div>

          <!-- KPI 3 -->
          <div class="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 shadow-sm hover:shadow-md transition-shadow">
            <div class="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-2">
              <span class="text-xs font-semibold uppercase tracking-wider">Average Order Value</span>
              <div class="p-2 rounded-xl bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400">
                <i data-lucide="shopping-cart" class="w-4 h-4"></i>
              </div>
            </div>
            <div class="flex items-baseline justify-between mt-1">
              <div class="text-2xl font-bold text-slate-900 dark:text-white" id="kpi-aov">$94.20</div>
              <span class="inline-flex items-center text-xs font-semibold text-rose-600 dark:text-rose-400">
                <i data-lucide="trending-down" class="w-3.5 h-3.5 mr-0.5"></i>
                -2.4%
              </span>
            </div>
            <p class="text-xs text-slate-400 dark:text-slate-500 mt-2">Down from $96.50 last cycle</p>
          </div>

          <!-- KPI 4 -->
          <div class="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 shadow-sm hover:shadow-md transition-shadow">
            <div class="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-2">
              <span class="text-xs font-semibold uppercase tracking-wider">Conversion Rate</span>
              <div class="p-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400">
                <i data-lucide="activity" class="w-4 h-4"></i>
              </div>
            </div>
            <div class="flex items-baseline justify-between mt-1">
              <div class="text-2xl font-bold text-slate-900 dark:text-white" id="kpi-cr">3.64%</div>
              <span class="inline-flex items-center text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                <i data-lucide="trending-up" class="w-3.5 h-3.5 mr-0.5"></i>
                +0.8%
              </span>
            </div>
            <p class="text-xs text-slate-400 dark:text-slate-500 mt-2">Target benchmark: 3.50%</p>
          </div>
        </div>

        <!-- Charts Grid (2 columns: 8/12 and 4/12) -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <!-- Main Trend Chart -->
          <div class="lg:col-span-2 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 shadow-sm">
            <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-6">
              <div>
                <h2 class="text-base font-semibold text-slate-900 dark:text-white">Revenue Growth & Projections</h2>
                <p class="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Net recurring revenue compared to prior benchmark</p>
              </div>
              <a href="#analytics" class="text-xs text-blue-600 hover:text-blue-700 dark:text-blue-400 font-medium inline-flex items-center gap-1">
                Deep Analytics <i data-lucide="arrow-right" class="w-3.5 h-3.5"></i>
              </a>
            </div>
            <div class="h-72 w-full">
              <canvas id="dashboard-revenue-chart"></canvas>
            </div>
          </div>

          <!-- Channel Share Chart -->
          <div class="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 shadow-sm flex flex-col justify-between">
            <div>
              <div class="flex items-center justify-between mb-2">
                <h2 class="text-base font-semibold text-slate-900 dark:text-white">Sales by Channel</h2>
                <button type="button" class="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200" title="Channel breakdown info">
                  <i data-lucide="help-circle" class="w-4 h-4"></i>
                </button>
              </div>
              <p class="text-xs text-slate-500 dark:text-slate-400 mb-4">Direct vs Enterprise sales volume</p>
              <div class="h-56 w-full relative">
                <canvas id="dashboard-channel-chart"></canvas>
              </div>
            </div>
            <div class="pt-4 border-t border-slate-100 dark:border-slate-800 text-center text-xs text-slate-500">
              Enterprise pipelines account for 46% of total ARR.
            </div>
          </div>
        </div>

        <!-- Lower Section: Recent Orders & Activity Stream -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <!-- Recent Orders Summary Table (2 cols) -->
          <div class="lg:col-span-2 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 shadow-sm overflow-hidden">
            <div class="p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <div>
                <h2 class="text-base font-semibold text-slate-900 dark:text-white">Recent Transactions</h2>
                <p class="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Latest 5 orders processed across billing gateways</p>
              </div>
              <a href="#orders" class="text-xs font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-400 inline-flex items-center gap-1">
                View All Orders <i data-lucide="chevron-right" class="w-3.5 h-3.5"></i>
              </a>
            </div>
            <div class="table-scroll-container">
              <table class="w-full text-left text-xs">
                <thead class="bg-slate-50/75 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400 font-semibold border-b border-slate-100 dark:border-slate-800">
                  <tr>
                    <th class="p-3.5 pl-6">Order ID</th>
                    <th class="p-3.5">Customer</th>
                    <th class="p-3.5">Amount</th>
                    <th class="p-3.5">Status</th>
                    <th class="p-3.5 text-right pr-6">Action</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-100 dark:divide-slate-800/60" id="dashboard-orders-tbody">
                  <!-- Injected dynamically -->
                </tbody>
              </table>
            </div>
          </div>

          <!-- Real-Time Activity Feed (1 col) -->
          <div class="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 shadow-sm p-6">
            <div class="flex items-center justify-between mb-4">
              <div>
                <h2 class="text-base font-semibold text-slate-900 dark:text-white">Recent Activity</h2>
                <p class="text-xs text-slate-500 dark:text-slate-400 mt-0.5">System audit log and events</p>
              </div>
              <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
                <span class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span> Live
              </span>
            </div>

            <div class="space-y-4" id="dashboard-activity-list">
              <!-- Injected dynamically -->
            </div>
          </div>
        </div>
      </div>
    `;

    if (window.lucide) window.lucide.createIcons({ root: container });

    // Populate recent orders
    populateRecentOrders();

    // Populate activities
    populateActivities();

    // Render charts
    setTimeout(() => {
      DashCharts.renderDashboardRevenueChart("dashboard-revenue-chart", currentPeriod);
      DashCharts.renderDashboardChannelChart("dashboard-channel-chart");
    }, 50);

    // Bind Period Buttons
    container.querySelectorAll(".period-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const period = btn.dataset.period;
        currentPeriod = period;
        // Visual update
        container.querySelectorAll(".period-btn").forEach(b => {
          b.className = "period-btn px-3 py-1.5 rounded-md transition-colors text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white";
        });
        btn.className = "period-btn px-3 py-1.5 rounded-md transition-colors bg-blue-50 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400 font-semibold";

        // Update KPI values based on period
        const revEl = document.getElementById("kpi-revenue");
        if (period === "7d") revEl.textContent = "$38,420";
        else if (period === "30d") revEl.textContent = "$128,430";
        else revEl.textContent = "$412,850";

        DashCharts.renderDashboardRevenueChart("dashboard-revenue-chart", period);
        DashComponents.showToast(`Dashboard refreshed for ${period.toUpperCase()}`, "info", 2000);
      });
    });

    // Quick Export Summary
    const exportBtn = document.getElementById("btn-quick-export");
    if (exportBtn) {
      exportBtn.addEventListener("click", () => {
        const data = [
          ["Metric", "Value", "Trend", "Period"],
          ["Total Revenue", "$128,430", "+14.2%", currentPeriod],
          ["Active Subscriptions", "2,845", "+8.1%", currentPeriod],
          ["Average Order Value", "$94.20", "-2.4%", currentPeriod],
          ["Conversion Rate", "3.64%", "+0.8%", currentPeriod]
        ];
        DashComponents.exportToCSV(`executive_summary_${currentPeriod}`, data[0], data.slice(1));
      });
    }
  }

  function populateRecentOrders() {
    const tbody = document.getElementById("dashboard-orders-tbody");
    if (!tbody) return;

    const orders = DashData.getOrders().slice(0, 5);
    tbody.innerHTML = orders.map(ord => `
      <tr class="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
        <td class="p-3.5 pl-6 font-mono font-medium text-slate-900 dark:text-white">${ord.id}</td>
        <td class="p-3.5">
          <div class="font-medium text-slate-900 dark:text-slate-100">${ord.customer}</div>
          <div class="text-[11px] text-slate-400 dark:text-slate-500">${ord.company}</div>
        </td>
        <td class="p-3.5 font-semibold text-slate-900 dark:text-white">$${ord.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
        <td class="p-3.5">${DashComponents.getOrderStatusBadge(ord.status)}</td>
        <td class="p-3.5 text-right pr-6">
          <a href="#orders" class="text-blue-600 hover:text-blue-700 dark:text-blue-400 font-medium">Details</a>
        </td>
      </tr>
    `).join("");

    if (window.lucide) window.lucide.createIcons({ root: tbody });
  }

  function populateActivities() {
    const list = document.getElementById("dashboard-activity-list");
    if (!list) return;

    const activities = DashData.getActivities().slice(0, 5);
    list.innerHTML = activities.map(act => `
      <div class="flex items-start gap-3">
        <div class="p-2 rounded-xl ${act.iconBg} flex-shrink-0 mt-0.5">
          <i data-lucide="${act.icon}" class="w-4 h-4"></i>
        </div>
        <div class="flex-1 min-w-0">
          <p class="text-xs font-semibold text-slate-900 dark:text-white leading-tight">${act.title}</p>
          <p class="text-xs text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-2 leading-relaxed">${act.desc}</p>
          <span class="text-[10px] text-slate-400 dark:text-slate-500 font-medium mt-1 block">${act.timestamp}</span>
        </div>
      </div>
    `).join("");

    if (window.lucide) window.lucide.createIcons({ root: list });
  }

  return { render };
})();
