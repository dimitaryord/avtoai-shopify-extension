import { redirect, createCookie } from "@remix-run/node";
import { exchangeCodeForToken, validateHMAC } from "~/utils/shopifyAuth";
import prisma from "../db.server";

const authCookie = createCookie("authToken", {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax",
  path: "/",
  // add expiration
});

export const loader = async ({ request }) => {
  const url = new URL(request.url);
  const shop = url.searchParams.get("shop");
  const code = url.searchParams.get("code");
  const hmac = url.searchParams.get("hmac");
  console.log(url);
  const secret = process.env.SHOPIFY_API_SECRET;

  if (!hmac || !validateHMAC(hmac, url.searchParams, secret)) {
    return new Response("Unauthorized", { status: 403 });
  }
  if (!code || !shop) {
    return new Response("Bad Request", { status: 400 });
  }
  try {
    // Login to save the access token to the prisma DB
    const accessToken = await exchangeCodeForToken(shop, code);
    // Add the cookie
    const cookieHeader = await authCookie.serialize(accessToken);
    console.log(cookieHeader);

    const existingShop = await prisma.session.findUnique({
      where: { shop: shop },
    });

    if (existingShop) {
      await prisma.session.update({
        where: { shop: shop },
        data: {
          accessToken: accessToken,
          authToken: cookieHeader,
        },
      });
    } else {
      await prisma.session.create({
        data: {
          shop: shop,
          accessToken: accessToken,
          authToken: cookieHeader,
        },
      });
    }
    // url were we are redirecting the user

    // const redirectResponse = new Response(null,{
    //     status: 200,
    //     headers: {
    //       Location: `https://avtoai.com/register?shop=${encodeURIComponent(shop)}`,
    //     },
    //   });

    const redirectResponse = redirect(
      `https://avtoai.com/${
        existingShop ? "login" : "loginp"
      }?shop=${encodeURIComponent(shop)}`
    );

    redirectResponse.headers.append("Set-Cookie", cookieHeader);

    return redirectResponse;
  } catch (error) {
    console.error("Failed to exchange code for access token:", error);

    return new Response("Internal Server Error", { status: 500 });
  }
};
