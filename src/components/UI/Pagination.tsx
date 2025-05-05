import { useSearchParams } from 'next/navigation';

export default function Pagination({
	pagination,
	url,
}: {
	pagination: {
		page: number;
		total: number;
		totalPages: number;
		limit: number;
	};
	url: string;
}) {
	const searchParams = useSearchParams();

	const createQueryString = (name: string, value: string) => {
		const params = new URLSearchParams(searchParams.toString());
		params.set(name, value);
		return params.toString();
	};

	const handlePageChange = (page: number) => {
		const query = createQueryString('page', page.toString());

		window.location.href = `${url}?${query}`;
	};

	return (
		<>
			<div className="w-full flex items-center justify-center mt-7">
				<div className="join">
					<button
						className="join-item btn"
						disabled={pagination.page === 1}
						onClick={() => handlePageChange(pagination.page - 1)}
					>
						«
					</button>

					{pagination.page > 2 && (
						<button
							className="join-item btn"
							onClick={() => handlePageChange(1)}
						>
							1
						</button>
					)}

					{pagination.page > 3 && (
						<button className="join-item btn btn-disabled">...</button>
					)}

					{[pagination.page - 1, pagination.page, pagination.page + 1]
						.filter((page) => page > 0 && page <= pagination.totalPages)
						.map((page) => (
							<button
								onClick={() => handlePageChange(page)}
								key={page}
								className={`join-item btn ${
									page === pagination.page ? 'btn-active' : ''
								}`}
							>
								{page}
							</button>
						))}

					{pagination.page < pagination.totalPages - 2 && (
						<button className="join-item btn btn-disabled">...</button>
					)}

					{pagination.page < pagination.totalPages - 1 && (
						<button
							className="join-item btn"
							onClick={() => handlePageChange(pagination.totalPages)}
						>
							{pagination.totalPages}
						</button>
					)}

					<button
						className="join-item btn"
						onClick={() => handlePageChange(pagination.page + 1)}
						disabled={
							pagination.page === pagination.totalPages ||
							pagination.totalPages === 0
						}
					>
						»
					</button>
				</div>
			</div>
		</>
	);
}
