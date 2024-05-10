//let ingredientsString = ""
async function init() {

    await loadIdentity();
    let identityInfo = await fetchJSON(`api/v1/users/myIdentity`)
    if (identityInfo.status == "loggedin") {
        await displayIngredients()
    }
    //localStorage.removeItem('diet')
    //localStorage.removeItem('intolerances')
}


async function displayIngredients() {
    const ingredientData = [
        {
            "name": "avocado",
            "src": "./img/idk/avocado.png"
        },
        {
            "name": "bell pepper",
            "src": "./img/idk/bell_pepper.png"
        },
        {
            "name": "bok choy",
            "src": "./img/idk/bok_choy.png"
        },
        {
            "name": "broccoli",
            "src": "./img/idk/broccoli.png"
        },
        {
            "name": "carrot",
            "src": "./img/idk/carrot.png"
        },
        {
            "name": "cauliflower",
            "src": "./img/idk/cauliflower.png"
        },
        {
            "name": "cilantro",
            "src": "./img/idk/cilantro.png"
        },
        {
            "name": "corn",
            "src": "./img/idk/corn.png"
        },
        {
            "name": "cucumber",
            "src": "./img/idk/cucumber.png"
        },
        {
            "name": "eggplant",
            "src": "./img/idk/eggplant.png"
        },
        {
            "name": "ginger",
            "src": "./img/idk/ginger.png"
        },
        {
            "name": "leek",
            "src": "./img/idk/leek.png"
        },
        {
            "name": "lettuce",
            "src": "./img/idk/lettuce.png"
        },
        {
            "name": "mushroom",
            "src": "./img/idk/mushroom.png"
        },
        {
            "name": "onion",
            "src": "./img/idk/onion.png"
        },
        {
            "name": "peas",
            "src": "./img/idk/peas.png"
        },
        {
            "name": "potatoes",
            "src": "./img/idk/potatoes.png"
        },
        {
            "name": "spinach",
            "src": "./img/idk/spinach.png"
        },
        {
            "name": "sprouts",
            "src": "./img/idk/sprouts.png"
        },
        {
            "name": "taro",
            "src": "./img/idk/taro.png"
        },
        {
            "name": "zucchini",
            "src": "./img/idk/zucchini.png"
        },
        {
            "name": "white reddish",
            "src": "./img/idk/white_reddish.png"
        },
        {
            "name": "butternut squash",
            "src": "./img/idk/butternut_squash.png"
        },
        {
            "name": "bacon",
            "src": "./img/idk/bacon.png"
        },
        {
            "name": "beef shank",
            "src": "./img/idk/beef shank.png"
        },
        {
            "name": "beef rib",
            "src": "./img/idk/beef_rib.png"
        },
        {
            "name": "beef sirloin",
            "src": "./img/idk/beef_sirloin.png"
        },
        {
            "name": "beef steak",
            "src": "./img/idk/Beef_steak.png"
        },
        {
            "name": "chicken leg",
            "src": "./img/idk/chicken leg.png"
        },
        {
            "name": "chicken breast",
            "src": "./img/idk/chicken_breast.png"
        },
        {
            "name": "chicken drum",
            "src": "./img/idk/chicken_drum.png"
        },
        {
            "name": "chicken thigh",
            "src": "./img/idk/chicken_thigh.png"
        },
        {
            "name": "chicken wing",
            "src": "./img/idk/chicken_wing.png"
        },
        {
            "name": "ground beef",
            "src": "./img/idk/ground_beef.png"
        },
        {
            "name": "ground pork",
            "src": "./img/idk/ground_pork.png"
        },
        {
            "name": "lamb loin",
            "src": "./img/idk/lamb_loin.png"
        },
        {
            "name": "lamb shank",
            "src": "./img/idk/lamb_shank.png"
        },
        {
            "name": "oxtail",
            "src": "./img/idk/oxtail.png"
        },
        {
            "name": "pastrami",
            "src": "./img/idk/pastrami.png"
        },
        {
            "name": "pork brisket",
            "src": "./img/idk/pork_brisket.png"
        },
        {
            "name": "pork chop",
            "src": "./img/idk/pork_chop.png"
        },
        {
            "name": "prosciutto",
            "src": "./img/idk/prosciutto.png"
        },
        {
            "name": "pull pork",
            "src": "./img/idk/pull_pork.png"
        },
        {
            "name": "salami",
            "src": "./img/idk/salami.png"
        },
        {
            "name": "sausage",
            "src": "./img/idk/sausage.png"
        },
        {
            "name": "apple",
            "src": "./img/idk/apple-3d-illustration-icon-png.png"
        },
        {
            "name": "banana",
            "src": "./img/idk/banana-fruit-3d-icon-png.png"
        },
        {
            "name": "cherry",
            "src": "./img/idk/cherry-6430786-5299258.png"
        },
        {
            "name": "coconut",
            "src": "./img/idk/coconut.png"
        },
        {
            "name": "dragon fruit",
            "src": "./img/idk/dragon_fruit.png"
        },
        {
            "name": "durian",
            "src": "./img/idk/durian.png"
        },
        {
            "name": "grapefruit",
            "src": "./img/idk/grapefruit.png"
        },
        {
            "name": "grapes",
            "src": "./img/idk/Grapes-3d-icon.png"
        },
        {
            "name": "guava",
            "src": "./img/idk/guava.png"
        },
        {
            "name": "jackfruit",
            "src": "./img/idk/jackfruit.png"
        },
        {
            "name": "kiwi",
            "src": "./img/idk/kiwi.png"
        },
        {
            "name": "lychee",
            "src": "./img/idk/lychee.png"
        },
        {
            "name": "mandarins",
            "src": "./img/idk/mandarins.png"
        },
        {
            "name": "mango",
            "src": "./img/idk/mango.png"
        },
        {
            "name": "melon",
            "src": "./img/idk/melon.png"
        },
        {
            "name": "orange",
            "src": "./img/idk/orange-5843979-4889219.png"
        },
        {
            "name": "papaya",
            "src": "./img/idk/papaya.png"
        },
        {
            "name": "peach",
            "src": "./img/idk/peach.png"
        },
        {
            "name": "pear",
            "src": "./img/idk/pear.png"
        },
        {
            "name": "pineapple",
            "src": "./img/idk/pineapple-6323913-5210265.png"
        },
        {
            "name": "plum",
            "src": "./img/idk/plum.png"
        },
        {
            "name": "pomegranate",
            "src": "./img/idk/pomegranate.png"
        },
        {
            "name": "starfruit",
            "src": "./img/idk/starfruit.png"
        },
        {
            "name": "watermelon",
            "src": "./img/idk/watermelon.png"
        },
        {
            "name": "salt",
            "src": "./img/idk/10606249.png"
        },
        {
            "name": "bay leaves",
            "src": "./img/idk/bay_leaves.png"
        },
        {
            "name": "blackpepper",
            "src": "./img/idk/blackpepper.png"
        },
        {
            "name": "cinnamon powder",
            "src": "./img/idk/cinnamon_powder.png"
        },
        {
            "name": "cumin powder",
            "src": "./img/idk/cumin powder.png"
        },
        {
            "name": "paprika",
            "src": "./img/idk/paprika.png"
        },
        {
            "name": "tumeric powder",
            "src": "./img/idk/tumeric_powder.png"
        }
    ];
    try {
        let inventory = getIngredient(await getContent())
        console.log("1" + inventory)
        let ingredientsList = inventory.map(ingredient => {
            // return `
            //     <li style="margin-bottom: 10px; display: flex; justify-content: space-between; align-items: center;">
            //         <span style="flex-grow: 1; margin-right: 10px; color: black;">${ingredient}</span>
            //         <input type="checkbox" name="ingredient" value="${ingredient}" />
            //     </li>
            // `;
            let image = document.createElement('img');
            image.id = ingredient;
            image.src = "./img/idk/" + ingredient + ".png";
            image.alt = ingredient;
            document.getElementById("ingredients").appendChild(image);
            let checkBox = document.createElement('input');
            checkBox.type = "checkbox";
            checkBox.name = "ingredient";
            checkBox.value = ingredient;
            document.getElementById("ingredients").appendChild(checkBox);
        })//.join("");
        // console.log("2" + ingredientsList)
        // let ingredientsHTML = `
        //     <h3 style="color: black;">Your Ingredient List:</h3>
        //     <ul style="overflow-y: scroll; max-height: 200px;">
        //     ${ingredientsList}
        //     </ul>
        // `;
        // console.log("3" + ingredientsHTML)
        // document.getElementById("ingredients").innerHTML = ingredientsHTML;
        //
        // let response = await fetch("api/v1/inventory", {method: 'GET'});
        // let data = await response.json();
        // ingredientsString = data.contents.join(", ");
        // let ingredientsList = data.contents;
        // let ingredientsHTML = "<h3>Your Ingredient List:</h3><ul>";
        // ingredientsList.forEach(ingredient => {
        //     ingredientsHTML += `<li style="margin-bottom: 10px; display: flex; justify-content: space-between; align-items: center;">
        //     <span style="flex-grow: 1; margin-right: 10px;">${ingredient}</span>
        //     <button class="delete-btn" onclick="removeIngredient('${ingredient}')">Remove Ingredient</button>
        //     </li>`;
        // });
        // ingredientsHTML += "</ul>";
        // document.getElementById("ingredient_preview").innerHTML = ingredientsHTML;
    }
    catch (e) {
        document.getElementById("ingredients").innerHTML = `<p>Error: ${e.message}</p>`;
    }
}


async function previewRecipe() {
    try {
        //let diet = localStorage.getItem('diet') || ''
        //let intolerances = localStorage.getItem('intolerances') || ''
        let checkedIngredients = Array.from(document.querySelectorAll('input[name="ingredient"]:checked')).map(input => input.value);
        ingredientsString = checkedIngredients.join(", ");
        // let preview = await fetch(`api/v1/generate?ingredientsList=${ingredientsString}&diet=${diet}&intolerances=${intolerances}`, {
        let preview = await fetch(`api/v1/generate?ingredientsList=${ingredientsString}`, {
            method: 'GET',
        })
        if (preview.status === 401) {
            displayPreviews({ error: 'You need to log in.' });
            return;
        } else if (!preview.ok) {
            throw new Error('Network response was not ok.');
        }
        let previewJSON = await preview.json();
        console.log("hmmmmm" + JSON.stringify(previewJSON));
        displayPreviews(previewJSON);
    } catch (e) {
        displayPreviews({ error: `This is your error: ${e.message}` });
    }
}

function displayPreviews(previewJSON) {
    if (previewJSON.error) {
        document.getElementById("recipe_preview").innerHTML = `<p>${previewJSON.error}</p>`;
    } else if (previewJSON.results && previewJSON.results.length > 0) {
        let htmlContent = '<ul style="list-style-type:none;">';
        previewJSON.results.forEach(function (recipe) {
            let missedIngredientsList = '';
            if (recipe.missedIngredients && recipe.missedIngredients.length > 0) {
                missedIngredientsList += '<p>Missing Ingredients: ';
                const ingredientNames = recipe.missedIngredients.map(function (ingredient) {
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
        let response = await fetch(`api/v1/recipe?recipeID=${recipeID}&recipeTitle=${recipeTitle}&recipeImage=${recipeImage}`, { method: 'POST' })
        if (response.status === 401) {
            document.getElementById("ingredientsInput").placeholder = "You need to log in to perform this action.";
            return;
        } else {
            console.log(await response.json());
        }
    } catch (e) {
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

