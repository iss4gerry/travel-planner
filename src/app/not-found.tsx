import { Home, AlertCircle, AlertTriangle } from 'lucide-react';
import Link from 'next/link';

export default function NotFound() {
	return (
		<div className="flex flex-col items-center justify-center min-h-screen px-4 -mt-15">
			<div className="text-center max-w-md">
				<div className="flex justify-center mb-6">
					<div className="relative">
						<span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-primary font-bold text-5xl">
							404
						</span>
					</div>
				</div>

				<h1 className="text-4xl font-bold text-primary mb-2">Page not found</h1>
				<p className="text-lg text-gray-500 mb-8">
					Oops! The page you're looking for doesn't exist or has been moved.
				</p>

				<div className="flex w-full justify-center items-center">
					<Link
						href="/"
						className="flex items-center justify-center text-primary cursor-pointer"
					>
						<p>Back to Home</p>
					</Link>
				</div>
			</div>
		</div>
	);
}
