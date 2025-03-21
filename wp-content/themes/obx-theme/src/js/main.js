/**
 * Main frontend JavaScript file
 */

// Import styles
import '../scss/main.scss';

// Import components
import navigation from './components/navigation';
import initHeader from './components/header';

// Mobile menu functionality
function initMobileMenu() {
  const menuToggle = document.querySelector('.menu-toggle');
  const mainNav = document.querySelector('.main-navigation');
  const navMenu = mainNav?.querySelector('ul');
  const body = document.body;

  if (menuToggle && mainNav && navMenu) {
    menuToggle.addEventListener('click', () => {
      menuToggle.classList.toggle('active');
      navMenu.classList.toggle('active');
      body.classList.toggle('mobile-menu-active');
      body.classList.toggle('menu-active');
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!navMenu.contains(e.target) && !menuToggle.contains(e.target)) {
        menuToggle.classList.remove('active');
        navMenu.classList.remove('active');
        body.classList.remove('mobile-menu-active');
        body.classList.remove('menu-active');
      }
    });

    // Close menu when clicking menu items
    const menuItems = mainNav.querySelectorAll('a');
    menuItems.forEach(item => {
      item.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        navMenu.classList.remove('active');
        body.classList.remove('mobile-menu-active');
        body.classList.remove('menu-active');
      });
    });
  }
}

// Smooth scroll and active menu item functionality
function initScrollBehavior() {
  // Get all menu links that point to sections
  const menuLinks = document.querySelectorAll('a[href^="#"]');
  const sections = document.querySelectorAll('section[id]');
  
  // Smooth scroll for menu links
  menuLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      
      if (targetSection) {
        targetSection.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // Active menu item on scroll
  function setActiveMenuItem() {
    const scrollPosition = window.scrollY + 100; // Offset for better trigger point
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100; // Offset for better trigger point
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');
      
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        // Remove active class from all menu items
        menuLinks.forEach(link => {
          link.classList.remove('active');
        });
        
        // Add active class to current section's menu item
        const activeLink = document.querySelector(`a[href="#${sectionId}"]`);
        if (activeLink) {
          activeLink.classList.add('active');
        }
      }
    });
  }

  // Add scroll event listener
  window.addEventListener('scroll', setActiveMenuItem);
  // Initial check for active menu item
  setActiveMenuItem();
}

// DOM ready
document.addEventListener('DOMContentLoaded', function() {
  console.log('OBX Theme initialized');
  
  // Initialize navigation
  navigation();
  
  // Initialize header
  initHeader();
  
  // Initialize scroll behavior
  initScrollBehavior();

  // Initialize mobile menu
  initMobileMenu();
}); 