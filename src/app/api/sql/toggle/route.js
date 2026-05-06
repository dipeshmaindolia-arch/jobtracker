import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/db";

export async function POST() {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { clerkId: userId },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Get today's date (UTC start of day)
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Check existing
    const existing = await prisma.dailySql.findUnique({
      where: {
        userId_date: {
          userId: user.id,
          date: today,
        },
      },
    });

    if (existing) {
      const updated = await prisma.dailySql.update({
        where: { id: existing.id },
        data: { completed: !existing.completed },
      });
      return NextResponse.json(updated);
    } else {
      const created = await prisma.dailySql.create({
        data: {
          userId: user.id,
          date: today,
          completed: true,
        },
      });
      return NextResponse.json(created);
    }
  } catch (error) {
    console.error("SQL toggle error:", error);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
