import { NextResponse } from 'next/server'

export function middleware(request) {
  console.log("🚨 middleware is running")

  const token = request.cookies.get('token')
  if (!token) {
    console.log("🚫 No token found")
    return NextResponse.redirect(new URL('/', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/home', '/dashboard', '/createTask'],
}
