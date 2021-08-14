export const getURI = () => {
  if (!PRODUCTION) {
    return `https://${window.location.hostname}:5000`;
  }
  return '';
}