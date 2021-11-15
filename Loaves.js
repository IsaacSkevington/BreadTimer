let LOAVES = [
    new Bread(

        "Sourdough",
        "A crusty loaf made with just flour and water",
        [
            new Step(
                1,
                "Make the levain",
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
                4
            ),

            new Step(
                2,
                "Leave the levain to rest for 4 hours",
                [],
                4 * 60 * 60
            ),

            new Step(
                3,
                "Make the dough",
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
                3*60
            )
        ]



    )



]