// This JS file includes ingredients database and functions to loop through
// database to load all ingredients.

// Important: ID for each ingredient is created by function generateId.
let inventory
let ingredientList
let identity
let itemToAdd = []
let itemToRemove = []
//let info = fetch("https://api.kroger.com/v1/products?filter.term=avocado")

document.addEventListener('DOMContentLoaded', function () {
  const ingredientData = [
    {
      "Veggie": [
        {
          "name": "avocado",
          "src": "./img/icons/Veggie/avocado.png"
        },
        {
          "name": "bell pepper",
          "src": "./img/icons/Veggie/bell_pepper.png"
        },
        {
          "name": "bok choy",
          "src": "./img/icons/Veggie/bok_choy.png"
        },
        {
          "name": "broccoli",
          "src": "./img/icons/Veggie/broccoli.png"
        },
        {
          "name": "carrot",
          "src": "./img/icons/Veggie/carrot.png"
        },
        {
          "name": "cauliflower",
          "src": "./img/icons/Veggie/cauliflower.png"
        },
        {
          "name": "cilantro",
          "src": "./img/icons/Veggie/cilantro.png"
        },
        {
          "name": "corn",
          "src": "./img/icons/Veggie/corn.png"
        },
        {
          "name": "cucumber",
          "src": "./img/icons/Veggie/cucumber.png"
        },
        {
          "name": "eggplant",
          "src": "./img/icons/Veggie/eggplant.png"
        },
        {
          "name": "ginger",
          "src": "./img/icons/Veggie/ginger.png"
        },
        {
          "name": "leek",
          "src": "./img/icons/Veggie/leek.png"
        },
        {
          "name": "leetuce",
          "src": "./img/icons/Veggie/leetuce.png"
        },
        {
          "name": "mushroom",
          "src": "./img/icons/Veggie/mushroom.png"
        },
        {
          "name": "onion",
          "src": "./img/icons/Veggie/onion.png"
        },
        {
          "name": "peas",
          "src": "./img/icons/Veggie/peas.png"
        },
        {
          "name": "potatoes",
          "src": "./img/icons/Veggie/potatoes.png"
        },
        {
          "name": "spinach",
          "src": "./img/icons/Veggie/spinach.png"
        },
        {
          "name": "sprouts",
          "src": "./img/icons/Veggie/sprouts.png"
        },
        {
          "name": "taro",
          "src": "./img/icons/Veggie/taro.png"
        },
        {
          "name": "zucchini",
          "src": "./img/icons/Veggie/zucchini.png"
        },
        {
          "name": "white reddish",
          "src": "./img/icons/Veggie/white_reddish.png"
        },
        {
          "name": "butternut squash",
          "src": "./img/icons/Veggie/butternut_squash.png"
        }
      ]
    },
    {
      "Meat": [
        {
          "name": "bacon",
          "src": "./img/icons/meat/bacon.png"
        },
        {
          "name": "beef shank",
          "src": "./img/icons/meat/beef shank.png"
        },
        {
          "name": "beef rib",
          "src": "./img/icons/meat/beef_rib.png"
        },
        {
          "name": "beef sirloin",
          "src": "./img/icons/meat/beef_sirloin.png"
        },
        {
          "name": "beef steak",
          "src": "./img/icons/meat/Beef_steak.png"
        },
        {
          "name": "chicken leg",
          "src": "./img/icons/meat/chicken leg.png"
        },
        {
          "name": "chicken breast",
          "src": "./img/icons/meat/chicken_breast.png"
        },
        {
          "name": "chicken drum",
          "src": "./img/icons/meat/chicken_drum.png"
        },
        {
          "name": "chicken thigh",
          "src": "./img/icons/meat/chicken_thigh.png"
        },
        {
          "name": "chicken wing",
          "src": "./img/icons/meat/chicken_wing.png"
        },
        {
          "name": "ground beef",
          "src": "./img/icons/meat/ground_beef.png"
        },
        {
          "name": "ground pork",
          "src": "./img/icons/meat/ground_pork.png"
        },
        {
          "name": "lamb loin",
          "src": "./img/icons/meat/lamb_loin.png"
        },
        {
          "name": "lamb shank",
          "src": "./img/icons/meat/lamb_shank.png"
        },
        {
          "name": "oxtail",
          "src": "./img/icons/meat/oxtail.png"
        },
        {
          "name": "pastrami",
          "src": "./img/icons/meat/pastrami.png"
        },
        {
          "name": "pork brisket",
          "src": "./img/icons/meat/pork_brisket.png"
        },
        {
          "name": "pork chop",
          "src": "./img/icons/meat/pork_chop.png"
        },
        {
          "name": "prosciutto",
          "src": "./img/icons/meat/prosciutto.png"
        },
        {
          "name": "pull pork",
          "src": "./img/icons/meat/pull_pork.png"
        },
        {
          "name": "salami",
          "src": "./img/icons/meat/salami.png"
        },
        {
          "name": "sausage",
          "src": "./img/icons/meat/sausage.png"
        }
      ]
    },
    {
      "Fruit": [
        {
          "name": "apple",
          "src": "./img/icons/fruit/apple-3d-illustration-icon-png.png"
        },
        {
          "name": "banana",
          "src": "./img/icons/fruit/banana-fruit-3d-icon-png.png"
        },
        {
          "name": "cherry",
          "src": "./img/icons/fruit/cherry-6430786-5299258.png"
        },
        {
          "name": "coconut",
          "src": "./img/icons/fruit/coconut.png"
        },
        {
          "name": "dragon fruit",
          "src": "./img/icons/fruit/dragon_fruit.png"
        },
        {
          "name": "durian",
          "src": "./img/icons/fruit/durian.png"
        },
        {
          "name": "grapefruit",
          "src": "./img/icons/fruit/grapefruit.png"
        },
        {
          "name": "grapes",
          "src": "./img/icons/fruit/Grapes-3d-icon.png"
        },
        {
          "name": "guava",
          "src": "./img/icons/fruit/guava.png"
        },
        {
          "name": "jackfruit",
          "src": "./img/icons/fruit/jackfruit.png"
        },
        {
          "name": "kiwi",
          "src": "./img/icons/fruit/kiwi.png"
        },
        {
          "name": "lychee",
          "src": "./img/icons/fruit/lychee.png"
        },
        {
          "name": "mandarins",
          "src": "./img/icons/fruit/mandarins.png"
        },
        {
          "name": "mango",
          "src": "./img/icons/fruit/mango.png"
        },
        {
          "name": "melon",
          "src": "./img/icons/fruit/melon.png"
        },
        {
          "name": "orange",
          "src": "./img/icons/fruit/orange-5843979-4889219.png"
        },
        {
          "name": "papaya",
          "src": "./img/icons/fruit/papaya.png"
        },
        {
          "name": "peach",
          "src": "./img/icons/fruit/peach.png"
        },
        {
          "name": "pear",
          "src": "./img/icons/fruit/pear.png"
        },
        {
          "name": "pineapple",
          "src": "./img/icons/fruit/pineapple-6323913-5210265.png"
        },
        {
          "name": "plum",
          "src": "./img/icons/fruit/plum.png"
        },
        {
          "name": "pomegranate",
          "src": "./img/icons/fruit/pomegranate.png"
        },
        {
          "name": "starfruit",
          "src": "./img/icons/fruit/starfruit.png"
        },
        {
          "name": "watermelon",
          "src": "./img/icons/fruit/watermelon.png"
        }
      ]
    },
    {
      "Seasoning": [
        {
          "name": "salt",
          "src": "./img/icons/Seasonings/10606249.png"
        },
        {
          "name": "bay leaves",
          "src": "./img/icons/Seasonings/bay_leaves.png"
        },
        {
          "name": "blackpepper",
          "src": "./img/icons/Seasonings/blackpepper.png"
        },
        {
          "name": "cinnamon powder",
          "src": "./img/icons/Seasonings/cinnamon_powder.png"
        },
        {
          "name": "cumin powder",
          "src": "./img/icons/Seasonings/cumin powder.png"
        },
        {
          "name": "paprika",
          "src": "./img/icons/Seasonings/paprika.png"
        },
        {
          "name": "tumeric powder",
          "src": "./img/icons/Seasonings/tumeric_powder.png"
        }
      ]
    }
  ];

  async function getContent() {
    let inventory
    let response = await fetch("api/v1/inventory", { method: 'GET' });
    let data = await response.json();
    if (data.length !== 0) {
      for (let invent in data) {
        invent = data[invent]
        if (invent.contents) {
          inventory = invent.contents
        }
      }
    }
    return inventory
  }

  function getIngredient(inventory) {
    console.log(inventory)
    let ingredientList = []
    inventory.forEach(ingredient => {
      ingredientList.push(ingredient.ingredient)
    })
    return ingredientList
  }

  function generateId(category, name) {
    return `${category.toLowerCase()}-${name.replace(/\s+/g, '-').toLowerCase()}`;
  }

  function createIngredientElement(ingredient, category, ingredientList) {
    const ingredientElement = document.createElement('div');
    ingredientElement.className = 'ingredient';

    const img = document.createElement('img');
    img.src = ingredient.src;
    img.alt = ingredient.name;
    img.className = 'ingredient-image';
    img.id = generateId(category, ingredient.name);
    if (ingredientList.includes(img.alt)) {
      img.style.filter = 'grayscale(0%)';
    }

    const name = document.createElement('p');
    name.textContent = ingredient.name;
    name.className = 'ingredient-name';

    ingredientElement.appendChild(img);
    ingredientElement.appendChild(name);

    return ingredientElement;
  }

  async function loadIngredients() {
    inventory = await getContent()
    ingredientList = getIngredient(inventory)
    ingredientData.forEach(categoryData => {
      const category = Object.keys(categoryData)[0];
      const ingredients = categoryData[category];
      const container = document.getElementById(`${category.toLowerCase()}-container`);

      if (container) {
        ingredients.forEach(ingredient => {
          const ingredientElement = createIngredientElement(ingredient, category, ingredientList);
          container.appendChild(ingredientElement);
        });
      }
    });
  }

  function filterIngredients() {
    const searchQuery = document.getElementById('search-ingredient-input').value.toLowerCase();

    ingredientData.forEach(categoryData => {
      const category = Object.keys(categoryData)[0];
      const ingredients = categoryData[category];
      const container = document.getElementById(`${category.toLowerCase()}-container`);

      container.innerHTML = '';

      ingredients.forEach(ingredient => {
        if (ingredient.name.toLowerCase().includes(searchQuery)) {
          const ingredientElement = createIngredientElement(ingredient, category);
          container.appendChild(ingredientElement);
        }
      });
    });
  }

  function changeImageColor(evt) {
    if (evt.target.tagName === 'IMG') {
      if (evt.target.style.filter === 'grayscale(0%)') {
        evt.target.style.filter = 'grayscale(100%)';
      } else {
        evt.target.style.filter = 'grayscale(0%)';
      }

      if (ingredientList.includes(evt.target.alt)) {
        ingredientList = ingredientList.filter(item => item !== evt.target.alt);
        if (itemToAdd.includes(evt.target.alt)) {
          itemToAdd = itemToAdd.filter(item => item !== evt.target.alt);
        } else {
          itemToRemove.push(evt.target.alt)
        }
      } else {
        ingredientList.push(evt.target.alt)
        if (itemToRemove.includes(evt.target.alt)) {
          itemToRemove = itemToRemove.filter(item => item !== evt.target.alt);
        } else {
          itemToAdd.push(evt.target.alt)
        }
      }
    }
  }

  document.querySelectorAll('.ingredient-classification').forEach(container => {
    container.addEventListener('click', changeImageColor);
  });

  document.getElementById('search-button').addEventListener('click', filterIngredients);

  loadIngredients();
});

function updateFridge() {
  addIngredient(itemToAdd)
  //removeIngredient(itemToRemove)
}

async function addIngredient(itemToAdd) {
  // when new user is created, the page is set to undefined
  console.log("adding" + itemToAdd)
  // let ingredient = document.getElementById("ingredientsInput").value;
  for (let item in itemToAdd) {
    item = itemToAdd[item]

    //let purchaseDate = ""

    // if (purchaseDate === "") {
    let today = new Date();
    let month = String(today.getMonth() + 1).padStart(2, '0');
    let day = String(today.getDate()).padStart(2, '0');
    let year = today.getFullYear();
    let purchaseDate = `${month}/${day}/${year}`;
    // }

    let shelfLifeDays = await getExpirationPeriods(item);

    // //let purchaseDateObj = new Date(purchaseDate);
    // if (!shelfLifeDays) {
    //   //console.error('Shelf life for the ingredient is not defined');
    //   shelfLifeDays = 10;
    // }

    // // TBD: Do we need to calculate expiration date? I'm thinking we can just store the purchase date and shelf life days
    // // TBD: shelfLifeDays should be calculated in backend?
    // // let expirationDate = new Date(purchaseDateObj.setDate(purchaseDateObj.getDate() + shelfLifeDays));
    // // console.log(expirationDate);
    // // expirationDate = expirationDate.toISOString().split('T')[0];

    let status;
    try {
      console.log("adding" + JSON.stringify(shelfLifeDays))
      let data = {
        ingredient: item,
        purchaseDate: purchaseDate,
        shelfLifeDays: shelfLifeDays ? shelfLifeDays : 10
      };

      console.log("adding" + data.purchaseDate)


      let response = await fetch("api/v1/inventory?ingredient=" + identity, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      status = response.status;
      if (response.status === 401) {
        document.getElementById("ingredientsInput").placeholder = "You need to log in to perform this action.";
        document.getElementById("dateInput").placeholder = "You need to log in to perform this action.";
        return;
      } else {
        console.log(await response.json());
      }
    } catch (e) {
      console.log(e.message);
    }

    //location.reload()
    //showUpdateNotification(status);
  }
}

async function getExpirationPeriods(item) {
  let expirationPeriods = await fetch("api/v1/shelfLife?food=" + item);
  //console.log("hmm" + await expirationPeriods.json())
  return expirationPeriods.json();
}

async function removeIngredient(_id) {

  if (_id === "") {
    document.getElementById("ingredientsInput").placeholder = "Invalid Ingredient!";
    return;
  }
  let status;

  try {
    let response = await fetch("api/v1/inventory?ingredient=" + _id, { method: 'DELETE' })
    status = response.status;
    if (response.status === 401) {
      document.getElementById("ingredientsInput").placeholder = "You need to log in to perform this action.";
      return;
    } else {
      console.log(await response.json());
    }
  } catch (e) {
    console.log(e.message)
  }

  await displayIngredients()
  showUpdateNotification(status);

}
