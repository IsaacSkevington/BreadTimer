class Bread{
    constructor(name, desc, steps){
        this.desc = desc;
        this.name = name;
        this.steps = steps;
        this.ingredients = this.sumingredients();
        this.timeToComplete = this.sumStepTimes();

    }

    sumingredients(){
        let out = [];
        let added = false;

        for(var i = 0; i<this.steps.length; i++){
            for(var j = 0; j< this.steps[i].ingredients.length; j++){
                added = false;
                for(var k = 0; k < out.length; k++){
                    if(this.steps[i].ingredients[j].equals(out[k])){
                        out[k] = this.steps[i].ingredients[j].add(out[k]);
                        added = true;
                        break;
                    }
                }
                if(!added){
                    out.push(this.steps[i].ingredients[j]);
                }
            }
        }
        return out;
    }

    sumStepTimes(){
        let total = 0;
        this.steps.forEach(step => {
            total += step.time;
        });
        return total;
    }


    display(parent, endSound){


        this.endSound = endSound;
        let stepWindow = document.createElement('Recipe');
        stepWindow.innerHTML = this.name + ". Time to complete: " + Timer.secsToTime(this.timeToComplete);
        this.stepWindowId = IdManager.getID();
        stepWindow.id = this.stepWindowId;


        let descWindow = document.createElement('RecipeDescription');
        descWindow.innerHTML = this.desc;

        let ingredientsWindow = document.createElement('Ingredients');
        ingredientsWindow.innerHTML = Step.ingredientListToString(this.ingredients, "\n");

        
        stepWindow.appendChild(descWindow);
        stepWindow.appendChild(ingredientsWindow);
        document.getElementById(parent).appendChild(stepWindow);

        this.startbutton = new Button("Start", parent, "StartButton", ()=>(this.start(parent, this.end)));
        this.startbutton.show();
    }


    start(parent, endFunction){
        this.currentStep = 0;
        this.startbutton.delete();
        this.nextStepButton = new Button("Next >", parent, "NextButton", ()=>(this.doStep(parent)));
        this.nextStepButton.show();
    }

    doStep(parent){
        if(this.currentStep > 0){
            this.steps[this.currentStep - 1].delete()
        }
        else{
            var elem = document.getElementById(this.stepWindowId);
            elem.parentNode.removeChild(elem);
        }
        this.steps[this.currentStep].display(parent, this.endSound, ()=>(this.nextStep()));
    }

    nextStep(){
        this.currentStep++; 
    }

    end(){

    }

}