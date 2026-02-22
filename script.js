/* ===================================================
   PORTFOLIO SCRIPT — Karthick Narayanen Murugan
   =================================================== */

(function () {
    'use strict';

    /* ───── HERO CANVAS: data-grid background ───── */
    const canvas = document.getElementById('hero-canvas');
    const ctx = canvas.getContext('2d');

    let W, H, nodes = [], animId;

    function resize() {
        W = canvas.width = canvas.offsetWidth;
        H = canvas.height = canvas.offsetHeight;
        buildNodes();
    }

    function buildNodes() {
        nodes = [];
        const count = Math.floor((W * H) / 18000);
        for (let i = 0; i < count; i++) {
            nodes.push({
                x: Math.random() * W,
                y: Math.random() * H,
                vx: (Math.random() - 0.5) * 0.28,
                vy: (Math.random() - 0.5) * 0.28,
                r: Math.random() * 1.5 + 0.5
            });
        }
    }

    function drawCanvas() {
        ctx.clearRect(0, 0, W, H);

        const TEAL = '0,212,200';
        const CONN_DIST = 130;

        // Draw connections
        for (let i = 0; i < nodes.length; i++) {
            for (let j = i + 1; j < nodes.length; j++) {
                const dx = nodes[i].x - nodes[j].x;
                const dy = nodes[i].y - nodes[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < CONN_DIST) {
                    const alpha = (1 - dist / CONN_DIST) * 0.18;
                    ctx.beginPath();
                    ctx.moveTo(nodes[i].x, nodes[i].y);
                    ctx.lineTo(nodes[j].x, nodes[j].y);
                    ctx.strokeStyle = `rgba(${TEAL},${alpha})`;
                    ctx.lineWidth = 0.6;
                    ctx.stroke();
                }
            }
        }

        // Draw nodes
        nodes.forEach(n => {
            ctx.beginPath();
            ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${TEAL},0.55)`;
            ctx.fill();
        });

        // Update positions
        nodes.forEach(n => {
            n.x += n.vx;
            n.y += n.vy;
            if (n.x < 0 || n.x > W) n.vx *= -1;
            if (n.y < 0 || n.y > H) n.vy *= -1;
        });

        animId = requestAnimationFrame(drawCanvas);
    }

    window.addEventListener('resize', () => {
        cancelAnimationFrame(animId);
        resize();
        drawCanvas();
    });
    resize();
    drawCanvas();


    /* ───── NAVBAR: scroll behaviour ───── */
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-links a');
    const sections = document.querySelectorAll('section[id]');

    function updateNav() {
        if (window.scrollY > 30) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Highlight active section
        const scrollY = window.scrollY + 100;
        sections.forEach(section => {
            const top = section.offsetTop;
            const bottom = top + section.offsetHeight;
            const id = section.id;
            navLinks.forEach(link => {
                if (link.getAttribute('href') === '#' + id) {
                    if (scrollY >= top && scrollY < bottom) {
                        link.classList.add('active');
                    } else {
                        link.classList.remove('active');
                    }
                }
            });
        });
    }

    window.addEventListener('scroll', updateNav, { passive: true });
    updateNav();


    /* ───── MOBILE TOGGLE ───── */
    const navToggle = document.getElementById('nav-toggle');
    const navLinksContainer = document.getElementById('nav-links');

    navToggle.addEventListener('click', () => {
        const isOpen = navLinksContainer.classList.toggle('open');
        navToggle.classList.toggle('open', isOpen);
        navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    // Close on link click (mobile)
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navLinksContainer.classList.remove('open');
            navToggle.classList.remove('open');
            navToggle.setAttribute('aria-expanded', 'false');
        });
    });


    /* ───── SCROLL REVEAL ───── */
    const revealEls = document.querySelectorAll('.reveal');

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry, i) => {
                if (entry.isIntersecting) {
                    // Staggered delay for grouped items
                    const siblings = [...entry.target.parentElement.querySelectorAll('.reveal')];
                    const idx = siblings.indexOf(entry.target);
                    const delay = Math.min(idx * 80, 400);
                    setTimeout(() => {
                        entry.target.classList.add('in-view');
                    }, delay);
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    revealEls.forEach(el => observer.observe(el));


    /* ───── CONTACT FORM ───── */
    const form = document.getElementById('contact-form');
    const statusEl = document.getElementById('form-status');

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = form.querySelector('#contact-name').value.trim();
        const email = form.querySelector('#contact-email').value.trim();
        const message = form.querySelector('#contact-message').value.trim();
        const submitBtn = document.getElementById('contact-submit-btn');

        // Simple validation
        if (!name || !email || !message) {
            statusEl.textContent = 'Please fill in all fields.';
            statusEl.className = 'form-status error';
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            statusEl.textContent = 'Please enter a valid email address.';
            statusEl.className = 'form-status error';
            return;
        }

        // Send via Formspree
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending…';

        fetch('https://formspree.io/f/maqdlwne', {
            method: 'POST',
            headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, message })
        })
            .then(res => {
                if (res.ok) {
                    statusEl.textContent = '✓ Message sent! I\'ll get back to you soon.';
                    statusEl.className = 'form-status success';
                    form.reset();
                    setTimeout(() => {
                        statusEl.textContent = '';
                        statusEl.className = 'form-status';
                    }, 5000);
                } else {
                    return res.json().then(data => {
                        throw new Error(data.errors ? data.errors.map(e => e.message).join(', ') : 'Something went wrong.');
                    });
                }
            })
            .catch(err => {
                statusEl.textContent = '✗ ' + err.message;
                statusEl.className = 'form-status error';
            })
            .finally(() => {
                submitBtn.disabled = false;
                submitBtn.textContent = 'Send Message';
            });
    });


    /* ───── STAGGER REVEAL on load ───── */
    window.addEventListener('load', () => {
        // Trigger hero reveals immediately
        const heroReveals = document.querySelectorAll('#hero .reveal');
        heroReveals.forEach((el, i) => {
            setTimeout(() => {
                el.classList.add('in-view');
            }, 200 + i * 130);
        });
    });

})();
