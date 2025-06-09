import { type NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = await createClient();
    const { data: pollster, error } = await supabase
      .from("pollsters")
      .select("*")
      .eq("id", params.id)
      .single();

    if (error) {
      console.error("Error fetching pollster:", error);
      return NextResponse.json(
        { error: "Failed to fetch pollster" },
        { status: 500 }
      );
    }

    if (!pollster) {
      return NextResponse.json(
        { error: "Pollster not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ pollster });
  } catch (error) {
    console.error("Unexpected error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const { name, objective, salutation, final_prompt } = body;

    const supabase = await createClient();
    const { data: pollster, error } = await supabase
      .from("pollsters")
      .update({
        name,
        objective,
        salutation,
        final_prompt,
        updated_at: new Date().toISOString(),
      })
      .eq("id", params.id)
      .select()
      .single();

    if (error) {
      console.error("Error updating pollster:", error);
      return NextResponse.json(
        { error: "Failed to update pollster" },
        { status: 500 }
      );
    }

    return NextResponse.json({ pollster });
  } catch (error) {
    console.error("Unexpected error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = await createClient();
    const { error } = await supabase
      .from("pollsters")
      .delete()
      .eq("id", params.id);

    if (error) {
      console.error("Error deleting pollster:", error);
      return NextResponse.json(
        { error: "Failed to delete pollster" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Unexpected error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
