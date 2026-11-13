# DashPulse • Enterprise SaaS Admin Dashboard Template

A complete, production-grade, highly responsive, full-featured SaaS admin dashboard template built with semantic **HTML5**, **Tailwind CSS**, **Vanilla JavaScript**, **Lucide Icons**, and **Chart.js**.

Designed as a modular, extensible, commercial-grade frontend template with rich demo applications, live customizer, and full interactive states.

🔗 **GitHub Repository**: [https://github.com/kernelk14/dashdash](https://github.com/kernelk14/dashdash)

---

## ✨ Features & Demo Applications

### 1. Product Experience & Layout
- **Live Demo Customizer Drawer**: Floating action gear button to test live color schemes (*Light*, *Dark*, *System*), primary accent palette (*Sky, Indigo, Emerald, Purple, Rose*), sidebar mode (*Full* vs *Compact Mini*), and a **Live Ticker Simulator** that streams incoming transactions in real-time.
- **Collapsible Sidebar**: Full 260px desktop navigation with grouped sections (*Overview*, *Apps & Modules*, *Management*, *UI & Auth*, *System*) and a collapsible 72px mini icon mode with saved preference in `localStorage`.
- **Responsive Mobile Navigation**: Smooth offcanvas mobile navigation drawer with backdrop blur overlay and swipe/escape dismissal.
- **Top Bar & Dynamic Breadcrumbs**: Shows contextual route hierarchy (e.g. `Home / Users / Sophia Martinez`), live ARR badge (`$1.54M +14%`), fullscreen toggle (`F11`), and quick actions.
- **Global Search & Command Palette (`Ctrl + K`)**: Fast command palette searching pages, users, transactions, and direct navigation.
- **Theme Switcher**: Complete **Light** and **Dark** mode with instant toggle (`Ctrl + D`) and automatic persistence in `localStorage`. Automatically syncs Chart.js theme colors and contrast.
- **Notifications Menu**: Dropdown with unread counter ping, category badges, and "Mark all as read" capability.
- **User Profile Menu**: Dropdown menu with avatar, quick links, and confirmed sign-out flow.

### 2. Full-Featured Applications & Pages (Zero Dead Buttons)

#### Overview
1. **Executive Dashboard (`#dashboard`)**:
   - Interactive date-range selector (`7 Days`, `30 Days`, `Quarter`) dynamically updating KPIs and charts.
   - 4 KPI metric cards with trend indicators (+14.2% Revenue, +8.1% Subscriptions, Average Order Value, Conversion Rate).
   - Interactive Revenue Growth Line/Area Chart & Channel Breakdown Doughnut Chart.
   - Real-time recent activity stream and transactions summary table.
   - Quick export action generating CSV summary.
2. **Analytics & Deep Metrics (`#analytics`)**:
   - Timeframe filters (`7D`, `30D`, `90D`, `1Y`) and product category selectors.
   - Dual-axis traffic session volume (bars) vs. pageviews (line) chart.
   - "Compare with previous period" toggle switch.
   - Product category revenue horizontal bar chart.
   - Top regional markets breakdown with visual progress meters.
   - Working CSV and JSON dataset export actions.

#### Apps & Modules
3. **Sprint Kanban Task Board (`#kanban`)**:
   - 4 Agile columns (*To Do / Backlog*, *In Progress*, *Code Review*, *Completed*).
   - Column task counter badges and fast "+" add buttons.
   - Move task forward/backward between stages with instant feedback.
   - Add Task modal with priority, assignee, due date, and tags.
   - Delete task with safety confirmation.
4. **E-Commerce & Products Catalog (`#products`)**:
   - Inventory KPI metrics (Total SKUs, Inventory Value, Low Stock Alerts, Dispatched Units).
   - Dual view mode: **Table View** and **Product Grid View**.
   - Filter by category (*Hardware, Software, Subscription, Infrastructure*) and stock level.
   - "Add New Product" modal with image preview and SKU generator.
   - Edit product modal, delete confirmation, and CSV export.
5. **Invoices & Statements (`#invoices`)**:
   - Invoices ledger table with client info, due dates, amounts, and status badges (*Paid*, *Pending*, *Overdue*).
   - Interactive Printable Invoice Modal with itemized breakdown, tax calculation, subtotal, and total due.
   - "Mark as Paid" action that updates invoice status in place.
   - "Print Invoice" action (`window.print()`).
6. **Orders & Transactions (`#orders`)**:
   - Filterable by Order ID, customer, payment method (Credit Card, ACH, Wire, PayPal), and status.
   - Order detail modal showing line items, subtotal, tax, customer billing, and transaction references.
   - "Issue Refund" action with safety confirmation modal.
   - Working "Export CSV" triggering real browser file download.
7. **Cloud File Storage Manager (`#files`)**:
   - Storage usage visual quota bar (*42.8 GB / 100 GB used*).
   - Filter by file category (*PDFs, Spreadsheets, Archives, Images, Code*).
   - Simulated file upload modal with drag-and-drop zone.
   - Download simulation and delete file action with confirmation.
8. **Calendar & Schedule (`#calendar`)**:
   - Monthly interactive calendar grid with weekday headers and day cell overflow.
   - Previous Month, Next Month, and "Today" quick controls.
   - Upcoming events sidebar with dates, times, and location tags.
   - "+ Add Event" modal with date picker and validation.

#### Management
9. **Users Directory (`#users`)**:
   - Searchable by name, email, department in real-time.
   - Filterable by Role (*Administrator, Editor, Developer, Member, Billing*) and Status (*Active, Pending, Suspended, Inactive*).
   - Clickable column sorting with ascending/descending indicators.
   - Configurable pagination (5, 10, 20 items per page).
   - Row selection checkboxes & Select All.
   - Bulk actions bar: Activate, Suspend, or Delete selected users with modal confirmation.
   - "Add New User" validated modal form.
   - In-place user editing and deletion flows.
10. **User Details Profile (`#user-detail?id=...`)**:
   - Profile summary with avatar, tier plan, lifetime spend, and account status badge.
   - Tabbed layout: Overview & Editable Personal Details, Chronological Activity Audit Trail, and Role Permissions Matrix.
   - Working Save Changes and Cancel buttons.
   - Reset password modal link and Account Suspension toggle.
11. **Reports & Exports (`#reports`)**:
   - Six structured report cards: Financial MRR, Customer Cohort LTV, Transaction Audit, Infrastructure SLA, Security SOC-2, and Sales Funnel.
   - Instant CSV & JSON download buttons for every report card.
   - "Generate Custom Report" modal with progress animation and dynamic file download.

#### UI Kit & Auth Showcase
12. **UI Component Kit & Styleguide (`#components`)**:
   - Buttons showcase: Primary, Dark, Success, Danger, Warning, Outline, Ghost.
   - Interactive live toast feedback triggers (Info, Success, Warning, Error).
   - Badges & Pills with glowing pulsing indicator dots.
   - Alerts & Inline notification callouts.
   - Form inputs with leading icon prefixes, currency inputs, and toggle switches.
13. **Authentication Flows Showcase (`#auth-login`, `#auth-register`, `#auth-forgot`, `#lock-screen`)**:
   - **Sign In** screen with demo autofill button and credentials preview.
   - **Sign Up / Register** screen with terms agreement.
   - **Password Recovery** screen with email dispatch simulation.
   - **Lock Screen** with user avatar and password unlock.

#### System
14. **System & Workspace Settings (`#settings`)**:
   - 5 structured tabs: Profile & Account, Preferences, Notification channels, Security & 2FA, and Appearance & Theme.
   - Working password update form with password strength indicator.
   - Active sessions list with "Revoke All Other Sessions".
   - Theme mode selection (Light, Dark, System) and primary accent picker.
   - Working Save Settings and Reset to Defaults behavior.
15. **Help & Knowledge Base (`#help` & 404 handler)**:
   - Searchable FAQ accordion.
   - Keyboard shortcuts cheat sheet modal.
   - "Submit Engineering Ticket" validated modal.
   - Friendly 404 Error page for unknown routes with "Return to Dashboard" action.

---

## 📁 File Structure

```
dashdash/
├── index.html              # Main HTML entry point, semantic shell & script imports
├── README.md               # Documentation and guides
├── .gitignore              # Git ignore rules
├── css/
│   └── styles.css          # Custom scrollbars, animations, shimmer skeletons, toasts
└── js/
    ├── app.js              # Hash router, theme manager, command palette, global listeners
    ├── customizer.js       # Live Theme Customizer drawer & real-time ticker simulator
    ├── data.js             # Realistic mock dataset (users, orders, products, kanban, invoices, files, calendar)
    ├── components.js       # Toasts, confirmation modals, badges, breadcrumbs, empty states, CSV/JSON exporters
    ├── charts.js           # Chart.js instances, color sync, and dark mode adaptation
    └── pages/
        ├── dashboard.js    # Dashboard overview view controller
        ├── analytics.js    # Analytics view controller
        ├── kanban.js       # Sprint kanban task board controller
        ├── ecommerce.js    # E-commerce products & inventory controller
        ├── invoices.js     # Invoices & printable statements controller
        ├── fileManager.js  # Cloud storage file manager controller
        ├── calendar.js     # Events calendar & schedule controller
        ├── users.js        # Users table, search, filters, sorting, bulk actions & modal CRUD
        ├── userDetail.js   # User details profile, tabs, and editable form
        ├── orders.js       # Orders table, filters, detail modal, CSV export
        ├── reports.js      # Reports grid, category filters, custom report generator
        ├── componentsShowcase.js # UI Component styleguide & playground
        ├── authShowcase.js # Authentication pages showcase (Sign in, Register, Forgot, Lock)
        ├── settings.js     # Settings tabs, forms, 2FA, password strength, appearance
        └── help.js         # FAQ accordion, shortcuts modal, ticket modal, and 404 handler
```

---

## 🚀 How to Run the Template

### Option 1: Direct Browser Launch (Zero Installation)
Double-click `index.html` or open it directly in Google Chrome, Microsoft Edge, Mozilla Firefox, or Safari:
```
file:///path/to/dashdash/index.html
```

### Option 2: Using Any Local Static Server
```bash
# Python 3:
python -m http.server 8000

# Node.js:
npx serve .
```

---

## ⌨️ Keyboard Shortcuts

| Shortcut | Action |
| --- | --- |
| `Ctrl + K` / `Cmd + K` | Open Command Palette / Global Search |
| `Ctrl + D` | Toggle Light / Dark Mode |
| `Ctrl + B` | Toggle Collapsible Sidebar |
| `Esc` | Close any active modal dialog, customizer, or command palette |
