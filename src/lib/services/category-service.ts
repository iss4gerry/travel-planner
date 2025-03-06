import { ApiError } from '@/utils/apiError';
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
		await this.getCategory(id);
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
			throw new ApiError(404, 'Category not found');
		}

		return result;
	}

	static async updateCategory(id: string, body: Category): Promise<Category> {
		await this.getCategory(id);
		const result = await prisma.category.update({
			where: {
				id: id,
			},
			data: body,
		});

		return result;
	}
}
