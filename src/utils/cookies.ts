export const getCookieFromObject = (cookies: object): string => {
  const cookiesArr = Object.keys(cookies).map(cookieKey => {
    const cookieItem: object = cookies[cookieKey];
    return `${cookieItem['name']}=${cookieItem['value']}`;
  });

  return cookiesArr.join('; ');
};
