// This JS file includes ingredients database and functions to loop through
// database to load all ingredients.

// Important: ID for each ingredient is created by function generateId.

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

  function generateId(category, name) {
    return `${category.toLowerCase()}-${name.replace(/\s+/g, '-').toLowerCase()}`;
  }

  function createIngredientElement(ingredient, category) {
    const ingredientElement = document.createElement('div');
    ingredientElement.className = 'ingredient';

    const img = document.createElement('img');
    img.src = ingredient.src;
    img.alt = ingredient.name;
    img.className = 'ingredient-image';
    img.id = generateId(category, ingredient.name);

    const name = document.createElement('p');
    name.textContent = ingredient.name;
    name.className = 'ingredient-name';

    ingredientElement.appendChild(img);
    ingredientElement.appendChild(name);

    return ingredientElement;
  }

  function loadIngredients() {
    ingredientData.forEach(categoryData => {
      const category = Object.keys(categoryData)[0];
      const ingredients = categoryData[category];
      const container = document.getElementById(`${category.toLowerCase()}-container`);

      if (container) {
        ingredients.forEach(ingredient => {
          const ingredientElement = createIngredientElement(ingredient, category);
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
      evt.target.style.filter = evt.target.style.filter === 'grayscale(0%)' ? 'grayscale(100%)' : 'grayscale(0%)';
    }
  }

  document.querySelectorAll('.ingredient-classification').forEach(container => {
    container.addEventListener('click', changeImageColor);
  });

  document.getElementById('search-button').addEventListener('click', filterIngredients);

  loadIngredients();
});
