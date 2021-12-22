var NAME = "Sourdough Starter";

var f = new Food(
    new Ingredient(
        NAME,
        100,
        "g"
    ),
    [VEGAN, NUTFREE],
    new NutritionInfo()    
)
FOODS[NAME] = f;
setListEqual(
    NAME,
    [
        "100g"
    ]
)

setListSubstitute(
    NAME,
    [
        [NAME, f.ingredient.amount.toString() + f.ingredient.unit]
    ]
)
