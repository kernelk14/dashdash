/**
 * DashPulse Admin Dashboard Template
 * Page: Authentication Showcase (Sign In, Register, Forgot Password, Lock Screen)
 */

window.AuthShowcasePage = (function () {
  function render(container, activeMode = "login") {
    DashComponents.updateBreadcrumbs([
      { label: "Dashboard", href: "#dashboard" },
      { label: "Authentication Pages", href: "#auth-login" }
    ]);

    container.innerHTML = `
      <div class="space-y-6">
        <!-- Top Auth Nav Selector Tabs -->
        <div class="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
          <div>
            <h1 class="text-xl font-bold text-slate-900 dark:text-white">Authentication Flows</h1>
            <p class="text-xs text-slate-500">Preview and test production SaaS authentication screens</p>
          </div>
          <div class="flex items-center gap-2 text-xs">
            <button type="button" data-auth-tab="login" class="auth-switch-btn px-3 py-1.5 rounded-lg font-semibold transition-colors ${activeMode === 'login' ? 'bg-blue-600 text-white' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'}">Sign In</button>
            <button type="button" data-auth-tab="register" class="auth-switch-btn px-3 py-1.5 rounded-lg font-semibold transition-colors ${activeMode === 'register' ? 'bg-blue-600 text-white' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'}">Sign Up</button>
            <button type="button" data-auth-tab="forgot" class="auth-switch-btn px-3 py-1.5 rounded-lg font-semibold transition-colors ${activeMode === 'forgot' ? 'bg-blue-600 text-white' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'}">Forgot Password</button>
            <button type="button" data-auth-tab="lock" class="auth-switch-btn px-3 py-1.5 rounded-lg font-semibold transition-colors ${activeMode === 'lock' ? 'bg-blue-600 text-white' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'}">Lock Screen</button>
          </div>
        </div>

        <!-- Auth Card Container -->
        <div class="min-h-[60vh] flex items-center justify-center p-4" id="auth-panel-container">
          <!-- Dynamically populated based on activeMode -->
        </div>
      </div>
    `;

    renderMode(activeMode);

    container.querySelectorAll(".auth-switch-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const mode = btn.dataset.authTab;
        container.querySelectorAll(".auth-switch-btn").forEach(b => {
          b.className = "auth-switch-btn px-3 py-1.5 rounded-lg font-semibold transition-colors text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800";
        });
        btn.className = "auth-switch-btn px-3 py-1.5 rounded-lg font-semibold transition-colors bg-blue-600 text-white";
        renderMode(mode);
      });
    });
  }

  function renderMode(mode) {
    const root = document.getElementById("auth-panel-container");
    if (!root) return;

    if (mode === "login") {
      root.innerHTML = `
        <div class="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200/80 dark:border-slate-800/80 max-w-md w-full p-8 space-y-6">
          <div class="text-center space-y-2">
            <div class="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-500 text-white flex items-center justify-center mx-auto shadow-md shadow-blue-500/20">
              <i data-lucide="zap" class="w-6 h-6"></i>
            </div>
            <h2 class="text-xl font-bold text-slate-900 dark:text-white">Welcome Back</h2>
            <p class="text-xs text-slate-500">Sign in to your DashPulse enterprise dashboard</p>
          </div>

          <!-- Quick Demo Autofill Button -->
          <div class="p-2.5 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/60 flex items-center justify-between text-xs">
            <span class="text-blue-900 dark:text-blue-200 text-[11px] font-medium">Demo Admin Credentials</span>
            <button type="button" id="btn-autofill-login" class="px-2 py-1 rounded bg-blue-600 text-white font-semibold text-[10px] hover:bg-blue-700">Autofill</button>
          </div>

          <form id="auth-login-form" class="space-y-4 text-xs">
            <div>
              <label class="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Email Address</label>
              <input type="email" id="auth-email" required placeholder="alex.rivera@dashpulse.io" class="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:bg-white dark:focus:bg-slate-900 focus:ring-2 focus:ring-blue-500">
            </div>

            <div>
              <div class="flex items-center justify-between mb-1">
                <label class="font-semibold text-slate-700 dark:text-slate-300">Password</label>
                <a href="#auth-forgot" class="text-blue-600 dark:text-blue-400 hover:underline text-[11px]">Forgot?</a>
              </div>
              <input type="password" id="auth-pw" required placeholder="••••••••••••" class="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:bg-white dark:focus:bg-slate-900 focus:ring-2 focus:ring-blue-500">
            </div>

            <div class="flex items-center justify-between">
              <label class="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked class="rounded border-slate-300 text-blue-600 focus:ring-blue-500">
                <span class="text-slate-600 dark:text-slate-400 text-xs">Remember for 30 days</span>
              </label>
            </div>

            <button type="submit" class="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-md transition-colors">
              Sign In to Console
            </button>
          </form>

          <div class="text-center text-xs text-slate-500 pt-2 border-t border-slate-100 dark:border-slate-800">
            Don't have an organization seat? <a href="#auth-register" class="text-blue-600 dark:text-blue-400 font-semibold hover:underline">Start free trial</a>
          </div>
        </div>
      `;

      document.getElementById("btn-autofill-login")?.addEventListener("click", () => {
        document.getElementById("auth-email").value = "alex.rivera@dashpulse.io";
        document.getElementById("auth-pw").value = "DemonstrationPassword2026!";
      });

      document.getElementById("auth-login-form")?.addEventListener("submit", (e) => {
        e.preventDefault();
        DashComponents.showToast("Signed in successfully! Redirecting to dashboard...", "success");
        setTimeout(() => { window.location.hash = "#dashboard"; }, 600);
      });

    } else if (mode === "register") {
      root.innerHTML = `
        <div class="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200/80 dark:border-slate-800/80 max-w-md w-full p-8 space-y-6">
          <div class="text-center space-y-2">
            <h2 class="text-xl font-bold text-slate-900 dark:text-white">Create Enterprise Account</h2>
            <p class="text-xs text-slate-500">14-day free trial • No credit card required</p>
          </div>

          <form id="auth-reg-form" class="space-y-4 text-xs">
            <div>
              <label class="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Full Name</label>
              <input type="text" required placeholder="Elena Rostova" class="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white">
            </div>

            <div>
              <label class="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Company Work Email</label>
              <input type="email" required placeholder="elena@company.com" class="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white">
            </div>

            <div>
              <label class="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Create Secure Password</label>
              <input type="password" required placeholder="At least 8 characters" class="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white">
            </div>

            <label class="flex items-start gap-2 cursor-pointer text-slate-600 dark:text-slate-400">
              <input type="checkbox" required class="rounded border-slate-300 text-blue-600 focus:ring-blue-500 mt-0.5">
              <span>I agree to DashPulse Terms of Service, Privacy Policy, and SOC-2 data processing agreements.</span>
            </label>

            <button type="submit" class="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-md transition-colors">
              Create Free Workspace
            </button>
          </form>
        </div>
      `;

      document.getElementById("auth-reg-form")?.addEventListener("submit", (e) => {
        e.preventDefault();
        DashComponents.showToast("Account created! Welcome to DashPulse.", "success");
        setTimeout(() => { window.location.hash = "#dashboard"; }, 600);
      });

    } else if (mode === "forgot") {
      root.innerHTML = `
        <div class="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200/80 dark:border-slate-800/80 max-w-md w-full p-8 space-y-6">
          <div class="text-center space-y-2">
            <div class="w-12 h-12 rounded-2xl bg-amber-50 dark:bg-amber-950 text-amber-600 dark:text-amber-400 flex items-center justify-center mx-auto">
              <i data-lucide="key" class="w-6 h-6"></i>
            </div>
            <h2 class="text-xl font-bold text-slate-900 dark:text-white">Password Recovery</h2>
            <p class="text-xs text-slate-500">Enter your email and we'll dispatch a secure password reset token</p>
          </div>

          <form id="auth-forgot-form" class="space-y-4 text-xs">
            <div>
              <label class="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Registered Email</label>
              <input type="email" required placeholder="alex.rivera@dashpulse.io" class="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white">
            </div>

            <button type="submit" class="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-md transition-colors">
              Send Recovery Instructions
            </button>
          </form>

          <div class="text-center text-xs">
            <a href="#auth-login" class="text-slate-500 hover:text-slate-900 dark:hover:text-white font-medium flex items-center justify-center gap-1">
              <i data-lucide="arrow-left" class="w-3.5 h-3.5"></i> Back to login
            </a>
          </div>
        </div>
      `;

      document.getElementById("auth-forgot-form")?.addEventListener("submit", (e) => {
        e.preventDefault();
        DashComponents.showToast("Recovery link dispatched to email!", "success");
      });

    } else if (mode === "lock") {
      root.innerHTML = `
        <div class="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200/80 dark:border-slate-800/80 max-w-sm w-full p-8 space-y-6 text-center">
          <div class="relative w-20 h-20 mx-auto">
            <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80" alt="Avatar" class="w-full h-full rounded-3xl object-cover border-2 border-blue-500 shadow-md">
            <span class="absolute -bottom-1 -right-1 p-1 rounded-full bg-slate-900 text-white">
              <i data-lucide="lock" class="w-3.5 h-3.5"></i>
            </span>
          </div>

          <div>
            <h2 class="text-base font-bold text-slate-900 dark:text-white">Alex Rivera</h2>
            <p class="text-xs text-slate-400">Session locked due to inactivity</p>
          </div>

          <form id="auth-lock-form" class="space-y-3 text-xs">
            <input type="password" required placeholder="Enter password to unlock" class="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-center">
            <button type="submit" class="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold transition-colors">
              Unlock Console
            </button>
          </form>
        </div>
      `;

      document.getElementById("auth-lock-form")?.addEventListener("submit", (e) => {
        e.preventDefault();
        DashComponents.showToast("Session unlocked!", "success");
        setTimeout(() => { window.location.hash = "#dashboard"; }, 500);
      });
    }

    if (window.lucide) window.lucide.createIcons({ root: root });
  }

  return { render };
})();
