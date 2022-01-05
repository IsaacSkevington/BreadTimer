class FoodCreator{

    constructor(){

    }



    

    write(name, amount, unit, dietaryInformation, nutritionalInformation, equalUnits, substitutes){

        let text = ""
        text += "var NAME = " + name + ";\n"

        text += "var f = new Food(\n" +
                "    new Ingredient(\n" +
                "        NAME" + ",\n"+
                "        " + amount + ",\n"+
                "        \"" + unit + "\"\n),\n"
        
        text += "    ["
        for(key in dietaryInformation){
            if(dietaryInformation[key]){
                text += key + ", "
            }
        }
        text += "],\n";

        text += "    " + nutritionalInformation.toCreator(4);

        text += "\n)\n\n";

        text += "FOODS[NAME] = f;\n\n";

        text += "setListEqual(\n" + 
                "    NAME,\n    ["
        for(var i = 0; i < equalUnits.length; i++){
            text += "\"" + equalUnits[i] + "\",\n"
        }
        text += "]\n)\n"

        text += "setListSubstitute(\n" +
                "    NAME,\n" +
                "    [\n"+
                "        [NAME, f.ingredient.amount.toString() + f.ingredient.unit],\n"

        for(var i = 0; i < substitutes.length; i++){
            text += "        [\"" + substitutes[i][0] + "\", \"" + substitutes[i][1] + "\"],\n"
        }
        text += "    ]\n"
        text += ")"
        return text; 

    }

    download(filename, text) {
        var element = document.createElement('a');
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
        element.setAttribute('download', filename);
      
        element.style.display = 'none';
        document.body.appendChild(element);
      
        element.click();
      
        document.body.removeChild(element);
    }

}