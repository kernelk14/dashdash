/**
 * DashPulse Admin Dashboard Template
 * Page: Invoices & Billing Management
 */

window.InvoicesPage = (function () {
  let statusFilter = "All";
  let searchTerm = "";

  function render(container) {
    DashComponents.updateBreadcrumbs([
      { label: "Dashboard", href: "#dashboard" },
      { label: "Invoices & Billing", href: "#invoices" }
    ]);

    container.innerHTML = `
      <div class="space-y-6">
        <!-- Header -->
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 class="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">Invoices & Statements</h1>
            <p class="text-sm text-slate-500 dark:text-slate-400 mt-1">Generate client billing statements, track overdue accounts, and view itemized invoices.</p>
          </div>
          <div class="flex items-center gap-3">
            <button id="btn-create-invoice" type="button" class="inline-flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold shadow-sm transition-colors">
              <i data-lucide="plus" class="w-3.5 h-3.5"></i> Create New Invoice
            </button>
          </div>
        </div>

        <!-- Filter Bar -->
        <div class="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 shadow-sm p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div class="flex flex-wrap items-center gap-3 flex-1">
            <div class="relative w-full sm:w-72">
              <i data-lucide="search" class="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"></i>
              <input id="inv-search" type="text" placeholder="Search by Invoice #, client, company..." value="${searchTerm}" class="w-full pl-9 pr-4 py-2 text-xs bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-500">
            </div>

            <select id="inv-status-filter" class="text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-slate-700 dark:text-slate-300">
              <option value="All" ${statusFilter === 'All' ? 'selected' : ''}>All Payment Statuses</option>
              <option value="Paid" ${statusFilter === 'Paid' ? 'selected' : ''}>Paid</option>
              <option value="Pending" ${statusFilter === 'Pending' ? 'selected' : ''}>Pending</option>
              <option value="Overdue" ${statusFilter === 'Overdue' ? 'selected' : ''}>Overdue</option>
            </select>
          </div>

          <div class="text-xs text-slate-500 font-mono">
            Total Outstanding: <span class="font-bold text-slate-900 dark:text-white">$9,000.00</span>
          </div>
        </div>

        <!-- Invoices Table -->
        <div class="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 shadow-sm overflow-hidden">
          <div class="table-scroll-container">
            <table class="w-full text-left text-xs">
              <thead class="bg-slate-50/75 dark:bg-slate-800/50 text-slate-500 font-semibold border-b border-slate-100 dark:border-slate-800">
                <tr>
                  <th class="p-3.5 pl-6">Invoice #</th>
                  <th class="p-3.5">Client & Company</th>
                  <th class="p-3.5">Issue Date</th>
                  <th class="p-3.5">Due Date</th>
                  <th class="p-3.5">Total Amount</th>
                  <th class="p-3.5">Status</th>
                  <th class="p-3.5 text-right pr-6">Actions</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-100 dark:divide-slate-800/60" id="invoices-tbody">
                <!-- Populated dynamically -->
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- Invoice Viewer Modal Root -->
      <div id="invoice-view-modal-root"></div>
    `;

    if (window.lucide) window.lucide.createIcons({ root: container });

    renderInvoicesTable();
    bindEvents(container);
  }

  function getFilteredInvoices() {
    let list = DashData.getInvoices();

    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      list = list.filter(i =>
        i.id.toLowerCase().includes(q) ||
        i.client.toLowerCase().includes(q) ||
        i.company.toLowerCase().includes(q)
      );
    }

    if (statusFilter !== "All") {
      list = list.filter(i => i.status === statusFilter);
    }

    return list;
  }

  function renderInvoicesTable() {
    const tbody = document.getElementById("invoices-tbody");
    if (!tbody) return;

    const list = getFilteredInvoices();

    if (list.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="7" class="p-8 text-center text-slate-400">
            No invoices match the specified criteria.
          </td>
        </tr>
      `;
      return;
    }

    tbody.innerHTML = list.map(inv => {
      let badgeClass = "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300";
      if (inv.status === "Paid") badgeClass = "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border-emerald-200";
      else if (inv.status === "Pending") badgeClass = "bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300 border-amber-200";
      else if (inv.status === "Overdue") badgeClass = "bg-rose-50 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300 border-rose-200";

      return `
        <tr class="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
          <td class="p-3.5 pl-6 font-mono font-bold text-slate-900 dark:text-white">${inv.id}</td>
          <td class="p-3.5">
            <div class="font-semibold text-slate-900 dark:text-white">${inv.client}</div>
            <div class="text-[11px] text-slate-400">${inv.company}</div>
          </td>
          <td class="p-3.5 text-slate-600 dark:text-slate-400 text-[11px]">${inv.issueDate}</td>
          <td class="p-3.5 text-slate-600 dark:text-slate-400 text-[11px]">${inv.dueDate}</td>
          <td class="p-3.5 font-bold font-mono text-slate-900 dark:text-white">$${inv.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
          <td class="p-3.5">
            <span class="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold border ${badgeClass}">
              ${inv.status}
            </span>
          </td>
          <td class="p-3.5 text-right pr-6">
            <button type="button" data-view-inv="${inv.id}" class="view-inv-btn px-2.5 py-1 text-xs font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 rounded-md transition-colors">
              View Invoice
            </button>
          </td>
        </tr>
      `;
    }).join("");

    if (window.lucide) window.lucide.createIcons({ root: tbody });

    tbody.querySelectorAll(".view-inv-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const id = btn.dataset.viewInv;
        const inv = DashData.getInvoiceById(id);
        if (inv) openInvoiceModal(inv);
      });
    });
  }

  function bindEvents(container) {
    const searchIn = document.getElementById("inv-search");
    if (searchIn) {
      searchIn.addEventListener("input", (e) => {
        searchTerm = e.target.value;
        renderInvoicesTable();
      });
    }

    const stSelect = document.getElementById("inv-status-filter");
    if (stSelect) {
      stSelect.addEventListener("change", (e) => {
        statusFilter = e.target.value;
        renderInvoicesTable();
      });
    }

    document.getElementById("btn-create-invoice")?.addEventListener("click", () => {
      DashComponents.showToast("Create invoice modal ready. Adding default draft...", "info");
      DashData.addInvoice({
        client: "Amina Al-Mansoor",
        company: "Lumina Data LLC",
        email: "amina@lumina-analytics.com",
        amount: 3200.00,
        status: "Pending",
        dueDate: "Nov 30, 2026",
        items: [{ desc: "Custom Cloud Pipeline Engineering", qty: 1, price: 3200.00 }]
      });
      renderInvoicesTable();
    });
  }

  function openInvoiceModal(inv) {
    const root = document.getElementById("invoice-view-modal-root");
    if (!root) return;

    root.innerHTML = `
      <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm" id="inv-modal-backdrop">
        <div class="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 max-w-2xl w-full p-8 modal-content space-y-6">
          <!-- Top Row: Brand & Invoice Meta -->
          <div class="flex items-start justify-between border-b border-slate-100 dark:border-slate-800 pb-6">
            <div class="space-y-1">
              <div class="flex items-center gap-2">
                <div class="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-sm">DP</div>
                <span class="font-bold text-lg text-slate-900 dark:text-white">DashPulse Inc.</span>
              </div>
              <p class="text-xs text-slate-400">100 Montgomery St, Suite 1200<br>San Francisco, CA 94104</p>
            </div>

            <div class="text-right space-y-1">
              <div class="font-mono text-xl font-black text-slate-900 dark:text-white">${inv.id}</div>
              <div class="text-xs text-slate-400">Issued: ${inv.issueDate}</div>
              <div class="text-xs font-semibold ${inv.status === 'Paid' ? 'text-emerald-500' : 'text-amber-500'}">Status: ${inv.status}</div>
            </div>
          </div>

          <!-- Billed To -->
          <div class="grid grid-cols-2 gap-4 text-xs bg-slate-50 dark:bg-slate-800/40 p-4 rounded-2xl">
            <div>
              <span class="text-slate-400 uppercase font-semibold text-[10px]">Billed Client</span>
              <div class="font-bold text-slate-900 dark:text-white mt-1">${inv.client}</div>
              <div class="text-slate-500">${inv.company}</div>
              <div class="text-slate-500">${inv.email}</div>
            </div>
            <div>
              <span class="text-slate-400 uppercase font-semibold text-[10px]">Payment Terms</span>
              <div class="font-semibold text-slate-900 dark:text-white mt-1">Due by ${inv.dueDate}</div>
              <div class="text-slate-500">ACH / Wire Transfer or Credit Card</div>
            </div>
          </div>

          <!-- Line Items Table -->
          <div class="border border-slate-100 dark:border-slate-800 rounded-xl overflow-hidden">
            <table class="w-full text-left text-xs">
              <thead class="bg-slate-50 dark:bg-slate-800/60 text-slate-500 font-semibold border-b border-slate-100 dark:border-slate-800">
                <tr>
                  <th class="p-3 pl-4">Description</th>
                  <th class="p-3 text-center">Qty</th>
                  <th class="p-3 text-right">Unit Price</th>
                  <th class="p-3 text-right pr-4">Total</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-100 dark:divide-slate-800/60">
                ${inv.items.map(item => `
                  <tr>
                    <td class="p-3 pl-4 font-medium text-slate-900 dark:text-white">${item.desc}</td>
                    <td class="p-3 text-center font-mono text-slate-600 dark:text-slate-300">${item.qty}</td>
                    <td class="p-3 text-right font-mono text-slate-600 dark:text-slate-300">$${item.price.toFixed(2)}</td>
                    <td class="p-3 text-right pr-4 font-bold font-mono text-slate-900 dark:text-white">$${(item.qty * item.price).toFixed(2)}</td>
                  </tr>
                `).join("")}
              </tbody>
            </table>
          </div>

          <!-- Total Calculation -->
          <div class="flex justify-end text-xs">
            <div class="w-64 space-y-2">
              <div class="flex justify-between text-slate-500">
                <span>Subtotal</span>
                <span class="font-mono text-slate-900 dark:text-white">$${inv.amount.toFixed(2)}</span>
              </div>
              <div class="flex justify-between text-slate-500">
                <span>Tax Rate (0.00%)</span>
                <span class="font-mono text-slate-900 dark:text-white">$0.00</span>
              </div>
              <div class="flex justify-between text-base font-bold text-slate-900 dark:text-white pt-2 border-t border-slate-100 dark:border-slate-800">
                <span>Amount Due</span>
                <span class="font-mono text-blue-600 dark:text-blue-400">$${inv.amount.toFixed(2)}</span>
              </div>
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
            <div>
              ${inv.status !== 'Paid' ? `
                <button type="button" id="btn-mark-paid" class="px-3.5 py-1.5 text-xs font-semibold bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg shadow-sm transition-colors">
                  Mark as Paid
                </button>
              ` : ''}
            </div>

            <div class="flex items-center gap-2">
              <button type="button" id="btn-print-inv" class="px-3.5 py-1.5 text-xs font-medium bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-200 rounded-lg flex items-center gap-1.5">
                <i data-lucide="printer" class="w-3.5 h-3.5"></i> Print
              </button>
              <button type="button" id="btn-inv-close" class="px-4 py-1.5 text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-sm">
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    `;

    if (window.lucide) window.lucide.createIcons({ root: root });

    const close = () => { root.innerHTML = ""; };
    document.getElementById("btn-inv-close").addEventListener("click", close);
    document.getElementById("inv-modal-backdrop").addEventListener("click", (e) => {
      if (e.target.id === "inv-modal-backdrop") close();
    });

    document.getElementById("btn-print-inv")?.addEventListener("click", () => {
      window.print();
    });

    document.getElementById("btn-mark-paid")?.addEventListener("click", () => {
      DashData.updateInvoiceStatus(inv.id, "Paid");
      DashComponents.showToast(`Invoice ${inv.id} marked as Paid`, "success");
      close();
      renderInvoicesTable();
    });
  }

  return { render };
})();
