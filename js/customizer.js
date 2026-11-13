/**
 * DashPulse Admin Dashboard Template
 * Live Theme & Layout Customizer Drawer
 */

window.ThemeCustomizer = (function () {
  let isDrawerOpen = false;
  let liveTickerInterval = null;

  function init() {
    const customizerRoot = document.getElementById("theme-customizer-root");
    if (!customizerRoot) return;

    customizerRoot.innerHTML = `
      <!-- Floating Trigger Button -->
      <button id="theme-customizer-btn" type="button" class="fixed right-4 bottom-20 z-40 p-3 rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-xl shadow-blue-500/30 transition-transform hover:scale-110 active:scale-95 flex items-center justify-center group" aria-label="Open Theme Customizer" title="Customize Theme & Layout">
        <i data-lucide="settings" class="w-5 h-5 group-hover:rotate-90 transition-transform duration-500"></i>
      </button>

      <!-- Customizer Drawer Backdrop -->
      <div id="customizer-backdrop" class="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm hidden transition-opacity"></div>

      <!-- Customizer Slide-over Panel -->
      <aside id="customizer-drawer" class="fixed inset-y-0 right-0 z-50 w-80 sm:w-96 bg-white dark:bg-slate-900 border-l border-slate-200 dark:border-slate-800 shadow-2xl p-6 flex flex-col justify-between transform translate-x-full transition-transform duration-300 ease-in-out overflow-y-auto">
        <div class="space-y-6">
          <!-- Drawer Header -->
          <div class="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
            <div>
              <h3 class="text-base font-bold text-slate-900 dark:text-white">Live Demo Customizer</h3>
              <p class="text-xs text-slate-500">Configure theme, layout, and visual tokens</p>
            </div>
            <button id="customizer-close-btn" type="button" class="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded-lg">
              <i data-lucide="x" class="w-5 h-5"></i>
            </button>
          </div>

          <!-- Color Mode Option -->
          <div class="space-y-2">
            <label class="text-xs font-bold uppercase tracking-wider text-slate-400">Color Scheme</label>
            <div class="grid grid-cols-3 gap-2">
              <button type="button" data-scheme="light" class="scheme-btn p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-semibold text-center hover:border-blue-500 transition-colors flex flex-col items-center gap-1">
                <i data-lucide="sun" class="w-4 h-4 text-amber-500"></i> Light
              </button>
              <button type="button" data-scheme="dark" class="scheme-btn p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-semibold text-center hover:border-blue-500 transition-colors flex flex-col items-center gap-1">
                <i data-lucide="moon" class="w-4 h-4 text-indigo-400"></i> Dark
              </button>
              <button type="button" data-scheme="system" class="scheme-btn p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-semibold text-center hover:border-blue-500 transition-colors flex flex-col items-center gap-1">
                <i data-lucide="monitor" class="w-4 h-4 text-slate-400"></i> System
              </button>
            </div>
          </div>

          <!-- Primary Accent Color Option -->
          <div class="space-y-2">
            <label class="text-xs font-bold uppercase tracking-wider text-slate-400">Primary Brand Accent</label>
            <div class="flex items-center gap-3">
              <button type="button" data-accent="blue" class="customizer-accent-btn w-8 h-8 rounded-full bg-blue-600 ring-2 ring-offset-2 ring-blue-600 transition-transform hover:scale-110" title="Sky Blue"></button>
              <button type="button" data-accent="indigo" class="customizer-accent-btn w-8 h-8 rounded-full bg-indigo-600 transition-transform hover:scale-110" title="Indigo"></button>
              <button type="button" data-accent="emerald" class="customizer-accent-btn w-8 h-8 rounded-full bg-emerald-600 transition-transform hover:scale-110" title="Emerald"></button>
              <button type="button" data-accent="purple" class="customizer-accent-btn w-8 h-8 rounded-full bg-purple-600 transition-transform hover:scale-110" title="Purple"></button>
              <button type="button" data-accent="rose" class="customizer-accent-btn w-8 h-8 rounded-full bg-rose-600 transition-transform hover:scale-110" title="Rose"></button>
            </div>
          </div>

          <!-- Sidebar Layout Option -->
          <div class="space-y-2">
            <label class="text-xs font-bold uppercase tracking-wider text-slate-400">Sidebar Mode</label>
            <div class="grid grid-cols-2 gap-2 text-xs">
              <button type="button" id="btn-sidebar-mode-full" class="p-2.5 rounded-xl border border-blue-500 bg-blue-50/50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 font-semibold text-center">
                Full Sidebar
              </button>
              <button type="button" id="btn-sidebar-mode-mini" class="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 font-semibold text-center hover:border-slate-400">
                Compact Mini
              </button>
            </div>
          </div>

          <!-- Live Real-Time Ticker Simulator -->
          <div class="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 space-y-3">
            <div class="flex items-center justify-between">
              <div>
                <h4 class="text-xs font-bold text-slate-900 dark:text-white">Live Ticker Simulator</h4>
                <p class="text-[11px] text-slate-400">Simulate incoming transactions & revenue pulses</p>
              </div>
              <label class="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" id="live-ticker-toggle" class="sr-only peer">
                <div class="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>
        </div>

        <!-- Footer Actions -->
        <div class="pt-6 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <button type="button" id="customizer-reset-btn" class="text-xs font-medium text-slate-500 hover:text-slate-900 dark:hover:text-white underline">
            Reset All Defaults
          </button>
          <button type="button" id="customizer-done-btn" class="px-4 py-2 text-xs font-semibold bg-blue-600 text-white rounded-xl shadow-sm">
            Done
          </button>
        </div>
      </aside>
    `;

    if (window.lucide) window.lucide.createIcons({ root: customizerRoot });

    bindEvents();
  }

  function toggleDrawer() {
    isDrawerOpen = !isDrawerOpen;
    const drawer = document.getElementById("customizer-drawer");
    const backdrop = document.getElementById("customizer-backdrop");

    if (drawer && backdrop) {
      if (isDrawerOpen) {
        drawer.classList.remove("translate-x-full");
        backdrop.classList.remove("hidden");
      } else {
        drawer.classList.add("translate-x-full");
        backdrop.classList.add("hidden");
      }
    }
  }

  function bindEvents() {
    document.getElementById("theme-customizer-btn")?.addEventListener("click", toggleDrawer);
    document.getElementById("customizer-close-btn")?.addEventListener("click", toggleDrawer);
    document.getElementById("customizer-done-btn")?.addEventListener("click", toggleDrawer);
    document.getElementById("customizer-backdrop")?.addEventListener("click", toggleDrawer);

    // Scheme buttons
    document.querySelectorAll(".scheme-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const scheme = btn.dataset.scheme;
        localStorage.setItem("dashpulse-theme", scheme);
        if (window.AppTheme) window.AppTheme.applyTheme(scheme);
        DashComponents.showToast(`Applied ${scheme} mode`, "info", 1500);
      });
    });

    // Accent buttons
    document.querySelectorAll(".customizer-accent-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        DashComponents.showToast(`Active accent: ${btn.dataset.accent}`, "success", 1500);
      });
    });

    // Sidebar full / mini
    document.getElementById("btn-sidebar-mode-full")?.addEventListener("click", () => {
      localStorage.setItem("sidebar-collapsed", "false");
      if (window.App && window.App.toggleSidebar) {
        const sidebar = document.getElementById("sidebar");
        if (sidebar && sidebar.classList.contains("w-20")) {
          window.App.toggleSidebar();
        }
      }
      DashComponents.showToast("Sidebar set to full width", "info");
    });

    document.getElementById("btn-sidebar-mode-mini")?.addEventListener("click", () => {
      localStorage.setItem("sidebar-collapsed", "true");
      if (window.App && window.App.toggleSidebar) {
        const sidebar = document.getElementById("sidebar");
        if (sidebar && sidebar.classList.contains("w-64")) {
          window.App.toggleSidebar();
        }
      }
      DashComponents.showToast("Sidebar set to compact mini", "info");
    });

    // Live Ticker Simulator
    document.getElementById("live-ticker-toggle")?.addEventListener("change", (e) => {
      if (e.target.checked) {
        DashComponents.showToast("Live data stream enabled! Generating random activity pulses...", "success");
        liveTickerInterval = setInterval(() => {
          const names = ["Sophia Martinez", "Marcus Vance", "Elena Rostova", "Liam O'Connor"];
          const randName = names[Math.floor(Math.random() * names.length)];
          const randAmount = (Math.random() * 500 + 50).toFixed(2);
          DashData.addActivity({
            type: "order",
            title: `Order paid: $${randAmount}`,
            desc: `${randName} processed transaction via Stripe.`,
            icon: "credit-card",
            iconBg: "bg-emerald-500/10 text-emerald-600"
          });
          DashComponents.showToast(`⚡ Live event: $${randAmount} received from ${randName}`, "success", 2500);
        }, 12000);
      } else {
        clearInterval(liveTickerInterval);
        DashComponents.showToast("Live data stream stopped", "info");
      }
    });

    // Reset defaults
    document.getElementById("customizer-reset-btn")?.addEventListener("click", () => {
      DashData.resetAllData();
      DashComponents.showToast("All settings reset to default", "info");
      setTimeout(() => { location.reload(); }, 500);
    });
  }

  return { init };
})();
