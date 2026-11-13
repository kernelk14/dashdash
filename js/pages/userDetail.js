/**
 * DashPulse Admin Dashboard Template
 * Page: User Details
 */

window.UserDetailPage = (function () {
  let activeTab = "overview";

  function render(container, params = {}) {
    const userId = params.id || "usr-001";
    let user = DashData.getUserById(userId);

    // Fallback if not found
    if (!user) {
      user = DashData.getUsers()[0];
    }

    DashComponents.updateBreadcrumbs([
      { label: "Dashboard", href: "#dashboard" },
      { label: "Users", href: "#users" },
      { label: user ? user.name : "User Profile", href: `#user-detail?id=${user ? user.id : ''}` }
    ]);

    const nameParts = (user.name || "").split(" ");
    const firstName = nameParts[0] || "";
    const lastName = nameParts.slice(1).join(" ") || "";

    container.innerHTML = `
      <div class="space-y-6">
        <!-- Top Back Link & Actions -->
        <div class="flex items-center justify-between">
          <a href="#users" class="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            <i data-lucide="arrow-left" class="w-4 h-4"></i>
            Back to Users Directory
          </a>
          <div class="flex items-center gap-2">
            <button id="btn-toggle-status" type="button" class="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors shadow-sm">
              <i data-lucide="${user.status === 'Active' ? 'pause-circle' : 'play-circle'}" class="w-3.5 h-3.5"></i>
              ${user.status === 'Active' ? 'Suspend Account' : 'Activate Account'}
            </button>
            <button id="btn-reset-password" type="button" class="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors shadow-sm">
              <i data-lucide="key" class="w-3.5 h-3.5"></i>
              Reset Password
            </button>
          </div>
        </div>

        <!-- User Profile Header Card -->
        <div class="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 shadow-sm p-6">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div class="flex items-start sm:items-center gap-4">
              <div class="relative">
                <img src="${user.avatar}" alt="${user.name}" class="w-20 h-20 rounded-2xl object-cover border-2 border-slate-100 dark:border-slate-800 shadow">
                <span class="absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white dark:border-slate-900 ${user.status === 'Active' ? 'bg-emerald-500' : 'bg-slate-400'}"></span>
              </div>
              <div>
                <div class="flex flex-wrap items-center gap-2.5">
                  <h1 class="text-xl font-bold text-slate-900 dark:text-white">${user.name}</h1>
                  ${DashComponents.getUserStatusBadge(user.status)}
                  <span class="px-2 py-0.5 rounded text-[11px] font-mono font-medium bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">${user.id}</span>
                </div>
                <div class="flex flex-wrap items-center gap-4 text-xs text-slate-500 dark:text-slate-400 mt-2">
                  <span class="flex items-center gap-1.5"><i data-lucide="mail" class="w-3.5 h-3.5"></i> ${user.email}</span>
                  <span class="flex items-center gap-1.5"><i data-lucide="briefcase" class="w-3.5 h-3.5"></i> ${user.role} (${user.department || 'Operations'})</span>
                  <span class="flex items-center gap-1.5"><i data-lucide="calendar" class="w-3.5 h-3.5"></i> Joined ${user.createdAt}</span>
                </div>
              </div>
            </div>

            <!-- Header Quick Stats -->
            <div class="flex items-center gap-6 border-t sm:border-t-0 sm:border-l border-slate-100 dark:border-slate-800 pt-4 sm:pt-0 sm:pl-6">
              <div>
                <div class="text-[11px] uppercase tracking-wider text-slate-400 font-semibold">Tier Plan</div>
                <div class="text-base font-bold text-slate-900 dark:text-white mt-0.5">${user.plan || 'Enterprise'}</div>
              </div>
              <div>
                <div class="text-[11px] uppercase tracking-wider text-slate-400 font-semibold">Total Spend</div>
                <div class="text-base font-bold text-emerald-600 dark:text-emerald-400 mt-0.5">${user.spend || '$14,850.00'}</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Tabbed Navigation -->
        <div class="border-b border-slate-200 dark:border-slate-800">
          <nav class="flex gap-4 text-xs font-semibold" aria-label="Tabs">
            <button type="button" data-tab="overview" class="tab-btn pb-3 border-b-2 transition-colors ${activeTab === 'overview' ? 'border-blue-600 text-blue-600 dark:text-blue-400' : 'border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}">
              Overview & Edit
            </button>
            <button type="button" data-tab="activity" class="tab-btn pb-3 border-b-2 transition-colors ${activeTab === 'activity' ? 'border-blue-600 text-blue-600 dark:text-blue-400' : 'border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}">
              Activity History
            </button>
            <button type="button" data-tab="permissions" class="tab-btn pb-3 border-b-2 transition-colors ${activeTab === 'permissions' ? 'border-blue-600 text-blue-600 dark:text-blue-400' : 'border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}">
              Role Permissions
            </button>
          </nav>
        </div>

        <!-- Tab Panes -->
        <div id="tab-content-root">
          <!-- Overview & Edit Form Pane -->
          <div id="tab-overview" class="${activeTab === 'overview' ? 'block' : 'hidden'} space-y-6">
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <!-- Left 2 Cols: Editable Form -->
              <div class="lg:col-span-2 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 shadow-sm p-6">
                <div class="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800 mb-6">
                  <div>
                    <h2 class="text-base font-semibold text-slate-900 dark:text-white">Personal & Account Details</h2>
                    <p class="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Edit member contact information and assignment.</p>
                  </div>
                  <span class="text-xs text-emerald-600 dark:text-emerald-400 flex items-center gap-1 font-medium">
                    <i data-lucide="shield-check" class="w-3.5 h-3.5"></i> SOC 2 Encrypted
                  </span>
                </div>

                <form id="edit-user-form" class="space-y-4">
                  <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label class="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">First Name</label>
                      <input type="text" id="detail-first-name" value="${firstName}" required class="w-full text-xs px-3.5 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:bg-white dark:focus:bg-slate-900 focus:ring-2 focus:ring-blue-500">
                    </div>
                    <div>
                      <label class="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Last Name</label>
                      <input type="text" id="detail-last-name" value="${lastName}" required class="w-full text-xs px-3.5 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:bg-white dark:focus:bg-slate-900 focus:ring-2 focus:ring-blue-500">
                    </div>
                  </div>

                  <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label class="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Email Address</label>
                      <input type="email" id="detail-email" value="${user.email}" required class="w-full text-xs px-3.5 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:bg-white dark:focus:bg-slate-900 focus:ring-2 focus:ring-blue-500">
                    </div>
                    <div>
                      <label class="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Phone Number</label>
                      <input type="tel" id="detail-phone" value="${user.phone || '+1 (555) 782-9102'}" class="w-full text-xs px-3.5 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:bg-white dark:focus:bg-slate-900 focus:ring-2 focus:ring-blue-500">
                    </div>
                  </div>

                  <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label class="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Department</label>
                      <input type="text" id="detail-dept" value="${user.department || 'Operations'}" class="w-full text-xs px-3.5 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:bg-white dark:focus:bg-slate-900 focus:ring-2 focus:ring-blue-500">
                    </div>
                    <div>
                      <label class="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Assigned Role</label>
                      <select id="detail-role" class="w-full text-xs px-3 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-blue-500">
                        <option value="Administrator" ${user.role === 'Administrator' ? 'selected' : ''}>Administrator</option>
                        <option value="Editor" ${user.role === 'Editor' ? 'selected' : ''}>Editor</option>
                        <option value="Developer" ${user.role === 'Developer' ? 'selected' : ''}>Developer</option>
                        <option value="Member" ${user.role === 'Member' ? 'selected' : ''}>Member</option>
                        <option value="Billing" ${user.role === 'Billing' ? 'selected' : ''}>Billing</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label class="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Biography / Notes</label>
                    <textarea id="detail-bio" rows="3" class="w-full text-xs px-3.5 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:bg-white dark:focus:bg-slate-900 focus:ring-2 focus:ring-blue-500">${user.bio || 'Platform contributor.'}</textarea>
                  </div>

                  <div class="flex items-center justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
                    <button type="reset" class="px-4 py-2 text-xs font-medium text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors">
                      Cancel
                    </button>
                    <button type="submit" class="px-5 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm transition-colors">
                      Save Changes
                    </button>
                  </div>
                </form>
              </div>

              <!-- Right 1 Col: Security & Metrics Sidebar -->
              <div class="space-y-6">
                <!-- Security Card -->
                <div class="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 shadow-sm p-6 space-y-4">
                  <h3 class="text-sm font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                    <i data-lucide="shield" class="w-4 h-4 text-blue-600"></i> Account Security
                  </h3>
                  <div class="space-y-3 text-xs">
                    <div class="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                      <div>
                        <div class="font-medium text-slate-900 dark:text-white">Two-Factor Authentication</div>
                        <div class="text-[11px] text-slate-500">Authenticator app verified</div>
                      </div>
                      <span class="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-50 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400">Enabled</span>
                    </div>

                    <div class="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                      <div>
                        <div class="font-medium text-slate-900 dark:text-white">Password Health</div>
                        <div class="text-[11px] text-slate-500">Changed 3 weeks ago</div>
                      </div>
                      <span class="px-2 py-0.5 rounded text-[10px] font-semibold bg-blue-50 text-blue-600 dark:bg-blue-950 dark:text-blue-400">Strong</span>
                    </div>

                    <div class="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                      <div>
                        <div class="font-medium text-slate-900 dark:text-white">Last Login IP</div>
                        <div class="text-[11px] text-slate-500 font-mono">192.168.1.42 (US-East)</div>
                      </div>
                      <span class="text-slate-400 text-[11px]">${user.lastLogin}</span>
                    </div>
                  </div>
                </div>

                <!-- Danger Zone -->
                <div class="bg-rose-50/50 dark:bg-rose-950/20 rounded-2xl border border-rose-200 dark:border-rose-900/60 p-6 space-y-3">
                  <h3 class="text-sm font-semibold text-rose-900 dark:text-rose-200">Destructive Actions</h3>
                  <p class="text-xs text-rose-700/80 dark:text-rose-300/80 leading-relaxed">
                    Permanently delete this user profile and revoke all issued API keys and session tokens.
                  </p>
                  <button id="btn-delete-this-user" type="button" class="w-full py-2 px-3 text-xs font-semibold text-white bg-rose-600 hover:bg-rose-700 rounded-lg shadow-sm transition-colors">
                    Delete User Profile
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Activity History Tab Pane -->
          <div id="tab-activity" class="${activeTab === 'activity' ? 'block' : 'hidden'} bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 shadow-sm p-6">
            <h2 class="text-base font-semibold text-slate-900 dark:text-white mb-1">Audit Trail & Session History</h2>
            <p class="text-xs text-slate-500 dark:text-slate-400 mb-6">Recent security logs and access events attributed to ${user.name}</p>

            <div class="space-y-6 relative pl-6 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200 dark:before:bg-slate-800">
              <div class="relative">
                <span class="absolute -left-6 top-1 w-3 h-3 rounded-full bg-blue-600 ring-4 ring-white dark:ring-slate-900"></span>
                <div class="text-xs font-semibold text-slate-900 dark:text-white">Logged into Web Console</div>
                <div class="text-xs text-slate-500 mt-0.5">Session authenticated via SSO with Google Workspace (Chrome 124, Windows 11).</div>
                <span class="text-[10px] text-slate-400 block mt-1">Today at 10:45 AM</span>
              </div>

              <div class="relative">
                <span class="absolute -left-6 top-1 w-3 h-3 rounded-full bg-emerald-600 ring-4 ring-white dark:ring-slate-900"></span>
                <div class="text-xs font-semibold text-slate-900 dark:text-white">Updated Billing Address</div>
                <div class="text-xs text-slate-500 mt-0.5">Changed primary company address for invoice #ORD-9281.</div>
                <span class="text-[10px] text-slate-400 block mt-1">Yesterday at 4:18 PM</span>
              </div>

              <div class="relative">
                <span class="absolute -left-6 top-1 w-3 h-3 rounded-full bg-purple-600 ring-4 ring-white dark:ring-slate-900"></span>
                <div class="text-xs font-semibold text-slate-900 dark:text-white">Rotated Production API Token</div>
                <div class="text-xs text-slate-500 mt-0.5">Generated new token <code class="font-mono text-[10px] bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded">dp_live_•••••••90a1</code>.</div>
                <span class="text-[10px] text-slate-400 block mt-1">Nov 8, 2026, 02:11 PM</span>
              </div>

              <div class="relative">
                <span class="absolute -left-6 top-1 w-3 h-3 rounded-full bg-slate-400 ring-4 ring-white dark:ring-slate-900"></span>
                <div class="text-xs font-semibold text-slate-900 dark:text-white">Account Provisioned</div>
                <div class="text-xs text-slate-500 mt-0.5">Member added to organization workspace with role Administrator.</div>
                <span class="text-[10px] text-slate-400 block mt-1">${user.createdAt}</span>
              </div>
            </div>
          </div>

          <!-- Role Permissions Matrix Tab Pane -->
          <div id="tab-permissions" class="${activeTab === 'permissions' ? 'block' : 'hidden'} bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 shadow-sm p-6">
            <h2 class="text-base font-semibold text-slate-900 dark:text-white mb-1">Access Control & Scopes</h2>
            <p class="text-xs text-slate-500 dark:text-slate-400 mb-6">Capabilities inherited from the assigned <strong>${user.role}</strong> role.</p>

            <div class="space-y-4">
              <div class="flex items-center justify-between p-3.5 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40">
                <div>
                  <div class="text-xs font-semibold text-slate-900 dark:text-white">User Management</div>
                  <div class="text-[11px] text-slate-500">Create, edit, suspend, and delete platform members</div>
                </div>
                <span class="text-xs text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
                  <i data-lucide="check" class="w-4 h-4"></i> Full Access
                </span>
              </div>

              <div class="flex items-center justify-between p-3.5 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40">
                <div>
                  <div class="text-xs font-semibold text-slate-900 dark:text-white">Billing & Invoicing</div>
                  <div class="text-[11px] text-slate-500">Modify payment methods, download invoices, cancel subscriptions</div>
                </div>
                <span class="text-xs text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
                  <i data-lucide="check" class="w-4 h-4"></i> Full Access
                </span>
              </div>

              <div class="flex items-center justify-between p-3.5 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40">
                <div>
                  <div class="text-xs font-semibold text-slate-900 dark:text-white">API & Integrations</div>
                  <div class="text-[11px] text-slate-500">Manage webhooks, rotate keys, configure rate limiters</div>
                </div>
                <span class="text-xs text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
                  <i data-lucide="check" class="w-4 h-4"></i> Full Access
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    if (window.lucide) window.lucide.createIcons({ root: container });

    // Tab buttons handling
    container.querySelectorAll(".tab-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const tab = btn.dataset.tab;
        activeTab = tab;
        container.querySelectorAll(".tab-btn").forEach(b => {
          b.className = "tab-btn pb-3 border-b-2 transition-colors border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300";
        });
        btn.className = "tab-btn pb-3 border-b-2 transition-colors border-blue-600 text-blue-600 dark:text-blue-400 font-semibold";

        document.getElementById("tab-overview").className = tab === "overview" ? "block space-y-6" : "hidden";
        document.getElementById("tab-activity").className = tab === "activity" ? "block bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 shadow-sm p-6" : "hidden";
        document.getElementById("tab-permissions").className = tab === "permissions" ? "block bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 shadow-sm p-6" : "hidden";
      });
    });

    // Form save handler
    const form = document.getElementById("edit-user-form");
    if (form) {
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        const fName = document.getElementById("detail-first-name").value.trim();
        const lName = document.getElementById("detail-last-name").value.trim();
        const email = document.getElementById("detail-email").value.trim();
        const phone = document.getElementById("detail-phone").value.trim();
        const dept = document.getElementById("detail-dept").value.trim();
        const role = document.getElementById("detail-role").value;
        const bio = document.getElementById("detail-bio").value.trim();

        DashData.updateUser(user.id, {
          name: `${fName} ${lName}`.trim(),
          email: email,
          phone: phone,
          department: dept,
          role: role,
          bio: bio
        });

        DashComponents.showToast("Profile details updated successfully!", "success");
        render(container, { id: user.id });
      });
    }

    // Toggle status button
    const toggleBtn = document.getElementById("btn-toggle-status");
    if (toggleBtn) {
      toggleBtn.addEventListener("click", () => {
        const nextStatus = user.status === "Active" ? "Suspended" : "Active";
        DashData.updateUser(user.id, { status: nextStatus });
        DashComponents.showToast(`User status changed to ${nextStatus}`, "info");
        render(container, { id: user.id });
      });
    }

    // Reset password button
    const resetBtn = document.getElementById("btn-reset-password");
    if (resetBtn) {
      resetBtn.addEventListener("click", () => {
        DashComponents.confirmModal({
          title: "Send Password Reset",
          message: `Send a secure password reset link to ${user.email}?`,
          confirmText: "Send Reset Link",
          confirmVariant: "primary",
          onConfirm: () => {
            DashComponents.showToast(`Password reset link dispatched to ${user.email}`, "success");
          }
        });
      });
    }

    // Delete user button
    const deleteBtn = document.getElementById("btn-delete-this-user");
    if (deleteBtn) {
      deleteBtn.addEventListener("click", () => {
        DashComponents.confirmModal({
          title: `Delete Profile: ${user.name}`,
          message: `Are you sure you want to delete ${user.name}? All active sessions and permissions will be terminated immediately.`,
          confirmText: "Permanently Delete",
          confirmVariant: "danger",
          onConfirm: () => {
            DashData.deleteUser(user.id);
            DashComponents.showToast(`User ${user.name} was removed`, "success");
            window.location.hash = "#users";
          }
        });
      });
    }
  }

  return { render };
})();
