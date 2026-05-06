import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/db";

export async function GET() {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const users = await prisma.user.findMany({
      orderBy: { createdAt: "asc" },
    });

    // Get last 30 days of SQL entries for all users
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    thirtyDaysAgo.setHours(0, 0, 0, 0);

    const sqlEntries = await prisma.dailySql.findMany({
      where: {
        date: { gte: thirtyDaysAgo },
      },
      orderBy: { date: "asc" },
    });

    // Group entries by user
    const entriesByUser = {};
    users.forEach((user) => {
      entriesByUser[user.id] = sqlEntries
        .filter((e) => e.userId === user.id && e.completed)
        .map((e) => e.date.toISOString().split("T")[0]);
    });

    return NextResponse.json({
      users,
      entriesByUser,
      currentClerkId: userId,
    });
  } catch (error) {
    console.error("SQL GET error:", error);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
