import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
 await prisma.todo.createMany({
 data: [
 { title: 'learn ts' },
 { title: 'wire prisma' },
 ],
 skipDuplicates: true,
 });
}
main().finally(async () => {
 await prisma.$disconnect();
});