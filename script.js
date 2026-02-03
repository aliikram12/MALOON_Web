// script.js - Complete functionality

// Navigation Menu Toggle
function toggleMenu() {
  const navLinks = document.getElementById("navLinks");
  const menuToggle = document.querySelector('.menu-toggle');
  
  navLinks.classList.toggle("active");
  menuToggle.classList.toggle("active");
  
  // Close menu when clicking on a link
  const navItems = document.querySelectorAll('.nav-links a:not(.lang-btn)');
  navItems.forEach(item => {
    item.addEventListener('click', () => {
      navLinks.classList.remove("active");
      menuToggle.classList.remove("active");
    });
  });
}

// Update Date Function
function updateDate() {
  const dateElement = document.getElementById('currentDate');
  if (dateElement) {
    const now = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    dateElement.textContent = now.toLocaleDateString('en-US', options);
  }
}

// Button Handlers
function handleDiscoverClick() {
  const servicesSection = document.getElementById('services');
  if (servicesSection) {
    servicesSection.scrollIntoView({ behavior: 'smooth' });
  }
}

function handleContactClick() {
  const contactSection = document.getElementById('contact') || document.querySelector('.contact-form');
  if (contactSection) {
    contactSection.scrollIntoView({ behavior: 'smooth' });
  }
}

// Services Section Horizontal Scroll
function initServicesScroll() {
  const servicesTrack = document.querySelector('.services-track');
  const prevBtn = document.querySelector('.prev-btn');
  const nextBtn = document.querySelector('.next-btn');
  const serviceCards = document.querySelectorAll('.service-card');
  
  if (!servicesTrack) return;
  
  let currentPosition = 0;
  const cardWidth = serviceCards[0].offsetWidth + 30; // Including gap
  const maxScroll = (serviceCards.length - 3) * cardWidth;
  
  function updateButtons() {
    prevBtn.style.opacity = currentPosition <= 0 ? '0.5' : '1';
    prevBtn.style.pointerEvents = currentPosition <= 0 ? 'none' : 'all';
    nextBtn.style.opacity = currentPosition >= maxScroll ? '0.5' : '1';
    nextBtn.style.pointerEvents = currentPosition >= maxScroll ? 'none' : 'all';
  }
  
  prevBtn.addEventListener('click', () => {
    if (currentPosition > 0) {
      currentPosition -= cardWidth;
      servicesTrack.style.transform = `translateX(-${currentPosition}px)`;
      updateButtons();
    }
  });
  
  nextBtn.addEventListener('click', () => {
    if (currentPosition < maxScroll) {
      currentPosition += cardWidth;
      servicesTrack.style.transform = `translateX(-${currentPosition}px)`;
      updateButtons();
    }
  });
  
  // Touch/swipe support for mobile
  let startX = 0;
  let scrollLeft = 0;
  
  servicesTrack.addEventListener('touchstart', (e) => {
    startX = e.touches[0].pageX;
    scrollLeft = currentPosition;
  });
  
  servicesTrack.addEventListener('touchmove', (e) => {
    if (!e.touches || e.touches.length !== 1) return;
    e.preventDefault();
    
    const x = e.touches[0].pageX;
    const walk = (x - startX) * 2;
    
    currentPosition = Math.max(0, Math.min(maxScroll, scrollLeft - walk));
    servicesTrack.style.transform = `translateX(-${currentPosition}px)`;
    updateButtons();
  });
  
  updateButtons();
}

// Contact Form Handler
function initContactForm() {
  const contactForm = document.getElementById('contactForm');
  if (!contactForm) return;
  
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);
    
    // In a real application, you would send this data to a server
    console.log('Form submitted:', data);
    
    // Show success message
    const submitBtn = contactForm.querySelector('.submit-btn');
    const originalText = submitBtn.textContent;
    
    submitBtn.textContent = 'Message Sent!';
    submitBtn.style.background = 'linear-gradient(45deg, #4CAF50, #45a049)';
    
    setTimeout(() => {
      submitBtn.textContent = originalText;
      submitBtn.style.background = 'linear-gradient(45deg, #00d2d3, #0099a8)';
      contactForm.reset();
    }, 2000);
  });
}

// Animate elements on scroll
function initScrollAnimations() {
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animated');
      }
    });
  }, observerOptions);
  
  // Observe all cards and sections
  document.querySelectorAll('.service-card, .advantage-card, .case-card, .goal-card').forEach(el => {
    observer.observe(el);
  });
}

// Language switcher
function initLanguageSwitcher() {
  const langButtons = document.querySelectorAll('.lang-btn, .language-switch a');
  
  langButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      
      // Remove active class from all buttons
      langButtons.forEach(btn => btn.classList.remove('active'));
      
      // Add active class to clicked button
      button.classList.add('active');
      
      // In a real application, you would change the language here
      console.log('Language switched');
    });
  });
}

// Close menu when clicking outside on mobile
document.addEventListener('click', (event) => {
  const navLinks = document.getElementById('navLinks');
  const menuToggle = document.querySelector('.menu-toggle');
  const isClickInsideNav = navLinks.contains(event.target) || menuToggle.contains(event.target);
  
  if (window.innerWidth <= 900 && navLinks.classList.contains('active') && !isClickInsideNav) {
    navLinks.classList.remove('active');
    menuToggle.classList.remove('active');
  }
});

// Handle window resize
window.addEventListener('resize', function() {
  const navLinks = document.getElementById('navLinks');
  const menuToggle = document.querySelector('.menu-toggle');
  
  // Reset menu on larger screens
  if (window.innerWidth > 900) {
    navLinks.classList.remove('active');
    menuToggle.classList.remove('active');
  }
  
  // Reinitialize services scroll on resize
  initServicesScroll();
});

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  updateDate();
  initServicesScroll();
  initContactForm();
  initScrollAnimations();
  initLanguageSwitcher();
  
  // Update date every minute
  setInterval(updateDate, 60000);
  
  // Add click events to CTA buttons
  const ctaButtons = document.querySelectorAll('.cta-button, .service-cta, .submit-btn');
  ctaButtons.forEach(button => {
    if (button.classList.contains('primary') || button.classList.contains('service-cta')) {
      button.addEventListener('click', handleDiscoverClick);
    } else if (button.classList.contains('secondary')) {
      button.addEventListener('click', handleContactClick);
    }
  });
  
  // Smooth scroll for navigation links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    });
  });
  
  // Add active class to current section in navigation
  window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      const sectionHeight = section.clientHeight;
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });
    
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
});