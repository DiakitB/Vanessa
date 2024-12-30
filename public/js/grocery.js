document.addEventListener('DOMContentLoaded', function() {
    const groceryList = document.getElementById('grocery-list');

    groceryList.addEventListener('change', function(event) {
        if (event.target.classList.contains('grocery-checkbox')) {
            const listItem = event.target.closest('li');
            listItem.remove();
        }
    });
});