import bcrypt from "bcrypt";

import { prisma } from "../src/configs/database.js";

// create admin user
async function main(){
  const SALT = 10;
  const hashedPassword = bcrypt.hashSync("admin", SALT);

	// cria se já não existe -> se já existe, faz nada
  await prisma.user.upsert({
    where: { email: "admin@gmail.com" },
    update: {},
    create: {
      email: "admin@gmail.com",
      password: hashedPassword
    }
  });
}

main().catch(e => {
  console.log(e);
  process.exit(1);
}).finally(async () => {
  await prisma.$disconnect();
})