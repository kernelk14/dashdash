/**
 * DashPulse Admin Dashboard Template
 * Page: Orders and Transactions
 */

window.OrdersPage = (function () {
  let searchTerm = "";
  let statusFilter = "All";
  let methodFilter = "All";
  let sortField = "rawDate";
  let sortAsc = false;
  let currentPage = 1;
  let pageSize = 10;

  function render(container) {
    DashComponents.updateBreadcrumbs([
      { label: "Dashboard", href: "#dashboard" },
      { label: "Orders & Transactions", href: "#orders" }
    ]);

    container.innerHTML = `
      <div class="space-y-6">
        <!-- Page Header -->
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 class="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">Orders & Invoices</h1>
            <p class="text-sm text-slate-500 dark:text-slate-400 mt-1">Real-time payment logs, SaaS subscription billing, and gateway reconciliation.</p>
          </div>
          <div class="flex items-center gap-3">
            <button id="btn-export-orders-csv" type="button" class="inline-flex items-center gap-1.5 px-3.5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold shadow-sm transition-colors">
              <i data-lucide="download" class="w-3.5 h-3.5"></i>
              Export CSV
            </button>
          </div>
        </div>

        <!-- Filter Bar -->
        <div class="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 shadow-sm p-4">
          <div class="flex flex-col md:flex-row md:items-center justify-between gap-3">
            <!-- Search -->
            <div class="relative flex-1 max-w-md">
              <i data-lucide="search" class="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"></i>
              <input id="orders-search-input" type="text" placeholder="Search by Order ID, customer, company..." value="${searchTerm}" class="w-full pl-9 pr-4 py-2 text-xs bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white placeholder-slate-400 focus:bg-white dark:focus:bg-slate-900 focus:ring-2 focus:ring-blue-500 transition-colors">
            </div>

            <!-- Filters -->
            <div class="flex flex-wrap items-center gap-2">
              <select id="orders-status-filter" class="text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-slate-700 dark:text-slate-300 focus:ring-blue-500">
                <option value="All" ${statusFilter === 'All' ? 'selected' : ''}>All Statuses</option>
                <option value="Completed" ${statusFilter === 'Completed' ? 'selected' : ''}>Completed</option>
                <option value="Processing" ${statusFilter === 'Processing' ? 'selected' : ''}>Processing</option>
                <option value="Pending" ${statusFilter === 'Pending' ? 'selected' : ''}>Pending</option>
                <option value="Refunded" ${statusFilter === 'Refunded' ? 'selected' : ''}>Refunded</option>
                <option value="Cancelled" ${statusFilter === 'Cancelled' ? 'selected' : ''}>Cancelled</option>
              </select>

              <select id="orders-method-filter" class="text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-slate-700 dark:text-slate-300 focus:ring-blue-500">
                <option value="All" ${methodFilter === 'All' ? 'selected' : ''}>All Payment Methods</option>
                <option value="Credit Card" ${methodFilter === 'Credit Card' ? 'selected' : ''}>Credit Card</option>
                <option value="Stripe ACH" ${methodFilter === 'Stripe ACH' ? 'selected' : ''}>Stripe ACH</option>
                <option value="Bank Wire" ${methodFilter === 'Bank Wire' ? 'selected' : ''}>Bank Wire</option>
                <option value="PayPal" ${methodFilter === 'PayPal' ? 'selected' : ''}>PayPal</option>
              </select>

              <select id="orders-page-size" class="text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-slate-700 dark:text-slate-300 focus:ring-blue-500">
                <option value="5" ${pageSize === 5 ? 'selected' : ''}>5 per page</option>
                <option value="10" ${pageSize === 10 ? 'selected' : ''}>10 per page</option>
                <option value="20" ${pageSize === 20 ? 'selected' : ''}>20 per page</option>
              </select>
            </div>
          </div>
        </div>

        <!-- Orders Table -->
        <div class="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 shadow-sm overflow-hidden">
          <div class="table-scroll-container">
            <table class="w-full text-left text-xs">
              <thead class="bg-slate-50/75 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400 font-semibold border-b border-slate-100 dark:border-slate-800 select-none">
                <tr>
                  <th class="p-3.5 pl-6 cursor-pointer hover:text-slate-900 dark:hover:text-white" data-sort="id">
                    <div class="flex items-center gap-1.5">
                      <span>Order #</span>
                      <i data-lucide="${sortField === 'id' ? (sortAsc ? 'chevron-up' : 'chevron-down') : 'chevrons-up-down'}" class="w-3.5 h-3.5 text-slate-400"></i>
                    </div>
                  </th>
                  <th class="p-3.5 cursor-pointer hover:text-slate-900 dark:hover:text-white" data-sort="customer">
                    <div class="flex items-center gap-1.5">
                      <span>Customer / Account</span>
                      <i data-lucide="${sortField === 'customer' ? (sortAsc ? 'chevron-up' : 'chevron-down') : 'chevrons-up-down'}" class="w-3.5 h-3.5 text-slate-400"></i>
                    </div>
                  </th>
                  <th class="p-3.5 cursor-pointer hover:text-slate-900 dark:hover:text-white" data-sort="rawDate">
                    <div class="flex items-center gap-1.5">
                      <span>Date & Time</span>
                      <i data-lucide="${sortField === 'rawDate' ? (sortAsc ? 'chevron-up' : 'chevron-down') : 'chevrons-up-down'}" class="w-3.5 h-3.5 text-slate-400"></i>
                    </div>
                  </th>
                  <th class="p-3.5">Payment Method</th>
                  <th class="p-3.5 cursor-pointer hover:text-slate-900 dark:hover:text-white" data-sort="amount">
                    <div class="flex items-center gap-1.5">
                      <span>Total Amount</span>
                      <i data-lucide="${sortField === 'amount' ? (sortAsc ? 'chevron-up' : 'chevron-down') : 'chevrons-up-down'}" class="w-3.5 h-3.5 text-slate-400"></i>
                    </div>
                  </th>
                  <th class="p-3.5 cursor-pointer hover:text-slate-900 dark:hover:text-white" data-sort="status">
                    <div class="flex items-center gap-1.5">
                      <span>Status</span>
                      <i data-lucide="${sortField === 'status' ? (sortAsc ? 'chevron-up' : 'chevron-down') : 'chevrons-up-down'}" class="w-3.5 h-3.5 text-slate-400"></i>
                    </div>
                  </th>
                  <th class="p-3.5 text-right pr-6">Action</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-100 dark:divide-slate-800/60" id="orders-tbody">
                <!-- Dynamically populated -->
              </tbody>
            </table>
          </div>

          <!-- Empty State -->
          <div id="orders-empty-state" class="hidden"></div>

          <!-- Pagination Bar -->
          <div id="orders-pagination-bar" class="p-4 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
            <div id="orders-pagination-info">Showing 1 to 10 of 15 orders</div>
            <div class="flex items-center gap-1.5" id="orders-pagination-controls">
              <!-- Controls -->
            </div>
          </div>
        </div>
      </div>

      <!-- Order Detail Modal Root -->
      <div id="order-detail-modal-root"></div>
    `;

    if (window.lucide) window.lucide.createIcons({ root: container });

    bindEvents(container);
    renderTable();
  }

  function getFilteredAndSortedOrders() {
    let orders = DashData.getOrders();

    // Search filter
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      orders = orders.filter(o =>
        o.id.toLowerCase().includes(q) ||
        o.customer.toLowerCase().includes(q) ||
        o.company.toLowerCase().includes(q) ||
        o.email.toLowerCase().includes(q)
      );
    }

    // Status filter
    if (statusFilter !== "All") {
      orders = orders.filter(o => o.status === statusFilter);
    }

    // Method filter
    if (methodFilter !== "All") {
      orders = orders.filter(o => o.paymentMethod.toLowerCase().includes(methodFilter.toLowerCase()));
    }

    // Sorting
    orders.sort((a, b) => {
      let valA = a[sortField];
      let valB = b[sortField];

      if (sortField === "amount") {
        return sortAsc ? valA - valB : valB - valA;
      }

      valA = String(valA || "").toLowerCase();
      valB = String(valB || "").toLowerCase();
      if (valA < valB) return sortAsc ? -1 : 1;
      if (valA > valB) return sortAsc ? 1 : -1;
      return 0;
    });

    return orders;
  }

  function renderTable() {
    const tbody = document.getElementById("orders-tbody");
    const emptyState = document.getElementById("orders-empty-state");
    const paginationBar = document.getElementById("orders-pagination-bar");
    const paginationInfo = document.getElementById("orders-pagination-info");
    const paginationControls = document.getElementById("orders-pagination-controls");

    if (!tbody) return;

    const filtered = getFilteredAndSortedOrders();
    const totalRecords = filtered.length;
    const totalPages = Math.ceil(totalRecords / pageSize) || 1;

    if (currentPage > totalPages) currentPage = totalPages;
    if (currentPage < 1) currentPage = 1;

    const startIdx = (currentPage - 1) * pageSize;
    const pageRecords = filtered.slice(startIdx, startIdx + pageSize);

    if (totalRecords === 0) {
      tbody.innerHTML = "";
      emptyState.classList.remove("hidden");
      paginationBar.classList.add("hidden");
      emptyState.innerHTML = DashComponents.renderEmptyState({
        icon: "receipt",
        title: "No orders found",
        message: "No orders match your specified criteria.",
        actionText: "Clear filters",
        onAction: () => {
          searchTerm = "";
          statusFilter = "All";
          methodFilter = "All";
          const sIn = document.getElementById("orders-search-input");
          const stIn = document.getElementById("orders-status-filter");
          const mIn = document.getElementById("orders-method-filter");
          if (sIn) sIn.value = "";
          if (stIn) stIn.value = "All";
          if (mIn) mIn.value = "All";
          renderTable();
        }
      });
      return;
    }

    emptyState.classList.add("hidden");
    paginationBar.classList.remove("hidden");

    tbody.innerHTML = pageRecords.map(o => `
      <tr class="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
        <td class="p-3.5 pl-6 font-mono font-medium text-slate-900 dark:text-white">
          <span class="hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer order-link-trigger" data-order-id="${o.id}">${o.id}</span>
        </td>
        <td class="p-3.5">
          <div class="font-semibold text-slate-900 dark:text-white">${o.customer}</div>
          <div class="text-[11px] text-slate-400 dark:text-slate-500">${o.company} • ${o.email}</div>
        </td>
        <td class="p-3.5 text-slate-600 dark:text-slate-400 text-[11px]">${o.date}</td>
        <td class="p-3.5 text-slate-600 dark:text-slate-400 text-[11px] flex items-center gap-1.5 pt-4">
          <i data-lucide="credit-card" class="w-3.5 h-3.5 text-slate-400"></i>
          ${o.paymentMethod}
        </td>
        <td class="p-3.5 font-bold text-slate-900 dark:text-white font-mono">$${o.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
        <td class="p-3.5">${DashComponents.getOrderStatusBadge(o.status)}</td>
        <td class="p-3.5 text-right pr-6">
          <button type="button" data-view-order-id="${o.id}" class="view-order-btn px-2.5 py-1 text-xs font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 rounded-md transition-colors">
            View Details
          </button>
        </td>
      </tr>
    `).join("");

    // Pagination display
    const endIdx = Math.min(startIdx + pageSize, totalRecords);
    paginationInfo.textContent = `Showing ${startIdx + 1} to ${endIdx} of ${totalRecords} orders`;

    let pagControlsHtml = `
      <button type="button" id="orders-prev" class="px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors" ${currentPage === 1 ? 'disabled' : ''}>
        <i data-lucide="chevron-left" class="w-3.5 h-3.5"></i>
      </button>
    `;

    for (let p = 1; p <= totalPages; p++) {
      pagControlsHtml += `
        <button type="button" data-page="${p}" class="orders-page-btn px-3 py-1.5 rounded-lg font-medium transition-colors ${p === currentPage ? 'bg-blue-600 text-white font-semibold' : 'border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'}">
          ${p}
        </button>
      `;
    }

    pagControlsHtml += `
      <button type="button" id="orders-next" class="px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors" ${currentPage === totalPages ? 'disabled' : ''}>
        <i data-lucide="chevron-right" class="w-3.5 h-3.5"></i>
      </button>
    `;

    paginationControls.innerHTML = pagControlsHtml;

    if (window.lucide) window.lucide.createIcons({ root: tbody.parentNode.parentNode });

    bindDynamicTableEvents();
  }

  function bindEvents(container) {
    const searchInput = document.getElementById("orders-search-input");
    if (searchInput) {
      let timeout;
      searchInput.addEventListener("input", (e) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
          searchTerm = e.target.value;
          currentPage = 1;
          renderTable();
        }, 200);
      });
    }

    const stFilter = document.getElementById("orders-status-filter");
    if (stFilter) {
      stFilter.addEventListener("change", (e) => {
        statusFilter = e.target.value;
        currentPage = 1;
        renderTable();
      });
    }

    const mFilter = document.getElementById("orders-method-filter");
    if (mFilter) {
      mFilter.addEventListener("change", (e) => {
        methodFilter = e.target.value;
        currentPage = 1;
        renderTable();
      });
    }

    const psSelect = document.getElementById("orders-page-size");
    if (psSelect) {
      psSelect.addEventListener("change", (e) => {
        pageSize = parseInt(e.target.value, 10);
        currentPage = 1;
        renderTable();
      });
    }

    // Sort column headers
    container.querySelectorAll("th[data-sort]").forEach(th => {
      th.addEventListener("click", () => {
        const field = th.dataset.sort;
        if (sortField === field) {
          sortAsc = !sortAsc;
        } else {
          sortField = field;
          sortAsc = true;
        }
        renderTable();
      });
    });

    // CSV export
    const exportBtn = document.getElementById("btn-export-orders-csv");
    if (exportBtn) {
      exportBtn.addEventListener("click", () => {
        const orders = getFilteredAndSortedOrders();
        const headers = ["Order ID", "Customer", "Company", "Email", "Date", "Payment Method", "Amount", "Status", "Transaction Ref"];
        const rows = orders.map(o => [o.id, o.customer, o.company, o.email, o.date, o.paymentMethod, o.amount, o.status, o.transactionId]);
        DashComponents.exportToCSV("orders_transactions_ledger", headers, rows);
      });
    }
  }

  function bindDynamicTableEvents() {
    // View detail buttons
    document.querySelectorAll(".view-order-btn, .order-link-trigger").forEach(el => {
      el.addEventListener("click", () => {
        const id = el.dataset.viewOrderId || el.dataset.orderId;
        const order = DashData.getOrderById(id);
        if (order) openOrderDetailModal(order);
      });
    });

    // Pagination
    const prev = document.getElementById("orders-prev");
    const next = document.getElementById("orders-next");
    if (prev) {
      prev.addEventListener("click", () => {
        if (currentPage > 1) {
          currentPage--;
          renderTable();
        }
      });
    }
    if (next) {
      next.addEventListener("click", () => {
        currentPage++;
        renderTable();
      });
    }
    document.querySelectorAll(".orders-page-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        currentPage = parseInt(btn.dataset.page, 10);
        renderTable();
      });
    });
  }

  // Slide-over Modal for Order Details
  function openOrderDetailModal(order) {
    const root = document.getElementById("order-detail-modal-root");
    if (!root) return;

    const subtotal = order.items.reduce((acc, item) => acc + (item.qty * item.unitPrice), 0);

    root.innerHTML = `
      <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm" id="order-modal-backdrop">
        <div class="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 max-w-xl w-full p-6 modal-content space-y-5">
          <!-- Modal Header -->
          <div class="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
            <div>
              <div class="flex items-center gap-2">
                <h3 class="text-lg font-bold text-slate-900 dark:text-white font-mono">${order.id}</h3>
                ${DashComponents.getOrderStatusBadge(order.status)}
              </div>
              <p class="text-xs text-slate-500 mt-0.5">Placed on ${order.date}</p>
            </div>
            <button type="button" id="order-modal-close" class="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1 rounded-md">
              <i data-lucide="x" class="w-5 h-5"></i>
            </button>
          </div>

          <!-- Customer & Payment Details -->
          <div class="grid grid-cols-2 gap-4 text-xs bg-slate-50 dark:bg-slate-800/40 p-4 rounded-xl border border-slate-100 dark:border-slate-800">
            <div>
              <span class="text-slate-400 uppercase tracking-wider text-[10px] font-semibold">Customer Billing</span>
              <div class="font-semibold text-slate-900 dark:text-white mt-1">${order.customer}</div>
              <div class="text-slate-500">${order.company}</div>
              <div class="text-slate-500">${order.email}</div>
              <div class="text-slate-400 mt-1">${order.shippingAddress}</div>
            </div>
            <div>
              <span class="text-slate-400 uppercase tracking-wider text-[10px] font-semibold">Payment Info</span>
              <div class="font-semibold text-slate-900 dark:text-white mt-1">${order.paymentMethod}</div>
              <div class="font-mono text-[11px] text-slate-500 mt-0.5">${order.transactionId}</div>
              <div class="mt-2 text-emerald-600 dark:text-emerald-400 font-medium flex items-center gap-1">
                <i data-lucide="check-circle-2" class="w-3.5 h-3.5"></i> Authenticated & Cleared
              </div>
            </div>
          </div>

          <!-- Items Table -->
          <div>
            <h4 class="text-xs font-semibold text-slate-900 dark:text-white mb-2 uppercase tracking-wider">Purchased Items</h4>
            <div class="border border-slate-100 dark:border-slate-800 rounded-xl overflow-hidden">
              <table class="w-full text-left text-xs">
                <thead class="bg-slate-50 dark:bg-slate-800/60 text-slate-500 font-semibold border-b border-slate-100 dark:border-slate-800">
                  <tr>
                    <th class="p-2.5 pl-3">Item Description</th>
                    <th class="p-2.5 text-center">Qty</th>
                    <th class="p-2.5 text-right">Unit Price</th>
                    <th class="p-2.5 text-right pr-3">Subtotal</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-100 dark:divide-slate-800/60">
                  ${order.items.map(item => `
                    <tr>
                      <td class="p-2.5 pl-3 font-medium text-slate-900 dark:text-white">${item.name}</td>
                      <td class="p-2.5 text-center text-slate-600 dark:text-slate-300 font-mono">${item.qty}</td>
                      <td class="p-2.5 text-right text-slate-600 dark:text-slate-300 font-mono">$${item.unitPrice.toFixed(2)}</td>
                      <td class="p-2.5 text-right pr-3 font-semibold text-slate-900 dark:text-white font-mono">$${(item.qty * item.unitPrice).toFixed(2)}</td>
                    </tr>
                  `).join("")}
                </tbody>
              </table>
            </div>
          </div>

          <!-- Totals Calculation -->
          <div class="space-y-1.5 text-xs border-t border-slate-100 dark:border-slate-800 pt-3">
            <div class="flex justify-between text-slate-500">
              <span>Subtotal</span>
              <span class="font-mono text-slate-900 dark:text-white">$${subtotal.toFixed(2)}</span>
            </div>
            <div class="flex justify-between text-slate-500">
              <span>Sales Tax / VAT</span>
              <span class="font-mono text-slate-900 dark:text-white">$${(order.tax || 0).toFixed(2)}</span>
            </div>
            <div class="flex justify-between text-base font-bold text-slate-900 dark:text-white pt-2 border-t border-slate-100 dark:border-slate-800">
              <span>Grand Total</span>
              <span class="font-mono text-blue-600 dark:text-blue-400">$${order.amount.toFixed(2)}</span>
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800">
            <div>
              ${order.status === 'Completed' ? `
                <button type="button" id="btn-refund-order" class="text-xs font-semibold text-rose-600 hover:text-rose-700 dark:text-rose-400 px-3 py-1.5 rounded-lg border border-rose-200 dark:border-rose-900/60 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors">
                  Issue Refund
                </button>
              ` : ''}
            </div>
            <div class="flex items-center gap-2">
              <button type="button" id="btn-print-invoice" class="px-3.5 py-1.5 text-xs font-medium bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg transition-colors flex items-center gap-1.5">
                <i data-lucide="printer" class="w-3.5 h-3.5"></i> Print Invoice
              </button>
              <button type="button" id="btn-order-modal-done" class="px-4 py-1.5 text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-sm transition-colors">
                Done
              </button>
            </div>
          </div>
        </div>
      </div>
    `;

    if (window.lucide) window.lucide.createIcons({ root: root });

    const closeModal = () => { root.innerHTML = ""; };

    document.getElementById("order-modal-close").addEventListener("click", closeModal);
    document.getElementById("btn-order-modal-done").addEventListener("click", closeModal);
    document.getElementById("order-modal-backdrop").addEventListener("click", (e) => {
      if (e.target.id === "order-modal-backdrop") closeModal();
    });

    const printBtn = document.getElementById("btn-print-invoice");
    if (printBtn) {
      printBtn.addEventListener("click", () => {
        window.print();
      });
    }

    const refundBtn = document.getElementById("btn-refund-order");
    if (refundBtn) {
      refundBtn.addEventListener("click", () => {
        DashComponents.confirmModal({
          title: `Refund Order ${order.id}`,
          message: `Are you sure you want to process a refund of $${order.amount.toFixed(2)} back to ${order.customer}'s payment method?`,
          confirmText: "Process Refund",
          confirmVariant: "danger",
          onConfirm: () => {
            DashData.updateOrderStatus(order.id, "Refunded");
            DashComponents.showToast(`Order ${order.id} refunded successfully`, "warning");
            closeModal();
            renderTable();
          }
        });
      });
    }
  }

  return { render };
})();
