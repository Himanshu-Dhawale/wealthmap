import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'


export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|auth).*)',
  ],
}

export async function middleware(request:NextRequest) {
  const protectedRoutes: string[] = ['/map', "/members", "/reports", "/wealth-analysis"];

   const authRoutes: string[] = ['/login', '/register']
   const { pathname } = request.nextUrl

   const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  )
}
