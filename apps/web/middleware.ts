import createMiddleware from "next-intl/middleware";
import { type NextRequest, NextResponse } from "next/server";
import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { routing } from "./lib/routing";

const intlMiddleware = createMiddleware(routing);

export async function middleware(request: NextRequest) {
  // Handle i18n routing first
  const intlResponse = intlMiddleware(request);

  // For admin routes, check authentication
  const pathname = request.nextUrl.pathname;
  const isAdminRoute = /\/[a-z]{2}\/admin/.test(pathname);
  const isLoginRoute = /\/[a-z]{2}\/admin\/login/.test(pathname);

  if (isAdminRoute && !isLoginRoute) {
    let response = intlResponse || NextResponse.next({ request });

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return request.cookies.getAll();
          },
          setAll(cookiesToSet: Array<{ name: string; value: string; options?: CookieOptions }>) {
            cookiesToSet.forEach(({ name, value }) => {
              request.cookies.set(name, value);
            });
            response = NextResponse.next({ request });
            cookiesToSet.forEach(({ name, value, options }) => {
              response.cookies.set(name, value, options);
            });
          },
        },
      }
    );

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      // Extract locale from URL
      const localeMatch = pathname.match(/^\/([a-z]{2})\//);
      const locale = localeMatch ? localeMatch[1] : "pt";
      const loginUrl = new URL(`/${locale}/admin/login`, request.url);
      loginUrl.searchParams.set("redirectTo", pathname);
      return NextResponse.redirect(loginUrl);
    }

    return response;
  }

  return intlResponse;
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
