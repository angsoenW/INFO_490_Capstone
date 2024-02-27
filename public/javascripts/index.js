let ingredientsString = ""
async function init() {
    
    await loadIdentity();
    let identityInfo = await fetchJSON(`api/v1/users/myIdentity`)
    if (identityInfo.status == "loggedin"){
        await displayIngredients()
    }

}

async function addIngredient() {

    let ingredient = document.getElementById("ingredientsInput").value

    try {
        let response = await fetch("api/v1/inventory?ingredient=" + ingredient, {method: 'POST'})
        console.log(response.status);
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

}


// TODO: Add the remove button on each ingredient  
async function removeIngredient() {

    let ingredient = document.getElementById("ingredientsInput").value

    try {
        let response = await fetch("api/v1/inventory?ingredient=" + ingredient, {method: 'DELETE'})
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

}

async function previewRecipe() {
    try {
        let preview = await fetch("api/v1/generate?ingredientsList=" + ingredientsString, {
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
            htmlContent += `
                <li style="margin-bottom: 20px; padding: 10px; border: 1px solid #ccc; border-radius: 5px;">
                    <img src="${recipe.image}" alt="${recipe.title}" style="width: 100px; height: auto; float: left; margin-right: 20px;">
                    <p><strong>${recipe.title}</strong></p>
                    <div style="clear: both;"></div>
                </li>`;
        });
        htmlContent += '</ul>';
        document.getElementById("recipe_preview").innerHTML = htmlContent;
    } else {
        document.getElementById("recipe_preview").innerHTML = "<p>No recipes found. Please try a different search.</p>";
    }
}

async function displayIngredients() {
    try {
        let response = await fetch("api/v1/inventory", {method: 'GET'});
        let data = await response.json();
        let ingredientsList = data.contents;
        let ingredientsHTML = "<h3>Your Ingredient List:</h3><ul>";
        ingredientsList.forEach(ingredient => {
            ingredientsHTML += `<li>${ingredient}</li>`;
        });
        ingredientsHTML += "</ul>";
        document.getElementById("ingredient_preview").innerHTML = ingredientsHTML;
    }
    catch(e) {
        document.getElementById("ingredient_preview").innerHTML = `<p>Error: ${e.message}</p>`;
    }
}