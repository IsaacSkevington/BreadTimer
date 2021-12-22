var NAME = "Water";

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
        "100g",
        "100ml"
    ]
)

setListSubstitute(
    NAME,
    [
        [NAME, f.ingredient.amount.toString() + f.ingredient.unit]
    ]
)
