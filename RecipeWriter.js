class StepInput{
    constructor(id, position, parent){
        this.id = id;
        this.position = position
        this.parent = parent;
        this.ingredientList = [];

    }

    createInput(label, name, displayClass, type){
        let input = document.createElement("input");
        input.id = this.id + name;
        input.classList.add(displayClass);
        input.type = type;

        let inputLabel = document.createElement('label');
        inputLabel.for = input.id;
        inputLabel.innerHTML = label
        inputLabel.classList.add(displayClass);

        let containerDiv = document.createElement('div');
        containerDiv.appendChild(input);
        containerDiv.appendChild(inputLabel);
        return containerDiv;
    }


    show(addFunction, removeFunction, idBefore){
        let containerDiv = document.createElement('div');
        containerDiv.id = this.id;
        let descriptionInput = this.createInput("Step Description", "description", "RecipeInput", "text");
        let timeForCompletionInput = this.createInput("Time to Complete", "timeForCompletion", "RecipeInput", "text");
        let ingredientForm = this.ingredientCreationForm(this.id); 
        let addIngredientButton = new Button("Add Ingredient", "", "AddButton", ()=>(this.addIngredient(this.id))).export();

        let addStepButton = new Button("Add", containerDiv.id, "AddButton", ()=>(addFunction(this.position)))
        let removeStepButton = new Button("Remove", containerDiv.id, "RemoveButton", ()=>(removeFunction(this.position)));
        
        containerDiv.appendChild(descriptionInput);
        containerDiv.appendChild(timeForCompletionInput);
        containerDiv.appendChild(ingredientForm);
        containerDiv.appendChild(addIngredientButton);
        containerDiv.appendChild(addStepButton.export());
        containerDiv.appendChild(removeStepButton.export());
        document.getElementById(this.parent).insertBefore(containerDiv, document.getElementById(idBefore));
    }



    ingredientCreationForm(){
        let containerDiv = document.createElement('div');
        containerDiv.id = this.id + "INGREDIENTS" 
        return containerDiv;
    }


    addIngredient(){
        let ingredientName = this.id + "ingredient" + IdManager.getID();
        this.ingredientList.push(ingredientName);
        let ingredientWindow = this.createIngredientInput(ingredientName);
        document.getElementById(this.id + "INGREDIENTS").appendChild(ingredientWindow);
    }

    removeIngredient(id, index){
        document.getElementById(id).parentNode.removeChild(document.getElementById(id))
        this.ingredientList.splice(index, 1);
    }

    createIngredientInput(id){
        let containerDiv = document.createElement('div');
        containerDiv.id = id
        let ingredient = this.createInput("Ingredient: ", containerDiv.id + "input", "RecipeInput", "text");
        let addIngredientButton = new Button("Add", containerDiv.id, "AddButton", ()=>(this.addIngredient()));
        let index = this.ingredientList.length - 2;
        let removeIngredientButton = new Button("Remove", containerDiv.id, "RemoveButton", ()=>(this.removeIngredient(containerDiv.id, this.id, index)));
        containerDiv.appendChild(ingredient);
        containerDiv.appendChild(addIngredientButton.export());
        containerDiv.appendChild(removeIngredientButton.export());
        return containerDiv;
    }

    hide(){
        var elem = document.getElementById(this.id);
        elem.parentNode.removeChild(elem);
    }
}


class RecipeWriter{

    constructor(){
        this.id = IdManager.getID();
        this.stepList = [];
    }



    makeRecipeCreationForm(){
        let form = document.createElement('form');
        form.name = "Create a recipe";

        let nameInput = this.createInput("Recipe Name", "nameInput", "RecipeInput", "text");
        let descriptionInput = this.createInput("Recipe Description", "descInput", "RecipeInput", "text");
        let stepForm = this.stepCreationForm();
        this.stepFormID = stepForm.id;
        let addStepButton = new Button("Add Step", "", "AddButton", ()=>(this.addStep(-1))).export();

        let groupForm = this.createInput("Step Groups", "groupInput", "RecipeInput", "text");
        let repeatForm = this.createInput("Step Repeats", "repeatInput", "RecipeInput", "text");

        let submitButton = new Button("Create", "", "CreateButton", ()=>(this.compileForm())).export();
        


        form.appendChild(nameInput);
        form.appendChild(descriptionInput);
        form.appendChild(addStepButton);
        form.appendChild(stepForm);
        form.appendChild(groupForm);
        form.appendChild(repeatForm);
        form.appendChild(submitButton);

        return form;       
    }

    stepCreationForm(){
        let containerDiv = document.createElement('div');
        containerDiv.id = IdManager.getID(); 
        return containerDiv;
    }

    addStep(previousIndex){
        let stepName = "STEP" + IdManager.getID();
        let index = previousIndex + 1;
        let stepInput = new StepInput(stepName, index, this.stepFormID);
        if(previousIndex == -1 && this.stepList.length == 0){
            stepInput.show(()=>(this.addStep(index)), ()=>(this.removeStep(index)), "FIRSTSTEP");
        }
        else if(previousIndex == -1){
            stepInput.show(()=>(this.addStep(index)), ()=>(this.removeStep(index)), this.stepList[0].id)
        }
        else{
            stepInput.show(()=>(this.addStep(index)), ()=>(this.removeStep(index)), this.stepList[previousIndex].id)
        }
        this.stepList.splice(index, 0, stepInput);
        let newStepList = []
        this.stepList.forEach(step => {
            if(step.position > index){
                step.position += 1;
            }
            newStepList.push(step);
        });
        this.stepList = newStepList;

    }

    removeStep(index){
        this.stepList[index].hide();
        this.stepList.splice(index, 1);
        let newStepList = []
        this.stepList.forEach(step => {
            if(step.position >= index){
                step.position -= 1;
            }
            newStepList.push(step);
        });
        this.stepList = newStepList
    }

    createStepInput(stepName){

    }




    createInput(label, name, displayClass, type){
        let input = document.createElement("input");
        input.id = this.id + name;
        input.classList.add(displayClass);
        input.type = type;

        let inputLabel = document.createElement('label');
        inputLabel.for = input.id;
        inputLabel.innerHTML = label
        inputLabel.classList.add(displayClass);

        let containerDiv = document.createElement('div');
        containerDiv.appendChild(input);
        containerDiv.appendChild(inputLabel);
        return containerDiv;
    }


    compileForm(){
        let recipeName = document.getElementById(this.id + "nameInput").value
        let recipeDescription = document.getElementById(this.id + "descInput").value
        let stepData = [];
        let stepNumber = 1;
        this.stepList.forEach(step => {
            var thisStep = {}
            thisStep["number"] = stepNumber;
            thisStep["description"] = document.getElementById(step.id + "description").value
            thisStep["timeForCompletion"] = document.getElementById(step.id + "timeForCompletion").value
            var ingredData = [];
            
            step.ingredientList.forEach(ingred =>{
                var thisIngred = this.parseIngredient(document.getElementById(step.id + ingred + "input").value);
                ingredData.push(thisIngred);
            });
            thisStep["ingredientData"] = ingredData;
            stepData.push(thisStep);
            stepNumber++;
        });
        var groupData = this.parseGroups(document.getElementById("groupInput"));
        var repeatData = this.parseRepeats(document.getElementById("repeatInput"));

        this.create(recipeName, recipeDescription, stepData, groupData, repeatData);
    }

    isNum(val){
        return !isNaN(val)
    }

    parseGroups(groupString){
        let groups = {};
        if(groupString != null){
            let groupStart = 0;
            let groupEnd = 0;
            let lastGpSep = 0;
            let lastSeSep = 0;
            for(var i = 0; i < groupString.length; i++){
                if(groupString[i] == ":"){
                    groupStart = parseInt(groupString.substring(lastGpSep, i));
                    lastSeSep = i + 1;
                }
                else if(groupString[i] == ";"){
                    groupEnd = parseInt(groupString.substring(lastSeSep, i));
                    groups[groupStart] = groupEnd;
                    lastGpSep = i + 1;
                }
            }
        }
        return groups;
    }

    parseRepeats(repeatString){
        return this.parseGroups(repeatString);
    }

    parseIngredient(ingred){
        var ingredientData = {};
        var lastStop = 0;
        for(var i = 0; i < ingred.length; i++){
            if(!(this.isNum(ingred[i])) && lastStop == 0){
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

    create(name, description, stepData, groupData, repeatData){
        let text = "let r = new Recipe(\n\n" +
                "    '" + name + "',\n" + 
                "    '" + description + "',\n    [\n";
        stepData.forEach(step => {
            text += this.stepCreate(step["number"], step["description"], step["ingredientData"], step["timeForCompletion"]) + ",\n\n";
        });
        text += "    ],\n\n" + this.groupCreate(groupData) + ",//Groups\n\n" + this.repeatsCreate(repeatData) + "//Repeats\n";
        text += ");\nRECIPEBOOK.add(r);";
        this.download(name + ".js", text);
    }

    ingredientCreate(name, unit, amount){
        let text = "                new Ingredient(\n"+
                   "                    '" + name + "',\n"+
                   "                    " + amount + ",\n"+
                   "                    '" + unit + "')";
        return text;
    }

    stepCreate(number, description, ingredientData, timeForCompletion){
        let text = "        new Step(\n" +
                "            " + number + ",\n" + 
                "            '" + description + "',\n            [\n";
        ingredientData.forEach(ingredient => {
            text += this.ingredientCreate(ingredient["name"], ingredient["unit"], ingredient["amount"]) + ",";
        });
        text += "\n            ],\n" + "            " + timeForCompletion + ")"
        return text;
    }

    groupCreate(groupData){
        let text = "{";
        if(groupData.length > 0){
            groupData.forEach(groupStart => {
                groupEnd = groupData[groupStart];
                text += groupStart + ":" + groupEnd + ", "
            });
        }
        text += "}";
        return "    " + text;
    }

    repeatsCreate(repeatsData){
        let text = "{";
            if(repeatsData.length > 0){
            repeatsData.forEach(groupStart => {
                groupRepeats = repeatsData[groupStart];
                text += groupStart + ":" + groupRepeats + ", "
            });
        }
        text += "}";
        return "    " + text;
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