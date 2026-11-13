/**
 * DashPulse Admin Dashboard Template
 * Page: Kanban Board & Agile Task Management
 */

window.KanbanPage = (function () {
  function render(container) {
    DashComponents.updateBreadcrumbs([
      { label: "Dashboard", href: "#dashboard" },
      { label: "Kanban Task Board", href: "#kanban" }
    ]);

    container.innerHTML = `
      <div class="space-y-6">
        <!-- Header -->
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 class="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">Engineering Sprint Board</h1>
            <p class="text-sm text-slate-500 dark:text-slate-400 mt-1">Track sprint deliverables, deployment blockers, code reviews, and infrastructure milestones.</p>
          </div>
          <div class="flex items-center gap-3">
            <button id="btn-add-task-global" type="button" class="inline-flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold shadow-sm transition-colors">
              <i data-lucide="plus" class="w-3.5 h-3.5"></i> New Sprint Task
            </button>
          </div>
        </div>

        <!-- Kanban Columns Board Container -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-start" id="kanban-board-grid">
          <!-- Col 1: To Do -->
          <div class="bg-slate-100/70 dark:bg-slate-900/60 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 p-4 space-y-4" data-col="todo">
            <div class="flex items-center justify-between pb-1">
              <div class="flex items-center gap-2">
                <span class="w-2.5 h-2.5 rounded-full bg-slate-400"></span>
                <h3 class="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">Backlog / To Do</h3>
                <span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 shadow-xs" id="count-todo">0</span>
              </div>
              <button type="button" data-add-to="todo" class="btn-col-add p-1 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200">
                <i data-lucide="plus" class="w-4 h-4"></i>
              </button>
            </div>
            <div class="space-y-3 min-h-[300px]" id="column-todo"></div>
          </div>

          <!-- Col 2: In Progress -->
          <div class="bg-slate-100/70 dark:bg-slate-900/60 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 p-4 space-y-4" data-col="inprogress">
            <div class="flex items-center justify-between pb-1">
              <div class="flex items-center gap-2">
                <span class="w-2.5 h-2.5 rounded-full bg-blue-500 animate-pulse"></span>
                <h3 class="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">In Progress</h3>
                <span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 shadow-xs" id="count-inprogress">0</span>
              </div>
              <button type="button" data-add-to="inprogress" class="btn-col-add p-1 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200">
                <i data-lucide="plus" class="w-4 h-4"></i>
              </button>
            </div>
            <div class="space-y-3 min-h-[300px]" id="column-inprogress"></div>
          </div>

          <!-- Col 3: Review -->
          <div class="bg-slate-100/70 dark:bg-slate-900/60 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 p-4 space-y-4" data-col="review">
            <div class="flex items-center justify-between pb-1">
              <div class="flex items-center gap-2">
                <span class="w-2.5 h-2.5 rounded-full bg-purple-500"></span>
                <h3 class="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">Code Review</h3>
                <span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 shadow-xs" id="count-review">0</span>
              </div>
              <button type="button" data-add-to="review" class="btn-col-add p-1 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200">
                <i data-lucide="plus" class="w-4 h-4"></i>
              </button>
            </div>
            <div class="space-y-3 min-h-[300px]" id="column-review"></div>
          </div>

          <!-- Col 4: Done -->
          <div class="bg-slate-100/70 dark:bg-slate-900/60 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 p-4 space-y-4" data-col="done">
            <div class="flex items-center justify-between pb-1">
              <div class="flex items-center gap-2">
                <span class="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                <h3 class="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">Completed</h3>
                <span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 shadow-xs" id="count-done">0</span>
              </div>
              <button type="button" data-add-to="done" class="btn-col-add p-1 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200">
                <i data-lucide="plus" class="w-4 h-4"></i>
              </button>
            </div>
            <div class="space-y-3 min-h-[300px]" id="column-done"></div>
          </div>
        </div>
      </div>

      <!-- Task Modal Mount -->
      <div id="kanban-modal-root"></div>
    `;

    if (window.lucide) window.lucide.createIcons({ root: container });

    renderTasks();
    bindEvents(container);
  }

  function renderTasks() {
    const tasks = DashData.getKanbanTasks();

    const cols = {
      todo: document.getElementById("column-todo"),
      inprogress: document.getElementById("column-inprogress"),
      review: document.getElementById("column-review"),
      done: document.getElementById("column-done")
    };

    if (!cols.todo) return;

    // Reset columns
    Object.keys(cols).forEach(k => { cols[k].innerHTML = ""; });

    const counts = { todo: 0, inprogress: 0, review: 0, done: 0 };

    tasks.forEach(task => {
      const colEl = cols[task.column] || cols.todo;
      counts[task.column] = (counts[task.column] || 0) + 1;

      let priorityClass = "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300";
      if (task.priority === "High") priorityClass = "bg-rose-50 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300 border-rose-200";
      else if (task.priority === "Medium") priorityClass = "bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300 border-amber-200";
      else if (task.priority === "Low") priorityClass = "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border-emerald-200";

      const card = document.createElement("div");
      card.className = "bg-white dark:bg-slate-900 rounded-xl p-4 border border-slate-200/80 dark:border-slate-800/80 shadow-xs hover:shadow-md transition-all space-y-3 cursor-grab";
      card.innerHTML = `
        <div class="flex items-center justify-between">
          <span class="px-2 py-0.5 rounded text-[10px] font-bold border ${priorityClass}">
            ${task.priority} Priority
          </span>
          <span class="text-[10px] font-mono text-slate-400 font-medium">${task.tag || 'Sprint'}</span>
        </div>

        <div>
          <h4 class="text-xs font-bold text-slate-900 dark:text-white leading-snug">${task.title}</h4>
          <p class="text-[11px] text-slate-500 dark:text-slate-400 mt-1 line-clamp-2 leading-relaxed">${task.desc}</p>
        </div>

        <div class="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-400">
          <div class="flex items-center gap-1.5">
            <img src="${task.avatar}" alt="${task.assignee}" class="w-5 h-5 rounded-full object-cover border border-slate-200 dark:border-slate-700" title="Assigned to ${task.assignee}">
            <span class="text-[10px] font-medium text-slate-600 dark:text-slate-300">${task.assignee.split(" ")[0]}</span>
          </div>

          <div class="flex items-center gap-3">
            <span class="flex items-center gap-1" title="Due Date">
              <i data-lucide="clock" class="w-3 h-3"></i> ${task.dueDate}
            </span>
            <span class="flex items-center gap-1" title="Comments">
              <i data-lucide="message-square" class="w-3 h-3"></i> ${task.comments || 0}
            </span>
          </div>
        </div>

        <!-- Quick Stage Buttons -->
        <div class="flex items-center justify-between pt-1 border-t border-slate-50 dark:border-slate-800/50">
          <div class="flex items-center gap-1">
            ${task.column !== 'todo' ? `
              <button type="button" data-move-task="${task.id}" data-direction="prev" class="p-1 rounded text-slate-400 hover:text-slate-700 dark:hover:text-slate-200" title="Move back">
                <i data-lucide="chevron-left" class="w-3.5 h-3.5"></i>
              </button>
            ` : ''}
            ${task.column !== 'done' ? `
              <button type="button" data-move-task="${task.id}" data-direction="next" class="p-1 rounded text-slate-400 hover:text-slate-700 dark:hover:text-slate-200" title="Move forward">
                <i data-lucide="chevron-right" class="w-3.5 h-3.5"></i>
              </button>
            ` : ''}
          </div>
          <button type="button" data-del-task="${task.id}" class="p-1 rounded text-slate-400 hover:text-rose-600" title="Delete Task">
            <i data-lucide="trash-2" class="w-3.5 h-3.5"></i>
          </button>
        </div>
      `;

      colEl.appendChild(card);
    });

    // Update badges
    document.getElementById("count-todo").textContent = counts.todo || 0;
    document.getElementById("count-inprogress").textContent = counts.inprogress || 0;
    document.getElementById("count-review").textContent = counts.review || 0;
    document.getElementById("count-done").textContent = counts.done || 0;

    if (window.lucide) window.lucide.createIcons();
    bindTaskCardActions();
  }

  function bindEvents(container) {
    document.getElementById("btn-add-task-global")?.addEventListener("click", () => {
      openTaskModal();
    });

    container.querySelectorAll(".btn-col-add").forEach(btn => {
      btn.addEventListener("click", () => {
        openTaskModal(btn.dataset.addTo);
      });
    });
  }

  function bindTaskCardActions() {
    const sequence = ["todo", "inprogress", "review", "done"];

    document.querySelectorAll("[data-move-task]").forEach(btn => {
      btn.addEventListener("click", () => {
        const id = btn.dataset.moveTask;
        const dir = btn.dataset.direction;
        const task = DashData.getKanbanTasks().find(t => t.id === id);
        if (!task) return;

        const currentIdx = sequence.indexOf(task.column);
        let targetIdx = dir === "next" ? currentIdx + 1 : currentIdx - 1;
        if (targetIdx >= 0 && targetIdx < sequence.length) {
          DashData.updateKanbanTaskStatus(id, sequence[targetIdx]);
          DashComponents.showToast(`Task moved to ${sequence[targetIdx].toUpperCase()}`, "info", 1500);
          renderTasks();
        }
      });
    });

    document.querySelectorAll("[data-del-task]").forEach(btn => {
      btn.addEventListener("click", () => {
        const id = btn.dataset.delTask;
        DashComponents.confirmModal({
          title: "Delete Sprint Task",
          message: "Are you sure you want to remove this task card?",
          confirmText: "Delete",
          confirmVariant: "danger",
          onConfirm: () => {
            DashData.deleteKanbanTask(id);
            DashComponents.showToast("Task removed from board", "success");
            renderTasks();
          }
        });
      });
    });
  }

  function openTaskModal(preselectCol = "todo") {
    const root = document.getElementById("kanban-modal-root");
    if (!root) return;

    root.innerHTML = `
      <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm" id="km-backdrop">
        <div class="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 max-w-md w-full p-6 modal-content space-y-4">
          <div class="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
            <h3 class="text-base font-bold text-slate-900 dark:text-white">Create Sprint Task</h3>
            <button type="button" id="km-close" class="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1">
              <i data-lucide="x" class="w-4 h-4"></i>
            </button>
          </div>

          <form id="km-form" class="space-y-3 text-xs">
            <div>
              <label class="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Task Title</label>
              <input type="text" id="km-title" required placeholder="e.g. Optimize Redis sliding-window cache" class="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white">
            </div>

            <div>
              <label class="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Description</label>
              <textarea id="km-desc" required rows="3" placeholder="Technical specifications and acceptance criteria..." class="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"></textarea>
            </div>

            <div class="grid grid-cols-2 gap-3">
              <div>
                <label class="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Stage Column</label>
                <select id="km-col" class="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white">
                  <option value="todo" ${preselectCol === 'todo' ? 'selected' : ''}>To Do / Backlog</option>
                  <option value="inprogress" ${preselectCol === 'inprogress' ? 'selected' : ''}>In Progress</option>
                  <option value="review" ${preselectCol === 'review' ? 'selected' : ''}>Code Review</option>
                  <option value="done" ${preselectCol === 'done' ? 'selected' : ''}>Completed</option>
                </select>
              </div>

              <div>
                <label class="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Priority</label>
                <select id="km-prio" class="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white">
                  <option value="High">High Priority</option>
                  <option value="Medium" selected>Medium Priority</option>
                  <option value="Low">Low Priority</option>
                </select>
              </div>
            </div>

            <div class="grid grid-cols-2 gap-3">
              <div>
                <label class="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Due Date</label>
                <input type="text" id="km-due" value="Nov 25" placeholder="e.g. Nov 28" class="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white">
              </div>

              <div>
                <label class="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Tag / Category</label>
                <input type="text" id="km-tag" value="Infra" placeholder="e.g. Security" class="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white">
              </div>
            </div>

            <div class="flex items-center justify-end gap-3 pt-3 border-t border-slate-100 dark:border-slate-800">
              <button type="button" id="km-cancel" class="px-4 py-2 text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 rounded-lg">
                Cancel
              </button>
              <button type="submit" class="px-5 py-2 font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm">
                Add Task Card
              </button>
            </div>
          </form>
        </div>
      </div>
    `;

    if (window.lucide) window.lucide.createIcons({ root: root });

    const close = () => { root.innerHTML = ""; };
    document.getElementById("km-close").addEventListener("click", close);
    document.getElementById("km-cancel").addEventListener("click", close);
    document.getElementById("km-backdrop").addEventListener("click", (e) => {
      if (e.target.id === "km-backdrop") close();
    });

    document.getElementById("km-form").addEventListener("submit", (e) => {
      e.preventDefault();
      const title = document.getElementById("km-title").value.trim();
      const desc = document.getElementById("km-desc").value.trim();
      const column = document.getElementById("km-col").value;
      const priority = document.getElementById("km-prio").value;
      const dueDate = document.getElementById("km-due").value.trim();
      const tag = document.getElementById("km-tag").value.trim();

      DashData.addKanbanTask({ title, desc, column, priority, dueDate, tag });
      DashComponents.showToast(`Task "${title}" created`, "success");
      close();
      renderTasks();
    });
  }

  return { render };
})();
