export default (obj: unknown): boolean => obj
  && Object.keys(obj).length === 0
  && Object.getPrototypeOf(obj) === Object.prototype;
