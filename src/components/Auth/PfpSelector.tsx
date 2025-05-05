import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

export default function PfpSelector({
	setFormData,
	selectedAvatar,
}: {
	setFormData: React.Dispatch<
		React.SetStateAction<{
			name: string;
			profilePicture: string;
			email: string;
			password: string;
		}>
	>;
	selectedAvatar: string;
}) {
	const [avatarPage, setAvatarPage] = useState<number>(0);

	const scrollToNext = () => {
		setAvatarPage((prev) => Math.min(prev + 3, 9));
	};

	const scrollToPrevious = () => {
		setAvatarPage((prev) => Math.max(prev - 3, 0));
	};

	return (
		<div className="relative w-full">
			<div className="relative w-full">
				<button
					disabled={avatarPage === 0}
					type="button"
					onClick={scrollToPrevious}
					className="absolute btn left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 rounded-full p-2 shadow-md hover:bg-white transition-all"
					aria-label="Previous avatar"
				>
					<ChevronLeft className="h-6 w-6" />
				</button>

				<div className="flex flex-row items-center justify-center w-full overflow-x-auto py-4 px-12 gap-3 scrollbar-hide">
					{Array.from({ length: 12 })
						.slice(avatarPage, avatarPage + 3)
						.map((_, index) => (
							<div
								key={index}
								className={`rounded-full overflow-hidden border-2 hover:scale-110 hover:cursor-pointer ease-in duration-125 flex-shrink-0 ${
									selectedAvatar === index.toString()
										? 'border-primary ring-2 ring-primary ring-offset-2'
										: 'border-gray-200'
								}`}
								onClick={() =>
									setFormData((prev) => ({
										...prev,
										profilePicture: (avatarPage + index).toString(),
									}))
								}
							>
								<Image
									width={80}
									height={80}
									alt={`profile avatar ${index + 1}`}
									src={`https://api.dicebear.com/9.x/notionists/svg?seed=${
										avatarPage + index
									}`}
									className="min-w-[80px]"
								/>
							</div>
						))}
				</div>

				<button
					type="button"
					disabled={avatarPage === 9}
					onClick={scrollToNext}
					className="absolute btn right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 rounded-full p-2 shadow-md hover:bg-white transition-all"
					aria-label="Next avatar"
				>
					<ChevronRight className="h-6 w-6" />
				</button>
			</div>
		</div>
	);
}
