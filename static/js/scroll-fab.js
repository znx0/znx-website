(function () {
  const fab = document.getElementById('scroll-fab');
  if (!fab) return;

  const icon = fab.querySelector('i');

  // Atualiza apenas o ícone e o aria-label com base no scroll
  function updateArrow() {
    const threshold = window.innerHeight * 0.4;

    if (window.scrollY > threshold) {
      fab.setAttribute('aria-label', 'Scroll to top');
      if (icon) {
        icon.classList.remove('fa-chevron-down');
        icon.classList.add('fa-chevron-up');
      }
    } else {
      fab.setAttribute('aria-label', 'Scroll down');
      if (icon) {
        icon.classList.remove('fa-chevron-up');
        icon.classList.add('fa-chevron-down');
      }
    }
  }

  // Lógica de clique única e direta
  fab.addEventListener('click', function (e) {
    e.preventDefault(); // Previne qualquer navegação/refresh por omissão
    
    const threshold = window.innerHeight * 0.4;

    if (window.scrollY > threshold) {
      // Se estiver em baixo, sobe suavemente até ao topo (sem alterar o URL)
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // Se estiver em cima, desce até à secção #about
      const aboutSection = document.getElementById('about');
      if (aboutSection) {
        aboutSection.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
      }
    }
  });

  window.addEventListener('scroll', updateArrow);
  updateArrow();
})();
