import { prisma } from './index';

const categories = [
	{ name: 'nature', imageUrl: 'example' },
	{ name: 'adventure', imageUrl: 'example' },
	{ name: 'other', imageUrl: 'example' },
	{ name: 'culinary', imageUrl: 'example' },
];

async function seedDatabase() {
	try {
		await prisma.category.deleteMany();

		await prisma.category.createMany({
			data: categories,
			skipDuplicates: true,
		});
	} catch (error) {
		console.error('❌ Error seeding database:', error);
	} finally {
		await prisma.$disconnect();
	}
}

seedDatabase();
