
const escapeHTML = str => !str ? str : str.replace(/[&<>'"]/g,
    tag => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        "'": '&#39;',
        '"': '&quot;'
    }[tag]));

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
    //console.log(inventory)
    let ingredientList = []
    if (!inventory) {
        return ingredientList
    }
    inventory.forEach(ingredient => {
        ingredientList.push(ingredient.ingredient)
    })
    return ingredientList
}


async function fetchJSON(route, options) {
    let response
    try {
        response = await fetch(route, {
            method: options && options.method ? options.method : "GET",
            body: options && options.body ? JSON.stringify(options.body) : undefined,
            headers: options && options.body ? { 'Content-Type': 'application/json' } : undefined
        })
    } catch (error) {
        displayError()
        throw new Error(
            `Error fetching ${route} with options: ${options ? JSON.stringify(options) : options}
             No response from server (failed to fetch)`)
    }
    let responseJson;
    try {
        responseJson = await response.json();
    } catch (error) {
        try {
            let responseText = await response.text();
        } catch (getTextError) {
            displayError()
            throw new Error(
                `Error fetching ${route} with options: ${options ? JSON.stringify(options) : options}
                Status: ${response.status}
                Couldn't get response body
                error: ${getTextError}`)
        }
        displayError()
        throw new Error(
            `Error fetching ${route} with options: ${options ? JSON.stringify(options) : options}
            Status: ${response.status}
            Response wasn't json: ${responseText ? JSON.stringify(responseText) : responseText}
            error: ${getTextError}`)
    }
    if (response.status < 200 || response.status >= 300 || responseJson.status == "error") {
        displayError()
        throw new Error(
            `Error fetching ${route} with options: ${options ? JSON.stringify(options) : options}
            Status: ${response.status}
            Response: ${responseJson ? JSON.stringify(responseJson) : responseJson}`)
    }
    return responseJson
}

async function displayError() {
    document.getElementById('errorInfo').innerText = 'Error: action failed (see console for more information)'
    document.getElementById('errorInfo').style.opacity = 1
    // pause 4 seconds
    await new Promise(resolve => setTimeout(resolve, 4 * 1000))
    document.getElementById('errorInfo').innerText = ''
    document.getElementById('errorInfo').style.opacity = 0
}

function handleCheck(event) {
    let checkboxId = event.target.id;
    let isChecked = event.target.checked;
    let label = document.querySelector(`label[for="${checkboxId}"]`).textContent;

    let intolerances = JSON.parse(localStorage.getItem('intolerances')) || [];

    if (isChecked) {
        intolerances.push(label);
    } else {
        intolerances = intolerances.filter(intolerance => intolerance !== label);
    }

    localStorage.setItem('intolerances', JSON.stringify(intolerances));
}

function handleRadio(event) {
    let radioId = event.target.id;
    let label = document.querySelector(`label[for="${radioId}"]`).textContent;

    localStorage.setItem('diet', label);
}