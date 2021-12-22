class Food{
    constructor(ingredient, dietaryInformation, nutritionalInformation){
        this.ingredient = ingredient;
        this.dietaryInformation = dietaryInformation;
        this.nutritionalInformation = nutritionalInformation

    }

    getScaledNutrition(ingredient){
        var equals = EQUALS[ingredient.name];
        if(equals.canChangeUnit(this.ingredient.unit, ingredient.unit)){
            newIngredient = equals.changeUnit(ingredient, this.ingredient.unit);
            var scaleFactor = ingredient.amount / this.ingredient.amount;
            return this.nutritionalInformation.scale(scaleFactor);
        }
        else{        
            return new NutritionInfo();
        }

    }

    satisfiesDietaryRequirements(requirements){
        for(let i = 0; i < requirements.length; i++){
            if(!this.dietaryInformation.includes(requirements[i])){
                return false;
            }
        }
        return true;
    }





}


function loadFood(foodList, lastFood, endFunction){
    var thisFood = lastFood + 1
    if(thisFood == foodList.length){
        endFunction();
    }
    else{
        var food = foodList[thisFood];
        var link = "foods/" + food.name + ".js";
        var script = document.createElement('script');
        script.src = link;
        script.onload = ()=>(loadFood(foodList, thisFood, endFunction));
        script.onerror = ()=>(loadFood(foodList, thisFood, endFunction));
        document.getElementsByTagName('head')[0].appendChild(script);
    }


}



var FOODS = {};