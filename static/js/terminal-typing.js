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
    const completedLines = [];

    function render(partialText) {
      const current = lines[lineIndex];
      const spanClass = current.type === 'command' ? 'terminal-command' : 'terminal-output-text';
      const currentLineHTML = `<span class="${spanClass}">${partialText}</span>`;
      el.innerHTML = [...completedLines, currentLineHTML].join('<br>');
    }

    function typeNextChar() {
      if (lineIndex >= lines.length) {
        el.innerHTML = completedLines.join('<br>') + '<span class="terminal-cursor">_</span>';
        setTimeout(runSequence, LOOP_PAUSE);
        return;
      }

      const current = lines[lineIndex];

      if (charIndex === 0 && current.delayBefore) {
        render('');
        const delay = current.delayBefore;
        current.delayBefore = 0;
        setTimeout(typeNextChar, delay);
        return;
      }

      if (charIndex < current.text.length) {
        charIndex++;
        render(current.text.slice(0, charIndex));
        setTimeout(typeNextChar, current.speed);
      } else {
        const spanClass = current.type === 'command' ? 'terminal-command' : 'terminal-output-text';
        completedLines.push(`<span class="${spanClass}">${current.text}</span>`);
        el.innerHTML = completedLines.join('<br>');
        lineIndex++;
        charIndex = 0;
        setTimeout(typeNextChar, 150);
      }
    }

    typeNextChar();
  }

  setTimeout(runSequence, 500);
})();
