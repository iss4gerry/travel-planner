import Banner from '@/components/Banner/Banner';
import DestinationList from '@/components/Destination/DestinationList';

export default function Home() {
	return (
		<div className="w-full flex items-center flex-col">
			<Banner />
			<DestinationList />
		</div>
	);
}
