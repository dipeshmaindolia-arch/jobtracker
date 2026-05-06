import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/db";

// GET all targets for all users
export async function GET() {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const users = await prisma.user.findMany({ orderBy: { createdAt: "asc" } });

    const targets = await prisma.target.findMany({
      orderBy: { deadline: "asc" },
      include: {
        user: { select: { id: true, clerkId: true, name: true } },
      },
    });

    // Auto-fail overdue targets
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    for (const target of targets) {
      if (target.status === "PENDING" && new Date(target.deadline) < today) {
        await prisma.target.update({
          where: { id: target.id },
          data: { status: "FAILED" },
        });
        target.status = "FAILED";
      }
    }

    return NextResponse.json({ targets, users, currentClerkId: userId });
  } catch (error) {
    console.error("Targets GET error:", error);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}

// POST create new target
export async function POST(request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({ where: { clerkId: userId } });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const { title, description, deadline } = await request.json();
    if (!title || !deadline) {
      return NextResponse.json({ error: "Title and deadline required" }, { status: 400 });
    }

    const target = await prisma.target.create({
      data: {
        userId: user.id,
        title,
        description: description || null,
        deadline: new Date(deadline),
      },
    });

    return NextResponse.json(target);
  } catch (error) {
    console.error("Targets POST error:", error);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
