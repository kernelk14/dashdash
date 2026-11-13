/**
 * DashPulse Admin Dashboard Template
 * Page: System & Workspace Settings
 */

window.SettingsPage = (function () {
  let activeSection = "profile";

  function render(container) {
    DashComponents.updateBreadcrumbs([
      { label: "Dashboard", href: "#dashboard" },
      { label: "Settings", href: "#settings" }
    ]);

    const settings = DashData.getSettings();

    container.innerHTML = `
      <div class="space-y-6">
        <!-- Header -->
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 class="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">System Settings</h1>
            <p class="text-sm text-slate-500 dark:text-slate-400 mt-1">Configure profile details, workspace defaults, security keys, and visual preferences.</p>
          </div>
          <div class="flex items-center gap-3">
            <button id="btn-reset-defaults" type="button" class="px-3.5 py-2 text-xs font-medium text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg shadow-sm transition-colors">
              Reset to Defaults
            </button>
            <button id="btn-save-settings-top" type="button" class="px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm transition-colors flex items-center gap-1.5">
              <i data-lucide="check" class="w-3.5 h-3.5"></i> Save Settings
            </button>
          </div>
        </div>

        <!-- Settings Container: Sidebar Tabs + Content Pane -->
        <div class="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
          <!-- Section Nav Sidebar -->
          <div class="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 shadow-sm p-3 space-y-1">
            <button type="button" data-sec="profile" class="settings-nav-btn w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-colors ${activeSection === 'profile' ? 'bg-blue-50 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50'}">
              <i data-lucide="user" class="w-4 h-4"></i> Profile & Account
            </button>
            <button type="button" data-sec="preferences" class="settings-nav-btn w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-colors ${activeSection === 'preferences' ? 'bg-blue-50 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50'}">
              <i data-lucide="sliders" class="w-4 h-4"></i> Preferences
            </button>
            <button type="button" data-sec="notifications" class="settings-nav-btn w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-colors ${activeSection === 'notifications' ? 'bg-blue-50 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50'}">
              <i data-lucide="bell" class="w-4 h-4"></i> Notifications
            </button>
            <button type="button" data-sec="security" class="settings-nav-btn w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-colors ${activeSection === 'security' ? 'bg-blue-50 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50'}">
              <i data-lucide="shield-check" class="w-4 h-4"></i> Security & 2FA
            </button>
            <button type="button" data-sec="appearance" class="settings-nav-btn w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-colors ${activeSection === 'appearance' ? 'bg-blue-50 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50'}">
              <i data-lucide="palette" class="w-4 h-4"></i> Appearance & Theme
            </button>
          </div>

          <!-- Section Content Panel (3 cols) -->
          <div class="lg:col-span-3 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 shadow-sm p-6" id="settings-content-pane">
            <!-- Dynamically rendered section -->
          </div>
        </div>
      </div>

      <!-- 2FA Setup Modal Root -->
      <div id="twofa-modal-root"></div>
    `;

    if (window.lucide) window.lucide.createIcons({ root: container });

    renderActiveSection();

    // Section nav handlers
    container.querySelectorAll(".settings-nav-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        activeSection = btn.dataset.sec;
        container.querySelectorAll(".settings-nav-btn").forEach(b => {
          b.className = "settings-nav-btn w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-colors text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50";
        });
        btn.className = "settings-nav-btn w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-colors bg-blue-50 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400";
        renderActiveSection();
      });
    });

    // Reset to defaults
    const resetBtn = document.getElementById("btn-reset-defaults");
    if (resetBtn) {
      resetBtn.addEventListener("click", () => {
        DashComponents.confirmModal({
          title: "Reset Settings to Factory Defaults",
          message: "Are you sure you want to revert all workspace and account settings to default values?",
          confirmText: "Reset Defaults",
          confirmVariant: "danger",
          onConfirm: () => {
            DashData.resetAllData();
            DashComponents.showToast("Settings reset to defaults", "info");
            render(container);
          }
        });
      });
    }

    // Top Save button
    const saveTopBtn = document.getElementById("btn-save-settings-top");
    if (saveTopBtn) {
      saveTopBtn.addEventListener("click", () => {
        saveCurrentForm();
      });
    }
  }

  function renderActiveSection() {
    const pane = document.getElementById("settings-content-pane");
    if (!pane) return;

    const s = DashData.getSettings();

    if (activeSection === "profile") {
      pane.innerHTML = `
        <div class="space-y-6">
          <div class="border-b border-slate-100 dark:border-slate-800 pb-4">
            <h2 class="text-base font-bold text-slate-900 dark:text-white">Profile & Account Identity</h2>
            <p class="text-xs text-slate-500 mt-0.5">Your personal credentials and public workspace display details.</p>
          </div>

          <!-- Avatar Section -->
          <div class="flex items-center gap-5">
            <img id="settings-avatar-preview" src="${s.profile.avatar}" alt="Avatar" class="w-16 h-16 rounded-2xl object-cover border-2 border-slate-200 dark:border-slate-700 shadow-sm">
            <div>
              <div class="flex items-center gap-2">
                <button type="button" id="btn-change-avatar" class="px-3 py-1.5 text-xs font-semibold bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 rounded-lg shadow-sm transition-colors">
                  Upload Avatar
                </button>
                <button type="button" id="btn-remove-avatar" class="px-3 py-1.5 text-xs font-medium text-rose-600 hover:text-rose-700 dark:text-rose-400 transition-colors">
                  Remove
                </button>
              </div>
              <p class="text-[11px] text-slate-400 mt-1">JPG, GIF, or PNG. Maximum file size: 2MB.</p>
            </div>
          </div>

          <form id="settings-profile-form" class="space-y-4 text-xs">
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label class="block font-semibold text-slate-700 dark:text-slate-300 mb-1">First Name</label>
                <input type="text" id="set-fname" value="${s.profile.firstName}" class="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:bg-white dark:focus:bg-slate-900 focus:ring-2 focus:ring-blue-500">
              </div>
              <div>
                <label class="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Last Name</label>
                <input type="text" id="set-lname" value="${s.profile.lastName}" class="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:bg-white dark:focus:bg-slate-900 focus:ring-2 focus:ring-blue-500">
              </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label class="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Primary Email</label>
                <input type="email" id="set-email" value="${s.profile.email}" class="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:bg-white dark:focus:bg-slate-900 focus:ring-2 focus:ring-blue-500">
              </div>
              <div>
                <label class="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Phone Number</label>
                <input type="tel" id="set-phone" value="${s.profile.phone}" class="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:bg-white dark:focus:bg-slate-900 focus:ring-2 focus:ring-blue-500">
              </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label class="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Timezone</label>
                <select id="set-timezone" class="w-full px-3 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white">
                  <option value="America/New_York" ${s.profile.timezone === 'America/New_York' ? 'selected' : ''}>Eastern Time (US & Canada)</option>
                  <option value="America/Los_Angeles" ${s.profile.timezone === 'America/Los_Angeles' ? 'selected' : ''}>Pacific Time (US & Canada)</option>
                  <option value="Europe/London" ${s.profile.timezone === 'Europe/London' ? 'selected' : ''}>London (GMT)</option>
                  <option value="Europe/Berlin" ${s.profile.timezone === 'Europe/Berlin' ? 'selected' : ''}>Berlin, Paris (CET)</option>
                  <option value="Asia/Tokyo" ${s.profile.timezone === 'Asia/Tokyo' ? 'selected' : ''}>Tokyo (JST)</option>
                </select>
              </div>
              <div>
                <label class="block font-semibold text-slate-700 dark:text-slate-300 mb-1">System Language</label>
                <select id="set-lang" class="w-full px-3 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white">
                  <option value="en-US">English (United States)</option>
                  <option value="en-GB">English (United Kingdom)</option>
                  <option value="es-ES">Español</option>
                  <option value="fr-FR">Français</option>
                  <option value="de-DE">Deutsch</option>
                  <option value="ja-JP">日本語</option>
                </select>
              </div>
            </div>

            <div>
              <label class="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Executive Bio</label>
              <textarea id="set-bio" rows="3" class="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:bg-white dark:focus:bg-slate-900 focus:ring-2 focus:ring-blue-500">${s.profile.bio}</textarea>
            </div>

            <div class="flex items-center justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
              <button type="button" class="btn-cancel-settings px-4 py-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200">
                Cancel
              </button>
              <button type="submit" class="px-5 py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 shadow-sm">
                Save Profile
              </button>
            </div>
          </form>
        </div>
      `;

      // Upload simulated
      document.getElementById("btn-change-avatar")?.addEventListener("click", () => {
        const avatars = [
          "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
          "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80"
        ];
        const next = avatars[Math.floor(Math.random() * avatars.length)];
        s.profile.avatar = next;
        DashData.updateSettings(s);
        document.getElementById("settings-avatar-preview").src = next;
        DashComponents.showToast("Avatar image updated", "success");
      });

      document.getElementById("btn-remove-avatar")?.addEventListener("click", () => {
        s.profile.avatar = "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80";
        DashData.updateSettings(s);
        document.getElementById("settings-avatar-preview").src = s.profile.avatar;
        DashComponents.showToast("Avatar reset to placeholder", "info");
      });

      document.getElementById("settings-profile-form")?.addEventListener("submit", (e) => {
        e.preventDefault();
        saveCurrentForm();
      });

    } else if (activeSection === "preferences") {
      pane.innerHTML = `
        <div class="space-y-6">
          <div class="border-b border-slate-100 dark:border-slate-800 pb-4">
            <h2 class="text-base font-bold text-slate-900 dark:text-white">Workspace Preferences</h2>
            <p class="text-xs text-slate-500 mt-0.5">Customize your navigation shortcuts, pagination density, and default views.</p>
          </div>

          <form id="settings-pref-form" class="space-y-4 text-xs">
            <div>
              <label class="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Default Landing Dashboard</label>
              <select id="pref-landing" class="w-full px-3 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white">
                <option value="dashboard" ${s.preferences.defaultLandingPage === 'dashboard' ? 'selected' : ''}>Executive Overview</option>
                <option value="analytics" ${s.preferences.defaultLandingPage === 'analytics' ? 'selected' : ''}>Analytics & Deep Metrics</option>
                <option value="users" ${s.preferences.defaultLandingPage === 'users' ? 'selected' : ''}>User Management</option>
                <option value="orders" ${s.preferences.defaultLandingPage === 'orders' ? 'selected' : ''}>Orders & Invoices</option>
              </select>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label class="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Default Table Rows</label>
                <select id="pref-rows" class="w-full px-3 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white">
                  <option value="5" ${s.preferences.rowsPerPage === 5 ? 'selected' : ''}>5 rows</option>
                  <option value="10" ${s.preferences.rowsPerPage === 10 ? 'selected' : ''}>10 rows</option>
                  <option value="20" ${s.preferences.rowsPerPage === 20 ? 'selected' : ''}>20 rows</option>
                </select>
              </div>

              <div>
                <label class="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Display Currency</label>
                <select id="pref-curr" class="w-full px-3 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white">
                  <option value="USD" ${s.preferences.currency === 'USD' ? 'selected' : ''}>USD ($ - United States Dollar)</option>
                  <option value="EUR" ${s.preferences.currency === 'EUR' ? 'selected' : ''}>EUR (€ - Euro)</option>
                  <option value="GBP" ${s.preferences.currency === 'GBP' ? 'selected' : ''}>GBP (£ - British Pound)</option>
                  <option value="JPY" ${s.preferences.currency === 'JPY' ? 'selected' : ''}>JPY (¥ - Japanese Yen)</option>
                </select>
              </div>
            </div>

            <div>
              <label class="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Auto Refresh Rate</label>
              <select id="pref-refresh" class="w-full px-3 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white">
                <option value="off" ${s.preferences.autoRefreshInterval === 'off' ? 'selected' : ''}>Manual refresh only</option>
                <option value="30s" ${s.preferences.autoRefreshInterval === '30s' ? 'selected' : ''}>Every 30 seconds</option>
                <option value="1m" ${s.preferences.autoRefreshInterval === '1m' ? 'selected' : ''}>Every 1 minute</option>
                <option value="5m" ${s.preferences.autoRefreshInterval === '5m' ? 'selected' : ''}>Every 5 minutes</option>
              </select>
            </div>

            <div class="flex items-center justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
              <button type="submit" class="px-5 py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 shadow-sm">
                Save Preferences
              </button>
            </div>
          </form>
        </div>
      `;

      document.getElementById("settings-pref-form")?.addEventListener("submit", (e) => {
        e.preventDefault();
        saveCurrentForm();
      });

    } else if (activeSection === "notifications") {
      pane.innerHTML = `
        <div class="space-y-6">
          <div class="border-b border-slate-100 dark:border-slate-800 pb-4">
            <h2 class="text-base font-bold text-slate-900 dark:text-white">Notification Channels & Alerts</h2>
            <p class="text-xs text-slate-500 mt-0.5">Control which event notifications are delivered via email, SMS, or browser toast.</p>
          </div>

          <div class="space-y-4 text-xs">
            <h3 class="text-xs font-semibold uppercase tracking-wider text-slate-400">Email Alerts</h3>

            <div class="space-y-3">
              <label class="flex items-center justify-between p-3.5 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 cursor-pointer">
                <div>
                  <div class="font-semibold text-slate-900 dark:text-white">New Order & Subscription Notifications</div>
                  <div class="text-[11px] text-slate-500 mt-0.5">Receive immediate notification whenever an invoice is paid or converted.</div>
                </div>
                <input type="checkbox" id="notif-orders" ${s.notifications.emailOrderAlerts ? 'checked' : ''} class="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500">
              </label>

              <label class="flex items-center justify-between p-3.5 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 cursor-pointer">
                <div>
                  <div class="font-semibold text-slate-900 dark:text-white">Weekly Executive Financial Digest</div>
                  <div class="text-[11px] text-slate-500 mt-0.5">Receive aggregated KPI metrics, ARR churn, and weekly cohort velocity.</div>
                </div>
                <input type="checkbox" id="notif-digest" ${s.notifications.emailWeeklyDigest ? 'checked' : ''} class="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500">
              </label>

              <label class="flex items-center justify-between p-3.5 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 cursor-pointer">
                <div>
                  <div class="font-semibold text-slate-900 dark:text-white">Security & Access Events</div>
                  <div class="text-[11px] text-slate-500 mt-0.5">Alert immediately upon unusual IP logins, 2FA modifications, or credential rotations.</div>
                </div>
                <input type="checkbox" id="notif-sec" ${s.notifications.emailSecurityAlerts ? 'checked' : ''} class="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500">
              </label>
            </div>

            <h3 class="text-xs font-semibold uppercase tracking-wider text-slate-400 pt-2">Push & SMS Channels</h3>

            <div class="space-y-3">
              <label class="flex items-center justify-between p-3.5 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 cursor-pointer">
                <div>
                  <div class="font-semibold text-slate-900 dark:text-white">New User Invitations</div>
                  <div class="text-[11px] text-slate-500 mt-0.5">Push notify when an invited team member accepts their onboarding link.</div>
                </div>
                <input type="checkbox" id="notif-push-user" ${s.notifications.pushNewUser ? 'checked' : ''} class="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500">
              </label>

              <label class="flex items-center justify-between p-3.5 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 cursor-pointer">
                <div>
                  <div class="font-semibold text-slate-900 dark:text-white">SMS Critical Outage Alerts</div>
                  <div class="text-[11px] text-slate-500 mt-0.5">Send urgent SMS to registered phone for P1 cluster downtime.</div>
                </div>
                <input type="checkbox" id="notif-sms" ${s.notifications.smsCriticalAlerts ? 'checked' : ''} class="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500">
              </label>
            </div>

            <div class="flex items-center justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
              <button type="button" id="btn-save-notifs" class="px-5 py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 shadow-sm">
                Save Notification Settings
              </button>
            </div>
          </div>
        </div>
      `;

      document.getElementById("btn-save-notifs")?.addEventListener("click", () => {
        saveCurrentForm();
      });

    } else if (activeSection === "security") {
      pane.innerHTML = `
        <div class="space-y-6">
          <div class="border-b border-slate-100 dark:border-slate-800 pb-4">
            <h2 class="text-base font-bold text-slate-900 dark:text-white">Authentication & Access Security</h2>
            <p class="text-xs text-slate-500 mt-0.5">Configure MFA credentials, password rotation, and active session tokens.</p>
          </div>

          <!-- Two Factor Authentication -->
          <div class="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div class="flex items-start gap-3">
              <div class="p-2.5 rounded-xl bg-blue-100 text-blue-600 dark:bg-blue-950 dark:text-blue-400 mt-0.5">
                <i data-lucide="shield" class="w-5 h-5"></i>
              </div>
              <div>
                <h3 class="text-xs font-bold text-slate-900 dark:text-white">Two-Factor Authentication (2FA)</h3>
                <p class="text-xs text-slate-500 mt-0.5">Protect your account using time-based one-time passcodes (TOTP).</p>
                <div class="mt-2 text-xs font-semibold ${s.security.twoFactorEnabled ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-400'}">
                  Status: ${s.security.twoFactorEnabled ? 'Active and Enforced' : 'Disabled'}
                </div>
              </div>
            </div>
            <button type="button" id="btn-config-2fa" class="px-4 py-2 text-xs font-semibold rounded-lg shadow-sm transition-colors ${s.security.twoFactorEnabled ? 'bg-rose-50 text-rose-600 hover:bg-rose-100 dark:bg-rose-950/60 dark:text-rose-400' : 'bg-blue-600 text-white hover:bg-blue-700'}">
              ${s.security.twoFactorEnabled ? 'Disable 2FA' : 'Enable 2FA Setup'}
            </button>
          </div>

          <!-- Change Password Form -->
          <div class="space-y-4 pt-2">
            <h3 class="text-xs font-semibold uppercase tracking-wider text-slate-400">Change Account Password</h3>
            <form id="change-password-form" class="space-y-3 text-xs max-w-md">
              <div>
                <label class="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Current Password</label>
                <input type="password" id="pw-current" required placeholder="••••••••••••" class="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white">
              </div>
              <div>
                <label class="block font-semibold text-slate-700 dark:text-slate-300 mb-1">New Password</label>
                <input type="password" id="pw-new" required placeholder="Minimum 8 characters" class="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white">
                <div class="mt-2 flex items-center gap-1.5">
                  <div class="flex-1 h-1.5 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                    <div id="pw-meter-bar" class="h-full w-0 bg-emerald-500 transition-all duration-300"></div>
                  </div>
                  <span id="pw-meter-label" class="text-[10px] text-slate-400">Strength</span>
                </div>
              </div>
              <div>
                <label class="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Confirm New Password</label>
                <input type="password" id="pw-confirm" required placeholder="Re-enter new password" class="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white">
              </div>

              <button type="submit" class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold shadow-sm transition-colors">
                Update Password
              </button>
            </form>
          </div>

          <!-- Active Sessions -->
          <div class="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800">
            <div class="flex items-center justify-between">
              <div>
                <h3 class="text-xs font-semibold uppercase tracking-wider text-slate-400">Active Authorized Sessions</h3>
                <p class="text-xs text-slate-500 mt-0.5">Devices currently signed into your admin credentials</p>
              </div>
              <button type="button" id="btn-revoke-sessions" class="px-3 py-1.5 text-xs font-semibold text-rose-600 hover:text-rose-700 dark:text-rose-400 rounded-lg border border-rose-200 dark:border-rose-900/60 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors">
                Revoke All Others
              </button>
            </div>

            <div class="space-y-2.5 text-xs" id="active-sessions-list">
              ${s.security.activeSessions.map(sess => `
                <div class="flex items-center justify-between p-3 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40">
                  <div class="flex items-center gap-3">
                    <i data-lucide="${sess.device.includes('iPhone') ? 'smartphone' : 'laptop'}" class="w-4 h-4 text-slate-400"></i>
                    <div>
                      <div class="font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                        ${sess.device}
                        ${sess.current ? '<span class="px-1.5 py-0.2 rounded text-[10px] font-semibold bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">This Device</span>' : ''}
                      </div>
                      <div class="text-[11px] text-slate-400">${sess.ip} • ${sess.location} • ${sess.date}</div>
                    </div>
                  </div>
                  ${!sess.current ? `
                    <button type="button" data-sess-id="${sess.id}" class="btn-revoke-single text-xs text-rose-500 hover:text-rose-700 p-1">
                      Revoke
                    </button>
                  ` : ''}
                </div>
              `).join("")}
            </div>
          </div>
        </div>
      `;

      // 2FA button
      document.getElementById("btn-config-2fa")?.addEventListener("click", () => {
        s.security.twoFactorEnabled = !s.security.twoFactorEnabled;
        DashData.updateSettings(s);
        DashComponents.showToast(`2FA has been ${s.security.twoFactorEnabled ? 'enabled' : 'disabled'}`, s.security.twoFactorEnabled ? 'success' : 'warning');
        renderActiveSection();
      });

      // Password input meter
      const pwInput = document.getElementById("pw-new");
      const meterBar = document.getElementById("pw-meter-bar");
      const meterLabel = document.getElementById("pw-meter-label");
      if (pwInput && meterBar && meterLabel) {
        pwInput.addEventListener("input", (e) => {
          const val = e.target.value;
          if (val.length === 0) {
            meterBar.style.width = "0%";
            meterLabel.textContent = "Strength";
          } else if (val.length < 6) {
            meterBar.style.width = "30%";
            meterBar.className = "h-full bg-rose-500 transition-all duration-300";
            meterLabel.textContent = "Weak";
          } else if (val.length < 10) {
            meterBar.style.width = "65%";
            meterBar.className = "h-full bg-amber-500 transition-all duration-300";
            meterLabel.textContent = "Moderate";
          } else {
            meterBar.style.width = "100%";
            meterBar.className = "h-full bg-emerald-500 transition-all duration-300";
            meterLabel.textContent = "Strong";
          }
        });
      }

      // Password form
      document.getElementById("change-password-form")?.addEventListener("submit", (e) => {
        e.preventDefault();
        const p1 = document.getElementById("pw-new").value;
        const p2 = document.getElementById("pw-confirm").value;
        if (p1 !== p2) {
          DashComponents.showToast("New passwords do not match!", "error");
          return;
        }
        DashComponents.showToast("Password updated successfully!", "success");
        e.target.reset();
        meterBar.style.width = "0%";
        meterLabel.textContent = "Strength";
      });

      // Revoke sessions
      document.getElementById("btn-revoke-sessions")?.addEventListener("click", () => {
        s.security.activeSessions = s.security.activeSessions.filter(sess => sess.current);
        DashData.updateSettings(s);
        DashComponents.showToast("All other active sessions revoked", "success");
        renderActiveSection();
      });

      pane.querySelectorAll(".btn-revoke-single").forEach(b => {
        b.addEventListener("click", () => {
          const id = b.dataset.sessId;
          s.security.activeSessions = s.security.activeSessions.filter(sess => sess.id !== id);
          DashData.updateSettings(s);
          DashComponents.showToast("Session revoked", "info");
          renderActiveSection();
        });
      });

    } else if (activeSection === "appearance") {
      const currentTheme = localStorage.getItem("dashpulse-theme") || "system";

      pane.innerHTML = `
        <div class="space-y-6">
          <div class="border-b border-slate-100 dark:border-slate-800 pb-4">
            <h2 class="text-base font-bold text-slate-900 dark:text-white">Appearance & Theme Tokens</h2>
            <p class="text-xs text-slate-500 mt-0.5">Customize color palettes, dark mode triggers, and component spacing density.</p>
          </div>

          <!-- Theme Select Cards -->
          <div class="space-y-3">
            <h3 class="text-xs font-semibold uppercase tracking-wider text-slate-400">Theme Mode</h3>
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <!-- Light -->
              <label class="theme-choice-card border-2 rounded-2xl p-4 flex flex-col justify-between cursor-pointer transition-all ${currentTheme === 'light' ? 'border-blue-600 bg-blue-50/30 dark:bg-blue-950/20' : 'border-slate-200 dark:border-slate-800 hover:border-slate-300'}">
                <div class="flex items-center justify-between mb-3">
                  <div class="flex items-center gap-2">
                    <i data-lucide="sun" class="w-4 h-4 text-amber-500"></i>
                    <span class="text-xs font-bold text-slate-900 dark:text-white">Light Mode</span>
                  </div>
                  <input type="radio" name="app-theme" value="light" ${currentTheme === 'light' ? 'checked' : ''} class="rounded-full text-blue-600 focus:ring-blue-500">
                </div>
                <div class="h-16 rounded-xl bg-slate-100 border border-slate-200 p-2 flex gap-1.5">
                  <div class="w-5 h-full rounded bg-white shadow-xs"></div>
                  <div class="flex-1 space-y-1">
                    <div class="h-2 w-12 bg-slate-300 rounded"></div>
                    <div class="h-6 w-full bg-white rounded shadow-xs"></div>
                  </div>
                </div>
              </label>

              <!-- Dark -->
              <label class="theme-choice-card border-2 rounded-2xl p-4 flex flex-col justify-between cursor-pointer transition-all ${currentTheme === 'dark' ? 'border-blue-600 bg-blue-50/30 dark:bg-blue-950/20' : 'border-slate-200 dark:border-slate-800 hover:border-slate-300'}">
                <div class="flex items-center justify-between mb-3">
                  <div class="flex items-center gap-2">
                    <i data-lucide="moon" class="w-4 h-4 text-indigo-400"></i>
                    <span class="text-xs font-bold text-slate-900 dark:text-white">Dark Mode</span>
                  </div>
                  <input type="radio" name="app-theme" value="dark" ${currentTheme === 'dark' ? 'checked' : ''} class="rounded-full text-blue-600 focus:ring-blue-500">
                </div>
                <div class="h-16 rounded-xl bg-slate-900 border border-slate-800 p-2 flex gap-1.5">
                  <div class="w-5 h-full rounded bg-slate-800"></div>
                  <div class="flex-1 space-y-1">
                    <div class="h-2 w-12 bg-slate-700 rounded"></div>
                    <div class="h-6 w-full bg-slate-800 rounded"></div>
                  </div>
                </div>
              </label>

              <!-- System -->
              <label class="theme-choice-card border-2 rounded-2xl p-4 flex flex-col justify-between cursor-pointer transition-all ${currentTheme === 'system' ? 'border-blue-600 bg-blue-50/30 dark:bg-blue-950/20' : 'border-slate-200 dark:border-slate-800 hover:border-slate-300'}">
                <div class="flex items-center justify-between mb-3">
                  <div class="flex items-center gap-2">
                    <i data-lucide="monitor" class="w-4 h-4 text-slate-400"></i>
                    <span class="text-xs font-bold text-slate-900 dark:text-white">System Sync</span>
                  </div>
                  <input type="radio" name="app-theme" value="system" ${currentTheme === 'system' ? 'checked' : ''} class="rounded-full text-blue-600 focus:ring-blue-500">
                </div>
                <div class="h-16 rounded-xl bg-gradient-to-r from-slate-100 to-slate-900 border border-slate-200 dark:border-slate-800 p-2 flex items-center justify-center">
                  <span class="text-[10px] font-mono text-slate-500 dark:text-slate-400 bg-white/80 dark:bg-slate-900/80 px-2 py-0.5 rounded shadow">OS Synchronized</span>
                </div>
              </label>
            </div>
          </div>

          <!-- Accent Palette -->
          <div class="space-y-3 pt-2">
            <h3 class="text-xs font-semibold uppercase tracking-wider text-slate-400">Primary Accent</h3>
            <div class="flex items-center gap-3">
              <button type="button" data-accent="blue" class="accent-color-btn w-8 h-8 rounded-full bg-blue-600 ring-2 ring-offset-2 ring-blue-600 transition-all"></button>
              <button type="button" data-accent="indigo" class="accent-color-btn w-8 h-8 rounded-full bg-indigo-600 transition-all hover:scale-105"></button>
              <button type="button" data-accent="emerald" class="accent-color-btn w-8 h-8 rounded-full bg-emerald-600 transition-all hover:scale-105"></button>
              <button type="button" data-accent="purple" class="accent-color-btn w-8 h-8 rounded-full bg-purple-600 transition-all hover:scale-105"></button>
              <button type="button" data-accent="rose" class="accent-color-btn w-8 h-8 rounded-full bg-rose-600 transition-all hover:scale-105"></button>
            </div>
          </div>

          <div class="flex items-center justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
            <button type="button" id="btn-save-appearance" class="px-5 py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 shadow-sm text-xs">
              Apply Appearance
            </button>
          </div>
        </div>
      `;

      // Theme radio change
      pane.querySelectorAll("input[name='app-theme']").forEach(radio => {
        radio.addEventListener("change", (e) => {
          const val = e.target.value;
          localStorage.setItem("dashpulse-theme", val);
          if (window.AppTheme) {
            window.AppTheme.applyTheme(val);
          }
          DashComponents.showToast(`Theme updated to ${val}`, "info");
          renderActiveSection();
        });
      });

      // Accent buttons
      pane.querySelectorAll(".accent-color-btn").forEach(btn => {
        btn.addEventListener("click", () => {
          DashComponents.showToast(`Primary accent set to ${btn.dataset.accent}`, "success");
        });
      });

      document.getElementById("btn-save-appearance")?.addEventListener("click", () => {
        DashComponents.showToast("Appearance tokens persisted!", "success");
      });
    }

    if (window.lucide) window.lucide.createIcons({ root: pane });
  }

  function saveCurrentForm() {
    const s = DashData.getSettings();

    // Check which section is active and update
    if (activeSection === "profile") {
      const fn = document.getElementById("set-fname");
      const ln = document.getElementById("set-lname");
      const em = document.getElementById("set-email");
      const ph = document.getElementById("set-phone");
      const tz = document.getElementById("set-timezone");
      const bio = document.getElementById("set-bio");

      if (fn && ln && em) {
        s.profile.firstName = fn.value.trim();
        s.profile.lastName = ln.value.trim();
        s.profile.email = em.value.trim();
        if (ph) s.profile.phone = ph.value.trim();
        if (tz) s.profile.timezone = tz.value;
        if (bio) s.profile.bio = bio.value.trim();
      }
    } else if (activeSection === "preferences") {
      const lp = document.getElementById("pref-landing");
      const rp = document.getElementById("pref-rows");
      const cu = document.getElementById("pref-curr");
      const ar = document.getElementById("pref-refresh");

      if (lp) s.preferences.defaultLandingPage = lp.value;
      if (rp) s.preferences.rowsPerPage = parseInt(rp.value, 10);
      if (cu) s.preferences.currency = cu.value;
      if (ar) s.preferences.autoRefreshInterval = ar.value;
    } else if (activeSection === "notifications") {
      const o = document.getElementById("notif-orders");
      const d = document.getElementById("notif-digest");
      const sec = document.getElementById("notif-sec");
      const pu = document.getElementById("notif-push-user");
      const sms = document.getElementById("notif-sms");

      if (o) s.notifications.emailOrderAlerts = o.checked;
      if (d) s.notifications.emailWeeklyDigest = d.checked;
      if (sec) s.notifications.emailSecurityAlerts = sec.checked;
      if (pu) s.notifications.pushNewUser = pu.checked;
      if (sms) s.notifications.smsCriticalAlerts = sms.checked;
    }

    DashData.updateSettings(s);
    DashComponents.showToast("Settings changes saved successfully!", "success");
  }

  return { render };
})();
