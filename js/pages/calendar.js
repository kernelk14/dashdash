/**
 * DashPulse Admin Dashboard Template
 * Page: Events Calendar & Schedule
 */

window.CalendarPage = (function () {
  let currentYear = 2026;
  let currentMonth = 10; // November (0-indexed: 10 = Nov)

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  function render(container) {
    DashComponents.updateBreadcrumbs([
      { label: "Dashboard", href: "#dashboard" },
      { label: "Calendar & Schedule", href: "#calendar" }
    ]);

    container.innerHTML = `
      <div class="space-y-6">
        <!-- Header -->
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 class="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">Organization Schedule</h1>
            <p class="text-sm text-slate-500 dark:text-slate-400 mt-1">Manage executive milestones, cross-team design reviews, and compliance deadlines.</p>
          </div>
          <div class="flex items-center gap-3">
            <button id="btn-add-cal-event" type="button" class="inline-flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold shadow-sm transition-colors">
              <i data-lucide="calendar-plus" class="w-3.5 h-3.5"></i> Add Event
            </button>
          </div>
        </div>

        <!-- Calendar Container (Grid + Sidebar) -->
        <div class="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
          <!-- Calendar Main Grid (3 cols) -->
          <div class="lg:col-span-3 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 shadow-sm p-6 space-y-4">
            <!-- Calendar Navigation Header -->
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-3">
                <h2 class="text-lg font-bold text-slate-900 dark:text-white" id="cal-month-title">November 2026</h2>
                <button type="button" id="cal-today-btn" class="px-2.5 py-1 text-xs font-semibold rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 transition-colors">
                  Today
                </button>
              </div>

              <div class="flex items-center gap-1">
                <button type="button" id="cal-prev-btn" class="p-1.5 text-slate-500 hover:text-slate-800 dark:hover:text-slate-100 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800">
                  <i data-lucide="chevron-left" class="w-4 h-4"></i>
                </button>
                <button type="button" id="cal-next-btn" class="p-1.5 text-slate-500 hover:text-slate-800 dark:hover:text-slate-100 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800">
                  <i data-lucide="chevron-right" class="w-4 h-4"></i>
                </button>
              </div>
            </div>

            <!-- Weekday Column Headers -->
            <div class="grid grid-cols-7 text-center text-xs font-bold uppercase tracking-wider text-slate-400 py-2 border-b border-slate-100 dark:border-slate-800">
              <div>Sun</div>
              <div>Mon</div>
              <div>Tue</div>
              <div>Wed</div>
              <div>Thu</div>
              <div>Fri</div>
              <div>Sat</div>
            </div>

            <!-- Calendar Days Grid -->
            <div class="grid grid-cols-7 gap-1" id="cal-days-grid">
              <!-- Dynamically generated days -->
            </div>
          </div>

          <!-- Upcoming Events Sidebar (1 col) -->
          <div class="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 shadow-sm p-6 space-y-4">
            <h3 class="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <i data-lucide="clock" class="w-4 h-4 text-blue-600"></i> Upcoming Events
            </h3>

            <div class="space-y-3" id="cal-upcoming-list">
              <!-- Populated dynamically -->
            </div>
          </div>
        </div>
      </div>

      <!-- Add Event Modal Root -->
      <div id="cal-modal-root"></div>
    `;

    if (window.lucide) window.lucide.createIcons({ root: container });

    renderCalendar();
    renderUpcomingEvents();
    bindEvents(container);
  }

  function renderCalendar() {
    const grid = document.getElementById("cal-days-grid");
    const title = document.getElementById("cal-month-title");
    if (!grid || !title) return;

    title.textContent = `${monthNames[currentMonth]} ${currentYear}`;

    const firstDay = new Date(currentYear, currentMonth, 1).getDay();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const events = DashData.getCalendarEvents();

    let html = "";

    // Blank cells before first day
    for (let i = 0; i < firstDay; i++) {
      html += `<div class="h-24 p-2 bg-slate-50/40 dark:bg-slate-800/20 rounded-xl border border-transparent"></div>`;
    }

    // Days in month
    for (let day = 1; day <= daysInMonth; day++) {
      const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      const dayEvents = events.filter(e => e.date === dateStr);
      const isToday = currentYear === 2026 && currentMonth === 10 && day === 14;

      html += `
        <div class="h-24 p-2 bg-slate-50/70 dark:bg-slate-800/40 rounded-xl border border-slate-100 dark:border-slate-800/60 hover:border-blue-500/50 transition-colors flex flex-col justify-between overflow-hidden">
          <div class="flex items-center justify-between">
            <span class="text-xs font-bold ${isToday ? 'w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center font-mono' : 'text-slate-700 dark:text-slate-300'}">${day}</span>
            ${dayEvents.length > 0 ? `<span class="w-1.5 h-1.5 rounded-full bg-blue-600"></span>` : ''}
          </div>
          <div class="space-y-1 overflow-y-auto max-h-14">
            ${dayEvents.map(e => `
              <div class="text-[10px] font-medium px-1.5 py-0.5 rounded truncate bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300 border border-blue-200 dark:border-blue-800" title="${e.title} (${e.time})">
                ${e.title}
              </div>
            `).join("")}
          </div>
        </div>
      `;
    }

    grid.innerHTML = html;
  }

  function renderUpcomingEvents() {
    const list = document.getElementById("cal-upcoming-list");
    if (!list) return;

    const events = DashData.getCalendarEvents();

    list.innerHTML = events.map(e => `
      <div class="p-3 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 space-y-1">
        <div class="flex items-center justify-between">
          <span class="text-[10px] font-mono text-blue-600 dark:text-blue-400 font-semibold">${e.date}</span>
          <span class="text-[10px] text-slate-400 font-medium">${e.time.split(" - ")[0]}</span>
        </div>
        <h4 class="text-xs font-bold text-slate-900 dark:text-white leading-snug">${e.title}</h4>
        <div class="text-[11px] text-slate-400 flex items-center gap-1.5 pt-1">
          <i data-lucide="map-pin" class="w-3 h-3 text-slate-400"></i> ${e.location}
        </div>
      </div>
    `).join("");

    if (window.lucide) window.lucide.createIcons({ root: list });
  }

  function bindEvents(container) {
    document.getElementById("cal-prev-btn")?.addEventListener("click", () => {
      currentMonth--;
      if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
      }
      renderCalendar();
    });

    document.getElementById("cal-next-btn")?.addEventListener("click", () => {
      currentMonth++;
      if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
      }
      renderCalendar();
    });

    document.getElementById("cal-today-btn")?.addEventListener("click", () => {
      currentYear = 2026;
      currentMonth = 10;
      renderCalendar();
    });

    document.getElementById("btn-add-cal-event")?.addEventListener("click", () => {
      openAddEventModal();
    });
  }

  function openAddEventModal() {
    const root = document.getElementById("cal-modal-root");
    if (!root) return;

    root.innerHTML = `
      <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm" id="cal-m-backdrop">
        <div class="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 max-w-md w-full p-6 modal-content space-y-4">
          <div class="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
            <h3 class="text-base font-bold text-slate-900 dark:text-white">Schedule Calendar Event</h3>
            <button type="button" id="cal-m-close" class="text-slate-400 hover:text-slate-600 p-1">
              <i data-lucide="x" class="w-4 h-4"></i>
            </button>
          </div>

          <form id="cal-m-form" class="space-y-3 text-xs">
            <div>
              <label class="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Event Title</label>
              <input type="text" id="cm-title" required placeholder="e.g. Q4 Executive Strategy Sync" class="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white">
            </div>

            <div class="grid grid-cols-2 gap-3">
              <div>
                <label class="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Date</label>
                <input type="date" id="cm-date" required value="2026-11-20" class="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white">
              </div>
              <div>
                <label class="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Time Range</label>
                <input type="text" id="cm-time" value="03:00 PM - 04:00 PM" class="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white">
              </div>
            </div>

            <div>
              <label class="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Location or Link</label>
              <input type="text" id="cm-loc" value="Zoom / Conference Room B" class="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white">
            </div>

            <div class="flex items-center justify-end gap-3 pt-3 border-t border-slate-100 dark:border-slate-800">
              <button type="button" id="cm-cancel" class="px-4 py-2 text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 rounded-lg">
                Cancel
              </button>
              <button type="submit" class="px-5 py-2 font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm">
                Add to Calendar
              </button>
            </div>
          </form>
        </div>
      </div>
    `;

    if (window.lucide) window.lucide.createIcons({ root: root });

    const close = () => { root.innerHTML = ""; };
    document.getElementById("cal-m-close").addEventListener("click", close);
    document.getElementById("cm-cancel").addEventListener("click", close);
    document.getElementById("cal-m-backdrop").addEventListener("click", (e) => {
      if (e.target.id === "cal-m-backdrop") close();
    });

    document.getElementById("cal-m-form").addEventListener("submit", (e) => {
      e.preventDefault();
      const title = document.getElementById("cm-title").value.trim();
      const date = document.getElementById("cm-date").value;
      const time = document.getElementById("cm-time").value.trim();
      const location = document.getElementById("cm-loc").value.trim();

      DashData.addCalendarEvent({ title, date, time, location });
      DashComponents.showToast(`Event "${title}" scheduled!`, "success");
      close();
      renderCalendar();
      renderUpcomingEvents();
    });
  }

  return { render };
})();
