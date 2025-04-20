import Banner from '@/components/Banner/Banner';
import Destination from '@/components/Destination/Destination';
import DestinationSkeleton from '@/components/Destination/DestinationSkeleton';

import { Suspense } from 'react';

export default async function Home() {
	return (
		<div className="w-full flex items-center flex-col">
			<div className="flex w-full mt-3">
				<p className="text-2xl min-sm:text-3xl font-bold mb-2">
					Top Destinations for You!
				</p>
			</div>
			<Suspense
				fallback={
					<div className="skeleton w-full h-[450px] max-md:h-[250px] mt-1"></div>
				}
			>
				<Banner />
			</Suspense>
			<div className="w-full mt-5">
				<p className="text-2xl min-sm:text-3xl font-bold my-3">Explore</p>
				<select className="select w-35">
					<option defaultValue="true">All City</option>
					<option>Crimson</option>
					<option>Amber</option>
					<option>Velvet</option>
				</select>
			</div>

			<Suspense
				fallback={
					<div className="flex flex-col w-full my-5">
						<div className="mt-4 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
							{Array.from({ length: 4 }).map((_, index) => (
								<DestinationSkeleton key={index} />
							))}
						</div>
					</div>
				}
			>
				<Destination />
			</Suspense>
		</div>
	);
}
