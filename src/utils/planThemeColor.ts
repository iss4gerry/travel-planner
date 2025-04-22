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
		[TravelTheme.Beach]: 'badge-info',
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

export const getThemeHexColor = (theme: string): string => {
	const themeHexColors: Partial<Record<TravelTheme, string>> = {
		[TravelTheme.Cultural]: '#3B82F6',
		[TravelTheme.Adventure]: '#EC4899',
		[TravelTheme.Relaxation]: '#F59E0B',
		[TravelTheme.Romantic]: '#06B6D4',
		[TravelTheme.Business]: '#FBBF24',
		[TravelTheme.Family]: '#EF4444',
		[TravelTheme.Nature]: '#10B981',
		[TravelTheme.City]: '#737373',
		[TravelTheme.Beach]: '#22D3EE',
		[TravelTheme.Wellness]: '#34D399',
		[TravelTheme.Culinary]: '#2563EB',
		[TravelTheme.Solo]: '#8B5CF6',
		[TravelTheme.Luxury]: '#0EA5E9',
		[TravelTheme.RoadTrip]: '#F59E0B',
		[TravelTheme.Backpacking]: '#DC2626',
		[TravelTheme.Cruise]: '#A855F7',
		[TravelTheme.Festival]: '#16A34A',
	};

	const normalized = theme.toLowerCase();
	const matchedTheme = Object.values(TravelTheme).find(
		(value) => value === normalized
	);

	return themeHexColors[matchedTheme as TravelTheme] ?? '#9CA3AF';
};
