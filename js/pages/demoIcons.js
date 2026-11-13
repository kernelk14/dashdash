/**
 * DashPulse Admin Dashboard Template
 * Page: Icons Showcase (CoreUI Inspired Lucide Icon Library Directory)
 */

window.DemoIconsPage = (function () {
  const iconList = [
    // Navigation & UI
    { name: "layout-dashboard", category: "Navigation" },
    { name: "bar-chart-2", category: "Navigation" },
    { name: "bar-chart-3", category: "Navigation" },
    { name: "line-chart", category: "Navigation" },
    { name: "pie-chart", category: "Navigation" },
    { name: "compass", category: "Navigation" },
    { name: "menu", category: "Navigation" },
    { name: "more-horizontal", category: "Navigation" },
    { name: "more-vertical", category: "Navigation" },
    { name: "layers", category: "Navigation" },
    { name: "sliders", category: "Navigation" },
    { name: "grid", category: "Navigation" },
    { name: "list", category: "Navigation" },

    // Commerce & Finance
    { name: "shopping-bag", category: "Commerce" },
    { name: "shopping-cart", category: "Commerce" },
    { name: "credit-card", category: "Commerce" },
    { name: "dollar-sign", category: "Commerce" },
    { name: "tag", category: "Commerce" },
    { name: "receipt", category: "Commerce" },
    { name: "package", category: "Commerce" },
    { name: "truck", category: "Commerce" },
    { name: "gift", category: "Commerce" },
    { name: "wallet", category: "Commerce" },

    // Users & Communication
    { name: "users", category: "Users" },
    { name: "user", category: "Users" },
    { name: "user-plus", category: "Users" },
    { name: "user-check", category: "Users" },
    { name: "user-x", category: "Users" },
    { name: "mail", category: "Communication" },
    { name: "message-square", category: "Communication" },
    { name: "message-circle", category: "Communication" },
    { name: "bell", category: "Communication" },
    { name: "bell-off", category: "Communication" },
    { name: "send", category: "Communication" },
    { name: "share-2", category: "Communication" },

    // Files & Storage
    { name: "folder", category: "Files" },
    { name: "file", category: "Files" },
    { name: "file-text", category: "Files" },
    { name: "file-code", category: "Files" },
    { name: "file-check", category: "Files" },
    { name: "file-plus", category: "Files" },
    { name: "database", category: "Files" },
    { name: "hard-drive", category: "Files" },
    { name: "cloud", category: "Files" },
    { name: "cloud-upload", category: "Files" },
    { name: "cloud-download", category: "Files" },
    { name: "download", category: "Files" },
    { name: "upload", category: "Files" },

    // Security & System
    { name: "shield", category: "Security" },
    { name: "shield-check", category: "Security" },
    { name: "lock", category: "Security" },
    { name: "unlock", category: "Security" },
    { name: "key", category: "Security" },
    { name: "settings", category: "System" },
    { name: "tool", category: "System" },
    { name: "alert-triangle", category: "System" },
    { name: "alert-circle", category: "System" },
    { name: "info", category: "System" },
    { name: "check-circle", category: "System" },
    { name: "x-circle", category: "System" },
    { name: "activity", category: "System" },
    { name: "cpu", category: "System" },
    { name: "terminal", category: "System" },

    // Arrows & Controls
    { name: "chevron-down", category: "Arrows" },
    { name: "chevron-up", category: "Arrows" },
    { name: "chevron-left", category: "Arrows" },
    { name: "chevron-right", category: "Arrows" },
    { name: "arrow-up-right", category: "Arrows" },
    { name: "arrow-down-left", category: "Arrows" },
    { name: "refresh-cw", category: "Arrows" },
    { name: "rotate-cw", category: "Arrows" },
    { name: "external-link", category: "Arrows" },
    { name: "search", category: "Arrows" },
    { name: "filter", category: "Arrows" },
    { name: "calendar", category: "System" },
    { name: "clock", category: "System" },
    { name: "check", category: "System" },
    { name: "x", category: "System" },
    { name: "plus", category: "System" },
    { name: "trash-2", category: "System" },
    { name: "edit-3", category: "System" },
    { name: "copy", category: "System" },
    { name: "eye", category: "System" },
    { name: "eye-off", category: "System" }
  ];

  function render(container) {
    DashComponents.updateBreadcrumbs([
      { label: "Components", href: "#icons" },
      { label: "Icons", href: "#icons" }
    ]);

    const categories = ["All", "Navigation", "Commerce", "Users", "Files", "Security", "System", "Arrows"];

    container.innerHTML = `
      <div class="space-y-6">
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 class="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">Lucide Icon Directory</h1>
            <p class="text-sm text-slate-500 dark:text-slate-400 mt-1">Lightweight, crisp vector SVG icons. Click any icon card to copy its markup tag.</p>
          </div>
          <div class="relative w-full sm:w-64">
            <div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <i data-lucide="search" class="w-4 h-4"></i>
            </div>
            <input type="text" id="icon-search-input" class="w-full pl-10 pr-3.5 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all" placeholder="Filter icons...">
          </div>
        </div>

        <!-- Category Tabs -->
        <div class="flex items-center gap-2 overflow-x-auto pb-2" id="icon-cat-bar">
          ${categories.map((cat, idx) => `
            <button type="button" class="icon-cat-btn px-3 py-1.5 rounded-lg text-xs font-medium transition-colors whitespace-nowrap ${idx === 0 ? 'bg-blue-600 text-white shadow-xs' : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800 hover:border-slate-300'}" data-cat="${cat}">
              ${cat}
            </button>
          `).join("")}
        </div>

        <!-- Icons Grid -->
        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4" id="icons-grid-container">
          <!-- Injected via renderGrid -->
        </div>
      </div>
    `;

    if (window.lucide) window.lucide.createIcons();
    initInteractions(container);
  }

  function renderGrid(container, query = "", category = "All") {
    const grid = container.querySelector("#icons-grid-container");
    if (!grid) return;

    const filtered = iconList.filter(item => {
      const matchCat = category === "All" || item.category === category;
      const matchQuery = !query || item.name.toLowerCase().includes(query.toLowerCase());
      return matchCat && matchQuery;
    });

    if (filtered.length === 0) {
      grid.innerHTML = `
        <div class="col-span-full py-12 text-center">
          <i data-lucide="search" class="w-8 h-8 text-slate-400 mx-auto mb-2 opacity-50"></i>
          <p class="text-sm font-semibold text-slate-700 dark:text-slate-300">No icons match "${query}"</p>
          <p class="text-xs text-slate-400 mt-1">Try another search term or clear the filter.</p>
        </div>
      `;
      if (window.lucide) window.lucide.createIcons();
      return;
    }

    grid.innerHTML = filtered.map(item => `
      <div class="icon-card group bg-white dark:bg-slate-900 rounded-xl border border-slate-200/80 dark:border-slate-800/80 p-4 flex flex-col items-center justify-center gap-3 cursor-pointer hover:border-blue-500 hover:shadow-md transition-all relative" data-name="${item.name}">
        <div class="w-10 h-10 rounded-lg bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-700 dark:text-slate-200 group-hover:bg-blue-50 dark:group-hover:bg-blue-900/30 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          <i data-lucide="${item.name}" class="w-5 h-5"></i>
        </div>
        <span class="text-[11px] font-mono text-slate-600 dark:text-slate-400 text-center truncate max-w-full">${item.name}</span>
        <div class="absolute inset-0 bg-blue-600/90 rounded-xl opacity-0 group-hover:opacity-100 flex items-center justify-center text-white text-[10px] font-bold transition-opacity">
          Click to Copy
        </div>
      </div>
    `).join("");

    if (window.lucide) window.lucide.createIcons();

    // Attach click-to-copy
    grid.querySelectorAll(".icon-card").forEach(card => {
      card.addEventListener("click", () => {
        const name = card.getAttribute("data-name");
        const snippet = `<i data-lucide="${name}"></i>`;
        navigator.clipboard.writeText(snippet).then(() => {
          DashComponents.showToast(`Copied snippet: ${snippet}`, "success");
        }).catch(() => {
          DashComponents.showToast(`Selected icon: ${name}`, "info");
        });
      });
    });
  }

  function initInteractions(container) {
    let currentCategory = "All";
    let searchQuery = "";

    renderGrid(container, searchQuery, currentCategory);

    // Search input
    const searchInput = container.querySelector("#icon-search-input");
    if (searchInput) {
      searchInput.addEventListener("input", (e) => {
        searchQuery = e.target.value.trim();
        renderGrid(container, searchQuery, currentCategory);
      });
    }

    // Category buttons
    container.querySelectorAll(".icon-cat-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        container.querySelectorAll(".icon-cat-btn").forEach(b => {
          b.className = "icon-cat-btn px-3 py-1.5 rounded-lg text-xs font-medium transition-colors whitespace-nowrap bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800 hover:border-slate-300";
        });
        btn.className = "icon-cat-btn px-3 py-1.5 rounded-lg text-xs font-medium transition-colors whitespace-nowrap bg-blue-600 text-white shadow-xs";
        currentCategory = btn.getAttribute("data-cat");
        renderGrid(container, searchQuery, currentCategory);
      });
    });
  }

  return {
    render
  };
})();
