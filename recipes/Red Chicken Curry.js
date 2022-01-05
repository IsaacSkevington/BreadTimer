var r = new Recipe(

    'Red Chicken Curry',
    'The chicken is cooked with a curry paste using red chillies.',
    [
        new Step(
            1,
            'To make the curry paste, place all the ingredients in a food processor or blender and process until smooth.',
            [
                new Ingredient(
                    'dried red chillies, seeded and chopped',
                    '2',
                    ''),
                new Ingredient(
                    'ginger root, peeled and sliced',
                    '2.5',
                    'cm'),
                new Ingredient(
                    'lemongrass, chopped',
                    '3',
                    'stalks'),
                new Ingredient(
                    'garlic, peeled',
                    '1',
                    'cloves'),
                new Ingredient(
                    'shrimp paste',
                    '2',
                    'tsp'),
                new Ingredient(
                    'kaffir lime leaves, chopped',
                    '1',
                    ''),
                new Ingredient(
                    'ground coriander',
                    '1',
                    'tsp'),
                new Ingredient(
                    'ground cumin',
                    '3/4',
                    'tsp'),
                new Ingredient(
                    'fresh coriander, chopped',
                    '1',
                    'tbsp'),
                new Ingredient(
                    'salt',
                    '1',
                    'tsp'),
                new Ingredient(
                    'black pepper',
                    '1',
                    'tsp'),

            ],
            900),

        new Step(
            2,
            'Heat the oil in a large, heavy-based pan or wok. Add the garlic and cook for 1 minute or until it turns golden.',
            [
                new Ingredient(
                    'vegetable oil',
                    '4',
                    'tbsp'),
                new Ingredient(
                    'garlic, crushed',
                    '2',
                    'cloves'),

            ],
            300),

        new Step(
            3,
            'Stir in the curry paste and cook for 10-15 seconds.',
            [

            ],
            60),

        new Step(
            4,
            'Gradually add the coconut milk, stirring constantly (don\'t worry if the mixture starts to look curdled at this stage).',
            [
                new Ingredient(
                    'coconut milk',
                    '400',
                    'ml'),

            ],
            300),

        new Step(
            5,
            'Add the chicken pieces and turn in the sauce mixture to coat. Cook gently for about 3-5 minutes or until almost tender.',
            [
                new Ingredient(
                    'chicken breasts, skinned and cut into bite-sized pieces',
                    '6',
                    ''),

            ],
            300),

        new Step(
            6,
            'Stir in the chicken stock and fish sauce, mixing well, then cook for a further 2 minutes.',
            [
                new Ingredient(
                    'chicken stock',
                    '125',
                    'ml'),
                new Ingredient(
                    'fish sauce',
                    '2',
                    'tbsp'),

            ],
            180),

        new Step(
            7,
            'Transfer to a warmed serving dish and garnish with lime leaves, sliced red chillies and chopped coriander. Serve with rice or noodles.',
            [
                new Ingredient(
                    'kaffir lime leaves',
                    '2',
                    ''),
                new Ingredient(
                    'red chillies, sliced',
                    '1',
                    ''),
                new Ingredient(
                    'fresh coriander, chopped',
                    '10',
                    'g'),

            ],
            180),

    ],

    {},//Groups

    {}//Repeats
);
RECIPEBOOK.add(r);