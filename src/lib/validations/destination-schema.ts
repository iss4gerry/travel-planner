import { z, string } from 'zod';

export const createDestinationSchema = z
	.object({
		imageUrl: string().min(5, 'Image url must be atleast 3 characters'),
		name: string().min(3, 'Name must be atleast 3 characters'),
		description: string().min(5, 'Description must be atleast 3 characters'),
		address: string().min(5, 'Address must be atleast 3 characters'),
		cost: string().min(2, 'Price must be atleast 3 characters'),
		categoryId: string().min(5, 'Invalid Category Id'),
	})
	.strict();

export type CreateDestination = z.infer<typeof createDestinationSchema>;
