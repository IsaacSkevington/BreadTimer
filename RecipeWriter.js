

class IngredientInput{
    constructor(stepID, id, position){
        this.id = id;
        this.position = position;
        this.stepID = stepID;
    }
}


class StepInput{
    constructor(id, position){
        this.id = id;
        this.position = position
        this.ingredientList = [];
    }
}


class RecipeWriter{

    constructor(){
        this.id = IdManager.getID();
        this.stepList = [];
    }





    editRecipe(recipe){
        let form = this.makeRecipeCreationForm();
        form.getElementById("nameInput").value = recipe.name;
        form.getElementById("descInput").value = recipe.desc;
        let currentStepID = null;
        let currentStepIndex = -1
        recipe.steps.forEach(step => {
            form.getElementsById()
            currentStepID = this.stepList[this.stepList.length() - 1]
        });

    }




    

    makeRecipeCreationForm(){
        let form = document.createElement('form');
        form.classList.add("RecipeCreation")
        form.name = "Create a recipe";

        let nameInput = document.createElement('input');
        nameInput.type = "text";
        nameInput.classList.add("RecipeTitleInput");
        nameInput.id = this.id + "nameInput";
        nameInput.placeholder = "Recipe Name"
        nameInput.required = true;


        let descriptionInput = this.createMultilineInput("Recipe Description", this.id + "descInput", "RecipeInput", "text");
        let stepForm = this.stepCreationForm();
        this.stepFormID = stepForm.id;
        let addStepButton = new Button("Add Step", "", "AddButton", ()=>(this.addStep(-1, null))).export();

        let groupForm = this.createInput("Step Groups (Format startStep:endStep;startStep:endStep)", "groupInput", "RecipeInput", "text", false);
        let repeatForm = this.createInput("Step Repeats (Format stepNumber:repeatTimes;groupStart:repeatTimes)", "repeatInput", "RecipeInput", "text", false);

        let submitButton = document.createElement("input");
        submitButton.type = "submit"
        submitButton.value = "Create Recipe"
        submitButton.classList.add("CreateButton");

        form.onsubmit = ()=>{
            event.preventDefault();
            return this.compileForm()
        }

        form.appendChild(nameInput);
        form.appendChild(descriptionInput);
        form.appendChild(addStepButton);
        form.appendChild(stepForm);
        form.appendChild(groupForm);
        form.appendChild(repeatForm);
        form.appendChild(submitButton);

        return form;       
    }


    createStepInput(id){
        let containerDiv = document.createElement('StepForm');
        containerDiv.id = id;

        let mainBodyDiv = document.createElement('StepInputMainBody');
        let leftDiv = document.createElement("StepInputLeft")
        let rightDiv = document.createElement("StepInputRight")
        let descriptionInput = this.createMultilineInput("Step Description", id + "description", "RecipeInput", "text");
        let timeForCompletionInput = this.createInput("Time to Complete (hh:mm)", id + "timeForCompletion", "RecipeInput", "time");
        let ingredientForm = this.ingredientCreationForm(id); 
        let addIngredientButton = new Button("Add Ingredient", "", "AddButton", ()=>(this.addIngredient(id, -1, null))).export();

        let addStepButton = new Button("Add Step", containerDiv.id, "AddButton", ()=>(this.addStep(this.getStepIndex(id), id)))
        let removeStepButton = new Button("Remove Step", containerDiv.id, "RemoveButton", ()=>(this.removeStep(this.getStepIndex(id), id)));
        

        leftDiv.appendChild(descriptionInput);
        leftDiv.appendChild(timeForCompletionInput);
        ingredientForm.appendChild(addIngredientButton);
        leftDiv.appendChild(ingredientForm);
        
        rightDiv.appendChild(removeStepButton.export());

        mainBodyDiv.appendChild(leftDiv);
        mainBodyDiv.appendChild(rightDiv);

        containerDiv.appendChild(mainBodyDiv);
        containerDiv.appendChild(addStepButton.export());
        return containerDiv;
    }



    ingredientCreationForm(stepID){
        let containerDiv = document.createElement('IngredientForm');
        containerDiv.id = stepID + "INGREDIENTS" 
        return containerDiv;
    }


    addIngredient(stepID, index, id){
        let thisIndex = index + 1;
        let ingredientName = stepID + "ingredient" + IdManager.getID();
        let ingredientWindow = this.createIngredientInput(stepID, ingredientName, thisIndex);
        if(index == this.stepList[this.getStepIndex(stepID)].ingredientList - 1){
            document.getElementById(stepID + "INGREDIENTS").appendChild(ingredientWindow);

        }
        else if(index == -1){
            document.getElementById(stepID + "INGREDIENTS").insertBefore(ingredientWindow, document.getElementById(this.stepList[this.getStepIndex(stepID)].ingredientList[0].id).nextSibling);
        }
        else{
            document.getElementById(id).parentNode.insertBefore(ingredientWindow, document.getElementById(id).nextSibling);
        }
        this.stepList[this.getStepIndex(stepID)].ingredientList.splice(thisIndex, 0, new IngredientInput(stepID, ingredientName, thisIndex))
        
        for(let i = thisIndex + 1; i < this.stepList[this.getStepIndex(stepID)].ingredientList.length; i++){
            this.stepList[this.getStepIndex(stepID)].ingredientList[i].position++;
        }
        
    }

    removeIngredient(stepID, id, index){
        document.getElementById(id).parentNode.removeChild(document.getElementById(id))
        this.stepList[this.getStepIndex(stepID)].ingredientList.splice(index, 1);
        for(let i = index; i < this.stepList[this.getStepIndex(stepID)].ingredientList.length; i++){
            this.stepList[this.getStepIndex(stepID)].ingredientList[i].position--;
        }
    }

    getIngredientIndex(stepID, ingredID){
        let stepIndex = this.getStepIndex(stepID)
        var position = 0;
        this.stepList[stepIndex].ingredientList.forEach(ingredient => {
            if(ingredient.id == ingredID){
                position = ingredient.position;
            }
        });
        return position;
    }

    getStepIndex(stepID){
        var position = 0;
        this.stepList.forEach(step => {
            if(step.id == stepID){
                position = step.position;
            }
        });
        return position;
    }


    createIngredientInput(stepID, id, index){
        let containerDiv = document.createElement('IngredientFormItem');
        containerDiv.id = id

        let ingredientCreationDiv = document.createElement('IngredientInput')

        let ingredient = this.createInput("Ingredient (Format [amount][unit] [Ingredient Name]): ", id + "input", "RecipeInput", "text");
        
       
        let removeIngredientButton = new Button("Remove Ingredient", containerDiv.id, "RemoveButton", ()=>(stepID, this.removeIngredient(stepID, id, this.getIngredientIndex(stepID, id))));

        let addIngredientButton = new Button("Add Ingredient", containerDiv.id, "AddButton", ()=>(this.addIngredient(stepID, this.getIngredientIndex(stepID, id), id)));

        ingredientCreationDiv.appendChild(ingredient);
        ingredientCreationDiv.appendChild(removeIngredientButton.export());

        containerDiv.appendChild(ingredientCreationDiv);
        containerDiv.appendChild(addIngredientButton.export());
        return containerDiv;
    }









    stepCreationForm(){
        let containerDiv = document.createElement('StepFormList');
        containerDiv.id = IdManager.getID(); 
        return containerDiv;
    }

    addStep(index, id){
        let thisIndex = index + 1;
        let stepName = "STEP" + IdManager.getID();
        let stepWindow = this.createStepInput(stepName);
        if(index == this.stepList.length - 1){
            document.getElementById(this.stepFormID).appendChild(stepWindow);

        }
        else if(index == -1){
            document.getElementById(this.stepFormID).insertBefore(stepWindow, document.getElementById(this.stepFormID).firstChild);
        }
        else{
            document.getElementById(id).parentNode.insertBefore(stepWindow, document.getElementById(id).nextSibling);
        }
        this.stepList.splice(thisIndex, 0, new StepInput(stepName, thisIndex))
        for(let i = thisIndex + 1; i < this.stepList.length; i++){
            this.stepList[i].position++;
        }
    }

    removeStep(index, id){
        document.getElementById(id).parentNode.removeChild(document.getElementById(id))
        this.stepList.splice(index, 1);
        for(let i = index; i < this.stepList.length; i++){
            this.stepList[i].position--;
        }
    }



    createInput(label, name, displayClass, type, required = true){
        let input = document.createElement("input");
        input.id = name;
        input.classList.add(displayClass);
        input.type = type;
        input.required = required;

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

    create(name, description, stepData, groupData, repeatData){
        name = name.replace("'", "\\'");
        description = description.replace("'", "\\'");
        let text = "var r = new Recipe(\n\n" +
                "    '" + name + "',\n" + 
                "    '" + description + "',\n    [\n";
        stepData.forEach(step => {
            text += this.stepCreate(step["number"], step["description"], step["ingredientData"], step["timeForCompletion"]) + ",\n\n";
        });
        text += "    ],\n\n" + this.groupCreate(groupData) + ",//Groups\n\n" + this.repeatsCreate(repeatData) + "//Repeats\n";
        text += ");\nRECIPEBOOK.add(r);";
        this.uploadRecipe(name, text);
        alert("Recipe created successfully, click OK to download");
        this.download(name + ".js", text);
    }

    ingredientCreate(name, unit, amount){
        name = name.replace("'", "\\'");
        let text = "                new Ingredient(\n"+
                   "                    '" + name + "',\n"+
                   "                    '" + amount + "',\n"+
                   "                    '" + unit + "')";
        return text;
    }

    stepCreate(number, description, ingredientData, timeForCompletion){
        description = description.replace("'", "\\'");
        let text = "        new Step(\n" +
                "            " + number + ",\n" + 
                "            '" + description + "',\n            [\n";
        ingredientData.forEach(ingredient => {
            text += this.ingredientCreate(ingredient["name"], ingredient["unit"], ingredient["amount"]) + ",\n";
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


    uploadRecipe(name, text){
        var filename = name + ".js";
        var executeScript = document.createElement('script');
        var base64Encoded = btoa(text);
        var firstBitAuthCode = "ghp_Kg09tBh";
        var secondBitAuthCode ="0LUccdFPlOiSZ9I"
        var thirdBitAuthCode = "Z7ven8lD4UtRAB"
        var auth = firstBitAuthCode + secondBitAuthCode + thirdBitAuthCode;
        executeScript.innerHTML = "import { Octokit } from 'https://cdn.skypack.dev/@octokit/rest';\n" +
                                  "const octokit = new Octokit({ auth: `" + auth + "` });\n" + 
                                  "octokit.request('PUT /repos/{owner}/{repo}/contents/{path}', {\n" + 
                                  "owner: 'IsaacSkevington',\n" + 
                                  "repo: 'RecipeBook',\n" +
                                  "path: 'recipes/' + '" + filename + "',\n" +
                                  "message: 'Added ' + '" + filename + "',\n" +
                                  "content: '"+ base64Encoded + "'\n" + 
                                   "});\n";
        executeScript.type = 'module';
        document.head.appendChild(executeScript);
        alert(executeScript.innerHTML);

        var bookText = "RECIPELIST = [\n";
        for(var i = 0; i < RECIPELIST.length; i++){
            bookText += "    \"" + RECIPELIST[i] + "\",\n";
        }
        bookText += "    \"" + name + "\",\n";
        bookText += "];"

        base64Encoded = btoa(bookText);

        var executeScript2 = document.createElement('script');
        var recipeBookName = USER.preferences["Default Recipe Book"];




        executeScript2.innerHTML = "import { Octokit } from 'https://cdn.skypack.dev/@octokit/rest';\n" +
                                    "const octokit = new Octokit({ auth: `" + auth + "` });\n" + 
                                  "const response = await octokit.request('GET /repos/{owner}/{repo}/contents/{path}', {\n" + 
                                  "owner: 'IsaacSkevington',\n" +
                                  "repo : 'RecipeBook',\n" +
                                  "path: 'RecipeBooks/' + '" + recipeBookName + ".js" + "',\n" +
                                  "});\n" +
                                  "octokit.request('PUT /repos/{owner}/{repo}/contents/{path}', {\n" + 
                                  "owner: 'IsaacSkevington',\n" + 
                                  "sha: response.data.sha,\n" +
                                  "repo: 'RecipeBook',\n" +
                                  "path: 'RecipeBooks/' + '" + recipeBookName + ".js" + "',\n" +
                                  "message: 'Added ' + '" + name + " to " + recipeBookName + "',\n" +
                                  "content: '"+ base64Encoded + "',\n" + 
                                   "});\n";
        executeScript2.type = 'module';
        document.head.appendChild(executeScript2);
        
        
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