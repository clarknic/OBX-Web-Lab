/**
 * Main frontend JavaScript file
 */

// Import styles
import '../scss/main.scss';

// Import components
import navigation from './components/navigation';
import initHeader from './components/header';

// DOM ready
document.addEventListener('DOMContentLoaded', function() {
  console.log('OBX Theme initialized');
  
  // Initialize navigation
  navigation();
  
  // Initialize header
  initHeader();
  
  // Add your JavaScript code here
}); 