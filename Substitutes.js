class Substitutes{

    constructor(ingredientList){
        this.ingredientList = ingredientList;
    }

    canSubstitute(name1, name2){
        let name1Found = false;
        let name2Found = false;
        this.ingredientList.forEach(ingredient => {
            if(ingredient.name == name1){
                name1Found = true;
            }
            if(ingredient.name == name2){
                name2Found = true;
            }
        });      
        return name1Found && name2Found;
    }


    findSubstitution(name, conditions){
        for(var i = 0; i < this.ingredientList.length; i++){
            var ingredient = this.ingredientList[i]
            if(ingredient.name != name){
                if(FOODS[ingredient.name].satisfiesDietaryRequirements(conditions)){
                    return ingredient.name;
                }
            }
        };      
        return null;
    }


    getIngredient(name){
        for(var i = 0; i < this.ingredientList.length; i++){
            if(this.ingredientList[i].name == name){
                return this.ingredientList[i];
            }
        }
        return false;
    }
    getIngredientWithUnit(name, unit){
        for(var i = 0; i < this.ingredientList.length; i++){
            if(this.ingredientList[i].name == name && this.ingredientList[i].unit == unit){
                return this.ingredientList[i];
            }
        }
        return false;
    }

    canChangeUnit(unit1, unit2){
        let unit1Found = false;
        let unit2Found = false;
        if(UNITCONVERTOR.canConvert(unit1, unit2)){
            return true;
        }
        this.ingredientList.forEach(ingredient => {
            if(ingredient.unit == unit1){
                unit1Found = true;
            }
            if(ingredient.unit == unit2){
                unit2Found = true;
            }
        });      
        return unit1Found && unit2Found;
    }

    getSubstituteIngredients(ingredient, conditions){
        let possibles = []
        let generalIngredient = this.getIngredient(ingredient.name);
        generalIngredient = this.changeUnit(generalIngredient, ingredient.unit);
        this.ingredientList.forEach(i => {
            if(i.name != ingredient.name && i.checkDietaryInformation(conditions)){
                var scaledIngredient = i;
                var fraction = false;
                if(ingredient.isFraction()){
                    fraction = true;
                    ingredient.convertFromFraction()
                }
                scaledIngredient = this.changeUnit(scaledIngredient, ingredient.unit);
                scaledIngredient.scale(ingredient.amount/generalIngredient.amount);

                if(fraction){
                    scaledIngredient.convertToFraction()
                }

                possibles.push(scaledIngredient);
            }
        });
        return possibles;

    }


    changeUnit(toChange, newUnit){
        if(toChange.unit == newUnit){
            return toChange;
        }
        var fraction = false;
        if(toChange.isFraction()){
            toChange.convertFromFraction();
            fraction = true;
        }
        if(UNITCONVERTOR.canConvert(toChange.unit, newUnit)){
            return UNITCONVERTOR.convert(toChange, newUnit);
        }
        let generalToChange = EQUALS[toChange.name].getIngredientWithUnit(toChange.name, toChange.unit);
        let newIngredient = EQUALS[toChange.name].getIngredientWithUnit(toChange.name, newUnit);
        if(generalToChange == false || newIngredient == false){
            return toChange;
        }
        newIngredient.amount = toChange.amount;
        newIngredient.scale(newIngredient.amount / generalToChange.amount)
        if(fraction){
            newIngredient.convertToFraction()
        }
        return newIngredient;
    }  

    contains(ingredient){
        for(var i = 0; i < this.ingredientList.length; i++){
            if(this.ingredientList[i].name == ingredient.name){
                return true;
            }
        }
        return false;
    }

    add(ingredientFrom, ingredientTo){
        if(this.contains(ingredientFrom)){
            if(!this.contains(ingredientTo)){
                let generalIngredient = this.getIngredient(ingredientFrom.name);
                let scaleFactor = ingredientFrom.amount / generalIngredient.amount;
                ingredientTo.scale(scaleFactor);
                this.ingredientList.push(ingredientTo);
            }
        }
        else if(this.contains(ingredientTo)){
            if(!this.contains(ingredientFrom)){
                let generalIngredient = this.getIngredient(ingredientTo.name);
                let scaleFactor = ingredientTo.amount / generalIngredient.amount;
                ingredientFrom.scale(scaleFactor);
                this.ingredientList.push(ingredientFrom);
            }
        }
        else{
            this.ingredientList.push(ingredientFrom);
            this.ingredientList.push(ingredientTo);
        }
    }

    addList(list){
        for(var i = 1; i < list.length; i++){
           this.add(list[0], list[i]);
        }
    }
}