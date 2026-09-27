(function () {
  const el = document.getElementById('terminal-output');
  if (!el) return;

  const linesTemplate = [
    { text: '┌──(znx㉿0xznx)-[~/about]', speed: 30, type: 'command' },
    { text: '└─$ whoami', speed: 40, type: 'command' },
    { text: '0xznx — Student, Hacker & Fighter', speed: 20, delayBefore: 200, type: 'output' },
    { text: '┌──(znx㉿0xznx)-[~/about]', speed: 30, delayBefore: 500, type: 'command' },
    { text: '└─$ cat about.md', speed: 40, type: 'command' },
    { text: 'Started messing with computers the way most of us did — trying to get an edge in games, poking at settings I probably shouldn\'t have touched, and eventually breaking more things than I fixed.', speed: 10, delayBefore: 300, type: 'output' },
    { text: 'That curiosity never really went away; it just found better targets.', speed: 10, delayBefore: 300, type: 'output' },
    { text: 'These days it\'s CTFs, home lab experiments, and an Electrical & Computer Engineering degree that somehow makes both the hardware and the exploits make more sense.', speed: 10, delayBefore: 300, type: 'output' },
    { text: 'I like understanding how things work well enough to take them apart — and occasionally put them back together better.', speed: 10, delayBefore: 300, type: 'output' },
    { text: 'When I\'m not at a terminal, I\'m probably at the gym — competing in Muay Thai & Kickboxing keeps the other half of my brain in check.', speed: 10, delayBefore: 300, type: 'output' }
  ];

  function runSequence() {
    const lines = linesTemplate.map(l => ({ ...l }));
    let lineIndex = 0;
    let charIndex = 0;
    let spanOpen = false;

    el.innerHTML = '';

    function typeNextChar() {
      // Quando chega ao fim, desenha o prompt final com o cursor a piscar
      if (lineIndex >= lines.length) {
        if (spanOpen) {
          el.innerHTML += '</span>';
          spanOpen = false;
        }
        el.innerHTML += '<br><span class="terminal-command">┌──(znx㉿0xznx)-[~/about]<br>└─$ </span><span class="terminal-cursor">_</span>';
        return;
      }

      const current = lines[lineIndex];

      if (charIndex === 0) {
        if (lineIndex > 0) {
          el.innerHTML += '<br>';
        }

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
