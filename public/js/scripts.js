document.addEventListener('DOMContentLoaded', function() {
  // Toggle menu
  document.querySelector('.menu-icon').addEventListener('click', toggleMenu);

  // Bookmark recipe
  document.querySelectorAll('.cardBtn__link[data-id]').forEach(function(element) {
    element.addEventListener('click', function(event) {
      event.preventDefault();
      const recipeId = this.getAttribute('data-id');
      bookmarkRecipe(recipeId);
    });
  });
});

function toggleMenu() {
  const menu = document.querySelector('.navbar .menu');
  menu.classList.toggle('open');
}

function bookmarkRecipe(recipeId) {
  console.log(recipeId);
  // Simulate a bookmark action
  fetch(`/kitchen/cart/${encodeURIComponent(recipeId.replace(/"/g, ''))}`, { method: 'GET' })
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