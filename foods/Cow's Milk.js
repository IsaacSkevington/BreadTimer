var NAME = "Cow's Milk";

var f = new Food(
    new Ingredient(
        NAME,
        100,
        "g"
    ),
    [GLUTENFREE, NUTFREE],
    new NutritionInfo()    
)
FOODS[NAME] = f;
setListEqual(
    NAME,
    [
        "97ml",
        "100g"
    ]
)

setListSubstitute(
    NAME,
    [
        [NAME, f.ingredient.amount.toString() + f.ingredient.unit],
        ["Almond Milk", "100ml"]
    ]
)
