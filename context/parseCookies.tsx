import cookie from "cookie";

export function parseCookies(req:any) {
  return cookie.parse(req ? req.headers.cookie || "" : document.cookie);
}

export function parseCookies2(req:any) {
  if (process.browser) {
  return cookie.parse(req ? req.headers.cookie || "" : document.cookie);
}
}