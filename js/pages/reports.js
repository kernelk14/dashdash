/**
 * DashPulse Admin Dashboard Template
 * Page: Reports & Audits
 */

window.ReportsPage = (function () {
  let categoryFilter = "All";

  function render(container) {
    DashComponents.updateBreadcrumbs([
      { label: "Dashboard", href: "#dashboard" },
      { label: "Reports & Exports", href: "#reports" }
    ]);

    container.innerHTML = `
      <div class="space-y-6">
        <!-- Header -->
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 class="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">Reports & Intelligence Center</h1>
            <p class="text-sm text-slate-500 dark:text-slate-400 mt-1">Export executive revenue digests, compliance audits, and telemetry reports.</p>
          </div>
          <button id="btn-generate-custom-report" type="button" class="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold shadow-sm transition-colors">
            <i data-lucide="file-plus" class="w-4 h-4"></i>
            Generate Custom Report
          </button>
        </div>

        <!-- Filter Sub-header -->
        <div class="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 shadow-sm flex flex-wrap items-center justify-between gap-4">
          <div class="flex flex-wrap items-center gap-2">
            <span class="text-xs font-semibold text-slate-500 uppercase tracking-wider mr-2">Category:</span>
            <button type="button" data-cat="All" class="rep-cat-btn px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${categoryFilter === 'All' ? 'bg-blue-50 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400 font-semibold' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'}">All Reports</button>
            <button type="button" data-cat="Financial" class="rep-cat-btn px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${categoryFilter === 'Financial' ? 'bg-blue-50 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400 font-semibold' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'}">Financial</button>
            <button type="button" data-cat="Growth" class="rep-cat-btn px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${categoryFilter === 'Growth' ? 'bg-blue-50 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400 font-semibold' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'}">Growth</button>
            <button type="button" data-cat="Billing" class="rep-cat-btn px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${categoryFilter === 'Billing' ? 'bg-blue-50 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400 font-semibold' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'}">Billing</button>
            <button type="button" data-cat="Infrastructure" class="rep-cat-btn px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${categoryFilter === 'Infrastructure' ? 'bg-blue-50 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400 font-semibold' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'}">Infrastructure</button>
            <button type="button" data-cat="Compliance" class="rep-cat-btn px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${categoryFilter === 'Compliance' ? 'bg-blue-50 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400 font-semibold' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'}">Compliance</button>
          </div>
          <div class="text-xs text-slate-500">
            Automated delivery: <span class="font-semibold text-slate-700 dark:text-slate-300">Every Monday 6:00 AM UTC</span>
          </div>
        </div>

        <!-- Reports Cards Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" id="reports-grid">
          <!-- Populated dynamically -->
        </div>
      </div>

      <!-- Custom Report Modal Root -->
      <div id="custom-report-modal-root"></div>
    `;

    if (window.lucide) window.lucide.createIcons({ root: container });

    renderReportCards();

    // Bind category filter buttons
    container.querySelectorAll(".rep-cat-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        categoryFilter = btn.dataset.cat;
        container.querySelectorAll(".rep-cat-btn").forEach(b => {
          b.className = "rep-cat-btn px-3 py-1.5 rounded-lg text-xs font-medium transition-colors text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white";
        });
        btn.className = "rep-cat-btn px-3 py-1.5 rounded-lg text-xs font-medium transition-colors bg-blue-50 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400 font-semibold";
        renderReportCards();
      });
    });

    // Custom Report button
    const customReportBtn = document.getElementById("btn-generate-custom-report");
    if (customReportBtn) {
      customReportBtn.addEventListener("click", () => {
        openCustomReportModal();
      });
    }
  }

  function renderReportCards() {
    const grid = document.getElementById("reports-grid");
    if (!grid) return;

    let reports = DashData.getReports();
    if (categoryFilter !== "All") {
      reports = reports.filter(r => r.category === categoryFilter);
    }

    grid.innerHTML = reports.map(r => `
      <div class="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 shadow-sm p-6 flex flex-col justify-between hover:shadow-md transition-shadow">
        <div>
          <div class="flex items-center justify-between mb-3">
            <span class="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
              ${r.category}
            </span>
            <span class="text-[11px] text-slate-400 flex items-center gap-1">
              <i data-lucide="calendar" class="w-3 h-3"></i> ${r.period}
            </span>
          </div>

          <h3 class="text-base font-bold text-slate-900 dark:text-white leading-snug">${r.title}</h3>
          <p class="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">${r.desc}</p>
        </div>

        <div class="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
          <div class="text-[11px] text-slate-400">
            Last run: <span class="font-medium text-slate-600 dark:text-slate-300">${r.lastRun}</span>
          </div>

          <div class="flex items-center gap-2">
            <button type="button" data-rep-id="${r.id}" data-type="csv" class="download-report-btn inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-medium transition-colors">
              <i data-lucide="file-spreadsheet" class="w-3.5 h-3.5 text-emerald-500"></i> CSV
            </button>
            <button type="button" data-rep-id="${r.id}" data-type="json" class="download-report-btn inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-medium transition-colors">
              <i data-lucide="file-code" class="w-3.5 h-3.5 text-blue-500"></i> JSON
            </button>
          </div>
        </div>
      </div>
    `).join("");

    if (window.lucide) window.lucide.createIcons({ root: grid });

    // Download handlers
    grid.querySelectorAll(".download-report-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const id = btn.dataset.repId;
        const type = btn.dataset.type;
        const rep = DashData.getReports().find(r => r.id === id);
        if (!rep) return;

        if (type === "csv") {
          const headers = ["Report Title", "Category", "Period", "Run Date", "Downloads", "Status"];
          const rows = [
            [rep.title, rep.category, rep.period, rep.lastRun, String(rep.downloads), "Verified"]
          ];
          DashComponents.exportToCSV(`report_${rep.id}`, headers, rows);
        } else {
          DashComponents.exportToJSON(`report_${rep.id}`, {
            ...rep,
            exportTimestamp: new Date().toISOString(),
            status: "Certified",
            auditHash: "0x892a4bc019a"
          });
        }
      });
    });
  }

  function openCustomReportModal() {
    const root = document.getElementById("custom-report-modal-root");
    if (!root) return;

    root.innerHTML = `
      <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm" id="custom-rep-backdrop">
        <div class="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 max-w-lg w-full p-6 modal-content space-y-4">
          <div class="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
            <h3 class="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <i data-lucide="file-text" class="w-5 h-5 text-blue-600"></i> Generate Custom Analytics Report
            </h3>
            <button type="button" id="custom-rep-close" class="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1 rounded-md">
              <i data-lucide="x" class="w-4 h-4"></i>
            </button>
          </div>

          <form id="custom-rep-form" class="space-y-4 text-xs">
            <div>
              <label class="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Report Model</label>
              <select id="cr-model" class="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white">
                <option value="Executive Revenue Overview">Executive Revenue Overview</option>
                <option value="Customer Lifetime Value (LTV)">Customer Lifetime Value (LTV)</option>
                <option value="API Infrastructure & Latency">API Infrastructure & Latency</option>
                <option value="SOC 2 Type II Security Access Log">SOC 2 Type II Security Access Log</option>
              </select>
            </div>

            <div class="grid grid-cols-2 gap-3">
              <div>
                <label class="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Date Range</label>
                <select id="cr-range" class="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white">
                  <option value="Last 7 Days">Last 7 Days</option>
                  <option value="Last 30 Days">Last 30 Days</option>
                  <option value="Current Quarter">Current Quarter</option>
                  <option value="Past Year">Past Year</option>
                </select>
              </div>

              <div>
                <label class="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Export Format</label>
                <select id="cr-format" class="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white">
                  <option value="CSV">Comma Separated (CSV)</option>
                  <option value="JSON">Structured Data (JSON)</option>
                </select>
              </div>
            </div>

            <div>
              <label class="block font-semibold text-slate-700 dark:text-slate-300 mb-2">Metrics Included</label>
              <div class="space-y-2 bg-slate-50 dark:bg-slate-800/50 p-3 rounded-xl border border-slate-100 dark:border-slate-800">
                <label class="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked class="rounded border-slate-300 text-blue-600 focus:ring-blue-500">
                  <span>Include Net Recurring Revenue & ARPU</span>
                </label>
                <label class="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked class="rounded border-slate-300 text-blue-600 focus:ring-blue-500">
                  <span>Include Customer Acquisition Cost (CAC)</span>
                </label>
                <label class="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked class="rounded border-slate-300 text-blue-600 focus:ring-blue-500">
                  <span>Include Geographical Breakdown</span>
                </label>
              </div>
            </div>

            <!-- Progress simulation container -->
            <div id="cr-progress" class="hidden space-y-2">
              <div class="flex justify-between text-[11px] text-slate-500">
                <span>Generating aggregated dataset...</span>
                <span id="cr-percent">0%</span>
              </div>
              <div class="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                <div id="cr-bar" class="bg-blue-600 h-full rounded-full transition-all duration-300" style="width: 0%"></div>
              </div>
            </div>

            <div class="flex items-center justify-end gap-3 pt-3 border-t border-slate-100 dark:border-slate-800">
              <button type="button" id="cr-cancel" class="px-4 py-2 text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg">
                Cancel
              </button>
              <button type="submit" id="cr-submit" class="px-5 py-2 font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm">
                Generate & Download
              </button>
            </div>
          </form>
        </div>
      </div>
    `;

    if (window.lucide) window.lucide.createIcons({ root: root });

    const close = () => { root.innerHTML = ""; };
    document.getElementById("custom-rep-close").addEventListener("click", close);
    document.getElementById("cr-cancel").addEventListener("click", close);
    document.getElementById("custom-rep-backdrop").addEventListener("click", (e) => {
      if (e.target.id === "custom-rep-backdrop") close();
    });

    const form = document.getElementById("custom-rep-form");
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const model = document.getElementById("cr-model").value;
      const range = document.getElementById("cr-range").value;
      const format = document.getElementById("cr-format").value;

      const progress = document.getElementById("cr-progress");
      const bar = document.getElementById("cr-bar");
      const percent = document.getElementById("cr-percent");
      const submitBtn = document.getElementById("cr-submit");

      progress.classList.remove("hidden");
      submitBtn.disabled = true;

      let p = 0;
      const interval = setInterval(() => {
        p += 25;
        bar.style.width = `${p}%`;
        percent.textContent = `${p}%`;

        if (p >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            if (format === "CSV") {
              DashComponents.exportToCSV(`custom_report_${Date.now()}`, ["Report", "Date Range", "Status"], [[model, range, "Generated"]]);
            } else {
              DashComponents.exportToJSON(`custom_report_${Date.now()}`, {
                report: model,
                range: range,
                status: "Success",
                generatedAt: new Date().toISOString()
              });
            }
            close();
          }, 300);
        }
      }, 150);
    });
  }

  return { render };
})();
