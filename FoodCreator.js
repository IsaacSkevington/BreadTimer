


class SubInput{
    constructor(id, position){
        this.id = id;
        this.position = position
    }
}


class RecipeWriter{

    constructor(){
        this.id = IdManager.getID();
        this.stepList = [];
    }








    

    makeFoodCreationForm(){
        let form = document.createElement('form');
        form.classList.add("FoodCreation")
        form.name = "Create a food";

        let nameInput = document.createElement('input');
        nameInput.type = "text";
        nameInput.classList.add("FoodTitleInput");
        nameInput.id = this.id + "nameInput";
        nameInput.placeholder = "Food Name"
        nameInput.required = true;


        let substitutesCreation = this.subsCreationForm();
        let addSubButton = new Button("Add Substitute", "", "AddButton", ()=>(this.addStep(-1, null))).export();

        let equalsCreation = this.subsCreationForm();
        let addEqualsButton = new Button("Add Equivalent Quantity", "", "AddButton", ()=>(this.addStep(-1, null))).export();

        let nutritionalInformationInput = this.nutritionalInformationCreationForm();
        let dietaryInformationInput = this.dietaryInformationCreationForm();
        
        let submitButton = document.createElement("input");
        submitButton.type = "submit"
        submitButton.value = "Create Food"
        submitButton.classList.add("CreateButton");

        form.onsubmit = ()=>{
            event.preventDefault();
            return this.compileForm()
        }

        form.appendChild(nameInput);
        form.appendChild(descriptionInput);
        form.appendChild(addSubButton);
        form.appendChild(substitutesCreation);
        form.appendChild(addEqualsButton);
        form.appendChild(equalsCreation);
        form.appendChild(dietaryInformationInput)
        form.appendChild(nutritionalInformationInput);
        form.appendChild(submitButton);

        return form;       
    }


    nutritionalInformationCreationForm(){
        let nutritionalInformationForm = document.createElement("NutritionalInfoInput");


        nutritionalInformationForm.appendChild(this.createInput("Per:", "perInput", "nutritionInput", "text", placeholder = "E.g. 100g"));
        nutritionalInformationForm.appendChild(this.createInput("Calories: ", "caloriesInput", "nutritionInput", "text", false, "E.g. 100"));
        nutritionalInformationForm.appendChild(this.createInput("Fat: ", "fatInput", "nutritionInput", "text", false, "E.g. 5g"));
        nutritionalInformationForm.appendChild(this.createInput("    of which saturates: ", "saturateFatInput", "nutritionInput", "text", false, "E.g. 3g"));
        nutritionalInformationForm.appendChild(this.createInput("Protein: ", "proteinInput", "nutritionInput", "text", false, "E.g. 2g"));
        nutritionalInformationForm.appendChild(this.createInput("Carbohydrates: ", "carbInput", "nutritionInput", "text", false, "E.g. 10g"));
        nutritionalInformationForm.appendChild(this.createInput("    of which sugars: ", "sugarInput", "nutritionInput", "text", false, "E.g. 5g"));
        nutritionalInformationForm.appendChild(this.createInput("Salt: ", "saltInput", "nutritionInput", "text", false, "E.g. 5g"));
        nutritionalInformationForm.appendChild(this.createInput("Fibre: ", "fibreInput", "nutritionInput", "text", false, "E.g. 0.8g"));

        return nutritionalInformationForm;

    }

    dietaryInformationCreationForm(){

        let dietaryCreationForm = document.createElement("DietaryRequirementInput");

        let intro = document.createElement("DietaryHeading");
        intro.innerHTML = "Check the boxes below if your food satisfies the dietary requirement given";

        dietaryCreationForm.appendChild(intro);


        for(var i = 0; i < DIETARYINFORMATIONPOSSIBLES; i++){
            currentDietaryRequirement = DIETARYINFORMATIONPOSSIBLES[i].toLowerCase();
            currentDietaryRequirement = currentDietaryRequirement.replace(/\b\w/g, l => l.toUpperCase())
            dietaryCreationForm.appendChild(this.createInput(currentDietaryRequirement, "INPUT" + DIETARYINFORMATIONPOSSIBLES[i], "DietaryInfoInput", "checkbox", required = false));
        }

        return dietaryCreationForm;


    }

    subsCreationForm(){
        let containerDiv = document.createElement('IngredientForm');
        containerDiv.id = "SUBSTITUTES"
        return containerDiv;
    }

    createIngredientInput(id, index){
        let containerDiv = document.createElement('SubFormItem');
        containerDiv.id = id

        let subCreationDiv = document.createElement('SubInput')

        let ingredient = this.createInput("Ingredient (Format [amount][unit] [Ingredient Name]): ", id + "input", "SubInput", "text");
        
       
        let removeSubButton = new Button("Remove Substitute", containerDiv.id, "RemoveButton", ()=>(this.removeSub(id, this.getSubIndex(id))));

        let addSubButton = new Button("Add Substitute", containerDiv.id, "AddButton", ()=>(this.addSub(this.getSubIndex(id), id)));

        subCreationDiv.appendChild(ingredient);
        subCreationDiv.appendChild(removeSubButton.export());

        containerDiv.appendChild(subCreationDiv);
        containerDiv.appendChild(addSubButton.export());
        return containerDiv;
    }


    addSub(index, id){
        let thisIndex = index + 1;
        let subName = "sub" + IdManager.getID();
        let subWindow = this.createIngredientInput(subName, thisIndex);
        if(index == this.subList[this.getSubIndex(id)]){
            document.getElementById("SUBSTITUTES").appendChild(subWindow);

        }
        else if(index == -1){
            document.getElementById("SUBSTITUTES").insertBefore(subWindow, document.getElementById(this.subList[this.getSubIndex(id)].nextSibling));
        }
        else{
            document.getElementById(id).parentNode.insertBefore(subWindow, document.getElementById(id).nextSibling);
        }
        this.subList.splice(thisIndex, 0, new SubInput(subName, thisIndex))
        
        for(let i = thisIndex + 1; i < this.subList.length; i++){
            this.subList[i].position++;
        }
        
    }

    removeIngredient(id, index){
        document.getElementById(id).parentNode.removeChild(document.getElementById(id))
        this.subList.splice(index, 1);
        for(let i = index; i < this.stepList.length; i++){
            this.stepList[i].position--;
        }
    }


    subsCreationForm(){

    }


    createInput(label, name, displayClass, type, required = true, placeholder = ""){
        let input = document.createElement("input");
        input.id = name;
        input.classList.add(displayClass);
        input.type = type;
        input.required = required;
        input.placeholder = placeholder;

        let inputLabel = document.createElement('label');
        inputLabel.for = input.id;
        inputLabel.innerHTML = label
        inputLabel.classList.add(displayClass);

        let containerDiv = document.createElement('InputBox');

        containerDiv.appendChild(inputLabel);
        containerDiv.appendChild(input);

        return containerDiv;
    }

    createMultilineInput(label, name, displayClass, type){
        let input = document.createElement("textarea");
        input.id = name;
        input.classList.add(displayClass);
        input.required = true;

        let inputLabel = document.createElement('label');
        inputLabel.for = input.id;
        inputLabel.innerHTML = label
        inputLabel.classList.add(displayClass);

        let containerDiv = document.createElement('InputBox');

        containerDiv.appendChild(inputLabel);
        containerDiv.appendChild(input);

        return containerDiv;
    }


    compileForm(){
        let recipeName = document.getElementById(this.id + "nameInput").value
        let recipeDescription = document.getElementById(this.id + "descInput").value
        let stepData = [];
        let stepNumber = 1;
        let create = true;
        this.stepList.forEach(step => {
            var thisStep = {}
            thisStep["number"] = stepNumber;
            thisStep["description"] = document.getElementById(step.id + "description").value;
            var timeForCompletion = document.getElementById(step.id + "timeForCompletion").value;
            var hours = parseInt(timeForCompletion.substring(0, 2));
            var minutes = parseInt(timeForCompletion.substring(3, 5));
            thisStep["timeForCompletion"] = hours * 60 * 60 + minutes * 60;
            
            var ingredData = [];
            
            step.ingredientList.forEach(ingred =>{;
                var thisIngred = this.parseIngredient(document.getElementById(ingred.id + "input").value);
                if(!thisIngred){
                    alert("One of your ingredients '" + document.getElementById(ingred.id + "input").value + "' is not in the correct format")
                    create = false;
                }
                ingredData.push(thisIngred);
            });
            thisStep["ingredientData"] = ingredData;
            stepData.push(thisStep);
            stepNumber++;
        });
        try{
            var groupData = this.parseGroups(document.getElementById("groupInput"));
        }
        catch{
            alert("Your group data is not in the right format");
            create = false;
        }

        try{
            var repeatData = this.parseRepeats(document.getElementById("repeatInput"));
        }
        catch{
            alert("Your repeat data is not in the right format");
            create = false;
        }
        if(create){
            this.create(recipeName, recipeDescription, stepData, groupData, repeatData);
        }
    }

    isNum(val){
        return !isNaN(val)
    }


    parseIngredient(ingred){
        var ingredientData = {};
        var lastStop = 0;
        for(var i = 0; i < ingred.length; i++){
            if(!(this.isNum(ingred[i])) && lastStop == 0 && ingred[i] != "/" && ingred[i] != "."){
                ingredientData["amount"] = ingred.substring(0, i);
                lastStop = i;
            }
            if(ingred[i] == ' ' && lastStop > 0){
                ingredientData["unit"] = ingred.substring(lastStop, i);
                ingredientData["name"] = ingred.substring(i + 1, ingred.length);
                return ingredientData;
            }
        }
        return false;
    }
      
}


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