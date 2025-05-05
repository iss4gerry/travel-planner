import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

export default async function middleware(req: NextRequest) {
	const token = await getToken({ req, secret: process.env.JWT_SECRET });
	const excludedRoutes = ['/api/auth/'];

	if (excludedRoutes.some((path) => req.nextUrl.pathname.startsWith(path))) {
		return NextResponse.next();
	}

	const isApiRoute = req.nextUrl.pathname.startsWith('/api/');

	if (isApiRoute && !token) {
		return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
	}

	if (!token) {
		const loginUrl = new URL('/auth/login', req.url);
		loginUrl.searchParams.set('callbackUrl', req.nextUrl.pathname);
		return NextResponse.redirect(loginUrl);
	}

	const res = NextResponse.next();

	res.headers.set('x-user-id', token.sub!);
	console.log(token.pfp);

	return res;
}

export const config = {
	matcher: [
		'/api/:path*',
		'/((?!auth/login|auth/register|_next/static|_next/image|favicon.ico).*)',
	],
};
