'use client';

import { useQuery } from '@tanstack/react-query';
import DestinationCard from './DestinationCard';
import { DestinationResponse } from '@/types/destination';

export default function DestinationList() {
	const fetchDestination = async () => {
		const result = await fetch('api/destinations');
		if (!result.ok) {
			throw new Error('Something went wrong');
		}

		const response: { data: DestinationResponse[] } = await result.json();
		return response.data;
	};
	const { data, isLoading, error } = useQuery({
		queryKey: ['destinations'],
		queryFn: fetchDestination,
	});

	if (isLoading) return <p>Loading...</p>;
	if (error) return <p>Error Fetching Destination...</p>;
	if (!data) return <p>Error Fetching Destination...</p>;
	return (
		<div className="flex flex-col w-full mt-4">
			<p className="text-2xl min-sm:text-3xl font-bold my-3">Explore</p>
			<select className="select w-35">
				<option defaultValue="true">All City</option>
				<option>Crimson</option>
				<option>Amber</option>
				<option>Velvet</option>
			</select>
			<div className="mt-4 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
				{data?.length > 0 ? (
					data.map((d) => <DestinationCard key={d.id} destination={d} />)
				) : (
					<p>No destinations available.</p>
				)}
			</div>
		</div>
	);
}
