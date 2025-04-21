import { PlanResponse } from '@/types/plan';
import {
	CalendarIcon,
	MapPinIcon,
	UsersIcon,
	WalletIcon,
	ChevronRightIcon,
} from 'lucide-react';
import { format } from 'date-fns';
import { getThemeColor } from '@/utils/planThemeColor';
import { useRouter } from 'next/navigation';

export default function PlanListItem({ plan }: { plan: PlanResponse }) {
	const router = useRouter();

	const getThemesArray = (themeString: string): string[] => {
		return themeString.split('/').map((theme) => theme.trim());
	};

	const startDate = new Date(plan.startDate);
	const endDate = new Date(plan.endDate);
	const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
	const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

	const handleClick = () => {
		router.push(`/plan/${plan.id}`);
	};

	return (
		<div
			onClick={handleClick}
			key={plan.id}
			className="flex items-center justify-between p-4 border-b border-gray-200 hover:bg-gray-50 transition-colors duration-200 cursor-pointer"
		>
			<div className="flex-1 min-w-0">
				<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
					<h3 className="text-lg font-semibold text-gray-900 truncate">
						{plan.name}
					</h3>
					<div className="flex items-center gap-2 text-sm text-gray-500 mt-1 sm:mt-0">
						<CalendarIcon className="h-4 w-4 text-secondary" />
						<span>
							{format(plan.startDate, 'MMM d')} -{' '}
							{format(plan.endDate, 'MMM d, yyyy')}
						</span>
						<span className="text-xs px-2 py-0.5 bg-base-200 text-secondary rounded-full">
							{diffDays} {diffDays === 1 ? 'day' : 'days'}
						</span>
					</div>
				</div>

				<div className="mt-2 flex flex-row max-sm:grid sm:grid-cols-3 gap-y-2 gap-x-4">
					<div className="flex items-center gap-2 text-gray-700">
						<MapPinIcon className="h-4 w-4 text-secondary flex-shrink-0" />
						<span className="truncate">{plan.city}</span>
					</div>

					<div className="flex items-center gap-2 text-gray-700">
						<UsersIcon className="h-4 w-4 text-secondary flex-shrink-0" />
						<span className="truncate">{plan.travelCompanion}</span>
					</div>

					<div className="flex items-center gap-2 text-gray-700">
						<WalletIcon className="h-4 w-4 text-secondary flex-shrink-0" />
						<span className="truncate">
							Rp {plan.budget.toLocaleString('id-ID')}
						</span>
					</div>
				</div>

				<div className="flex flex-wrap gap-1.5 mt-3">
					{getThemesArray(plan.travelTheme).map((theme) => (
						<div
							key={`${plan.id}-${theme}`}
							className={`badge px-2 py-0.5 rounded-full text-xs font-medium ${getThemeColor(
								theme
							)}`}
						>
							{theme}
						</div>
					))}
				</div>
			</div>

			<ChevronRightIcon className="h-5 w-5 text-gray-400 ml-4 flex-shrink-0" />
		</div>
	);
}
