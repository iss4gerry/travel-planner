import { QueryClient } from '@tanstack/react-query';
import DestinationCard from './DestinationCard';
import { cookies } from 'next/headers';
import { fetchDestinationServer } from '@/lib/services/destination-service';
import { DestinationResponse } from '@/types/destination';

export default async function Destination() {
	const queryClient = new QueryClient();

	const cookieStore = (await cookies()).toString();

	await queryClient.prefetchQuery({
		queryKey: ['destinations'],
		queryFn: () => fetchDestinationServer(cookieStore),
	});

	const data =
		queryClient.getQueryData<DestinationResponse[]>(['destinations']) || [];

	return (
		<div className="flex flex-col w-full my-5">
			<div className="mt-4 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
				{data.map((destination) => (
					<DestinationCard key={destination.id} destination={destination} />
				))}
			</div>
		</div>
	);
}
