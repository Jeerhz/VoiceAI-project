import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Extract agent configuration from request body
    const { name, description, voice_id, model_config } = body;

    // Validate required fields
    if (!name || !voice_id) {
      return NextResponse.json(
        { error: "Name and voice_id are required" },
        { status: 400 }
      );
    }

    // Call ElevenLabs API to deploy agent
    const response = await fetch("https://api.elevenlabs.io/v1/convai/agents", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "xi-api-key": process.env.ELEVENLABS_API_KEY || "",
      },
      body: JSON.stringify({
        name,
        description,
        voice_id,
        model_config,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json(
        { error: "Failed to deploy agent", details: errorData },
        { status: response.status }
      );
    }

    const agentData = await response.json();

    return NextResponse.json({
      success: true,
      agent: agentData,
    });
  } catch (error) {
    console.error("Error deploying agent:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
