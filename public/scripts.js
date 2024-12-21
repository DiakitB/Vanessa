function toggleMenu() {
    const menu = document.querySelector('.navbar .menu');
    menu.classList.toggle('open');
  }
  
  function bookmarkRecipe(recipeId) {
    // Simulate a bookmark action
    fetch(`/kitchen/cart/${recipeId}`, { method: 'GET' })
      .then(response => response.json())
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
        showNotification('An error occurred.');
      });
  }
  
  function showNotification(message) {
    const notification = document.querySelector('.notification');
    notification.textContent = message;
    notification.style.display = 'block';
    setTimeout(() => {
      notification.style.display = 'none';
    }, 3000);
  }