/**
 * Removes empty, null, or undefined values from an object.
 *
 * @template T
 * @param {T} obj - The object to clean.
 * @returns {Partial<T>} A new object without empty, null, or undefined values.
 *
 * @example
 * const obj = { name: "John", age: null, city: "" };
 * cleanObject(obj); // { name: "John" }
 */
export const cleanObject = <T extends Record<string, unknown>>(
  obj: T
): Partial<T> => {
  return Object.fromEntries(
    Object.entries(obj).filter(
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      ([_, value]) => value !== "" && value !== null && value !== undefined
    )
  ) as Partial<T>;
};
