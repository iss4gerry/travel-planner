import { prisma } from '../db';
import { Category } from '@/types/category';

export class CategoryService {
	static async getAllCategory(): Promise<Category[]> {
		throw new Error('test');
		return await prisma.category.findMany();
	}
	static async createCategory(data: Category): Promise<Category> {
		return await prisma.category.create({
			data: data,
		});
	}
}
