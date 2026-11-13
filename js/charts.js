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

  // Mini Sparkline Chart for KPI cards (CoreUI signature look)
  function renderSparkline(canvasId, type = "line", data = [65, 59, 84, 84, 51, 55, 40], color = "#0284c7") {
    destroyChart(canvasId);
    const canvas = document.getElementById(canvasId);
    if (!canvas || !window.Chart) return;

    const ctx = canvas.getContext("2d");
    const isDark = isDarkMode();

    let dataset = {
      data: data,
      borderColor: color,
      borderWidth: 2,
      pointRadius: type === "bar" ? 0 : 2,
      pointHoverRadius: 4,
      pointBackgroundColor: color,
      pointBorderColor: "#fff",
      tension: 0.4
    };

    if (type === "bar") {
      dataset.backgroundColor = color;
      dataset.borderRadius = 3;
    } else {
      const gradient = ctx.createLinearGradient(0, 0, 0, 70);
      gradient.addColorStop(0, color.includes("rgb") ? color : `${color}33`);
      gradient.addColorStop(1, "rgba(255,255,255,0)");
      dataset.backgroundColor = gradient;
      dataset.fill = true;
    }

    instances[canvasId] = new Chart(ctx, {
      type: type === "bar" ? "bar" : "line",
      data: {
        labels: data.map((_, i) => `D${i + 1}`),
        datasets: [dataset]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            enabled: true,
            displayColors: false,
            padding: 6,
            callbacks: {
              label: (ctx) => ` ${ctx.parsed.y}`
            }
          }
        },
        scales: {
          x: { display: false },
          y: { display: false }
        }
      }
    });
  }

  // Gallery Charts for Charts Showcase Page
  function renderChartsPageLine(canvasId = "charts-demo-line") {
    destroyChart("chartDemoLine");
    const canvas = document.getElementById(canvasId);
    if (!canvas || !window.Chart) return;
    const colors = getThemeColors();
    const ctx = canvas.getContext("2d");

    instances["chartDemoLine"] = new Chart(ctx, {
      type: "line",
      data: {
        labels: ["January", "February", "March", "April", "May", "June", "July"],
        datasets: [
          {
            label: "Monthly Active Users",
            backgroundColor: colors.primaryLight,
            borderColor: colors.primary,
            pointHoverBackgroundColor: "#fff",
            borderWidth: 2,
            data: [65, 59, 80, 81, 56, 55, 40],
            fill: true,
            tension: 0.4
          },
          {
            label: "Signups",
            backgroundColor: "transparent",
            borderColor: colors.secondary,
            pointHoverBackgroundColor: "#fff",
            borderWidth: 2,
            borderDash: [5, 5],
            data: [28, 48, 40, 19, 86, 27, 90],
            tension: 0.4
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { labels: { color: colors.textColor } }
        },
        scales: {
          x: { grid: { display: false }, ticks: { color: colors.textColor } },
          y: { grid: { color: colors.gridColor }, ticks: { color: colors.textColor } }
        }
      }
    });
  }

  function renderChartsPageBar(canvasId = "charts-demo-bar") {
    destroyChart("chartDemoBar");
    const canvas = document.getElementById(canvasId);
    if (!canvas || !window.Chart) return;
    const colors = getThemeColors();
    const ctx = canvas.getContext("2d");

    instances["chartDemoBar"] = new Chart(ctx, {
      type: "bar",
      data: {
        labels: ["January", "February", "March", "April", "May", "June", "July"],
        datasets: [
          {
            label: "Cloud Ingress",
            backgroundColor: colors.primary,
            data: [40, 20, 12, 39, 10, 40, 39],
            borderRadius: 4
          },
          {
            label: "Cloud Egress",
            backgroundColor: colors.secondary,
            data: [19, 12, 40, 29, 35, 20, 30],
            borderRadius: 4
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { labels: { color: colors.textColor } } },
        scales: {
          x: { grid: { display: false }, ticks: { color: colors.textColor } },
          y: { grid: { color: colors.gridColor }, ticks: { color: colors.textColor } }
        }
      }
    });
  }

  function renderChartsPageDoughnut(canvasId = "charts-demo-doughnut") {
    destroyChart("chartDemoDoughnut");
    const canvas = document.getElementById(canvasId);
    if (!canvas || !window.Chart) return;
    const colors = getThemeColors();
    const ctx = canvas.getContext("2d");

    instances["chartDemoDoughnut"] = new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: ["Desktop", "Mobile", "Tablet"],
        datasets: [{
          data: [300, 50, 100],
          backgroundColor: ["#0284c7", "#f59e0b", "#10b981"],
          hoverBackgroundColor: ["#0369a1", "#d97706", "#059669"],
          borderColor: isDarkMode() ? "#0f172a" : "#fff"
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { labels: { color: colors.textColor } } }
      }
    });
  }

  function renderChartsPageRadar(canvasId = "charts-demo-radar") {
    destroyChart("chartDemoRadar");
    const canvas = document.getElementById(canvasId);
    if (!canvas || !window.Chart) return;
    const colors = getThemeColors();
    const ctx = canvas.getContext("2d");

    instances["chartDemoRadar"] = new Chart(ctx, {
      type: "radar",
      data: {
        labels: ["Eating", "Drinking", "Sleeping", "Designing", "Coding", "Cycling", "Running"],
        datasets: [
          {
            label: "Current Sprint",
            backgroundColor: "rgba(2, 132, 199, 0.2)",
            borderColor: "#0284c7",
            pointBackgroundColor: "#0284c7",
            pointBorderColor: "#fff",
            data: [65, 59, 90, 81, 56, 55, 40]
          },
          {
            label: "Previous Sprint",
            backgroundColor: "rgba(99, 102, 241, 0.2)",
            borderColor: "#6366f1",
            pointBackgroundColor: "#6366f1",
            pointBorderColor: "#fff",
            data: [28, 48, 40, 19, 96, 27, 100]
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { labels: { color: colors.textColor } } },
        scales: {
          r: {
            grid: { color: colors.gridColor },
            angleLines: { color: colors.gridColor },
            pointLabels: { color: colors.textColor }
          }
        }
      }
    });
  }

  function renderChartsPagePie(canvasId = "charts-demo-pie") {
    destroyChart("chartDemoPie");
    const canvas = document.getElementById(canvasId);
    if (!canvas || !window.Chart) return;
    const colors = getThemeColors();
    const ctx = canvas.getContext("2d");

    instances["chartDemoPie"] = new Chart(ctx, {
      type: "pie",
      data: {
        labels: ["AWS US-East", "Google Cloud Frankfurt", "Azure Singapore"],
        datasets: [{
          data: [55, 30, 15],
          backgroundColor: ["#0284c7", "#6366f1", "#10b981"],
          borderColor: isDarkMode() ? "#0f172a" : "#fff"
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { labels: { color: colors.textColor } } }
      }
    });
  }

  function renderChartsPagePolarArea(canvasId = "charts-demo-polar") {
    destroyChart("chartDemoPolar");
    const canvas = document.getElementById(canvasId);
    if (!canvas || !window.Chart) return;
    const colors = getThemeColors();
    const ctx = canvas.getContext("2d");

    instances["chartDemoPolar"] = new Chart(ctx, {
      type: "polarArea",
      data: {
        labels: ["Latency p50", "Latency p95", "Memory GC", "CPU Throttling", "Disk I/O"],
        datasets: [{
          data: [11, 16, 7, 3, 14],
          backgroundColor: ["#0284c7", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6"]
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { labels: { color: colors.textColor } } },
        scales: {
          r: {
            grid: { color: colors.gridColor },
            angleLines: { color: colors.gridColor }
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
    if (document.getElementById("sparkline-users")) {
      renderSparkline("sparkline-users", "line", [26, 32, 28, 41, 38, 52, 48], "#3b82f6");
      renderSparkline("sparkline-income", "line", [35, 41, 62, 42, 63, 75, 82], "#10b981");
      renderSparkline("sparkline-conversion", "bar", [2.5, 3.1, 2.8, 3.4, 4.2, 3.8, 4.5], "#f59e0b");
      renderSparkline("sparkline-sessions", "line", [42, 35, 55, 40, 68, 59, 72], "#8b5cf6");
    }
    if (document.getElementById("charts-demo-line")) {
      renderChartsPageLine();
      renderChartsPageBar();
      renderChartsPageDoughnut();
      renderChartsPageRadar();
      renderChartsPagePie();
      renderChartsPagePolarArea();
    }
  }

  return {
    renderDashboardRevenueChart,
    renderDashboardChannelChart,
    renderAnalyticsTrafficChart,
    renderAnalyticsCategoryChart,
    renderSparkline,
    renderChartsPageLine,
    renderChartsPageBar,
    renderChartsPageDoughnut,
    renderChartsPageRadar,
    renderChartsPagePie,
    renderChartsPagePolarArea,
    syncTheme,
    destroyChart,
    destroyAllCharts
  };
})();
