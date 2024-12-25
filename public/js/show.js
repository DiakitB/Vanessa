document.getElementById('bookmark-link').addEventListener('click', function(event) {
    event.preventDefault();
    // Simulate checking if the recipe is already bookmarked
    var isBookmarked = false; // Replace with actual check
    if (isBookmarked) {
      var alreadyBookmarkedMessage = document.getElementById('already-bookmarked-message');
      alreadyBookmarkedMessage.style.display = 'block';
      setTimeout(function() {
        alreadyBookmarkedMessage.style.display = 'none';
      }, 3000);
    } else {
      // Simulate bookmarking action
      setTimeout(function() {
        var message = document.getElementById('bookmark-message');
        message.style.display = 'block';
        setTimeout(function() {
          message.style.display = 'none';
        }, 3000);
      }, 500);
    }
  });