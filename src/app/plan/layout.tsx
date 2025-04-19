import { Link, Plus, PlusIcon } from 'lucide-react';
import { Suspense } from 'react';

export default function Layout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	return (
		<div className="container mx-auto mt-5">
			<div className="flex flex-wrap items-center gap-2">
				<div className="flex flex-col md:flex-row justify-between items-start md:items-center w-full">
					<div>
						<h1 className="text-3xl font-bold">Travel Plans</h1>
						<p className="text-gray-500 mt-2">
							Manage and view your upcoming adventures
						</p>
					</div>
					<button className="btn btn-primary mt-4 md:mt-0">
						<PlusIcon className="h-5 w-5 mr-2" />
						New Plan
					</button>
				</div>

				<Suspense fallback={<LoadingState />}>{children}</Suspense>
			</div>
		</div>
	);
}

function LoadingState() {
	return (
		<div className="bg-gray-50 p-8 rounded-lg border border-gray-200 shadow-sm">
			<div className="flex items-center justify-center">
				<div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
				<p className="ml-3 text-gray-600 font-medium">
					Loading your travel plans...
				</p>
			</div>
		</div>
	);
}
