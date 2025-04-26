import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { TravelCompanion, TravelTheme } from '@/types/plan';
import { getThemeColor } from '@/utils/planThemeColor';
import { useState } from 'react';
import { addDays, format } from 'date-fns';
import Calendar from '../UI/Calendar';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createPlan } from '@/lib/services/plan-service';
import toast, { Toaster } from 'react-hot-toast';

export default function CreatePlanPage({
	modalStatus,
	onClose,
}: {
	modalStatus: boolean;
	onClose: () => void;
}) {
	const [selectedThemes, setSelectedThemes] = useState<string[]>([]);
	const [showCalendar, setShowCalendar] = useState<boolean>(false);
	const [planName, setPlanName] = useState<string>('');
	const [city, setCity] = useState<string>('');
	const [companion, setCompanion] = useState<string>('');
	const [budget, setBudget] = useState<string>('');
	const [selectedDate, setSelectedDate] = useState<
		{
			startDate?: Date | undefined;
			endDate?: Date | undefined;
			key?: string | undefined;
		}[]
	>([
		{
			startDate: new Date(),
			endDate: addDays(new Date(), 7),
			key: 'selection',
		},
	]);

	const handleSelectedThemes = (theme: string) => {
		setSelectedThemes((prev) => {
			const newTheme = prev.includes(theme)
				? prev.filter((t) => t !== theme)
				: [...prev, theme];

			return newTheme;
		});
	};

	const bodyToSend = {
		name: planName,
		startDate: format(selectedDate[0].startDate as Date, 'yyyy-M-d').toString(),
		endDate: format(selectedDate[0].endDate as Date, 'yyyy-M-d').toString(),
		city: city,
		travelCompanion: companion,
		budget: Number(budget),
		travelTheme: selectedThemes.join('/'),
	};

	const queryClient = useQueryClient();

	const createPlanMutation = useMutation({
		mutationFn: () => createPlan(bodyToSend),
		onSuccess: (data) => {
			queryClient.invalidateQueries({ queryKey: ['plans'] });
			toast.success('Plan created successfully');
			onClose();
		},
		onError: () => {
			toast.success('Failed to create plan');
		},
	});

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		createPlanMutation.mutate();
	};

	const { status } = createPlanMutation;

	const availableTravelTheme = Object.values(TravelTheme);
	const availableTravelCompanion = Object.values(TravelCompanion);

	return (
		<div>
			<Toaster position="top-center" reverseOrder={false} />
			<dialog id="add_to_plan_modal" className="modal" open={modalStatus}>
				<div className="modal-box max-w-xl">
					<form className="p-6 space-y-6" onSubmit={handleSubmit}>
						<header className="flex justify-center items-center pb-2 w-full">
							<h3 className="font-bold text-xl">Create New Travel Plan</h3>
						</header>

						<div className="form-control">
							<label className="block text-sm font-medium mb-1">
								Plan Name
							</label>
							<input
								type="text"
								placeholder="E.g., Summer Vacation 2025"
								className="input input-bordered w-full focus:ring-2 focus:ring-primary transition-all"
								value={planName}
								onChange={(e) => setPlanName(e.target.value)}
								required
								minLength={3}
							/>
							<p className="text-xs text-gray-500 mt-1">
								Must be at least 3 characters
							</p>
						</div>
						<Calendar
							selectedDate={selectedDate}
							setSelectedDate={setSelectedDate}
							setShowCalendar={setShowCalendar}
							showCalendar={showCalendar}
						/>
						<div className="form-control">
							<label className="block text-sm font-medium mb-1">
								Destination City
							</label>
							<input
								type="text"
								placeholder="E.g., Bali, Bandung, Yogyakarta"
								className="input input-bordered w-full focus:ring-2 focus:ring-primary transition-all"
								value={city}
								onChange={(e) => setCity(e.target.value)}
								required
								minLength={3}
							/>
						</div>

						<div className="form-control">
							<label
								className="block text-sm font-medium mb-1"
								htmlFor="companion-select"
							>
								Travel Companion(s)
							</label>
							<select
								id="companion-select"
								className="select select-bordered w-full focus:ring-2 focus:ring-primary transition-all"
								value={companion}
								onChange={(e) => setCompanion(e.target.value)}
							>
								<option value="" disabled>
									-- Choose a Companion --
								</option>
								{availableTravelCompanion.map((c) => (
									<option key={c} value={c}>
										{c}
									</option>
								))}
							</select>
						</div>

						<div className="form-control">
							<label className="block text-sm font-medium mb-1">Budget</label>
							<div className="relative">
								<div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
									<span className="text-gray-500">$</span>
								</div>
								<input
									type="number"
									placeholder="Enter amount"
									className="input input-bordered w-full pl-8 focus:ring-2 focus:ring-primary transition-all"
									value={budget}
									onChange={(e) => setBudget(e.target.value)}
									required
									min={1}
								/>
							</div>
						</div>

						<div className="form-control">
							<div className="flex justify-between items-center mb-2">
								<label className="block text-sm font-medium">
									Travel Theme(s)
								</label>
								<span className="text-xs text-gray-500">
									Selected: {selectedThemes.length}
								</span>
							</div>
							<div className="flex flex-wrap gap-2">
								{availableTravelTheme.map((theme) => (
									<div
										key={theme}
										onClick={() => handleSelectedThemes(theme)}
										className={`badge badge-lg cursor-pointer transition-all ${
											selectedThemes.includes(theme)
												? `${getThemeColor(theme)} text-white`
												: 'badge-outline hover:bg-gray-100 '
										}`}
									>
										{theme}
									</div>
								))}
							</div>
						</div>

						<div className="pt-2 flex justify-end gap-3">
							<button
								className="btn btn-outline"
								type="button"
								onClick={onClose}
							>
								Cancel
							</button>
							<button
								className="btn btn-primary"
								disabled={status === 'pending'}
								type="submit"
							>
								Create Plan
							</button>
						</div>
					</form>
				</div>
			</dialog>
		</div>
	);
}
