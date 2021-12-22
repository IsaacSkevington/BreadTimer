var NAME = "Cocoa Powder";

var f = new Food(
    new Ingredient(
        NAME,
        100,
        "g"
    ),
    [VEGAN, GLUTENFREE, NUTFREE],
    new NutritionInfo()    
)
FOODS[NAME] = f;
setListEqual(
    NAME,
    [
        "1tsp",
        "1.8g"
    ]
)

setListSubstitute(
    NAME,
    [
        [NAME, f.ingredient.amount.toString() + f.ingredient.unit]
    ]
)
