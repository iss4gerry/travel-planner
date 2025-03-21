'use client';

import { useSession, signOut, SessionProvider } from 'next-auth/react';

export default function SessionContent() {
	const { data: session } = useSession();

	return (
		<SessionProvider>
			<div>
				<h1>Test</h1>
				<h2>Home</h2>

				{session ? (
					<div>
						<p>Welcome, {session.user?.name}!</p>
						<p>Email: {session.user?.email}</p>
					</div>
				) : (
					<p>You are not logged in.</p>
				)}
			</div>
		</SessionProvider>
	);
}
