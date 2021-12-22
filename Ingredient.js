class Ingredient{

    constructor(name, amount, unit){
        this.name = name;
        this.amount = amount;
        this.unit = unit;
    }


    checkDietaryInformation(conditions){
        return FOODS[this.name].satisfiesDietaryRequirements(conditions);
    }

    getNutritionalInfo(){
        return FOODS[this.name].getScaledNutrition(this);
    }

    equals(other){
        return this.name == other.name && this.unit == other.unit;
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
    
    convertToFraction(){
        var gcd = function(a, b) {
            if (b < 0.0000001) return a;                
          
            return gcd(b, Math.floor(a % b));           
          };
          
          var len = this.amount.toString().length - 2;
          
          var denominator = Math.pow(10, len);
          var numerator = this.amount * denominator;
          
          var divisor = gcd(numerator, denominator);    
          
          numerator /= divisor;                         
          denominator /= divisor;                       
          
          return Math.floor(numerator) + '/' + Math.floor(denominator)
    }

    add(other){
        if(this.isFraction()){
            this.convertFromFraction();
        }
        if(other.isFraction()){
            other.convertFromFraction();
        }
        var newIngredient = new Ingredient(this.name, this.amount, this.unit);
        newIngredient.amount = this.amount + other.amount
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

    toString(){
        let amount = this.amount;
        if(this.isImproperFraction()){
            amount = this.improperFractionToMixedNumber(this.amount);
        }
        return amount + " " + this.unit + " " + this.name;
    }

}
