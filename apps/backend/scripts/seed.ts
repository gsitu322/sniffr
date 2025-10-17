import { PrismaClient } from "../generated/prisma";
import * as fs from "fs";
import * as path from "path";

const prisma = new PrismaClient();

interface DogData {
  id: number;
  name: string;
  sex: string;
  breed: string;
  age: number;
  bio: string;
  image: string;
}

async function seedDogs() {
  try {
    console.log("🌱 Starting database seeding...");

    // Check if database is already populated
    const existingDogsCount = await prisma.dog.count();

    if (existingDogsCount > 0) {
      console.log(
        `✅ Database already has ${existingDogsCount} dogs. Skipping seed.`
      );
      return;
    }

    // Read the JSON file
    const dataPath = path.join(__dirname, "../data/dogs.json");
    const rawData = fs.readFileSync(dataPath, "utf8");
    const dogsData: DogData[] = JSON.parse(rawData);

    console.log(`📖 Found ${dogsData.length} dogs in JSON file`);

    // Transform data to match Prisma schema
    const dogsToCreate = dogsData.map((dog) => ({
      name: dog.name,
      breed: dog.breed,
      age: dog.age,
      bio: dog.bio,
      images: [dog.image], // Convert single image to array
    }));

    // Insert dogs into database
    const result = await prisma.dog.createMany({
      data: dogsToCreate,
      skipDuplicates: true, // Skip if duplicates exist
    });

    console.log(
      `✅ Successfully seeded ${result.count} dogs into the database!`
    );
  } catch (error) {
    console.error("❌ Error seeding database:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// Run the seed function
seedDogs()
  .then(() => {
    console.log("🎉 Seeding completed successfully!");
    process.exit(0);
  })
  .catch((error) => {
    console.error("💥 Seeding failed:", error);
    process.exit(1);
  });
