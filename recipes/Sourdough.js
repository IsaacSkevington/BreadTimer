let r = new Recipe(

    "Sourdough",
    "A crusty loaf made with just flour and water",
    [
        new Step(
            1,
            "Mix levain ingredients",
            [
                new Ingredient(
                    "White flour",
                    35,
                    "g"
                ),
                new Ingredient(
                    "Starter",
                    35,
                    "g"
                ),
                new Ingredient(
                    "Wholemeal flour",
                    35,
                    "g"
                ),
                new Ingredient(
                    "Water",
                    75,
                    "g"
                )
            ],
            60 * 2
        ),

        new Step(
            2,
            "Rest the levain in a warm area (70-80℉) for 4 hours",
            [],
            4 * 60 * 60
        ),

        new Step(
            3,
            "Mix together your bread flour and whole wheat flour. Add 580g of your water to the flour mixture.<br>" +
            "Mix just until your dough comes together",
            [
                new Ingredient(
                    "White flour",
                    810,
                    "g"
                ),

                new Ingredient(
                    "Wholemeal flour",
                    35,
                    "g"
                ),

                new Ingredient(
                    "Water",
                    580,
                    "g"
                )
            ],
            60 * 5
        ),

        new Step(
            4,
            "Cover the dough with plastic wrap and let it rest for 1 hour in a warm place",
            [],
            1 * 60 * 60
        ),

        new Step(
            5,
            "Mix your dough and levain together using a little of your separated water to help incorporate",
            [new Ingredient(
                "Water",
                20,
                "g"
            )],
            5*60
        ),

        new Step(
            6,
            "Rest for 20 minutes",
            [],
            20 * 60
        ),

        new Step(
            7,
            "Add your sea salt and the rest of your separated water and mix until incorporated",
            [
                new Ingredient(
                    "Water",
                    80,
                    "g"
                ),

                new Ingredient(
                    "Salt",
                    18,
                    "g"
                )
            ],
            5 * 60
        ),

        new Step(
            8,
            "Slap and fold for 2-4 minutes or until your dough is smooth and begins to catch some air",
            [],
            4 * 60
        ),
        
        new Step(
            9,
            "Rest 15 minutes in the same warm area you placed your starter",
            [],
            15 * 60
        ),

        new Step(
            10,
            "Perform a stretch and fold",
            [],
            5 * 60
        ),

        new Step(
            11,
            "Rest 30 minutes in the same warm area you placed your starter",
            [],
            30 * 60
        ),

        new Step(
            12,
            "Perform a stretch and fold",
            [],
            5 * 60
        ),

        new Step(
            13,
            "Let your dough rest for a remainder of 1.5 hours",
            [],
            1.5 * 60 * 60
        ),

        new Step(
            14,
            "Dump out and divide your dough into 2 even pieces. Preshape each piece into a light boule",
            [],
            5 * 60
        ),

        new Step(
            15,
            "Leave the boules to rest for 10 minutes",
            [],
            15 * 60
        ),

        new Step(
            16,
            "Shape your dough into 2 batards and place into bannetons dusted with rice flour",
            [new Ingredient(
                "Rice Flour",
                50,
                "g"                    
            )],
            5 * 60
        ),

        new Step(
            17,
            "Chill in the fridge overnight",
            [],
            9 * 60 * 60
        ),

        new Step(
            18,
            "Preheat a cast iron combo cooker in your oven from cold to 230 Degrees Celsius for 1 hour.",
            [],
            1 * 60 * 60
        ),

        new Step(
            19,
            "Carefully place a dusted loaf into the hot pan, score the top, place the larger lid on top, and bake for 20 minutes",
            [],
            20 * 60
        ),

        new Step(
            20,
            "Remove the top from the combo cooker. Bake for an additional 20-30 minutes, or until the loaf is deep brown",
            [],
            30 * 60
        ),

        new Step(
            21,
            "Remove and cool on a wire rack until room temperature",
            [],
            1 * 60
        )

    

        


    ],
    {9:10, 11:12, 19:21}, //Groups
    {9:3, 11:3, 19:2} //Repeats

);
RECIPEBOOK.add(r);

