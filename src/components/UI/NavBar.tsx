'use client';

import { Bell } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';

export default function NavBar() {
	const url = usePathname();
	const { data: session } = useSession();

	if (url.includes('auth')) {
		return null;
	}

	return (
		<div className="navbar bg-base-100 shadow-sm ">
			<div className="navbar-start">
				<div className="dropdown lg:hidden">
					<div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-5 w-5"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M4 6h16M4 12h16M4 18h7"
							/>
						</svg>
					</div>
					<ul
						tabIndex={0}
						className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
					>
						<li>
							<Link className="font-medium hover:text-primary" href={'/'}>
								Home
							</Link>
						</li>
						<li>
							<Link className="font-medium hover:text-primary" href="/#explore">
								Explore
							</Link>
						</li>
						<li>
							<Link
								className="font-medium hover:text-primary"
								href="/plan?page=1"
							>
								My Plans
							</Link>
						</li>
						<li>
							<Link
								className="font-medium hover:text-primary"
								href="/dashboard"
							>
								Dashboard
							</Link>
						</li>
					</ul>
				</div>

				<a className="btn btn-ghost normal-case">
					<span className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
						Twavely
					</span>
				</a>
			</div>

			<div className="navbar-center hidden lg:flex">
				<ul className="menu menu-horizontal px-1 gap-1">
					<li>
						<Link className="font-medium hover:text-primary" href={'/'}>
							Home
						</Link>
					</li>
					<li>
						<Link className="font-medium hover:text-primary" href="/#explore">
							Explore
						</Link>
					</li>
					<li>
						<Link
							className="font-medium hover:text-primary"
							href="/plan?page=1"
						>
							My Plans
						</Link>
					</li>
					<li>
						<Link className="font-medium hover:text-primary" href="/dashboard">
							Dashboard
						</Link>
					</li>
				</ul>
			</div>

			<div className="navbar-end gap-2">
				<div className="dropdown dropdown-end">
					<button className="btn btn-ghost btn-circle">
						<div className="indicator">
							<Bell size={20} />
							<span className="badge badge-xs badge-primary indicator-item"></span>
						</div>
					</button>
					<div className="dropdown-content z-[1] card card-compact w-64 p-2 shadow bg-base-100 mt-4">
						<div className="card-body">
							<h3 className="font-bold text-lg">Notifications</h3>
							<div className="text-sm py-2 border-b">
								<p className="font-medium">New destination added: Bali</p>
								<p className="text-xs text-gray-500">2 hours ago</p>
							</div>
							<div className="text-sm py-2">
								<p className="font-medium">Your Paris trip is coming up!</p>
								<p className="text-xs text-gray-500">1 day ago</p>
							</div>
							<div className="card-actions mt-2">
								<button className="btn btn-primary btn-sm btn-block">
									View all
								</button>
							</div>
						</div>
					</div>
				</div>

				<div className="dropdown dropdown-end">
					<div
						tabIndex={0}
						role="button"
						className="btn btn-ghost btn-circle avatar online"
					>
						<div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
							<Image
								width={20}
								height={20}
								alt="pfp"
								src={`https://api.dicebear.com/9.x/notionists/svg?seed=${session?.user.pfp}`}
							/>
						</div>
					</div>
					<ul
						tabIndex={0}
						className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-60 p-3 shadow-lg"
					>
						<li className="mb-2">
							<div className="flex flex-col items-start gap-1 p-2">
								<span className="font-bold text-base">
									{session?.user.name}
								</span>
								<span className="text-xs text-gray-500">
									{session?.user.email}
								</span>
							</div>
						</li>
						<div className="divider my-0"></div>
						<li>
							<a className="flex items-center py-2 hover:bg-base-200">
								<span>Profile</span>
								<span className="badge badge-primary badge-sm ml-auto">
									New
								</span>
							</a>
						</li>
						<li>
							<a className="py-2 hover:bg-base-200">My Trips</a>
						</li>
						<li>
							<a className="py-2 hover:bg-base-200">Settings</a>
						</li>
						<div className="divider my-0"></div>
						<li>
							<a className="py-2 text-error hover:bg-base-200">Logout</a>
						</li>
					</ul>
				</div>
			</div>
		</div>
	);
}
