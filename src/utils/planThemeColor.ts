import { TravelTheme } from '@/types/plan';

export const getThemeColor = (theme: string): string => {
	const themeColors: Partial<Record<TravelTheme, string>> = {
		[TravelTheme.Cultural]: 'badge-primary',
		[TravelTheme.Adventure]: 'badge-secondary',
		[TravelTheme.Relaxation]: 'badge-accent',
		[TravelTheme.Romantic]: 'badge-info',
		[TravelTheme.Business]: 'badge-warning',
		[TravelTheme.Family]: 'badge-error',
		[TravelTheme.Nature]: 'badge-success',
		[TravelTheme.City]: 'badge-neutral',
		[TravelTheme.Beach]: 'badge-ghost',
		[TravelTheme.Wellness]: 'badge-success',
		[TravelTheme.Culinary]: 'badge-primary',
		[TravelTheme.Solo]: 'badge-secondary',
		[TravelTheme.Luxury]: 'badge-info',
		[TravelTheme.RoadTrip]: 'badge-warning',
		[TravelTheme.Backpacking]: 'badge-error',
		[TravelTheme.Cruise]: 'badge-accent',
		[TravelTheme.Festival]: 'badge-success',
	};

	const normalized = theme.toLowerCase();
	const matchedTheme = Object.values(TravelTheme).find(
		(value) => value === normalized
	);

	return themeColors[matchedTheme as TravelTheme] ?? 'badge-neutral';
};
