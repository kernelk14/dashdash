/**
 * DashPulse Admin Dashboard Template
 * Page: Buttons & Dropdowns Showcase (CoreUI Inspired)
 */

window.DemoButtonsPage = (function () {
  function render(container, subview = "buttons") {
    DashComponents.updateBreadcrumbs([
      { label: "Components", href: "#buttons" },
      { label: "Buttons", href: `#${subview}` },
      { label: subview.replace("-", " ").replace(/\b\w/g, l => l.toUpperCase()), href: `#${subview}` }
    ]);

    const activeButtons = subview === "buttons" ? "border-blue-600 text-blue-600 dark:text-blue-400" : "border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300";
    const activeGroups = subview === "button-groups" ? "border-blue-600 text-blue-600 dark:text-blue-400" : "border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300";
    const activeDropdowns = subview === "dropdowns" ? "border-blue-600 text-blue-600 dark:text-blue-400" : "border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300";

    container.innerHTML = `
      <div class="space-y-6">
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 class="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">Buttons & Interactive Triggers</h1>
            <p class="text-sm text-slate-500 dark:text-slate-400 mt-1">Full library of solid, outline, group, icon, and split dropdown button variants.</p>
          </div>
          <div class="flex border-b border-slate-200 dark:border-slate-800 space-x-4">
            <a href="#buttons" class="py-2 px-1 border-b-2 font-medium text-xs transition-colors ${activeButtons}">Standard Buttons</a>
            <a href="#button-groups" class="py-2 px-1 border-b-2 font-medium text-xs transition-colors ${activeGroups}">Button Groups</a>
            <a href="#dropdowns" class="py-2 px-1 border-b-2 font-medium text-xs transition-colors ${activeDropdowns}">Dropdown Menus</a>
          </div>
        </div>

        <div id="btn-content-slot" class="space-y-6">
          ${renderSubviewContent(subview)}
        </div>
      </div>
    `;

    if (window.lucide) window.lucide.createIcons();
    initInteractions(container);
  }

  function renderSubviewContent(subview) {
    if (subview === "button-groups") {
      return `
        <!-- Button Groups -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div class="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 shadow-sm p-6 space-y-4">
            <h3 class="text-sm font-bold text-slate-900 dark:text-white">Basic Button Group</h3>
            <p class="text-xs text-slate-500">Group multiple buttons horizontally with joined borders.</p>
            <div class="inline-flex rounded-xl shadow-xs" role="group">
              <button type="button" class="demo-btn-action px-4 py-2 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-l-xl hover:bg-slate-50 dark:hover:bg-slate-700" data-msg="Left button clicked">Left</button>
              <button type="button" class="demo-btn-action px-4 py-2 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 border-t border-b border-r border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700" data-msg="Middle button clicked">Middle</button>
              <button type="button" class="demo-btn-action px-4 py-2 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 border-t border-b border-r border-slate-200 dark:border-slate-700 rounded-r-xl hover:bg-slate-50 dark:hover:bg-slate-700" data-msg="Right button clicked">Right</button>
            </div>
          </div>

          <div class="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 shadow-sm p-6 space-y-4">
            <h3 class="text-sm font-bold text-slate-900 dark:text-white">Toolbar Button Group</h3>
            <p class="text-xs text-slate-500">Combine multiple groups into an editor or filter toolbar.</p>
            <div class="flex flex-wrap items-center gap-3">
              <div class="inline-flex rounded-xl shadow-xs">
                <button type="button" class="demo-btn-action px-3 py-2 text-xs font-semibold bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-l-xl text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700" data-msg="Bold applied"><i data-lucide="bold" class="w-3.5 h-3.5"></i></button>
                <button type="button" class="demo-btn-action px-3 py-2 text-xs font-semibold bg-white dark:bg-slate-800 border-t border-b border-r border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700" data-msg="Italic applied"><i data-lucide="italic" class="w-3.5 h-3.5"></i></button>
                <button type="button" class="demo-btn-action px-3 py-2 text-xs font-semibold bg-white dark:bg-slate-800 border-t border-b border-r border-slate-200 dark:border-slate-700 rounded-r-xl text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700" data-msg="Underline applied"><i data-lucide="underline" class="w-3.5 h-3.5"></i></button>
              </div>
              <div class="inline-flex rounded-xl shadow-xs">
                <button type="button" class="demo-btn-action px-3 py-2 text-xs font-semibold bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-l-xl text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700" data-msg="Align left"><i data-lucide="align-left" class="w-3.5 h-3.5"></i></button>
                <button type="button" class="demo-btn-action px-3 py-2 text-xs font-semibold bg-white dark:bg-slate-800 border-t border-b border-r border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700" data-msg="Align center"><i data-lucide="align-center" class="w-3.5 h-3.5"></i></button>
                <button type="button" class="demo-btn-action px-3 py-2 text-xs font-semibold bg-white dark:bg-slate-800 border-t border-b border-r border-slate-200 dark:border-slate-700 rounded-r-xl text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700" data-msg="Align right"><i data-lucide="align-right" class="w-3.5 h-3.5"></i></button>
              </div>
            </div>
          </div>

          <div class="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 shadow-sm p-6 space-y-4">
            <h3 class="text-sm font-bold text-slate-900 dark:text-white">Segmented View Toggle</h3>
            <p class="text-xs text-slate-500">Radio-style single select group with active state highlight.</p>
            <div class="inline-flex p-1 bg-slate-100 dark:bg-slate-800 rounded-xl" id="seg-group">
              <button type="button" class="seg-btn active px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs">Day</button>
              <button type="button" class="seg-btn px-3.5 py-1.5 text-xs font-medium rounded-lg text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white">Week</button>
              <button type="button" class="seg-btn px-3.5 py-1.5 text-xs font-medium rounded-lg text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white">Month</button>
              <button type="button" class="seg-btn px-3.5 py-1.5 text-xs font-medium rounded-lg text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white">Year</button>
            </div>
          </div>

          <div class="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 shadow-sm p-6 space-y-4">
            <h3 class="text-sm font-bold text-slate-900 dark:text-white">Vertical Button Group</h3>
            <p class="text-xs text-slate-500">Stacked button group for drawer panels or toolboxes.</p>
            <div class="inline-flex flex-col rounded-xl shadow-xs w-48" role="group">
              <button type="button" class="demo-btn-action px-4 py-2 text-left text-xs font-semibold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-t-xl hover:bg-slate-50 dark:hover:bg-slate-700 flex items-center justify-between" data-msg="Overview opened">
                <span>Overview</span>
                <i data-lucide="chevron-right" class="w-3.5 h-3.5 text-slate-400"></i>
              </button>
              <button type="button" class="demo-btn-action px-4 py-2 text-left text-xs font-semibold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 border-l border-r border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 flex items-center justify-between" data-msg="Security settings opened">
                <span>Security</span>
                <i data-lucide="chevron-right" class="w-3.5 h-3.5 text-slate-400"></i>
              </button>
              <button type="button" class="demo-btn-action px-4 py-2 text-left text-xs font-semibold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 border-l border-r border-b border-slate-200 dark:border-slate-700 rounded-b-xl hover:bg-slate-50 dark:hover:bg-slate-700 flex items-center justify-between" data-msg="Audit log opened">
                <span>Audit Logs</span>
                <i data-lucide="chevron-right" class="w-3.5 h-3.5 text-slate-400"></i>
              </button>
            </div>
          </div>
        </div>
      `;
    }

    if (subview === "dropdowns") {
      return `
        <!-- Dropdown Menus -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <!-- Standard Dropdown -->
          <div class="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 shadow-sm p-6 space-y-4">
            <h3 class="text-sm font-bold text-slate-900 dark:text-white">Basic Dropdown</h3>
            <p class="text-xs text-slate-500">Toggleable menu with links and actions.</p>
            <div class="relative inline-block text-left demo-dropdown-wrap">
              <button type="button" class="demo-dropdown-btn inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-sm transition-colors">
                <span>Dropdown Button</span>
                <i data-lucide="chevron-down" class="w-3.5 h-3.5"></i>
              </button>
              <div class="demo-dropdown-menu hidden absolute left-0 mt-2 w-48 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xl py-1 z-20">
                <a href="javascript:void(0)" class="dropdown-item flex items-center gap-2 px-4 py-2 text-xs text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700/60"><i data-lucide="eye" class="w-3.5 h-3.5 text-slate-400"></i> View Record</a>
                <a href="javascript:void(0)" class="dropdown-item flex items-center gap-2 px-4 py-2 text-xs text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700/60"><i data-lucide="edit-3" class="w-3.5 h-3.5 text-slate-400"></i> Edit Details</a>
                <div class="my-1 border-t border-slate-100 dark:border-slate-700"></div>
                <a href="javascript:void(0)" class="dropdown-item flex items-center gap-2 px-4 py-2 text-xs text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-900/20"><i data-lucide="trash-2" class="w-3.5 h-3.5"></i> Remove</a>
              </div>
            </div>
          </div>

          <!-- Split Button Dropdown -->
          <div class="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 shadow-sm p-6 space-y-4">
            <h3 class="text-sm font-bold text-slate-900 dark:text-white">Split Dropdown</h3>
            <p class="text-xs text-slate-500">Primary action accompanied by secondary dropdown trigger.</p>
            <div class="relative inline-flex rounded-xl shadow-sm demo-dropdown-wrap">
              <button type="button" class="demo-btn-action px-4 py-2.5 rounded-l-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold transition-colors" data-msg="Direct Save Triggered!">Save Changes</button>
              <button type="button" class="demo-dropdown-btn px-2.5 py-2.5 rounded-r-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs border-l border-emerald-500/50 transition-colors">
                <i data-lucide="chevron-down" class="w-3.5 h-3.5"></i>
              </button>
              <div class="demo-dropdown-menu hidden absolute right-0 top-full mt-2 w-48 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xl py-1 z-20">
                <a href="javascript:void(0)" class="dropdown-item flex items-center gap-2 px-4 py-2 text-xs text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700/60"><i data-lucide="save" class="w-3.5 h-3.5 text-slate-400"></i> Save as Draft</a>
                <a href="javascript:void(0)" class="dropdown-item flex items-center gap-2 px-4 py-2 text-xs text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700/60"><i data-lucide="copy" class="w-3.5 h-3.5 text-slate-400"></i> Save & Duplicate</a>
                <a href="javascript:void(0)" class="dropdown-item flex items-center gap-2 px-4 py-2 text-xs text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700/60"><i data-lucide="send" class="w-3.5 h-3.5 text-slate-400"></i> Save & Publish</a>
              </div>
            </div>
          </div>

          <!-- Header & Divider Dropdown -->
          <div class="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 shadow-sm p-6 space-y-4">
            <h3 class="text-sm font-bold text-slate-900 dark:text-white">With Headers & Badges</h3>
            <p class="text-xs text-slate-500">Grouped dropdown items with section badges.</p>
            <div class="relative inline-block text-left demo-dropdown-wrap">
              <button type="button" class="demo-dropdown-btn inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 text-xs font-semibold shadow-sm hover:opacity-90 transition-opacity">
                <span>Account Options</span>
                <i data-lucide="chevron-down" class="w-3.5 h-3.5"></i>
              </button>
              <div class="demo-dropdown-menu hidden absolute left-0 mt-2 w-56 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xl py-2 z-20">
                <div class="px-4 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">Billing & Plan</div>
                <a href="javascript:void(0)" class="dropdown-item flex items-center justify-between px-4 py-2 text-xs text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700/60">
                  <span>Pro Workspace</span>
                  <span class="px-1.5 py-0.5 rounded text-[10px] font-bold bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400">ACTIVE</span>
                </a>
                <a href="javascript:void(0)" class="dropdown-item flex items-center justify-between px-4 py-2 text-xs text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700/60">
                  <span>Seat Allocation</span>
                  <span class="text-slate-400 text-[11px]">8/10</span>
                </a>
                <div class="my-1 border-t border-slate-100 dark:border-slate-700"></div>
                <div class="px-4 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">Session</div>
                <a href="javascript:void(0)" class="dropdown-item flex items-center gap-2 px-4 py-2 text-xs text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700/60"><i data-lucide="shield" class="w-3.5 h-3.5 text-slate-400"></i> Audit Logs</a>
              </div>
            </div>
          </div>
        </div>
      `;
    }

    // Default: 'buttons'
    return `
      <!-- Contextual Solid Buttons -->
      <div class="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 shadow-sm p-6 space-y-4">
        <div>
          <h3 class="text-sm font-bold text-slate-900 dark:text-white">Contextual Solid Buttons</h3>
          <p class="text-xs text-slate-500">Filled button variants for various semantic priorities.</p>
        </div>
        <div class="flex flex-wrap gap-3">
          <button type="button" class="demo-btn-action px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-xs transition-colors" data-msg="Primary button clicked">Primary</button>
          <button type="button" class="demo-btn-action px-4 py-2 rounded-xl bg-slate-600 hover:bg-slate-700 text-white text-xs font-semibold shadow-xs transition-colors" data-msg="Secondary button clicked">Secondary</button>
          <button type="button" class="demo-btn-action px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-xs transition-colors" data-msg="Success button clicked">Success</button>
          <button type="button" class="demo-btn-action px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold shadow-xs transition-colors" data-msg="Danger button clicked">Danger</button>
          <button type="button" class="demo-btn-action px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-semibold shadow-xs transition-colors" data-msg="Warning button clicked">Warning</button>
          <button type="button" class="demo-btn-action px-4 py-2 rounded-xl bg-sky-500 hover:bg-sky-600 text-white text-xs font-semibold shadow-xs transition-colors" data-msg="Info button clicked">Info</button>
          <button type="button" class="demo-btn-action px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold shadow-xs transition-colors" data-msg="Light button clicked">Light</button>
          <button type="button" class="demo-btn-action px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold shadow-xs transition-colors" data-msg="Dark button clicked">Dark</button>
          <button type="button" disabled class="px-4 py-2 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-400 dark:text-slate-600 text-xs font-semibold cursor-not-allowed">Disabled</button>
        </div>
      </div>

      <!-- Outline Buttons -->
      <div class="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 shadow-sm p-6 space-y-4">
        <div>
          <h3 class="text-sm font-bold text-slate-900 dark:text-white">Outline Buttons</h3>
          <p class="text-xs text-slate-500">Subtle border variants for secondary UI actions.</p>
        </div>
        <div class="flex flex-wrap gap-3">
          <button type="button" class="demo-btn-action px-4 py-2 rounded-xl border border-blue-600 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 text-xs font-semibold transition-colors" data-msg="Outline Primary clicked">Primary</button>
          <button type="button" class="demo-btn-action px-4 py-2 rounded-xl border border-slate-400 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 text-xs font-semibold transition-colors" data-msg="Outline Secondary clicked">Secondary</button>
          <button type="button" class="demo-btn-action px-4 py-2 rounded-xl border border-emerald-600 text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 text-xs font-semibold transition-colors" data-msg="Outline Success clicked">Success</button>
          <button type="button" class="demo-btn-action px-4 py-2 rounded-xl border border-rose-600 text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-900/20 text-xs font-semibold transition-colors" data-msg="Outline Danger clicked">Danger</button>
          <button type="button" class="demo-btn-action px-4 py-2 rounded-xl border border-amber-500 text-amber-500 hover:bg-amber-50 dark:hover:bg-amber-900/20 text-xs font-semibold transition-colors" data-msg="Outline Warning clicked">Warning</button>
          <button type="button" class="demo-btn-action px-4 py-2 rounded-xl border border-sky-500 text-sky-500 hover:bg-sky-50 dark:hover:bg-sky-900/20 text-xs font-semibold transition-colors" data-msg="Outline Info clicked">Info</button>
          <button type="button" class="demo-btn-action px-4 py-2 rounded-xl border border-slate-800 dark:border-slate-200 text-slate-800 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-semibold transition-colors" data-msg="Outline Dark clicked">Dark</button>
        </div>
      </div>

      <!-- Sizes & Icons -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 shadow-sm p-6 space-y-4">
          <h3 class="text-sm font-bold text-slate-900 dark:text-white">Button Sizing</h3>
          <p class="text-xs text-slate-500">Standardized scale variants (sm, md, lg).</p>
          <div class="flex items-center gap-3">
            <button type="button" class="demo-btn-action px-3 py-1.5 rounded-lg bg-blue-600 text-white text-[11px] font-semibold hover:bg-blue-700" data-msg="Small button">Small</button>
            <button type="button" class="demo-btn-action px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-semibold hover:bg-blue-700" data-msg="Medium button">Medium (Default)</button>
            <button type="button" class="demo-btn-action px-5 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700" data-msg="Large button">Large</button>
          </div>
        </div>

        <div class="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 shadow-sm p-6 space-y-4">
          <h3 class="text-sm font-bold text-slate-900 dark:text-white">Icons & Spinners</h3>
          <p class="text-xs text-slate-500">Buttons with vector icons and loading spinners.</p>
          <div class="flex flex-wrap items-center gap-3">
            <button type="button" class="demo-btn-action inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-semibold hover:bg-blue-700" data-msg="Cloud sync triggered">
              <i data-lucide="cloud-download" class="w-3.5 h-3.5"></i>
              <span>Download</span>
            </button>
            <button type="button" class="demo-btn-action inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 text-white text-xs font-semibold hover:bg-emerald-700" data-msg="Task approved">
              <i data-lucide="check" class="w-3.5 h-3.5"></i>
              <span>Approve</span>
            </button>
            <button type="button" class="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 text-white text-xs font-semibold opacity-90 cursor-wait">
              <div class="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Processing...</span>
            </button>
          </div>
        </div>
      </div>
    `;
  }

  function initInteractions(container) {
    // Demo button actions
    container.querySelectorAll(".demo-btn-action").forEach(btn => {
      btn.addEventListener("click", () => {
        const msg = btn.getAttribute("data-msg") || "Button clicked";
        DashComponents.showToast(msg, "info");
      });
    });

    // Segmented toggle
    const segGroup = container.querySelector("#seg-group");
    if (segGroup) {
      segGroup.querySelectorAll(".seg-btn").forEach(btn => {
        btn.addEventListener("click", () => {
          segGroup.querySelectorAll(".seg-btn").forEach(b => {
            b.className = "seg-btn px-3.5 py-1.5 text-xs font-medium rounded-lg text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white";
          });
          btn.className = "seg-btn active px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs";
          DashComponents.showToast(`Selected range: ${btn.textContent.trim()}`, "success");
        });
      });
    }

    // Dropdown toggles
    container.querySelectorAll(".demo-dropdown-wrap").forEach(wrap => {
      const btn = wrap.querySelector(".demo-dropdown-btn");
      const menu = wrap.querySelector(".demo-dropdown-menu");
      if (!btn || !menu) return;

      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        // Close other dropdowns
        document.querySelectorAll(".demo-dropdown-menu").forEach(m => {
          if (m !== menu) m.classList.add("hidden");
        });
        menu.classList.toggle("hidden");
      });

      menu.querySelectorAll(".dropdown-item").forEach(item => {
        item.addEventListener("click", (e) => {
          e.preventDefault();
          menu.classList.add("hidden");
          DashComponents.showToast(`Action: ${item.textContent.trim()}`, "success");
        });
      });
    });

    document.addEventListener("click", () => {
      document.querySelectorAll(".demo-dropdown-menu").forEach(m => m.classList.add("hidden"));
    }, { once: true });
  }

  return {
    render
  };
})();
