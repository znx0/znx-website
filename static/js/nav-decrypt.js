(function () {
  const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*';
  const RESOLVE_SPEED = 30;
  const REVEAL_DELAY = 2;

  function scrambleChar() {
    return CHARS[Math.floor(Math.random() * CHARS.length)];
  }

  function decryptEffect(el) {
    const original = el.getAttribute('data-text') || el.textContent;
    el.setAttribute('data-text', original);

    let tick = 0;
    clearInterval(el._decryptInterval);

    el._decryptInterval = setInterval(() => {
      let output = '';
      for (let i = 0; i < original.length; i++) {
        if (original[i] === ' ') {
          output += ' ';
        } else if (tick >= i * REVEAL_DELAY) {
          output += original[i];
        } else {
          output += scrambleChar();
        }
      }
      el.textContent = output;
      tick++;

      if (tick >= original.length * REVEAL_DELAY) {
        el.textContent = original;
        clearInterval(el._decryptInterval);
      }
    }, RESOLVE_SPEED);
  }

  document.querySelectorAll('.nav-links a').forEach((el) => {
    el.addEventListener('mouseenter', () => decryptEffect(el));
  });
})();
EOF
