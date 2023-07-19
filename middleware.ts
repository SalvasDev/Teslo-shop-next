// middleware.ts
import { getToken } from 'next-auth/jwt'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// This function can be marked `async` if using `await` inside
export async function middleware(req: NextRequest) {

  const session: any = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const requestedPage = req.nextUrl.pathname;
  const validRoles = ['admin', 'super-user', 'SEO'];

  if (!session) {
    const url = req.nextUrl.clone();

    url.pathname = `/auth/login`;
    url.search = `p=${requestedPage}`;

    if (requestedPage.includes('/api')) {
      return new Response(JSON.stringify({ message: 'No autorizado' }), {
        status: 401,
        headers: {
          'Content-Type': 'application/json'
        }
      });
    };

    return NextResponse.redirect(url);
  };

  if (requestedPage.includes('/api/admin') && !validRoles.includes(session.user.role)) {

    return new Response(JSON.stringify({ message: 'No autorizado' }), {
      status: 401,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  };

  if (requestedPage.includes('/admin') && !validRoles.includes(session.user.role)) {

    return NextResponse.redirect(new URL('/', req.url));
  };

  return NextResponse.next();
};
// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/checkout/:path*', '/orders/:path*', '/api/orders/:path*', '/admin/:path*', '/api/admin/:path*'],
};

  




























// import { getToken } from 'next-auth/jwt';
// import { NextResponse } from 'next/server';
// import type { NextRequest } from 'next/server';

// // This function can be marked `async` if using `await` inside
// export async function middleware(req: NextRequest) {

//   const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })

//   // Información útil del usuario  
//   // console.log({ session });

//   if (!session) {

//     const requestedPage = req.nextUrl.pathname;
//     const url = req.nextUrl.clone();
//     url.pathname = `/auth/login/`;
//     url.search = `p=${requestedPage}`

//     return NextResponse.redirect(url);
//   }
 
//   return NextResponse.next();
// }

// // See "Matching Paths" below to learn more
// export const config = {
//   matcher: ['/checkout/adress', '/checkout/summary ']
// }