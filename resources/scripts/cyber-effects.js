/**
 * ╔══════════════════════════════════════════════════════════════════╗
 * ║                DEMO X HEXA CYBER EFFECTS v1.0                    ║
 * ║          Interactive JavaScript Effects for Pterodactyl          ║
 * ║                  Created by: itzmebrmhexa                        ║
 * ╚══════════════════════════════════════════════════════════════════╝
 */

(function() {
  'use strict';

  // Configuration
  const CONFIG = {
    matrixRain: {
      enabled: true,
      columns: 50,
      speed: 50,
      characters: '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    },
    particles: {
      enabled: true,
      count: 100,
      connectionDistance: 100,
      speed: 0.5,
    },
    glitchEffects: {
      enabled: true,
      frequency: 5000,
      duration: 300,
    },
    hexBackground: {
      enabled: true,
      count: 20,
    },
    typingEffect: {
      enabled: true,
      speed: 100,
    },
    scanline: {
      enabled: true,
    }
  };

  // Initialize all effects when DOM is ready
  function init() {
    console.log('%c╔══════════════════════════════════════╗', 'color: #FF0000; font-weight: bold;');
    console.log('%c║  DEMO X HEXA THEME ACTIVATED        ║', 'color: #FF0000; font-weight: bold;');
    console.log('%c║  Cyberpunk Mode Engaged             ║', 'color: #FF0000; font-weight: bold;');
    console.log('%c║  Created by: itzmebrmhexa           ║', 'color: #FF0000; font-weight: bold;');
    console.log('%c╚══════════════════════════════════════╝', 'color: #FF0000; font-weight: bold;');

    // Add theme class to body
    document.body.classList.add('demoxhexa-theme');

    // Initialize all effects
    if (CONFIG.matrixRain.enabled) initMatrixRain();
    if (CONFIG.particles.enabled) initParticles();
    if (CONFIG.glitchEffects.enabled) initGlitchEffects();
    if (CONFIG.hexBackground.enabled) initHexBackground();
    if (CONFIG.typingEffect.enabled) initTypingEffects();
    if (CONFIG.scanline.enabled) initScanline();

    // Initialize button effects
    initButtonEffects();

    // Initialize hover effects
    initHoverEffects();

    // Initialize entrance animations
    initEntranceAnimations();

    // Add corner decorations to cards
    addCornerDecorations();

    console.log('%c[DEMO X HEXA] All effects initialized successfully', 'color: #00ff00;');
  }

  /**
   * Matrix Rain Effect
   * Creates falling code rain effect in the background
   */
  function initMatrixRain() {
    // Check if already exists
    if (document.getElementById('dxh-matrix-rain')) return;

    const container = document.createElement('div');
    container.id = 'dxh-matrix-rain';
    container.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      overflow: hidden;
      pointer-events: none;
      z-index: 1;
      opacity: 0.15;
    `;

    document.body.appendChild(container);

    // Create columns
    const columnWidth = window.innerWidth / CONFIG.matrixRain.columns;

    for (let i = 0; i < CONFIG.matrixRain.columns; i++) {
      const column = document.createElement('div');
      column.className = 'matrix-column';
      column.style.cssText = `
        position: absolute;
        top: -100%;
        left: ${i * columnWidth}px;
        width: ${columnWidth}px;
        font-size: 14px;
        color: #00ff00;
        text-shadow: 0 0 5px #00ff00;
        font-family: monospace;
        white-space: pre;
        line-height: 1.2;
        animation: matrix-rain ${Math.random() * 5 + 5}s linear infinite;
        animation-delay: ${Math.random() * 5}s;
      `;

      // Generate random characters
      let text = '';
      const lines = Math.floor(Math.random() * 10) + 10;
      for (let j = 0; j < lines; j++) {
        const char = CONFIG.matrixRain.characters[Math.floor(Math.random() * CONFIG.matrixRain.characters.length)];
        text += char + '\n';
      }
      column.textContent = text;

      container.appendChild(column);
    }

    // Update on resize
    window.addEventListener('resize', debounce(() => {
      const existingContainer = document.getElementById('dxh-matrix-rain');
      if (existingContainer) {
        existingContainer.remove();
        initMatrixRain();
      }
    }, 250));

    console.log('[Matrix Rain] Initialized');
  }

  /**
   * Particle System
   * Creates animated particle network effect
   */
  function initParticles() {
    // Check if already exists
    if (document.getElementById('dxh-particle-canvas')) return;

    const canvas = document.createElement('canvas');
    canvas.id = 'dxh-particle-canvas';
    canvas.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 2;
      opacity: 0.6;
    `;

    document.body.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];

    // Particle class
    class Particle {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * CONFIG.particles.speed;
        this.vy = (Math.random() - 0.5) * CONFIG.particles.speed;
        this.size = Math.random() * 2 + 1;
        this.color = Math.random() > 0.7 ? '#FF0000' : (Math.random() > 0.5 ? '#00FFFF' : '#FFFFFF');
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        // Bounce off edges
        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;

        // Keep in bounds
        this.x = Math.max(0, Math.min(canvas.width, this.x));
        this.y = Math.max(0, Math.min(canvas.height, this.y));
      }

      draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Create particles
    for (let i = 0; i < CONFIG.particles.count; i++) {
      particles.push(new Particle());
    }

    // Animation loop
    function animate() {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle, i) => {
        particle.update();
        particle.draw();

        // Draw connections
        particles.forEach((otherParticle, j) => {
          if (i === j) return;

          const dx = particle.x - otherParticle.x;
          const dy = particle.y - otherParticle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < CONFIG.particles.connectionDistance) {
            const opacity = 1 - (distance / CONFIG.particles.connectionDistance);
            ctx.strokeStyle = `rgba(255, 0, 0, ${opacity * 0.3})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.stroke();
          }
        });
      });

      requestAnimationFrame(animate);
    }

    animate();

    // Update on resize
    window.addEventListener('resize', debounce(() => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      particles.forEach(p => p.reset());
    }, 250));

    console.log('[Particle System] Initialized');
  }

  /**
   * Glitch Effects
   * Applies random glitch effects to elements
   */
  function initGlitchEffects() {
    function applyRandomGlitch() {
      const elements = document.querySelectorAll('h1, h2, h3, .card, button, .badge');
      if (elements.length === 0) return;

      const randomElement = elements[Math.floor(Math.random() * elements.length)];
      const glitchClasses = ['glitch-effect', 'glitch-rgb-split', 'glitch-flicker'];
      const randomGlitch = glitchClasses[Math.floor(Math.random() * glitchClasses.length)];

      randomElement.classList.add(randomGlitch);

      setTimeout(() => {
        randomElement.classList.remove(randomGlitch);
      }, CONFIG.glitchEffects.duration);
    }

    // Apply glitch at intervals
    setInterval(applyRandomGlitch, CONFIG.glitchEffects.frequency);

    console.log('[Glitch Effects] Initialized');
  }

  /**
   * Hexagon Background
   * Creates floating hexagon decorations
   */
  function initHexBackground() {
    // Check if already exists
    if (document.getElementById('dxh-hex-background')) return;

    const container = document.createElement('div');
    container.id = 'dxh-hex-background';
    container.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      overflow: hidden;
      pointer-events: none;
      z-index: 1;
      opacity: 0.1;
    `;

    document.body.appendChild(container);

    // Create hexagons
    for (let i = 0; i < CONFIG.hexBackground.count; i++) {
      const hex = document.createElement('div');
      hex.innerHTML = `
        <svg width="50" height="50" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <polygon points="50,5 90,30 90,70 50,95 10,70 10,30" 
                   fill="none" 
                   stroke="#FF0000" 
                   stroke-width="2"/>
        </svg>
      `;

      hex.style.cssText = `
        position: absolute;
        top: ${Math.random() * 100}%;
        left: ${Math.random() * 100}%;
        animation: hex-float ${Math.random() * 10 + 5}s ease-in-out infinite;
        animation-delay: ${Math.random() * 5}s;
      `;

      container.appendChild(hex);
    }

    console.log('[Hex Background] Initialized');
  }

  /**
   * Typing Effect
   * Adds typing animation to specific elements
   */
  function initTypingEffects() {
    const elements = document.querySelectorAll('[data-typing-text]');

    elements.forEach(element => {
      const text = element.getAttribute('data-typing-text');
      element.textContent = '';

      let index = 0;
      const typingInterval = setInterval(() => {
        if (index < text.length) {
          element.textContent += text[index];
          index++;
        } else {
          clearInterval(typingInterval);
        }
      }, CONFIG.typingEffect.speed);
    });

    if (elements.length > 0) {
      console.log('[Typing Effects] Initialized');
    }
  }

  /**
   * Scanline Effect
   * Adds horizontal scanning line
   */
  function initScanline() {
    // Check if already exists
    if (document.getElementById('dxh-scanline')) return;

    const scanline = document.createElement('div');
    scanline.id = 'dxh-scanline';
    scanline.className = 'scanline';
    document.body.appendChild(scanline);

    console.log('[Scanline] Initialized');
  }

  /**
   * Button Effects
   * Adds ripple and interactive effects to buttons
   */
  function initButtonEffects() {
    document.addEventListener('click', function(e) {
      const button = e.target.closest('button, .btn');
      if (!button) return;

      // Create ripple effect
      const ripple = document.createElement('span');
      ripple.style.cssText = `
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.5);
        transform: scale(0);
        animation: ripple-effect 0.6s ease-out;
        pointer-events: none;
      `;

      const rect = button.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;

      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = x + 'px';
      ripple.style.top = y + 'px';

      // Ensure button has position relative
      if (getComputedStyle(button).position === 'static') {
        button.style.position = 'relative';
      }

      button.appendChild(ripple);

      setTimeout(() => ripple.remove(), 600);
    });

    // Add ripple animation if not exists
    if (!document.getElementById('dxh-ripple-style')) {
      const style = document.createElement('style');
      style.id = 'dxh-ripple-style';
      style.textContent = `
        @keyframes ripple-effect {
          to {
            transform: scale(4);
            opacity: 0;
          }
        }
      `;
      document.head.appendChild(style);
    }

    console.log('[Button Effects] Initialized');
  }

  /**
   * Hover Effects
   * Adds enhanced hover interactions
   */
  function initHoverEffects() {
    // Add glow effect to interactive elements on hover
    const style = document.createElement('style');
    style.textContent = `
      .dxh-hoverable {
        transition: all 0.3s ease;
      }
      .dxh-hoverable:hover {
        filter: brightness(1.2);
        transform: translateY(-2px);
      }
    `;
    document.head.appendChild(style);

    // Apply to relevant elements
    const hoverables = document.querySelectorAll('button, .btn, .card, a, .nav-item');
    hoverables.forEach(el => el.classList.add('dxh-hoverable'));

    console.log('[Hover Effects] Initialized');
  }

  /**
   * Entrance Animations
   * Adds entrance animations to elements as they appear
   */
  function initEntranceAnimations() {
    // Intersection Observer for scroll animations
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
          entry.target.classList.add('animated');
          
          // Determine animation based on element type
          if (entry.target.matches('.card, [class*="card"]')) {
            entry.target.classList.add('fade-in-up');
          } else if (entry.target.matches('h1, h2, h3')) {
            entry.target.classList.add('fade-in-down');
          } else if (entry.target.matches('button, .btn')) {
            entry.target.classList.add('zoom-in');
          } else {
            entry.target.classList.add('fade-in');
          }

          // Add staggered delay
          entry.target.style.animationDelay = `${index * 0.1}s`;
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    // Observe elements
    const animatableElements = document.querySelectorAll('.card, h1, h2, h3, button, .btn, .panel');
    animatableElements.forEach(el => observer.observe(el));

    console.log('[Entrance Animations] Initialized');
  }

  /**
   * Corner Decorations
   * Adds cyber-style corner decorations to cards
   */
  function addCornerDecorations() {
    const cards = document.querySelectorAll('.card, [class*="card"], .panel, .modal');

    cards.forEach(card => {
      // Skip if already has decorations
      if (card.querySelector('.corner-decoration')) return;

      // Ensure card has position relative
      if (getComputedStyle(card).position === 'static') {
        card.style.position = 'relative';
      }

      const corners = ['top-left', 'top-right', 'bottom-left', 'bottom-right'];
      corners.forEach(corner => {
        const decoration = document.createElement('div');
        decoration.className = `corner-decoration ${corner}`;
        card.appendChild(decoration);
      });
    });

    console.log('[Corner Decorations] Added to cards');
  }

  /**
   * Utility: Debounce function
   */
  function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  /**
   * Public API
   */
  window.DemoXHexaEffects = {
    init: init,
    config: CONFIG,
    
    // Individual effect controls
    enableMatrixRain: () => {
      CONFIG.matrixRain.enabled = true;
      initMatrixRain();
    },
    disableMatrixRain: () => {
      CONFIG.matrixRain.enabled = false;
      const container = document.getElementById('dxh-matrix-rain');
      if (container) container.remove();
    },
    
    enableParticles: () => {
      CONFIG.particles.enabled = true;
      initParticles();
    },
    disableParticles: () => {
      CONFIG.particles.enabled = false;
      const canvas = document.getElementById('dxh-particle-canvas');
      if (canvas) canvas.remove();
    },
    
    enableGlitchEffects: () => {
      CONFIG.glitchEffects.enabled = true;
      initGlitchEffects();
    },
    disableGlitchEffects: () => {
      CONFIG.glitchEffects.enabled = false;
    },
    
    // Manual trigger functions
    triggerGlitch: (element) => {
      element.classList.add('glitch-effect');
      setTimeout(() => element.classList.remove('glitch-effect'), 300);
    },
    
    addTypingEffect: (element, text, speed = 100) => {
      element.textContent = '';
      let index = 0;
      const interval = setInterval(() => {
        if (index < text.length) {
          element.textContent += text[index];
          index++;
        } else {
          clearInterval(interval);
        }
      }, speed);
    }
  };

  // Auto-initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
