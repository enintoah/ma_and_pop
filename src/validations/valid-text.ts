export const validText = (str: String) => {
  return typeof str === 'string' && str.trim().length > 0;
}
