class Step{
    constructor(number, description, ingredients, time){
        this.number = number;
        this.description = description;
        this.ingredients = ingredients;
        this.time = time;
    }


    static createIngredientsWindow(ingredients){
        let ingreds = document.createElement('Ingredients');
        let title = document.createElement('IngredientsTitle')
        title.innerHTML = "Ingredients";
        ingreds.appendChild(title);
        let list = document.createElement('ul');

        ingredients.forEach(ingredient => {
            var currentIngredWindow = document.createElement('li')
            currentIngredWindow.innerHTML = ingredient.toString()
            list.appendChild(currentIngredWindow);
        });
        ingreds.appendChild(list);
        return ingreds;
    }


    static ingredientListToString(list, sep){
        let out = "";
        list.forEach(item => {
            out += "-" + item.toString() + sep;
        });
        return out;
    }

    display(window, sound, end){
        this.sound = sound;
        let stepWindow = document.createElement('Step');
        this.id = IdManager.getID();
        stepWindow.id = this.id;

        let titleWindow = document.createElement('StepTitle');
        titleWindow.innerHTML = "Step " + this.number;

        let timeToCompleteWindow = document.createElement('StepTimeToComplete');
        timeToCompleteWindow.innerHTML = "(Time to complete: " + Timer.secsToTime(this.time) + ")";

        let descWindow = document.createElement('StepDescription');
        descWindow.innerHTML = this.description;


        stepWindow.appendChild(titleWindow);
        stepWindow.appendChild(timeToCompleteWindow);

        let subwindow = document.createElement('StepInfo');

        let stepSeparatorId;

        if(this.ingredients.length > 0){
            let ingredientsWindow = Step.createIngredientsWindow(this.ingredients);
            subwindow.appendChild(ingredientsWindow);
            let stepSeparator = document.createElement('StepSeparator');
            stepSeparatorId = IdManager.getID()
            stepSeparator.id = stepSeparatorId;
            subwindow.appendChild(stepSeparator);
        }
        else{
            descWindow.style.borderLeft = "0px";
        }
    
        subwindow.appendChild(descWindow);
        stepWindow.appendChild(subwindow);


        document.getElementById(window).appendChild(stepWindow);
        this.animate(stepSeparatorId);
        this.startbutton = new Button("Start step", window, "StartButton", ()=>(this.start(end)));
        this.startbutton.show();
    }


    animate(id){
        
        document.getElementById(id).style.height = "auto";
        var divHeight;
        var obj = document.getElementById(id);

        if(obj.offsetHeight) {
            divHeight=obj.offsetHeight;

        } else if(obj.style.pixelHeight) {
            divHeight=obj.style.pixelHeight;

        }
        document.getElementById(id).style.height = "0px";
        var containerHeight = document.getElementById(id).parentNode.offsetHeight;
        document.getElementById(id).style.height = divHeight + "px";
    }

    start(endFunction){
        this.startbutton.hide();
        this.endFunction = endFunction;
        this.timer = new Timer(this.time, ()=>(this.end()), "timer.mp3");
        this.timer.show(this.id, 9);
        this.timer.start();
    }


    delete(){
        var elem = document.getElementById(this.id);
        elem.parentNode.removeChild(elem);
    }

    end(){
        this.endFunction();
    }
}