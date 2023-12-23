const foodSamples = [
  {
    name: "Pizza Margherita",
    description: "Classic Italian pizza with tomato, mozzarella, and basil.",
    ingredients: "Dough, tomato sauce, mozzarella, basil",
    categoryId: "pizza-category-id",
    defaultPrice: 12.99,
    salesPrice: 10.99,
    requiredOptions: [
      { name: "Size", choice: "Medium", required: true },
      { name: "Toppings", choice: "Cheese", required: true },
    ],
    productImage: "pizza-margherita-image.jpg",
  },
  {
    name: "Chicken Alfredo Pasta",
    description: "Creamy Alfredo sauce with grilled chicken and pasta.",
    ingredients: "Pasta, chicken, Alfredo sauce",
    categoryId: "pasta-category-id",
    defaultPrice: 15.99,
    salesPrice: 13.99,
    requiredOptions: [
      { name: "Spiciness", choice: "Mild", required: false },
      { name: "Extra Toppings", choice: "Parmesan", required: false },
    ],
    productImage: "chicken-alfredo-pasta-image.jpg",
  },
  {
    name: "Sushi Roll Combo",
    description: "Assorted sushi rolls with soy sauce and wasabi.",
    ingredients: "Rice, seaweed, fish, vegetables",
    categoryId: "sushi-category-id",
    defaultPrice: 18.99,
    salesPrice: 16.99,
    requiredOptions: [
      { name: "Soy Sauce", choice: "Yes", required: true },
      { name: "Wasabi", choice: "Yes", required: true },
    ],
    productImage: "sushi-roll-combo-image.jpg",
  },
  {
    name: "Burger Deluxe",
    description: "Juicy beef patty with lettuce, tomato, and special sauce.",
    ingredients: "Beef patty, bun, lettuce, tomato, sauce",
    categoryId: "burger-category-id",
    defaultPrice: 14.99,
    salesPrice: 12.99,
    requiredOptions: [
      { name: "Cheese", choice: "Cheddar", required: true },
      { name: "Side", choice: "Fries", required: true },
    ],
    productImage: "burger-deluxe-image.jpg",
  },
  {
    name: "Chocolate Cake Slice",
    description: "Decadent chocolate cake slice with frosting.",
    ingredients: "Chocolate cake, frosting",
    categoryId: "dessert-category-id",
    defaultPrice: 8.99,
    salesPrice: 7.99,
    requiredOptions: [
      { name: "Add-On", choice: "Vanilla Ice Cream", required: false },
    ],
    productImage: "chocolate-cake-slice-image.jpg",
  },
];
