'use client';
import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import toast, { Toaster } from 'react-hot-toast';
import { loginSchema } from '@/lib/validations/auth-schema';
import { ZodError } from 'zod';
import { formatZodError } from '@/utils/formatZodError';

export default function SignIn() {
	const router = useRouter();
	const searchParams = useSearchParams();
	const [formData, setFormData] = useState({
		email: '',
		password: '',
	});
	const [showPassword, setShowPassword] = useState(false);

	const callbackUrl = searchParams.get('callbackUrl') || '';

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	async function handleSubmit(e: React.FormEvent) {
		e.preventDefault();
		try {
			loginSchema.parse(formData);
			const result = await signIn('credentials', {
				email: formData.email,
				password: formData.password,
				redirect: false,
				callbackUrl: '/',
			});

			if (result?.error) {
				toast.error(result.error);
			} else if (result?.ok) {
				toast.success('Login Success');
				router.push(callbackUrl);
			}
		} catch (error) {
			if (error instanceof ZodError) {
				const errorMessage = formatZodError(error);
				toast.error(errorMessage!);
			}
		}
	}
	return (
		<div className="min-h-screen flex items-center justify-center px-4 py-12">
			<Toaster position="top-center" reverseOrder={false} />
			<div className="max-w-md w-full space-y-8">
				<div className="card bg-base-100 shadow-sm">
					<div className="card-body">
						<h2 className="card-title justify-center">Sign In</h2>
						<p className="text-center text-sm text-base-content text-opacity-70">
							Enter your information to start your journey
						</p>

						<form
							method="POST"
							onSubmit={handleSubmit}
							className="space-y-6 mt-4"
						>
							<div className="form-control">
								<label className="label">
									<span className="label-text">Email</span>
								</label>
								<input
									type="email"
									name="email"
									value={formData.email}
									onChange={handleChange}
									placeholder="john.doe@example.com"
									className="input input-bordered w-full"
									required
								/>
							</div>

							<div className="form-control">
								<label className="label">
									<span className="label-text">Password</span>
								</label>
								<div className="relative">
									<input
										type={showPassword ? 'text' : 'password'}
										name="password"
										value={formData.password}
										onChange={handleChange}
										placeholder="••••••••"
										className="input input-bordered rounded-sm w-full pr-10"
										required
										minLength={8}
									/>
									<button
										type="button"
										onClick={() => setShowPassword(!showPassword)}
										className="absolute inset-y-0 right-0 flex items-center px-3 text-base-content text-opacity-70 hover:text-opacity-100"
									>
										{showPassword ? (
											<svg
												xmlns="http://www.w3.org/2000/svg"
												fill="none"
												viewBox="0 0 24 24"
												strokeWidth={1.5}
												stroke="currentColor"
												className="w-5 h-5"
											>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
												/>
											</svg>
										) : (
											<svg
												xmlns="http://www.w3.org/2000/svg"
												fill="none"
												viewBox="0 0 24 24"
												strokeWidth={1.5}
												stroke="currentColor"
												className="w-5 h-5"
											>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
												/>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
												/>
											</svg>
										)}
									</button>
								</div>
							</div>

							<div className="form-control mt-6">
								<button type="submit" className="btn btn-primary w-full">
									Login
								</button>
							</div>
						</form>

						<div className="divider text-xs text-base-content text-opacity-50">
							OR
						</div>

						<div className="text-center text-sm">
							Doesn&apos;t have an account?{' '}
							<Link
								href="/auth/register"
								className="text-primary hover:underline"
							>
								Sign Up
							</Link>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
