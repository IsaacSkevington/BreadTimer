class Ingredient{

    constructor(name, amount, unit){
        this.name = name;
        this.amount = amount;
        this.unit = unit;
    }

    equals(other){
        return this.name == other.name && this.unit == other.unit;
    }

    isFraction(string){
        for(var i = 0; i < string.length; i++){
            if(string[i] == '/'){
                return true;
            }
        }
        return false;
    }

    isImproperFraction(string){
        if(this.isFraction(string)){
            let number = this.convertFromFraction(string);
            return number >= 1;
        }
        return false;
    }

    improperFractionToMixedNumber(string){
        let numerator;
        let denominator;
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

    convertFromFraction(string){
        for(var i = 0; i < string.length; i++){
            if(string[i] == '/'){
                return parseFloat(string.substring(0, i)) / parseFloat(string.substring(i+1));
            }
        }
        return 0;
    }
    
    convertToFraction(decimal){
        var gcd = function(a, b) {
            if (b < 0.0000001) return a;                
          
            return gcd(b, Math.floor(a % b));           
          };
          
          var len = decimal.toString().length - 2;
          
          var denominator = Math.pow(10, len);
          var numerator = decimal * denominator;
          
          var divisor = gcd(numerator, denominator);    
          
          numerator /= divisor;                         
          denominator /= divisor;                       
          
          return Math.floor(numerator) + '/' + Math.floor(denominator)
    }

    add(other){
        let thisAmount = parseFloat(this.amount);
        let otherAmount = parseFloat(other.amount);
        if(this.isFraction(this.amount)){
            thisAmount = this.convertFromFraction(this.amount);
        }
        if(this.isFraction(other.amount)){
            otherAmount = this.convertFromFraction(other.amount);
        }
        if(this.isFraction(this.amount) && this.isFraction(other.amount)){
            return new Ingredient(this.name, convertToFraction(thisAmount + otherAmount), this.unit);
        }
        else{
            return new Ingredient(this.name, thisAmount + otherAmount, this.unit);
        }
        
    }

    toString(){
        let amount = this.amount;
        if(this.isImproperFraction(this.amount)){
            amount = this.improperFractionToMixedNumber(this.amount);
        }
        return amount + " " + this.unit + " " + this.name;
    }

}
