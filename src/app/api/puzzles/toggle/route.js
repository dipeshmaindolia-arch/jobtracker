import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/db";

export async function POST(request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { puzzleId } = await request.json();
    if (!puzzleId) {
      return NextResponse.json({ error: "puzzleId required" }, { status: 400 });
    }

    // Find the DB user
    const user = await prisma.user.findUnique({
      where: { clerkId: userId },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found. Please sync first." }, { status: 404 });
    }

    // Check if progress record exists
    const existing = await prisma.puzzleProgress.findUnique({
      where: {
        userId_puzzleId: {
          userId: user.id,
          puzzleId: puzzleId,
        },
      },
    });

    if (existing) {
      // Toggle completion
      const updated = await prisma.puzzleProgress.update({
        where: { id: existing.id },
        data: { completed: !existing.completed },
      });
      return NextResponse.json(updated);
    } else {
      // Create new record as completed
      const created = await prisma.puzzleProgress.create({
        data: {
          userId: user.id,
          puzzleId: puzzleId,
          completed: true,
        },
      });
      return NextResponse.json(created);
    }
  } catch (error) {
    console.error("Toggle puzzle error:", error);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
