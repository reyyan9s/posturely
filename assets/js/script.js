    // ── NOTCH DEMO ──
    const reminders = [
      {
        mode: 'posture',
        notchIcon: `<svg class="demo-app-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="5" r="2"/><path d="M12 7v5M9 10l3 2 3-2M9 20h6"/></svg>`,
        fullscreen: false,
        label: 'Posture check · notch reminder',
        pipColor: '#8cb98a',
        timerVisible: false,
      },
      {
        mode: 'eye',
        notchIcon: `<svg class="demo-app-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>`,
        fullscreen: false,
        label: 'Blink reminder · notch reminder',
        pipColor: '#b8b0d8',
        timerVisible: false,
      },
      {
        mode: 'water',
        notchIcon: `<svg class="demo-app-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M12 2C6 9 4 13.5 4 16a8 8 0 0 0 16 0c0-2.5-2-7-8-14z"/></svg>`,
        fullscreen: true,
        fsIcon: `<svg viewBox="0 0 24 24" fill="white"><path d="M12 2C6 9 4 13.5 4 16a8 8 0 0 0 16 0c0-2.5-2-7-8-14z"/></svg>`,
        fsLabel: 'DRINK WATER',
        label: 'Hydration · fullscreen reminder',
        pipColor: '#7ab8d4',
        timerVisible: false,
      },
      {
        mode: 'break',
        notchIcon: `<svg class="demo-app-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M18 8h1a4 4 0 0 1 0 8h-1"/><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/></svg>`,
        fullscreen: false,
        label: 'Break timer · notch expanded',
        pipColor: '#d8cdb0',
        timerVisible: true,
      },
    ];

    const notch = document.getElementById('demoNotch');
    const notchIcon = document.getElementById('demoNotchIcon');
    const fullscreen = document.getElementById('demoFullscreen');
    const fsIcon = document.getElementById('demoFsIcon');
    const fsLabel = document.getElementById('demoFsLabel');
    const timerPill = document.getElementById('demoTimer');
    const labelText = document.getElementById('demoLabelText');
    const pip = document.getElementById('demoPip');
    const tabs = document.querySelectorAll('.reminder-tab');

    let current = 3; // start on break
    let autoTimer;

    function showReminder(idx, fromTab) {
      const r = reminders[idx];
      current = idx;

      // Update tabs
      tabs.forEach((t, i) => t.classList.toggle('active', i === idx));

      // Collapse notch first
      notch.classList.remove('expanded');
      fullscreen.classList.remove('visible');
      timerPill.classList.remove('visible');

      setTimeout(() => {
        // Update notch icon
        const iconEl = notch.querySelector('.demo-app-icon');
        if (iconEl) iconEl.outerHTML = r.notchIcon; // swap icon

        // Update label + pip
        labelText.textContent = r.label;
        pip.style.background = r.pipColor;

        if (r.fullscreen) {
          // Show fullscreen overlay
          fsIcon.innerHTML = r.fsIcon;
          fsLabel.textContent = r.fsLabel;
          fullscreen.classList.add('visible');
        } else {
          // Expand notch
          notch.classList.add('expanded');
          if (r.timerVisible) {
            setTimeout(() => timerPill.classList.add('visible'), 400);
          }
        }
      }, 320);
    }

    // Initial state
    showReminder(3);

    // Auto-cycle every 3.5s
    function startAuto() {
      autoTimer = setInterval(() => {
        showReminder((current + 1) % reminders.length);
      }, 3500);
    }
    startAuto();

    // Tab click — pause auto for 8s then resume
    tabs.forEach((tab, i) => {
      tab.addEventListener('click', () => {
        clearInterval(autoTimer);
        showReminder(i, true);
        setTimeout(startAuto, 8000);
      });
    });

    // Countdown timer — drives both notch timer and break pill
    let seconds = 5;
    setInterval(() => {
      seconds = seconds > 0 ? seconds - 1 : 59;
      const pad = n => String(n).padStart(2, '0');
      const display = `00:${pad(seconds)}`;
      const notchT = document.getElementById('notchTimer');
      const pillT = document.getElementById('demoTimerVal');
      if (notchT) notchT.textContent = display;
      if (pillT) pillT.textContent = display;
    }, 1000);

    // ── FAQ ──
    function toggleFaq(btn) {
      const item = btn.parentElement;
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
      if (!isOpen) item.classList.add('open');
    }

    // ── EMAIL FORM ──
    // Form now submits natively to Formspree.
    // The hidden _redirect field handles redirection to download.html.

    // ── SCROLL REVEAL ──
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); } }),
      { threshold: 0.1 }
    );
    document.querySelectorAll('.reveal').forEach(el => obs.observe(el));

    // ── SPOTLIGHT CARDS & MOUSE AURA & MAGNETIC BTNS ──
    const aura = document.getElementById('mouseAura');
    const fcards = document.querySelectorAll('.fcard, .why-item');
    const magBtns = document.querySelectorAll('.btn-primary');

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let auraX = mouseX;
    let auraY = mouseY;
    
    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      
      fcards.forEach(card => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
      });
    });

    magBtns.forEach(btn => {
      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        btn.style.transform = `translate(${x * 0.25}px, ${y * 0.25}px)`;
      });
      btn.addEventListener('mouseleave', () => {
        btn.style.transform = `translate(0px, 0px)`;
      });
    });

    function animateAura() {
      auraX += (mouseX - auraX) * 0.15;
      auraY += (mouseY - auraY) * 0.15;
      if (aura) {
        aura.style.left = `${auraX}px`;
        aura.style.top = `${auraY}px`;
      }
      requestAnimationFrame(animateAura);
    }
    animateAura();
