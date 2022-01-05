var NAME = "Fresh Coriander";

var f = new Food(
    new Ingredient(
        NAME,
        100,
        "g"
    ),
    [GLUTENFREE, NUTFREE, VEGAN],
    new NutritionInfo()    
)
FOODS[NAME] = f;
setListEqual(
    NAME,
    [
        "1tsp",
        "0.24g"

    ]
)

setListSubstitute(
    NAME,
    [
        [NAME, f.ingredient.amount.toString() + f.ingredient.unit]
    ]
)
