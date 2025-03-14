import { z } from 'zod';

export const createBannerSchema = z
	.object({
		title: z.string(),
		description: z.string(),
		startDate: z.string(),
		address: z.string(),
		cost: z.string(),
		categoryId: z.string(),
		targetUrl: z.string(),
		bannerDuration: z.string(),
	})
	.strict();

export const updateBannerSchema = z
	.object({
		title: z.string().optional(),
		description: z.string().optional(),
		startDate: z.string().optional(),
		address: z.string().optional(),
		cost: z.string().optional(),
		categoryId: z.string().optional(),
		targetUrl: z.string().optional(),
	})
	.strict();

export type CreateBanner = z.infer<typeof createBannerSchema>;
export type UpdateBanner = z.infer<typeof updateBannerSchema>;
