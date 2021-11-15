class Step{
    constructor(number, description, ingredients, time){
        this.number = number;
        this.description = description;
        this.ingredients = ingredients;
        this.time = time;
    }



    static ingredientListToString(list, sep){
        let out = "";
        list.forEach(item => {
            out += item.toString() + sep;
        });
        return out;
    }

    display(window, sound, end){
        this.sound = sound;
        let stepWindow = document.createElement('Step');
        stepWindow.innerHTML = "Step " + this.number + ". Time to complete: " + Timer.secsToTime(this.time);
        this.id = IdManager.getID();
        stepWindow.id = this.id;

        let descWindow = document.createElement('StepDescription');
        descWindow.innerHTML = this.description;

        let ingredientsWindow = document.createElement('Ingredients');
        ingredientsWindow.innerHTML = Step.ingredientListToString(this.ingredients, "\n");

        
        stepWindow.appendChild(descWindow);
        stepWindow.appendChild(ingredientsWindow);

        document.getElementById(window).appendChild(stepWindow);
        this.startbutton = new Button("Start", window, "StartButton", ()=>(this.start(window, end)));
        this.startbutton.show();
    }


    start(display, endFunction){
        this.startbutton.delete();
        this.endFunction = endFunction;
        let timerWindow = document.createElement('Timer');
        document.getElementById(display).appendChild(timerWindow)
        let timer = new Timer(this.time, ()=>(this.end()));
        timer.show(display, 9);
        timer.start();
    }


    delete(){
        var elem = document.getElementById(this.id);
        elem.parentNode.removeChild(elem);
    }

    end(){
        let audio = new Audio("timer.mp3");
        audio.play();
        this.endFunction();
    }
}