import mongoose from "mongoose";
import dotenv from "dotenv";
import Brand from "../models/Brand.js";
import Item from "../models/Item.js";

dotenv.config();

const slugify = (text) =>
  text.toString().toLowerCase().trim().replace(/\s+/g, "-");

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  });

// Items for each brand
const itemsData = [
  {
    brandName: "Golden Crown",
    items: [
      { name: "Golden Crown Tomato Crush", description: "Premium quality tomato crush", image: "golden-crown-tomato-crush.png" },
      { name: "Golden Crown Pineapple Slice", description: "Fresh pineapple slice", image: "golden-crown-pineapple-slice.png" },
      { name: "Golden Crown Tomato Puree", description: "Fresh tomato puree", image: "golden-crown-tomato-puree.png" },
      { name: "Golden Crown Mango Pulp", description: "Fresh mango pulp", image: "golden-crown-mango-pulp.png" },
      { name: "Golden Crown Sliced Mushroom", description: "Fresh sliced mushroom", image: "golden-crown-sliced-mushroom.png" }
    ]
  },
  {
    brandName: "Vedica",
    items: [
      { name: "Natural Mountain Water", description: "Natural Mountain Water", image: "vedica-natural-mountain-water.png" },
      { name: "Sparkling Spring Water", description: "Sparkling Spring Water", image: "vedica-sparkling-spring-water.png" }
    ]
  },
  {
    brandName: "Agnesi",
    items: [
      { name: "Penne Pasta", description: "Penne Pasta", image: "agnesi-penne-pasta.png" },
      { name: "Spaghetti Pasta", description: "Spaghetti Pasta", image: "agnesi-spaghetti-pasta.png" },
      { name: "Fusilli Pasta", description: "Fusilli Pasta", image: "agnesi-fusilli-pasta.png" },
      { name: "Farfalle Pasta", description: "Farfalle Pasta", image: "agnesi-farfalle-pasta.png" }
    ]
  },
  {
    brandName: "Lee kum kee",
    items: [
      { name: "Dark Soy Sauce", description: "Dark Soy Sauce", image: "Lee kum kee-darksoy-sauce.png" },
      { name: "Light Soy Sauce", description: "Light Soy Sauce", image: "Lee kum kee-lightsoy-sauce.png" },
      { name: "Oyster Sauce", description: "Oyster Sauce", image: "Lee kum kee-oyster-sauce.png" },
      { name: "Chilli Oil", description: "Chilli Oil", image: "Lee kum kee-chillioil.png" }
    ]
  },
  {
    brandName: "Mapro",
    items: [
      { name: "Strawberry Crush", description: "Strawberry Crush", image: "mapro-strawberry-crush.png" },
      { name: "Kokum Crush", description: "Kokum Crush", image: "mapro-kokum-crush.png" },
      { name: "Gingerale", description: "Gingerale", image: "mapro-gingerale.png" },
      { name: "Guava Crush", description: "Guava Crush", image: "mapro-guava-crush.png" }
    ]
  },
  {
    brandName: "Monin",
    items: [
      { name: "Mojito Mint Syrup", description: "Mojito Mint Syrup", image: "monin-mojito-mint.png" },
      { name: "Strawberry Syrup", description: "Strawberry Syrup", image: "monin-strawberry-syrup.png" },
      { name: "Vanilla Syrup", description: "Vanilla Syrup", image: "monin-vanilla-syrup.png" },
      { name: "Hazelnut Syrup", description: "Hazelnut Syrup", image: "monin-hazelnut-syrup.png" },
      { name: "Brown Butter Toffee Syrup", description: "Brown Butter Toffee Syrup", image: "monin-brown-butter-toffee-syrup.png" }
    ]
  },
  {
    brandName: "Zone",
    items: [
      { name: "Mojito Syrup", description: "Mojito Syrup", image: "zone-mojito-syrup.png" },
      { name: "Hazelnut Syrup", description: "Hazelnut Syrup", image: "zone-hazelnut-syrup.png" },
      { name: "Caramel Syrup", description: "Caramel Syrup", image: "zone-caramel-syrup.png" },
      { name: "Mango Syrup", description: "Mango Syrup", image: "zone-mango-syrup.png" }
    ]
  },
  {
    brandName: "Veeba",
    items: [
      { name: "Chilli Oregano Sauce", description: "Chilli Oregano Sauce", image: "veeba-chilli-oregano-sauce.png" },
      { name: "Vinaigrette Dressing", description: "Vinaigrette Dressing", image: "veeba-vinaigrette-dressing.png" },
      { name: "Sweet Chilli Sauce", description: "Sweet Chilli Sauce", image: "veeba-sweet-chilli-sauce.png" },
      { name: "Pizza Topping", description: "Pizza Topping", image: "veeba-pizza-topping.png" },
      { name: "Pasta Pizza Sauce", description: "Pasta Pizza Sauce", image: "veeba-pasta-pizza.png" },
      { name: "Peri Peri Sauce", description: "Peri Peri Sauce", image: "veeba-peri-peri-sauce.png" }
    ]
  },
  // Add other brands & items similarly
];

const seedItems = async () => {
  for (const brandItems of itemsData) {
    const brandId = slugify(brandItems.brandName);
    const brand = await Brand.findById(brandId);
    if (!brand) {
      console.log(`Brand "${brandItems.brandName}" not found. Skipping items.`);
      continue;
    }

    for (const item of brandItems.items) {
      const itemId = `${slugify(item.name)}-${brandId}`;
      const exists = await Item.findById(itemId);
      if (!exists) {
        await Item.create({
          _id: itemId,
          brandId,
          name: item.name,
          description: item.description,
          image: item.image
        });
        console.log(`Item "${item.name}" inserted!`);
      } else {
        console.log(`Item "${item.name}" already exists. Skipping.`);
      }
    }
  }
  mongoose.connection.close();
};

seedItems();

// node seed/seedItems.js
