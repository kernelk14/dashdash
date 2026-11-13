/**
 * DashPulse Admin Dashboard Template
 * Page: E-Commerce & Product Inventory
 */

window.EcommercePage = (function () {
  let searchTerm = "";
  let categoryFilter = "All";
  let stockFilter = "All";
  let viewMode = "table"; // 'table' or 'grid'

  function render(container) {
    DashComponents.updateBreadcrumbs([
      { label: "Dashboard", href: "#dashboard" },
      { label: "E-Commerce Products", href: "#products" }
    ]);

    container.innerHTML = `
      <div class="space-y-6">
        <!-- Header -->
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 class="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">Products & Inventory</h1>
            <p class="text-sm text-slate-500 dark:text-slate-400 mt-1">Manage catalog listings, SKU quantities, pricing tiers, and hardware shipments.</p>
          </div>
          <div class="flex items-center gap-3">
            <button id="btn-export-products-csv" type="button" class="inline-flex items-center gap-1.5 px-3.5 py-2 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-800 rounded-lg text-xs font-semibold shadow-sm transition-colors">
              <i data-lucide="download" class="w-3.5 h-3.5"></i> Export Catalog
            </button>
            <button id="btn-add-product" type="button" class="inline-flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold shadow-sm transition-colors">
              <i data-lucide="plus" class="w-3.5 h-3.5"></i> Add Product
            </button>
          </div>
        </div>

        <!-- Inventory KPI Cards -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div class="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 shadow-sm">
            <span class="text-xs font-semibold text-slate-400 uppercase tracking-wider">Total SKUs</span>
            <div class="text-2xl font-bold text-slate-900 dark:text-white mt-1" id="kpi-total-skus">8 Items</div>
            <span class="text-xs text-blue-600 dark:text-blue-400 font-medium">Catalog Active</span>
          </div>
          <div class="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 shadow-sm">
            <span class="text-xs font-semibold text-slate-400 uppercase tracking-wider">Inventory Value</span>
            <div class="text-2xl font-bold text-slate-900 dark:text-white mt-1">$482,900</div>
            <span class="text-xs text-emerald-600 dark:text-emerald-400 font-medium">+12% vs last month</span>
          </div>
          <div class="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 shadow-sm">
            <span class="text-xs font-semibold text-slate-400 uppercase tracking-wider">Low Stock Warnings</span>
            <div class="text-2xl font-bold text-amber-500 mt-1">1 Item</div>
            <span class="text-xs text-slate-400">Reorder triggered</span>
          </div>
          <div class="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 shadow-sm">
            <span class="text-xs font-semibold text-slate-400 uppercase tracking-wider">Total Units Dispatched</span>
            <div class="text-2xl font-bold text-slate-900 dark:text-white mt-1">4,001</div>
            <span class="text-xs text-emerald-600 dark:text-emerald-400 font-medium">99.8% On-time delivery</span>
          </div>
        </div>

        <!-- Filter & Search Toolbar -->
        <div class="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 shadow-sm p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div class="flex flex-wrap items-center gap-3 flex-1">
            <div class="relative w-full sm:w-72">
              <i data-lucide="search" class="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"></i>
              <input id="prod-search" type="text" placeholder="Search by name, SKU..." value="${searchTerm}" class="w-full pl-9 pr-4 py-2 text-xs bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white placeholder-slate-400 focus:bg-white dark:focus:bg-slate-900 focus:ring-2 focus:ring-blue-500">
            </div>

            <select id="prod-cat-filter" class="text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-slate-700 dark:text-slate-300">
              <option value="All" ${categoryFilter === 'All' ? 'selected' : ''}>All Categories</option>
              <option value="Hardware" ${categoryFilter === 'Hardware' ? 'selected' : ''}>Hardware</option>
              <option value="Software" ${categoryFilter === 'Software' ? 'selected' : ''}>Software</option>
              <option value="Subscription" ${categoryFilter === 'Subscription' ? 'selected' : ''}>Subscription</option>
              <option value="Infrastructure" ${categoryFilter === 'Infrastructure' ? 'selected' : ''}>Infrastructure</option>
            </select>

            <select id="prod-stock-filter" class="text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-slate-700 dark:text-slate-300">
              <option value="All" ${stockFilter === 'All' ? 'selected' : ''}>All Stock Levels</option>
              <option value="In Stock" ${stockFilter === 'In Stock' ? 'selected' : ''}>In Stock</option>
              <option value="Low Stock" ${stockFilter === 'Low Stock' ? 'selected' : ''}>Low Stock</option>
              <option value="Out of Stock" ${stockFilter === 'Out of Stock' ? 'selected' : ''}>Out of Stock</option>
            </select>
          </div>

          <!-- View Mode Toggle -->
          <div class="inline-flex rounded-lg border border-slate-200 dark:border-slate-800 p-0.5 bg-slate-50 dark:bg-slate-800">
            <button id="view-mode-table" type="button" class="p-1.5 rounded-md ${viewMode === 'table' ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-sm' : 'text-slate-400'}" title="Table View">
              <i data-lucide="list" class="w-4 h-4"></i>
            </button>
            <button id="view-mode-grid" type="button" class="p-1.5 rounded-md ${viewMode === 'grid' ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-sm' : 'text-slate-400'}" title="Grid View">
              <i data-lucide="layout-grid" class="w-4 h-4"></i>
            </button>
          </div>
        </div>

        <!-- Products Container -->
        <div id="products-content-root"></div>
      </div>

      <!-- Add/Edit Product Modal Root -->
      <div id="product-modal-root"></div>
    `;

    if (window.lucide) window.lucide.createIcons({ root: container });

    renderProductsView();
    bindEvents(container);
  }

  function getFilteredProducts() {
    let prods = DashData.getProducts();

    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      prods = prods.filter(p => p.name.toLowerCase().includes(q) || p.sku.toLowerCase().includes(q));
    }

    if (categoryFilter !== "All") {
      prods = prods.filter(p => p.category === categoryFilter);
    }

    if (stockFilter !== "All") {
      prods = prods.filter(p => p.status === stockFilter);
    }

    return prods;
  }

  function renderProductsView() {
    const root = document.getElementById("products-content-root");
    if (!root) return;

    const prods = getFilteredProducts();

    if (prods.length === 0) {
      root.innerHTML = DashComponents.renderEmptyState({
        icon: "box",
        title: "No products found",
        message: "No catalog products matched your current filters.",
        actionText: "Reset Filters",
        onAction: () => {
          searchTerm = "";
          categoryFilter = "All";
          stockFilter = "All";
          document.getElementById("prod-search").value = "";
          document.getElementById("prod-cat-filter").value = "All";
          document.getElementById("prod-stock-filter").value = "All";
          renderProductsView();
        }
      });
      return;
    }

    if (viewMode === "table") {
      root.innerHTML = `
        <div class="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 shadow-sm overflow-hidden">
          <div class="table-scroll-container">
            <table class="w-full text-left text-xs">
              <thead class="bg-slate-50/75 dark:bg-slate-800/50 text-slate-500 font-semibold border-b border-slate-100 dark:border-slate-800">
                <tr>
                  <th class="p-3.5 pl-5">Product & SKU</th>
                  <th class="p-3.5">Category</th>
                  <th class="p-3.5">Unit Price</th>
                  <th class="p-3.5">Stock Level</th>
                  <th class="p-3.5">Rating</th>
                  <th class="p-3.5">Units Sold</th>
                  <th class="p-3.5 text-right pr-5">Actions</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-100 dark:divide-slate-800/60">
                ${prods.map(p => `
                  <tr class="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                    <td class="p-3.5 pl-5">
                      <div class="flex items-center gap-3">
                        <img src="${p.image}" alt="${p.name}" class="w-10 h-10 rounded-xl object-cover border border-slate-200 dark:border-slate-700 flex-shrink-0">
                        <div>
                          <div class="font-bold text-slate-900 dark:text-white">${p.name}</div>
                          <div class="font-mono text-[10px] text-slate-400">${p.sku}</div>
                        </div>
                      </div>
                    </td>
                    <td class="p-3.5">
                      <span class="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">${p.category}</span>
                    </td>
                    <td class="p-3.5 font-bold font-mono text-slate-900 dark:text-white">$${p.price.toFixed(2)}</td>
                    <td class="p-3.5">
                      <span class="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-medium border ${p.status === 'In Stock' ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border-emerald-200' : p.status === 'Low Stock' ? 'bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300 border-amber-200' : 'bg-rose-50 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300 border-rose-200'}">
                        <span class="w-1.5 h-1.5 rounded-full ${p.status === 'In Stock' ? 'bg-emerald-500' : p.status === 'Low Stock' ? 'bg-amber-500' : 'bg-rose-500'}"></span>
                        ${p.status} (${p.stock})
                      </span>
                    </td>
                    <td class="p-3.5 text-amber-500 font-semibold flex items-center gap-1 pt-4">
                      <i data-lucide="star" class="w-3.5 h-3.5 fill-amber-400 text-amber-400"></i> ${p.rating}
                    </td>
                    <td class="p-3.5 text-slate-600 dark:text-slate-400 font-mono">${p.sales.toLocaleString()}</td>
                    <td class="p-3.5 text-right pr-5">
                      <div class="flex items-center justify-end gap-1">
                        <button type="button" data-edit-prod="${p.id}" class="edit-prod-btn p-1.5 text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 rounded-md">
                          <i data-lucide="edit-2" class="w-4 h-4"></i>
                        </button>
                        <button type="button" data-del-prod="${p.id}" data-name="${p.name}" class="del-prod-btn p-1.5 text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 rounded-md">
                          <i data-lucide="trash-2" class="w-4 h-4"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                `).join("")}
              </tbody>
            </table>
          </div>
        </div>
      `;
    } else {
      root.innerHTML = `
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          ${prods.map(p => `
            <div class="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 shadow-sm overflow-hidden flex flex-col justify-between hover:shadow-md transition-shadow">
              <div class="relative h-44 bg-slate-100 dark:bg-slate-800 overflow-hidden">
                <img src="${p.image}" alt="${p.name}" class="w-full h-full object-cover">
                <span class="absolute top-2.5 right-2.5 px-2 py-0.5 rounded text-[10px] font-semibold bg-white/90 dark:bg-slate-900/90 text-slate-700 dark:text-slate-300 shadow">
                  ${p.category}
                </span>
              </div>
              <div class="p-4 space-y-2 flex-1 flex flex-col justify-between">
                <div>
                  <div class="font-mono text-[10px] text-slate-400">${p.sku}</div>
                  <h3 class="font-bold text-sm text-slate-900 dark:text-white leading-tight mt-0.5">${p.name}</h3>
                </div>
                <div class="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800">
                  <div class="font-mono font-bold text-base text-slate-900 dark:text-white">$${p.price.toFixed(2)}</div>
                  <div class="flex items-center gap-1">
                    <button type="button" data-edit-prod="${p.id}" class="edit-prod-btn p-1.5 text-slate-400 hover:text-blue-600">
                      <i data-lucide="edit-2" class="w-4 h-4"></i>
                    </button>
                    <button type="button" data-del-prod="${p.id}" data-name="${p.name}" class="del-prod-btn p-1.5 text-slate-400 hover:text-rose-600">
                      <i data-lucide="trash-2" class="w-4 h-4"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          `).join("")}
        </div>
      `;
    }

    if (window.lucide) window.lucide.createIcons({ root: root });
    bindCardEvents();
  }

  function bindEvents(container) {
    const searchIn = document.getElementById("prod-search");
    if (searchIn) {
      searchIn.addEventListener("input", (e) => {
        searchTerm = e.target.value;
        renderProductsView();
      });
    }

    const catSelect = document.getElementById("prod-cat-filter");
    if (catSelect) {
      catSelect.addEventListener("change", (e) => {
        categoryFilter = e.target.value;
        renderProductsView();
      });
    }

    const stockSelect = document.getElementById("prod-stock-filter");
    if (stockSelect) {
      stockSelect.addEventListener("change", (e) => {
        stockFilter = e.target.value;
        renderProductsView();
      });
    }

    const btnTable = document.getElementById("view-mode-table");
    const btnGrid = document.getElementById("view-mode-grid");

    if (btnTable && btnGrid) {
      btnTable.addEventListener("click", () => {
        viewMode = "table";
        btnTable.className = "p-1.5 rounded-md bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-sm";
        btnGrid.className = "p-1.5 rounded-md text-slate-400";
        renderProductsView();
      });

      btnGrid.addEventListener("click", () => {
        viewMode = "grid";
        btnGrid.className = "p-1.5 rounded-md bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-sm";
        btnTable.className = "p-1.5 rounded-md text-slate-400";
        renderProductsView();
      });
    }

    // Add Product Modal
    document.getElementById("btn-add-product")?.addEventListener("click", () => {
      openProductModal();
    });

    // CSV Export
    document.getElementById("btn-export-products-csv")?.addEventListener("click", () => {
      const prods = getFilteredProducts();
      const headers = ["Product ID", "Name", "SKU", "Category", "Price", "Stock", "Status", "Units Sold"];
      const rows = prods.map(p => [p.id, p.name, p.sku, p.category, p.price, p.stock, p.status, p.sales]);
      DashComponents.exportToCSV("products_inventory_catalog", headers, rows);
    });
  }

  function bindCardEvents() {
    document.querySelectorAll(".edit-prod-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const id = btn.dataset.editProd;
        const prod = DashData.getProductById(id);
        if (prod) openProductModal(prod);
      });
    });

    document.querySelectorAll(".del-prod-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const id = btn.dataset.delProd;
        const name = btn.dataset.name;
        DashComponents.confirmModal({
          title: `Delete Product: ${name}`,
          message: `Are you sure you want to remove "${name}" from the active catalog?`,
          confirmText: "Delete Product",
          confirmVariant: "danger",
          onConfirm: () => {
            DashData.deleteProduct(id);
            DashComponents.showToast(`Product "${name}" deleted`, "success");
            renderProductsView();
          }
        });
      });
    });
  }

  function openProductModal(existing = null) {
    const root = document.getElementById("product-modal-root");
    if (!root) return;

    const isEdit = !!existing;
    const p = existing || {
      name: "",
      sku: `SKU-${Math.floor(1000 + Math.random() * 9000)}`,
      category: "Software",
      price: 99.00,
      stock: 100,
      status: "In Stock"
    };

    root.innerHTML = `
      <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm" id="pm-backdrop">
        <div class="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 max-w-md w-full p-6 modal-content space-y-4">
          <div class="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
            <h3 class="text-base font-bold text-slate-900 dark:text-white">
              ${isEdit ? 'Edit Product' : 'Add New Catalog Product'}
            </h3>
            <button type="button" id="pm-close" class="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1">
              <i data-lucide="x" class="w-4 h-4"></i>
            </button>
          </div>

          <form id="pm-form" class="space-y-3 text-xs">
            <div>
              <label class="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Product Title</label>
              <input type="text" id="pm-name" required value="${p.name}" placeholder="e.g. Multi-Cluster Ingress Node" class="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white">
            </div>

            <div class="grid grid-cols-2 gap-3">
              <div>
                <label class="block font-semibold text-slate-700 dark:text-slate-300 mb-1">SKU Code</label>
                <input type="text" id="pm-sku" required value="${p.sku}" class="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-mono">
              </div>
              <div>
                <label class="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Category</label>
                <select id="pm-cat" class="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white">
                  <option value="Hardware" ${p.category === 'Hardware' ? 'selected' : ''}>Hardware</option>
                  <option value="Software" ${p.category === 'Software' ? 'selected' : ''}>Software</option>
                  <option value="Subscription" ${p.category === 'Subscription' ? 'selected' : ''}>Subscription</option>
                  <option value="Infrastructure" ${p.category === 'Infrastructure' ? 'selected' : ''}>Infrastructure</option>
                </select>
              </div>
            </div>

            <div class="grid grid-cols-2 gap-3">
              <div>
                <label class="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Unit Price ($)</label>
                <input type="number" step="0.01" id="pm-price" required value="${p.price}" class="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white">
              </div>
              <div>
                <label class="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Initial Stock</label>
                <input type="number" id="pm-stock" required value="${p.stock}" class="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white">
              </div>
            </div>

            <div class="flex items-center justify-end gap-3 pt-3 border-t border-slate-100 dark:border-slate-800">
              <button type="button" id="pm-cancel" class="px-4 py-2 text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 rounded-lg">
                Cancel
              </button>
              <button type="submit" class="px-5 py-2 font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm">
                ${isEdit ? 'Save Changes' : 'Create Product'}
              </button>
            </div>
          </form>
        </div>
      </div>
    `;

    if (window.lucide) window.lucide.createIcons({ root: root });

    const close = () => { root.innerHTML = ""; };
    document.getElementById("pm-close").addEventListener("click", close);
    document.getElementById("pm-cancel").addEventListener("click", close);
    document.getElementById("pm-backdrop").addEventListener("click", (e) => {
      if (e.target.id === "pm-backdrop") close();
    });

    document.getElementById("pm-form").addEventListener("submit", (e) => {
      e.preventDefault();
      const name = document.getElementById("pm-name").value.trim();
      const sku = document.getElementById("pm-sku").value.trim();
      const cat = document.getElementById("pm-cat").value;
      const price = parseFloat(document.getElementById("pm-price").value) || 0;
      const stock = parseInt(document.getElementById("pm-stock").value, 10) || 0;
      const status = stock > 10 ? "In Stock" : stock > 0 ? "Low Stock" : "Out of Stock";

      if (isEdit) {
        DashData.updateProduct(existing.id, { name, sku, category: cat, price, stock, status });
        DashComponents.showToast(`Product "${name}" updated`, "success");
      } else {
        DashData.addProduct({ name, sku, category: cat, price, stock, status });
        DashComponents.showToast(`Product "${name}" added to catalog`, "success");
      }

      close();
      renderProductsView();
    });
  }

  return { render };
})();
