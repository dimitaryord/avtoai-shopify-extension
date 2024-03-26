import { createCookie } from "@remix-run/node";

const cookie = createCookie("assistantsSession", {
  secure: true,
  httpOnly: false,
  maxAge: 60*60*24,
  sameSite: "lax",
  secrets: ["supe1rs3cret4"],
  path: "/",  
});

export { cookie };
