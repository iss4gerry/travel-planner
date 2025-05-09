'use client';

import { PlusIcon } from 'lucide-react';
import { useState } from 'react';
import CreatePlanPage from './CreatePlan';

export default function PlanTitle() {
	const [modalStatus, setModalStatus] = useState<boolean>(false);

	const showModal = () => {
		setModalStatus(true);
	};

	const closeModal = () => {
		setModalStatus(false);
	};

	return (
		<>
			<div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 w-full max-sm:justify-center max-sm:items-center bg">
				<div>
					<h1 className="text-3xl font-bold max-sm:text-2xl max-sm:text-center">
						Travel Plans
					</h1>
					<p className="text-gray-500 mt-2 max-sm:text-center">
						Manage and view your upcoming adventures
					</p>
				</div>
				<button
					className="btn btn-primary mt-4 md:mt-0 max-sm:w-full"
					onClick={showModal}
				>
					<PlusIcon className="h-5 w-5 mr-2" />
					New Plan
				</button>
			</div>
			<CreatePlanPage modalStatus={modalStatus} onClose={closeModal} />
		</>
	);
}
