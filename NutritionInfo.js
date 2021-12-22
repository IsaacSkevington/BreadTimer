class NutritionInfo{

    constructor(calories = 0, protein = 0, sugars = 0, fat = 0){
        this.calories = calories;
        this.protein = protein;
        this.sugars = sugars;
        this.fat = fat;
    }

    add(other){
        return new NutritionInfo(
            this.calories + other.calories,
            this.protein + other.protein,
            this.sugars + other.sugars,
            this.fat + other.fat
        );
    }

    scale(factor){
        return new NutritionInfo(
            this.calories * factor,
            this.protein * factor,
            this.sugars * factor,
            this.fat * factor
        );
    }
}