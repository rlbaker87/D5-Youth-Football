// =========================================================
// D5 YOUTH FOOTBALL — shared interactions
// =========================================================

document.addEventListener('DOMContentLoaded', function () {

  /* ---------- Glossary slide-up drawer ---------- */
  var bar = document.getElementById('glossary-bar');
  var toggle = document.getElementById('glossary-toggle');

  if (bar && toggle) {
    toggle.addEventListener('click', function () {
      var isOpen = bar.classList.toggle('open');
      toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
  }

  /* ---------- Sub-nav active-link highlight on scroll ---------- */
  var subnavLinks = document.querySelectorAll('.subnav a[href^="#"]');
  if (subnavLinks.length) {
    var targets = Array.prototype.map.call(subnavLinks, function (a) {
      return document.querySelector(a.getAttribute('href'));
    }).filter(Boolean);

    var setActive = function () {
      var scrollPos = window.scrollY + 140;
      var current = targets[0];
      targets.forEach(function (t) {
        if (t.offsetTop <= scrollPos) current = t;
      });
      subnavLinks.forEach(function (a) {
        a.classList.toggle('active', a.getAttribute('href') === '#' + current.id);
      });
    };
    window.addEventListener('scroll', setActive, { passive: true });
    setActive();
  }

  /* ---------- Position diagram hover / tap tooltips ---------- */
  var tooltip = document.getElementById('position-tooltip');
  var hotspots = document.querySelectorAll('.field-hotspot');

  if (tooltip && hotspots.length) {
    var diagramWrap = document.querySelector('.position-diagram-wrap');

    function showTooltip(el) {
      hotspots.forEach(function (h) { h.classList.remove('active'); });
      el.classList.add('active');

      var title = el.getAttribute('data-title');
      var desc = el.getAttribute('data-desc');
      tooltip.innerHTML = '<strong>' + title + '</strong>' + desc;

      var circle = el.querySelector('circle');
      var svg = el.closest('svg');
      var pt = svg.createSVGPoint();
      var box = circle.getBoundingClientRect();
      var wrapBox = diagramWrap.getBoundingClientRect();

      var x = box.left + box.width / 2 - wrapBox.left;
      var y = box.top - wrapBox.top;

      tooltip.style.left = x + 'px';
      tooltip.style.top = Math.max(y - 12, 10) + 'px';
      tooltip.classList.add('show');
    }

    hotspots.forEach(function (el) {
      el.addEventListener('mouseenter', function () { showTooltip(el); });
      el.addEventListener('focus', function () { showTooltip(el); });
      el.addEventListener('click', function (e) {
        e.preventDefault();
        if (el.classList.contains('active')) {
          el.classList.remove('active');
          tooltip.classList.remove('show');
        } else {
          showTooltip(el);
        }
      });
    });

    document.addEventListener('click', function (e) {
      if (!e.target.closest('.field-hotspot')) {
        hotspots.forEach(function (h) { h.classList.remove('active'); });
        tooltip.classList.remove('show');
      }
    });
  }

});
