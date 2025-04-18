'use client';
import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function SignIn() {
	const [error, setError] = useState<string>('');
	const router = useRouter();
	const searchParams = useSearchParams();

	const callbackUrl = searchParams.get('callbackUrl') || '';
	const [credentials, setCredentials] = useState({
		email: '',
		password: '',
	});

	async function handleSubmit(e: React.FormEvent) {
		e.preventDefault();
		setError('');
		const result = await signIn('credentials', {
			email: credentials.email,
			password: credentials.password,
			redirect: false,
		});

		if (result?.error) {
			setError(result.error);
		} else if (result?.ok) {
			router.push(callbackUrl);
		}
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
