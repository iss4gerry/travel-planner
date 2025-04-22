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
		[TravelTheme.Shopping]: 'badge-success',
	};

	const normalized = theme.toLowerCase();
	const matchedTheme = Object.values(TravelTheme).find(
		(value) => value === normalized
	);

	return themeColors[matchedTheme as TravelTheme] ?? 'badge-neutral';
};

export const getThemeHexColor = (theme: string): string => {
	const themeHexColors: Partial<Record<TravelTheme, string>> = {
		[TravelTheme.Cultural]: '#643579',
		[TravelTheme.Adventure]: '#8A4D9E',
		[TravelTheme.Relaxation]: '#7D5994',
		[TravelTheme.Romantic]: '#A15FC7',
		[TravelTheme.Business]: '#4A2A5A',
		[TravelTheme.Family]: '#B279D9',
		[TravelTheme.Nature]: '#3D6F58',
		[TravelTheme.City]: '#5E5E5E',
		[TravelTheme.Beach]: '#5291B3',
		[TravelTheme.Wellness]: '#3D8F78',
		[TravelTheme.Culinary]: '#643579',
		[TravelTheme.Solo]: '#7446A3',
		[TravelTheme.Luxury]: '#9353B3',
		[TravelTheme.RoadTrip]: '#874F9E',
		[TravelTheme.Backpacking]: '#98417F',
		[TravelTheme.Cruise]: '#5B5FA7',
		[TravelTheme.Festival]: '#7A4D9C',
		[TravelTheme.Shopping]: '#8A4D9E',
	};

	const normalized = theme.toLowerCase();
	const matchedTheme = Object.values(TravelTheme).find(
		(value) => value === normalized
	);

	return themeHexColors[matchedTheme as TravelTheme] ?? '#9CA3AF';
};
