import { cookies } from "next/headers";

export async function getCookieData() {
  const cookieData = cookies().getAll();
  return new Promise((resolve) =>
    setTimeout(() => {
      resolve(cookieData);
    }, 1000)
  ) as any;
} // https://nextjs.org/docs/messages/dynamic-server-error
