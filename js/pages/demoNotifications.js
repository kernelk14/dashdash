/**
 * DashPulse Admin Dashboard Template
 * Page: Notifications (Alerts, Modals & Toasts - CoreUI Inspired)
 */

window.DemoNotificationsPage = (function () {
  function render(container, subview = "notifications-alerts") {
    DashComponents.updateBreadcrumbs([
      { label: "Components", href: "#notifications-alerts" },
      { label: "Notifications", href: `#${subview}` },
      { label: subview.replace("notifications-", "").replace(/\b\w/g, l => l.toUpperCase()), href: `#${subview}` }
    ]);

    const activeAlerts = subview === "notifications-alerts" ? "border-blue-600 text-blue-600 dark:text-blue-400" : "border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300";
    const activeModals = subview === "notifications-modals" ? "border-blue-600 text-blue-600 dark:text-blue-400" : "border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300";
    const activeToasts = subview === "notifications-toasts" ? "border-blue-600 text-blue-600 dark:text-blue-400" : "border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300";

    container.innerHTML = `
      <div class="space-y-6">
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 class="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">Notifications & Feedback</h1>
            <p class="text-sm text-slate-500 dark:text-slate-400 mt-1">Contextual banners, dialog overlays, and non-blocking toast notifications.</p>
          </div>
          <div class="flex border-b border-slate-200 dark:border-slate-800 space-x-4">
            <a href="#notifications-alerts" class="py-2 px-1 border-b-2 font-medium text-xs transition-colors ${activeAlerts}">Alerts</a>
            <a href="#notifications-modals" class="py-2 px-1 border-b-2 font-medium text-xs transition-colors ${activeModals}">Modals</a>
            <a href="#notifications-toasts" class="py-2 px-1 border-b-2 font-medium text-xs transition-colors ${activeToasts}">Toasts</a>
          </div>
        </div>

        <div id="notif-content-slot" class="space-y-6">
          ${renderSubviewContent(subview)}
        </div>
      </div>
    `;

    if (window.lucide) window.lucide.createIcons();
    initInteractions(container, subview);
  }

  function renderSubviewContent(subview) {
    if (subview === "notifications-modals") {
      return `
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <!-- Standard Modal Trigger -->
          <div class="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 shadow-sm p-6 space-y-4">
            <h3 class="text-sm font-bold text-slate-900 dark:text-white">Default Modal</h3>
            <p class="text-xs text-slate-500">Standard medium width modal dialog with header, body, and action footer.</p>
            <button type="button" id="trigger-default-modal" class="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-xs transition-colors">
              Launch Default Modal
            </button>
          </div>

          <!-- Destructive Confirmation Modal -->
          <div class="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 shadow-sm p-6 space-y-4">
            <h3 class="text-sm font-bold text-slate-900 dark:text-white">Confirmation Dialog</h3>
            <p class="text-xs text-slate-500">Prompts user before executing irreversible destructive commands.</p>
            <button type="button" id="trigger-confirm-modal" class="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold shadow-xs transition-colors">
              Launch Delete Confirm
            </button>
          </div>

          <!-- Large Form Modal -->
          <div class="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 shadow-sm p-6 space-y-4">
            <h3 class="text-sm font-bold text-slate-900 dark:text-white">Large Modal</h3>
            <p class="text-xs text-slate-500">Spacious dialog suitable for multi-column inputs and records.</p>
            <button type="button" id="trigger-large-modal" class="px-4 py-2 rounded-xl bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 hover:opacity-90 text-xs font-semibold shadow-xs transition-opacity">
              Launch Large Modal
            </button>
          </div>
        </div>

        <!-- Custom Interactive Modal Container for Demo -->
        <div id="demo-custom-modal" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs hidden">
          <div class="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl max-w-lg w-full p-6 space-y-4">
            <div class="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <h4 class="text-sm font-bold text-slate-900 dark:text-white" id="modal-title">Modal Title</h4>
              <button type="button" id="close-custom-modal" class="text-slate-400 hover:text-slate-600">
                <i data-lucide="x" class="w-4 h-4"></i>
              </button>
            </div>
            <div class="text-xs text-slate-600 dark:text-slate-400 leading-relaxed" id="modal-body">
              Modal content body with full interaction support.
            </div>
            <div class="pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-end gap-2">
              <button type="button" id="modal-cancel-btn" class="px-4 py-2 text-xs font-semibold rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800">Cancel</button>
              <button type="button" id="modal-action-btn" class="px-4 py-2 text-xs font-semibold rounded-xl bg-blue-600 hover:bg-blue-700 text-white">Understood</button>
            </div>
          </div>
        </div>
      `;
    }

    if (subview === "notifications-toasts") {
      return `
        <div class="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 shadow-sm p-6 space-y-6">
          <div>
            <h3 class="text-base font-bold text-slate-900 dark:text-white">Toast Notification Dispatcher</h3>
            <p class="text-xs text-slate-500 mt-1">Click each button to trigger non-blocking floating alerts with automatic timeout.</p>
          </div>

          <div class="flex flex-wrap gap-4">
            <button type="button" class="toast-trigger-btn px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-xs flex items-center gap-2" data-type="success" data-msg="Your deployment succeeded and DNS records have propagated!">
              <i data-lucide="check-circle" class="w-4 h-4"></i>
              <span>Trigger Success Toast</span>
            </button>
            <button type="button" class="toast-trigger-btn px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold shadow-xs flex items-center gap-2" data-type="error" data-msg="Failed to authenticate database connection string.">
              <i data-lucide="x-circle" class="w-4 h-4"></i>
              <span>Trigger Error Toast</span>
            </button>
            <button type="button" class="toast-trigger-btn px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-semibold shadow-xs flex items-center gap-2" data-type="warning" data-msg="Approaching 90% monthly API rate limit quota.">
              <i data-lucide="alert-triangle" class="w-4 h-4"></i>
              <span>Trigger Warning Toast</span>
            </button>
            <button type="button" class="toast-trigger-btn px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-xs flex items-center gap-2" data-type="info" data-msg="System maintenance scheduled for Sunday at 02:00 UTC.">
              <i data-lucide="info" class="w-4 h-4"></i>
              <span>Trigger Info Toast</span>
            </button>
          </div>

          <div class="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60 text-xs text-slate-600 dark:text-slate-400">
            <p class="font-semibold text-slate-900 dark:text-white mb-1">Developer Usage:</p>
            <code class="font-mono text-blue-600 dark:text-blue-400">DashComponents.showToast('Your message here', 'success' | 'error' | 'warning' | 'info');</code>
          </div>
        </div>
      `;
    }

    // Default: 'notifications-alerts'
    return `
      <div class="space-y-4">
        <!-- Success Alert -->
        <div class="demo-alert flex items-start justify-between p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300">
          <div class="flex items-start gap-3">
            <i data-lucide="check-circle" class="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5"></i>
            <div>
              <p class="text-xs font-bold">Successfully Connected Cloud Database</p>
              <p class="text-xs opacity-90 mt-0.5">Your PostgreSQL cluster is healthy and synchronizing at 12ms average latency.</p>
            </div>
          </div>
          <button type="button" class="alert-dismiss text-emerald-600 dark:text-emerald-400 hover:opacity-75">
            <i data-lucide="x" class="w-4 h-4"></i>
          </button>
        </div>

        <!-- Info Alert -->
        <div class="demo-alert flex items-start justify-between p-4 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 text-blue-800 dark:text-blue-300">
          <div class="flex items-start gap-3">
            <i data-lucide="info" class="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5"></i>
            <div>
              <p class="text-xs font-bold">New Security Release Available</p>
              <p class="text-xs opacity-90 mt-0.5">Version 2.4.0 includes key patch updates for RBAC permission caching.</p>
            </div>
          </div>
          <button type="button" class="alert-dismiss text-blue-600 dark:text-blue-400 hover:opacity-75">
            <i data-lucide="x" class="w-4 h-4"></i>
          </button>
        </div>

        <!-- Warning Alert -->
        <div class="demo-alert flex items-start justify-between p-4 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-amber-800 dark:text-amber-300">
          <div class="flex items-start gap-3">
            <i data-lucide="alert-triangle" class="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5"></i>
            <div>
              <p class="text-xs font-bold">SSL Certificate Expires in 4 Days</p>
              <p class="text-xs opacity-90 mt-0.5">Automated Let's Encrypt renewal will run at midnight tonight.</p>
            </div>
          </div>
          <button type="button" class="alert-dismiss text-amber-600 dark:text-amber-400 hover:opacity-75">
            <i data-lucide="x" class="w-4 h-4"></i>
          </button>
        </div>

        <!-- Danger Alert -->
        <div class="demo-alert flex items-start justify-between p-4 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-rose-800 dark:text-rose-300">
          <div class="flex items-start gap-3">
            <i data-lucide="alert-circle" class="w-5 h-5 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5"></i>
            <div>
              <p class="text-xs font-bold">Payment Method Authorization Failed</p>
              <p class="text-xs opacity-90 mt-0.5">Please update your company credit card details before the end of the billing cycle.</p>
            </div>
          </div>
          <button type="button" class="alert-dismiss text-rose-600 dark:text-rose-400 hover:opacity-75">
            <i data-lucide="x" class="w-4 h-4"></i>
          </button>
        </div>
      </div>
    `;
  }

  function initInteractions(container, subview) {
    // Dismissible alerts
    container.querySelectorAll(".alert-dismiss").forEach(btn => {
      btn.addEventListener("click", () => {
        const alert = btn.closest(".demo-alert");
        if (alert) {
          alert.classList.add("opacity-0", "transition-opacity", "duration-200");
          setTimeout(() => alert.remove(), 200);
          DashComponents.showToast("Alert banner dismissed.", "info");
        }
      });
    });

    // Toast triggers
    container.querySelectorAll(".toast-trigger-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const type = btn.getAttribute("data-type");
        const msg = btn.getAttribute("data-msg");
        DashComponents.showToast(msg, type);
      });
    });

    // Modals
    const customModal = container.querySelector("#demo-custom-modal");
    const modalTitle = container.querySelector("#modal-title");
    const modalBody = container.querySelector("#modal-body");
    const closeBtn = container.querySelector("#close-custom-modal");
    const cancelBtn = container.querySelector("#modal-cancel-btn");
    const actionBtn = container.querySelector("#modal-action-btn");

    function openModal(title, content) {
      if (!customModal) return;
      modalTitle.textContent = title;
      modalBody.innerHTML = content;
      customModal.classList.remove("hidden");
    }

    function closeModal() {
      if (!customModal) return;
      customModal.classList.add("hidden");
    }

    if (closeBtn) closeBtn.addEventListener("click", closeModal);
    if (cancelBtn) cancelBtn.addEventListener("click", closeModal);
    if (actionBtn) {
      actionBtn.addEventListener("click", () => {
        closeModal();
        DashComponents.showToast("Modal action confirmed!", "success");
      });
    }

    const defaultBtn = container.querySelector("#trigger-default-modal");
    if (defaultBtn) {
      defaultBtn.addEventListener("click", () => {
        openModal("Default Workspace Overview", "<p>This is a standard modal dialog matching CoreUI design tokens. You can embed tables, forms, or summary widgets here.</p>");
      });
    }

    const confirmBtn = container.querySelector("#trigger-confirm-modal");
    if (confirmBtn) {
      confirmBtn.addEventListener("click", () => {
        DashComponents.confirmModal(
          "Delete Production Cluster",
          "Are you sure you want to terminate cluster 'prod-db-sg-01'? This will immediately delete all persistent volumes and backups.",
          () => {
            DashComponents.showToast("Cluster termination request dispatched.", "warning");
          }
        );
      });
    }

    const largeBtn = container.querySelector("#trigger-large-modal");
    if (largeBtn) {
      largeBtn.addEventListener("click", () => {
        openModal(
          "Enterprise SLA Details",
          `<div class="space-y-3">
            <p>DashPulse SLA Tier 1 Agreement includes 24/7 dedicated telephone support, continuous multi-region health probes, and designated incident response under 15 minutes.</p>
            <div class="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 text-[11px] font-mono">
              Contract ID: #SLA-2026-99120<br>
              Guaranteed Uptime: 99.99%<br>
              Next Review: Dec 31, 2026
            </div>
          </div>`
        );
      });
    }
  }

  return {
    render
  };
})();
