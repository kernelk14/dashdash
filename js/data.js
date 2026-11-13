/**
 * DashPulse Admin Dashboard Template
 * Sample Dataset and Data Stores
 */

window.DashData = (function () {
  // Initial Theme & Preferences
  const defaultSettings = {
    profile: {
      firstName: "Alex",
      lastName: "Rivera",
      email: "alex.rivera@dashpulse.io",
      phone: "+1 (555) 234-8901",
      role: "Super Admin",
      department: "Product Engineering",
      bio: "Engineering leader focused on scalable infrastructure, SaaS metrics, and developer experience.",
      timezone: "America/New_York",
      language: "en-US",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
    },
    preferences: {
      defaultLandingPage: "dashboard",
      rowsPerPage: 10,
      currency: "USD",
      autoRefreshInterval: "off"
    },
    notifications: {
      emailOrderAlerts: true,
      emailWeeklyDigest: true,
      emailSecurityAlerts: true,
      pushNewUser: true,
      pushSystemAlerts: false,
      smsCriticalAlerts: false
    },
    security: {
      twoFactorEnabled: true,
      sessionTimeout: "30",
      activeSessions: [
        { id: "sess-1", device: "Chrome 124 on macOS Sonoma", ip: "192.168.1.42", location: "New York, USA", current: true, date: "Active now" },
        { id: "sess-2", device: "Safari 17 on iPhone 15 Pro", ip: "192.168.1.88", location: "New York, USA", current: false, date: "Yesterday, 8:14 PM" },
        { id: "sess-3", device: "Firefox 125 on Ubuntu Linux", ip: "10.0.0.15", location: "Boston, USA", current: false, date: "Nov 9, 2026" }
      ]
    },
    appearance: {
      theme: localStorage.getItem('dashpulse-theme') || 'system',
      accentColor: 'sky',
      density: 'comfortable'
    }
  };

  // 20+ Realistic Users Dataset
  const initialUsers = [
    {
      id: "usr-001",
      name: "Sophia Martinez",
      email: "sophia.martinez@acmecloud.com",
      role: "Administrator",
      status: "Active",
      plan: "Enterprise Plus",
      spend: "$14,850.00",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
      phone: "+1 (555) 782-9102",
      department: "Executive Management",
      bio: "Chief Operating Officer overseeing cloud operations and partner ecosystems.",
      createdAt: "2024-03-15",
      lastLogin: "10 minutes ago"
    },
    {
      id: "usr-002",
      name: "Marcus Vance",
      email: "marcus.v@quantumflow.io",
      role: "Editor",
      status: "Active",
      plan: "Pro Annual",
      spend: "$3,420.00",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
      phone: "+1 (555) 438-9214",
      department: "Marketing & Growth",
      bio: "Content Director heading digital campaigns and global product messaging.",
      createdAt: "2024-06-22",
      lastLogin: "2 hours ago"
    },
    {
      id: "usr-003",
      name: "Amina Al-Mansoor",
      email: "amina@lumina-analytics.com",
      role: "Developer",
      status: "Active",
      plan: "Developer Pro",
      spend: "$2,890.00",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
      phone: "+971 50 123 4567",
      department: "Core Engineering",
      bio: "Principal Platform Architect focused on high-throughput microservices.",
      createdAt: "2024-01-11",
      lastLogin: "1 day ago"
    },
    {
      id: "usr-004",
      name: "Ethan Chen",
      email: "e.chen@hyperionlabs.ai",
      role: "Billing",
      status: "Pending",
      plan: "Standard Team",
      spend: "$980.00",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
      phone: "+1 (555) 319-8802",
      department: "Finance & Accounting",
      bio: "Senior Accounting Analyst managing procurement and vendor relations.",
      createdAt: "2024-09-02",
      lastLogin: "Never"
    },
    {
      id: "usr-005",
      name: "Chloe Dupont",
      email: "chloe.dupont@novatech.fr",
      role: "Member",
      status: "Active",
      plan: "Starter Monthly",
      spend: "$490.00",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
      phone: "+33 1 42 68 55 00",
      department: "Customer Success",
      bio: "Lead Specialist ensuring fast client onboarding and SLA compliance.",
      createdAt: "2024-08-19",
      lastLogin: "3 days ago"
    },
    {
      id: "usr-006",
      name: "Devon Brooks",
      email: "dbrooks@sentineldata.org",
      role: "Administrator",
      status: "Suspended",
      plan: "Enterprise Plus",
      spend: "$19,200.00",
      avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80",
      phone: "+1 (555) 674-1290",
      department: "Security & Trust",
      bio: "Former Security Compliance Manager. Account temporarily locked for compliance review.",
      createdAt: "2023-11-04",
      lastLogin: "1 week ago"
    },
    {
      id: "usr-007",
      name: "Elena Rostova",
      email: "elena@vortexsol.de",
      role: "Editor",
      status: "Active",
      plan: "Pro Annual",
      spend: "$4,100.00",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80",
      phone: "+49 30 8923 11",
      department: "Design & UX",
      bio: "Staff Product Designer shaping design systems and interaction patterns.",
      createdAt: "2024-04-18",
      lastLogin: "4 hours ago"
    },
    {
      id: "usr-008",
      name: "Karan Patel",
      email: "karan.patel@apexmatrix.in",
      role: "Developer",
      status: "Active",
      plan: "Developer Pro",
      spend: "$1,750.00",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80",
      phone: "+91 98200 12345",
      department: "Data Engineering",
      bio: "Senior Big Data Engineer managing Apache Kafka and Snowflake pipelines.",
      createdAt: "2024-05-30",
      lastLogin: "Just now"
    },
    {
      id: "usr-009",
      name: "Sarah Jenkins",
      email: "s.jenkins@bluehorizon.co",
      role: "Member",
      status: "Inactive",
      plan: "Free Tier",
      spend: "$0.00",
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80",
      phone: "+1 (555) 890-4412",
      department: "Operations",
      bio: "Junior Project Coordinator tracking cross-team delivery milestones.",
      createdAt: "2024-02-14",
      lastLogin: "3 weeks ago"
    },
    {
      id: "usr-010",
      name: "Liam O'Connor",
      email: "liam@celticcloud.ie",
      role: "Administrator",
      status: "Active",
      plan: "Enterprise Plus",
      spend: "$22,400.00",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80",
      phone: "+353 1 496 0000",
      department: "Cloud Operations",
      bio: "VP of Global DevOps directing multi-region AWS and Azure clusters.",
      createdAt: "2023-09-01",
      lastLogin: "1 hour ago"
    },
    {
      id: "usr-011",
      name: "Maya Lin",
      email: "mlin@zenithsystems.com",
      role: "Billing",
      status: "Active",
      plan: "Standard Team",
      spend: "$1,200.00",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80",
      phone: "+1 (555) 772-8819",
      department: "Procurement",
      bio: "Strategic Sourcing Lead negotiating annual enterprise contracts.",
      createdAt: "2024-07-04",
      lastLogin: "5 hours ago"
    },
    {
      id: "usr-012",
      name: "Carlos Mendoza",
      email: "carlos@solardynamics.mx",
      role: "Developer",
      status: "Pending",
      plan: "Developer Pro",
      spend: "$620.00",
      avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80",
      phone: "+52 55 1234 5678",
      department: "Mobile Development",
      bio: "iOS and React Native engineer crafting frictionless mobile experiences.",
      createdAt: "2024-10-12",
      lastLogin: "Never"
    },
    {
      id: "usr-013",
      name: "Hannah Schmidt",
      email: "hannah.s@bavaria-saas.de",
      role: "Editor",
      status: "Active",
      plan: "Pro Annual",
      spend: "$5,100.00",
      avatar: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=150&auto=format&fit=crop&q=80",
      phone: "+49 89 2424 00",
      department: "Product Strategy",
      bio: "Director of Product specializing in AI copilot workflows.",
      createdAt: "2024-03-29",
      lastLogin: "30 minutes ago"
    },
    {
      id: "usr-014",
      name: "Zackary Taylor",
      email: "ztaylor@apexshield.net",
      role: "Member",
      status: "Suspended",
      plan: "Standard Team",
      spend: "$750.00",
      avatar: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=150&auto=format&fit=crop&q=80",
      phone: "+1 (555) 902-3311",
      department: "IT Support",
      bio: "Tier 2 Helpdesk Technician. Suspended pending credential rotation.",
      createdAt: "2024-05-12",
      lastLogin: "2 weeks ago"
    },
    {
      id: "usr-015",
      name: "Fatima Zahra",
      email: "f.zahra@atlasdigital.ma",
      role: "Developer",
      status: "Active",
      plan: "Developer Pro",
      spend: "$3,100.00",
      avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&auto=format&fit=crop&q=80",
      phone: "+212 522 123456",
      department: "Machine Learning",
      bio: "Research Scientist training NLP embeddings and generative UI agents.",
      createdAt: "2024-01-20",
      lastLogin: "Yesterday"
    },
    {
      id: "usr-016",
      name: "Oliver Wright",
      email: "oliver.w@oxfordmetrics.uk",
      role: "Administrator",
      status: "Active",
      plan: "Enterprise Plus",
      spend: "$31,000.00",
      avatar: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=150&auto=format&fit=crop&q=80",
      phone: "+44 20 7946 0912",
      department: "Security Operations",
      bio: "Chief Information Security Officer (CISO) auditing SOC 2 Type II controls.",
      createdAt: "2023-08-14",
      lastLogin: "6 hours ago"
    },
    {
      id: "usr-017",
      name: "Naomi Takahashi",
      email: "naomi.t@kyototech.jp",
      role: "Editor",
      status: "Active",
      plan: "Pro Annual",
      spend: "$6,250.00",
      avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150&auto=format&fit=crop&q=80",
      phone: "+81 3 5555 0143",
      department: "Internationalization",
      bio: "Localization Lead supporting APAC rollout and multilingual UX.",
      createdAt: "2024-04-05",
      lastLogin: "12 hours ago"
    },
    {
      id: "usr-018",
      name: "Tariq Greenwood",
      email: "tariq@prismanalytics.org",
      role: "Member",
      status: "Active",
      plan: "Starter Monthly",
      spend: "$380.00",
      avatar: "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?w=150&auto=format&fit=crop&q=80",
      phone: "+1 (555) 441-7788",
      department: "Business Analysis",
      bio: "BI Analyst building automated Looker and Tableau dashboards.",
      createdAt: "2024-08-01",
      lastLogin: "2 days ago"
    },
    {
      id: "usr-019",
      name: "Isabella Rossi",
      email: "i.rossi@milanodigital.it",
      role: "Billing",
      status: "Inactive",
      plan: "Free Tier",
      spend: "$0.00",
      avatar: "https://images.unsplash.com/photo-1548142813-c348350df52b?w=150&auto=format&fit=crop&q=80",
      phone: "+39 02 1234567",
      department: "Legal & Regulatory",
      bio: "Legal Counsel reviewing GDPR, CCPA, and software licensing terms.",
      createdAt: "2024-02-28",
      lastLogin: "1 month ago"
    },
    {
      id: "usr-020",
      name: "Gabriel Santos",
      email: "gsantos@paulistacloud.br",
      role: "Developer",
      status: "Active",
      plan: "Developer Pro",
      spend: "$2,100.00",
      avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80",
      phone: "+55 11 98765-4321",
      department: "DevOps & SRE",
      bio: "Site Reliability Engineer driving Kubernetes automation and chaos engineering.",
      createdAt: "2024-06-10",
      lastLogin: "45 minutes ago"
    }
  ];

  // 25+ Realistic Orders / Transactions Dataset
  const initialOrders = [
    {
      id: "ORD-9281",
      customer: "Sophia Martinez",
      email: "sophia.martinez@acmecloud.com",
      company: "Acme Cloud Inc.",
      date: "2026-11-12 10:45 AM",
      rawDate: "2026-11-12",
      amount: 4850.00,
      status: "Completed",
      paymentMethod: "Credit Card (Visa •••• 4242)",
      items: [
        { name: "Enterprise SaaS Tier (Annual)", qty: 1, unitPrice: 4200.00 },
        { name: "Dedicated IP Allocation", qty: 2, unitPrice: 200.00 },
        { name: "Priority 24/7 SLA Support", qty: 1, unitPrice: 250.00 }
      ],
      tax: 200.00,
      discount: 0.00,
      shippingAddress: "100 Montgomery St, Suite 1200, San Francisco, CA 94104",
      transactionId: "tx_live_948a27db481c90"
    },
    {
      id: "ORD-9280",
      customer: "Marcus Vance",
      email: "marcus.v@quantumflow.io",
      company: "QuantumFlow Labs",
      date: "2026-11-12 09:18 AM",
      rawDate: "2026-11-12",
      amount: 1250.00,
      status: "Processing",
      paymentMethod: "Stripe ACH Transfer",
      items: [
        { name: "Pro Seat Add-on (5 Users)", qty: 1, unitPrice: 1000.00 },
        { name: "Custom Domain SSL", qty: 1, unitPrice: 250.00 }
      ],
      tax: 0.00,
      discount: 0.00,
      shippingAddress: "742 Evergreen Terrace, Austin, TX 78701",
      transactionId: "tx_live_831b78ec1902f2"
    },
    {
      id: "ORD-9279",
      customer: "Amina Al-Mansoor",
      email: "amina@lumina-analytics.com",
      company: "Lumina Data LLC",
      date: "2026-11-11 04:30 PM",
      rawDate: "2026-11-11",
      amount: 890.00,
      status: "Completed",
      paymentMethod: "Credit Card (Mastercard •••• 8812)",
      items: [
        { name: "Developer API Quota (1M calls)", qty: 1, unitPrice: 890.00 }
      ],
      tax: 0.00,
      discount: 0.00,
      shippingAddress: "Downtown Business Bay, Tower 4, Dubai, UAE",
      transactionId: "tx_live_729c11aa5549b3"
    },
    {
      id: "ORD-9278",
      customer: "Elena Rostova",
      email: "elena@vortexsol.de",
      company: "Vortex Solutions GmbH",
      date: "2026-11-11 01:15 PM",
      rawDate: "2026-11-11",
      amount: 2450.00,
      status: "Completed",
      paymentMethod: "PayPal Enterprise",
      items: [
        { name: "Design System UI Kit Pro", qty: 1, unitPrice: 1250.00 },
        { name: "Team Training Workshop", qty: 1, unitPrice: 1200.00 }
      ],
      tax: 0.00,
      discount: 0.00,
      shippingAddress: "Friedrichstraße 44, 10117 Berlin, Germany",
      transactionId: "tx_live_6610dd43ab71e8"
    },
    {
      id: "ORD-9277",
      customer: "Devon Brooks",
      email: "dbrooks@sentineldata.org",
      company: "Sentinel Data Trust",
      date: "2026-11-10 11:22 AM",
      rawDate: "2026-11-10",
      amount: 3200.00,
      status: "Refunded",
      paymentMethod: "Credit Card (Amex •••• 1004)",
      items: [
        { name: "Security Audit Add-on", qty: 1, unitPrice: 3200.00 }
      ],
      tax: 0.00,
      discount: 0.00,
      shippingAddress: "500 5th Avenue, New York, NY 10110",
      transactionId: "tx_live_9981bc52ff0019"
    },
    {
      id: "ORD-9276",
      customer: "Liam O'Connor",
      email: "liam@celticcloud.ie",
      company: "Celtic Cloud Networks",
      date: "2026-11-10 08:50 AM",
      rawDate: "2026-11-10",
      amount: 6800.00,
      status: "Completed",
      paymentMethod: "Bank Wire Transfer",
      items: [
        { name: "Enterprise Cluster Deployment", qty: 1, unitPrice: 6000.00 },
        { name: "Multi-Region Redundancy", qty: 1, unitPrice: 800.00 }
      ],
      tax: 0.00,
      discount: 0.00,
      shippingAddress: "Grand Canal Dock, Dublin 2, Ireland",
      transactionId: "tx_live_4472ae99cb1088"
    },
    {
      id: "ORD-9275",
      customer: "Ethan Chen",
      email: "e.chen@hyperionlabs.ai",
      company: "Hyperion Labs",
      date: "2026-11-09 03:40 PM",
      rawDate: "2026-11-09",
      amount: 490.00,
      status: "Pending",
      paymentMethod: "Credit Card (Visa •••• 9921)",
      items: [
        { name: "Monthly Starter Subscription", qty: 1, unitPrice: 490.00 }
      ],
      tax: 0.00,
      discount: 0.00,
      shippingAddress: "320 University Ave, Palo Alto, CA 94301",
      transactionId: "tx_live_10928cdb8827a1"
    },
    {
      id: "ORD-9274",
      customer: "Chloe Dupont",
      email: "chloe.dupont@novatech.fr",
      company: "NovaTech France",
      date: "2026-11-09 11:05 AM",
      rawDate: "2026-11-09",
      amount: 320.00,
      status: "Completed",
      paymentMethod: "Credit Card (Mastercard •••• 3411)",
      items: [
        { name: "Support Ticket Quota Booster", qty: 2, unitPrice: 160.00 }
      ],
      tax: 0.00,
      discount: 0.00,
      shippingAddress: "12 Rue de la Paix, 75002 Paris, France",
      transactionId: "tx_live_5521bb1239aa80"
    },
    {
      id: "ORD-9273",
      customer: "Oliver Wright",
      email: "oliver.w@oxfordmetrics.uk",
      company: "Oxford Metrics Group",
      date: "2026-11-08 02:15 PM",
      rawDate: "2026-11-08",
      amount: 11400.00,
      status: "Completed",
      paymentMethod: "Bank Wire Transfer",
      items: [
        { name: "Global Enterprise Multi-Tenancy", qty: 1, unitPrice: 10000.00 },
        { name: "SOC-2 Type II Real-time Monitoring", qty: 1, unitPrice: 1400.00 }
      ],
      tax: 0.00,
      discount: 0.00,
      shippingAddress: "Broad Street, Oxford OX1 3AS, United Kingdom",
      transactionId: "tx_live_382901ff839a77"
    },
    {
      id: "ORD-9272",
      customer: "Naomi Takahashi",
      email: "naomi.t@kyototech.jp",
      company: "Kyoto Tech Robotics",
      date: "2026-11-08 09:30 AM",
      rawDate: "2026-11-08",
      amount: 1950.00,
      status: "Completed",
      paymentMethod: "Credit Card (JCB •••• 7120)",
      items: [
        { name: "APAC Edge Accelerator Node", qty: 3, unitPrice: 650.00 }
      ],
      tax: 0.00,
      discount: 0.00,
      shippingAddress: "Roppongi Hills Mori Tower, Tokyo, Japan",
      transactionId: "tx_live_8912aa44001192"
    },
    {
      id: "ORD-9271",
      customer: "Zackary Taylor",
      email: "ztaylor@apexshield.net",
      company: "Apex Shield Tech",
      date: "2026-11-07 05:10 PM",
      rawDate: "2026-11-07",
      amount: 750.00,
      status: "Cancelled",
      paymentMethod: "Credit Card (Visa •••• 1180)",
      items: [
        { name: "Standard Team Seat License", qty: 1, unitPrice: 750.00 }
      ],
      tax: 0.00,
      discount: 0.00,
      shippingAddress: "450 7th Ave, Seattle, WA 98101",
      transactionId: "tx_live_018274ec881a29"
    },
    {
      id: "ORD-9270",
      customer: "Fatima Zahra",
      email: "f.zahra@atlasdigital.ma",
      company: "Atlas Digital AI",
      date: "2026-11-07 10:25 AM",
      rawDate: "2026-11-07",
      amount: 3100.00,
      status: "Completed",
      paymentMethod: "Credit Card (Visa •••• 6501)",
      items: [
        { name: "ML GPU Cluster Reservation", qty: 1, unitPrice: 2800.00 },
        { name: "Vector Storage Expansion (50GB)", qty: 1, unitPrice: 300.00 }
      ],
      tax: 0.00,
      discount: 0.00,
      shippingAddress: "Technopark Casablanca, Casablanca, Morocco",
      transactionId: "tx_live_772091fa091928"
    },
    {
      id: "ORD-9269",
      customer: "Karan Patel",
      email: "karan.patel@apexmatrix.in",
      company: "Apex Matrix Systems",
      date: "2026-11-06 03:00 PM",
      rawDate: "2026-11-06",
      amount: 1750.00,
      status: "Completed",
      paymentMethod: "Credit Card (Mastercard •••• 5590)",
      items: [
        { name: "Snowflake Connector Add-on", qty: 1, unitPrice: 1250.00 },
        { name: "ETL Pipeline Monitor", qty: 1, unitPrice: 500.00 }
      ],
      tax: 0.00,
      discount: 0.00,
      shippingAddress: "BKC Bandra, Mumbai 400051, India",
      transactionId: "tx_live_992100cb291882"
    },
    {
      id: "ORD-9268",
      customer: "Hannah Schmidt",
      email: "hannah.s@bavaria-saas.de",
      company: "Bavaria SaaS Solutions",
      date: "2026-11-06 11:45 AM",
      rawDate: "2026-11-06",
      amount: 2850.00,
      status: "Processing",
      paymentMethod: "PayPal Enterprise",
      items: [
        { name: "AI Assistant Copilot Bundle", qty: 1, unitPrice: 2500.00 },
        { name: "Priority Support SLA", qty: 1, unitPrice: 350.00 }
      ],
      tax: 0.00,
      discount: 0.00,
      shippingAddress: "Maximilianstraße 12, Munich, Germany",
      transactionId: "tx_live_118290dd772210"
    },
    {
      id: "ORD-9267",
      customer: "Gabriel Santos",
      email: "gsantos@paulistacloud.br",
      company: "Paulista Cloud S.A.",
      date: "2026-11-05 04:20 PM",
      rawDate: "2026-11-05",
      amount: 2100.00,
      status: "Completed",
      paymentMethod: "Stripe ACH Transfer",
      items: [
        { name: "Kubernetes Autoscaler Engine", qty: 1, unitPrice: 1800.00 },
        { name: "Observability Metrics Storage", qty: 1, unitPrice: 300.00 }
      ],
      tax: 0.00,
      discount: 0.00,
      shippingAddress: "Av. Paulista 1000, São Paulo, Brazil",
      transactionId: "tx_live_664192bb309112"
    }
  ];

  // Activity Stream Dataset
  const initialActivities = [
    {
      id: "act-1",
      type: "order",
      title: "New enterprise deal closed",
      desc: "Sophia Martinez from Acme Cloud upgraded to Enterprise Plus ($14,850/yr).",
      timestamp: "12 minutes ago",
      icon: "shopping-bag",
      iconBg: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
    },
    {
      id: "act-2",
      type: "security",
      title: "Security rule triggered",
      desc: "Account for Devon Brooks suspended pending two-factor reset review.",
      timestamp: "45 minutes ago",
      icon: "shield-alert",
      iconBg: "bg-rose-500/10 text-rose-600 dark:text-rose-400"
    },
    {
      id: "act-3",
      type: "user",
      title: "New team member onboarded",
      desc: "Gabriel Santos accepted invitation and completed 2FA setup.",
      timestamp: "2 hours ago",
      icon: "user-plus",
      iconBg: "bg-sky-500/10 text-sky-600 dark:text-sky-400"
    },
    {
      id: "act-4",
      type: "payment",
      title: "Automated payout processed",
      desc: "Stripe ACH payout of $48,290.00 successfully transferred to Silicon Valley Bank.",
      timestamp: "5 hours ago",
      icon: "credit-card",
      iconBg: "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400"
    },
    {
      id: "act-5",
      type: "system",
      title: "Database backup completed",
      desc: "Automated snapshot backup #2908 created and encrypted across 3 regions.",
      timestamp: "8 hours ago",
      icon: "database",
      iconBg: "bg-amber-500/10 text-amber-600 dark:text-amber-400"
    }
  ];

  // Notifications Dataset
  const initialNotifications = [
    {
      id: "notif-1",
      title: "High API usage alert",
      desc: "Cluster #4 reached 88% capacity. Auto-scaling provisioned 3 extra worker nodes.",
      time: "15 min ago",
      read: false,
      type: "warning",
      icon: "alert-triangle"
    },
    {
      id: "notif-2",
      title: "Payment received: $4,850.00",
      desc: "Acme Cloud paid invoice #ORD-9281 via Visa •••• 4242.",
      time: "1 hour ago",
      read: false,
      type: "success",
      icon: "check-circle"
    },
    {
      id: "notif-3",
      title: "New member joined team",
      desc: "Gabriel Santos joined Core DevOps as a Developer.",
      time: "3 hours ago",
      read: false,
      type: "info",
      icon: "user"
    },
    {
      id: "notif-4",
      title: "Weekly analytics report ready",
      desc: "Your weekly revenue summary and retention analysis is ready for export.",
      time: "Yesterday",
      read: true,
      type: "info",
      icon: "file-text"
    }
  ];

  // Reports Definitions
  const initialReports = [
    {
      id: "rep-01",
      title: "Executive Revenue & MRR Analysis",
      category: "Financial",
      period: "Q4 2026",
      desc: "Complete breakdown of monthly recurring revenue, net new bookings, customer churn, and ARR expansion across all tiers.",
      lastRun: "Nov 12, 2026",
      fileType: "CSV / PDF",
      downloads: 142
    },
    {
      id: "rep-02",
      title: "Customer Cohort & Retention Metrics",
      category: "Growth",
      period: "Past 12 Months",
      desc: "Analysis of 30-day, 60-day, and 90-day retention cohorts, customer lifetime value (LTV), and churn probability indices.",
      lastRun: "Nov 11, 2026",
      fileType: "CSV / JSON",
      downloads: 89
    },
    {
      id: "rep-03",
      title: "Transaction & Payment Gateway Audit",
      category: "Billing",
      period: "Past 30 Days",
      desc: "Reconciliation report for Stripe, PayPal, and Wire transactions with fee summaries, failed charges, and dispute logs.",
      lastRun: "Nov 10, 2026",
      fileType: "CSV",
      downloads: 310
    },
    {
      id: "rep-04",
      title: "API Performance & Latency SLA Report",
      category: "Infrastructure",
      period: "Current Month",
      desc: "99.98% uptime audit covering p50, p95, p99 response times across US-East, EU-West, and APAC edge gateways.",
      lastRun: "Nov 09, 2026",
      fileType: "JSON / PDF",
      downloads: 64
    },
    {
      id: "rep-05",
      title: "Security & Access Compliance Audit",
      category: "Compliance",
      period: "Year to Date",
      desc: "SOC 2 Type II audit log of role assignments, privilege escalations, 2FA enforcements, and IP session rotations.",
      lastRun: "Nov 08, 2026",
      fileType: "PDF",
      downloads: 175
    },
    {
      id: "rep-06",
      title: "Sales Conversion & Funnel Breakdown",
      category: "Sales",
      period: "Past 90 Days",
      desc: "Lead-to-opportunity velocity, free-trial-to-paid conversion rates, and sales rep pipeline quotas.",
      lastRun: "Nov 05, 2026",
      fileType: "CSV",
      downloads: 118
    }
  ];

  // E-Commerce Products Dataset
  const initialProducts = [
    {
      id: "PRD-101",
      name: "Cloud Edge Gateway Appliance",
      sku: "GW-EDG-4000",
      category: "Hardware",
      price: 1499.00,
      stock: 42,
      status: "In Stock",
      rating: 4.8,
      sales: 320,
      image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=150&auto=format&fit=crop&q=80"
    },
    {
      id: "PRD-102",
      name: "Enterprise Multi-Cluster License",
      sku: "LIC-ENT-MLT",
      category: "Software",
      price: 4999.00,
      stock: 999,
      status: "In Stock",
      rating: 4.9,
      sales: 124,
      image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=150&auto=format&fit=crop&q=80"
    },
    {
      id: "PRD-103",
      name: "Developer Seat Subscription (Annual)",
      sku: "SUB-DEV-YR",
      category: "Subscription",
      price: 360.00,
      stock: 9999,
      status: "In Stock",
      rating: 4.7,
      sales: 1850,
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=150&auto=format&fit=crop&q=80"
    },
    {
      id: "PRD-104",
      name: "Hardware Security Key FIDO2",
      sku: "SEC-KEY-F2",
      category: "Hardware",
      price: 65.00,
      stock: 8,
      status: "Low Stock",
      rating: 4.6,
      sales: 840,
      image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=150&auto=format&fit=crop&q=80"
    },
    {
      id: "PRD-105",
      name: "SOC-2 Continuous Audit Agent",
      sku: "AUD-SOC2-AGT",
      category: "Software",
      price: 1200.00,
      stock: 999,
      status: "In Stock",
      rating: 5.0,
      sales: 95,
      image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=150&auto=format&fit=crop&q=80"
    },
    {
      id: "PRD-106",
      name: "Dedicated Fiber Rack 10Gbps",
      sku: "NET-FBR-10G",
      category: "Infrastructure",
      price: 2400.00,
      stock: 0,
      status: "Out of Stock",
      rating: 4.5,
      sales: 42,
      image: "https://images.unsplash.com/photo-1551703599-6b3e8379aa8b?w=150&auto=format&fit=crop&q=80"
    },
    {
      id: "PRD-107",
      name: "AI Copilot Token Pool (10M)",
      sku: "AI-TOK-10M",
      category: "Subscription",
      price: 490.00,
      stock: 500,
      status: "In Stock",
      rating: 4.9,
      sales: 610,
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=150&auto=format&fit=crop&q=80"
    },
    {
      id: "PRD-108",
      name: "Kubernetes Cluster Ingress Controller",
      sku: "K8S-ING-PRO",
      category: "Software",
      price: 750.00,
      stock: 999,
      status: "In Stock",
      rating: 4.7,
      sales: 215,
      image: "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=150&auto=format&fit=crop&q=80"
    }
  ];

  // Kanban Tasks Dataset
  const initialKanbanTasks = [
    {
      id: "TSK-01",
      title: "Migrate Postgres clusters to Aurora Serverless v2",
      desc: "Prepare schema snapshot, evaluate connection pooling with PgBouncer, and schedule zero-downtime failover window.",
      column: "todo",
      priority: "High",
      assignee: "Gabriel Santos",
      avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80",
      dueDate: "Nov 20",
      tag: "Infra",
      comments: 6
    },
    {
      id: "TSK-02",
      title: "Implement passkey WebAuthn authentication",
      desc: "Enable biometric passkeys alongside standard authenticator app TOTP flows for SOC-2 Type II audit.",
      column: "todo",
      priority: "Medium",
      assignee: "Oliver Wright",
      avatar: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=150&auto=format&fit=crop&q=80",
      dueDate: "Nov 24",
      tag: "Security",
      comments: 3
    },
    {
      id: "TSK-03",
      title: "Upgrade Stripe Billing API to v2024-10-28",
      desc: "Handle asynchronous SEPA debit webhooks, multi-currency VAT calculations, and invoice PDF regeneration.",
      column: "inprogress",
      priority: "High",
      assignee: "Ethan Chen",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
      dueDate: "Nov 16",
      tag: "Billing",
      comments: 11
    },
    {
      id: "TSK-04",
      title: "Design dynamic report PDF exporter",
      desc: "Create pixel-perfect printable stylesheets and serverless headless Chromium renderer for financial exports.",
      column: "inprogress",
      priority: "Medium",
      assignee: "Elena Rostova",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80",
      dueDate: "Nov 18",
      tag: "Design",
      comments: 4
    },
    {
      id: "TSK-05",
      title: "Audit rate-limiting gateway for APAC endpoints",
      desc: "Verify Redis sliding-window token bucket implementation across Tokyo and Singapore edge clusters.",
      column: "review",
      priority: "Low",
      assignee: "Naomi Takahashi",
      avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150&auto=format&fit=crop&q=80",
      dueDate: "Nov 15",
      tag: "API",
      comments: 8
    },
    {
      id: "TSK-06",
      title: "Publish v3.4 OpenAPI documentation",
      desc: "Generate interactive Swagger / Scalar documentation with code samples in TypeScript, Python, and Go.",
      column: "done",
      priority: "Medium",
      assignee: "Marcus Vance",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
      dueDate: "Nov 12",
      tag: "Docs",
      comments: 2
    },
    {
      id: "TSK-07",
      title: "Optimize Docker multi-stage build caching",
      desc: "Reduced container image sizes by 64% using alpine bases and BuildKit cache mounts.",
      column: "done",
      priority: "High",
      assignee: "Liam O'Connor",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80",
      dueDate: "Nov 10",
      tag: "DevOps",
      comments: 5
    }
  ];

  // Calendar Events Dataset
  const initialCalendarEvents = [
    {
      id: "EVT-01",
      title: "Executive Q4 Budget & OKR Review",
      date: "2026-11-16",
      time: "10:00 AM - 11:30 AM",
      category: "executive",
      attendees: 8,
      location: "Boardroom A / Zoom"
    },
    {
      id: "EVT-02",
      title: "Engineering Architecture Sync",
      date: "2026-11-17",
      time: "02:00 PM - 03:00 PM",
      category: "engineering",
      attendees: 14,
      location: "Google Meet"
    },
    {
      id: "EVT-03",
      title: "Client Enterprise Demo: Acme Cloud",
      date: "2026-11-19",
      time: "11:00 AM - 12:00 PM",
      category: "sales",
      attendees: 5,
      location: "Zoom Conference"
    },
    {
      id: "EVT-04",
      title: "SOC-2 Auditor Walkthrough Session",
      date: "2026-11-21",
      time: "09:00 AM - 11:00 AM",
      category: "compliance",
      attendees: 6,
      location: "Security Room 402"
    },
    {
      id: "EVT-05",
      title: "Public API v3.5 Launch Webinar",
      date: "2026-11-25",
      time: "04:00 PM - 05:30 PM",
      category: "webinar",
      attendees: 180,
      location: "YouTube Live Broadcast"
    }
  ];

  // Invoices Dataset
  const initialInvoices = [
    {
      id: "INV-2026-001",
      client: "Sophia Martinez",
      company: "Acme Cloud Inc.",
      email: "sophia.martinez@acmecloud.com",
      amount: 14850.00,
      status: "Paid",
      issueDate: "Nov 01, 2026",
      dueDate: "Nov 15, 2026",
      items: [
        { desc: "Enterprise SaaS Tier (Annual Subscription)", qty: 1, price: 12000.00 },
        { desc: "Dedicated High-Throughput VPC Peering", qty: 2, price: 1000.00 },
        { desc: "24/7 Dedicated Support SLA", qty: 1, price: 850.00 }
      ]
    },
    {
      id: "INV-2026-002",
      client: "Marcus Vance",
      company: "QuantumFlow Labs",
      email: "marcus.v@quantumflow.io",
      amount: 3420.00,
      status: "Paid",
      issueDate: "Nov 04, 2026",
      dueDate: "Nov 18, 2026",
      items: [
        { desc: "Pro Annual Team License (10 Seats)", qty: 1, price: 3000.00 },
        { desc: "Custom Domain SSL Encryption", qty: 1, price: 420.00 }
      ]
    },
    {
      id: "INV-2026-003",
      client: "Liam O'Connor",
      company: "Celtic Cloud Networks",
      email: "liam@celticcloud.ie",
      amount: 6800.00,
      status: "Pending",
      issueDate: "Nov 08, 2026",
      dueDate: "Nov 22, 2026",
      items: [
        { desc: "Multi-Region Cluster Redundancy Deployment", qty: 1, price: 6000.00 },
        { desc: "Extended Monitoring Storage Retention", qty: 1, price: 800.00 }
      ]
    },
    {
      id: "INV-2026-004",
      client: "Devon Brooks",
      company: "Sentinel Data Trust",
      email: "dbrooks@sentineldata.org",
      amount: 2200.00,
      status: "Overdue",
      issueDate: "Oct 15, 2026",
      dueDate: "Oct 30, 2026",
      items: [
        { desc: "Data Security Compliance Audit Pack", qty: 1, price: 2200.00 }
      ]
    },
    {
      id: "INV-2026-005",
      client: "Oliver Wright",
      company: "Oxford Metrics Group",
      email: "oliver.w@oxfordmetrics.uk",
      amount: 11400.00,
      status: "Paid",
      issueDate: "Nov 02, 2026",
      dueDate: "Nov 16, 2026",
      items: [
        { desc: "Global Multi-Tenant Deployment License", qty: 1, price: 10000.00 },
        { desc: "SOC-2 Type II Real-time Monitoring Node", qty: 1, price: 1400.00 }
      ]
    }
  ];

  // File Manager Dataset
  const initialFiles = [
    {
      id: "FIL-01",
      name: "Q4_Financial_Executive_Summary.pdf",
      size: "4.8 MB",
      type: "pdf",
      modified: "Today at 09:30 AM",
      owner: "Alex Rivera",
      downloads: 48
    },
    {
      id: "FIL-02",
      name: "SOC2_Type_II_Compliance_Report_2026.pdf",
      size: "18.2 MB",
      type: "pdf",
      modified: "Nov 11, 2026",
      owner: "Oliver Wright",
      downloads: 112
    },
    {
      id: "FIL-03",
      name: "Customer_Acquisition_Cohort_Data.xlsx",
      size: "2.3 MB",
      type: "sheet",
      modified: "Nov 10, 2026",
      owner: "Tariq Greenwood",
      downloads: 24
    },
    {
      id: "FIL-04",
      name: "DashPulse_Design_System_Figma_Kit.zip",
      size: "142.5 MB",
      type: "archive",
      modified: "Nov 08, 2026",
      owner: "Elena Rostova",
      downloads: 320
    },
    {
      id: "FIL-05",
      name: "Platform_Hero_Banner_Dark.png",
      size: "3.1 MB",
      type: "image",
      modified: "Nov 07, 2026",
      owner: "Elena Rostova",
      downloads: 75
    },
    {
      id: "FIL-06",
      name: "Kubernetes_Helm_Values_Production.yaml",
      size: "42 KB",
      type: "code",
      modified: "Nov 06, 2026",
      owner: "Gabriel Santos",
      downloads: 64
    }
  ];

  // Helper functions for state management and local persistence
  function loadFromStorage(key, fallback) {
    try {
      const stored = localStorage.getItem(`dashpulse_${key}`);
      return stored ? JSON.parse(stored) : fallback;
    } catch (e) {
      return fallback;
    }
  }

  function saveToStorage(key, value) {
    try {
      localStorage.setItem(`dashpulse_${key}`, JSON.stringify(value));
    } catch (e) {
      console.warn("Storage write failed", e);
    }
  }

  // Active state stores
  let usersStore = loadFromStorage('users', initialUsers);
  let ordersStore = loadFromStorage('orders', initialOrders);
  let activitiesStore = loadFromStorage('activities', initialActivities);
  let notificationsStore = loadFromStorage('notifications', initialNotifications);
  let settingsStore = loadFromStorage('settings', defaultSettings);
  let reportsStore = loadFromStorage('reports', initialReports);
  let productsStore = loadFromStorage('products', initialProducts);
  let kanbanStore = loadFromStorage('kanban', initialKanbanTasks);
  let calendarStore = loadFromStorage('calendar', initialCalendarEvents);
  let invoicesStore = loadFromStorage('invoices', initialInvoices);
  let filesStore = loadFromStorage('files', initialFiles);

  return {
    // Users API
    getUsers: () => [...usersStore],
    getUserById: (id) => usersStore.find(u => u.id === id),
    addUser: (user) => {
      const newUser = {
        id: `usr-${String(usersStore.length + 1).padStart(3, '0')}`,
        createdAt: new Date().toISOString().split('T')[0],
        lastLogin: "Just now",
        spend: "$0.00",
        avatar: user.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
        ...user
      };
      usersStore.unshift(newUser);
      saveToStorage('users', usersStore);
      return newUser;
    },
    updateUser: (id, updatedFields) => {
      const idx = usersStore.findIndex(u => u.id === id);
      if (idx !== -1) {
        usersStore[idx] = { ...usersStore[idx], ...updatedFields };
        saveToStorage('users', usersStore);
        return usersStore[idx];
      }
      return null;
    },
    deleteUser: (id) => {
      usersStore = usersStore.filter(u => u.id !== id);
      saveToStorage('users', usersStore);
      return true;
    },
    bulkDeleteUsers: (ids) => {
      const idSet = new Set(ids);
      usersStore = usersStore.filter(u => !idSet.has(u.id));
      saveToStorage('users', usersStore);
      return true;
    },
    bulkUpdateUserStatus: (ids, status) => {
      const idSet = new Set(ids);
      usersStore.forEach(u => {
        if (idSet.has(u.id)) {
          u.status = status;
        }
      });
      saveToStorage('users', usersStore);
      return true;
    },

    // Orders API
    getOrders: () => [...ordersStore],
    getOrderById: (id) => ordersStore.find(o => o.id === id),
    addOrder: (order) => {
      const newOrder = {
        id: `ORD-${Math.floor(9300 + Math.random() * 700)}`,
        date: new Date().toLocaleString(),
        rawDate: new Date().toISOString().split('T')[0],
        status: "Processing",
        items: [],
        tax: 0,
        discount: 0,
        ...order
      };
      ordersStore.unshift(newOrder);
      saveToStorage('orders', ordersStore);
      return newOrder;
    },
    updateOrderStatus: (id, status) => {
      const order = ordersStore.find(o => o.id === id);
      if (order) {
        order.status = status;
        saveToStorage('orders', ordersStore);
        return order;
      }
      return null;
    },

    // Products API
    getProducts: () => [...productsStore],
    getProductById: (id) => productsStore.find(p => p.id === id),
    addProduct: (product) => {
      const newProd = {
        id: `PRD-${Math.floor(100 + Math.random() * 900)}`,
        rating: 5.0,
        sales: 0,
        image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=150&auto=format&fit=crop&q=80",
        ...product
      };
      productsStore.unshift(newProd);
      saveToStorage('products', productsStore);
      return newProd;
    },
    updateProduct: (id, fields) => {
      const p = productsStore.find(item => item.id === id);
      if (p) {
        Object.assign(p, fields);
        saveToStorage('products', productsStore);
        return p;
      }
      return null;
    },
    deleteProduct: (id) => {
      productsStore = productsStore.filter(p => p.id !== id);
      saveToStorage('products', productsStore);
      return true;
    },

    // Kanban API
    getKanbanTasks: () => [...kanbanStore],
    addKanbanTask: (task) => {
      const newTask = {
        id: `TSK-${String(kanbanStore.length + 1).padStart(2, '0')}`,
        column: "todo",
        comments: 0,
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
        assignee: "Alex Rivera",
        ...task
      };
      kanbanStore.push(newTask);
      saveToStorage('kanban', kanbanStore);
      return newTask;
    },
    updateKanbanTaskStatus: (id, newColumn) => {
      const task = kanbanStore.find(t => t.id === id);
      if (task) {
        task.column = newColumn;
        saveToStorage('kanban', kanbanStore);
        return task;
      }
      return null;
    },
    deleteKanbanTask: (id) => {
      kanbanStore = kanbanStore.filter(t => t.id !== id);
      saveToStorage('kanban', kanbanStore);
      return true;
    },

    // Calendar API
    getCalendarEvents: () => [...calendarStore],
    addCalendarEvent: (event) => {
      const newEvt = {
        id: `EVT-${String(calendarStore.length + 1).padStart(2, '0')}`,
        attendees: 1,
        ...event
      };
      calendarStore.push(newEvt);
      saveToStorage('calendar', calendarStore);
      return newEvt;
    },
    deleteCalendarEvent: (id) => {
      calendarStore = calendarStore.filter(e => e.id !== id);
      saveToStorage('calendar', calendarStore);
      return true;
    },

    // Invoices API
    getInvoices: () => [...invoicesStore],
    getInvoiceById: (id) => invoicesStore.find(i => i.id === id),
    addInvoice: (inv) => {
      const newInv = {
        id: `INV-2026-${String(invoicesStore.length + 1).padStart(3, '0')}`,
        status: "Pending",
        issueDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        items: [],
        ...inv
      };
      invoicesStore.unshift(newInv);
      saveToStorage('invoices', invoicesStore);
      return newInv;
    },
    updateInvoiceStatus: (id, status) => {
      const inv = invoicesStore.find(i => i.id === id);
      if (inv) {
        inv.status = status;
        saveToStorage('invoices', invoicesStore);
        return inv;
      }
      return null;
    },

    // Files API
    getFiles: () => [...filesStore],
    addFile: (file) => {
      const newF = {
        id: `FIL-${String(filesStore.length + 1).padStart(2, '0')}`,
        downloads: 0,
        owner: "Alex Rivera",
        modified: "Just now",
        ...file
      };
      filesStore.unshift(newF);
      saveToStorage('files', filesStore);
      return newF;
    },
    deleteFile: (id) => {
      filesStore = filesStore.filter(f => f.id !== id);
      saveToStorage('files', filesStore);
      return true;
    },

    // Activity Stream
    getActivities: () => [...activitiesStore],
    addActivity: (activity) => {
      const newAct = {
        id: `act-${Date.now()}`,
        timestamp: "Just now",
        ...activity
      };
      activitiesStore.unshift(newAct);
      if (activitiesStore.length > 20) activitiesStore.pop();
      saveToStorage('activities', activitiesStore);
      return newAct;
    },

    // Notifications API
    getNotifications: () => [...notificationsStore],
    getUnreadNotificationCount: () => notificationsStore.filter(n => !n.read).length,
    markNotificationRead: (id) => {
      const n = notificationsStore.find(item => item.id === id);
      if (n) {
        n.read = true;
        saveToStorage('notifications', notificationsStore);
      }
    },
    markAllNotificationsRead: () => {
      notificationsStore.forEach(n => { n.read = true; });
      saveToStorage('notifications', notificationsStore);
    },

    // Reports API
    getReports: () => [...reportsStore],

    // Settings API
    getSettings: () => JSON.parse(JSON.stringify(settingsStore)),
    updateSettings: (newSettings) => {
      settingsStore = { ...settingsStore, ...newSettings };
      saveToStorage('settings', settingsStore);
      return settingsStore;
    },

    // Reset dataset to defaults
    resetAllData: () => {
      localStorage.removeItem('dashpulse_users');
      localStorage.removeItem('dashpulse_orders');
      localStorage.removeItem('dashpulse_activities');
      localStorage.removeItem('dashpulse_notifications');
      localStorage.removeItem('dashpulse_settings');
      localStorage.removeItem('dashpulse_reports');
      localStorage.removeItem('dashpulse_products');
      localStorage.removeItem('dashpulse_kanban');
      localStorage.removeItem('dashpulse_calendar');
      localStorage.removeItem('dashpulse_invoices');
      localStorage.removeItem('dashpulse_files');
      usersStore = [...initialUsers];
      ordersStore = [...initialOrders];
      activitiesStore = [...initialActivities];
      notificationsStore = [...initialNotifications];
      settingsStore = JSON.parse(JSON.stringify(defaultSettings));
      reportsStore = [...initialReports];
      productsStore = [...initialProducts];
      kanbanStore = [...initialKanbanTasks];
      calendarStore = [...initialCalendarEvents];
      invoicesStore = [...initialInvoices];
      filesStore = [...initialFiles];
    }
  };
})();
