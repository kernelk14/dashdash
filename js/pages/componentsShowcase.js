/**
 * DashPulse Admin Dashboard Template
 * Page: UI Component System & Styleguide Playground
 */

window.ComponentsShowcasePage = (function () {
  function render(container) {
    DashComponents.updateBreadcrumbs([
      { label: "Dashboard", href: "#dashboard" },
      { label: "UI Component Kit", href: "#components" }
    ]);

    container.innerHTML = `
      <div class="space-y-8">
        <!-- Header -->
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 class="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">UI Component Kit & Styleguide</h1>
            <p class="text-sm text-slate-500 dark:text-slate-400 mt-1">Reusable Tailwind CSS UI building blocks, interactive states, and accessibility tokens.</p>
          </div>
        </div>

        <!-- Section 1: Buttons & Interactive Triggers -->
        <div class="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 shadow-sm p-6 space-y-4">
          <div>
            <h2 class="text-base font-bold text-slate-900 dark:text-white">Buttons & Actions</h2>
            <p class="text-xs text-slate-500">Standard button variants, sizes, and state styles</p>
          </div>

          <div class="flex flex-wrap items-center gap-3">
            <button type="button" class="demo-btn px-4 py-2 text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-sm transition-colors">Primary Button</button>
            <button type="button" class="demo-btn px-4 py-2 text-xs font-semibold bg-slate-800 hover:bg-slate-900 text-white dark:bg-slate-700 dark:hover:bg-slate-600 rounded-xl transition-colors">Dark Button</button>
            <button type="button" class="demo-btn px-4 py-2 text-xs font-semibold bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl transition-colors">Success Action</button>
            <button type="button" class="demo-btn px-4 py-2 text-xs font-semibold bg-rose-600 hover:bg-rose-700 text-white rounded-xl transition-colors">Danger Action</button>
            <button type="button" class="demo-btn px-4 py-2 text-xs font-semibold bg-amber-500 hover:bg-amber-600 text-white rounded-xl transition-colors">Warning Action</button>
            <button type="button" class="demo-btn px-4 py-2 text-xs font-semibold border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 rounded-xl transition-colors">Outline Button</button>
            <button type="button" class="demo-btn px-4 py-2 text-xs font-semibold text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950/60 rounded-xl transition-colors">Ghost Link</button>
          </div>

          <!-- Toast Trigger Buttons -->
          <div class="pt-4 border-t border-slate-100 dark:border-slate-800">
            <h3 class="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Trigger Live Toast Feedback</h3>
            <div class="flex flex-wrap items-center gap-2">
              <button id="trig-toast-info" type="button" class="px-3 py-1.5 text-xs font-medium rounded-lg bg-blue-50 text-blue-600 dark:bg-blue-950 dark:text-blue-400">Trigger Info Toast</button>
              <button id="trig-toast-success" type="button" class="px-3 py-1.5 text-xs font-medium rounded-lg bg-emerald-50 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400">Trigger Success Toast</button>
              <button id="trig-toast-warning" type="button" class="px-3 py-1.5 text-xs font-medium rounded-lg bg-amber-50 text-amber-600 dark:bg-amber-950 dark:text-amber-400">Trigger Warning Toast</button>
              <button id="trig-toast-error" type="button" class="px-3 py-1.5 text-xs font-medium rounded-lg bg-rose-50 text-rose-600 dark:bg-rose-950 dark:text-rose-400">Trigger Error Toast</button>
            </div>
          </div>
        </div>

        <!-- Section 2: Badges & Status Indicators -->
        <div class="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 shadow-sm p-6 space-y-4">
          <div>
            <h2 class="text-base font-bold text-slate-900 dark:text-white">Badges & Status Tags</h2>
            <p class="text-xs text-slate-500">Color-coded badges with glowing dots and contrast tags</p>
          </div>

          <div class="flex flex-wrap items-center gap-3">
            <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
              <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span> Active / Operational
            </span>
            <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
              <span class="w-2 h-2 rounded-full bg-blue-500"></span> Processing
            </span>
            <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
              <span class="w-2 h-2 rounded-full bg-amber-500"></span> Pending Review
            </span>
            <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-rose-50 text-rose-700 dark:bg-rose-950 dark:text-rose-300 border border-rose-200 dark:border-rose-800">
              <span class="w-2 h-2 rounded-full bg-rose-500"></span> Critical / Error
            </span>
            <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-purple-50 text-purple-700 dark:bg-purple-950 dark:text-purple-300 border border-purple-200 dark:border-purple-800">
              <span class="w-2 h-2 rounded-full bg-purple-500"></span> Enterprise Tier
            </span>
          </div>
        </div>

        <!-- Section 3: Alerts & Notification Banners -->
        <div class="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 shadow-sm p-6 space-y-4">
          <div>
            <h2 class="text-base font-bold text-slate-900 dark:text-white">Alerts & Inline Feedback</h2>
            <p class="text-xs text-slate-500">Semantic alert boxes with dismissible triggers</p>
          </div>

          <div class="space-y-3 text-xs">
            <div class="p-4 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-900 dark:text-blue-200 border border-blue-200 dark:border-blue-800 flex items-start gap-3">
              <i data-lucide="info" class="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5"></i>
              <div class="flex-1">
                <span class="font-bold">System Maintenance Window:</span> Scheduled database migration on Sunday 02:00 AM UTC.
              </div>
            </div>

            <div class="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-900 dark:text-emerald-200 border border-emerald-200 dark:border-emerald-800 flex items-start gap-3">
              <i data-lucide="check-circle-2" class="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5"></i>
              <div class="flex-1">
                <span class="font-bold">Backup Completed:</span> All 12 cluster snapshots verified and synced to secondary cold storage.
              </div>
            </div>

            <div class="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-900 dark:text-amber-200 border border-amber-200 dark:border-amber-800 flex items-start gap-3">
              <i data-lucide="alert-triangle" class="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5"></i>
              <div class="flex-1">
                <span class="font-bold">Storage Capacity Warning:</span> Primary bucket volume reached 85% allocated quota.
              </div>
            </div>

            <div class="p-4 rounded-xl bg-rose-50 dark:bg-rose-950/60 text-rose-900 dark:text-rose-200 border border-rose-200 dark:border-rose-800 flex items-start gap-3">
              <i data-lucide="alert-circle" class="w-5 h-5 text-rose-600 flex-shrink-0 mt-0.5"></i>
              <div class="flex-1">
                <span class="font-bold">Payment Gateway Dispute:</span> Invoice #INV-2026-004 disputed by customer issuing bank.
              </div>
            </div>
          </div>
        </div>

        <!-- Section 4: Form Input Groups -->
        <div class="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 shadow-sm p-6 space-y-4">
          <div>
            <h2 class="text-base font-bold text-slate-900 dark:text-white">Form Input Controls</h2>
            <p class="text-xs text-slate-500">Accessible inputs, switches, and sliders</p>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs">
            <div>
              <label class="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Standard Input with Prefix Icon</label>
              <div class="relative">
                <i data-lucide="mail" class="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"></i>
                <input type="email" placeholder="user@domain.com" class="w-full pl-9 pr-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:bg-white dark:focus:bg-slate-900 focus:ring-2 focus:ring-blue-500">
              </div>
            </div>

            <div>
              <label class="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Currency Amount Input</label>
              <div class="relative">
                <span class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold">$</span>
                <input type="number" value="1250.00" class="w-full pl-8 pr-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:bg-white dark:focus:bg-slate-900 focus:ring-2 focus:ring-blue-500 font-mono">
              </div>
            </div>

            <div>
              <label class="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Toggle Switch</label>
              <label class="flex items-center gap-3 pt-1 cursor-pointer">
                <input type="checkbox" checked class="w-5 h-5 rounded border-slate-300 text-blue-600 focus:ring-blue-500">
                <span class="text-slate-700 dark:text-slate-300">Enable real-time telemetry</span>
              </label>
            </div>
          </div>
        </div>
      </div>
    `;

    if (window.lucide) window.lucide.createIcons({ root: container });

    // Toast triggers
    document.getElementById("trig-toast-info")?.addEventListener("click", () => {
      DashComponents.showToast("This is an informative system notice.", "info");
    });
    document.getElementById("trig-toast-success")?.addEventListener("click", () => {
      DashComponents.showToast("Operation completed successfully!", "success");
    });
    document.getElementById("trig-toast-warning")?.addEventListener("click", () => {
      DashComponents.showToast("Warning: cluster node capacity at 85%.", "warning");
    });
    document.getElementById("trig-toast-error")?.addEventListener("click", () => {
      DashComponents.showToast("Error: API request timed out.", "error");
    });
  }

  return { render };
})();
