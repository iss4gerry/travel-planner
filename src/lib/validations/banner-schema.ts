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

export type CreateBanner = z.infer<typeof createBannerSchema>;
