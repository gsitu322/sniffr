import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const backendUrl = process.env.BACKEND_URL;

  try {
    // get the body of the response
    const body = await request.json();

    // foward to backend url
    const response = await fetch(`${backendUrl}/swipes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      console.error("[/api/swipes] backend error payload:", data);
      return NextResponse.json(data, { status: response.status });
    }

    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error("Error creating swipe:", error);
    return NextResponse.json(
      { error: "Failed to create swipe" },
      { status: 500 }
    );
  }
}
