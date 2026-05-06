import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/db";

export async function GET() {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const [users, puzzleProgresses, allSql] = await Promise.all([
      prisma.user.findMany({ orderBy: { createdAt: "asc" } }),
      prisma.puzzleProgress.findMany({ where: { completed: true } }),
      prisma.dailySql.findMany({ where: { completed: true }, orderBy: { date: "desc" } })
    ]);

    const stats = [];

    for (const user of users) {
      // Count completed puzzles
      const puzzleCount = puzzleProgresses.filter(p => p.userId === user.id).length;

      // Get today's SQL status
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const userSql = allSql.filter(s => s.userId === user.id);
      const todayDone = userSql.some(s => new Date(s.date).getTime() === today.getTime());

      // Calculate streak
      let streak = 0;
      let checkDate = new Date();
      checkDate.setHours(0, 0, 0, 0);

      // Check if today is done; if not, start from yesterday
      if (!todayDone) {
        checkDate.setDate(checkDate.getDate() - 1);
      }

      while (true) {
        const isDone = userSql.some(s => new Date(s.date).getTime() === checkDate.getTime());
        
        if (isDone) {
          streak++;
          checkDate.setDate(checkDate.getDate() - 1);
        } else {
          break;
        }

        // Safety limit
        if (streak > 365) break;
      }

      stats.push({
        userId: user.id,
        clerkId: user.clerkId,
        name: user.name,
        imageUrl: user.imageUrl,
        puzzleCount,
        todayDone,
        streak,
      });
    }

    return NextResponse.json({
      stats,
      currentClerkId: userId,
    });
  } catch (error) {
    console.error("Stats error:", error);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
