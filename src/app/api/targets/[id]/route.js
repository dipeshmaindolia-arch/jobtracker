import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/db";

// PATCH update target status
export async function PATCH(request, { params }) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({ where: { clerkId: userId } });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const { id } = await params;
    const { status } = await request.json();

    // Only allow updating own targets
    const target = await prisma.target.findUnique({ where: { id } });
    if (!target) {
      return NextResponse.json({ error: "Target not found" }, { status: 404 });
    }
    if (target.userId !== user.id) {
      return NextResponse.json({ error: "Can only update your own targets" }, { status: 403 });
    }

    const updated = await prisma.target.update({
      where: { id },
      data: { status },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("Target PATCH error:", error);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}

// DELETE a target
export async function DELETE(request, { params }) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({ where: { clerkId: userId } });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const { id } = await params;
    const target = await prisma.target.findUnique({ where: { id } });
    if (!target || target.userId !== user.id) {
      return NextResponse.json({ error: "Not found or not yours" }, { status: 404 });
    }

    await prisma.target.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Target DELETE error:", error);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
