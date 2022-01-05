
class Ingredient{

    constructor(description, amount, unit){
        this.parseDescription(description);
        this.amount = amount;
        if(unit == ""){
            this.unit = "pcs";
        }
        else{
            this.unit = unit;
        }
        
    }

    parseDescription(description){
        var separated = false;
        for(var i = 0; i < description.length; i++){
            if(description[i] == ','){
                this.name = description.substring(0, i);
                this.prep = description.substring(i+1);
                separated = true;
                break;
            }
        }
        if(!separated){
            this.name = description;
        }
        this.name = this.name.replace(/\b\w/g, l => l.toUpperCase())
    }


    checkDietaryInformation(conditions){
        return FOODS[this.name].satisfiesDietaryRequirements(conditions);
    }

    getNutritionalInfo(){
        return FOODS[this.name].getScaledNutrition(this);
    }

    equals(other){
        return this.name == other.name;
    }

    
    gcd(a, b) {
        if (b < 0.0000001){
            return a;                
        }
    
        return this.gcd(b, Math.floor(a % b));           
    }

  

    lcm(list) {
        var n = 1;
        for(var i = 0; i < list.length; i++){
            n = list[i] * n / this.gcd(list[i], n);
        }
        
        return n;
}

    simplifiedFraction(numerator, denominator){

        if(denominator % numerator == 0){
            var greatestDivisor = gcd(numerator, denominator)
            if(denominator/greatestDivisor == 1){
                return numerator;
            }
            return numerator/greatestDivisor + "/" + denominator/greatestDivisor;
        }
        else{
            if(denominator == 1){
                return numerator;
            }
            return numerator + "/" + denominator
        }

    }

    isFraction(){
        for(var i = 0; i < this.amount.toString().length; i++){
            if(this.amount.toString()[i] == '/'){
                return true;
            }
        }
        return false;
    }

    isImproperFraction(){
        if(this.isFraction()){
            let newIngredient = new Ingredient(this.name, this.amount, this.unit);
            newIngredient.convertFromFraction();
            return newIngredient.amount >= 1;
        }
        return false;
    }

    improperFractionToMixedNumber(string){
        let numerator;
        let denominator;
        string = string.toString();
        for(var i = 0; i < string.length; i++){
            if(string[i] == '/'){
                numerator = parseFloat(string.substring(0, i));
                denominator = parseFloat(string.substring(i+1));
                break;
            }
        }
        let subtractTimes = Math.floor(numerator/denominator);
        for(var i = 0; i < subtractTimes; i++){
            numerator -= denominator;
        }
        if(numerator == 0){
            return subtractTimes.toString();
        }
        else{
            return subtractTimes.toString() + " " + numerator.toString() + "/" +  denominator.toString();
        }
        
    }

    convertFromFraction(){
        for(var i = 0; i < this.amount.toString().length; i++){
            if(this.amount.toString()[i] == '/'){
                this.amount = parseFloat(this.amount.toString().substring(0, i)) / parseFloat(this.amount.toString().substring(i+1))
                return true;
            }
        }
        return false;
    }
    
    convertToFraction(denominators = [2,3,4,8,16]){
        
        let decimal = this.amount;        
        let lcmDenominators = this.lcm(denominators);
        let numerator = decimal * lcmDenominators
        let currentError = 1000000;
        let closestDenominator = 0;
        let closestNumerator = 0;

        
        for(var i = 0; i < denominators.length; i++){
            var divisor = lcmDenominators/denominators[i];
            var currentNumerator = numerator/divisor;
            currentNumerator = Math.round(currentNumerator);
            var resultingDecimal = currentNumerator/denominators[i]
            var error = Math.abs(decimal - resultingDecimal);
            if(error < currentError){
                currentError = error;
                closestDenominator = denominators[i];
                closestNumerator = currentNumerator;
            }
        }
        this.amount = this.simplifiedFraction(closestNumerator, closestDenominator);
    }

    add(other){
        if(this.isFraction()){
            this.convertFromFraction();
        }
        if(other.isFraction()){
            other.convertFromFraction();
        }
        let prepAddition;
        if(this.prep == other.prep){
            prepAddition = ", " + this.prep;
        }
        else{
            if(this.prep == null && other.prep == null){
                prepAddition = "";
            }
            else if(this.prep == null){
                prepAddition = ", " + other.amount + " " + other.unitToString() + " " + other.prep;
            }
            else if(other.prep == null){
                prepAddition = ", " + this.amount + " " + this.unitToString() + " " + this.prep;
            }
            else{
                prepAddition = ", " + this.amount + " " + this.unitToString() + " " + this.prep + "; " + other.amount + " " + other.unitToString() + " " + other.prep;
            }
        }
        var newIngredient = new Ingredient(this.name + prepAddition, this.amount, this.unit);
        newIngredient.amount = parseFloat(this.amount) + parseFloat(other.amount);
        if(this.isFraction() && other.isFraction()){

            newIngredient.convertToFraction();

        }
        return newIngredient;
        
    }

    scale(factor){
        if(this.isFraction()){
            this.convertFromFraction();
            this.amount *= factor
            this.convertToFraction()
        }
        else{
            this.amount *= factor;
        }

    }

    unitToString(){
        if(this.unit == "pcs"){
            return "";
        }
        else{
            return this.unit
        }
    }

    toString(){
        let amount = this.amount;
        if(this.isImproperFraction()){
            amount = this.improperFractionToMixedNumber(this.amount);
        }

        let displayUnit;

        if(this.prep == null){
            return amount + " " + this.unitToString() + " " + this.name;
        }
        else{
            return amount + " " + this.unitToString() + " " + this.name + ", " + this.prep;
        }
        
    }

}
