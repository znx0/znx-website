(function () {
  const fab = document.getElementById('scroll-fab');
  if (!fab) return;

  const icon = fab.querySelector('i');

  function updateArrow() {
    const threshold = window.innerHeight * 0.5;

    if (window.scrollY > threshold) {
      fab.href = '#top';
      fab.setAttribute('aria-label', 'Scroll to top');
      icon.classList.remove('fa-chevron-down');
      icon.classList.add('fa-chevron-up');
    } else {
      fab.href = '#about';
      fab.setAttribute('aria-label', 'Scroll down');
      icon.classList.remove('fa-chevron-up');
      icon.classList.add('fa-chevron-down');
    }
  }

  window.addEventListener('scroll', updateArrow);
  updateArrow();
})();
