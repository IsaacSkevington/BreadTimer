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
        document.getElementsByTagName('head')[0].appendChild(script);
    }

    getRecipe(rname){
        var link = "recipes/" + rname +".js";
        var script = document.createElement('script');
        script.src = link;
        document.getElementsByTagName('head')[0].appendChild(script);
    }

    add(r){
        this.recipes[r.name] = r;
    }

}
let RECIPEBOOK = new RecipeBook("DefaultBook");