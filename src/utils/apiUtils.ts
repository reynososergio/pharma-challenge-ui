/**
 * Replaces placeholders in an endpoint URL with actual parameter values.
 *
 * @param {string} endpoint - The endpoint URL containing placeholders (e.g., "/users/{id}").
 * @param {Record<string, string>} params - An object containing key-value pairs where the key is the placeholder name, and the value is its replacement.
 * @returns {string} The formatted endpoint with replaced values.
 *
 * @example
 * const endpoint = "/users/{id}/posts/{postId}";
 * const params = { id: "123", postId: "456" };
 * getEndpoint(endpoint, params); // "/users/123/posts/456"
 */
export const getEndpoint = (
  endpoint: string,
  params: Record<string, string>
) => {
  return Object.keys(params).reduce(
    (acc, key) => acc.replace(`{${key}}`, params[key]),
    endpoint
  );
};
