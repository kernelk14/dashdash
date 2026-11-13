/**
 * DashPulse Admin Dashboard Template
 * Page: Theme Styles (Colors & Typography Showcase - CoreUI Inspired)
 */

window.DemoThemePage = (function () {
  function renderColors(container) {
    DashComponents.updateBreadcrumbs([
      { label: "Theme", href: "#colors" },
      { label: "Colors", href: "#colors" }
    ]);

    const palettes = [
      { name: "Primary Blue", hex: "#0284c7", rgb: "rgb(2, 132, 199)", bgClass: "bg-blue-600", textClass: "text-white" },
      { name: "Secondary Slate", hex: "#64748b", rgb: "rgb(100, 116, 139)", bgClass: "bg-slate-500", textClass: "text-white" },
      { name: "Success Emerald", hex: "#10b981", rgb: "rgb(16, 185, 129)", bgClass: "bg-emerald-500", textClass: "text-white" },
      { name: "Danger Rose", hex: "#e11d48", rgb: "rgb(225, 29, 72)", bgClass: "bg-rose-600", textClass: "text-white" },
      { name: "Warning Amber", hex: "#f59e0b", rgb: "rgb(245, 158, 11)", bgClass: "bg-amber-500", textClass: "text-white" },
      { name: "Info Sky", hex: "#0ea5e9", rgb: "rgb(14, 165, 233)", bgClass: "bg-sky-500", textClass: "text-white" },
      { name: "Light Neutral", hex: "#f8fafc", rgb: "rgb(248, 250, 252)", bgClass: "bg-slate-50 border border-slate-200 text-slate-800", textClass: "text-slate-800" },
      { name: "Dark Neutral", hex: "#0f172a", rgb: "rgb(15, 23, 42)", bgClass: "bg-slate-900", textClass: "text-white" }
    ];

    container.innerHTML = `
      <div class="space-y-6">
        <div>
          <h1 class="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">Theme Color Palette</h1>
          <p class="text-sm text-slate-500 dark:text-slate-400 mt-1">Standard contextual swatches, semantic tokens, and accessible contrast values. Click any swatch to copy HEX.</p>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          ${palettes.map(p => `
            <div class="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 shadow-sm overflow-hidden cursor-pointer color-swatch-card hover:scale-[1.02] transition-transform" data-hex="${p.hex}">
              <div class="h-32 ${p.bgClass} p-4 flex flex-col justify-end">
                <span class="font-bold text-sm ${p.textClass}">${p.name}</span>
              </div>
              <div class="p-4 space-y-1 text-xs">
                <div class="flex justify-between">
                  <span class="text-slate-400">HEX</span>
                  <span class="font-mono font-bold text-slate-900 dark:text-white">${p.hex}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-slate-400">RGB</span>
                  <span class="font-mono text-slate-600 dark:text-slate-400 text-[11px]">${p.rgb}</span>
                </div>
              </div>
            </div>
          `).join("")}
        </div>
      </div>
    `;

    container.querySelectorAll(".color-swatch-card").forEach(c => {
      c.addEventListener("click", () => {
        const hex = c.dataset.hex;
        navigator.clipboard?.writeText(hex);
        DashComponents.showToast(`Copied ${hex} to clipboard!`, "success", 1500);
      });
    });
  }

  function renderTypography(container) {
    DashComponents.updateBreadcrumbs([
      { label: "Theme", href: "#typography" },
      { label: "Typography", href: "#typography" }
    ]);

    container.innerHTML = `
      <div class="space-y-6">
        <div>
          <h1 class="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">Typography Hierarchy</h1>
          <p class="text-sm text-slate-500 dark:text-slate-400 mt-1">Inter font system with letter tracking, display scales, blockquotes, and inline element formatting.</p>
        </div>

        <!-- Headings Scale -->
        <div class="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 shadow-sm p-6 space-y-4">
          <h2 class="text-base font-bold text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-3">Headings & Display Scale</h2>
          <div class="space-y-4">
            <div class="flex flex-col sm:flex-row sm:items-baseline justify-between border-b border-slate-50 dark:border-slate-800/60 pb-2">
              <span class="text-4xl font-black text-slate-900 dark:text-white tracking-tight">H1 Heading (36px / 2.25rem)</span>
              <span class="text-xs font-mono text-slate-400">font-black tracking-tight</span>
            </div>
            <div class="flex flex-col sm:flex-row sm:items-baseline justify-between border-b border-slate-50 dark:border-slate-800/60 pb-2">
              <span class="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">H2 Heading (30px / 1.875rem)</span>
              <span class="text-xs font-mono text-slate-400">font-extrabold</span>
            </div>
            <div class="flex flex-col sm:flex-row sm:items-baseline justify-between border-b border-slate-50 dark:border-slate-800/60 pb-2">
              <span class="text-2xl font-bold text-slate-900 dark:text-white">H3 Heading (24px / 1.5rem)</span>
              <span class="text-xs font-mono text-slate-400">font-bold</span>
            </div>
            <div class="flex flex-col sm:flex-row sm:items-baseline justify-between border-b border-slate-50 dark:border-slate-800/60 pb-2">
              <span class="text-xl font-bold text-slate-900 dark:text-white">H4 Heading (20px / 1.25rem)</span>
              <span class="text-xs font-mono text-slate-400">font-bold</span>
            </div>
            <div class="flex flex-col sm:flex-row sm:items-baseline justify-between border-b border-slate-50 dark:border-slate-800/60 pb-2">
              <span class="text-base font-semibold text-slate-900 dark:text-white">H5 Heading (16px / 1rem)</span>
              <span class="text-xs font-mono text-slate-400">font-semibold</span>
            </div>
            <div class="flex flex-col sm:flex-row sm:items-baseline justify-between">
              <span class="text-sm font-semibold text-slate-900 dark:text-white uppercase tracking-wider">H6 Subheading (14px)</span>
              <span class="text-xs font-mono text-slate-400">uppercase tracking-wider</span>
            </div>
          </div>
        </div>

        <!-- Body & Inline Styles -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 shadow-sm p-6 space-y-4">
            <h3 class="text-sm font-bold text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-2">Paragraphs & Lead Copy</h3>
            <p class="text-base text-slate-600 dark:text-slate-300 font-medium leading-relaxed">
              <strong>Lead Paragraph:</strong> DashPulse provides high-velocity developer ergonomics with preconfigured Tailwind tokens and modular layout states.
            </p>
            <p class="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Standard body text optimized with negative letter tracking <code class="font-mono bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded text-blue-600">-0.012em</code> and subpixel antialiasing for maximum readability across Retina and high-DPI displays.
            </p>
          </div>

          <div class="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 shadow-sm p-6 space-y-4">
            <h3 class="text-sm font-bold text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-2">Blockquote & Semantic Quotes</h3>
            <blockquote class="border-l-4 border-blue-600 pl-4 py-1 italic text-xs text-slate-600 dark:text-slate-300 space-y-1">
              <p>"Good design is as little design as possible. Less, but better — because it concentrates on the essential aspects."</p>
              <footer class="text-[11px] font-semibold text-slate-400 not-italic">— Dieter Rams, Ten Principles for Good Design</footer>
            </blockquote>
          </div>
        </div>
      </div>
    `;
  }

  return { renderColors, renderTypography };
})();
