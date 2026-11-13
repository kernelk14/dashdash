/**
 * DashPulse Admin Dashboard Template
 * Page: Base Components (Accordion, Cards, Carousel, Pagination, Progress - CoreUI Inspired)
 */

window.DemoBasePage = (function () {
  function renderAccordion(container) {
    DashComponents.updateBreadcrumbs([
      { label: "Components", href: "#base-accordion" },
      { label: "Base", href: "#base-accordion" },
      { label: "Accordion", href: "#base-accordion" }
    ]);

    container.innerHTML = `
      <div class="space-y-6">
        <div>
          <h1 class="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">Accordion & Collapse</h1>
          <p class="text-sm text-slate-500 dark:text-slate-400 mt-1">Vertically collapsing accordions built with semantic buttons and fluid SVG transitions.</p>
        </div>

        <div class="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 shadow-sm p-6 space-y-3">
          <div class="border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden divide-y divide-slate-100 dark:divide-slate-800">
            <!-- Item 1 -->
            <div>
              <button type="button" class="base-acc-btn w-full p-4 text-left text-xs font-bold text-slate-900 dark:text-white flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                <span>Accordion Item #1: Enterprise Infrastructure SLA</span>
                <i data-lucide="chevron-down" class="w-4 h-4 text-slate-400 transition-transform"></i>
              </button>
              <div class="base-acc-body p-4 text-xs text-slate-500 dark:text-slate-400 bg-slate-50/50 dark:bg-slate-800/30 leading-relaxed border-t border-slate-100 dark:border-slate-800">
                DashPulse is backed by 99.99% multi-region uptime commitments with financial credits for tier-1 downtime exceeding 5 continuous minutes.
              </div>
            </div>

            <!-- Item 2 -->
            <div>
              <button type="button" class="base-acc-btn w-full p-4 text-left text-xs font-bold text-slate-900 dark:text-white flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                <span>Accordion Item #2: Automated Database Snapshots</span>
                <i data-lucide="chevron-down" class="w-4 h-4 text-slate-400 transition-transform"></i>
              </button>
              <div class="base-acc-body hidden p-4 text-xs text-slate-500 dark:text-slate-400 bg-slate-50/50 dark:bg-slate-800/30 leading-relaxed border-t border-slate-100 dark:border-slate-800">
                Hourly differential snapshots are stored across 3 distinct cloud availability zones with automated integrity validation routines.
              </div>
            </div>

            <!-- Item 3 -->
            <div>
              <button type="button" class="base-acc-btn w-full p-4 text-left text-xs font-bold text-slate-900 dark:text-white flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                <span>Accordion Item #3: Role-Based Access Control (RBAC)</span>
                <i data-lucide="chevron-down" class="w-4 h-4 text-slate-400 transition-transform"></i>
              </button>
              <div class="base-acc-body hidden p-4 text-xs text-slate-500 dark:text-slate-400 bg-slate-50/50 dark:bg-slate-800/30 leading-relaxed border-t border-slate-100 dark:border-slate-800">
                Define fine-grained permission scopes for Administrators, Developers, Editors, Billing Leads, and Auditors without custom backend scripts.
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    if (window.lucide) window.lucide.createIcons({ root: container });

    container.querySelectorAll(".base-acc-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const body = btn.nextElementSibling;
        const icon = btn.querySelector("[data-lucide='chevron-down']");
        const isOpen = !body.classList.contains("hidden");

        if (isOpen) {
          body.classList.add("hidden");
          if (icon) icon.style.transform = "rotate(0deg)";
        } else {
          body.classList.remove("hidden");
          if (icon) icon.style.transform = "rotate(180deg)";
        }
      });
    });
  }

  function renderCards(container) {
    DashComponents.updateBreadcrumbs([
      { label: "Components", href: "#base-cards" },
      { label: "Base", href: "#base-cards" },
      { label: "Cards", href: "#base-cards" }
    ]);

    container.innerHTML = `
      <div class="space-y-6">
        <div>
          <h1 class="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">Cards & Containers</h1>
          <p class="text-sm text-slate-500 dark:text-slate-400 mt-1">Flexible content containers with headers, footers, image overlays, and colored variants.</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <!-- Standard Card -->
          <div class="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 shadow-sm p-5 space-y-3">
            <h3 class="text-sm font-bold text-slate-900 dark:text-white">Basic Card</h3>
            <p class="text-xs text-slate-500 leading-relaxed">Clean card with border styling, padding, and subtle elevation shadow.</p>
            <button type="button" class="px-3 py-1.5 text-xs font-semibold bg-blue-600 text-white rounded-lg hover:bg-blue-700">Action Button</button>
          </div>

          <!-- Header & Footer Card -->
          <div class="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 shadow-sm overflow-hidden flex flex-col justify-between">
            <div class="p-4 border-b border-slate-100 dark:border-slate-800 text-xs font-bold text-slate-900 dark:text-white bg-slate-50/60 dark:bg-slate-800/40">
              Featured Card Header
            </div>
            <div class="p-5 text-xs text-slate-500 space-y-2">
              <h4 class="font-bold text-slate-900 dark:text-white">Specialized SaaS Module</h4>
              <p>Supports embedded interactive data tables, graphs, and action buttons.</p>
            </div>
            <div class="p-3 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-400 bg-slate-50/40 dark:bg-slate-800/20">
              Updated 2 hours ago
            </div>
          </div>

          <!-- Colored Card -->
          <div class="bg-blue-600 text-white rounded-2xl shadow-sm p-6 space-y-3 flex flex-col justify-between">
            <div>
              <span class="text-xs font-bold uppercase tracking-wider text-blue-200">Highlight Card</span>
              <h3 class="text-lg font-extrabold mt-1">Enterprise Plus Tier</h3>
              <p class="text-xs text-blue-100 mt-2 leading-relaxed">Includes dedicated technical account manager and custom feature engineering.</p>
            </div>
            <button type="button" class="px-4 py-2 text-xs font-bold bg-white text-blue-600 rounded-xl hover:bg-blue-50 self-start shadow-sm">
              Upgrade Workspace
            </button>
          </div>
        </div>
      </div>
    `;
  }

  function renderCarousel(container) {
    DashComponents.updateBreadcrumbs([
      { label: "Components", href: "#base-carousel" },
      { label: "Base", href: "#base-carousel" },
      { label: "Carousel", href: "#base-carousel" }
    ]);

    const slides = [
      {
        title: "Global Multi-Cloud Deployment",
        desc: "Deploy edge nodes in US-East, Frankfurt, and Tokyo with 1 click.",
        img: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&auto=format&fit=crop&q=80"
      },
      {
        title: "Real-time Telemetry & Metrics",
        desc: "Monitor p99 latency, container restarts, and database memory in real-time.",
        img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80"
      },
      {
        title: "Automated SOC-2 Compliance",
        desc: "Continuously audit credentials, firewall rules, and encryption policies.",
        img: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&auto=format&fit=crop&q=80"
      }
    ];

    let currentSlide = 0;

    container.innerHTML = `
      <div class="space-y-6">
        <div>
          <h1 class="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">Interactive Carousel</h1>
          <p class="text-sm text-slate-500 dark:text-slate-400 mt-1">Full-featured slide carousel with previous/next controls, indicator dots, and captions.</p>
        </div>

        <div class="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800/80 shadow-sm overflow-hidden relative max-w-3xl mx-auto">
          <!-- Slide Container -->
          <div class="relative h-80 w-full overflow-hidden" id="carousel-viewport">
            <img id="carousel-img" src="${slides[0].img}" alt="Slide image" class="w-full h-full object-cover transition-opacity duration-300">
            <div class="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent flex flex-col justify-end p-8 text-white">
              <h3 id="carousel-title" class="text-xl font-bold">${slides[0].title}</h3>
              <p id="carousel-desc" class="text-xs text-slate-300 mt-1 max-w-lg">${slides[0].desc}</p>
            </div>
          </div>

          <!-- Controls -->
          <button id="car-prev-btn" type="button" class="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/30 hover:bg-white/50 backdrop-blur-md text-white transition-colors">
            <i data-lucide="chevron-left" class="w-5 h-5"></i>
          </button>
          <button id="car-next-btn" type="button" class="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/30 hover:bg-white/50 backdrop-blur-md text-white transition-colors">
            <i data-lucide="chevron-right" class="w-5 h-5"></i>
          </button>

          <!-- Indicators -->
          <div class="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2" id="carousel-indicators">
            ${slides.map((_, i) => `
              <button type="button" data-slide="${i}" class="car-dot w-2 h-2 rounded-full transition-all ${i === 0 ? 'bg-white w-6' : 'bg-white/50'}"></button>
            `).join("")}
          </div>
        </div>
      </div>
    `;

    if (window.lucide) window.lucide.createIcons({ root: container });

    function updateSlide(idx) {
      currentSlide = (idx + slides.length) % slides.length;
      const img = document.getElementById("carousel-img");
      const title = document.getElementById("carousel-title");
      const desc = document.getElementById("carousel-desc");
      if (img && title && desc) {
        img.src = slides[currentSlide].img;
        title.textContent = slides[currentSlide].title;
        desc.textContent = slides[currentSlide].desc;
      }
      container.querySelectorAll(".car-dot").forEach((dot, i) => {
        dot.className = `car-dot h-2 rounded-full transition-all ${i === currentSlide ? 'bg-white w-6' : 'bg-white/50 w-2'}`;
      });
    }

    document.getElementById("car-prev-btn")?.addEventListener("click", () => { updateSlide(currentSlide - 1); });
    document.getElementById("car-next-btn")?.addEventListener("click", () => { updateSlide(currentSlide + 1); });

    container.querySelectorAll(".car-dot").forEach(btn => {
      btn.addEventListener("click", () => {
        updateSlide(parseInt(btn.dataset.slide, 10));
      });
    });
  }

  function renderPagination(container) {
    DashComponents.updateBreadcrumbs([
      { label: "Components", href: "#base-pagination" },
      { label: "Base", href: "#base-pagination" },
      { label: "Pagination & Spinners", href: "#base-pagination" }
    ]);

    container.innerHTML = `
      <div class="space-y-6">
        <div>
          <h1 class="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">Pagination & Loading Indicators</h1>
          <p class="text-sm text-slate-500 dark:text-slate-400 mt-1">Interactive page navigators, animated progress bars, and border spinners.</p>
        </div>

        <div class="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 shadow-sm p-6 space-y-6">
          <!-- Pagination Sizes -->
          <div class="space-y-3">
            <h3 class="text-sm font-bold text-slate-900 dark:text-white">Pagination Variants</h3>
            <div class="flex flex-wrap items-center gap-4">
              <!-- Regular -->
              <nav class="flex items-center gap-1 text-xs">
                <button type="button" class="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800">&laquo;</button>
                <button type="button" class="px-3 py-1.5 rounded-lg bg-blue-600 text-white font-bold">1</button>
                <button type="button" class="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800">2</button>
                <button type="button" class="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800">3</button>
                <button type="button" class="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800">&raquo;</button>
              </nav>
            </div>
          </div>

          <!-- Spinners -->
          <div class="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800">
            <h3 class="text-sm font-bold text-slate-900 dark:text-white">Animated Spinners</h3>
            <div class="flex items-center gap-6">
              <div class="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
              <div class="w-6 h-6 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
              <div class="w-6 h-6 border-2 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
              <div class="w-6 h-6 border-2 border-rose-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
          </div>

          <!-- Progress Bars -->
          <div class="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800">
            <h3 class="text-sm font-bold text-slate-900 dark:text-white">Animated & Striped Progress Bars</h3>
            <div class="space-y-3 max-w-xl">
              <div class="w-full bg-slate-100 dark:bg-slate-800 h-2.5 rounded-full overflow-hidden">
                <div class="bg-blue-600 h-full rounded-full" style="width: 65%"></div>
              </div>
              <div class="w-full bg-slate-100 dark:bg-slate-800 h-2.5 rounded-full overflow-hidden">
                <div class="bg-emerald-500 h-full rounded-full" style="width: 85%"></div>
              </div>
              <div class="w-full bg-slate-100 dark:bg-slate-800 h-2.5 rounded-full overflow-hidden">
                <div class="bg-gradient-to-r from-blue-600 to-indigo-600 h-full rounded-full" style="width: 45%"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  return {
    renderAccordion,
    renderCards,
    renderCarousel,
    renderPagination
  };
})();
