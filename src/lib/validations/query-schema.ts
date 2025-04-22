import { z } from 'zod';

export const querySchema = z.object({
	page: z.coerce.number().min(1).default(1),
	limit: z.coerce.number().min(1).max(12).default(12),
	sort: z.enum(['createdAt', 'title', 'updatedAt']).default('createdAt'),
	order: z.enum(['asc', 'desc']).default('desc'),
});

export const parseQueryParams = (rawParams: any) => {
	const fallback = querySchema.parse({});

	const result = querySchema.safeParse(rawParams);

	if (result.success) {
		return result.data;
	}
	const partialFixed: Record<string, any> = { ...rawParams };

	for (const issue of result.error.issues) {
		const field = issue.path[0] as keyof typeof fallback;
		partialFixed[field] = fallback[field];
	}

	return querySchema.parse(partialFixed);
};
