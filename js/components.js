/**
 * DashPulse Admin Dashboard Template
 * Reusable UI Components, Feedback, Modals, Toasts, Skeletons & Utilities
 */

window.DashComponents = (function () {
  // Toast Notification System
  function showToast(message, type = "info", duration = 3500) {
    const container = document.getElementById("toast-container");
    if (!container) return;

    const toast = document.createElement("div");
    toast.className = "toast-item flex items-center gap-3 p-4 rounded-xl shadow-xl border backdrop-blur-md transition-all text-sm font-medium";

    let icon = "info";
    let bgClasses = "bg-white/95 dark:bg-slate-900/95 text-slate-800 dark:text-slate-100 border-slate-200 dark:border-slate-800";

    if (type === "success") {
      icon = "check-circle";
      bgClasses = "bg-emerald-50 dark:bg-emerald-950/80 text-emerald-900 dark:text-emerald-100 border-emerald-200 dark:border-emerald-800";
    } else if (type === "error") {
      icon = "alert-circle";
      bgClasses = "bg-rose-50 dark:bg-rose-950/80 text-rose-900 dark:text-rose-100 border-rose-200 dark:border-rose-800";
    } else if (type === "warning") {
      icon = "alert-triangle";
      bgClasses = "bg-amber-50 dark:bg-amber-950/80 text-amber-900 dark:text-amber-100 border-amber-200 dark:border-amber-800";
    }

    toast.className += ` ${bgClasses}`;
    toast.innerHTML = `
      <i data-lucide="${icon}" class="w-5 h-5 flex-shrink-0"></i>
      <span class="flex-1">${message}</span>
      <button type="button" class="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1 -mr-1 rounded-md transition-colors" aria-label="Close notification">
        <i data-lucide="x" class="w-4 h-4"></i>
      </button>
    `;

    container.appendChild(toast);
    if (window.lucide) window.lucide.createIcons({ root: toast });

    // Animate in
    requestAnimationFrame(() => {
      toast.classList.add("show");
    });

    const closeBtn = toast.querySelector("button");
    const removeToast = () => {
      toast.classList.remove("show");
      toast.classList.add("hide");
      setTimeout(() => {
        if (toast.parentNode) toast.parentNode.removeChild(toast);
      }, 300);
    };

    closeBtn.addEventListener("click", removeToast);
    if (duration > 0) {
      setTimeout(removeToast, duration);
    }
  }

  // Confirmation Modal Dialog
  function confirmModal({
    title = "Confirm Action",
    message = "Are you sure you want to proceed?",
    confirmText = "Confirm",
    cancelText = "Cancel",
    confirmVariant = "danger",
    onConfirm = () => {},
    onCancel = () => {}
  }) {
    const modalRoot = document.getElementById("confirm-modal-root");
    if (!modalRoot) return;

    let confirmBtnClass = "bg-rose-600 hover:bg-rose-700 text-white focus:ring-rose-500";
    if (confirmVariant === "primary") {
      confirmBtnClass = "bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500";
    } else if (confirmVariant === "warning") {
      confirmBtnClass = "bg-amber-600 hover:bg-amber-700 text-white focus:ring-amber-500";
    }

    modalRoot.innerHTML = `
      <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm transition-opacity" id="confirm-dialog-backdrop">
        <div class="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 max-w-md w-full p-6 space-y-4 modal-content transform transition-all" role="dialog" aria-modal="true" aria-labelledby="confirm-modal-title">
          <div class="flex items-start gap-4">
            <div class="p-3 rounded-xl ${confirmVariant === 'danger' ? 'bg-rose-100 text-rose-600 dark:bg-rose-950/60 dark:text-rose-400' : 'bg-blue-100 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400'}">
              <i data-lucide="${confirmVariant === 'danger' ? 'alert-triangle' : 'info'}" class="w-6 h-6"></i>
            </div>
            <div class="flex-1">
              <h3 id="confirm-modal-title" class="text-lg font-semibold text-slate-900 dark:text-white">${title}</h3>
              <p class="text-sm text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">${message}</p>
            </div>
          </div>
          <div class="flex items-center justify-end gap-3 pt-3 border-t border-slate-100 dark:border-slate-800">
            <button type="button" id="confirm-btn-cancel" class="px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors focus:ring-2 focus:ring-slate-400">
              ${cancelText}
            </button>
            <button type="button" id="confirm-btn-ok" class="px-4 py-2 text-sm font-medium rounded-lg shadow-sm transition-colors focus:ring-2 ${confirmBtnClass}">
              ${confirmText}
            </button>
          </div>
        </div>
      </div>
    `;

    if (window.lucide) window.lucide.createIcons({ root: modalRoot });

    const backdrop = document.getElementById("confirm-dialog-backdrop");
    const okBtn = document.getElementById("confirm-btn-ok");
    const cancelBtn = document.getElementById("confirm-btn-cancel");

    const cleanup = () => {
      modalRoot.innerHTML = "";
      document.removeEventListener("keydown", handleKey);
    };

    const handleKey = (e) => {
      if (e.key === "Escape") {
        cleanup();
        onCancel();
      }
    };
    document.addEventListener("keydown", handleKey);

    okBtn.focus();
    okBtn.addEventListener("click", () => {
      cleanup();
      onConfirm();
    });

    cancelBtn.addEventListener("click", () => {
      cleanup();
      onCancel();
    });

    backdrop.addEventListener("click", (e) => {
      if (e.target === backdrop) {
        cleanup();
        onCancel();
      }
    });
  }

  // Status Badges
  function getUserStatusBadge(status) {
    let classes = "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border-slate-200 dark:border-slate-700";
    let dotClass = "bg-slate-400";

    switch (status) {
      case "Active":
        classes = "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800";
        dotClass = "bg-emerald-500";
        break;
      case "Pending":
        classes = "bg-amber-50 text-amber-700 dark:bg-amber-950/50 dark:text-amber-300 border-amber-200 dark:border-amber-800";
        dotClass = "bg-amber-500";
        break;
      case "Suspended":
        classes = "bg-rose-50 text-rose-700 dark:bg-rose-950/50 dark:text-rose-300 border-rose-200 dark:border-rose-800";
        dotClass = "bg-rose-500";
        break;
      case "Inactive":
        classes = "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400 border-slate-200 dark:border-slate-700";
        dotClass = "bg-slate-400";
        break;
    }

    return `
      <span class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border ${classes}">
        <span class="w-1.5 h-1.5 rounded-full ${dotClass}"></span>
        ${status}
      </span>
    `;
  }

  function getOrderStatusBadge(status) {
    let classes = "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border-slate-200 dark:border-slate-700";
    let icon = "clock";

    switch (status) {
      case "Completed":
        classes = "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800";
        icon = "check-circle-2";
        break;
      case "Processing":
        classes = "bg-sky-50 text-sky-700 dark:bg-sky-950/50 dark:text-sky-300 border-sky-200 dark:border-sky-800";
        icon = "refresh-cw";
        break;
      case "Pending":
        classes = "bg-amber-50 text-amber-700 dark:bg-amber-950/50 dark:text-amber-300 border-amber-200 dark:border-amber-800";
        icon = "clock";
        break;
      case "Refunded":
        classes = "bg-purple-50 text-purple-700 dark:bg-purple-950/50 dark:text-purple-300 border-purple-200 dark:border-purple-800";
        icon = "rotate-ccw";
        break;
      case "Cancelled":
        classes = "bg-rose-50 text-rose-700 dark:bg-rose-950/50 dark:text-rose-300 border-rose-200 dark:border-rose-800";
        icon = "x-circle";
        break;
    }

    return `
      <span class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border ${classes}">
        <i data-lucide="${icon}" class="w-3.5 h-3.5"></i>
        ${status}
      </span>
    `;
  }

  // Breadcrumbs Generator
  function updateBreadcrumbs(items = []) {
    const el = document.getElementById("breadcrumbs-container");
    if (!el) return;

    if (items.length === 0) {
      items = [{ label: "Dashboard", href: "#dashboard" }];
    }

    const html = items.map((item, idx) => {
      const isLast = idx === items.length - 1;
      if (isLast) {
        return `<span class="text-slate-900 dark:text-white font-medium" aria-current="page">${item.label}</span>`;
      }
      return `
        <a href="${item.href || '#'}" class="text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 transition-colors">${item.label}</a>
        <i data-lucide="chevron-right" class="w-3.5 h-3.5 text-slate-400"></i>
      `;
    }).join("");

    el.innerHTML = `
      <nav aria-label="Breadcrumb" class="flex items-center gap-1.5 text-xs text-slate-500">
        <a href="#dashboard" class="flex items-center gap-1 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 transition-colors">
          <i data-lucide="home" class="w-3.5 h-3.5"></i>
        </a>
        <i data-lucide="chevron-right" class="w-3.5 h-3.5 text-slate-400"></i>
        ${html}
      </nav>
    `;

    if (window.lucide) window.lucide.createIcons({ root: el });
  }

  // Empty State Generator
  function renderEmptyState({
    icon = "inbox",
    title = "No records found",
    message = "Try adjusting your search or filters to find what you are looking for.",
    actionText = null,
    onAction = null
  }) {
    const actionId = `empty-act-${Math.random().toString(36).substr(2, 6)}`;
    const actionHtml = actionText ? `
      <div class="mt-4">
        <button id="${actionId}" type="button" class="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg shadow-sm transition-colors">
          <i data-lucide="rotate-ccw" class="w-4 h-4"></i>
          ${actionText}
        </button>
      </div>
    ` : "";

    setTimeout(() => {
      if (actionText && onAction) {
        const btn = document.getElementById(actionId);
        if (btn) btn.addEventListener("click", onAction);
      }
      if (window.lucide) window.lucide.createIcons();
    }, 10);

    return `
      <div class="py-16 px-4 text-center flex flex-col items-center justify-center">
        <div class="w-14 h-14 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 dark:text-slate-500 mb-4 shadow-inner">
          <i data-lucide="${icon}" class="w-7 h-7"></i>
        </div>
        <h3 class="text-base font-semibold text-slate-900 dark:text-white">${title}</h3>
        <p class="text-sm text-slate-500 dark:text-slate-400 max-w-sm mt-1 leading-relaxed">${message}</p>
        ${actionHtml}
      </div>
    `;
  }

  // Skeleton Table Generator
  function renderTableSkeleton({ rows = 5, cols = 5 } = {}) {
    let rowsHtml = "";
    for (let i = 0; i < rows; i++) {
      let cellsHtml = "";
      for (let j = 0; j < cols; j++) {
        const width = j === 0 ? "w-8" : j === 1 ? "w-32" : j === cols - 1 ? "w-20" : "w-24";
        cellsHtml += `<td class="p-4"><div class="h-4 ${width} skeleton rounded"></div></td>`;
      }
      rowsHtml += `<tr class="border-b border-slate-100 dark:border-slate-800/80">${cellsHtml}</tr>`;
    }
    return rowsHtml;
  }

  // CSV Exporter Helper
  function exportToCSV(filename, headers, rows) {
    const csvContent = [
      headers.join(","),
      ...rows.map(row => row.map(val => `"${String(val || '').replace(/"/g, '""')}"`).join(","))
    ].join("\r\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `${filename}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    showToast(`Exported ${filename}.csv successfully!`, "success");
  }

  // JSON Exporter Helper
  function exportToJSON(filename, data) {
    const jsonStr = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonStr], { type: "application/json;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `${filename}.json`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    showToast(`Exported ${filename}.json successfully!`, "success");
  }

  return {
    showToast,
    confirmModal,
    getUserStatusBadge,
    getOrderStatusBadge,
    updateBreadcrumbs,
    renderEmptyState,
    renderTableSkeleton,
    exportToCSV,
    exportToJSON
  };
})();
