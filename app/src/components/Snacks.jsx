
export const snacksData = {
    snacks: [
        {
          name: "Popcorn",
          image: require("../assets/snacks/popcorn.png"),
          sizes: ["Regular", "Large"],
          price: { Regular: 4, Large: 6 },
        },
        {
          name: "Chips",
          image: require("../assets/snacks/chips.png"),
          sizes: ["Regular", "Large"],
          price: { Regular: 3, Large: 5 },
        },
    ],
    drinks: [
      {
        name: "Pop",
        image: require("../assets/snacks/pop.png"),
        sizes: ["Regular", "Large"],
        price: { Regular: 3, Large: 4 },
      },
      {
        name: "Milkshake",
        image: require("../assets/snacks/milkshake.png"),
        sizes: ["Regular", "Large"],
        price: { Regular: 4, Large: 5 },
      },
    ],
    combos: [
      {
        name: "Popcorn & Drink",
        image: require("../assets/snacks/combo1.png"),
        sizes: ["Regular", "Large"],
        price: { "Regular": 7, "Large": 10 },
      },
      {
        name: "Chips & Drink",
        image: require("../assets/snacks/combo2.png"),
        sizes: ["Regular"],
        price: { "Regular": 6 },
      },
    ],
  };
  
