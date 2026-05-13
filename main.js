import './style.css';
import './rewards.css';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import * as THREE from 'three';

gsap.registerPlugin(ScrollTrigger);

// ----------------------------------------------------
// GSAP ANIMATIONS
// ----------------------------------------------------

// Hero Section Intro
if (document.querySelector('.hero-section')) {
  const heroTimeline = gsap.timeline();

  heroTimeline.from('.navbar', {
    y: -100,
    opacity: 0,
    duration: 1.2,
    ease: 'expo.out'
  })
  .from('.hero-title', {
    y: 100,
    opacity: 0,
    duration: 1.5,
    ease: 'expo.out'
  }, "-=0.8")
  .from('.hero-subtitle', {
    y: 30,
    opacity: 0,
    duration: 1,
    ease: 'power3.out'
  }, "-=1")
  .from('.hero-cta-group', {
    y: 30,
    opacity: 0,
    duration: 1,
    ease: 'power3.out'
  }, "-=0.8");

  // Scrubbing animation for headline scale
  gsap.to('.hero-title', {
    scrollTrigger: {
      trigger: '.hero-section',
      start: 'top top',
      end: 'bottom top',
      scrub: true
    },
    scale: 0.8,
    opacity: 0.1,
    y: 100
  });
}

// Showcase Animations (Card Stack Scrub)
if (document.querySelector('.showcase-section')) {
  gsap.from('.showcase-content > *', {
    scrollTrigger: {
      trigger: '.showcase-section',
      start: 'top 70%'
    },
    y: 50,
    opacity: 0,
    duration: 1,
    stagger: 0.2,
    ease: 'expo.out'
  });

  const cardTl = gsap.timeline({
    scrollTrigger: {
      trigger: '.showcase-section',
      start: 'top 50%',
      end: 'bottom top',
      scrub: 1
    }
  });

  cardTl.to('.card-1', { y: -50, x: -20, rotation: -5 })
        .to('.card-2', { y: -100, x: 20, rotation: 5, opacity: 1, scale: 1 }, 0)
        .to('.card-3', { y: -150, x: 50, rotation: 10, opacity: 0.8, scale: 0.9 }, 0);
}

// Bento Grid Animations
if (document.querySelector('.bento-section')) {
  gsap.from('.bento-item', {
    scrollTrigger: {
      trigger: '.bento-grid',
      start: 'top 80%'
    },
    y: 60,
    opacity: 0,
    duration: 1,
    stagger: 0.1,
    ease: 'power4.out'
  });
}

// Bento Item Mouse Effect
document.querySelectorAll('.bento-item').forEach(item => {
  item.addEventListener('mousemove', (e) => {
    const rect = item.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    item.style.setProperty('--x', `${x}px`);
    item.style.setProperty('--y', `${y}px`);
  });
});

// Background Ticker Speed Manipulation
const tickerTrack = document.querySelectorAll('.ticker-track');
if (tickerTrack.length > 0) {
  window.addEventListener('scroll', () => {
    const scrollSpeed = Math.min(window.scrollY / 100, 10);
    tickerTrack.forEach(track => {
      // Scale animation speed based on scroll
      track.style.animationDuration = `${60 - scrollSpeed * 5}s`;
    });
  });
}

// Hero Background Parallax
if (document.querySelector('.hero-section')) {
  document.addEventListener('mousemove', (e) => {
    const x = (window.innerWidth / 2 - e.pageX) / 100;
    const y = (window.innerHeight / 2 - e.pageY) / 100;
    gsap.to('.hero-background-visual', {
      x: x,
      y: y,
      duration: 2,
      ease: 'power2.out'
    });
  });
}

// =============================================
// REWARDS PAGE ANIMATIONS
// =============================================
if (document.querySelector('.rw-hero')) {
  // ---- 3D ANIMATED COIN BACKGROUND ----
  const heroCanvas = document.getElementById('rw-hero-canvas');
  if (heroCanvas) {
    const hScene = new THREE.Scene();
    const hCam = new THREE.PerspectiveCamera(60, heroCanvas.clientWidth / heroCanvas.clientHeight, 0.1, 100);
    hCam.position.z = 12;
    const hRenderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    hRenderer.setSize(heroCanvas.clientWidth, heroCanvas.clientHeight);
    hRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    heroCanvas.appendChild(hRenderer.domElement);

    // Lights
    hScene.add(new THREE.AmbientLight(0xffffff, 0.3));
    const goldLight = new THREE.PointLight(0xffd700, 2, 50);
    goldLight.position.set(5, 5, 10);
    hScene.add(goldLight);
    const purpleLight = new THREE.PointLight(0x6a35ff, 1.5, 50);
    purpleLight.position.set(-5, -3, 8);
    hScene.add(purpleLight);

    // Premium glass materials with vibrant tints
    const baseGlass = { metalness: 0.2, roughness: 0.1, transmission: 0.95, thickness: 0.8, ior: 1.5, clearcoat: 1.0, clearcoatRoughness: 0.1 };
    const glassWhite = new THREE.MeshPhysicalMaterial({ color: 0xffffff, ...baseGlass });
    const glassPurple = new THREE.MeshPhysicalMaterial({ color: 0xa070ff, ...baseGlass });
    const glassYellow = new THREE.MeshPhysicalMaterial({ color: 0xe5fe40, ...baseGlass });
    
    // Vibrant metallic materials
    const goldMat = new THREE.MeshStandardMaterial({ color: 0xffa0a0, metalness: 1.0, roughness: 0.2 }); // Rose Gold
    const purpleMat = new THREE.MeshStandardMaterial({ color: 0x6a35ff, metalness: 0.9, roughness: 0.2 }); // Poli Purple
    const yellowMat = new THREE.MeshStandardMaterial({ color: 0xe5fe40, metalness: 0.9, roughness: 0.25 }); // Neo Paccha

    const geometries = [
      new THREE.IcosahedronGeometry(1, 0), // Polyhedron
      new THREE.TorusGeometry(0.8, 0.25, 16, 48), // Ring
      new THREE.OctahedronGeometry(1, 0), // Diamond
      new THREE.SphereGeometry(0.7, 32, 32) // Orb
    ];
    const materials = [glassWhite, glassPurple, glassYellow, goldMat, purpleMat, yellowMat];

    // Create floating premium shapes
    const shapes = [];
    for (let i = 0; i < 20; i++) {
      const geo = geometries[Math.floor(Math.random() * geometries.length)];
      const mat = materials[Math.floor(Math.random() * materials.length)];
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.x = (Math.random() - 0.5) * 30;
      mesh.position.y = (Math.random() - 0.5) * 20;
      mesh.position.z = (Math.random() - 0.5) * 15 - 5;
      const s = 0.3 + Math.random() * 2;
      mesh.scale.set(s, s, s);
      mesh.userData = {
        rotXSpeed: (Math.random() - 0.5) * 0.015,
        rotYSpeed: (Math.random() - 0.5) * 0.015,
        floatSpeed: 0.1 + Math.random() * 0.3,
        floatAmp: 0.3 + Math.random() * 1.5,
        baseY: mesh.position.y,
        phase: Math.random() * Math.PI * 2
      };
      hScene.add(mesh);
      shapes.push(mesh);
    }

    // Interactive mouse light
    const mouseLight = new THREE.PointLight(0xffffff, 1, 30);
    hScene.add(mouseLight);

    // Particle system (golden sparkles)
    const pCount = 400;
    const pGeo = new THREE.BufferGeometry();
    const pPos = new Float32Array(pCount * 3);
    for (let i = 0; i < pCount * 3; i++) pPos[i] = (Math.random() - 0.5) * 30;
    pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
    const pMat = new THREE.PointsMaterial({ color: 0xffffff, size: 0.03, transparent: true, opacity: 0.4 });
    const particles = new THREE.Points(pGeo, pMat);
    hScene.add(particles);

    function animateHeroBg() {
      requestAnimationFrame(animateHeroBg);
      const t = Date.now() * 0.001;
      shapes.forEach(mesh => {
        mesh.rotation.y += mesh.userData.rotYSpeed;
        mesh.rotation.x += mesh.userData.rotXSpeed;
        mesh.position.y = mesh.userData.baseY + Math.sin(t * mesh.userData.floatSpeed + mesh.userData.phase) * mesh.userData.floatAmp;
        
        // Parallax depth on scroll
        const scrollY = window.scrollY;
        mesh.position.z = mesh.userData.baseZ || (mesh.userData.baseZ = mesh.position.z);
        mesh.position.z += Math.sin(scrollY * 0.001) * 0.1;
      });
      particles.rotation.y += 0.0003;
      particles.rotation.x += 0.0001;
      goldLight.position.x = Math.sin(t * 0.5) * 8;
      goldLight.position.y = Math.cos(t * 0.3) * 5;
      
      hRenderer.render(hScene, hCam);
    }
    animateHeroBg();

    document.addEventListener('mousemove', (e) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      mouseLight.position.set(x * 15, y * 10, 5);
    });

    window.addEventListener('resize', () => {
      if (!heroCanvas) return;
      hCam.aspect = heroCanvas.clientWidth / heroCanvas.clientHeight;
      hCam.updateProjectionMatrix();
      hRenderer.setSize(heroCanvas.clientWidth, heroCanvas.clientHeight);
    });
  }

  // Navbar entrance
  gsap.from('.navbar', { y:-100, opacity:0, duration:1, ease:'power4.out' });

  // Particles scatter in
  gsap.from('.rw-particle', { scale:0, opacity:0, duration:1.5, stagger:0.1, ease:'elastic.out(1,0.5)', delay:0.3 });

  // Orbs pulse in
  gsap.from('.rw-orb', { scale:0, duration:2, stagger:0.3, ease:'power2.out', delay:0.5 });

  // Word-by-word hero reveal with mouse parallax
  const rwTl = gsap.timeline({ delay: 0.2 }); // Reduced delay
  rwTl.to('.rw-word', { 
    opacity: 1, 
    y: 0, 
    rotateX: 0, 
    duration: 1.2, 
    stagger: 0.15, 
    ease: 'expo.out' 
  })
  .to('.rw-hero-sub', { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.6')
  .from('.rw-scroll-indicator', { opacity:0, y:20, duration:0.6 }, '-=0.3');

  // Mouse interaction for words
  document.addEventListener('mousemove', (e) => {
    const { clientX, clientY } = e;
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    const moveX = (clientX - centerX) / 50;
    const moveY = (clientY - centerY) / 50;

    gsap.to('.rw-word', {
      x: (index) => moveX * (index + 1),
      y: (index) => moveY * (index + 1),
      duration: 1,
      ease: 'power2.out'
    });
    
    gsap.to('.rw-orb-1', { x: moveX * 2, y: moveY * 2, duration: 2 });
    gsap.to('.rw-orb-2', { x: -moveX * 2, y: -moveY * 2, duration: 2 });
  });

  // Corner decorations
  gsap.from('.rw-corner', { scrollTrigger:{ trigger:'.rw-coin-section', start:'top 70%' }, scale:0, rotation:180, duration:1, stagger:0.1, ease:'back.out(2)' });

  // Coin tagline - each word separately
  gsap.to('#rw-tag-1', { scrollTrigger:{ trigger:'.rw-coin-section', start:'top 60%' }, opacity:1, duration:0.6, ease:'power2.out' });
  gsap.to('#rw-tag-2', { scrollTrigger:{ trigger:'.rw-coin-section', start:'top 55%' }, opacity:1, duration:0.6, delay:0.2, ease:'power2.out' });
  gsap.to('#rw-tag-3', { scrollTrigger:{ trigger:'.rw-coin-section', start:'top 50%' }, opacity:1, duration:0.6, delay:0.4, ease:'power2.out' });

  // Video container intro
  gsap.from('#coin-video-container', { scrollTrigger: { trigger: '.rw-coin-section', start: 'top 70%' }, scale: 0.5, opacity: 0, duration: 1.5, ease: 'elastic.out(1, 0.5)' });

  // Stats ribbon counters
  gsap.from('.rw-stat-item', { 
    scrollTrigger:{ trigger:'.rw-stats-ribbon', start:'top 85%' }, 
    y:40, 
    opacity:0, 
    duration:1, 
    stagger:0.2, 
    ease:'power4.out',
    onStart: () => {
      document.querySelectorAll('.rw-stat-num').forEach(num => {
        const target = parseInt(num.getAttribute('data-count'));
        if (target) {
          gsap.to(num, {
            innerText: target,
            duration: 2.5,
            snap: { innerText: 1 },
            ease: 'power2.out'
          });
        }
      });
    }
  });

  // Bento Perk Cards stagger
  gsap.from('.rw-perk-card', {
    scrollTrigger: {
      trigger: '.rw-perks-grid',
      start: 'top 75%'
    },
    scale: 0.9,
    opacity: 0,
    y: 50,
    duration: 1.2,
    stagger: 0.1,
    ease: 'expo.out'
  });

  // Refer & Earn stagger
  gsap.from('.rw-refer-image-wrap', {
    scrollTrigger: { trigger: '.rw-refer-section', start: 'top 75%' },
    x: -100, opacity: 0, duration: 1.2, ease: 'power4.out'
  });
  gsap.from('.rw-refer-content', {
    scrollTrigger: { trigger: '.rw-refer-section', start: 'top 75%' },
    x: 100, opacity: 0, duration: 1.2, ease: 'power4.out'
  });
  gsap.from('.rw-refer-rule', {
    scrollTrigger: { trigger: '.rw-refer-content', start: 'top 80%' },
    y: 30, opacity: 0, duration: 0.8, stagger: 0.2, ease: 'power3.out'
  });

  // Membership Tiers stagger
  gsap.from('.rw-tier-card', {
    scrollTrigger: { trigger: '.rw-tiers-grid', start: 'top 80%' },
    y: 60, opacity: 0, duration: 1, stagger: 0.2, ease: 'back.out(1.7)'
  });

  // FAQ stagger
  gsap.from('.rw-faq-item', {
    scrollTrigger: { trigger: '.rw-faq-grid', start: 'top 90%' },
    y: 30, opacity: 0, duration: 0.8, stagger: 0.1, ease: 'power2.out'
  });

  // Step cards
  gsap.from('.rw-step-card', { 
    scrollTrigger:{ trigger:'.rw-steps-grid', start:'top 80%' }, 
    y:60, 
    opacity:0, 
    duration:1, 
    stagger:0.2, 
    ease:'power3.out' 
  });

  // Partners
  gsap.from('.rw-partner-logo', { 
    scrollTrigger:{ trigger:'.rw-partners-grid', start:'top 90%' }, 
    opacity:0, 
    scale:0.8, 
    duration:0.6, 
    stagger:0.1, 
    ease:'back.out(1.7)' 
  });

  // Testimonials
  gsap.from('.rw-testimonials-section .rw-section-heading', { scrollTrigger:{ trigger:'.rw-testimonials-section', start:'top 80%' }, y:40, opacity:0, duration:0.8 });
  gsap.from('.rw-testimonial-card', { scrollTrigger:{ trigger:'.rw-testimonials-grid', start:'top 80%' }, y:50, opacity:0, rotationY:-10, duration:0.8, stagger:0.2, ease:'back.out(1.3)' });

  // CTA
  gsap.from('.rw-cta-title', { scrollTrigger:{ trigger:'.rw-cta-section', start:'top 80%' }, y:30, opacity:0, duration:0.8 });
  gsap.from('.rw-cta-sub', { scrollTrigger:{ trigger:'.rw-cta-section', start:'top 80%' }, y:20, opacity:0, duration:0.8, delay:0.2 });
  gsap.from('.rw-cta-section .btn-primary', { scrollTrigger:{ trigger:'.rw-cta-section', start:'top 80%' }, scale:0.8, opacity:0, duration:0.6, delay:0.4, ease:'back.out(1.7)' });
  gsap.from('.rw-cta-orb', { scrollTrigger:{ trigger:'.rw-cta-section', start:'top 80%' }, scale:0, duration:1.5, stagger:0.2, ease:'power2.out' });
}

// Scroll Animations for Support
if (document.querySelector('.sp-hero')) {
  gsap.from('.sp-hero-title', { y: 50, opacity: 0, duration: 1, ease: 'expo.out' });
  gsap.from('.sp-hero p', { y: 20, opacity: 0, duration: 0.8, ease: 'power3.out' }, '-=0.6');
  gsap.from('.sp-search-wrapper', { scale: 0.9, opacity: 0, duration: 1, ease: 'power4.out' }, '-=0.5');

  gsap.from('.sp-topic-card', {
    scrollTrigger: { trigger: '.sp-topic-grid', start: 'top 85%' },
    y: 40, opacity: 0, duration: 0.8, stagger: 0.15, ease: 'back.out(1.4)'
  });

  gsap.from('.sp-concierge-content > *', {
    scrollTrigger: { trigger: '.sp-concierge', start: 'top 75%' },
    x: -50, opacity: 0, duration: 1, stagger: 0.2, ease: 'power4.out'
  });

  gsap.from('.sp-concierge-img', {
    scrollTrigger: { trigger: '.sp-concierge', start: 'top 75%' },
    x: 50, opacity: 0, duration: 1.2, ease: 'power4.out'
  });

  gsap.from('.sp-contact-method', {
    scrollTrigger: { trigger: '.sp-contact-grid', start: 'top 85%' },
    y: 30, opacity: 0, duration: 0.8, stagger: 0.2, ease: 'power3.out'
  });
}

// Download Page Animations
if (document.querySelector('.download-section')) {
  const downloadTl = gsap.timeline({ defaults: { ease: 'power3.out' } });
  
  downloadTl.from('.navbar', {
    y: -100,
    opacity: 0,
    duration: 1,
    ease: 'power4.out'
  })
  .from('.download-content > *', {
    y: 30,
    opacity: 0,
    duration: 0.8,
    stagger: 0.15,
  }, "-=0.5")

  // Phone mockup entrance
  .from('.phone-frame', {
    scale: 0.7,
    opacity: 0,
    rotationY: -20,
    duration: 1.2,
    ease: 'back.out(1.4)'
  }, "-=0.6")

  // Glow orbs fade in
  .from('.dl-glow', {
    scale: 0,
    opacity: 0,
    duration: 1,
    stagger: 0.2,
    ease: 'power2.out'
  }, "-=1")

  // Screen elements stagger in
  .from('#phone-logo', {
    y: -20,
    opacity: 0,
    duration: 0.5,
  }, "-=0.5")
  .from('#phone-card-1', {
    x: -30,
    opacity: 0,
    duration: 0.6,
    ease: 'back.out(1.3)'
  }, "-=0.3")
  .from('.phone-action-btn', {
    scale: 0,
    opacity: 0,
    duration: 0.4,
    stagger: 0.08,
    ease: 'back.out(2)'
  }, "-=0.3")
  .from('#phone-card-2', {
    y: 30,
    opacity: 0,
    duration: 0.5,
  }, "-=0.2")
  .from('#phone-card-3', {
    y: 30,
    opacity: 0,
    duration: 0.5,
    ease: 'back.out(1.5)'
  }, "-=0.2");
}

// Company Page Animations
function initCompanyAnimations() {
  if (!document.querySelector('.cp-hero')) return;

  // Hero
  gsap.to('.cp-title', { y: 0, opacity: 1, duration: 1.2, ease: 'power3.out' });
  gsap.to('.cp-subtitle', { y: 0, opacity: 1, duration: 1.2, delay: 0.3, ease: 'power3.out' });

  // Mission
  gsap.to('.cp-mission-text p', {
    scrollTrigger: { trigger: '.cp-mission', start: 'top 75%' },
    x: 0, opacity: 1, duration: 1, stagger: 0.2, ease: 'power3.out'
  });
  gsap.to('.cp-animated-img-wrapper', {
    scrollTrigger: { trigger: '.cp-mission', start: 'top 75%' },
    opacity: 1, duration: 1.5, ease: 'power3.out'
  });

  // Stats Counters
  gsap.to('.cp-stat-item', {
    scrollTrigger: { trigger: '.cp-stats-ribbon', start: 'top 85%' },
    y: 0, opacity: 1, duration: 1, stagger: 0.2, ease: 'power3.out',
    onStart: () => {
      document.querySelectorAll('.cp-counter').forEach(el => {
        const target = +el.getAttribute('data-target');
        gsap.to(el, { innerHTML: target, duration: 2, ease: 'power2.out', snap: { innerHTML: 1 } });
      });
    }
  });

  // Ecosystem
  gsap.to('.cp-eco-card', {
    scrollTrigger: { trigger: '.cp-ecosystem', start: 'top 75%' },
    y: 0, opacity: 1, duration: 1, stagger: 0.4, ease: 'power3.out'
  });
}

window.addEventListener('load', initCompanyAnimations);
