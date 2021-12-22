
///NAME GOES HERE 
var NAME = "Plain Flour";


///DEFINITION OF THE FOOD
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

///SETTING EQUAL UNITS
setListEqual(
    NAME,
    [
        "120g",
        "1 Cup",
    ]
)


///SETTING DIETARY SUBSTITUTES
setListSubstitute(
    NAME,
    [
        [NAME, f.ingredient.amount.toString() + f.ingredient.unit],
        ["Rice Flour", "100g"]

    ]
)

