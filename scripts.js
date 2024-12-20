// scripts.js

function toggleMenu() {
    const menu = document.querySelector('.navbar .menu');
    if (menu) {
      menu.style.display = menu.style.display === 'flex' ? 'none' : 'flex';
    } else {
      console.error('Menu element not found');
    }
  }
  
  function bookmarkRecipe(recipeId) {
    // Simulate a bookmark action
    fetch(`/kitchen/cart/${recipeId}`, { method: 'GET' })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        if (data.bookmarked) {
          showNotification('Recipe already bookmarked.');
        } else if (data.success) {
          showNotification('Recipe bookmarked successfully!');
        } else {
          showNotification('Recipe already bookmarked.');
        }
      })
      .catch(error => {
        console.error('Fetch error:', error);
        showNotification('An error occurred.');
      });
  }
  
  function showNotification(message) {
    const notification = document.querySelector('.notification');
    if (notification) {
      notification.textContent = message;
      notification.style.display = 'block';
      setTimeout(() => {
        notification.style.display = 'none';
      }, 3000);
    } else {
      console.error('Notification element not found');
    }
  }
  
  document.addEventListener('DOMContentLoaded', function() {
    // DOMContentLoaded event listener code
  });