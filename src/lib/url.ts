/** Prefix an internal path with the deploy base (e.g. "/portfolio"). */
export const url = (path = '/'): string => {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  return `${base}${path.startsWith('/') ? path : `/${path}`}`;
};
