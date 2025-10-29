import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  // Use environment variable for backend URL
  const backendUrl = process.env.BACKEND_URL;

  try {
    const userId = request.nextUrl.searchParams.get("userId");
    const response = await fetch(`${backendUrl}/threads?userId=${userId}`);
    const data = await response.json();

    console.log('retrieving threads from backend');
    console.log(data);

    return NextResponse.json(data);

  } catch (error) {
    console.error("Error fetching dogs:", error);
    return NextResponse.json(
      { error: "Failed to fetch dogs" },
      { status: 500 }
    );
  }
}
