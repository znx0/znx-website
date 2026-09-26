(function () {
  const el = document.getElementById('terminal-output');
  if (!el) return;

  const lines = [
    { prefix: '> ', text: 'whoami', speed: 60 },
    { prefix: '', text: '0xznx — Student, Hacker & Fighter', speed: 25, delayBefore: 500 }
  ];

  let lineIndex = 0;
  let charIndex = 0;

  function typeNextChar() {
    if (lineIndex >= lines.length) {
      el.innerHTML += '<span class="terminal-cursor">_</span>';
      return;
    }

    const current = lines[lineIndex];

    if (charIndex === 0 && current.delayBefore) {
      el.innerHTML += '<br>';
      setTimeout(typeNextChar, current.delayBefore);
      current.delayBefore = 0;
      return;
    }

    if (charIndex === 0) {
      el.innerHTML += current.prefix;
    }

    if (charIndex < current.text.length) {
      el.innerHTML += current.text[charIndex];
      charIndex++;
      setTimeout(typeNextChar, current.speed);
    } else {
      lineIndex++;
      charIndex = 0;
      setTimeout(typeNextChar, 200);
    }
  }

  typeNextChar();
})();

