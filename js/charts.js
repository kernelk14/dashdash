/**
 * DashPulse Admin Dashboard Template
 * Chart.js Manager & Interactive Visualizations
 */

window.DashCharts = (function () {
  const instances = {};

  function isDarkMode() {
    return document.documentElement.classList.contains("dark");
  }

  function getThemeColors() {
    const dark = isDarkMode();
    return {
      textColor: dark ? "#94a3b8" : "#64748b",
      gridColor: dark ? "rgba(51, 65, 85, 0.4)" : "rgba(226, 232, 240, 0.8)",
      tooltipBg: dark ? "#0f172a" : "#ffffff",
      tooltipText: dark ? "#f8fafc" : "#0f172a",
      tooltipBorder: dark ? "#334155" : "#e2e8f0",
      primary: "#0284c7",
      primaryLight: dark ? "rgba(56, 189, 248, 0.15)" : "rgba(2, 132, 199, 0.1)",
      secondary: "#6366f1",
      secondaryLight: dark ? "rgba(99, 102, 241, 0.15)" : "rgba(99, 102, 241, 0.08)",
      success: "#10b981",
      amber: "#f59e0b",
      purple: "#8b5cf6"
    };
  }

  function destroyChart(name) {
    if (instances[name]) {
      instances[name].destroy();
      delete instances[name];
    }
  }

  function destroyAllCharts() {
    Object.keys(instances).forEach(name => destroyChart(name));
  }

  // Dashboard Main Revenue Chart
  function renderDashboardRevenueChart(canvasId = "dashboard-revenue-chart", period = "30d") {
    destroyChart("dashboardRevenue");
    const canvas = document.getElementById(canvasId);
    if (!canvas || !window.Chart) return;

    const colors = getThemeColors();
    const ctx = canvas.getContext("2d");

    let labels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    let dataCurrent = [32000, 41000, 39000, 56000, 68000, 72000, 89000, 94000, 102000, 115000, 128430, 138000];
    let dataPrevious = [28000, 34000, 35000, 48000, 52000, 61000, 73000, 78000, 85000, 96000, 104000, 112000];

    if (period === "7d") {
      labels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
      dataCurrent = [14200, 16800, 15400, 19200, 22100, 18900, 21830];
      dataPrevious = [12100, 14500, 13800, 16900, 18500, 15400, 17900];
    } else if (period === "90d") {
      labels = ["Sep W1", "Sep W2", "Sep W3", "Sep W4", "Oct W1", "Oct W2", "Oct W3", "Oct W4", "Nov W1", "Nov W2"];
      dataCurrent = [24000, 26000, 27500, 29000, 31000, 30500, 33000, 35500, 38000, 41430];
      dataPrevious = [19000, 21000, 22000, 24000, 25500, 26000, 27000, 29000, 31000, 33500];
    }

    const gradient = ctx.createLinearGradient(0, 0, 0, 300);
    gradient.addColorStop(0, colors.primaryLight);
    gradient.addColorStop(1, "rgba(2, 132, 199, 0)");

    instances["dashboardRevenue"] = new Chart(ctx, {
      type: "line",
      data: {
        labels: labels,
        datasets: [
          {
            label: "Current Period ($)",
            data: dataCurrent,
            borderColor: colors.primary,
            borderWidth: 2.5,
            backgroundColor: gradient,
            fill: true,
            tension: 0.35,
            pointBackgroundColor: colors.primary,
            pointBorderColor: isDarkMode() ? "#0f172a" : "#ffffff",
            pointBorderWidth: 2,
            pointRadius: 4,
            pointHoverRadius: 6
          },
          {
            label: "Previous Period ($)",
            data: dataPrevious,
            borderColor: isDarkMode() ? "#475569" : "#cbd5e1",
            borderWidth: 2,
            borderDash: [5, 5],
            fill: false,
            tension: 0.35,
            pointRadius: 0,
            pointHoverRadius: 4
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: {
          mode: "index",
          intersect: false
        },
        plugins: {
          legend: {
            display: true,
            position: "top",
            align: "end",
            labels: {
              boxWidth: 12,
              usePointStyle: true,
              color: colors.textColor,
              font: { family: "inherit", size: 12 }
            }
          },
          tooltip: {
            backgroundColor: colors.tooltipBg,
            titleColor: colors.tooltipText,
            bodyColor: colors.tooltipText,
            borderColor: colors.tooltipBorder,
            borderWidth: 1,
            padding: 10,
            boxPadding: 4,
            usePointStyle: true,
            callbacks: {
              label: function (context) {
                return ` ${context.dataset.label}: $${context.parsed.y.toLocaleString()}`;
              }
            }
          }
        },
        scales: {
          x: {
            grid: { display: false },
            ticks: { color: colors.textColor, font: { size: 11 } }
          },
          y: {
            grid: { color: colors.gridColor, drawBorder: false },
            ticks: {
              color: colors.textColor,
              font: { size: 11 },
              callback: (value) => `$${value >= 1000 ? (value / 1000) + "k" : value}`
            }
          }
        }
      }
    });
  }

  // Dashboard Channel Doughnut Chart
  function renderDashboardChannelChart(canvasId = "dashboard-channel-chart") {
    destroyChart("dashboardChannel");
    const canvas = document.getElementById(canvasId);
    if (!canvas || !window.Chart) return;

    const colors = getThemeColors();
    const ctx = canvas.getContext("2d");

    instances["dashboardChannel"] = new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: ["Enterprise Sales", "Self-Serve SaaS", "API Usage", "Partner Referrals"],
        datasets: [
          {
            data: [46, 28, 16, 10],
            backgroundColor: ["#0284c7", "#6366f1", "#10b981", "#f59e0b"],
            borderWidth: 2,
            borderColor: isDarkMode() ? "#0f172a" : "#ffffff",
            hoverOffset: 4
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: "72%",
        plugins: {
          legend: {
            position: "bottom",
            labels: {
              boxWidth: 10,
              usePointStyle: true,
              color: colors.textColor,
              font: { size: 11 }
            }
          },
          tooltip: {
            backgroundColor: colors.tooltipBg,
            titleColor: colors.tooltipText,
            bodyColor: colors.tooltipText,
            borderColor: colors.tooltipBorder,
            borderWidth: 1,
            padding: 10,
            callbacks: {
              label: (context) => ` ${context.label}: ${context.parsed}% ($${(context.parsed * 1284.3).toFixed(0)})`
            }
          }
        }
      }
    });
  }

  // Analytics Traffic Sessions Chart
  function renderAnalyticsTrafficChart(canvasId = "analytics-traffic-chart", compare = true) {
    destroyChart("analyticsTraffic");
    const canvas = document.getElementById(canvasId);
    if (!canvas || !window.Chart) return;

    const colors = getThemeColors();
    const ctx = canvas.getContext("2d");

    const labels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    const datasets = [
      {
        type: "bar",
        label: "Unique Visitors",
        data: [14200, 18500, 19400, 22100, 26800, 19800, 17200],
        backgroundColor: colors.primary,
        borderRadius: 6,
        order: 2
      },
      {
        type: "line",
        label: "Page Views",
        data: [42600, 55500, 58200, 66300, 80400, 59400, 51600],
        borderColor: colors.secondary,
        backgroundColor: "transparent",
        borderWidth: 3,
        tension: 0.3,
        pointBackgroundColor: colors.secondary,
        order: 1
      }
    ];

    if (compare) {
      datasets.push({
        type: "bar",
        label: "Prev Period Visitors",
        data: [11800, 15200, 16100, 18900, 21400, 16200, 14100],
        backgroundColor: isDarkMode() ? "rgba(71, 85, 105, 0.4)" : "rgba(203, 213, 225, 0.6)",
        borderRadius: 6,
        order: 3
      });
    }

    instances["analyticsTraffic"] = new Chart(ctx, {
      data: { labels, datasets },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: "top",
            align: "end",
            labels: {
              boxWidth: 12,
              usePointStyle: true,
              color: colors.textColor,
              font: { size: 12 }
            }
          },
          tooltip: {
            backgroundColor: colors.tooltipBg,
            titleColor: colors.tooltipText,
            bodyColor: colors.tooltipText,
            borderColor: colors.tooltipBorder,
            borderWidth: 1,
            padding: 10
          }
        },
        scales: {
          x: {
            grid: { display: false },
            ticks: { color: colors.textColor, font: { size: 11 } }
          },
          y: {
            grid: { color: colors.gridColor, drawBorder: false },
            ticks: {
              color: colors.textColor,
              font: { size: 11 },
              callback: (v) => (v >= 1000 ? `${v / 1000}k` : v)
            }
          }
        }
      }
    });
  }

  // Analytics Category Breakdown Chart
  function renderAnalyticsCategoryChart(canvasId = "analytics-category-chart") {
    destroyChart("analyticsCategory");
    const canvas = document.getElementById(canvasId);
    if (!canvas || !window.Chart) return;

    const colors = getThemeColors();
    const ctx = canvas.getContext("2d");

    instances["analyticsCategory"] = new Chart(ctx, {
      type: "bar",
      data: {
        labels: ["Cloud Storage", "API Gateway", "Compute Nodes", "SLA Support", "Security Add-on"],
        datasets: [
          {
            label: "Revenue ($)",
            data: [42500, 31200, 24800, 18400, 11530],
            backgroundColor: ["#0284c7", "#38bdf8", "#6366f1", "#10b981", "#f59e0b"],
            borderRadius: 6
          }
        ]
      },
      options: {
        indexAxis: "y",
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: colors.tooltipBg,
            titleColor: colors.tooltipText,
            bodyColor: colors.tooltipText,
            borderColor: colors.tooltipBorder,
            borderWidth: 1,
            padding: 10,
            callbacks: {
              label: (ctx) => ` Revenue: $${ctx.parsed.x.toLocaleString()}`
            }
          }
        },
        scales: {
          x: {
            grid: { color: colors.gridColor, drawBorder: false },
            ticks: {
              color: colors.textColor,
              callback: (v) => `$${v / 1000}k`
            }
          },
          y: {
            grid: { display: false },
            ticks: { color: colors.textColor }
          }
        }
      }
    });
  }

  // Update theme of active charts without full reload
  function syncTheme() {
    // If charts exist on current view, re-render them
    if (document.getElementById("dashboard-revenue-chart")) {
      renderDashboardRevenueChart();
    }
    if (document.getElementById("dashboard-channel-chart")) {
      renderDashboardChannelChart();
    }
    if (document.getElementById("analytics-traffic-chart")) {
      renderAnalyticsTrafficChart();
    }
    if (document.getElementById("analytics-category-chart")) {
      renderAnalyticsCategoryChart();
    }
  }

  return {
    renderDashboardRevenueChart,
    renderDashboardChannelChart,
    renderAnalyticsTrafficChart,
    renderAnalyticsCategoryChart,
    syncTheme,
    destroyChart,
    destroyAllCharts
  };
})();
