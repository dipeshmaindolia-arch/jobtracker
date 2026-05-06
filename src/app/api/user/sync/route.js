import { NextResponse } from "next/server";
import { auth, currentUser } from "@clerk/nextjs/server";
import prisma from "@/lib/db";

export async function POST() {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    let user = await prisma.user.findUnique({
      where: { clerkId: userId },
    });

    if (!user) {
      const clerkUser = await currentUser();
      user = await prisma.user.create({
        data: {
          clerkId: userId,
          name: clerkUser?.firstName || clerkUser?.username || "User",
          imageUrl: clerkUser?.imageUrl || null,
        },
      });
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error("Sync error:", error);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
