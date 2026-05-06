import { auth } from "@clerk/nextjs/server";
import prisma from "./db";

export async function syncUser() {
  const { userId } = await auth();
  if (!userId) return null;

  let user = await prisma.user.findUnique({
    where: { clerkId: userId },
  });

  if (!user) {
    // Fetch user info from Clerk
    const { currentUser } = await import("@clerk/nextjs/server");
    const clerkUser = await currentUser();

    user = await prisma.user.create({
      data: {
        clerkId: userId,
        name: clerkUser?.firstName || clerkUser?.username || "User",
        imageUrl: clerkUser?.imageUrl || null,
      },
    });
  }

  return user;
}

export async function getAllUsers() {
  return prisma.user.findMany({
    orderBy: { createdAt: "asc" },
  });
}
