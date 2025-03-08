/**
 * Main frontend JavaScript file
 */

// Import styles
import '../scss/main.scss';

// Import components
import navigation from './components/navigation';

// DOM ready
document.addEventListener('DOMContentLoaded', function() {
  console.log('OBX Theme initialized');
  
  // Initialize navigation
  navigation();
  
  // Add your JavaScript code here
}); 