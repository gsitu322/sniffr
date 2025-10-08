import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const limit = parseInt(searchParams.get("limit") || "10");
  const offset = parseInt(searchParams.get("offset") || "0");

  // TODO: Replace with actual database query
  // For now, generate mock data
  const dogs = Array.from({ length: limit }, (_, i) => ({
    id: offset + i + 1,
    name: `Dog ${offset + i + 1}`,
    breed: "Mixed Breed",
    age: Math.floor(Math.random() * 10) + 1,
    image: `https://placedog.net/400/400?id=${offset + i + 20}`,
    bio: "Looking for a friend to play with!",
  }));

  return NextResponse.json(dogs);
}
