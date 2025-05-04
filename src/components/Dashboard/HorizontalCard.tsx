import {
	fetchUserBanners,
	fetchUserDestinations,
} from '@/lib/services/dashboard-service';
import { BannerResponse } from '@/types/banner';
import { DestinationResponse } from '@/types/destination';
import { useQuery } from '@tanstack/react-query';
import { MapPin, Wallet } from 'lucide-react';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import CardSkeleton from './CardSkeleton';
import { parseQueryParams } from '@/lib/validations/query-schema';
import Pagination from '../UI/Pagination';

export default function HorizontalCard({ mode }: { mode: string }) {
	const { data: session } = useSession();
	const searchParams = useSearchParams();
	const page = parseInt(searchParams.get('page') || '1', 10);
	const limit = parseInt(searchParams.get('limit') || '8', 10);
	const sort = searchParams.get('sort') || 'createdAt';
	const order =
		(searchParams.get('order') || 'desc').toLowerCase() === 'asc'
			? 'asc'
			: 'desc';
	const parseParams = parseQueryParams({ page, limit, sort, order });

	const { data: destinationData, isLoading: loadingDestination } = useQuery({
		queryKey: ['user-destination', session?.user.id],
		queryFn: () => fetchUserDestinations(parseParams),
		enabled: mode === 'destination',
		staleTime: 1000 * 60 * 5,
	});

	const { data: bannerData, isLoading: loadingBanner } = useQuery({
		queryKey: ['user-banner', session?.user.id],
		queryFn: () => fetchUserBanners(parseParams),
		enabled: mode === 'banner',
		staleTime: 1000 * 60 * 5,
	});

	if (loadingDestination || loadingBanner) {
		return <CardSkeleton />;
	}

	return (
		<div>
			{mode === 'destination' && (
				<div>
					{!destinationData || destinationData.response.length === 0 ? (
						<div className="flex items-center justify-center w-full h-80">
							<p>You haven't created any destinations yet.</p>
						</div>
					) : (
						<div>
							<div className="shadow">
								{destinationData.response.map((d, index) => (
									<Card key={index} mode="destination" data={d} />
								))}
							</div>
							<Pagination
								pagination={destinationData.pagination}
								url="dashboard"
							/>
						</div>
					)}
				</div>
			)}

			{mode === 'banner' && (
				<div>
					{!bannerData || bannerData.response.length === 0 ? (
						<div className="flex items-center justify-center w-full h-80">
							<p>You haven't created any banners yet.</p>
						</div>
					) : (
						<div>
							<div className="shadow">
								{bannerData.response.map((d, index) => (
									<Card key={index} mode="banner" data={d} />
								))}
							</div>
							<Pagination pagination={bannerData.pagination} url="dashboard" />
						</div>
					)}
				</div>
			)}
		</div>
	);
}

function Card({
	data,
	mode,
}: {
	data: DestinationResponse | BannerResponse;
	mode: string;
}) {
	const router = useRouter();
	const handleClick = () => {
		router.push(`${mode}/${data.id}`);
	};
	return (
		<div
			className="flex flex-row w-full justify-start bg-base-100 p-2 border-b border-base-200 hover:bg-base-200 hover:cursor-pointer"
			onClick={handleClick}
		>
			<div className="relative max-w-40 max-h-40 min-w-40 min-h-40 overflow-hidden rounded-md shadow-md">
				<Image
					src={
						data.imageUrl ||
						(data as DestinationResponse).category?.imageUrl ||
						'/placeholder.svg'
					}
					alt={
						(data as DestinationResponse).name ||
						(data as BannerResponse).title ||
						'image'
					}
					fill
					className="object-cover"
				/>
			</div>

			<div className="flex flex-col pl-4 justify-between">
				<div>
					<h1 className="text-2xl font-semibold text-gray-800 truncate">
						{(data as DestinationResponse).name ||
							(data as BannerResponse).title}
					</h1>
					<p className="text-sm text-gray-600 line-clamp-1 mt-2">
						{data.description ||
							'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Provident dolorum minima...'}
					</p>

					<div className="flex gap-2 mt-3">
						<MapPin className="text-gray-500" width={20} />
						<p className="text-sm text-gray-600">{data.address}</p>
					</div>

					<div className="flex gap-2 mt-2">
						<Wallet className="text-gray-500" width={20} />
						<p className="text-sm text-gray-600">Rp {data.cost}</p>
					</div>
				</div>

				<div className="mt-3 text-sm text-gray-500">
					<p>
						<span className="font-semibold">Created At:</span>{' '}
						{data.createdAt.toString().split('T')[0]}
					</p>
				</div>
			</div>
		</div>
	);
}
