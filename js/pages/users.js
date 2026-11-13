/**
 * DashPulse Admin Dashboard Template
 * Page: Users Management
 */

window.UsersPage = (function () {
  let searchTerm = "";
  let roleFilter = "All";
  let statusFilter = "All";
  let sortField = "name";
  let sortAsc = true;
  let currentPage = 1;
  let pageSize = 10;
  let selectedUserIds = new Set();

  function render(container) {
    DashComponents.updateBreadcrumbs([
      { label: "Dashboard", href: "#dashboard" },
      { label: "Users", href: "#users" }
    ]);

    container.innerHTML = `
      <div class="space-y-6">
        <!-- Page Header -->
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 class="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">User Management</h1>
            <p class="text-sm text-slate-500 dark:text-slate-400 mt-1">Manage team access, roles, account statuses, and member security.</p>
          </div>
          <div class="flex items-center gap-3">
            <button id="btn-export-users-csv" type="button" class="inline-flex items-center gap-1.5 px-3.5 py-2 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-800 rounded-lg text-xs font-semibold shadow-sm transition-colors">
              <i data-lucide="download" class="w-3.5 h-3.5"></i>
              Export Users
            </button>
            <button id="btn-open-add-user" type="button" class="inline-flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold shadow-sm transition-colors">
              <i data-lucide="user-plus" class="w-3.5 h-3.5"></i>
              Add New User
            </button>
          </div>
        </div>

        <!-- Filter, Search and Bulk Bar -->
        <div class="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 shadow-sm p-4 space-y-3">
          <div class="flex flex-col md:flex-row md:items-center justify-between gap-3">
            <!-- Search Bar -->
            <div class="relative flex-1 max-w-md">
              <i data-lucide="search" class="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"></i>
              <input id="users-search-input" type="text" placeholder="Search by name, email, or department..." value="${searchTerm}" class="w-full pl-9 pr-4 py-2 text-xs bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white placeholder-slate-400 focus:bg-white dark:focus:bg-slate-900 focus:ring-2 focus:ring-blue-500 transition-colors">
              ${searchTerm ? `<button id="users-search-clear" class="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"><i data-lucide="x" class="w-3.5 h-3.5"></i></button>` : ''}
            </div>

            <!-- Role & Status Filters -->
            <div class="flex flex-wrap items-center gap-2">
              <select id="users-role-filter" class="text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-slate-700 dark:text-slate-300 focus:ring-blue-500">
                <option value="All" ${roleFilter === 'All' ? 'selected' : ''}>All Roles</option>
                <option value="Administrator" ${roleFilter === 'Administrator' ? 'selected' : ''}>Administrator</option>
                <option value="Editor" ${roleFilter === 'Editor' ? 'selected' : ''}>Editor</option>
                <option value="Developer" ${roleFilter === 'Developer' ? 'selected' : ''}>Developer</option>
                <option value="Member" ${roleFilter === 'Member' ? 'selected' : ''}>Member</option>
                <option value="Billing" ${roleFilter === 'Billing' ? 'selected' : ''}>Billing</option>
              </select>

              <select id="users-status-filter" class="text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-slate-700 dark:text-slate-300 focus:ring-blue-500">
                <option value="All" ${statusFilter === 'All' ? 'selected' : ''}>All Statuses</option>
                <option value="Active" ${statusFilter === 'Active' ? 'selected' : ''}>Active</option>
                <option value="Pending" ${statusFilter === 'Pending' ? 'selected' : ''}>Pending</option>
                <option value="Suspended" ${statusFilter === 'Suspended' ? 'selected' : ''}>Suspended</option>
                <option value="Inactive" ${statusFilter === 'Inactive' ? 'selected' : ''}>Inactive</option>
              </select>

              <select id="users-page-size" class="text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-slate-700 dark:text-slate-300 focus:ring-blue-500">
                <option value="5" ${pageSize === 5 ? 'selected' : ''}>5 per page</option>
                <option value="10" ${pageSize === 10 ? 'selected' : ''}>10 per page</option>
                <option value="20" ${pageSize === 20 ? 'selected' : ''}>20 per page</option>
              </select>
            </div>
          </div>

          <!-- Bulk Selection Actions Bar -->
          <div id="users-bulk-bar" class="${selectedUserIds.size > 0 ? 'flex' : 'hidden'} items-center justify-between p-2.5 bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/60 rounded-xl transition-all">
            <div class="flex items-center gap-2 text-xs font-semibold text-blue-900 dark:text-blue-200 pl-2">
              <i data-lucide="check-square" class="w-4 h-4 text-blue-600 dark:text-blue-400"></i>
              <span id="bulk-selected-count">${selectedUserIds.size}</span> users selected
            </div>
            <div class="flex items-center gap-2">
              <button id="bulk-activate-btn" type="button" class="px-2.5 py-1 text-xs font-medium bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm transition-colors">
                Activate
              </button>
              <button id="bulk-suspend-btn" type="button" class="px-2.5 py-1 text-xs font-medium bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm transition-colors">
                Suspend
              </button>
              <button id="bulk-delete-btn" type="button" class="px-2.5 py-1 text-xs font-medium bg-rose-600 hover:bg-rose-700 text-white rounded-lg shadow-sm transition-colors">
                Delete
              </button>
            </div>
          </div>
        </div>

        <!-- Users Table Container -->
        <div class="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 shadow-sm overflow-hidden">
          <div class="table-scroll-container">
            <table class="w-full text-left text-xs">
              <thead class="bg-slate-50/75 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400 font-semibold border-b border-slate-100 dark:border-slate-800 select-none">
                <tr>
                  <th class="p-3.5 pl-5 w-10">
                    <input type="checkbox" id="users-select-all" class="rounded border-slate-300 dark:border-slate-700 text-blue-600 focus:ring-blue-500 cursor-pointer">
                  </th>
                  <th class="p-3.5 cursor-pointer hover:text-slate-900 dark:hover:text-white" data-sort="name">
                    <div class="flex items-center gap-1.5">
                      <span>User</span>
                      <i data-lucide="${sortField === 'name' ? (sortAsc ? 'chevron-up' : 'chevron-down') : 'chevrons-up-down'}" class="w-3.5 h-3.5 text-slate-400"></i>
                    </div>
                  </th>
                  <th class="p-3.5 cursor-pointer hover:text-slate-900 dark:hover:text-white" data-sort="role">
                    <div class="flex items-center gap-1.5">
                      <span>Role</span>
                      <i data-lucide="${sortField === 'role' ? (sortAsc ? 'chevron-up' : 'chevron-down') : 'chevrons-up-down'}" class="w-3.5 h-3.5 text-slate-400"></i>
                    </div>
                  </th>
                  <th class="p-3.5 cursor-pointer hover:text-slate-900 dark:hover:text-white" data-sort="status">
                    <div class="flex items-center gap-1.5">
                      <span>Status</span>
                      <i data-lucide="${sortField === 'status' ? (sortAsc ? 'chevron-up' : 'chevron-down') : 'chevrons-up-down'}" class="w-3.5 h-3.5 text-slate-400"></i>
                    </div>
                  </th>
                  <th class="p-3.5 cursor-pointer hover:text-slate-900 dark:hover:text-white" data-sort="createdAt">
                    <div class="flex items-center gap-1.5">
                      <span>Joined</span>
                      <i data-lucide="${sortField === 'createdAt' ? (sortAsc ? 'chevron-up' : 'chevron-down') : 'chevrons-up-down'}" class="w-3.5 h-3.5 text-slate-400"></i>
                    </div>
                  </th>
                  <th class="p-3.5">Last Login</th>
                  <th class="p-3.5 text-right pr-6">Actions</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-100 dark:divide-slate-800/60" id="users-tbody">
                <!-- Dynamically rendered -->
              </tbody>
            </table>
          </div>

          <!-- Empty State Container (Hidden by default) -->
          <div id="users-empty-state" class="hidden"></div>

          <!-- Pagination Bar -->
          <div id="users-pagination-bar" class="p-4 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
            <div id="users-pagination-info">Showing 1 to 10 of 20 users</div>
            <div class="flex items-center gap-1.5" id="users-pagination-controls">
              <!-- Pagination buttons -->
            </div>
          </div>
        </div>
      </div>

      <!-- Add/Edit User Modal Root -->
      <div id="user-form-modal-root"></div>
    `;

    if (window.lucide) window.lucide.createIcons({ root: container });

    bindEvents(container);
    renderTable();
  }

  function getFilteredAndSortedUsers() {
    let users = DashData.getUsers();

    // Search filter
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      users = users.filter(u =>
        u.name.toLowerCase().includes(q) ||
        u.email.toLowerCase().includes(q) ||
        (u.department && u.department.toLowerCase().includes(q))
      );
    }

    // Role filter
    if (roleFilter !== "All") {
      users = users.filter(u => u.role === roleFilter);
    }

    // Status filter
    if (statusFilter !== "All") {
      users = users.filter(u => u.status === statusFilter);
    }

    // Sorting
    users.sort((a, b) => {
      let valA = a[sortField] || "";
      let valB = b[sortField] || "";
      if (typeof valA === "string") valA = valA.toLowerCase();
      if (typeof valB === "string") valB = valB.toLowerCase();

      if (valA < valB) return sortAsc ? -1 : 1;
      if (valA > valB) return sortAsc ? 1 : -1;
      return 0;
    });

    return users;
  }

  function renderTable() {
    const tbody = document.getElementById("users-tbody");
    const emptyState = document.getElementById("users-empty-state");
    const paginationBar = document.getElementById("users-pagination-bar");
    const paginationInfo = document.getElementById("users-pagination-info");
    const paginationControls = document.getElementById("users-pagination-controls");
    const selectAllCheck = document.getElementById("users-select-all");

    if (!tbody) return;

    const filtered = getFilteredAndSortedUsers();
    const totalRecords = filtered.length;
    const totalPages = Math.ceil(totalRecords / pageSize) || 1;

    if (currentPage > totalPages) currentPage = totalPages;
    if (currentPage < 1) currentPage = 1;

    const startIdx = (currentPage - 1) * pageSize;
    const pageRecords = filtered.slice(startIdx, startIdx + pageSize);

    if (totalRecords === 0) {
      tbody.innerHTML = "";
      emptyState.classList.remove("hidden");
      paginationBar.classList.add("hidden");
      emptyState.innerHTML = DashComponents.renderEmptyState({
        icon: "users",
        title: "No users found",
        message: "No users matched your search and filter criteria.",
        actionText: "Clear all filters",
        onAction: () => {
          searchTerm = "";
          roleFilter = "All";
          statusFilter = "All";
          const sInput = document.getElementById("users-search-input");
          const rFilter = document.getElementById("users-role-filter");
          const stFilter = document.getElementById("users-status-filter");
          if (sInput) sInput.value = "";
          if (rFilter) rFilter.value = "All";
          if (stFilter) stFilter.value = "All";
          renderTable();
        }
      });
      return;
    }

    emptyState.classList.add("hidden");
    paginationBar.classList.remove("hidden");

    // Render table rows
    tbody.innerHTML = pageRecords.map(u => {
      const isSelected = selectedUserIds.has(u.id);
      return `
        <tr class="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors ${isSelected ? 'bg-blue-50/50 dark:bg-blue-950/20' : ''}">
          <td class="p-3.5 pl-5">
            <input type="checkbox" data-user-id="${u.id}" class="user-row-checkbox rounded border-slate-300 dark:border-slate-700 text-blue-600 focus:ring-blue-500 cursor-pointer" ${isSelected ? 'checked' : ''}>
          </td>
          <td class="p-3.5">
            <div class="flex items-center gap-3">
              <img src="${u.avatar}" alt="${u.name}" class="w-8 h-8 rounded-full object-cover border border-slate-200 dark:border-slate-700 flex-shrink-0">
              <div class="min-w-0">
                <a href="#user-detail?id=${u.id}" class="font-semibold text-slate-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 block truncate transition-colors">${u.name}</a>
                <span class="text-[11px] text-slate-400 dark:text-slate-500 block truncate">${u.email}</span>
              </div>
            </div>
          </td>
          <td class="p-3.5">
            <span class="font-medium text-slate-700 dark:text-slate-300">${u.role}</span>
            <div class="text-[10px] text-slate-400 dark:text-slate-500">${u.department || 'Core Team'}</div>
          </td>
          <td class="p-3.5">${DashComponents.getUserStatusBadge(u.status)}</td>
          <td class="p-3.5 text-slate-600 dark:text-slate-400 font-mono text-[11px]">${u.createdAt}</td>
          <td class="p-3.5 text-slate-500 dark:text-slate-400 text-[11px]">${u.lastLogin}</td>
          <td class="p-3.5 text-right pr-6">
            <div class="flex items-center justify-end gap-1">
              <a href="#user-detail?id=${u.id}" class="p-1.5 text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 rounded-md transition-colors" title="View Profile">
                <i data-lucide="eye" class="w-4 h-4"></i>
              </a>
              <button type="button" data-edit-id="${u.id}" class="user-edit-btn p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded-md transition-colors" title="Edit User">
                <i data-lucide="edit-2" class="w-4 h-4"></i>
              </button>
              <button type="button" data-delete-id="${u.id}" data-name="${u.name}" class="user-delete-btn p-1.5 text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 rounded-md transition-colors" title="Delete User">
                <i data-lucide="trash-2" class="w-4 h-4"></i>
              </button>
            </div>
          </td>
        </tr>
      `;
    }).join("");

    // Update select-all state
    const allPageSelected = pageRecords.length > 0 && pageRecords.every(u => selectedUserIds.has(u.id));
    if (selectAllCheck) selectAllCheck.checked = allPageSelected;

    // Update pagination display
    const endIdx = Math.min(startIdx + pageSize, totalRecords);
    paginationInfo.textContent = `Showing ${startIdx + 1} to ${endIdx} of ${totalRecords} users`;

    let paginationHtml = `
      <button type="button" id="pagination-prev" class="px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors" ${currentPage === 1 ? 'disabled' : ''}>
        <i data-lucide="chevron-left" class="w-3.5 h-3.5"></i>
      </button>
    `;

    for (let p = 1; p <= totalPages; p++) {
      if (totalPages > 6 && Math.abs(p - currentPage) > 2 && p !== 1 && p !== totalPages) {
        if (p === 2 || p === totalPages - 1) {
          paginationHtml += `<span class="px-2 text-slate-400">...</span>`;
        }
        continue;
      }
      paginationHtml += `
        <button type="button" data-page="${p}" class="pagination-page-btn px-3 py-1.5 rounded-lg font-medium transition-colors ${p === currentPage ? 'bg-blue-600 text-white font-semibold' : 'border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'}">
          ${p}
        </button>
      `;
    }

    paginationHtml += `
      <button type="button" id="pagination-next" class="px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors" ${currentPage === totalPages ? 'disabled' : ''}>
        <i data-lucide="chevron-right" class="w-3.5 h-3.5"></i>
      </button>
    `;

    paginationControls.innerHTML = paginationHtml;

    if (window.lucide) window.lucide.createIcons({ root: tbody.parentNode.parentNode });

    bindDynamicTableEvents(pageRecords);
  }

  function bindEvents(container) {
    // Search input
    const searchInput = document.getElementById("users-search-input");
    if (searchInput) {
      let timeout;
      searchInput.addEventListener("input", (e) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
          searchTerm = e.target.value;
          currentPage = 1;
          renderTable();
        }, 200);
      });
    }

    // Role filter
    const roleSelect = document.getElementById("users-role-filter");
    if (roleSelect) {
      roleSelect.addEventListener("change", (e) => {
        roleFilter = e.target.value;
        currentPage = 1;
        renderTable();
      });
    }

    // Status filter
    const statusSelect = document.getElementById("users-status-filter");
    if (statusSelect) {
      statusSelect.addEventListener("change", (e) => {
        statusFilter = e.target.value;
        currentPage = 1;
        renderTable();
      });
    }

    // Page size select
    const pageSizeSelect = document.getElementById("users-page-size");
    if (pageSizeSelect) {
      pageSizeSelect.addEventListener("change", (e) => {
        pageSize = parseInt(e.target.value, 10);
        currentPage = 1;
        renderTable();
      });
    }

    // Sort headers
    container.querySelectorAll("th[data-sort]").forEach(th => {
      th.addEventListener("click", () => {
        const field = th.dataset.sort;
        if (sortField === field) {
          sortAsc = !sortAsc;
        } else {
          sortField = field;
          sortAsc = true;
        }
        renderTable();
      });
    });

    // Select All Checkbox
    const selectAllCheck = document.getElementById("users-select-all");
    if (selectAllCheck) {
      selectAllCheck.addEventListener("change", (e) => {
        const filtered = getFilteredAndSortedUsers();
        const startIdx = (currentPage - 1) * pageSize;
        const pageRecords = filtered.slice(startIdx, startIdx + pageSize);

        if (e.target.checked) {
          pageRecords.forEach(u => selectedUserIds.add(u.id));
        } else {
          pageRecords.forEach(u => selectedUserIds.delete(u.id));
        }
        updateBulkBar();
        renderTable();
      });
    }

    // Bulk Actions
    const bulkBar = document.getElementById("users-bulk-bar");
    const bulkActivate = document.getElementById("bulk-activate-btn");
    const bulkSuspend = document.getElementById("bulk-suspend-btn");
    const bulkDelete = document.getElementById("bulk-delete-btn");

    if (bulkActivate) {
      bulkActivate.addEventListener("click", () => {
        DashData.bulkUpdateUserStatus(Array.from(selectedUserIds), "Active");
        DashComponents.showToast(`${selectedUserIds.size} users set to Active`, "success");
        selectedUserIds.clear();
        updateBulkBar();
        renderTable();
      });
    }

    if (bulkSuspend) {
      bulkSuspend.addEventListener("click", () => {
        DashData.bulkUpdateUserStatus(Array.from(selectedUserIds), "Suspended");
        DashComponents.showToast(`${selectedUserIds.size} users suspended`, "warning");
        selectedUserIds.clear();
        updateBulkBar();
        renderTable();
      });
    }

    if (bulkDelete) {
      bulkDelete.addEventListener("click", () => {
        const count = selectedUserIds.size;
        DashComponents.confirmModal({
          title: `Delete ${count} Users`,
          message: `Are you sure you want to delete these ${count} selected user accounts? This action cannot be reversed.`,
          confirmText: "Delete Users",
          confirmVariant: "danger",
          onConfirm: () => {
            DashData.bulkDeleteUsers(Array.from(selectedUserIds));
            DashComponents.showToast(`${count} users deleted successfully`, "success");
            selectedUserIds.clear();
            updateBulkBar();
            renderTable();
          }
        });
      });
    }

    // Open Add User Modal
    const addBtn = document.getElementById("btn-open-add-user");
    if (addBtn) {
      addBtn.addEventListener("click", () => {
        openUserModal();
      });
    }

    // Export Users CSV
    const exportBtn = document.getElementById("btn-export-users-csv");
    if (exportBtn) {
      exportBtn.addEventListener("click", () => {
        const users = getFilteredAndSortedUsers();
        const headers = ["User ID", "Name", "Email", "Role", "Status", "Plan", "Department", "Joined Date", "Last Login"];
        const rows = users.map(u => [u.id, u.name, u.email, u.role, u.status, u.plan, u.department, u.createdAt, u.lastLogin]);
        DashComponents.exportToCSV("users_directory", headers, rows);
      });
    }
  }

  function bindDynamicTableEvents(pageRecords) {
    // Individual Checkboxes
    document.querySelectorAll(".user-row-checkbox").forEach(cb => {
      cb.addEventListener("change", (e) => {
        const id = cb.dataset.userId;
        if (e.target.checked) {
          selectedUserIds.add(id);
        } else {
          selectedUserIds.delete(id);
        }
        updateBulkBar();
        // Toggle row highlight
        const row = cb.closest("tr");
        if (row) {
          row.classList.toggle("bg-blue-50/50", cb.checked);
          row.classList.toggle("dark:bg-blue-950/20", cb.checked);
        }
      });
    });

    // Edit Buttons
    document.querySelectorAll(".user-edit-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const user = DashData.getUserById(btn.dataset.editId);
        if (user) openUserModal(user);
      });
    });

    // Delete Buttons
    document.querySelectorAll(".user-delete-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const id = btn.dataset.deleteId;
        const name = btn.dataset.name;
        DashComponents.confirmModal({
          title: `Delete User: ${name}`,
          message: `Are you sure you want to permanently remove ${name}? This will revoke their platform access immediately.`,
          confirmText: "Delete User",
          confirmVariant: "danger",
          onConfirm: () => {
            DashData.deleteUser(id);
            selectedUserIds.delete(id);
            updateBulkBar();
            DashComponents.showToast(`User ${name} has been deleted`, "success");
            renderTable();
          }
        });
      });
    });

    // Pagination Click Events
    const prevBtn = document.getElementById("pagination-prev");
    const nextBtn = document.getElementById("pagination-next");
    if (prevBtn) {
      prevBtn.addEventListener("click", () => {
        if (currentPage > 1) {
          currentPage--;
          renderTable();
        }
      });
    }
    if (nextBtn) {
      nextBtn.addEventListener("click", () => {
        currentPage++;
        renderTable();
      });
    }

    document.querySelectorAll(".pagination-page-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        currentPage = parseInt(btn.dataset.page, 10);
        renderTable();
      });
    });
  }

  function updateBulkBar() {
    const bulkBar = document.getElementById("users-bulk-bar");
    const countEl = document.getElementById("bulk-selected-count");
    if (bulkBar && countEl) {
      countEl.textContent = selectedUserIds.size;
      if (selectedUserIds.size > 0) {
        bulkBar.classList.remove("hidden");
        bulkBar.classList.add("flex");
      } else {
        bulkBar.classList.add("hidden");
        bulkBar.classList.remove("flex");
      }
    }
  }

  // Modal Dialog for Add / Edit User
  function openUserModal(existingUser = null) {
    const root = document.getElementById("user-form-modal-root");
    if (!root) return;

    const isEdit = !!existingUser;
    const title = isEdit ? `Edit User: ${existingUser.name}` : "Add New Team Member";
    const u = existingUser || {
      name: "",
      email: "",
      role: "Member",
      status: "Active",
      department: "Engineering",
      phone: "",
      bio: ""
    };

    root.innerHTML = `
      <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm" id="user-modal-backdrop">
        <div class="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 max-w-lg w-full p-6 modal-content space-y-5">
          <div class="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
            <div class="flex items-center gap-3">
              <div class="p-2 rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400">
                <i data-lucide="${isEdit ? 'user-check' : 'user-plus'}" class="w-5 h-5"></i>
              </div>
              <div>
                <h3 class="text-base font-bold text-slate-900 dark:text-white">${title}</h3>
                <p class="text-xs text-slate-500">${isEdit ? 'Update member details and permissions' : 'Invite a new member to join the workspace'}</p>
              </div>
            </div>
            <button type="button" id="user-modal-close" class="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1 rounded-md">
              <i data-lucide="x" class="w-4 h-4"></i>
            </button>
          </div>

          <form id="user-modal-form" class="space-y-4">
            <div>
              <label class="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Full Name <span class="text-rose-500">*</span></label>
              <input type="text" id="modal-user-name" required value="${u.name}" placeholder="e.g. Sarah Connor" class="w-full text-xs px-3.5 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:bg-white dark:focus:bg-slate-900 focus:ring-2 focus:ring-blue-500">
              <span class="text-[11px] text-rose-500 hidden" id="err-user-name">Please enter a valid full name.</span>
            </div>

            <div>
              <label class="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Work Email <span class="text-rose-500">*</span></label>
              <input type="email" id="modal-user-email" required value="${u.email}" placeholder="sarah@company.com" class="w-full text-xs px-3.5 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:bg-white dark:focus:bg-slate-900 focus:ring-2 focus:ring-blue-500">
              <span class="text-[11px] text-rose-500 hidden" id="err-user-email">Please enter a valid email address.</span>
            </div>

            <div class="grid grid-cols-2 gap-3">
              <div>
                <label class="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Assigned Role</label>
                <select id="modal-user-role" class="w-full text-xs px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-blue-500">
                  <option value="Administrator" ${u.role === 'Administrator' ? 'selected' : ''}>Administrator</option>
                  <option value="Editor" ${u.role === 'Editor' ? 'selected' : ''}>Editor</option>
                  <option value="Developer" ${u.role === 'Developer' ? 'selected' : ''}>Developer</option>
                  <option value="Member" ${u.role === 'Member' ? 'selected' : ''}>Member</option>
                  <option value="Billing" ${u.role === 'Billing' ? 'selected' : ''}>Billing</option>
                </select>
              </div>

              <div>
                <label class="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Account Status</label>
                <select id="modal-user-status" class="w-full text-xs px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-blue-500">
                  <option value="Active" ${u.status === 'Active' ? 'selected' : ''}>Active</option>
                  <option value="Pending" ${u.status === 'Pending' ? 'selected' : ''}>Pending</option>
                  <option value="Suspended" ${u.status === 'Suspended' ? 'selected' : ''}>Suspended</option>
                  <option value="Inactive" ${u.status === 'Inactive' ? 'selected' : ''}>Inactive</option>
                </select>
              </div>
            </div>

            <div class="grid grid-cols-2 gap-3">
              <div>
                <label class="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Department</label>
                <input type="text" id="modal-user-dept" value="${u.department || ''}" placeholder="e.g. Platform Engineering" class="w-full text-xs px-3.5 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-blue-500">
              </div>

              <div>
                <label class="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Phone Number</label>
                <input type="tel" id="modal-user-phone" value="${u.phone || ''}" placeholder="+1 (555) 000-0000" class="w-full text-xs px-3.5 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-blue-500">
              </div>
            </div>

            <div class="flex items-center justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
              <button type="button" id="modal-user-cancel" class="px-4 py-2 text-xs font-medium text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors">
                Cancel
              </button>
              <button type="submit" class="px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm transition-colors">
                ${isEdit ? 'Save Changes' : 'Create User'}
              </button>
            </div>
          </form>
        </div>
      </div>
    `;

    if (window.lucide) window.lucide.createIcons({ root: root });

    const closeModal = () => { root.innerHTML = ""; };

    document.getElementById("user-modal-close").addEventListener("click", closeModal);
    document.getElementById("modal-user-cancel").addEventListener("click", closeModal);
    document.getElementById("user-modal-backdrop").addEventListener("click", (e) => {
      if (e.target.id === "user-modal-backdrop") closeModal();
    });

    const form = document.getElementById("user-modal-form");
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const nameInput = document.getElementById("modal-user-name");
      const emailInput = document.getElementById("modal-user-email");
      const roleInput = document.getElementById("modal-user-role");
      const statusInput = document.getElementById("modal-user-status");
      const deptInput = document.getElementById("modal-user-dept");
      const phoneInput = document.getElementById("modal-user-phone");

      let valid = true;
      if (!nameInput.value.trim()) {
        document.getElementById("err-user-name").classList.remove("hidden");
        valid = false;
      } else {
        document.getElementById("err-user-name").classList.add("hidden");
      }

      if (!emailInput.value.trim() || !emailInput.value.includes("@")) {
        document.getElementById("err-user-email").classList.remove("hidden");
        valid = false;
      } else {
        document.getElementById("err-user-email").classList.add("hidden");
      }

      if (!valid) return;

      if (isEdit) {
        DashData.updateUser(existingUser.id, {
          name: nameInput.value.trim(),
          email: emailInput.value.trim(),
          role: roleInput.value,
          status: statusInput.value,
          department: deptInput.value.trim(),
          phone: phoneInput.value.trim()
        });
        DashComponents.showToast(`User ${nameInput.value.trim()} updated successfully!`, "success");
      } else {
        DashData.addUser({
          name: nameInput.value.trim(),
          email: emailInput.value.trim(),
          role: roleInput.value,
          status: statusInput.value,
          department: deptInput.value.trim() || "General Operations",
          phone: phoneInput.value.trim() || "+1 (555) 019-2831",
          plan: "Standard Team"
        });
        DashComponents.showToast(`New user ${nameInput.value.trim()} created!`, "success");
      }

      closeModal();
      renderTable();
    });
  }

  return { render };
})();
