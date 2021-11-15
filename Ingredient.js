class Ingredient{

    constructor(name, amount, unit){
        this.name = name;
        this.amount = amount;
        this.unit = unit;
    }

    equals(other){
        return this.name == other.name && this.unit == other.unit;
    }

    add(other){
        return new Ingredient(this.name, this.amount + other.amount, this.unit);
    }

    toString(){
        return this.amount + this.unit + " " + this.name;
    }

}