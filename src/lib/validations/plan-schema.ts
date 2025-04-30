import { number, string, z } from 'zod';

export const createPlanSchema = z
	.object({
		name: string().min(3, 'Name must be atleast 3 characters'),
		startDate: string().min(3, 'Start date must be atleast 7 characters'),
		endDate: string().min(3, 'End date must be atleast 7 characters'),
		city: string().min(3, 'City must be atleast 3 characters'),
		travelCompanion: string().min(
			3,
			'Travel companion must be atleast 3 characters'
		),
		budget: number(),
		travelTheme: string().min(3, 'Travel theme must be atleast 3 characters'),
	})
	.strict();

export const updatePlanSchema = z
	.object({
		name: string().min(3, 'Name must be atleast 3 characters').optional(),
		city: string().min(3, 'City must be atleast 3 characters').optional(),
		travelCompanion: string()
			.min(3, 'Travel companion must be atleast 3 characters')
			.optional(),
		budget: number().optional(),
		travelTheme: string()
			.min(3, 'Travel theme must be atleast 3 characters')
			.optional(),
	})
	.strict();

export const addDestinationToPlan = z
	.object({
		planDetailId: string().min(5, 'Invalid UUID'),
		destinationId: string().min(5, 'Invalid UUID'),
		time: string().min(2, 'Invalid Time'),
	})
	.strict();

export const addBannerToPlan = z
	.object({
		planDetailId: string().min(5, 'Invalid UUID'),
		bannerId: string().min(5, 'Invalid UUID'),
		time: string().min(2, 'Invalid Time'),
	})
	.strict();

export type AddDestinationToPlan = z.infer<typeof addDestinationToPlan>;
export type AddBannerToPlan = z.infer<typeof addBannerToPlan>;
