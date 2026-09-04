/* ===================================================
   PORTFOLIO SCRIPT — Karthick Narayanen Murugan
   Features:
   1. Dynamic Data-Grid Canvas
   2. Interactive RAG AI Agent Terminal
   3. Live Monte Carlo Supply Chain Simulator Engine
   4. Category Project Filtering
   5. Mouse Spotlight Glow & Copy Email Clipboard
   =================================================== */

(function () {
    'use strict';

    /* ───── MOUSE SPOTLIGHT TRACKING ───── */
    window.addEventListener('mousemove', (e) => {
        const x = `${(e.clientX / window.innerWidth) * 100}%`;
        const y = `${(e.clientY / window.innerHeight) * 100}%`;
        document.documentElement.style.setProperty('--mouse-x', x);
        document.documentElement.style.setProperty('--mouse-y', y);
    }, { passive: true });


    /* ───── HERO CANVAS: data-grid background ───── */
    const heroCanvas = document.getElementById('hero-canvas');
    if (heroCanvas) {
        const ctx = heroCanvas.getContext('2d');
        let W, H, nodes = [], animId;

        function resizeHero() {
            W = heroCanvas.width = heroCanvas.offsetWidth;
            H = heroCanvas.height = heroCanvas.offsetHeight;
            buildNodes();
        }

        function buildNodes() {
            nodes = [];
            const count = Math.floor((W * H) / 16000);
            for (let i = 0; i < count; i++) {
                nodes.push({
                    x: Math.random() * W,
                    y: Math.random() * H,
                    vx: (Math.random() - 0.5) * 0.25,
                    vy: (Math.random() - 0.5) * 0.25,
                    r: Math.random() * 1.5 + 0.6
                });
            }
        }

        function drawHero() {
            ctx.clearRect(0, 0, W, H);
            const TEAL = '0,229,208';
            const CONN_DIST = 135;

            // Connections
            for (let i = 0; i < nodes.length; i++) {
                for (let j = i + 1; j < nodes.length; j++) {
                    const dx = nodes[i].x - nodes[j].x;
                    const dy = nodes[i].y - nodes[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < CONN_DIST) {
                        const alpha = (1 - dist / CONN_DIST) * 0.16;
                        ctx.beginPath();
                        ctx.moveTo(nodes[i].x, nodes[i].y);
                        ctx.lineTo(nodes[j].x, nodes[j].y);
                        ctx.strokeStyle = `rgba(${TEAL},${alpha})`;
                        ctx.lineWidth = 0.65;
                        ctx.stroke();
                    }
                }
            }

            // Nodes
            nodes.forEach(n => {
                ctx.beginPath();
                ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(${TEAL},0.6)`;
                ctx.fill();
            });

            // Physics update
            nodes.forEach(n => {
                n.x += n.vx;
                n.y += n.vy;
                if (n.x < 0 || n.x > W) n.vx *= -1;
                if (n.y < 0 || n.y > H) n.vy *= -1;
            });

            animId = requestAnimationFrame(drawHero);
        }

        window.addEventListener('resize', () => {
            cancelAnimationFrame(animId);
            resizeHero();
            drawHero();
        });
        resizeHero();
        drawHero();
    }


    /* ───── NAVBAR & SCROLL SPY ───── */
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-links a');
    const sections = document.querySelectorAll('section[id]');

    function updateNav() {
        if (window.scrollY > 30) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        const scrollY = window.scrollY + 120;
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

    if (navToggle && navLinksContainer) {
        navToggle.addEventListener('click', () => {
            const isOpen = navLinksContainer.classList.toggle('open');
            navToggle.classList.toggle('open', isOpen);
            navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        });

        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navLinksContainer.classList.remove('open');
                navToggle.classList.remove('open');
                navToggle.setAttribute('aria-expanded', 'false');
            });
        });
    }


    /* ───── SCROLL REVEAL OBSERVER ───── */
    const revealEls = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const siblings = [...entry.target.parentElement.querySelectorAll('.reveal')];
                    const idx = siblings.indexOf(entry.target);
                    const delay = Math.min(idx * 70, 350);
                    setTimeout(() => {
                        entry.target.classList.add('in-view');
                    }, delay);
                    revealObserver.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );
    revealEls.forEach(el => revealObserver.observe(el));


    /* ───── COPY EMAIL CLIPBOARD ───── */
    const copyEmailBtn = document.getElementById('hero-copy-email');
    if (copyEmailBtn) {
        copyEmailBtn.addEventListener('click', () => {
            const email = 'knmurug2@gmail.com';
            navigator.clipboard.writeText(email).then(() => {
                copyEmailBtn.classList.add('copied');
                const label = document.getElementById('copy-email-label');
                const prev = label.textContent;
                label.textContent = 'Copied to clipboard! ✓';
                setTimeout(() => {
                    copyEmailBtn.classList.remove('copied');
                    label.textContent = prev;
                }, 2500);
            }).catch(() => {
                window.location.href = `mailto:${email}`;
            });
        });
    }


    /* ───── PROJECT CATEGORY FILTERING ───── */
    const filterPills = document.querySelectorAll('.filter-pill');
    const projectCards = document.querySelectorAll('.project-card');

    filterPills.forEach(pill => {
        pill.addEventListener('click', () => {
            filterPills.forEach(p => p.classList.remove('active'));
            pill.classList.add('active');

            const filter = pill.getAttribute('data-filter');

            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                if (filter === 'all' || category === filter) {
                    card.style.display = 'flex';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(12px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 200);
                }
            });
        });
    });


    /* ───── INTERACTIVE RAG TERMINAL SIMULATOR ───── */
    const promptChips = document.querySelectorAll('.prompt-chip');
    const queryDisplay = document.getElementById('term-query-display');
    const answerDisplay = document.getElementById('term-answer-display');

    const terminalScenarios = {
        stockout: {
            query: 'Query: "Identify top SKU stockout risks in Midwest DC for next 30 days"',
            answer: `• <strong>SKU-4820 (Marine Compressor)</strong>: 12 days supply remaining. Supplier lead time extended by +7 days.<br/>
• <strong>Impact</strong>: Projected $180K revenue risk if not rebalanced.<br/>
• <strong>Recommended Action</strong>: Re-route 320 units from Dallas warehouse via intercompany transfer.`
        },
        so99: {
            query: 'Query: "Analyze SO99+ forecast drift for Heating & Cooling catalog"',
            answer: `• <strong>Model Diagnostics</strong>: Prophet ensemble achieved <strong>94.8% accuracy</strong> (+6.2% over baseline).<br/>
• <strong>Seasonal Drift Detected</strong>: Q4 RV OEM ramp is +18% higher than historical prior.<br/>
• <strong>Auto-Adjustment</strong>: Uplifted safety stock buffer by 420 units in Elkhart distribution hub.`
        },
        rebalance: {
            query: 'Query: "Generate executive SIOP stock rebalancing strategy"',
            answer: `• <strong>Capital Release Opportunity</strong>: $410K in excess safety stock identified in East Coast DC.<br/>
• <strong>Transfers Generated</strong>: 4 automated replenishment orders dispatched to D365 ERP.<br/>
• <strong>OTIF Forecast</strong>: Projected On-Time In-Full rate stabilized at <strong>98.4%</strong>.`
        }
    };

    promptChips.forEach(chip => {
        chip.addEventListener('click', () => {
            promptChips.forEach(c => c.classList.remove('active'));
            chip.classList.add('active');

            const key = chip.getAttribute('data-q');
            const data = terminalScenarios[key];
            if (!data) return;

            // Typing effect
            queryDisplay.textContent = 'Query: "..."';
            answerDisplay.style.opacity = '0.3';
            setTimeout(() => {
                queryDisplay.textContent = data.query;
                answerDisplay.innerHTML = data.answer;
                answerDisplay.style.opacity = '1';
            }, 180);
        });
    });


    /* ───── LIVE SUPPLY CHAIN SIMULATOR ENGINE (CANVAS) ───── */
    const simCanvas = document.getElementById('sim-chart-canvas');
    if (simCanvas) {
        const sCtx = simCanvas.getContext('2d');
        const sliderDemand = document.getElementById('slider-demand');
        const sliderVol = document.getElementById('slider-volatility');
        const sliderService = document.getElementById('slider-service');
        const sliderLead = document.getElementById('slider-leadtime');

        const valDemand = document.getElementById('val-demand');
        const valVol = document.getElementById('val-volatility');
        const valService = document.getElementById('val-service');
        const valLead = document.getElementById('val-leadtime');

        const kpiMape = document.getElementById('kpi-mape');
        const kpiStockout = document.getElementById('kpi-stockout');
        const kpiCapital = document.getElementById('kpi-capital');
        const kpiRop = document.getElementById('kpi-rop');

        function updateSimulation() {
            const baseD = parseFloat(sliderDemand.value);
            const vol = parseFloat(sliderVol.value) / 100;
            const service = parseFloat(sliderService.value) / 100;
            const lead = parseFloat(sliderLead.value);

            // Z-score approximation
            const z = service >= 0.99 ? 2.58 : service >= 0.98 ? 2.05 : service >= 0.95 ? 1.65 : 1.28;
            const sigmaL = vol * baseD * Math.sqrt(lead);
            const ss = Math.round(z * sigmaL);
            const rop = Math.round(baseD * lead + ss);
            const stockoutProb = Math.max(0.1, ((1 - service) * 100 * (1 + vol)).toFixed(1));
            const mape = Math.max(88, (98 - vol * 20)).toFixed(1);
            const capitalSaved = Math.round(baseD * 450 * (1 - vol) + 120000);

            // Update UI Labels
            valDemand.textContent = `${baseD} units/day`;
            valVol.textContent = `${(vol * 100).toFixed(0)}%`;
            valService.textContent = `${(service * 100).toFixed(1)}% (${z.toFixed(2)}σ)`;
            valLead.textContent = `${lead} days`;

            kpiMape.textContent = `${mape}%`;
            kpiStockout.textContent = `${stockoutProb}%`;
            kpiCapital.textContent = `-$${capitalSaved.toLocaleString()}`;
            kpiRop.textContent = `${rop.toLocaleString()} units`;

            drawSimulatorChart(baseD, vol, lead, ss);
        }

        function drawSimulatorChart(baseD, vol, lead, ss) {
            const w = simCanvas.width = simCanvas.offsetWidth * window.devicePixelRatio;
            const h = simCanvas.height = simCanvas.offsetHeight * window.devicePixelRatio;
            sCtx.scale(window.devicePixelRatio, window.devicePixelRatio);

            const cw = simCanvas.offsetWidth;
            const ch = simCanvas.offsetHeight;
            sCtx.clearRect(0, 0, cw, ch);

            const points = 45;
            const stepX = cw / (points - 1);
            const midY = ch * 0.52;
            const scaleY = (ch * 0.35) / baseD;

            // Generate reproducible series data
            const actuals = [];
            const forecast = [];
            const upper = [];
            const lower = [];

            for (let i = 0; i < points; i++) {
                const trend = Math.sin(i * 0.2) * (baseD * 0.15);
                const noise = Math.sin(i * 1.5 + baseD) * (baseD * vol * 0.8);
                const act = baseD + trend + noise;
                const fc = baseD + trend;
                const band = vol * baseD * 1.2;

                actuals.push(act);
                forecast.push(fc);
                upper.push(fc + band);
                lower.push(fc - band);
            }

            // Draw Confidence Interval Band
            sCtx.beginPath();
            for (let i = 0; i < points; i++) {
                const x = i * stepX;
                const y = midY - (upper[i] - baseD) * scaleY;
                if (i === 0) sCtx.moveTo(x, y);
                else sCtx.lineTo(x, y);
            }
            for (let i = points - 1; i >= 0; i--) {
                const x = i * stepX;
                const y = midY - (lower[i] - baseD) * scaleY;
                sCtx.lineTo(x, y);
            }
            sCtx.closePath();
            sCtx.fillStyle = 'rgba(0, 229, 208, 0.08)';
            sCtx.fill();

            // Draw Forecast Line (Teal)
            sCtx.beginPath();
            for (let i = 0; i < points; i++) {
                const x = i * stepX;
                const y = midY - (forecast[i] - baseD) * scaleY;
                if (i === 0) sCtx.moveTo(x, y);
                else sCtx.lineTo(x, y);
            }
            sCtx.strokeStyle = '#00e5d0';
            sCtx.lineWidth = 2.4;
            sCtx.stroke();

            // Draw Actuals Line (Dashed Slate)
            sCtx.beginPath();
            sCtx.setLineDash([4, 4]);
            for (let i = 0; i < points; i++) {
                const x = i * stepX;
                const y = midY - (actuals[i] - baseD) * scaleY;
                if (i === 0) sCtx.moveTo(x, y);
                else sCtx.lineTo(x, y);
            }
            sCtx.strokeStyle = 'rgba(203, 213, 225, 0.65)';
            sCtx.lineWidth = 1.6;
            sCtx.stroke();
            sCtx.setLineDash([]);

            // Draw current day threshold line
            const todayX = (points * 0.55) * stepX;
            sCtx.beginPath();
            sCtx.moveTo(todayX, 10);
            sCtx.lineTo(todayX, ch - 10);
            sCtx.strokeStyle = 'rgba(255, 255, 255, 0.18)';
            sCtx.lineWidth = 1;
            sCtx.setLineDash([3, 3]);
            sCtx.stroke();
            sCtx.setLineDash([]);

            sCtx.fillStyle = 'rgba(255, 255, 255, 0.4)';
            sCtx.font = '10px monospace';
            sCtx.fillText('TODAY (SIOP RUN)', todayX + 6, 20);
        }

        [sliderDemand, sliderVol, sliderService, sliderLead].forEach(slider => {
            slider.addEventListener('input', updateSimulation);
        });

        window.addEventListener('resize', updateSimulation);
        updateSimulation();
    }


    /* ───── CONTACT FORM ───── */
    const form = document.getElementById('contact-form');
    const statusEl = document.getElementById('form-status');

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = form.querySelector('#contact-name').value.trim();
            const email = form.querySelector('#contact-email').value.trim();
            const message = form.querySelector('#contact-message').value.trim();
            const submitBtn = document.getElementById('contact-submit-btn');

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

            submitBtn.disabled = true;
            submitBtn.textContent = 'Dispatching…';

            fetch('https://formspree.io/f/maqdlwne', {
                method: 'POST',
                headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, message })
            })
                .then(res => {
                    if (res.ok) {
                        statusEl.textContent = '✓ Message transmitted! I will respond within 24h.';
                        statusEl.className = 'form-status success';
                        form.reset();
                        setTimeout(() => {
                            statusEl.textContent = '';
                            statusEl.className = 'form-status';
                        }, 5000);
                    } else {
                        return res.json().then(data => {
                            throw new Error(data.errors ? data.errors.map(e => e.message).join(', ') : 'Transmission failed.');
                        });
                    }
                })
                .catch(err => {
                    statusEl.textContent = '✗ ' + err.message;
                    statusEl.className = 'form-status error';
                })
                .finally(() => {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = `<span>Send Message</span><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>`;
                });
        });
    }

})();
