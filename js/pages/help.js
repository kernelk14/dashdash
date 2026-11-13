/**
 * DashPulse Admin Dashboard Template
 * Page: Help Center & 404 Not Found
 */

window.HelpPage = (function () {
  function render(container) {
    DashComponents.updateBreadcrumbs([
      { label: "Dashboard", href: "#dashboard" },
      { label: "Help & Documentation", href: "#help" }
    ]);

    container.innerHTML = `
      <div class="space-y-6">
        <!-- Header -->
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 class="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">Help & Knowledge Base</h1>
            <p class="text-sm text-slate-500 dark:text-slate-400 mt-1">Template documentation, keyboard shortcuts, FAQ, and platform support.</p>
          </div>
          <button id="btn-open-ticket" type="button" class="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold shadow-sm transition-colors">
            <i data-lucide="message-square" class="w-4 h-4"></i>
            Submit Support Ticket
          </button>
        </div>

        <!-- Quick Help Cards -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div class="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 shadow-sm p-6 space-y-3">
            <div class="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400 flex items-center justify-center">
              <i data-lucide="book-open" class="w-5 h-5"></i>
            </div>
            <h3 class="text-base font-bold text-slate-900 dark:text-white">Developer Guide</h3>
            <p class="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Understand the component structure, event architecture, mock datasets, and customization tokens.
            </p>
            <a href="https://github.com" target="_blank" class="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline">
              Read Docs <i data-lucide="external-link" class="w-3.5 h-3.5"></i>
            </a>
          </div>

          <div class="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 shadow-sm p-6 space-y-3">
            <div class="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 dark:bg-purple-950/60 dark:text-purple-400 flex items-center justify-center">
              <i data-lucide="command" class="w-5 h-5"></i>
            </div>
            <h3 class="text-base font-bold text-slate-900 dark:text-white">Keyboard Shortcuts</h3>
            <p class="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Speed through workflows using <code class="font-mono bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded">Ctrl + K</code> search, navigation keys, and dialog controls.
            </p>
            <button type="button" id="btn-view-shortcuts" class="inline-flex items-center gap-1 text-xs font-semibold text-purple-600 dark:text-purple-400 hover:underline">
              View Key Map <i data-lucide="arrow-right" class="w-3.5 h-3.5"></i>
            </button>
          </div>

          <div class="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 shadow-sm p-6 space-y-3">
            <div class="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400 flex items-center justify-center">
              <i data-lucide="life-buoy" class="w-5 h-5"></i>
            </div>
            <h3 class="text-base font-bold text-slate-900 dark:text-white">SLA Support</h3>
            <p class="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Need assistance integrating real APIs or configuring custom databases? Reach out to support.
            </p>
            <a href="mailto:support@dashpulse.io" class="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:underline">
              Contact Us <i data-lucide="mail" class="w-3.5 h-3.5"></i>
            </a>
          </div>
        </div>

        <!-- Frequently Asked Questions Accordion -->
        <div class="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 shadow-sm p-6">
          <div class="border-b border-slate-100 dark:border-slate-800 pb-4 mb-4">
            <h2 class="text-base font-bold text-slate-900 dark:text-white">Frequently Asked Questions</h2>
            <p class="text-xs text-slate-500 mt-0.5">Quick answers to common questions about using and customizing this admin dashboard template.</p>
          </div>

          <div class="divide-y divide-slate-100 dark:divide-slate-800 text-xs" id="faq-accordion">
            <!-- FAQ 1 -->
            <div class="py-3.5">
              <button type="button" class="faq-toggle w-full flex items-center justify-between text-left font-semibold text-slate-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                <span>How do I connect this template to a real REST or GraphQL API backend?</span>
                <i data-lucide="chevron-down" class="w-4 h-4 text-slate-400 transition-transform"></i>
              </button>
              <div class="faq-answer hidden mt-2 text-slate-500 dark:text-slate-400 leading-relaxed pr-6">
                All data access is cleanly abstracted in <code class="font-mono bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded">js/data.js</code> via <code class="font-mono">DashData</code>. Simply swap the local in-memory/localStorage stores with <code class="font-mono">fetch()</code> or <code class="font-mono">axios</code> calls to your backend endpoints without having to touch UI components!
              </div>
            </div>

            <!-- FAQ 2 -->
            <div class="py-3.5">
              <button type="button" class="faq-toggle w-full flex items-center justify-between text-left font-semibold text-slate-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                <span>How is theme persistence implemented?</span>
                <i data-lucide="chevron-down" class="w-4 h-4 text-slate-400 transition-transform"></i>
              </button>
              <div class="faq-answer hidden mt-2 text-slate-500 dark:text-slate-400 leading-relaxed pr-6">
                The theme toggle persists selection (<code class="font-mono">light</code>, <code class="font-mono">dark</code>, or <code class="font-mono">system</code>) in <code class="font-mono">localStorage.getItem('dashpulse-theme')</code>. The class <code class="font-mono">dark</code> is toggled on <code class="font-mono">document.documentElement</code>, which seamlessly triggers Tailwind's <code class="font-mono">dark:</code> utility classes and refreshes Chart.js color schemes.
              </div>
            </div>

            <!-- FAQ 3 -->
            <div class="py-3.5">
              <button type="button" class="faq-toggle w-full flex items-center justify-between text-left font-semibold text-slate-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                <span>Can this template be hosted on static platforms like GitHub Pages, Vercel, or Netlify?</span>
                <i data-lucide="chevron-down" class="w-4 h-4 text-slate-400 transition-transform"></i>
              </button>
              <div class="faq-answer hidden mt-2 text-slate-500 dark:text-slate-400 leading-relaxed pr-6">
                Yes! Because DashPulse uses pure HTML5, CSS, and Vanilla JavaScript with hash routing (<code class="font-mono">#dashboard</code>, <code class="font-mono">#users</code>, etc.), it has zero server build dependencies and can be deployed directly to GitHub Pages, Cloudflare Pages, S3, or any static hosting service.
              </div>
            </div>

            <!-- FAQ 4 -->
            <div class="py-3.5">
              <button type="button" class="faq-toggle w-full flex items-center justify-between text-left font-semibold text-slate-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                <span>How do export actions work?</span>
                <i data-lucide="chevron-down" class="w-4 h-4 text-slate-400 transition-transform"></i>
              </button>
              <div class="faq-answer hidden mt-2 text-slate-500 dark:text-slate-400 leading-relaxed pr-6">
                DashPulse includes client-side CSV and JSON generators in <code class="font-mono">DashComponents.exportToCSV</code> and <code class="font-mono">DashComponents.exportToJSON</code>. Clicking export compiles current filtered datasets into real Blobs and triggers browser file downloads automatically.
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Ticket Modal Root -->
      <div id="ticket-modal-root"></div>
    `;

    if (window.lucide) window.lucide.createIcons({ root: container });

    // FAQ Accordion toggle
    container.querySelectorAll(".faq-toggle").forEach(btn => {
      btn.addEventListener("click", () => {
        const answer = btn.nextElementSibling;
        const icon = btn.querySelector("[data-lucide='chevron-down']");
        const isOpen = !answer.classList.contains("hidden");

        if (isOpen) {
          answer.classList.add("hidden");
          if (icon) icon.style.transform = "rotate(0deg)";
        } else {
          answer.classList.remove("hidden");
          if (icon) icon.style.transform = "rotate(180deg)";
        }
      });
    });

    // View Shortcuts modal
    document.getElementById("btn-view-shortcuts")?.addEventListener("click", () => {
      openShortcutsModal();
    });

    // Open Ticket modal
    document.getElementById("btn-open-ticket")?.addEventListener("click", () => {
      openTicketModal();
    });
  }

  // 404 Handler
  function render404(container, route = "") {
    DashComponents.updateBreadcrumbs([
      { label: "Dashboard", href: "#dashboard" },
      { label: "404 Not Found", href: `#${route}` }
    ]);

    container.innerHTML = `
      <div class="min-h-[60vh] flex flex-col items-center justify-center text-center p-6">
        <div class="w-20 h-20 rounded-3xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-6 shadow-sm">
          <i data-lucide="compass" class="w-10 h-10 animate-spin" style="animation-duration: 10s"></i>
        </div>
        <div class="text-sm font-mono font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest mb-2">Error 404</div>
        <h1 class="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">Destination Not Found</h1>
        <p class="text-sm text-slate-500 dark:text-slate-400 max-w-md mt-2 leading-relaxed">
          The requested route <code class="font-mono bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-1.5 py-0.5 rounded text-xs">#${route}</code> does not exist or has been relocated in this workspace.
        </p>

        <div class="flex items-center gap-3 mt-8">
          <a href="#dashboard" class="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold shadow-sm transition-colors">
            <i data-lucide="home" class="w-4 h-4"></i>
            Return to Dashboard
          </a>
          <a href="#help" class="inline-flex items-center gap-2 px-4 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 rounded-xl text-xs font-semibold shadow-sm transition-colors">
            <i data-lucide="help-circle" class="w-4 h-4"></i>
            Open Help Center
          </a>
        </div>
      </div>
    `;

    if (window.lucide) window.lucide.createIcons({ root: container });
  }

  function openShortcutsModal() {
    const root = document.getElementById("ticket-modal-root");
    if (!root) return;

    root.innerHTML = `
      <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm" id="sc-backdrop">
        <div class="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 max-w-md w-full p-6 modal-content space-y-4">
          <div class="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
            <h3 class="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <i data-lucide="keyboard" class="w-5 h-5 text-purple-600"></i> Keyboard Shortcuts Cheat Sheet
            </h3>
            <button type="button" id="sc-close" class="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1 rounded-md">
              <i data-lucide="x" class="w-4 h-4"></i>
            </button>
          </div>

          <div class="space-y-2.5 text-xs">
            <div class="flex items-center justify-between py-2 border-b border-slate-100 dark:border-slate-800">
              <span class="text-slate-600 dark:text-slate-300">Open Command Palette / Search</span>
              <kbd class="font-mono bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 shadow-xs">Ctrl + K</kbd>
            </div>
            <div class="flex items-center justify-between py-2 border-b border-slate-100 dark:border-slate-800">
              <span class="text-slate-600 dark:text-slate-300">Close active modal or drawer</span>
              <kbd class="font-mono bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 shadow-xs">Esc</kbd>
            </div>
            <div class="flex items-center justify-between py-2 border-b border-slate-100 dark:border-slate-800">
              <span class="text-slate-600 dark:text-slate-300">Toggle Sidebar (Mobile/Desktop)</span>
              <kbd class="font-mono bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 shadow-xs">Ctrl + B</kbd>
            </div>
            <div class="flex items-center justify-between py-2">
              <span class="text-slate-600 dark:text-slate-300">Toggle Light / Dark Mode</span>
              <kbd class="font-mono bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 shadow-xs">Ctrl + D</kbd>
            </div>
          </div>

          <div class="pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-end">
            <button type="button" id="sc-done" class="px-4 py-1.5 text-xs font-semibold bg-blue-600 text-white rounded-lg shadow-sm">
              Got it
            </button>
          </div>
        </div>
      </div>
    `;

    if (window.lucide) window.lucide.createIcons({ root: root });

    const close = () => { root.innerHTML = ""; };
    document.getElementById("sc-close").addEventListener("click", close);
    document.getElementById("sc-done").addEventListener("click", close);
    document.getElementById("sc-backdrop").addEventListener("click", (e) => {
      if (e.target.id === "sc-backdrop") close();
    });
  }

  function openTicketModal() {
    const root = document.getElementById("ticket-modal-root");
    if (!root) return;

    root.innerHTML = `
      <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm" id="ticket-backdrop">
        <div class="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 max-w-lg w-full p-6 modal-content space-y-4">
          <div class="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
            <h3 class="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <i data-lucide="life-buoy" class="w-5 h-5 text-blue-600"></i> Open Engineering Ticket
            </h3>
            <button type="button" id="ticket-close" class="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1 rounded-md">
              <i data-lucide="x" class="w-4 h-4"></i>
            </button>
          </div>

          <form id="support-ticket-form" class="space-y-4 text-xs">
            <div>
              <label class="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Issue Topic</label>
              <input type="text" id="ticket-subject" required placeholder="e.g. Custom Webhook Signature Validation" class="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white">
            </div>

            <div class="grid grid-cols-2 gap-3">
              <div>
                <label class="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Priority</label>
                <select id="ticket-priority" class="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white">
                  <option value="Normal">Normal (24h SLA)</option>
                  <option value="High">High (4h SLA)</option>
                  <option value="Urgent">Urgent (1h P1 SLA)</option>
                </select>
              </div>

              <div>
                <label class="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Affected Area</label>
                <select id="ticket-area" class="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white">
                  <option value="API">API Gateway</option>
                  <option value="Billing">Stripe Billing</option>
                  <option value="Auth">SSO / 2FA</option>
                  <option value="UI">Frontend Template</option>
                </select>
              </div>
            </div>

            <div>
              <label class="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Detailed Description</label>
              <textarea id="ticket-desc" required rows="4" placeholder="Please describe the steps or behavior observed..." class="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"></textarea>
            </div>

            <div class="flex items-center justify-end gap-3 pt-3 border-t border-slate-100 dark:border-slate-800">
              <button type="button" id="ticket-cancel" class="px-4 py-2 text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg">
                Cancel
              </button>
              <button type="submit" class="px-5 py-2 font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm">
                Submit Ticket
              </button>
            </div>
          </form>
        </div>
      </div>
    `;

    if (window.lucide) window.lucide.createIcons({ root: root });

    const close = () => { root.innerHTML = ""; };
    document.getElementById("ticket-close").addEventListener("click", close);
    document.getElementById("ticket-cancel").addEventListener("click", close);
    document.getElementById("ticket-backdrop").addEventListener("click", (e) => {
      if (e.target.id === "ticket-backdrop") close();
    });

    document.getElementById("support-ticket-form").addEventListener("submit", (e) => {
      e.preventDefault();
      const subject = document.getElementById("ticket-subject").value;
      DashComponents.showToast(`Support ticket "${subject}" filed! Ticket #ENG-${Math.floor(1000 + Math.random() * 9000)}`, "success");
      close();
    });
  }

  return { render, render404 };
})();
