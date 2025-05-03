const CardSkeleton = () => {
	return (
		<>
			{Array.from({ length: 3 }).map((_, index) => (
				<div key={index}>
					<div className="flex flex-row w-full justify-start bg-base-100 p-2 border-b border-base-200">
						<div className="relative w-40 h-33 rounded-md shadow-md bg-gray-200 animate-pulse"></div>

						<div className="flex flex-col pl-4 justify-between w-full">
							<div>
								<div className="h-8 bg-gray-200 rounded-md w-3/4 animate-pulse"></div>

								<div className="mt-2 h-4 bg-gray-200 rounded-md w-full animate-pulse"></div>
								<div className="mt-1 h-4 bg-gray-200 rounded-md w-4/5 animate-pulse"></div>

								<div className="flex gap-2 mt-3">
									<div className="w-5 h-5 bg-gray-200 rounded-full animate-pulse"></div>
									<div className="h-5 bg-gray-200 rounded-md w-1/2 animate-pulse"></div>
								</div>

								<div className="flex gap-2 mt-2">
									<div className="w-5 h-5 bg-gray-200 rounded-full animate-pulse"></div>
									<div className="h-5 bg-gray-200 rounded-md w-1/3 animate-pulse"></div>
								</div>
							</div>
						</div>
					</div>
				</div>
			))}
		</>
	);
};

export default CardSkeleton;
