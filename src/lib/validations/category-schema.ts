import { z } from 'zod';

export const createCategorySchema = z.object({
	name: z.string().min(3, 'Name must be atleast 3 characters'),
	imageUrl: z.string().min(3, 'Image url must be atleast 3 characters'),
});

export const updateCategorySchema = z.object({
	name: z.string().min(3, 'Name must be atleast 3 characters').optional(),
	imageUrl: z
		.string()
		.min(3, 'Image url must be atleast 3 characters')
		.optional(),
});

export type createCategoryInput = z.infer<typeof createCategorySchema>;
