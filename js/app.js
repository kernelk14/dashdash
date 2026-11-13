/**
 * DashPulse Admin Dashboard Template
 * Application Controller, Hash Router, Theme Manager & Global Interactions
 */

window.AppTheme = (function () {
  const THEME_STORAGE_KEY = "dashpulse-theme";

  function getSavedTheme() {
    return localStorage.getItem(THEME_STORAGE_KEY) || "system";
  }

  function resolveTheme(preference) {
    if (preference === "system") {
      return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    }
    return preference;
  }

  function applyTheme(preference) {
    const active = resolveTheme(preference);
    const root = document.documentElement;

    if (active === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }

    // Update Topbar Theme Toggle Icons
    const sunIcon = document.getElementById("theme-icon-sun");
    const moonIcon = document.getElementById("theme-icon-moon");
    if (sunIcon && moonIcon) {
      if (active === "dark") {
        sunIcon.classList.remove("hidden");
        moonIcon.classList.add("hidden");
      } else {
        sunIcon.classList.add("hidden");
        moonIcon.classList.remove("hidden");
      }
    }

    if (window.DashCharts && window.DashCharts.syncTheme) {
      window.DashCharts.syncTheme();
    }
  }

  function toggle() {
    const current = getSavedTheme();
    const resolved = resolveTheme(current);
    const next = resolved === "dark" ? "light" : "dark";
    localStorage.setItem(THEME_STORAGE_KEY, next);
    applyTheme(next);
    DashComponents.showToast(`Switched to ${next} mode`, "info", 1500);
  }

  function init() {
    applyTheme(getSavedTheme());

    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", () => {
      if (getSavedTheme() === "system") {
        applyTheme("system");
      }
    });

    const toggleBtn = document.getElementById("theme-toggle-btn");
    if (toggleBtn) {
      toggleBtn.addEventListener("click", toggle);
    }
  }

  return { init, toggle, applyTheme, getSavedTheme };
})();

// Command Palette & Global Search
window.CommandPalette = (function () {
  function open() {
    const modalRoot = document.getElementById("command-palette-root");
    if (!modalRoot) return;

    modalRoot.innerHTML = `
      <div class="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-slate-900/60 backdrop-blur-sm" id="cmd-backdrop">
        <div class="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 max-w-xl w-full overflow-hidden modal-content" role="dialog" aria-modal="true">
          <!-- Search Input Header -->
          <div class="flex items-center px-4 py-3 border-b border-slate-100 dark:border-slate-800 gap-3">
            <i data-lucide="search" class="w-5 h-5 text-slate-400"></i>
            <input id="cmd-input" type="text" placeholder="Type a command, page, user, or order..." class="w-full text-sm bg-transparent border-none text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none">
            <kbd class="hidden sm:inline-block font-mono text-[10px] text-slate-400 bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded border border-slate-200 dark:border-slate-700">ESC</kbd>
          </div>

          <!-- Results List -->
          <div class="max-h-96 overflow-y-auto p-2 space-y-1 text-xs" id="cmd-results">
            <!-- Dynamically populated -->
          </div>

          <!-- Footer Tips -->
          <div class="px-4 py-2.5 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
            <div class="flex items-center gap-2">
              <span>Navigation: <kbd class="font-mono bg-white dark:bg-slate-800 px-1 rounded shadow-xs">↑</kbd> <kbd class="font-mono bg-white dark:bg-slate-800 px-1 rounded shadow-xs">↓</kbd></span>
              <span>Select: <kbd class="font-mono bg-white dark:bg-slate-800 px-1 rounded shadow-xs">↵</kbd></span>
            </div>
            <span>Press ESC to exit</span>
          </div>
        </div>
      </div>
    `;

    if (window.lucide) window.lucide.createIcons({ root: modalRoot });

    const input = document.getElementById("cmd-input");
    const resultsContainer = document.getElementById("cmd-results");
    const backdrop = document.getElementById("cmd-backdrop");

    const close = () => { modalRoot.innerHTML = ""; };

    backdrop.addEventListener("click", (e) => {
      if (e.target === backdrop) close();
    });

    const handleKeydown = (e) => {
      if (e.key === "Escape") {
        close();
        document.removeEventListener("keydown", handleKeydown);
      }
    };
    document.addEventListener("keydown", handleKeydown);

    function populateResults(query = "") {
      const q = query.toLowerCase().trim();
      const items = [];

      // Pages
      const pages = [
        { label: "Dashboard Overview", desc: "KPI cards, revenue charts, recent activity", icon: "layout-dashboard", href: "#dashboard" },
        { label: "Analytics & Intelligence", desc: "Traffic metrics, cohort retention, regional market share", icon: "bar-chart-3", href: "#analytics" },
        { label: "Theme Colors", desc: "Contextual color palette, contrast ratios, copy HEX codes", icon: "palette", href: "#colors" },
        { label: "Typography System", desc: "Font scale, Inter weights, monospace tabular figures", icon: "type", href: "#typography" },
        { label: "Accordion & Collapse", desc: "Vertically collapsing responsive accordion panels", icon: "layers", href: "#base-accordion" },
        { label: "Cards & Deck Layouts", desc: "Bordered cards, media headers, action footers", icon: "layers", href: "#base-cards" },
        { label: "Carousel Slider", desc: "Image slider with dots, controls, and captions", icon: "layers", href: "#base-carousel" },
        { label: "Pagination & Badges", desc: "Page navigation controls and status pills", icon: "layers", href: "#base-pagination" },
        { label: "Buttons Showcase", desc: "Solid, outline, sizing, and icon buttons", icon: "circle-dot", href: "#buttons" },
        { label: "Button Groups", desc: "Toolbar and segmented view toggle groups", icon: "circle-dot", href: "#button-groups" },
        { label: "Dropdown Menus", desc: "Standard, split, and segmented action dropdowns", icon: "circle-dot", href: "#dropdowns" },
        { label: "Form Controls", desc: "Text inputs, textarea, file upload, range slider", icon: "check-square", href: "#forms" },
        { label: "Form Select", desc: "Native select, multi-select, and size scales", icon: "check-square", href: "#form-select" },
        { label: "Checks & Radios", desc: "Checkboxes, radio groups, and iOS switches", icon: "check-square", href: "#form-checks" },
        { label: "Form Validation", desc: "Interactive client-side validation form with live error states", icon: "check-square", href: "#form-validation" },
        { label: "Chart.js Visualizations", desc: "Line, Bar, Doughnut, Radar, Pie, Polar Area charts", icon: "pie-chart", href: "#charts" },
        { label: "Lucide Icon Directory", desc: "Browse and copy 100+ SVG vector icons", icon: "feather", href: "#icons" },
        { label: "Alert Banners", desc: "Dismissible contextual notification banners", icon: "bell", href: "#notifications-alerts" },
        { label: "Modal Dialogs", desc: "Interactive centered, large, and confirmation modals", icon: "bell", href: "#notifications-modals" },
        { label: "Toast Notifications", desc: "Floating auto-dismiss toast dispatcher", icon: "bell", href: "#notifications-toasts" },
        { label: "Widgets Collection", desc: "Sparkline KPI cards, resource meters, profile widgets", icon: "calculator", href: "#widgets" },
        { label: "Kanban Task Board", desc: "Interactive sprint backlog, task stages, team assignees", icon: "trello", href: "#kanban" },
        { label: "E-Commerce Products", desc: "Catalog listings, inventory levels, SKU management", icon: "box", href: "#products" },
        { label: "Invoices & Billing", desc: "Client statements, printable invoices, payment records", icon: "file-text", href: "#invoices" },
        { label: "Cloud File Manager", desc: "AWS S3 bucket storage quota, media assets, downloads", icon: "folder", href: "#files" },
        { label: "Calendar & Schedule", desc: "Organization meetings, launches, webinars", icon: "calendar", href: "#calendar" },
        { label: "Users Management", desc: "Manage 20+ members, roles, statuses, and permissions", icon: "users", href: "#users" },
        { label: "Orders & Invoices", desc: "View real-time transactions, payment methods, CSV ledger", icon: "receipt", href: "#orders" },
        { label: "Reports & Exports", desc: "Download executive audits, SLA metrics, CSV digests", icon: "file-spreadsheet", href: "#reports" },
        { label: "UI Component Kit", desc: "Comprehensive component library showcase", icon: "layout", href: "#components" },
        { label: "Sign In Flow", desc: "Authentication sign in screen preview", icon: "log-in", href: "#auth-login" },
        { label: "Sign Up Flow", desc: "Registration form layout preview", icon: "user-plus", href: "#auth-register" },
        { label: "Forgot Password", desc: "Password recovery flow preview", icon: "key", href: "#auth-forgot" },
        { label: "Lock Screen", desc: "Screen locked pattern with PIN verification", icon: "lock", href: "#lock-screen" },
        { label: "Error 404 Page", desc: "Resource not found error layout", icon: "alert-octagon", href: "#404" },
        { label: "Error 500 Page", desc: "Internal server error layout with trace dump", icon: "alert-triangle", href: "#error-500" },
        { label: "System Settings", desc: "Profile details, preferences, security keys, appearance", icon: "settings", href: "#settings" },
        { label: "Help & Knowledge Base", desc: "Documentation, FAQs, shortcuts, and support tickets", icon: "help-circle", href: "#help" }
      ];

      pages.forEach(p => {
        if (!q || p.label.toLowerCase().includes(q) || p.desc.toLowerCase().includes(q)) {
          items.push({ ...p, type: "Navigation" });
        }
      });

      // Users
      if (q) {
        const users = DashData.getUsers();
        users.forEach(u => {
          if (u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q) || (u.department && u.department.toLowerCase().includes(q))) {
            items.push({
              label: `${u.name} (${u.role})`,
              desc: `${u.email} • ${u.department || 'Operations'}`,
              icon: "user",
              href: `#user-detail?id=${u.id}`,
              type: "User Profile"
            });
          }
        });

        // Orders
        const orders = DashData.getOrders();
        orders.forEach(o => {
          if (o.id.toLowerCase().includes(q) || o.customer.toLowerCase().includes(q) || o.company.toLowerCase().includes(q)) {
            items.push({
              label: `${o.id} - ${o.customer}`,
              desc: `$${o.amount.toFixed(2)} • ${o.status} • ${o.paymentMethod}`,
              icon: "shopping-bag",
              href: "#orders",
              type: "Transaction"
            });
          }
        });
      }

      if (items.length === 0) {
        resultsContainer.innerHTML = `
          <div class="py-8 text-center text-slate-400">
            <p>No results found for "${query}"</p>
          </div>
        `;
        return;
      }

      resultsContainer.innerHTML = items.map(item => `
        <a href="${item.href}" class="cmd-item flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors group cursor-pointer block">
          <div class="flex items-center gap-3">
            <div class="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-500 group-hover:bg-blue-600 group-hover:text-white transition-colors">
              <i data-lucide="${item.icon}" class="w-4 h-4"></i>
            </div>
            <div>
              <div class="font-semibold text-slate-900 dark:text-white">${item.label}</div>
              <div class="text-[11px] text-slate-400">${item.desc}</div>
            </div>
          </div>
          <span class="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-400">${item.type}</span>
        </a>
      `).join("");

      if (window.lucide) window.lucide.createIcons({ root: resultsContainer });

      // Click on result item
      resultsContainer.querySelectorAll(".cmd-item").forEach(a => {
        a.addEventListener("click", () => {
          close();
        });
      });
    }

    input.focus();
    populateResults();

    input.addEventListener("input", (e) => {
      populateResults(e.target.value);
    });
  }

  return { open };
})();

// Main Dashboard Router & Layout Controller
window.App = (function () {
  let isSidebarCollapsed = localStorage.getItem("sidebar-collapsed") === "true";

  function parseHashRoute() {
    const rawHash = window.location.hash.slice(1) || "dashboard";
    const [path, queryString] = rawHash.split("?");
    const params = {};

    if (queryString) {
      const searchParams = new URLSearchParams(queryString);
      for (const [key, value] of searchParams.entries()) {
        params[key] = value;
      }
    }

    return { path: path.toLowerCase(), params, full: rawHash };
  }

  function navigateTo(route) {
    window.location.hash = route;
  }

  function handleRoute() {
    const { path, params } = parseHashRoute();
    const container = document.getElementById("main-content-view");
    if (!container) return;

    // Update active nav links in sidebar
    updateNavActiveStates(path);

    // Scroll to top
    window.scrollTo({ top: 0, behavior: "instant" });

    // Close mobile drawer if open
    closeMobileSidebar();

    // Route dispatch
    switch (path) {
      case "dashboard":
      case "":
        document.title = "Overview • DashPulse Admin";
        DashboardPage.render(container);
        break;

      case "analytics":
        document.title = "Analytics • DashPulse Admin";
        AnalyticsPage.render(container);
        break;

      case "colors":
        document.title = "Theme Colors • DashPulse Admin";
        DemoThemePage.renderColors(container);
        break;

      case "typography":
        document.title = "Typography • DashPulse Admin";
        DemoThemePage.renderTypography(container);
        break;

      case "base-accordion":
        document.title = "Accordion & Collapse • DashPulse Admin";
        DemoBasePage.renderAccordion(container);
        break;

      case "base-cards":
        document.title = "Cards Layout • DashPulse Admin";
        DemoBasePage.renderCards(container);
        break;

      case "base-carousel":
        document.title = "Carousel Slider • DashPulse Admin";
        DemoBasePage.renderCarousel(container);
        break;

      case "base-pagination":
        document.title = "Pagination & Progress • DashPulse Admin";
        DemoBasePage.renderPagination(container);
        break;

      case "buttons":
        document.title = "Buttons • DashPulse Admin";
        DemoButtonsPage.render(container, "buttons");
        break;

      case "button-groups":
        document.title = "Button Groups • DashPulse Admin";
        DemoButtonsPage.render(container, "button-groups");
        break;

      case "dropdowns":
        document.title = "Dropdown Menus • DashPulse Admin";
        DemoButtonsPage.render(container, "dropdowns");
        break;

      case "forms":
        document.title = "Form Controls • DashPulse Admin";
        DemoFormsPage.render(container, "forms");
        break;

      case "form-select":
        document.title = "Select Menus • DashPulse Admin";
        DemoFormsPage.render(container, "form-select");
        break;

      case "form-checks":
        document.title = "Checks & Radios • DashPulse Admin";
        DemoFormsPage.render(container, "form-checks");
        break;

      case "form-validation":
        document.title = "Form Validation • DashPulse Admin";
        DemoFormsPage.render(container, "form-validation");
        break;

      case "charts":
        document.title = "Charts Gallery • DashPulse Admin";
        DemoChartsPage.render(container);
        break;

      case "icons":
        document.title = "Icons Library • DashPulse Admin";
        DemoIconsPage.render(container);
        break;

      case "notifications-alerts":
        document.title = "Alerts • DashPulse Admin";
        DemoNotificationsPage.render(container, "notifications-alerts");
        break;

      case "notifications-modals":
        document.title = "Modals • DashPulse Admin";
        DemoNotificationsPage.render(container, "notifications-modals");
        break;

      case "notifications-toasts":
        document.title = "Toasts • DashPulse Admin";
        DemoNotificationsPage.render(container, "notifications-toasts");
        break;

      case "widgets":
        document.title = "Widgets Collection • DashPulse Admin";
        DemoWidgetsPage.render(container);
        break;

      case "kanban":
        document.title = "Kanban Board • DashPulse Admin";
        KanbanPage.render(container);
        break;

      case "products":
        document.title = "Products Catalog • DashPulse Admin";
        EcommercePage.render(container);
        break;

      case "invoices":
        document.title = "Invoices & Statements • DashPulse Admin";
        InvoicesPage.render(container);
        break;

      case "files":
        document.title = "Cloud Storage • DashPulse Admin";
        FileManagerPage.render(container);
        break;

      case "calendar":
        document.title = "Schedule Calendar • DashPulse Admin";
        CalendarPage.render(container);
        break;

      case "users":
        document.title = "Users • DashPulse Admin";
        UsersPage.render(container);
        break;

      case "user-detail":
        document.title = "User Profile • DashPulse Admin";
        UserDetailPage.render(container, params);
        break;

      case "orders":
        document.title = "Orders & Invoices • DashPulse Admin";
        OrdersPage.render(container);
        break;

      case "reports":
        document.title = "Reports & Exports • DashPulse Admin";
        ReportsPage.render(container);
        break;

      case "components":
        document.title = "UI Component Kit • DashPulse Admin";
        ComponentsShowcasePage.render(container);
        break;

      case "auth-login":
        document.title = "Sign In • DashPulse Admin";
        AuthShowcasePage.render(container, "login");
        break;

      case "auth-register":
        document.title = "Sign Up • DashPulse Admin";
        AuthShowcasePage.render(container, "register");
        break;

      case "auth-forgot":
        document.title = "Password Recovery • DashPulse Admin";
        AuthShowcasePage.render(container, "forgot");
        break;

      case "lock-screen":
        document.title = "Session Locked • DashPulse Admin";
        AuthShowcasePage.render(container, "lock");
        break;

      case "404":
        document.title = "404 Not Found • DashPulse Admin";
        HelpPage.render404(container, "404");
        break;

      case "error-500":
        document.title = "500 Server Error • DashPulse Admin";
        DemoErrorsPage.render500(container);
        break;

      case "settings":
        document.title = "Settings • DashPulse Admin";
        SettingsPage.render(container);
        break;

      case "help":
        document.title = "Help & Documentation • DashPulse Admin";
        HelpPage.render(container);
        break;

      default:
        document.title = "404 Not Found • DashPulse Admin";
        HelpPage.render404(container, path);
        break;
    }

    if (window.lucide) window.lucide.createIcons();
  }

  function updateNavActiveStates(currentPath) {
    const navLinks = document.querySelectorAll(".nav-link-item");
    navLinks.forEach(link => {
      const href = link.getAttribute("href");
      if (!href) return;
      const targetPath = href.replace("#", "").split("?")[0].toLowerCase();
      const isActive = targetPath === currentPath || (targetPath === "users" && currentPath === "user-detail");

      const isSubItem = link.closest(".nav-group-items") !== null;

      if (isActive) {
        if (isSubItem) {
          link.className = "nav-link-item flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 transition-colors";
          // Expand parent group and rotate chevron
          const parentGroup = link.closest(".nav-group-items");
          if (parentGroup) {
            parentGroup.classList.remove("hidden");
            const parentToggle = parentGroup.parentElement ? parentGroup.parentElement.querySelector(".nav-chevron") : null;
            if (parentToggle) parentToggle.classList.add("rotate-180");
          }
        } else {
          link.className = "nav-link-item nav-item-active flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-colors";
        }
      } else {
        if (isSubItem) {
          link.className = "nav-link-item flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100/50 dark:hover:bg-slate-800/40 transition-colors";
        } else {
          link.className = "nav-link-item flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100/70 dark:hover:bg-slate-800/60 transition-colors";
        }
      }
    });
  }

  function initNavDropdowns() {
    document.querySelectorAll(".nav-dropdown-toggle").forEach(btn => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        const targetId = btn.getAttribute("data-target");
        const groupItems = document.getElementById(targetId);
        const chevron = btn.querySelector(".nav-chevron");
        if (groupItems) {
          const isClosed = groupItems.classList.contains("hidden");
          groupItems.classList.toggle("hidden", !isClosed);
          if (chevron) {
            chevron.classList.toggle("rotate-180", isClosed);
          }
        }
      });
    });
  }

  // Sidebar Collapse Controls
  function applySidebarState() {
    const sidebar = document.getElementById("sidebar");
    const brandText = document.getElementById("brand-text");
    const navTextElements = document.querySelectorAll(".nav-link-text");
    const sectionHeaders = document.querySelectorAll(".nav-section-title");

    if (!sidebar) return;

    if (isSidebarCollapsed) {
      sidebar.classList.remove("w-64");
      sidebar.classList.add("w-20");
      if (brandText) brandText.classList.add("hidden");
      navTextElements.forEach(el => el.classList.add("hidden"));
      sectionHeaders.forEach(el => el.classList.add("hidden"));
    } else {
      sidebar.classList.remove("w-20");
      sidebar.classList.add("w-64");
      if (brandText) brandText.classList.remove("hidden");
      navTextElements.forEach(el => el.classList.remove("hidden"));
      sectionHeaders.forEach(el => el.classList.remove("hidden"));
    }
  }

  function toggleSidebar() {
    isSidebarCollapsed = !isSidebarCollapsed;
    localStorage.setItem("sidebar-collapsed", isSidebarCollapsed);
    applySidebarState();
  }

  // Mobile Offcanvas Sidebar
  function openMobileSidebar() {
    const mobileDrawer = document.getElementById("mobile-sidebar-drawer");
    const backdrop = document.getElementById("mobile-sidebar-backdrop");
    if (mobileDrawer && backdrop) {
      mobileDrawer.classList.remove("-translate-x-full");
      backdrop.classList.remove("hidden");
    }
  }

  function closeMobileSidebar() {
    const mobileDrawer = document.getElementById("mobile-sidebar-drawer");
    const backdrop = document.getElementById("mobile-sidebar-backdrop");
    if (mobileDrawer && backdrop) {
      mobileDrawer.classList.add("-translate-x-full");
      backdrop.classList.add("hidden");
    }
  }

  // Notification Dropdown Manager
  function initNotificationsDropdown() {
    const btn = document.getElementById("notifications-menu-btn");
    const dropdown = document.getElementById("notifications-dropdown");
    const badge = document.getElementById("notifications-badge");
    const list = document.getElementById("notifications-list");
    const markAllBtn = document.getElementById("btn-mark-all-notifications-read");

    if (!btn || !dropdown) return;

    function refreshNotificationList() {
      const items = DashData.getNotifications();
      const unreadCount = DashData.getUnreadNotificationCount();

      if (badge) {
        if (unreadCount > 0) {
          badge.classList.remove("hidden");
          badge.textContent = unreadCount;
        } else {
          badge.classList.add("hidden");
        }
      }

      if (list) {
        list.innerHTML = items.map(n => `
          <div class="p-3 border-b border-slate-100 dark:border-slate-800/80 hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors flex items-start gap-3 cursor-pointer ${n.read ? 'opacity-60' : 'bg-blue-50/20 dark:bg-blue-950/20'}">
            <div class="p-2 rounded-xl mt-0.5 ${n.type === 'warning' ? 'bg-amber-100 text-amber-600 dark:bg-amber-950 dark:text-amber-400' : n.type === 'success' ? 'bg-emerald-100 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400' : 'bg-blue-100 text-blue-600 dark:bg-blue-950 dark:text-blue-400'}">
              <i data-lucide="${n.icon || 'bell'}" class="w-4 h-4"></i>
            </div>
            <div class="flex-1 min-w-0">
              <div class="text-xs font-semibold text-slate-900 dark:text-white flex items-center justify-between">
                <span>${n.title}</span>
                <span class="text-[10px] text-slate-400">${n.time}</span>
              </div>
              <p class="text-xs text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-2">${n.desc}</p>
            </div>
          </div>
        `).join("");

        if (window.lucide) window.lucide.createIcons({ root: list });
      }
    }

    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      dropdown.classList.toggle("hidden");
      refreshNotificationList();
    });

    if (markAllBtn) {
      markAllBtn.addEventListener("click", () => {
        DashData.markAllNotificationsRead();
        refreshNotificationList();
        DashComponents.showToast("All notifications marked as read", "info");
      });
    }

    document.addEventListener("click", (e) => {
      if (!dropdown.contains(e.target) && e.target !== btn) {
        dropdown.classList.add("hidden");
      }
    });

    refreshNotificationList();
  }

  // Profile Dropdown Manager
  function initProfileDropdown() {
    const btn = document.getElementById("user-profile-menu-btn");
    const dropdown = document.getElementById("user-profile-dropdown");
    if (!btn || !dropdown) return;

    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      dropdown.classList.toggle("hidden");
    });

    document.addEventListener("click", (e) => {
      if (!dropdown.contains(e.target) && e.target !== btn) {
        dropdown.classList.add("hidden");
      }
    });

    // Sign out action
    const signOutBtn = document.getElementById("btn-sign-out");
    if (signOutBtn) {
      signOutBtn.addEventListener("click", () => {
        dropdown.classList.add("hidden");
        DashComponents.confirmModal({
          title: "Sign Out",
          message: "Are you sure you want to log out of the admin console session?",
          confirmText: "Sign Out",
          confirmVariant: "danger",
          onConfirm: () => {
            DashComponents.showToast("Signed out. Session ended.", "info");
            setTimeout(() => {
              window.location.hash = "#dashboard";
            }, 600);
          }
        });
      });
    }
  }

  // Global Keyboard Shortcuts
  function initKeyboardShortcuts() {
    document.addEventListener("keydown", (e) => {
      const key = e.key ? e.key.toLowerCase() : "";

      // Ctrl + K or Cmd + K -> Command Palette
      if ((e.ctrlKey || e.metaKey) && key === "k") {
        e.preventDefault();
        CommandPalette.open();
      }

      // Ctrl + D -> Toggle Dark Mode
      if ((e.ctrlKey || e.metaKey) && key === "d") {
        e.preventDefault();
        AppTheme.toggle();
      }

      // Ctrl + B -> Toggle Sidebar Collapse
      if ((e.ctrlKey || e.metaKey) && key === "b") {
        e.preventDefault();
        toggleSidebar();
      }
    });
  }

  // App Initialization
  function init() {
    AppTheme.init();
    applySidebarState();
    initNavDropdowns();
    initNotificationsDropdown();
    initProfileDropdown();
    initKeyboardShortcuts();
    if (window.ThemeCustomizer && window.ThemeCustomizer.init) {
      window.ThemeCustomizer.init();
    }

    // Global Search Bar Trigger
    const globalSearchTrigger = document.getElementById("global-search-trigger");
    if (globalSearchTrigger) {
      globalSearchTrigger.addEventListener("click", () => {
        CommandPalette.open();
      });
    }

    // Sidebar collapse button
    const collapseBtn = document.getElementById("btn-sidebar-collapse");
    if (collapseBtn) {
      collapseBtn.addEventListener("click", toggleSidebar);
    }

    // Fullscreen toggle button
    const fullscreenBtn = document.getElementById("btn-toggle-fullscreen");
    if (fullscreenBtn) {
      fullscreenBtn.addEventListener("click", () => {
        if (!document.fullscreenElement) {
          document.documentElement.requestFullscreen().catch(() => {});
          DashComponents.showToast("Entered fullscreen mode", "info", 1500);
        } else {
          if (document.exitFullscreen) document.exitFullscreen().catch(() => {});
          DashComponents.showToast("Exited fullscreen mode", "info", 1500);
        }
      });
    }

    // Mobile Hamburger
    const mobileHamburger = document.getElementById("btn-mobile-hamburger");
    if (mobileHamburger) {
      mobileHamburger.addEventListener("click", openMobileSidebar);
    }

    // Mobile Backdrop
    const mobileBackdrop = document.getElementById("mobile-sidebar-backdrop");
    if (mobileBackdrop) {
      mobileBackdrop.addEventListener("click", closeMobileSidebar);
    }

    const mobileCloseBtn = document.getElementById("btn-close-mobile-sidebar");
    if (mobileCloseBtn) {
      mobileCloseBtn.addEventListener("click", closeMobileSidebar);
    }

    // Hash change event listener
    window.addEventListener("hashchange", handleRoute);

    // Initial route handling
    handleRoute();
  }

  return { init, navigateTo, toggleSidebar };
})();

// Document Ready Bootstrap
document.addEventListener("DOMContentLoaded", () => {
  App.init();
});
