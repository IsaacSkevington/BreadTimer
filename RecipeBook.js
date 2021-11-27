class RecipeBook{

    constructor(name){
        this.name = name;
        this.recipes = {};
        this.getAvailableRecipes();
    }

    getAvailableRecipes(){
        var link = "recipes/" + this.name + ".js";
        var script = document.createElement('script');
        script.src = link;
        script.onload = this.display;
        document.getElementsByTagName('head')[0].appendChild(script);
    }

    getRecipe(rname){
        var link = "recipes/" + rname +".js";
        var script = document.createElement('script');
        script.src = link;
        document.getElementsByTagName('head')[0].appendChild(script);
    }

    display(){
        let mainDiv = document.createElement('div');
        mainDiv.id = "main";

        let recipeDiv = document.createElement('div');
        recipeDiv.id = "recipe";
        recipeDiv.classList.add("recipeBody")

        this.recipeLinkIds = [];            
        function deleteLinks(links){
            links.forEach(id => {
                var elem = document.getElementById(id);
                elem.parentNode.removeChild(elem);
            });
        }

        function displayRecipe(recipe, links){
            deleteLinks(links);
            recipe.display('recipe', 'timerSound')
        }

        function displayForm(links){
            deleteLinks(links);
            r = new RecipeWriter();
            let form = r.makeRecipeCreationForm();
            document.getElementById("recipe").appendChild(form);
        }

        RECIPELIST.forEach(recipeName => {
            var recipeLink = document.createElement('RecipeLink');
            recipeLink.id = IdManager.getID();
            RECIPEBOOK.getRecipe(recipeName);
            recipeLink.onclick = ()=>(displayRecipe(RECIPEBOOK.recipes[recipeName], this.recipeLinkIds));
            recipeLink.innerHTML = recipeName;
            recipeDiv.appendChild(recipeLink);
            this.recipeLinkIds.push(recipeLink.id)
        });

        var recipeCreationButton = document.createElement('CreateRecipe');
        recipeCreationButton.id = IdManager.getID();
        recipeCreationButton.innerHTML = "Create recipe"
        this.recipeLinkIds.push(recipeCreationButton.id);
        recipeCreationButton.onclick = ()=>(displayForm(this.recipeLinkIds))
        recipeDiv.appendChild(recipeCreationButton);
        
        mainDiv.appendChild(recipeDiv);
        document.body.appendChild(mainDiv);
    }

    add(r){
        this.recipes[r.name] = r;
    }

}
let RECIPEBOOK = new RecipeBook("DefaultBook");