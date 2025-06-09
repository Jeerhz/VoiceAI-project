import { type NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import type { Database } from "@/lib/database.types";

type PollsterInsert = Database["public"]["Tables"]["pollsters"]["Insert"];

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("user_id");

    if (!userId) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }

    const supabase = await createClient();
    const { data: pollsters, error } = await supabase
      .from("pollsters")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching pollsters:", error);
      return NextResponse.json(
        { error: "Failed to fetch pollsters" },
        { status: 500 }
      );
    }

    return NextResponse.json({ pollsters });
  } catch (error) {
    console.error("Unexpected error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, objective, salutation, final_prompt, user_id } = body;

    if (!name || !user_id) {
      return NextResponse.json(
        { error: "Name and user_id are required" },
        { status: 400 }
      );
    }

    const pollsterData: PollsterInsert = {
      name,
      objective,
      salutation,
      final_prompt,
      user_id,
      question_ids: [],
      answer_to_objection_ids: [],
    };

    const supabase = await createClient();
    const { data: pollster, error } = await supabase
      .from("pollsters")
      .insert(pollsterData)
      .select()
      .single();

    if (error) {
      console.error("Error creating pollster:", error);
      return NextResponse.json(
        { error: "Failed to create pollster" },
        { status: 500 }
      );
    }

    return NextResponse.json({ pollster }, { status: 201 });
  } catch (error) {
    console.error("Unexpected error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
