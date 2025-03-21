'use client';
import { useState } from 'react';
import { signIn } from 'next-auth/react';

export default function SignIn() {
	const [credentials, setCredentials] = useState({
		email: '',
		password: '',
	});

	async function handleSubmit(e: React.FormEvent) {
		e.preventDefault();
		const result = await signIn('credentials', {
			email: credentials.email,
			password: credentials.password,
			redirect: false,
		});

		console.log(result);
	}
	return (
		<div className="min-h-screen flex items-center justify-center p-4">
			<form onSubmit={handleSubmit}>
				<input
					type="text"
					value={credentials.email}
					placeholder="email"
					onChange={(e) =>
						setCredentials((prev) => ({ ...prev, email: e.target.value }))
					}
				/>
				<input
					type="password"
					value={credentials.password}
					placeholder="password"
					onChange={(e) =>
						setCredentials((prev) => ({ ...prev, password: e.target.value }))
					}
				/>
				<button type="submit">SignIn</button>
			</form>
		</div>
	);
}
