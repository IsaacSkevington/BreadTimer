var NAME = "Rice Flour";

var f = new Food(
    new Ingredient(
        NAME,
        100,
        "g"
    ),
    [VEGAN, NUTFREE, GLUTENFREE],
    new NutritionInfo()    
)
FOODS[NAME] = f;
setListEqual(
    NAME,
    [
        "160g",
        "1 Cup",
    ]
)

setListSubstitute(
    NAME,
    [
        [NAME, f.ingredient.amount.toString() + f.ingredient.unit]
    ]
)
