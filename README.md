# DashPulse • Production SaaS Admin Dashboard Template

A complete, production-grade, highly responsive SaaS admin dashboard template built with semantic **HTML5**, **Tailwind CSS**, **Vanilla JavaScript**, **Lucide Icons**, and **Chart.js**.

Designed as a modular, extensible frontend template ready for SaaS platforms, internal tools, and analytics dashboards.

---

## ✨ Features & Highlights

### 1. Product Experience & Layout
- **Collapsible Sidebar**: Full 260px desktop navigation with grouped sections (Overview, Management, Insights, System) and a collapsible 72px mini icon mode with saved preference in `localStorage`.
- **Responsive Mobile Navigation**: Smooth offcanvas mobile navigation drawer with backdrop blur overlay and swipe/escape dismissal.
- **Top Bar & Dynamic Breadcrumbs**: Shows contextual route hierarchy (e.g. `Home / Users / Sophia Martinez`) and page metadata.
- **Global Search & Command Palette (`Ctrl + K`)**: Fast command palette searching pages, users, transactions, and direct navigation.
- **Theme Switcher**: Complete **Light** and **Dark** mode with instant toggle (`Ctrl + D`) and automatic persistence in `localStorage`. Automatically syncs Chart.js theme colors and contrast.
- **Notifications Menu**: Dropdown with unread counter ping, category badges, and "Mark all as read" capability.
- **User Profile Menu**: Dropdown menu with avatar, quick links, and confirmed sign-out flow.

### 2. Implemented Pages & Working Views
1. **Dashboard Overview (`#dashboard`)**:
   - Date range selector (7 Days, 30 Days, Quarter) updating metrics and line chart dynamically.
   - KPI metric cards with trends (+14.2% Revenue, +8.1% Active Subscriptions, Average Order Value, Conversion Rate).
   - Interactive Revenue Growth Line/Area Chart & Channel Breakdown Doughnut Chart.
   - Real-time recent activity stream and transactions summary table.
   - Quick export action generating CSV summary.
2. **Analytics & Deep Metrics (`#analytics`)**:
   - Timeframe filters (7D, 30D, 90D, 1Y) and category selectors.
   - Dual-axis traffic volume (bars) vs. pageviews (line) chart.
   - "Compare with previous period" toggle switch.
   - Product category revenue horizontal bar chart.
   - Top regional markets breakdown table with progress bars.
   - Working CSV and JSON export actions.
3. **Users Management (`#users`)**:
   - Searchable by name, email, department in real-time.
   - Filterable by Role (Administrator, Editor, Developer, Member, Billing) and Status (Active, Pending, Suspended, Inactive).
   - Sortable columns (Name, Role, Status, Joined Date) with ascending/descending indicators.
   - Configurable pagination (5, 10, 20 items per page).
   - Row selection checkboxes & Select All.
   - Bulk actions bar: Activate, Suspend, or Delete selected users with modal confirmation.
   - "Add New User" validated modal form.
   - In-place user editing and deletion flows.
4. **User Details Profile (`#user-detail?id=...`)**:
   - Profile summary with avatar, tier plan, lifetime spend, and account status badge.
   - Tabbed layout: Overview & Editable Personal Details, Chronological Activity Audit Trail, and Role Permissions Matrix.
   - Working Save Changes and Cancel buttons.
   - Reset password modal link and Account Suspension toggle.
5. **Orders & Transactions (`#orders`)**:
   - Filterable by Order ID, customer, payment method (Credit Card, ACH, Wire, PayPal), and status.
   - Interactive table with status badges (Completed, Processing, Pending, Refunded, Cancelled).
   - Order Detail View modal with line items breakdown, subtotal, tax, and total.
   - "Issue Refund" action with safety confirmation.
   - Working "Export CSV" generating real browser file downloads.
6. **Reports & Exports (`#reports`)**:
   - Six structured report cards: Financial MRR, Customer Cohort LTV, Transaction Audit, Infrastructure SLA, Security SOC-2, and Sales Funnel.
   - Instant CSV & JSON download buttons for every report card.
   - "Generate Custom Report" modal with progress animation and dynamic file download.
7. **System & Workspace Settings (`#settings`)**:
   - 5 structured tabs: Profile & Account, Preferences, Notification channels, Security & 2FA, and Appearance & Theme.
   - Working password update form with password strength indicator.
   - Active sessions list with "Revoke All Other Sessions".
   - Theme mode selection (Light, Dark, System) and primary accent picker.
   - Working Save Settings and Reset to Defaults behavior.
8. **Help & Knowledge Base (`#help` & 404 handler)**:
   - Searchable FAQ accordion.
   - Keyboard shortcuts cheat sheet modal.
   - "Submit Engineering Ticket" validated modal.
   - Friendly 404 Error page for unknown routes with "Return to Dashboard" action.

### 3. Interactions, Feedback & Accessibility
- **Zero dead buttons**: Every single visible control executes real logic, updates state, or triggers feedback.
- **Toast notification system**: Animated feedback for saves, edits, deletes, and exports.
- **Confirmation dialogs**: Required for destructive actions (deletions, refunds, session revocations).
- **Empty states**: Custom empty states with "Clear filters" action when queries yield zero records.
- **Keyboard navigation**: Accessible focus visible states (`focus-visible:ring-2`), Escape key closes modals, and hotkeys (`Ctrl+K`, `Ctrl+D`, `Ctrl+B`).

---

## 📁 File Structure

```
dashdash/
├── index.html              # Main HTML entry point, semantic shell & script imports
├── css/
│   └── styles.css          # Custom scrollbars, animations, shimmer skeletons, toasts
├── js/
│   ├── app.js              # Hash router, theme manager, command palette, global listeners
│   ├── data.js             # Realistic mock dataset (users, orders, activities, notifications, settings)
│   ├── components.js       # Toasts, confirmation modals, badges, breadcrumbs, empty states, CSV/JSON exporters
│   ├── charts.js           # Chart.js instances, color sync, and dark mode adaptation
│   └── pages/
│       ├── dashboard.js    # Dashboard overview view controller
│       ├── analytics.js    # Analytics view controller
│       ├── users.js        # Users table, search, filters, sorting, bulk actions & modal CRUD
│       ├── userDetail.js   # User details profile, tabs, and editable form
│       ├── orders.js       # Orders table, filters, detail modal, CSV export
│       ├── reports.js      # Reports grid, category filters, custom report generator
│       ├── settings.js     # Settings tabs, forms, 2FA, password strength, appearance
│       └── help.js         # FAQ accordion, shortcuts modal, ticket modal, and 404 handler
└── README.md               # Documentation and guides
```

---

## 🚀 How to Run the Template

### Option 1: Direct Browser Launch (Zero Installation)
Simply double-click `index.html` or open it directly in Google Chrome, Microsoft Edge, Mozilla Firefox, or Safari:
```
file:///path/to/dashdash/index.html
```
Because DashPulse uses hash-based routing (`#dashboard`, `#users`, etc.) and self-contained scripts, it works immediately offline and online with no server required!

### Option 2: Using Any Local Static Server
If you prefer running via a local HTTP server:

```bash
# Using Python 3:
python -m http.server 8000

# Using Node.js (npx serve):
npx serve .

# Using PHP:
php -S localhost:8000
```
Then navigate to `http://localhost:8000` in your web browser.

---

## ⌨️ Keyboard Shortcuts

| Shortcut | Action |
| --- | --- |
| `Ctrl + K` / `Cmd + K` | Open Command Palette / Global Search |
| `Ctrl + D` | Toggle Light / Dark Mode |
| `Ctrl + B` | Toggle Collapsible Sidebar |
| `Esc` | Close any active modal dialog or command palette |

---

## 🛠️ How to Customize

### Centralized Mock Data
All sample users, orders, and system settings are managed in `js/data.js` via the `DashData` store. Changes are persisted automatically to `localStorage` (keys prefixed with `dashpulse_`). To connect to a real backend, replace the local return values with `fetch()` calls.

### Theme Tokens & Styling
Tailwind colors and dark mode variants are defined in `index.html` via `tailwind.config`. Custom scrollbars, shimmer loading effects, and toast animations are maintained in `css/styles.css`.
