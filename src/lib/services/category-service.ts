import { prisma } from '../db';
import { Category } from '@/types/category';

export class CategoryService {
	static async getAllCategory(): Promise<Category[]> {
		return await prisma.category.findMany();
	}
	static async createCategory(data: Category): Promise<Category> {
		return await prisma.category.create({
			data: data,
		});
	}
	static async deleteCategory(id: string): Promise<Category> {
		return await prisma.category.delete({
			where: {
				id: id,
			},
		});
	}

	static async getCategory(id: string): Promise<Category> {
		const result = await prisma.category.findUnique({
			where: {
				id: id,
			},
		});

		if (!result) {
			throw new Error('Category not found');
		}

		return result;
	}
}
