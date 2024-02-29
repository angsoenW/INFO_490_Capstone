async function init() {
  await loadIdentity()
  loadRecipes()
}

async function loadRecipes() {
    try {
        let response = await fetch('api/v1/recipe', {method: 'GET'})
        let data = await response.json()

        let htmlContent = '<ul style="list-style-type:none;">';
        data.forEach(function(recipe) {
            htmlContent += `
                <li style="margin-bottom: 20px; padding: 10px; border: 1px solid #ccc; border-radius: 5px;">
                    <img src="${recipe.recipeImage}" alt="${recipe.recipeTitle}" style="width: 100px; height: auto; float: left; margin-right: 20px;">
                    <p><strong>${recipe.recipeTitle}</strong></p>
                    ${recipe.steps.map((step, index) => `Step ${index + 1}: ${step}`).join('<br>')}
                    <br>
                    <button onclick="deleteRecipe('${recipe.recipeID}')">Delete Recipe</button>
                    <div style="clear: both;"></div>
                </li>`;
        });
        htmlContent += '</ul>';
        document.getElementById("recipes").innerHTML = htmlContent;
    }
    catch(e) {
        console.log(e.message)
    }
}

async function deleteRecipe(recipeID) {
    try {
        let response = await fetch(`api/v1/recipe/?recipeID=${recipeID}`, {method: 'DELETE'})
        let data = await response.json()
        console.log(data)
        loadRecipes()
    }
    catch(e) {
        console.log(e.message)
    }
}

