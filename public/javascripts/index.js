let ingredientsString = ""
async function init() {
    
    await loadIdentity();
    let identityInfo = await fetchJSON(`api/v1/users/myIdentity`)
    if (identityInfo.status == "loggedin"){
        await displayIngredients()
    }
    localStorage.removeItem('diet')
    localStorage.removeItem('intolerances')
}

async function addIngredient() {

    let ingredient = document.getElementById("ingredientsInput").value
    if (ingredient === "") {
        document.getElementById("ingredientsInput").placeholder = "Invalid Ingredient!";
        return;
    }
    let status;

    try {
        let response = await fetch("api/v1/inventory?ingredient=" + ingredient, {method: 'POST'})
        status = response.status;
        if (response.status === 401) {
            document.getElementById("ingredientsInput").placeholder = "You need to log in to perform this action.";
            return;
        } else {
            console.log(await response.json());
        }
    } catch(e) {
        console.log(e.message)
    }

    await displayIngredients()
    showUpdateNotification(status);

}

async function removeIngredient(ingredient) {

    if (ingredient === "") {
        document.getElementById("ingredientsInput").placeholder = "Invalid Ingredient!";
        return;
    }
    let status;

    try {
        let response = await fetch("api/v1/inventory?ingredient=" + ingredient, {method: 'DELETE'})
        status = response.status;
        if (response.status === 401) {
            document.getElementById("ingredientsInput").placeholder = "You need to log in to perform this action.";
            return;
        } else {
            console.log(await response.json());
        }
    } catch(e) {
        console.log(e.message)
    }

    await displayIngredients()
    showUpdateNotification(status);

}

async function displayIngredients() {
    try {
        let response = await fetch("api/v1/inventory", {method: 'GET'});
        let data = await response.json();
        ingredientsString = data.contents.join(", ");
        let ingredientsList = data.contents;
        let ingredientsHTML = "<h3>Your Ingredient List:</h3><ul>";
        ingredientsList.forEach(ingredient => {
            ingredientsHTML += `<li style="margin-bottom: 10px; display: flex; justify-content: space-between; align-items: center;">
            <span style="flex-grow: 1; margin-right: 10px;">${ingredient}</span>
            <button class="delete-btn" onclick="removeIngredient('${ingredient}')">Remove Ingredient</button>
            </li>`;
        });
        ingredientsHTML += "</ul>";
        document.getElementById("ingredient_preview").innerHTML = ingredientsHTML;
    }
    catch(e) {
        document.getElementById("ingredient_preview").innerHTML = `<p>Error: ${e.message}</p>`;
    }
}


async function previewRecipe() {
    try {
        let diet = localStorage.getItem('diet') || ''
        let intolerances = localStorage.getItem('intolerances') || ''
        
        let preview = await fetch(`api/v1/generate?ingredientsList=${ingredientsString}&diet=${diet}&intolerances=${intolerances}`, {
            method: 'GET',
        })
        if (preview.status === 401) {
            displayPreviews({ error: 'You need to log in.' });
            return;
        } else if (!preview.ok) {
            throw new Error('Network response was not ok.');
        }
        let previewJSON = await preview.json();
        displayPreviews(previewJSON);
    } catch(e) {
        displayPreviews({ error: `This is your error: ${e.message}` });
    }
}

function displayPreviews(previewJSON) {
    if (previewJSON.error) {
        document.getElementById("recipe_preview").innerHTML = `<p>${previewJSON.error}</p>`;
    } else if (previewJSON.results && previewJSON.results.length > 0) {
        let htmlContent = '<ul style="list-style-type:none;">';
        previewJSON.results.forEach(function(recipe) {
            let missedIngredientsList = '';
            if (recipe.missedIngredients && recipe.missedIngredients.length > 0) {
                missedIngredientsList += '<p>Missing Ingredients: ';
                const ingredientNames = recipe.missedIngredients.map(function(ingredient) {
                    return ingredient.name;
                });
                missedIngredientsList += ingredientNames.join(', ') + '.</p>';
            }
            htmlContent += `
                <li style="margin-bottom: 20px; padding: 10px; border: 1px solid #ccc; border-radius: 5px;">
                    <img src="${recipe.image}" alt="${recipe.title}" style="width: 100px; height: auto; float: left; margin-right: 20px;">
                    <p><strong>${recipe.title}</strong></p>
                    ${missedIngredientsList}
                    <button onclick="addInstructions('${recipe.id}', '${recipe.title}', '${recipe.image}')">Save Recipe</button>
                    <div style="clear: both;"></div>
                </li>`;
        });
        htmlContent += '</ul>';
        document.getElementById("recipe_preview").innerHTML = htmlContent;
    } else {
        document.getElementById("recipe_preview").innerHTML = "<p>No recipes found. Please try a different search.</p>";
    }
}

async function addInstructions(recipeID, recipeTitle, recipeImage) {
    //just a placeholder for recipeID/ not sure whether we should call recipe handler get to get the ID or 
    try {
        let response = await fetch(`api/v1/recipe?recipeID=${recipeID}&recipeTitle=${recipeTitle}&recipeImage=${recipeImage}`, {method: 'POST'})
        if (response.status === 401) {
            document.getElementById("ingredientsInput").placeholder = "You need to log in to perform this action.";
            return;
        } else {
            console.log(await response.json());
        }
    } catch(e) {
        console.log(e.message)
    }

    //await displayIngredients();

}

async function displayIngredients() {
    try {
        let response = await fetch("api/v1/inventory", {method: 'GET'});
        let data = await response.json();
        ingredientsString = data.contents.join(", ");
        let ingredientsList = data.contents;
        let ingredientsHTML = "<h3>Your Ingredient List:</h3><ul>";
        ingredientsList.forEach(ingredient => {
            ingredientsHTML += `<li style="margin-bottom: 10px; display: flex; justify-content: space-between; align-items: center;">
            <span style="flex-grow: 1; margin-right: 10px;">${ingredient}</span>
            <button class="delete-btn" onclick="removeIngredient('${ingredient}')">Remove Ingredient</button>
            </li>`;
        });
        ingredientsHTML += "</ul>";
        document.getElementById("ingredient_preview").innerHTML = ingredientsHTML;
    }
    catch(e) {
        document.getElementById("ingredient_preview").innerHTML = `<p>Error: ${e.message}</p>`;
    }
}

function showUpdateNotification(status) {
    let notification = document.createElement("div");
    console.log(status)

    if (status === 200) {
        notification.style.cssText = "position: absolute; bottom: 0; right: 0; background-color: #28a745; color: white; padding: 5px; border-radius: 5px; font-size: 0.8rem; box-shadow: 0 2px 4px rgba(0,0,0,0.2);";
        notification.innerText = "List updated!";
    } else if (status === 204) {
        notification.style.cssText = "position: absolute; bottom: 0; right: 0; background-color: #B8860B; color: white; padding: 5px; border-radius: 5px; font-size: 0.8rem; box-shadow: 0 2px 4px rgba(0,0,0,0.2);";
        notification.innerText = "No Such Ingredient!";
    } else {
        return;
    }

    let ingredientPreview = document.getElementById("ingredient_preview");
    ingredientPreview.style.position = "relative";
    
    ingredientPreview.appendChild(notification);

    setTimeout(() => {
        if (ingredientPreview.contains(notification)) {
            ingredientPreview.removeChild(notification);
        }
    }, 3000);
}

