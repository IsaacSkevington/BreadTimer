SUBSTITUTIONS = {};
EQUALS = {};



function setListEqual(name, amountList){
    let ingredientList = [];
    amountList.forEach(unit => {
        var unitParse = parseUnit(unit);
        ingredientList.push(new Ingredient(name, unitParse[0], unitParse[1]));
    });
    EQUALS[name] = new Substitutes(ingredientList);
        
}

function setSubstitute(ingredientFrom, ingredientTo){

    if(ingredientFrom.name in SUBSTITUTIONS){
        SUBSTITUTIONS[ingredientFrom.name].add(ingredientFrom, ingredientTo);
    }
    else{
        SUBSTITUTIONS[ingredientFrom.name] = new Substitutes([ingredientFrom, ingredientTo]);
    }
    
}
function setListSubstitute(name, subsList){
    let ingredientList = [];
    subsList.forEach(sub => {
        var name = sub[0]
        var unitParse = parseUnit(sub[1]);
        ingredientList.push(new Ingredient(name, unitParse[0], unitParse[1]));
    });
    if(name in SUBSTITUTIONS){
        SUBSTITUTIONS[name].addList(ingredientList);
    }
    else{
        SUBSTITUTIONS[name] = new Substitutes(ingredientList);
    }
    
}
