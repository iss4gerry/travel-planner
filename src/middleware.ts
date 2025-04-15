import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

export default async function middleware(req: NextRequest) {
	const token = await getToken({ req, secret: process.env.JWT_SECRET });
	const excludedRoutes = ['/api/auth/'];

	if (excludedRoutes.some((path) => req.nextUrl.pathname.startsWith(path))) {
		return NextResponse.next();
	}

	if (!token) {
		return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
	}

	const res = NextResponse.next();

	console.log(token.sub);

	res.headers.set('x-user-id', token.sub!);

	return res;
}

export const config = {
	matcher: '/api/:path*',
};
