class Recipe{
    constructor(name, desc, steps, stepGroups, repeats){
        this.desc = desc;
        this.name = name;
        this.steps = steps;
        this.stepOrder = this.parseGroups(stepGroups, repeats)
        this.ingredients = this.sumingredients();
        this.timeToComplete = this.sumStepTimes();

    }

    parseGroups(groups, repeats){
        let out = [];
        for(var i = 0; i < this.steps.length; i++){
            var repeat = 1;
            if((i + 1) in repeats){
                repeat = repeats[i+1];
            }
            if((i + 1) in groups){
                for(var j = 0; j < repeat; j++){
                    for(var k = i + 1; k <= groups[i + 1]; k++){
                        out.push(k - 1);
                    }
                }
                i = groups[i + 1] - 1;
            }
            else{
                for(var j = 0; j < repeat; j++){
                    out.push(i);
                }
            }
        }
        return out;
    }

    sumingredients(){
        let out = [];
        let added = false;

        for(var i = 0; i<this.stepOrder.length; i++){
            for(var j = 0; j< this.steps[this.stepOrder[i]].ingredients.length; j++){
                added = false;
                for(var k = 0; k < out.length; k++){
                    if(this.steps[this.stepOrder[i]].ingredients[j].equals(out[k])){
                        out[k] = this.steps[this.stepOrder[i]].ingredients[j].add(out[k]);
                        added = true;
                        break;
                    }
                }
                if(!added){
                    out.push(this.steps[this.stepOrder[i]].ingredients[j]);
                }
            }
        }
        return out;
    }

    sumStepTimes(){
        let total = 0;
        for(var i = 0; i < this.stepOrder.length; i++){
            total += this.steps[this.stepOrder[i]].time;
        };
        return total;
    }


    display(parent, endSound){


        this.endSound = endSound;
        let recipeHomepage = document.createElement('Recipe');
        this.stepWindowId = IdManager.getID();
        recipeHomepage.id = this.stepWindowId;

        let titleWindow = document.createElement('RecipeTitle');
        titleWindow.innerHTML = this.name;


        let timeToCompleteWindow = document.createElement('StepTimeToComplete');
        timeToCompleteWindow.innerHTML = "(Time to complete: " + Timer.secsToTime(this.timeToComplete) + ")";
              


        let descWindow = document.createElement('RecipeDescription');
        descWindow.innerHTML = this.desc;

        let ingredientsWindow = Step.createIngredientsWindow(this.ingredients);
        recipeHomepage.appendChild(titleWindow);
        recipeHomepage.appendChild(timeToCompleteWindow)
        recipeHomepage.appendChild(descWindow);
        recipeHomepage.appendChild(ingredientsWindow);
        document.getElementById(parent).appendChild(recipeHomepage);

        this.startbutton = new Button("Start Recipe", parent, "StartButton", ()=>(this.start(parent, this.end)));
        this.startbutton.show();
    }


    start(parent, endFunction){
        this.currentStep = 0;
        this.startbutton.hide();
        this.nextStepButton = new Button("Next Step >", parent, "NextButton", ()=>(this.doStep(parent)));
        this.nextStepButton.show();
        this.doStep(parent);
    }

    doStep(parent){
        this.nextStepButton.hide();
        if(this.currentStep > 0){
            this.steps[this.stepOrder[this.currentStep - 1]].delete();
        }
        else{
            var elem = document.getElementById(this.stepWindowId);
            elem.parentNode.removeChild(elem);
        }
        this.steps[this.stepOrder[this.currentStep]].display(parent, this.endSound, ()=>(this.nextStep()));
    }

    nextStep(){
        this.currentStep++; 
        this.nextStepButton.show();
    }

    end(){

    }

}