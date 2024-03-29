let myIdentity = undefined;

async function loadIdentity(){
    let identity_div = document.getElementById("identity_div");

    try{
        let identityInfo = await fetchJSON(`api/v1/users/myIdentity`)
        
        if(identityInfo.status == "loggedin"){
            myIdentity = identityInfo.userInfo.username;
            identity_div.innerHTML = `
            <a href="/userPage.html?user=${encodeURIComponent(identityInfo.userInfo.username)}">${escapeHTML(identityInfo.userInfo.name)} (${escapeHTML(identityInfo.userInfo.username)})</a>
            <a href="signout" class="btn btn-danger" role="button">Log out</a>`;
            if(document.getElementById("make_post_div")){
                document.getElementById("make_post_div").classList.remove("d-none");
            }
            Array.from(document.getElementsByClassName("new-comment-box")).forEach(e => e.classList.remove("d-none"))
            Array.from(document.getElementsByClassName("heart-button-span")).forEach(e => e.classList.remove("d-none"));
        } else { //logged out
            myIdentity = undefined;
            identity_div.innerHTML = `
            <a href="signin" class="btn btn-primary" role="button">Log in</a>`;
            if(document.getElementById("make_post_div")){
                document.getElementById("make_post_div").classList.add("d-none");
            }
            Array.from(document.getElementsByClassName("new-comment-box")).forEach(e => e.classList.add("d-none"))
            Array.from(document.getElementsByClassName("heart-button-span")).forEach(e => e.classList.add("d-none"));
        }
    } catch(error){
        myIdentity = undefined;
        identity_div.innerHTML = `<div>
        <button onclick="loadIdentity()">retry</button>
        Error loading identity: <span id="identity_error_span"></span>
        </div>`;
        document.getElementById("identity_error_span").innerText = error;
        if(document.getElementById("make_post_div")){
            document.getElementById("make_post_div").classList.add("d-none");
        }
        Array.from(document.getElementsByClassName("new-comment-box")).forEach(e => e.classList.add("d-none"));
        Array.from(document.getElementsByClassName("heart-button-span")).forEach(e => e.classList.add("d-none"));
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
