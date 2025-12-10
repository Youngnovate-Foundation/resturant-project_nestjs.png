const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const foods = [
  {
    name: "Fried Rice and Chicken",
    imageUrl: "/fried_rice.jpg",
    packages: [
      { id: 1, name: "Small Pack", price: 100 },
      { id: 2, name: "Medium Pack", price: 150 },
      { id: 3, name: "Large Pack", price: 200 }
    ]
  },
  {
    name: "Banku with Tilapia",
    imageUrl: "/banku.jpg",
    packages: [
      { name: "Small Pack", price: 80 },
      { name: "Medium Pack", price: 120 },
      { name: "Large Pack", price: 160 }
    ]
  },
  {
    name: "Classic Beef Burger",
    imageUrl: "/burger.jpg",
    packages: [
      { name: "Single", price: 90 },
      { name: "Double", price: 130 },
      { name: "Triple", price: 170 }
    ]
  },
  {
    name: "Fried Yam and Fish",
    imageUrl: "/fried_yam.jpg",
    packages: [
      { name: "Small Pack", price: 70 },
      { name: "Medium Pack", price: 100 },
      { name: "Large Pack", price: 140 }
    ]
  },
  {
    name: "Jollof Rice and Chicken",
    imageUrl: "/jollof.jpg",
    packages: [
      { name: "Small Pack", price: 90 },
      { name: "Medium Pack", price: 130 },
      { name: "Large Pack", price: 170 }
    ]
  },
  {
    name: "Spicy Noodles with Egg",
    imageUrl: "/noodles.jpg",
    packages: [
      { name: "Small Pack", price: 60 },
      { name: "Medium Pack", price: 90 },
      { name: "Large Pack", price: 120 }
    ]
  },

  // ➕ NEW ITEMS ADDED
  {
    name: "Kenkey with Fried Fish",
    imageUrl: "/kenkey_f.jpg",
    packages: [
      { name: "Small Pack", price: 70 },
      { name: "Medium Pack", price: 100 },
      { name: "Large Pack", price: 140 }
    ]
  },
  {
    name: "Yam with Palaver Sauce",
    imageUrl: "/yam_ps.jpg",
    packages: [
      { name: "Small Pack", price: 80 },
      { name: "Medium Pack", price: 120 },
      { name: "Large Pack", price: 160 }
    ]
  },
  {
    name: "Waakye with Fish",
    imageUrl: "/waakye.jpg",
    packages: [
      { name: "Small Pack", price: 90 },
      { name: "Medium Pack", price: 130 },
      { name: "Large Pack", price: 170 }
    ]
  },
  {
    name: "Fufu with Light Soup",
    imageUrl: "/fufu_soup.jpg",
    packages: [
      { name: "Small Pack", price: 100 },
      { name: "Medium Pack", price: 140 },
      { name: "Large Pack", price: 180 }
    ]
  }
];

// DRINKS SECTION
export const drinks = [
  { name: "Coke", imageUrl: "/coke.jpg", price: 15 },
  { name: "Energy Drink", imageUrl: "/energy_drink.jpg", price: 20 },
  { name: "Fanta", imageUrl: "/fanta.jpg", price: 15 },
  { name: "Prime", imageUrl: "/energy_prime.jpeg", price: 25 },
  { name: "Pepsi", imageUrl: "/pepsi.jpg", price: 15 },
  { name: "Sprite", imageUrl: "/sprite.jpg", price: 15 },
  { name: "Water", imageUrl: "/water.jpg", price: 10 }
];

// OTHERS SECTION
export const others = [
  { name: "Yogurt", imageUrl: "/yogurt.jpeg", price: 18 },
  { name: "Tea", imageUrl: "/tea.jpg", price: 10 },
  { name: "Latte", imageUrl: "/latte.jpg", price: 20 },
  { name: "Smoothies", imageUrl: "/smoothies.jpg", price: 25 },
  { name: "Lemonade", imageUrl: "/lemonade.jpg", price: 15 },
  { name: "Meat Pie", imageUrl: "/meat_pie.jpg", price: 12 },
  { name: "Ice Cream", imageUrl: "/ice_cream.jpg", 
    packages: [
      { name: "Chocolate Flavor", price: 15 ,imageUrl: "/ice_cream_chocolate.jpg"},
      { name: "Vanilla Flavor", price: 15, imageUrl: "/ice_cream_vanilla.jpg" },
      { name: "Strawberry Flavor", price: 15, imageUrl: "/ice_cream_strawberry.jpg" }
    ]
   },
  { name: "Juices", imageUrl: "/juices.jpg",
    packages: [
      { name: "Mango Juice", price: 15 },
      { name: "Pineapple Juice", price: 15 },
      { name: "Orange Juice", price: 15 }
    ]
   },
  { name: "Hot Chocolate", imageUrl: "/hot-chocolate.jpg", price: 18 },
  { name: "Cookies", imageUrl: "/cookies.jpg", price: 10 },
  { name: "Cupcake", imageUrl: "/cupcake.jpg", price: 12 },
  { name: "Coffee", imageUrl: "/coffee.jpg", price: 15 },
  { name: "Chocolate Cake", imageUrl: "/chocolate_cake.jpg", price: 25 },
  { name: "Cheesecake", imageUrl: "/cheesecake.jpg", price: 30 },
];
async function main() {
  console.log("Seeding database...");

  // 🧹 Clear existing data first
  await prisma.order.deleteMany();
  await prisma.package.deleteMany();
  await prisma.food.deleteMany();

  for (const food of foods) {
    await prisma.food.create({
      data: {
        name: food.name,
        imageUrl: food.imageUrl,
        packages: {
          create: food.packages.map((pkg) => ({
            size: pkg.name,
            price: pkg.price,
          })),
        },
      },
    });
  }

  console.log("Seeding completed ✅");
}


main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    }
);
