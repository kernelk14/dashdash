/**
 * DashPulse Admin Dashboard Template
 * Page: Form Controls, Checks, Selects & Validation (CoreUI Inspired)
 */

window.DemoFormsPage = (function () {
  function render(container, subview = "forms") {
    DashComponents.updateBreadcrumbs([
      { label: "Components", href: "#forms" },
      { label: "Forms", href: `#${subview}` },
      { label: subview.replace("form-", "").replace(/\b\w/g, l => l.toUpperCase()), href: `#${subview}` }
    ]);

    const activeControls = subview === "forms" ? "border-blue-600 text-blue-600 dark:text-blue-400" : "border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300";
    const activeSelect = subview === "form-select" ? "border-blue-600 text-blue-600 dark:text-blue-400" : "border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300";
    const activeChecks = subview === "form-checks" ? "border-blue-600 text-blue-600 dark:text-blue-400" : "border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300";
    const activeValidation = subview === "form-validation" ? "border-blue-600 text-blue-600 dark:text-blue-400" : "border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300";

    container.innerHTML = `
      <div class="space-y-6">
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 class="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">Form Controls & Layouts</h1>
            <p class="text-sm text-slate-500 dark:text-slate-400 mt-1">Interactive input fields, custom select menus, toggles, switches, and client-side validation.</p>
          </div>
          <div class="flex flex-wrap border-b border-slate-200 dark:border-slate-800 space-x-4">
            <a href="#forms" class="py-2 px-1 border-b-2 font-medium text-xs transition-colors ${activeControls}">Controls</a>
            <a href="#form-select" class="py-2 px-1 border-b-2 font-medium text-xs transition-colors ${activeSelect}">Select</a>
            <a href="#form-checks" class="py-2 px-1 border-b-2 font-medium text-xs transition-colors ${activeChecks}">Checks & Radios</a>
            <a href="#form-validation" class="py-2 px-1 border-b-2 font-medium text-xs transition-colors ${activeValidation}">Validation</a>
          </div>
        </div>

        <div id="forms-content-slot" class="space-y-6">
          ${renderSubviewContent(subview)}
        </div>
      </div>
    `;

    if (window.lucide) window.lucide.createIcons();
    initInteractions(container, subview);
  }

  function renderSubviewContent(subview) {
    if (subview === "form-select") {
      return `
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div class="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 shadow-sm p-6 space-y-4">
            <h3 class="text-sm font-bold text-slate-900 dark:text-white">Standard Native Select</h3>
            <p class="text-xs text-slate-500">Accessible standard HTML dropdown select element with custom chevron.</p>
            <div class="space-y-4">
              <div>
                <label class="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Choose Region</label>
                <select class="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all">
                  <option value="us-east-1">US East (N. Virginia)</option>
                  <option value="us-west-2">US West (Oregon)</option>
                  <option value="eu-central-1">Europe (Frankfurt)</option>
                  <option value="ap-southeast-1">Asia Pacific (Singapore)</option>
                </select>
              </div>

              <div>
                <label class="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Select Size Scale</label>
                <div class="grid grid-cols-2 gap-3">
                  <select class="px-2.5 py-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs text-slate-900 dark:text-white">
                    <option>Small Select</option>
                    <option>Option 2</option>
                  </select>
                  <select class="px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-900 dark:text-white">
                    <option>Large Select</option>
                    <option>Option 2</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div class="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 shadow-sm p-6 space-y-4">
            <h3 class="text-sm font-bold text-slate-900 dark:text-white">Multi-Select & Tag Groups</h3>
            <p class="text-xs text-slate-500">Multiple selection with scrollable item list.</p>
            <div>
              <label class="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Assigned Developer Teams (Ctrl/Cmd + click to multi-select)</label>
              <select multiple class="w-full h-36 px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all">
                <option value="frontend" selected>Frontend Engineering</option>
                <option value="backend" selected>Cloud Infrastructure & API</option>
                <option value="design">UI/UX & Brand Systems</option>
                <option value="qa">Automated QA & Security Audit</option>
                <option value="data">Data Science & Analytics</option>
              </select>
            </div>
          </div>
        </div>
      `;
    }

    if (subview === "form-checks") {
      return `
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <!-- Checkboxes -->
          <div class="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 shadow-sm p-6 space-y-4">
            <h3 class="text-sm font-bold text-slate-900 dark:text-white">Checkboxes</h3>
            <p class="text-xs text-slate-500">Standard and indeterminate check indicators.</p>
            <div class="space-y-3">
              <label class="flex items-center gap-2.5 text-xs text-slate-700 dark:text-slate-300 cursor-pointer">
                <input type="checkbox" checked class="w-4 h-4 text-blue-600 rounded border-slate-300 dark:border-slate-600 focus:ring-blue-500">
                <span>Default Checked Option</span>
              </label>
              <label class="flex items-center gap-2.5 text-xs text-slate-700 dark:text-slate-300 cursor-pointer">
                <input type="checkbox" class="w-4 h-4 text-blue-600 rounded border-slate-300 dark:border-slate-600 focus:ring-blue-500">
                <span>Unchecked Option</span>
              </label>
              <label class="flex items-center gap-2.5 text-xs text-slate-400 dark:text-slate-600 cursor-not-allowed">
                <input type="checkbox" disabled class="w-4 h-4 text-blue-600 rounded border-slate-300 dark:border-slate-700">
                <span>Disabled Checkbox</span>
              </label>
            </div>
          </div>

          <!-- Radio Buttons -->
          <div class="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 shadow-sm p-6 space-y-4">
            <h3 class="text-sm font-bold text-slate-900 dark:text-white">Radio Buttons</h3>
            <p class="text-xs text-slate-500">Single selection options within a grouped context.</p>
            <div class="space-y-3">
              <label class="flex items-center gap-2.5 text-xs text-slate-700 dark:text-slate-300 cursor-pointer">
                <input type="radio" name="demo-radio" value="opt1" checked class="w-4 h-4 text-blue-600 border-slate-300 dark:border-slate-600 focus:ring-blue-500">
                <span>Tier 1: Starter Standard</span>
              </label>
              <label class="flex items-center gap-2.5 text-xs text-slate-700 dark:text-slate-300 cursor-pointer">
                <input type="radio" name="demo-radio" value="opt2" class="w-4 h-4 text-blue-600 border-slate-300 dark:border-slate-600 focus:ring-blue-500">
                <span>Tier 2: Business Pro</span>
              </label>
              <label class="flex items-center gap-2.5 text-xs text-slate-700 dark:text-slate-300 cursor-pointer">
                <input type="radio" name="demo-radio" value="opt3" class="w-4 h-4 text-blue-600 border-slate-300 dark:border-slate-600 focus:ring-blue-500">
                <span>Tier 3: Enterprise Dedicated</span>
              </label>
            </div>
          </div>

          <!-- Switches -->
          <div class="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 shadow-sm p-6 space-y-4">
            <h3 class="text-sm font-bold text-slate-900 dark:text-white">Switches & Toggles</h3>
            <p class="text-xs text-slate-500">Accessible modern iOS/SaaS toggle controls.</p>
            <div class="space-y-4">
              <label class="flex items-center justify-between cursor-pointer">
                <span class="text-xs font-medium text-slate-700 dark:text-slate-300">Email Notifications</span>
                <input type="checkbox" checked class="sr-only peer demo-switch">
                <div class="w-9 h-5 bg-slate-200 dark:bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600 relative"></div>
              </label>
              <label class="flex items-center justify-between cursor-pointer">
                <span class="text-xs font-medium text-slate-700 dark:text-slate-300">Auto-deploy on Git push</span>
                <input type="checkbox" checked class="sr-only peer demo-switch">
                <div class="w-9 h-5 bg-slate-200 dark:bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-emerald-600 relative"></div>
              </label>
              <label class="flex items-center justify-between cursor-pointer">
                <span class="text-xs font-medium text-slate-700 dark:text-slate-300">Maintenance Mode</span>
                <input type="checkbox" class="sr-only peer demo-switch">
                <div class="w-9 h-5 bg-slate-200 dark:bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-rose-600 relative"></div>
              </label>
            </div>
          </div>
        </div>
      `;
    }

    if (subview === "form-validation") {
      return `
        <div class="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 shadow-sm p-6 space-y-6 max-w-3xl">
          <div>
            <h3 class="text-base font-bold text-slate-900 dark:text-white">Interactive Client-Side Form Validation</h3>
            <p class="text-xs text-slate-500 mt-1">Submit the form to test live field validation, inline error messaging, and success feedback.</p>
          </div>

          <form id="demo-validate-form" class="space-y-4" novalidate>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label class="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">First Name <span class="text-rose-500">*</span></label>
                <input type="text" id="v-first-name" class="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none transition-all" placeholder="Khyle" required>
                <p class="text-[11px] text-rose-500 mt-1 hidden" id="err-first-name">First name is required.</p>
              </div>

              <div>
                <label class="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Last Name <span class="text-rose-500">*</span></label>
                <input type="text" id="v-last-name" class="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none transition-all" placeholder="Isaias" required>
                <p class="text-[11px] text-rose-500 mt-1 hidden" id="err-last-name">Last name is required.</p>
              </div>
            </div>

            <div>
              <label class="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Business Email Address <span class="text-rose-500">*</span></label>
              <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <i data-lucide="mail" class="w-4 h-4"></i>
                </div>
                <input type="email" id="v-email" class="w-full pl-10 pr-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none transition-all" placeholder="admin@enterprise.io" required>
              </div>
              <p class="text-[11px] text-rose-500 mt-1 hidden" id="err-email">Please enter a valid business email address.</p>
            </div>

            <div>
              <label class="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Organization Role <span class="text-rose-500">*</span></label>
              <select id="v-role" class="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none transition-all" required>
                <option value="">Select a role...</option>
                <option value="owner">Workspace Owner</option>
                <option value="lead">Lead Architect</option>
                <option value="dev">Software Engineer</option>
              </select>
              <p class="text-[11px] text-rose-500 mt-1 hidden" id="err-role">Please choose a role.</p>
            </div>

            <div>
              <label class="flex items-start gap-2.5 cursor-pointer">
                <input type="checkbox" id="v-agree" class="w-4 h-4 mt-0.5 text-blue-600 rounded border-slate-300 dark:border-slate-600 focus:ring-blue-500" required>
                <span class="text-xs text-slate-600 dark:text-slate-400">I agree to the DashPulse Terms of Service and Privacy Policy.</span>
              </label>
              <p class="text-[11px] text-rose-500 mt-1 hidden" id="err-agree">You must accept the terms before proceeding.</p>
            </div>

            <div class="pt-4 flex items-center gap-3 border-t border-slate-100 dark:border-slate-800">
              <button type="submit" class="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-sm transition-colors">
                Submit Form
              </button>
              <button type="reset" class="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 text-xs font-semibold transition-colors">
                Reset
              </button>
            </div>
          </form>
        </div>
      `;
    }

    // Default: 'forms' controls
    return `
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- Text Inputs -->
        <div class="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 shadow-sm p-6 space-y-4">
          <h3 class="text-sm font-bold text-slate-900 dark:text-white">Input Elements</h3>
          <p class="text-xs text-slate-500">Standard text inputs, placeholders, and icon prefixes.</p>

          <div class="space-y-4">
            <div>
              <label class="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Standard Input</label>
              <input type="text" class="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all" placeholder="Enter workspace title">
            </div>

            <div>
              <label class="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Input with Leading Icon</label>
              <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <i data-lucide="globe" class="w-4 h-4"></i>
                </div>
                <input type="url" class="w-full pl-10 pr-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all" placeholder="https://api.dashpulse.io">
              </div>
            </div>

            <div>
              <label class="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Password with Suffix Action</label>
              <div class="relative">
                <input type="password" id="demo-pwd-field" class="w-full pl-3.5 pr-10 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all" value="SecurePassword!123">
                <button type="button" id="demo-pwd-toggle" class="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600">
                  <i data-lucide="eye" class="w-4 h-4"></i>
                </button>
              </div>
            </div>

            <div>
              <label class="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Disabled Input</label>
              <input type="text" disabled class="w-full px-3.5 py-2.5 bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 rounded-xl text-xs text-slate-400 dark:text-slate-600 cursor-not-allowed" value="Read-only system generated ID: #SYS-8821">
            </div>
          </div>
        </div>

        <!-- Textarea, File, Range -->
        <div class="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 shadow-sm p-6 space-y-4">
          <h3 class="text-sm font-bold text-slate-900 dark:text-white">Textarea, Upload & Range</h3>
          <p class="text-xs text-slate-500">Multi-line inputs, sliders, and dropzone triggers.</p>

          <div class="space-y-4">
            <div>
              <label class="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Description Textarea</label>
              <textarea rows="3" class="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all" placeholder="Enter notes or markdown content..."></textarea>
            </div>

            <div>
              <label class="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">File Upload</label>
              <input type="file" class="w-full text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-blue-50 file:text-blue-700 dark:file:bg-blue-900/40 dark:file:text-blue-300 hover:file:bg-blue-100 cursor-pointer">
            </div>

            <div>
              <div class="flex justify-between items-center mb-1.5">
                <label class="text-xs font-semibold text-slate-700 dark:text-slate-300">Volume Threshold</label>
                <span class="text-xs font-mono font-bold text-blue-600 dark:text-blue-400" id="range-val">75%</span>
              </div>
              <input type="range" id="demo-range" min="0" max="100" value="75" class="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-600">
            </div>
          </div>
        </div>
      </div>
    `;
  }

  function initInteractions(container, subview) {
    // Password toggle
    const pwdToggle = container.querySelector("#demo-pwd-toggle");
    const pwdField = container.querySelector("#demo-pwd-field");
    if (pwdToggle && pwdField) {
      pwdToggle.addEventListener("click", () => {
        const isPwd = pwdField.type === "password";
        pwdField.type = isPwd ? "text" : "password";
        pwdToggle.innerHTML = `<i data-lucide="${isPwd ? 'eye-off' : 'eye'}" class="w-4 h-4"></i>`;
        if (window.lucide) window.lucide.createIcons();
      });
    }

    // Range slider value
    const range = container.querySelector("#demo-range");
    const rangeVal = container.querySelector("#range-val");
    if (range && rangeVal) {
      range.addEventListener("input", (e) => {
        rangeVal.textContent = `${e.target.value}%`;
      });
    }

    // Form switches toast
    container.querySelectorAll(".demo-switch").forEach(sw => {
      sw.addEventListener("change", (e) => {
        DashComponents.showToast(`Toggle state: ${e.target.checked ? "ON" : "OFF"}`, "info");
      });
    });

    // Form validation
    const valForm = container.querySelector("#demo-validate-form");
    if (valForm) {
      valForm.addEventListener("submit", (e) => {
        e.preventDefault();
        let valid = true;

        const firstName = container.querySelector("#v-first-name");
        const errFirst = container.querySelector("#err-first-name");
        if (!firstName.value.trim()) {
          firstName.classList.add("border-rose-500", "focus:border-rose-500");
          errFirst.classList.remove("hidden");
          valid = false;
        } else {
          firstName.classList.remove("border-rose-500");
          firstName.classList.add("border-emerald-500");
          errFirst.classList.add("hidden");
        }

        const lastName = container.querySelector("#v-last-name");
        const errLast = container.querySelector("#err-last-name");
        if (!lastName.value.trim()) {
          lastName.classList.add("border-rose-500", "focus:border-rose-500");
          errLast.classList.remove("hidden");
          valid = false;
        } else {
          lastName.classList.remove("border-rose-500");
          lastName.classList.add("border-emerald-500");
          errLast.classList.add("hidden");
        }

        const email = container.querySelector("#v-email");
        const errEmail = container.querySelector("#err-email");
        if (!email.value.trim() || !email.value.includes("@")) {
          email.classList.add("border-rose-500", "focus:border-rose-500");
          errEmail.classList.remove("hidden");
          valid = false;
        } else {
          email.classList.remove("border-rose-500");
          email.classList.add("border-emerald-500");
          errEmail.classList.add("hidden");
        }

        const role = container.querySelector("#v-role");
        const errRole = container.querySelector("#err-role");
        if (!role.value) {
          role.classList.add("border-rose-500");
          errRole.classList.remove("hidden");
          valid = false;
        } else {
          role.classList.remove("border-rose-500");
          role.classList.add("border-emerald-500");
          errRole.classList.add("hidden");
        }

        const agree = container.querySelector("#v-agree");
        const errAgree = container.querySelector("#err-agree");
        if (!agree.checked) {
          errAgree.classList.remove("hidden");
          valid = false;
        } else {
          errAgree.classList.add("hidden");
        }

        if (valid) {
          DashComponents.showToast("Form successfully validated and submitted!", "success");
          valForm.reset();
        } else {
          DashComponents.showToast("Please review the highlighted validation errors.", "error");
        }
      });
    }
  }

  return {
    render
  };
})();
