'use client';

export default function Error({
	error,
}: {
	error: Error & { digest?: string };
}) {
	return (
		<div className="text-red-500 p-4">
			<p>Something went wrong: {error.message}</p>
			{error.digest && <p>Error reference: {error.digest}</p>}
		</div>
	);
}
