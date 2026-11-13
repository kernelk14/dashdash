# DashPulse • Enterprise SaaS Admin Dashboard Template

A complete, production-grade, highly responsive, full-featured SaaS admin dashboard template built with semantic **HTML5**, **Tailwind CSS**, **Vanilla JavaScript**, **Lucide Icons**, and **Chart.js**.

Designed as a modular, extensible, commercial-grade frontend template with rich demo applications, live customizer, collapsible submenus, and full interactive states inspired by modern enterprise design systems like CoreUI.

🔗 **GitHub Repository**: [https://github.com/kernelk14/dashdash](https://github.com/kernelk14/dashdash)

---

## 🎨 Clean Typography & Design System

DashPulse uses the industry's cleanest, most legible font pairing configured directly for crisp visual hierarchy:
- **Body & UI**: **[Inter](https://rsms.me/inter/)** (Weights 300–800) with tight tracking (`letter-spacing: -0.012em`), subpixel antialiasing, and OpenType disambiguation alternates (`"cv02", "cv03", "cv04", "cv11"`).
- **Numbers & Code**: **[JetBrains Mono](https://www.jetbrains.com/lp/mono/)** with tabular numeric figures (`font-feature-settings: "tnum" 1`) guaranteeing vertical alignment across financial tables, KPI sparklines, and telemetry charts.

---

## ✨ Full-Featured Live Demo Catalog

### 1. Navigation & Shell Layout
- **Collapsible Sidebar Tree**: Grouped sections with expandable submenus and animated chevron indicators:
  - **Overview**: Dashboard (`#dashboard` with "NEW" badge), Analytics (`#analytics`)
  - **Theme**: Colors (`#colors`), Typography (`#typography`)
  - **Components**:
    - *Base*: Accordion (`#base-accordion`), Cards (`#base-cards`), Carousel (`#base-carousel`), Pagination (`#base-pagination`)
    - *Buttons*: Standard Buttons (`#buttons`), Button Groups (`#button-groups`), Dropdowns (`#dropdowns`)
    - *Forms*: Controls (`#forms`), Select (`#form-select`), Checks & Radios (`#form-checks`), Validation (`#form-validation`)
    - *Charts*: Chart.js Gallery (`#charts`)
    - *Icons*: Lucide Icons Directory (`#icons`)
    - *Notifications*: Alerts (`#notifications-alerts`), Modals (`#notifications-modals`), Toasts (`#notifications-toasts`)
    - *Widgets*: Widgets Collection (`#widgets` with "HOT" badge)
  - **Apps & Modules**: Kanban (`#kanban`), Products (`#products`), Invoices (`#invoices`), Orders (`#orders`), Cloud Storage (`#files`), Calendar (`#calendar`), Users (`#users`), Reports (`#reports`)
  - **Pages**: Authentication (`#auth-login`, `#auth-register`, `#auth-forgot`, `#lock-screen`), Error 404 (`#404`), Error 500 (`#error-500`)
  - **System**: Settings (`#settings`), Help & Docs (`#help`)
- **Desktop Mini-Mode**: Collapsible to a 72px icon rail with tooltip previews (`Ctrl + B`).
- **Responsive Mobile Navigation**: Offcanvas drawer with backdrop blur and swipe/esc dismissal.
- **Top Bar & Dynamic Breadcrumbs**: Contextual route hierarchy, live ARR ticker (`$1.54M +14%`), fullscreen toggle (`F11`), and unread notifications badge.
- **Command Palette (`Ctrl + K`)**: Instant search covering all 38 template pages, users, and transactions.
- **Theme Customizer Drawer**: Real-time mode toggle (Light / Dark / System), accent color switcher, and incoming transaction ticker simulator.

### 2. Demo Pages & Components (Zero Dead Buttons)

#### Theme
- **Colors (`#colors`)**: Contextual color swatches (Primary, Secondary, Success, Danger, Warning, Info, Light, Dark) with click-to-copy HEX values.
- **Typography (`#typography`)**: Headings scale (H1–H6), body copy weights, inline text elements, blockquotes, and tabular numeric demonstrations.

#### Base Components
- **Accordion (`#base-accordion`)**: Smooth animated collapsible panels with semantic SVG icons.
- **Cards (`#base-cards`)**: Content cards, stat cards with progress meters, image header cards, and action footers.
- **Carousel (`#base-carousel`)**: Multi-slide image carousel with dot navigation, left/right triggers, and pause on hover.
- **Pagination (`#base-pagination`)**: Paginated navigation bars, active page states, animated spinners, and striped progress bars.

#### Buttons & Dropdowns
- **Buttons (`#buttons`)**: Solid contextual buttons, subtle outline variants, sizes (sm, md, lg), and loading state spinners.
- **Button Groups (`#button-groups`)**: Joined horizontal toolbars, editor formatting groups, and segmented range toggles.
- **Dropdown Menus (`#dropdowns`)**: Standard dropdowns, split button dropdowns, right-aligned menus, and badge headers.

#### Form Controls & Validation
- **Controls (`#forms`)**: Text inputs, leading icon inputs, password visibility toggle, file upload dropzone, and live range sliders.
- **Select (`#form-select`)**: Native select menus, size scales, and multi-select tags.
- **Checks & Radios (`#form-checks`)**: Accessible checkboxes, radio groups, and iOS-style switches with active toast notifications.
- **Validation (`#form-validation`)**: Interactive client-side validated form with real-time field error messaging and submission confirmation.

#### Charts & Visualizations
- **Charts Gallery (`#charts`)**: Six responsive, theme-synced Chart.js visualizations:
  - Multi-Axis Line Chart
  - Grouped Bar Chart
  - Doughnut Platform Distribution Chart
  - Radar Multivariate Skill Matrix
  - Pie Cloud Compute Allocation Chart
  - Polar Area Telemetry Variance Chart

#### Icons Directory
- **Lucide Icons Library (`#icons`)**: 100+ searchable SVG vector icons with category filters (Navigation, Commerce, Users, Files, Security, System, Arrows) and instant click-to-copy HTML tag markup.

#### Notifications & Modals
- **Alerts (`#notifications-alerts`)**: Dismissible contextual notification banners (Success, Info, Warning, Danger).
- **Modals (`#notifications-modals`)**: Default dialog, destructive confirmation modal with callback execution, and large multi-column modal.
- **Toasts (`#notifications-toasts`)**: Interactive floating toast notification dispatcher with auto-dismissal.

#### Widgets Collection
- **Widgets (`#widgets`)**: KPI stat cards with embedded canvas sparklines, cluster CPU and NVMe storage meters, user profile summary cards, and social network statistics.

#### Core SaaS Applications
- **Executive Dashboard (`#dashboard`)**: Revenue charts, Day/Month/Year traffic filters, KPI cards with sparklines, social telemetry cards, and active user table with country flags.
- **Analytics & Intelligence (`#analytics`)**: Dual-axis session traffic vs pageviews, category bars, and regional market share meters.
- **Kanban Board (`#kanban`)**: 4-stage sprint board with task progression, add task modal, and delete safety confirmation.
- **Products Catalog (`#products`)**: Inventory table and grid views with search, category filtering, and modal CRUD.
- **Invoices & Billing (`#invoices`)**: Invoice ledger with itemized printable modal invoice and "Mark as Paid" action.
- **Orders & Transactions (`#orders`)**: Filterable, sortable transactions with refund confirmation and CSV export.
- **Cloud Storage (`#files`)**: Storage quota meter, category filters, and simulated file upload modal.
- **Schedule Calendar (`#calendar`)**: Monthly calendar grid with upcoming events sidebar and event creation.
- **Users Management (`#users`)**: Paginated user table, sorting, multi-select bulk actions, and modal editing.
- **User Detail Profile (`#user-detail?id=...`)**: Full profile summary, activity audit log, and role permissions matrix.
- **Reports & Digests (`#reports`)**: 6 structured executive report cards with instant CSV/JSON exports and custom report generator.
- **System Settings (`#settings`)**: 5 tabs (Profile, Preferences, Notifications, Security & 2FA, Appearance) with save/reset validation.
- **Error 500 Page (`#error-500`)**: Server exception screen with search, exception trace dump, and retry gateway action.
- **Error 404 Page (`#404`)**: Friendly not found layout with search and back button.

---

## 📁 File Structure

```
dashdash/
├── index.html                  # Main application shell with collapsible submenus & script tags
├── README.md                   # Complete template guide & feature documentation
├── .gitignore                  # Git ignore rules
├── css/
│   └── styles.css              # Typography tokens, custom scrollbars, toast animation, skeletons
└── js/
    ├── app.js                  # Hash router, submenu toggles, command palette, global handlers
    ├── customizer.js           # Live Theme Customizer drawer & real-time ARR ticker simulator
    ├── data.js                 # Unified mock data store (users, orders, products, kanban, etc.)
    ├── components.js           # Toasts, modals, badges, breadcrumbs, empty states, exporters
    ├── charts.js               # Theme-synced Chart.js charts & mini sparklines
    └── pages/
        ├── dashboard.js        # Overview dashboard with sparklines & traffic table
        ├── analytics.js        # Analytics deep-dive & cohort charts
        ├── ecommerce.js        # Products catalog & inventory management
        ├── kanban.js           # Sprint kanban task board
        ├── invoices.js         # Invoices ledger & printable invoice modal
        ├── fileManager.js      # Cloud bucket storage manager
        ├── calendar.js         # Monthly calendar & schedule manager
        ├── users.js            # Users table, sorting, filters & bulk actions
        ├── userDetail.js       # User details profile & audit log
        ├── orders.js           # Orders table, detail modal & CSV export
        ├── reports.js          # Reports grid & custom report generator
        ├── demoTheme.js        # Colors & Typography showcase
        ├── demoBase.js         # Accordion, Cards, Carousel, Pagination
        ├── demoButtons.js      # Buttons, Button Groups, Dropdowns
        ├── demoForms.js        # Controls, Select, Checks & Radios, Validation
        ├── demoCharts.js       # Chart.js visual gallery (6 chart types)
        ├── demoIcons.js        # Lucide vector icons directory with copy snippet
        ├── demoNotifications.js# Alerts, Modals, Toasts
        ├── demoWidgets.js      # KPI sparkline widgets & profile cards
        ├── demoErrors.js       # Error 500 & 404 pages
        ├── componentsShowcase.js # Unified UI kit playground
        ├── authShowcase.js     # Auth screens (Login, Register, Forgot, Lock)
        ├── settings.js         # Settings tabs & 2FA controls
        └── help.js             # FAQ accordion, shortcuts & support modal
```

---

## 🚀 How to Run the Template

### Direct Browser Launch (Zero Installation)
Double-click `index.html` or open it directly in Google Chrome, Microsoft Edge, Mozilla Firefox, or Safari:
```
file:///path/to/dashdash/index.html
```

### Using Any Local Static Server
```bash
# Python 3:
python -m http.server 8000

# Node.js:
npx serve .
```

---

## ⌨️ Global Keyboard Shortcuts

| Shortcut | Action |
| --- | --- |
| `Ctrl + K` / `Cmd + K` | Open Command Palette / Global Search |
| `Ctrl + D` | Toggle Light / Dark Mode |
| `Ctrl + B` | Toggle Collapsible Sidebar |
| `F11` | Toggle Fullscreen Mode |
| `Esc` | Close any active modal dialog, customizer drawer, or command palette |
