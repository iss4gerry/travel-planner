import { z, string } from 'zod';

export const createDestinationSchema = z
	.object({
		imageUrl: string().min(5, 'Image url must be atleast 3 characters'),
		name: string().min(3, 'Name must be atleast 3 characters'),
		description: string().min(5, 'Description must be atleast 3 characters'),
		address: string().min(5, 'Address must be atleast 3 characters'),
		cost: string().min(2, 'Price must be atleast 3 characters'),
		categoryId: string().min(5, 'Invalid Category Id'),
		city: string().min(1, 'City has to be filled'),
	})
	.strict();

export const updateDestinationSchema = z
	.object({
		imageUrl: string()
			.min(5, 'Image url must be atleast 3 characters')
			.optional(),
		name: string().min(3, 'Name must be atleast 3 characters').optional(),
		description: string()
			.min(5, 'Description must be atleast 3 characters')
			.optional(),
		address: string().min(5, 'Address must be atleast 3 characters').optional(),
		cost: string().min(2, 'Price must be atleast 3 characters').optional(),
		categoryId: string().min(5, 'Invalid Category Id').optional(),
		city: string().min(2, 'Invalid city').optional(),
	})
	.strict();

export type CreateDestination = z.infer<typeof createDestinationSchema>;
export type UpdateDestination = z.infer<typeof updateDestinationSchema>;
