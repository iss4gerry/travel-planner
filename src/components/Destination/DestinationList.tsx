'use client';

import { useQuery } from '@tanstack/react-query';
import DestinationCard from './DestinationCard';
import { DestinationResponse } from '@/types/destination';
import DestinationSkeleton from './DestinationSkeleton';

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

	const renderContent = () => {
		if (isLoading) {
			return Array.from({ length: 4 }).map((_, index) => (
				<DestinationSkeleton key={index} />
			));
		}
		if (error) return <p>Error Fetching Destination...</p>;
		if (!data) return <p>Error Fetching Destination...</p>;

		return data.map((destination) => (
			<DestinationCard key={destination.id} destination={destination} />
		));
	};

	return (
		<div className="flex flex-col w-full my-5">
			<p className="text-2xl min-sm:text-3xl font-bold my-3">Explore</p>
			<select className="select w-35">
				<option defaultValue="true">All City</option>
				<option>Crimson</option>
				<option>Amber</option>
				<option>Velvet</option>
			</select>
			<div className="mt-4 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
				{renderContent()}
			</div>
		</div>
	);
}
