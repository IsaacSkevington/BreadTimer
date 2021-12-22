var NAME = "Sugar";

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
        "201g",
        "1 Cup"
    ]
)

setListSubstitute(
    NAME,
    [
        [NAME, f.ingredient.amount.toString() + f.ingredient.unit]
    ]
)
