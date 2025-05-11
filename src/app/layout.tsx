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
			<head>
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
			</head>
			<body className="flex items-center flex-col h-screen w-screen">
				<Provider>
					<div className="w-full mt-3 items-center justify-center flex bg">
						<Suspense>
							<NavBar />
						</Suspense>
					</div>
					<div className="w-3/4 max-md:w-10/12 h-full">{children}</div>
				</Provider>
			</body>
		</html>
	);
}
