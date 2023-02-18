import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt';

export async function middleware(request: NextRequest) {
    const session = await getToken({ req: request, secret: process.env.SECRET });
    if (request.url.includes("/admin")){
        if (session?.user.role !== "admin"){
            return NextResponse.redirect(new URL("/unauthorized", request.url))
        }
    }

    if (!session){
        return NextResponse.redirect(new URL("/auth/signin", request.url))
    }

}

export const config = {
    matcher: ['/admin/:path*', '/user/:path*', '/order/:path*'],
}