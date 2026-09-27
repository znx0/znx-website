(function () {
  const el = document.getElementById('terminal-output');
  if (!el) return;

  const LOOP_PAUSE = 4000;

  const linesTemplate = [
    { text: '┌──(znx㉿0xznx)-[~]', speed: 30, type: 'command' },
    { text: '└─$ whoami', speed: 40, type: 'command' },
    { text: '0xznx — Student & Hacker', speed: 20, delayBefore: 300, type: 'output' }
  ];

  function runSequence() {
    const lines = linesTemplate.map(l => ({ ...l }));
    let lineIndex = 0;
    let charIndex = 0;
    let spanOpen = false;

    el.innerHTML = '';

    function typeNextChar() {
      if (lineIndex >= lines.length) {
        if (spanOpen) { el.innerHTML += '</span>'; spanOpen = false; }
        el.innerHTML += '<span class="terminal-cursor">_</span>';
        setTimeout(runSequence, LOOP_PAUSE);
        return;
      }

      const current = lines[lineIndex];

      if (charIndex === 0) {
        if (lineIndex > 0) el.innerHTML += '<br>';

        const spanClass = current.type === 'command' ? 'terminal-command' : 'terminal-output-text';
        el.innerHTML += `<span class="${spanClass}">`;
        spanOpen = true;

        if (current.delayBefore) {
          const delay = current.delayBefore;
          current.delayBefore = 0;
          setTimeout(typeNextChar, delay);
          return;
        }
      }

      if (charIndex < current.text.length) {
        el.innerHTML += current.text[charIndex];
        charIndex++;
        setTimeout(typeNextChar, current.speed);
      } else {
        el.innerHTML += '</span>';
        spanOpen = false;
        lineIndex++;
        charIndex = 0;
        setTimeout(typeNextChar, 150);
      }
    }

    typeNextChar();
  }

  setTimeout(runSequence, 500);
})();
