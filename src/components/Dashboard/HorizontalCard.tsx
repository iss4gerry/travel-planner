import { DollarSign, MapIcon, MapPin, Wallet, Waypoints } from 'lucide-react';
import Image from 'next/image';

type Props = {
	id: string;
	imageUrl: string | null;
	title?: string;
	name?: string;
	description: string;
	address: string;
	cost: number | string;
	createdAt: Date;
	updatedAt: Date;
};

export default function HorizontalCard({ data }: { data: Props }) {
	return (
		<div className="flex flex-row w-full justify-start bg-base-100 rounded-lg shadow-lg p-2">
			<div className="relative w-40 h-40 overflow-hidden rounded-md shadow-md">
				<Image
					src={data.imageUrl || '/placeholder.svg'}
					alt={data.title || data.name || 'image'}
					fill
					className="object-cover"
				/>
			</div>

			<div className="flex flex-col pl-4 justify-between">
				<div>
					<h1 className="text-2xl font-semibold text-gray-800 truncate">
						{data.name || data.title}
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
						{data.createdAt
							.toString()
							.split(' ')
							.filter((_, index) => index === 1 || index === 2 || index === 3)
							.join(' ')}
					</p>
				</div>
			</div>
		</div>
	);
}
