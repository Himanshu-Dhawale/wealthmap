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

   const isAuthRoute = authRoutes.includes(pathname)
 
   const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET
  })

    if (isProtectedRoute && !token) {
    const signInUrl = new URL('/login', request.url)
    signInUrl.searchParams.set('callbackUrl', request.nextUrl.href)
    return NextResponse.redirect(signInUrl)
    }

      if (isAuthRoute && token) {
        return NextResponse.redirect(new URL('/map', request.url))
     }
      
     
     return NextResponse.next()

}
