var r = new Recipe(

    'I love Isaac',
    'how much I love you :)',
    [
        new Step(
            1,
            'Take one dash of adorableness',
            [
                new Ingredient(
                    'Adorableness',
                    '1',
                    'tbsp'),

            ],
            60),

        new Step(
            2,
            'Two glugs of sexiness',
            [
                new Ingredient(
                    'sexiness',
                    '300',
                    'ml'),

            ],
            60),

        new Step(
            3,
            '15 ounces of sheer intelligence',
            [
                new Ingredient(
                    'intelligence',
                    '15',
                    'ounces'),

            ],
            60),

        new Step(
            4,
            'And a whole lot of amazingness',
            [

            ],
            60),

    ],

    {},//Groups

    {}//Repeats
);
RECIPEBOOK.add(r);