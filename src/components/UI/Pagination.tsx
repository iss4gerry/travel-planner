import { redirect } from 'next/navigation';

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
	const changePage = (page: number) => {
		redirect(`/${url}?page=${page}`);
	};

	return (
		<>
			<div className="w-full flex items-center justify-center mt-7">
				<div className="join">
					<button
						className="join-item btn"
						disabled={pagination.page === 1}
						onClick={() => changePage(pagination.page - 1)}
					>
						«
					</button>

					{pagination.page > 2 && (
						<button className="join-item btn" onClick={() => changePage(1)}>
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
								onClick={() => changePage(page)}
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
							onClick={() => changePage(pagination.totalPages)}
						>
							{pagination.totalPages}
						</button>
					)}

					<button
						className="join-item btn"
						onClick={() => changePage(pagination.page + 1)}
						disabled={pagination.page === pagination.totalPages}
					>
						»
					</button>
				</div>
			</div>
		</>
	);
}
