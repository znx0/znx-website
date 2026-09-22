(function () {
  const canvas = document.getElementById('bg-canvas');
  const ctx = canvas.getContext('2d');
  let width, height, particles;

  const AREA_PER_PARTICLE = 9000;
  const MIN_PARTICLES = 20;
  const MAX_PARTICLES = 150;
  const MAX_DISTANCE = 120;
  const SPEED = 1.5;

  const MOUSE_RADIUS = 180;
  const MOUSE_PULL = 0.0;
  const MOUSE_MIN_DIST = 50;
  let mouse = { x: null, y: null, active: false };

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }

  function getParticleCount() {
    const count = Math.floor((width * height) / AREA_PER_PARTICLE);
    return Math.min(MAX_PARTICLES, Math.max(MIN_PARTICLES, count));
  }

  function createParticles() {
    particles = [];
    const count = getParticleCount();
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * SPEED,
        vy: (Math.random() - 0.5) * SPEED
      });
    }
  }

  function update() {
    for (const p of particles) {
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0 || p.x > width) p.vx *= -1;
      if (p.y < 0 || p.y > height) p.vy *= -1;

      if (mouse.active) {
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
      }
    }
  }

  function draw() {
    ctx.clearRect(0, 0, width, height);

    ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
    for (const p of particles) {
      ctx.beginPath();
      ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
      ctx.fill();
    }

    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const a = particles[i];
        const b = particles[j];
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < MAX_DISTANCE) {
          ctx.strokeStyle = `rgba(255, 255, 255, ${1 - dist / MAX_DISTANCE})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }
    }

    if (mouse.active) {
      for (const p of particles) {
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < MOUSE_RADIUS) {
          ctx.strokeStyle = `rgba(88, 166, 255, ${1 - dist / MOUSE_RADIUS})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(mouse.x, mouse.y);
          ctx.lineTo(p.x, p.y);
          ctx.stroke();
        }
      }

      ctx.fillStyle = 'rgba(88, 166, 255, 0.9)';
      ctx.beginPath();
      ctx.arc(mouse.x, mouse.y, 3, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  function loop() {
    update();
    draw();
    requestAnimationFrame(loop);
  }

  window.addEventListener('resize', () => {
    resize();
    createParticles();
  });

  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
    mouse.active = true;
  });

  window.addEventListener('mouseleave', () => {
    mouse.active = false;
  });

  resize();
  createParticles();
  loop();
})();
