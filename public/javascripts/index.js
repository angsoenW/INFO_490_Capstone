let ingredientsString = ""
let identity
async function init() {
    
    await loadIdentity();
    let identityInfo = await fetchJSON(`api/v1/users/myIdentity`)
    if (identityInfo.status == "loggedin"){
        await displayIngredients()
    }
    localStorage.removeItem('diet')
    localStorage.removeItem('intolerances')
}

async function getExpirationPeriods() {
    const response = await fetch('../data/expirationPeriods.json');
    return await response.json();
}

async function addIngredient() {
    let ingredient = document.getElementById("ingredientsInput").value;
    let purchaseDate = document.getElementById("dateInput").value;

    if (ingredient === "") {
        document.getElementById("ingredientsInput").placeholder = "Invalid Ingredient!";
        return;
    }
    if (purchaseDate === "") {
        let today = new Date();
        let month = String(today.getMonth() + 1).padStart(2, '0');
        let day = String(today.getDate()).padStart(2, '0');
        let year = today.getFullYear();
        purchaseDate = `${month}/${day}/${year}`;
    }

    let expirationPeriods = await getExpirationPeriods();
    let shelfLifeDays = expirationPeriods[ingredient];
    
    //let purchaseDateObj = new Date(purchaseDate);
    if (!shelfLifeDays) {
        //console.error('Shelf life for the ingredient is not defined');
        shelfLifeDays = 10;
    }

    // TBD: Do we need to calculate expiration date? I'm thinking we can just store the purchase date and shelf life days
    // TBD: shelfLifeDays should be calculated in backend?
    // let expirationDate = new Date(purchaseDateObj.setDate(purchaseDateObj.getDate() + shelfLifeDays));
    // console.log(expirationDate);
    // expirationDate = expirationDate.toISOString().split('T')[0];
    
    let status;
    try {
        let data = {
            ingredient: ingredient,
            purchaseDate: purchaseDate
        };

        console.log("adding" + data.puchaseDate)
        console.log("adding" + identity)


        let response = await fetch("api/v1/inventory?ingredient=" + identity, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }});

        status = response.status;
        if (response.status === 401) {
            document.getElementById("ingredientsInput").placeholder = "You need to log in to perform this action.";
            document.getElementById("dateInput").placeholder = "You need to log in to perform this action.";
            return;
        } else {
            console.log(await response.json());
        }
    } catch(e) {
        console.log(e.message);
    }

    await displayIngredients();
    showUpdateNotification(status);
}

async function removeIngredient(_id) {

    if (_id === "") {
        document.getElementById("ingredientsInput").placeholder = "Invalid Ingredient!";
        return;
    }
    let status;

    try {
        let response = await fetch("api/v1/inventory?ingredient=" + _id, {method: 'DELETE'})
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

// Update by Jasper: Existing bug: 1. when click on add ingredient button twice, program fails
// 2. when click add ingredient, the ingredient is add to the database but page is not updated. refresh to see the update
async function displayIngredients() {
    try {
        let response = await fetch("api/v1/inventory", {method: 'GET'});
        let data = await response.json();
        if (data.length === 0) {
            document.getElementById("ingredient_preview").innerHTML = `<p>No inventory found.</p> <button onclick="addNewInventory()">Add New Inventory</button></div>`;
        } else {
            for (let invent in data) {
                invent = data[invent]

                identity = invent._id
                if (!invent.contents) {
                    document.getElementById("ingredient_preview").innerHTML = `<p>No item in inventory.</p> <button onclick="addNewInventory()">Add New Inventory</button></div>`;
                } else {
                    // ingredientsString = invent.contents.join(", ");
                    let ingredientsList = invent.contents;
                    let ingredientsHTML = "<h3>Your Ingredient List:</h3><ul>";
                    // Future reference: if grouping feature is added, loop thru all invent.content and display each with _id, GET POST DELETE FUNCTION will take two param(inventory._id, item._id)
                    ingredientsList.forEach(ingredient => {
                        ingredientsHTML += `<li style="margin-bottom: 10px; display: flex; justify-content: space-between; align-items: center;">
                        <span style="flex-grow: 1; margin-right: 10px;">${ingredient.ingredient}</span>
                        <button class="delete-btn" onclick="removeIngredient('${ingredient._id}')">Remove Ingredient</button>
                        </li>`;
                    });
                    ingredientsHTML += "</ul>";
                    document.getElementById("ingredient_preview").innerHTML = ingredientsHTML;
                }
            }
        }
        
    }
    catch(e) {
        document.getElementById("ingredient_preview").innerHTML = `<p>Error: ${e.message}</p>`;
    }
}

function readItem(item) {
    return item.ingredient
}

// async function displayIngredients() {
//     try {
//         let response = await fetch("api/v1/inventory", {method: 'GET'});
//         let data = await response.json();
//         console.log(data)
//         if (data.length === 0) {
//             document.getElementById("ingredient_preview").innerHTML = `<p>No inventory found.</p> <button onclick="addNewInventory()">Add New Inventory</button></div>`;
//         } else {
//             let navBarHTML = '<div id="navBar">';
//             data.forEach((item, index) => {
//                 identity = item._id
//                 console.log("findme" + identity)
//                 navBarHTML += `<button onclick="displayIngredientList(${index})">Ingredient List ${index + 1}</button>`;
//             });
//             navBarHTML += '<button onclick="addNewInventory()">Add New Inventory</button></div>';

//             // Add the navigation bar to the top of the window
//             document.getElementById("ingredient_preview").insertAdjacentHTML('afterbegin', navBarHTML);
//             //console.log("findme123")
//             // Display the first ingredient list by default
//             displayIngredientList(0);}
//             console.log("findme456")
//             // Create a navigation bar for ingredient lists
//     } catch(e) {
//         document.getElementById("ingredient_preview").innerHTML = `<p>Error: ${e.message}</p>`;
//     }
// }

// async function displayIngredientList(index) {
//     fetch("api/v1/inventory", {method: 'GET'})
//     .then(response => response.json())
//     .then(data => {
//         let ingredientsList = Object.values(data[0].contents[index]);
//         let ingredientsHTML = "<h3>Your Ingredient List:</h3><ul>";
//         ingredientsList.forEach(ingredient => {
//             ingredientsHTML += `<li style="margin-bottom: 10px; display: flex; justify-content: space-between; align-items: center;">
//             <span style="flex-grow: 1; margin-right: 10px;">${ingredient}</span>
//             <button class="delete-btn" onclick="removeIngredient('${ingredient}')">Remove Ingredient</button>
//             </li>`;
//         });
//         ingredientsHTML += "</ul>";
//         document.getElementById("ingredient_preview").innerHTML = ingredientsHTML;
//     })
//     .catch(e => {
//         document.getElementById("ingredient_preview").innerHTML = `<p>Error: ${e.message}</p>`;
//     });
// }

async function addNewInventory() {
    let status;
    identity = "add"
    try {
        let response = await fetch("api/v1/inventory?ingredient=" + identity, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            }});

        status = response.status;
        if (response.status === 401) {
            document.getElementById("ingredientsInput").placeholder = "You need to log in to perform this action.";
            document.getElementById("dateInput").placeholder = "You need to log in to perform this action.";
            return;
        } else {
            console.log(await response.json());
        }
    } catch(e) {
        console.log(e.message);
    }

    await displayIngredients();
    showUpdateNotification(status);
}

// Need to be edited: ingredientsString should be a list of selected ingredients from user instead of everything in the inventory
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

