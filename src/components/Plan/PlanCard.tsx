import { PlanResponse, TravelTheme } from '@/types/plan';
import { CalendarIcon, MapPinIcon, UsersIcon, WalletIcon } from 'lucide-react';
import { format } from 'date-fns';

export default function PlanCard({ plan }: { plan: PlanResponse }) {
	const getThemesArray = (themeString: string): string[] => {
		return themeString.split('/').map((theme) => theme.trim());
	};

	const getThemeColor = (theme: string): string => {
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
			[TravelTheme.Foodie]: 'badge-primary',
			[TravelTheme.Solo]: 'badge-secondary',
			[TravelTheme.Luxury]: 'badge-info',
			[TravelTheme.RoadTrip]: 'badge-warning',
			[TravelTheme.Backpacking]: 'badge-error',
			[TravelTheme.Cruise]: 'badge-accent',
			[TravelTheme.Festival]: 'badge-success',
			[TravelTheme.Pilgrimage]: 'badge-ghost',
		};

		const normalized = theme.toLowerCase();
		const matchedTheme = Object.values(TravelTheme).find(
			(value) => value === normalized
		);

		return themeColors[matchedTheme as TravelTheme] ?? 'badge-neutral';
	};

	const startDate = new Date(plan.startDate);
	const endDate = new Date(plan.endDate);
	const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
	const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

	return (
		<div
			key={plan.id}
			className="card bg-base-100 shadow-xl hover:cursor-pointer hover:translate-y-[-4px] ease-in duration-110 transition-transform"
		>
			<div className="card-body">
				<h2 className="card-title text-xl">{plan.name}</h2>

				<div className="space-y-3">
					<div className="flex items-center">
						<CalendarIcon className="h-5 w-5 mr-2 text-primary" />
						<div>
							<p className="text-sm font-medium">
								{format(plan.startDate, 'MMM d, yyyy')} -{' '}
								{format(plan.endDate, 'MMM d, yyyy')}
								<span className="ml-2 text-xs text-gray-500">
									({diffDays} days)
								</span>
							</p>
						</div>
					</div>

					<div className="flex items-center">
						<MapPinIcon className="h-5 w-5 mr-2 text-primary" />
						<span>{plan.city}</span>
					</div>

					<div className="flex items-center">
						<UsersIcon className="h-5 w-5 mr-2 text-primary" />
						<span>{plan.travelCompanion}</span>
					</div>

					<div className="flex items-center">
						<WalletIcon className="h-5 w-5 mr-2 text-primary" />
						<span>Rp {plan.budget.toLocaleString()}</span>
					</div>

					<div className="flex items-start mt-6">
						<div className="flex flex-wrap gap-1">
							{getThemesArray(plan.travelTheme).map((theme) => (
								<div
									key={`${plan.id}-${theme}`}
									className={`badge ${getThemeColor(theme)}`}
								>
									{theme}
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
