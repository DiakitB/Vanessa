document.addEventListener('DOMContentLoaded', function() {
  // Initialize AOS
  AOS.init({
    duration: 1200, // Animation duration
    once: false, // Whether animation should happen only once - while scrolling down
    mirror: true // Whether elements should animate out while scrolling past them
  });

  // Toggle menu
  const menuIcon = document.querySelector('.menu-icon');
  if (menuIcon) {
    menuIcon.addEventListener('click', toggleMenu);
  }

  // Bookmark recipe
  const bookmarkLinks = document.querySelectorAll('.cardBtn__link.bookmark[data-id]');
  if (bookmarkLinks.length > 0) {
    bookmarkLinks.forEach(function(element) {
      element.removeEventListener('click', bookmarkHandler); // Remove existing event listener
      element.addEventListener('click', bookmarkHandler); // Add new event listener
    });
  }

  // Delete recipe
  const deleteLinks = document.querySelectorAll('.cardBtn__link.delete[data-id]');
  if (deleteLinks.length > 0) {
    deleteLinks.forEach(function(element) {
      element.removeEventListener('click', deleteHandler); // Remove existing event listener
      element.addEventListener('click', deleteHandler); // Add new event listener
    });
  }

  // Zoom-in animation on scroll for images
  const images = document.querySelectorAll('.cardImage');
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  images.forEach(image => {
    observer.observe(image);
  });
});

function toggleMenu() {
  const menu = document.querySelector('.navbar .menu');
  if (menu) {
    menu.classList.toggle('open');
  }
}

function bookmarkHandler(event) {
  event.preventDefault();
  const recipeId = this.getAttribute('data-id');
  if (recipeId) {
    console.log('Bookmark recipe:', recipeId);
    bookmarkRecipe(recipeId);
  }
}

function deleteHandler(event) {
  event.preventDefault();
  const recipeId = this.getAttribute('data-id');
  if (recipeId) {
    showDeleteModal(recipeId);
  }
}

function showDeleteModal(recipeId) {
  const modal = document.getElementById('deleteModal');
  const confirmButton = document.getElementById('confirmDelete');
  const cancelButton = document.getElementById('cancelDelete');

  modal.style.display = 'block';

  confirmButton.onclick = function() {
    deleteRecipe(recipeId);
    modal.style.display = 'none';
  };

  cancelButton.onclick = function() {
    modal.style.display = 'none';
  };

  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = 'none';
    }
  };
}

function bookmarkRecipe(recipeId) {
  // Simulate a bookmark action
  fetch(`/kitchen/cart/${encodeURIComponent(recipeId.replace(/"/g, ''))}`, { method: 'GET' })
    .then(response => response.json())
    .then(data => {
      if (!data.success && data.message === 'Recipe already bookmarked') {
        showNotification('Recipe already bookmarked.');
      } else if (data.success) {
        showNotification('Recipe bookmarked successfully!');
      } else {
        showNotification('An error occurred.');
      }
    })
    .catch(error => {
      console.error('Error:', error);
      showNotification('An error occurred.');
    });
}

function deleteRecipe(recipeId) {
  // Simulate a delete action
  console.log('DELETED RECIPE ID:', recipeId);
  fetch(`/kitchen/recipe/${encodeURIComponent(recipeId.replace(/"/g, ''))}`, { method: 'DELETE' })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      if (!data.success && data.message === 'Recipe not found') {
        showNotification('Recipe not found.');
      } else if (data.success) {
        showNotification('Recipe deleted successfully!');
        setTimeout(() => {
          window.location.href = '/kitchen/all-recipes';
        }, 2000);
      } else {
        showNotification('An error occurred.');
      }
    })
    .catch(error => {
      console.error('Error:', error);
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
  }
}