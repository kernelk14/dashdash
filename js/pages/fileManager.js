/**
 * DashPulse Admin Dashboard Template
 * Page: Cloud Storage & File Manager
 */

window.FileManagerPage = (function () {
  let activeType = "all";
  let searchTerm = "";

  function render(container) {
    DashComponents.updateBreadcrumbs([
      { label: "Dashboard", href: "#dashboard" },
      { label: "Cloud File Manager", href: "#files" }
    ]);

    container.innerHTML = `
      <div class="space-y-6">
        <!-- Header -->
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 class="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">Cloud Storage & Assets</h1>
            <p class="text-sm text-slate-500 dark:text-slate-400 mt-1">Manage encrypted compliance reports, customer contracts, design assets, and database backups.</p>
          </div>
          <div class="flex items-center gap-3">
            <button id="btn-upload-file" type="button" class="inline-flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold shadow-sm transition-colors">
              <i data-lucide="upload-cloud" class="w-3.5 h-3.5"></i> Upload New File
            </button>
          </div>
        </div>

        <!-- Storage Capacity Breakdown Card -->
        <div class="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 shadow-sm p-6 space-y-4">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h2 class="text-sm font-bold text-slate-900 dark:text-white">Workspace Storage Quota</h2>
              <p class="text-xs text-slate-500">Tier: 100 GB Dedicated AWS S3 Multi-Region Bucket</p>
            </div>
            <div class="text-right">
              <span class="text-sm font-bold text-slate-900 dark:text-white font-mono">42.8 GB</span>
              <span class="text-xs text-slate-400">/ 100 GB (42.8% used)</span>
            </div>
          </div>

          <div class="w-full h-3 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden flex">
            <div class="bg-blue-600 h-full" style="width: 24%" title="Documents & PDFs: 24 GB"></div>
            <div class="bg-purple-600 h-full" style="width: 10%" title="Design & Archives: 10 GB"></div>
            <div class="bg-emerald-500 h-full" style="width: 6%" title="Data Spreadsheets: 6 GB"></div>
            <div class="bg-amber-500 h-full" style="width: 2.8%" title="Source Code: 2.8 GB"></div>
          </div>

          <div class="flex flex-wrap items-center gap-6 text-xs text-slate-500">
            <span class="flex items-center gap-1.5"><span class="w-2 h-2 rounded-full bg-blue-600"></span> Documents (24 GB)</span>
            <span class="flex items-center gap-1.5"><span class="w-2 h-2 rounded-full bg-purple-600"></span> Archives (10 GB)</span>
            <span class="flex items-center gap-1.5"><span class="w-2 h-2 rounded-full bg-emerald-500"></span> Spreadsheets (6 GB)</span>
            <span class="flex items-center gap-1.5"><span class="w-2 h-2 rounded-full bg-amber-500"></span> Code (2.8 GB)</span>
          </div>
        </div>

        <!-- Filter Toolbar -->
        <div class="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 shadow-sm p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div class="flex flex-wrap items-center gap-2">
            <button type="button" data-type="all" class="file-type-btn px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${activeType === 'all' ? 'bg-blue-50 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400 font-semibold' : 'text-slate-600 dark:text-slate-400'}">All Files</button>
            <button type="button" data-type="pdf" class="file-type-btn px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${activeType === 'pdf' ? 'bg-blue-50 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400 font-semibold' : 'text-slate-600 dark:text-slate-400'}">PDFs</button>
            <button type="button" data-type="sheet" class="file-type-btn px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${activeType === 'sheet' ? 'bg-blue-50 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400 font-semibold' : 'text-slate-600 dark:text-slate-400'}">Sheets</button>
            <button type="button" data-type="archive" class="file-type-btn px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${activeType === 'archive' ? 'bg-blue-50 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400 font-semibold' : 'text-slate-600 dark:text-slate-400'}">Archives</button>
            <button type="button" data-type="image" class="file-type-btn px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${activeType === 'image' ? 'bg-blue-50 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400 font-semibold' : 'text-slate-600 dark:text-slate-400'}">Images</button>
            <button type="button" data-type="code" class="file-type-btn px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${activeType === 'code' ? 'bg-blue-50 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400 font-semibold' : 'text-slate-600 dark:text-slate-400'}">Code</button>
          </div>

          <div class="relative w-full sm:w-64">
            <i data-lucide="search" class="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"></i>
            <input id="file-search-input" type="text" placeholder="Search filenames..." value="${searchTerm}" class="w-full pl-9 pr-4 py-2 text-xs bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-500">
          </div>
        </div>

        <!-- Files Grid -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" id="files-grid">
          <!-- Populated dynamically -->
        </div>
      </div>

      <!-- Upload Modal Mount -->
      <div id="file-upload-modal-root"></div>
    `;

    if (window.lucide) window.lucide.createIcons({ root: container });

    renderFilesList();
    bindEvents(container);
  }

  function getFilteredFiles() {
    let list = DashData.getFiles();

    if (activeType !== "all") {
      list = list.filter(f => f.type === activeType);
    }

    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      list = list.filter(f => f.name.toLowerCase().includes(q) || f.owner.toLowerCase().includes(q));
    }

    return list;
  }

  function renderFilesList() {
    const grid = document.getElementById("files-grid");
    if (!grid) return;

    const files = getFilteredFiles();

    if (files.length === 0) {
      grid.innerHTML = `
        <div class="col-span-full py-12 text-center text-slate-400">
          No files match your filter.
        </div>
      `;
      return;
    }

    grid.innerHTML = files.map(f => {
      let icon = "file-text";
      let iconColor = "text-blue-600 bg-blue-50 dark:bg-blue-950/60 dark:text-blue-400";

      if (f.type === "pdf") {
        icon = "file";
        iconColor = "text-rose-600 bg-rose-50 dark:bg-rose-950/60 dark:text-rose-400";
      } else if (f.type === "sheet") {
        icon = "file-spreadsheet";
        iconColor = "text-emerald-600 bg-emerald-50 dark:bg-emerald-950/60 dark:text-emerald-400";
      } else if (f.type === "archive") {
        icon = "archive";
        iconColor = "text-purple-600 bg-purple-50 dark:bg-purple-950/60 dark:text-purple-400";
      } else if (f.type === "image") {
        icon = "image";
        iconColor = "text-amber-600 bg-amber-50 dark:bg-amber-950/60 dark:text-amber-400";
      } else if (f.type === "code") {
        icon = "code-2";
        iconColor = "text-cyan-600 bg-cyan-50 dark:bg-cyan-950/60 dark:text-cyan-400";
      }

      return `
        <div class="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 shadow-sm p-5 space-y-4 hover:shadow-md transition-all flex flex-col justify-between">
          <div class="flex items-start gap-3">
            <div class="p-3 rounded-2xl ${iconColor} flex-shrink-0">
              <i data-lucide="${icon}" class="w-6 h-6"></i>
            </div>
            <div class="min-w-0 flex-1">
              <h3 class="text-xs font-bold text-slate-900 dark:text-white truncate" title="${f.name}">${f.name}</h3>
              <div class="text-[11px] text-slate-400 mt-1 flex items-center gap-2">
                <span class="font-mono font-medium">${f.size}</span>
                <span>•</span>
                <span>${f.modified}</span>
              </div>
            </div>
          </div>

          <div class="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
            <span class="text-[11px] text-slate-400">By ${f.owner}</span>
            <div class="flex items-center gap-1">
              <button type="button" data-dl-file="${f.id}" data-fname="${f.name}" class="btn-file-dl p-1.5 text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 rounded-md" title="Download">
                <i data-lucide="download" class="w-4 h-4"></i>
              </button>
              <button type="button" data-del-file="${f.id}" data-fname="${f.name}" class="btn-file-del p-1.5 text-slate-400 hover:text-rose-600 rounded-md" title="Delete">
                <i data-lucide="trash-2" class="w-4 h-4"></i>
              </button>
            </div>
          </div>
        </div>
      `;
    }).join("");

    if (window.lucide) window.lucide.createIcons({ root: grid });

    // Download simulated
    grid.querySelectorAll(".btn-file-dl").forEach(btn => {
      btn.addEventListener("click", () => {
        const fname = btn.dataset.fname;
        DashComponents.showToast(`Downloading ${fname}...`, "info");
      });
    });

    // Delete file
    grid.querySelectorAll(".btn-file-del").forEach(btn => {
      btn.addEventListener("click", () => {
        const id = btn.dataset.delFile;
        const fname = btn.dataset.fname;
        DashComponents.confirmModal({
          title: `Delete File: ${fname}`,
          message: "Are you sure you want to permanently delete this cloud file?",
          confirmText: "Delete",
          confirmVariant: "danger",
          onConfirm: () => {
            DashData.deleteFile(id);
            DashComponents.showToast(`Deleted ${fname}`, "success");
            renderFilesList();
          }
        });
      });
    });
  }

  function bindEvents(container) {
    container.querySelectorAll(".file-type-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        activeType = btn.dataset.type;
        container.querySelectorAll(".file-type-btn").forEach(b => {
          b.className = "file-type-btn px-3 py-1.5 rounded-lg text-xs font-medium transition-colors text-slate-600 dark:text-slate-400";
        });
        btn.className = "file-type-btn px-3 py-1.5 rounded-lg text-xs font-medium transition-colors bg-blue-50 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400 font-semibold";
        renderFilesList();
      });
    });

    const searchIn = document.getElementById("file-search-input");
    if (searchIn) {
      searchIn.addEventListener("input", (e) => {
        searchTerm = e.target.value;
        renderFilesList();
      });
    }

    document.getElementById("btn-upload-file")?.addEventListener("click", () => {
      openUploadModal();
    });
  }

  function openUploadModal() {
    const root = document.getElementById("file-upload-modal-root");
    if (!root) return;

    root.innerHTML = `
      <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm" id="up-backdrop">
        <div class="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 max-w-md w-full p-6 modal-content space-y-4">
          <div class="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
            <h3 class="text-base font-bold text-slate-900 dark:text-white">Upload Files to Bucket</h3>
            <button type="button" id="up-close" class="text-slate-400 hover:text-slate-600 p-1">
              <i data-lucide="x" class="w-4 h-4"></i>
            </button>
          </div>

          <div class="border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-2xl p-6 text-center space-y-2 cursor-pointer hover:border-blue-500 transition-colors bg-slate-50 dark:bg-slate-800/40" id="drop-zone">
            <div class="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 mx-auto flex items-center justify-center">
              <i data-lucide="upload-cloud" class="w-6 h-6"></i>
            </div>
            <div class="text-xs font-semibold text-slate-900 dark:text-white">Click to browse or drag & drop files</div>
            <p class="text-[11px] text-slate-400">PDF, ZIP, YAML, PNG up to 50MB</p>
          </div>

          <div class="flex items-center justify-end gap-3 pt-3 border-t border-slate-100 dark:border-slate-800">
            <button type="button" id="up-cancel" class="px-4 py-2 text-xs text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 rounded-lg">
              Cancel
            </button>
            <button type="button" id="up-simulate-btn" class="px-5 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm">
              Simulate Upload
            </button>
          </div>
        </div>
      </div>
    `;

    if (window.lucide) window.lucide.createIcons({ root: root });

    const close = () => { root.innerHTML = ""; };
    document.getElementById("up-close").addEventListener("click", close);
    document.getElementById("up-cancel").addEventListener("click", close);
    document.getElementById("up-backdrop").addEventListener("click", (e) => {
      if (e.target.id === "up-backdrop") close();
    });

    document.getElementById("up-simulate-btn").addEventListener("click", () => {
      DashData.addFile({
        name: `Dataset_Export_${Math.floor(100 + Math.random() * 900)}.pdf`,
        size: "3.4 MB",
        type: "pdf"
      });
      DashComponents.showToast("File uploaded successfully to cloud bucket!", "success");
      close();
      renderFilesList();
    });
  }

  return { render };
})();
