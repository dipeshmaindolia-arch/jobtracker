import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/db";

export async function GET() {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const [users, puzzles] = await Promise.all([
      prisma.user.findMany({
        orderBy: { createdAt: "asc" },
      }),
      prisma.puzzle.findMany({
        orderBy: { id: "asc" },
        include: {
          progress: {
            select: {
              userId: true,
              completed: true,
            },
          },
        },
      }),
    ]);

    // Transform puzzles to include completion status per user
    const puzzlesWithStatus = puzzles.map((puzzle) => ({
      id: puzzle.id,
      title: puzzle.title,
      category: puzzle.category,
      link: puzzle.link,
      completions: puzzle.progress
        .filter((p) => p.completed)
        .map((p) => p.userId),
    }));

    return NextResponse.json({
      puzzles: puzzlesWithStatus,
      users,
      currentClerkId: userId,
    });
  } catch (error) {
    console.error("Puzzles GET error:", error);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
