import { prisma } from "./../configs/database.js";
import { CreateUserData } from "./../services/userService.js";

export async function findById(id: number) {
  return prisma.user.findUnique({
    where: { id }
  });
}

export async function findUserByEmail(email: string) {
  return prisma.user.findFirst({
    where: { email }
  });
}

export async function insertUser(user: CreateUserData) {
  return prisma.user.create({
    data: user,
  });
}
