setSubstitute(
    new Ingredient('Nutella', 1, 'tsp'),
    new Ingredient("Dark Chocolate", 20, 'g')
)

var r = new Recipe(

    'Chocolate Mug Cake',
    'A chocolate mug cake',
    [
        new Step(
            1,
            'Measure out and mix the dry ingredients in a mug',
            [
                new Ingredient(
                    'Plain Flour',
                    '1/4',
                    'Cup'),
                new Ingredient(
                    'Sugar',
                    '1/8',
                    'Cup'),
                new Ingredient(
                    'Cocoa Powder',
                    '1/4',
                    'Cup'),
                new Ingredient(
                    'Baking Powder',
                    '8/4',
                    'Teaspoon'),
            ],
            180),

        new Step(
            2,
            'Mix in the almond milk until no lumps remain',
            [
                new Ingredient(
                    'Almond Milk',
                    '3/8',
                    'Cup'),
            ],
            120),

        new Step(
            3,
            'Add the Nutella to the batter',
            [
                new Ingredient(
                    "Nutella",
                    1,
                    "tsp"
                )
            ],
            60),

        new Step(
            4,
            'Put the mug cake in the microwave for 3 minutes or until cooked',
            [

            ],
            180),

    ],

    {},//Groups

    {}//Repeats
);
RECIPEBOOK.add(r);