

function isNum(val){
    return !isNaN(val)
}


function parseUnit(text){
    var ingredientData = [];
    var lastStop = 0;
    text = text.replace(/\s+/g, '');
    for(var i = 0; i < text.length; i++){
        if(!(isNum(text[i])) && lastStop == 0 && text[i] != "/" && text[i] != "."){
            ingredientData.push(text.substring(0, i));
            lastStop = i;
            break;
        }
    }
    if(lastStop == 0){
        return [];
    }
    ingredientData.push(text.substring(lastStop, text.length));
    return ingredientData;
}


class UnitConvertor{

    constructor(list){
        this.unitMap = {}

        list.forEach(conversionList => {
            var unitList = []
            conversionList.forEach(unit => {
                unitList.push(parseUnit(unit));
            });
            unitList.forEach(unit1 => {
                this.unitMap[unit1[1]] = {}
                unitList.forEach(unit2 => {
                    this.unitMap[unit1[1]][unit2[1]] = unit2[0]/unit1[0];
                }); 
            });  
        });
        
    }



    canConvert(unit1, unit2){
        if(!(unit1 in this.unitMap)){
            return false;
        }
        return unit2 in this.unitMap[unit1]
    }

    convert(ingredient, unit){
        var amount = ingredient.amount * this.unitMap[ingredient.unit][unit];
        return new Ingredient(ingredient.name, amount, unit);
    }

}


var UNITCONVERTOR = new UnitConvertor(
    [
        ["6350.29g", "224oz", "6.35029kg", "1st", "14lb"],
        ["568.261ml", "0.568261l", "20 fl.oz.", "1 pint", "96 tsp", "2 Cup", "32 tbsp", "96 Teaspoon", "32 Tablespoon"]
    ]
);

