import { db } from "~/server/db";
import { faker } from "@faker-js/faker";

const CATEGORIES_COUNT = 100;

const main = async () => {
  try {
    const categories = new Array(CATEGORIES_COUNT).fill("_").map(() => ({
      name: faker.commerce.productAdjective().toLowerCase(),
    }));
    await db.category.deleteMany();
    const createCategories = db.category.createMany({
      data: categories.map((cat) => ({ ...cat })),
    });
    await db.$transaction([createCategories]);
  } catch (error) {
    throw error;
  }
};

main().catch((err) => {
  console.warn("Error While generating Seed: \n", err);
});
