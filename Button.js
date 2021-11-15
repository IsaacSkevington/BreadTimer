class Button{

    constructor(text, parent, displayClass, endFunction){
        this.text = text;
        this.parent = parent;
        this.displayClass = displayClass;
        this.endFunction = endFunction;
        this.id = IdManager.getID();
    }


    randInt(min, max) {
        return Math.random() * (max - min) + min;
      }
      

    show(){
        let button = document.createElement('a');
        button.classList.add(this.displayClass);
        button.innerHTML = this.text;
        button.onclick = this.endFunction
        button.id = this.id;
        document.getElementById(this.parent).appendChild(button);
    }

    hide(){
        var elem = document.getElementById(this.id);
        elem.parentNode.removeChild(elem);
    }

}