import { Suspense } from 'react';

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<>
			<p>test</p>
			<Suspense fallback={<p>Loading...</p>}>{children}</Suspense>
		</>
	);
}
