var NAME = "Nutella";

var f = new Food(
    new Ingredient(
        NAME,
        100,
        "g"
    ),
    [GLUTENFREE],
    new NutritionInfo()    
)
FOODS[NAME] = f;
setListEqual(
    NAME,
    [
        "1tsp",
        "4.44g"

    ]
)

setListSubstitute(
    NAME,
    [
        [NAME, f.ingredient.amount.toString() + f.ingredient.unit]
    ]
)
