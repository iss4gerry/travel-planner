import { format } from 'date-fns';
import { useRef } from 'react';
import { DateRange } from 'react-date-range';

export default function Calendar({
	selectedDate,
	setSelectedDate,
	setShowCalendar,
	showCalendar,
}: {
	selectedDate: {
		startDate?: Date | undefined;
		endDate?: Date | undefined;
		key?: string | undefined;
	}[];
	setSelectedDate: (date: any) => void;
	setShowCalendar: (state: any) => void;
	showCalendar: boolean;
}) {
	const wrapperRef = useRef<HTMLDivElement>(null);
	const getDuration = () => {
		if (selectedDate[0]?.startDate && selectedDate[0]?.endDate) {
			const start = selectedDate[0].startDate;
			const end = selectedDate[0].endDate;
			const diffTime = Math.abs(end.getTime() - start.getTime());
			const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
			return `${diffDays} ${diffDays === 1 ? 'day' : 'days'}`;
		}
		return '';
	};

	return (
		<div className="w-full relative" ref={wrapperRef}>
			<label className="block text-sm font-medium mb-1">Trip Dates</label>
			<div className="w-full relative">
				<div
					onClick={() => setShowCalendar((prev: boolean) => !prev)}
					className="input input-bordered w-full flex items-center cursor-pointer group"
				>
					<div className="flex-1">
						{selectedDate[0]?.startDate && selectedDate[0]?.endDate ? (
							<div className="flex flex-col sm:flex-row sm:items-center text-sm">
								<span className="font-medium">
									{format(selectedDate[0].startDate, 'MMM/d/yyyy')} -{' '}
									{format(selectedDate[0].endDate, 'MMM/d/yyyy')}
								</span>
								<span className="text-gray-500 sm:ml-2">({getDuration()})</span>
							</div>
						) : (
							<span className="text-gray-400">Select trip dates</span>
						)}
					</div>
					<svg
						className="w-5 h-5 text-gray-400 group-hover:text-primary transition-colors"
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 20 20"
						fill="currentColor"
					>
						<path
							fillRule="evenodd"
							d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
							clipRule="evenodd"
						/>
					</svg>
				</div>
				{showCalendar && (
					<div className="absolute top-full mt-2 z-50 bg-white rounded-lg">
						<DateRange
							editableDateInputs={true}
							onChange={(item) => setSelectedDate([item.selection])}
							moveRangeOnFirstSelection={false}
							ranges={selectedDate}
							minDate={new Date()}
							rangeColors={['#3b82f6']}
						/>
						<div className="flex justify-end p-2">
							<button
								type="button"
								className="btn btn-sm btn-primary"
								onClick={() => setShowCalendar(false)}
							>
								Apply
							</button>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}
