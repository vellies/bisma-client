// import { NextResponse } from 'next/server'
// import type { NextRequest } from 'next/server'

// export function middleware(request: NextRequest) {

//   let verify=request.cookies.get("userRole")
//   let userRole=verify?.value
//   let url=request.url
//   console.log('==============================================');
//   console.log('userRole',userRole,url.includes('/admin'));
//   console.log('==============================================');
// console.log('==============================================');
// console.log('V10N',url.includes('/admin'));
// console.log('==============================================');
// if(userRole=='admin' && url.includes('/admin')){
//   console.log('===='+1+'====');
//   return NextResponse.rewrite(new URL('/admin', request.url))
// }

// if (request.nextUrl.pathname.startsWith('/about')) {
//   return NextResponse.rewrite(new URL('/about-2', request.url))
// }

// if (request.nextUrl.pathname.startsWith('/dashboard')) {
//   return NextResponse.rewrite(new URL(request.url, request.url))
// }
// if (request.nextUrl.pathname.startsWith('/student')) {
//   return NextResponse.rewrite(new URL(request.url, request.url))
// }
// }


import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
// import { jwtDecode } from "jwt-decode";

function getUserStatus(token: any) {
  if (token === 'admin') {
    return 'admin'
  } else if (token === 'user') {
    return 'user'
  } else {
    return 'guest'
  }
}

function getRequiredStatus(pathname: any) {
  if (pathname === '/admin') {
    return 'admin'
  } else if (pathname === '/profile') {
    return 'user'
  } else {
    return 'guest'
  }
}

export default function middleware(req: any) {

  const cookieStore = cookies()
  const token = cookieStore.get('token')
  let tokenValue: any = token?.value
  // const decoded = jwtDecode(tokenValue);
  // const userStatus = getUserStatus('admin')
  const userStatus = 'admin';
  // const requiredStatus = getRequiredStatus(tokenValue)

  // if (userStatus !== requiredStatus) {

  
  if (userStatus === 'admin') {
    // return NextResponse.redirect('http://localhost:3000/admin')
  } else if (userStatus === 'superadmin') {
    return NextResponse.redirect('/superadmin')
  } else if (userStatus === 'student') {
    return NextResponse.redirect('/student')
  } else {
    return NextResponse.redirect('/loin')
  }



  // }
}