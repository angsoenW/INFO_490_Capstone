let myIdentity = undefined;

async function loadIdentity(){
    let identity_div = document.getElementById("identity_div");

    try{
        let identityInfo = await fetchJSON(`api/v1/users/myIdentity`)
        
        if(identityInfo.status == "loggedin"){
            myIdentity = identityInfo.userInfo.username;
            identity_div.innerHTML = `
            <a href="/userPage.html?user=${encodeURIComponent(identityInfo.userInfo.username)}">Saved Recipe</a>
            <a href="signout" id="logout">Log out</a>`;
        } else { //logged out
            myIdentity = undefined;
            identity_div.innerHTML = `
            <a href="signin">Log in</a>`;
        }
    } catch(error){
        myIdentity = undefined;
        identity_div.innerHTML = `<div>
        <a onclick="loadIdentity()">retry</button>
        Error loading identity: <span id="identity_error_span"></span>
        </div>`;
        document.getElementById("identity_error_span").innerText = error;
    }
}

async function deleteRecipe(recipeID) {
    try {
        let response = await fetch(`api/v1/recipe?recipeID=${recipeID}`, {method: 'DELETE'})
        if (response.status === 401) {
            document.getElementById("recipe_preview").innerHTML = "You need to log in to perform this action.";
            return;
        } else {
            console.log(await response.json());
        }
    } catch(e) {
        console.log(e.message)
    }
}
