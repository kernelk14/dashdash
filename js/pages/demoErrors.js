/**
 * DashPulse Admin Dashboard Template
 * Page: Error Pages (500 Internal Server Error & 404 Not Found - CoreUI Inspired)
 */

window.DemoErrorsPage = (function () {
  function render500(container) {
    DashComponents.updateBreadcrumbs([
      { label: "Pages", href: "#error-500" },
      { label: "500 Error", href: "#error-500" }
    ]);

    container.innerHTML = `
      <div class="min-h-[70vh] flex items-center justify-center p-4">
        <div class="max-w-lg w-full text-center space-y-6">
          <div class="inline-flex items-center justify-center w-24 h-24 rounded-3xl bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 shadow-inner">
            <span class="text-4xl font-extrabold font-mono">500</span>
          </div>

          <div class="space-y-2">
            <h1 class="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">Houston, we have a problem!</h1>
            <p class="text-xs text-slate-500 dark:text-slate-400 max-w-md mx-auto leading-relaxed">
              The page you are looking for is temporarily unavailable due to an unexpected upstream server exception.
            </p>
          </div>

          <div class="max-w-md mx-auto">
            <div class="relative">
              <input type="text" placeholder="What are you looking for?" class="w-full pl-4 pr-24 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition-all">
              <button type="button" class="absolute right-1.5 top-1.5 bottom-1.5 px-4 bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5">
                <i data-lucide="search" class="w-3.5 h-3.5"></i>
                <span>Search</span>
              </button>
            </div>
          </div>

          <!-- Stack Trace Accordion -->
          <div class="text-left bg-slate-900 text-slate-200 rounded-2xl p-4 font-mono text-[11px] overflow-x-auto shadow-md border border-slate-800">
            <div class="flex items-center justify-between text-slate-400 mb-2 pb-2 border-b border-slate-800 text-[10px]">
              <span>EXCEPTION_TRACE_DUMP</span>
              <span class="text-rose-400">SIGSEGV_NULL_REF</span>
            </div>
            <code>
              Error: ConnectionRefusedError: dial tcp 10.0.4.12:5432: i/o timeout<br>
              &nbsp;&nbsp;at PGCluster.connect (/usr/src/app/db/pool.go:142)<br>
              &nbsp;&nbsp;at Handler.ServeHTTP (/usr/src/app/router/api.go:88)<br>
              &nbsp;&nbsp;at runtime.goexit (/usr/local/go/src/runtime/asm_amd64.s:1594)
            </code>
          </div>

          <div class="pt-2 flex items-center justify-center gap-3">
            <a href="#dashboard" class="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-xs transition-colors flex items-center gap-2">
              <i data-lucide="home" class="w-3.5 h-3.5"></i>
              <span>Back to Dashboard</span>
            </a>
            <button type="button" id="retry-server-btn" class="px-5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 text-xs font-semibold transition-colors flex items-center gap-2">
              <i data-lucide="refresh-cw" class="w-3.5 h-3.5"></i>
              <span>Retry Connection</span>
            </button>
          </div>
        </div>
      </div>
    `;

    if (window.lucide) window.lucide.createIcons();

    const retryBtn = container.querySelector("#retry-server-btn");
    if (retryBtn) {
      retryBtn.addEventListener("click", () => {
        DashComponents.showToast("Pinging gateway health probe... Response: HTTP 200 OK", "success");
        setTimeout(() => {
          window.location.hash = "#dashboard";
        }, 1200);
      });
    }
  }

  return {
    render500
  };
})();
