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
        script.onload = ()=>(this.display());
        document.getElementsByTagName('head')[0].appendChild(script);
    }

    getRecipe(rname){
        var link = "recipes/" + rname +".js";
        var script = document.createElement('script');
        script.src = link;
        document.getElementsByTagName('head')[0].appendChild(script);
        script.onload = ()=>(this.displayRecipe(rname))
    }

    deleteLinks(){
        let links = this.recipeLinkIds;
        links.forEach(id => {
            var elem = document.getElementById(id);
            elem.parentNode.removeChild(elem);
        });
    }

    displayRecipe(recipe){
        this.deleteLinks();
        let homeButton = new Button("Home", "main", "HomeButton", ()=>(this.display())).export();
        document.getElementById("recipe").appendChild(homeButton);
        this.recipes[recipe].display('recipe', 'timerSound')

    }

    displayForm(){
        this.deleteLinks();
        let r = new RecipeWriter();
        let form = r.makeRecipeCreationForm();

        let homeButton = new Button("Home", "main", "HomeButton", ()=>(this.display())).export();
        document.getElementById("recipe").appendChild(homeButton);
        document.getElementById("recipe").appendChild(form);
    }

    changePreferences(){
        
        this.deleteLinks();
        let homeButton = new Button("Home", "main", "HomeButton", ()=>(this.display())).export();
        let preferenceWindow = USER.changePreferences();
        document.getElementById("main").appendChild(homeButton);
        document.getElementById("main").appendChild(preferenceWindow)
    }

    display(){
        try{
            document.getElementById("main").parentNode.removeChild(document.getElementById("main"));
        }
        catch{

        }
        this.recipeLinkIds = [];
        let mainDiv = document.createElement('div');
        mainDiv.id = "main";

        let preferenceChangeButton = new Button("Preferences", "main", "PreferenceButton", ()=>(this.changePreferences()));
        this.recipeLinkIds.push(preferenceChangeButton.id)
        mainDiv.appendChild(preferenceChangeButton.export());

        let recipeDiv = document.createElement('div');
        recipeDiv.id = "recipe";
        recipeDiv.classList.add("recipeBody")

             


        RECIPELIST.forEach(recipeName => {
            var recipeLink = document.createElement('RecipeLink');
            recipeLink.id = IdManager.getID();
            recipeLink.onclick = ()=>{
                RECIPEBOOK.getRecipe(recipeName);
            };
            recipeLink.innerHTML = recipeName;
            recipeDiv.appendChild(recipeLink);
            this.recipeLinkIds.push(recipeLink.id)
        });

        var recipeCreationButton = document.createElement('CreateRecipe');
        recipeCreationButton.id = IdManager.getID();
        recipeCreationButton.innerHTML = "Create recipe"
        this.recipeLinkIds.push(recipeCreationButton.id);
        recipeCreationButton.onclick = ()=>(this.displayForm())
        recipeDiv.appendChild(recipeCreationButton);
        
        mainDiv.appendChild(recipeDiv);
        document.body.appendChild(mainDiv);
    }

    add(r){
        this.recipes[r.name] = r;
    }

}
RECIPEBOOK = new RecipeBook(USER.preferences["Default Recipe Book"]);