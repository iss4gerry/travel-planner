import type { Metadata } from 'next';
import './globals.css';
import NavBar from '@/components/UI/NavBar';
import Provider from '../components/Provider';
import { Suspense } from 'react';

export const metadata: Metadata = {
	title: 'Twavely',
	description: 'Travel planner for ya',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" data-theme="cupcake">
			<body className="flex items-center flex-col w-full min-h-screen min-w-screen">
				<Provider>
					<div className="w-full mt-3 items-center justify-center flex">
						<Suspense>
							<NavBar />
						</Suspense>
					</div>
					<div className="w-3/4 max-md:w-10/12 mt-3">{children}</div>
				</Provider>
			</body>
		</html>
	);
}
