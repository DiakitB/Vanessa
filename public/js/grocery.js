document.addEventListener('DOMContentLoaded', function() {
    const groceryList = document.getElementById('grocery-list');
    const addIngredientForm = document.getElementById('add-ingredient-form');

    addIngredientForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const ingredientInput = addIngredientForm.querySelector('input[name="ingredient"]');
        const unitInput = addIngredientForm.querySelector('input[name="unit"]');

        const ingredient = ingredientInput.value.trim();
        const unit = unitInput.value.trim();

        if (ingredient && unit) {
            const newItem = document.createElement('li');
            newItem.innerHTML = `
                <input type="checkbox" class="grocery-checkbox">
                <span class="index">${groceryList.children.length + 1}.</span>
                <span class="details">
                    <span class="ingredient">${ingredient}</span>
                    <span class="quantity">${unit}</span>
                </span>
            `;
            groceryList.appendChild(newItem);

            // Clear the form inputs
            ingredientInput.value = '';
            unitInput.value = '';
        }
    });

    groceryList.addEventListener('change', function(event) {
        if (event.target.classList.contains('grocery-checkbox')) {
            const listItem = event.target.closest('li');
            listItem.remove();
        }
    });
});