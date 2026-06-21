/* ==========================================================================
   ALEX MORGAN — OPERATIONS ANALYST PORTFOLIO — interactivity layer
   ========================================================================== */

document.addEventListener('DOMContentLoaded', function () {

  /* ---------- mobile nav toggle ---------- */
  var navToggle = document.querySelector('.nav-toggle');
  var siteNav = document.querySelector('.site-nav');
  if (navToggle && siteNav) {
    navToggle.addEventListener('click', function () {
      siteNav.classList.toggle('open');
      var expanded = siteNav.classList.contains('open');
      navToggle.setAttribute('aria-expanded', expanded);
    });
    siteNav.querySelectorAll('.nav-links a').forEach(function (link) {
      link.addEventListener('click', function () { siteNav.classList.remove('open'); });
    });
  }

  /* ---------- live status-bar clock ---------- */
  var clockEl = document.getElementById('liveClock');
  function tick() {
    if (!clockEl) return;
    var now = new Date();
    var hh = String(now.getHours()).padStart(2, '0');
    var mm = String(now.getMinutes()).padStart(2, '0');
    var ss = String(now.getSeconds()).padStart(2, '0');
    clockEl.textContent = hh + ':' + mm + ':' + ss;
  }
  tick();
  setInterval(tick, 1000);

  /* ---------- scroll reveal ---------- */
  var revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('in'); });
  }

  /* ---------- animated stat counters ---------- */
  function animateCount(el) {
    var target = parseFloat(el.getAttribute('data-count'));
    var decimals = el.getAttribute('data-decimals') ? parseInt(el.getAttribute('data-decimals'), 10) : 0;
    var duration = 1400;
    var start = null;
    function step(ts) {
      if (!start) start = ts;
      var progress = Math.min((ts - start) / duration, 1);
      var eased = 1 - Math.pow(1 - progress, 3);
      var value = target * eased;
      el.textContent = decimals ? value.toFixed(decimals) : Math.round(value).toLocaleString();
      if (progress < 1) requestAnimationFrame(step);
      else el.textContent = decimals ? target.toFixed(decimals) : target.toLocaleString();
    }
    requestAnimationFrame(step);
  }
  var countEls = document.querySelectorAll('[data-count]');
  if ('IntersectionObserver' in window && countEls.length) {
    var countIo = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateCount(entry.target);
          countIo.unobserve(entry.target);
        }
      });
    }, { threshold: 0.4 });
    countEls.forEach(function (el) { countIo.observe(el); });
  } else {
    countEls.forEach(animateCount);
  }

  /* ---------- capability matrix meters ---------- */
  var meters = document.querySelectorAll('.meter-fill');
  if ('IntersectionObserver' in window && meters.length) {
    var meterIo = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var pct = entry.target.getAttribute('data-pct');
          entry.target.style.width = pct + '%';
          meterIo.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });
    meters.forEach(function (el) { meterIo.observe(el); });
  } else {
    meters.forEach(function (el) { el.style.width = el.getAttribute('data-pct') + '%'; });
  }

  /* ---------- experience timeline accordion ---------- */
  document.querySelectorAll('.tl-head').forEach(function (head) {
    head.addEventListener('click', function () {
      head.closest('.tl-item').classList.toggle('open');
    });
    head.setAttribute('tabindex', '0');
    head.setAttribute('role', 'button');
    head.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        head.click();
      }
    });
  });

  /* ---------- project / case-file filtering ---------- */
  var filterBtns = document.querySelectorAll('.filter-btn');
  var caseCards = document.querySelectorAll('.case-card');
  filterBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      filterBtns.forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');
      var filter = btn.getAttribute('data-filter');
      caseCards.forEach(function (card) {
        var tags = (card.getAttribute('data-tags') || '').split(',');
        if (filter === 'all' || tags.indexOf(filter) !== -1) {
          card.classList.remove('hidden');
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });

  /* ---------- KPI sparkline charts (Chart.js) ---------- */
  if (window.Chart) {
    var sparkConfig = function (data, color) {
      return {
        type: 'line',
        data: {
          labels: data.map(function (_, i) { return i; }),
          datasets: [{
            data: data,
            borderColor: color,
            borderWidth: 2,
            pointRadius: 0,
            tension: 0.35,
            fill: true,
            backgroundColor: function (ctx) {
              var chart = ctx.chart;
              var g = chart.ctx.createLinearGradient(0, 0, 0, chart.height || 46);
              g.addColorStop(0, color + '33');
              g.addColorStop(1, color + '00');
              return g;
            }
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          animation: { duration: 900 },
          plugins: { legend: { display: false }, tooltip: { enabled: false } },
          scales: {
            x: { display: false },
            y: { display: false }
          },
          elements: { line: { borderJoinStyle: 'round' } }
        }
      };
    };

    document.querySelectorAll('canvas[data-spark]').forEach(function (canvas) {
      var raw = canvas.getAttribute('data-spark');
      var data = raw.split(',').map(Number);
      var color = canvas.getAttribute('data-color') || '#2de2c5';
      new Chart(canvas.getContext('2d'), sparkConfig(data, color));
    });
  }

});
