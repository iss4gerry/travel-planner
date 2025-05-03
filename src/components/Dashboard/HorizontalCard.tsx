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
import { useRouter } from 'next/navigation';
import CardSkeleton from './CardSkeleton';

export default function HorizontalCard({ mode }: { mode: string }) {
	const { data: session } = useSession();

	const { data: destinationData, isLoading: loadingDestination } = useQuery({
		queryKey: ['user-destination', session?.user.id],
		queryFn: fetchUserDestinations,
		enabled: mode === 'destination',
	});

	const { data: bannerData, isLoading: loadingBanner } = useQuery({
		queryKey: ['user-banner', session?.user.id],
		queryFn: fetchUserBanners,
		enabled: mode === 'banner',
	});

	if (loadingDestination || loadingBanner) {
		return <CardSkeleton />;
	}
	console.log(destinationData);

	return (
		<div>
			{mode === 'destination' && (
				<div>
					{!destinationData || destinationData.length === 0 ? (
						<div className="flex items-center justify-center w-full h-80">
							<p>You haven't created any destinations yet.</p>
						</div>
					) : (
						<div>
							{destinationData.map((d, index) => (
								<Card key={index} mode="destination" data={d} />
							))}
						</div>
					)}
				</div>
			)}

			{mode === 'banner' && (
				<div>
					{!bannerData || bannerData.length === 0 ? (
						<div className="flex items-center justify-center w-full h-80">
							<p>You haven't created any banners yet.</p>
						</div>
					) : (
						<div>
							{bannerData.map((d, index) => (
								<Card key={index} mode="banner" data={d} />
							))}
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
			<div className="relative w-40 h-40 overflow-hidden rounded-md shadow-md">
				<Image
					src={data.imageUrl || '/placeholder.svg'}
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
					<p className="text-sm text-gray-600 line-clamp-2 mt-2">
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
