document.getElementById("add-instruction").addEventListener("click", function() {
    var instructionsDiv = document.getElementById("instruction");
    var newInstructionDiv = document.createElement("div");
    newInstructionDiv.classList.add("instruction");
    newInstructionDiv.innerHTML = `
        <input type="text" name="instructions[]" placeholder="Instruction" required>
    `;
    instructionsDiv.appendChild(newInstructionDiv);
});

document.getElementById('add-ingredient').addEventListener('click', function() {
    var ingredientsDiv = document.getElementById('ingredients');
    var newIngredientDiv = document.createElement('div');
    newIngredientDiv.classList.add('ingredient');
    newIngredientDiv.innerHTML = `
        <input type="text" name="ingredients[]" placeholder="Ingredient" required>
        <input type="text" name="units[]" placeholder="Unit" required>
    `;
    ingredientsDiv.appendChild(newIngredientDiv);
});