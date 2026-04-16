const cache = new Map();

/**
 * Generic cached fetch wrapper
 * @param {string} key
 * @param {Function} fetcher async function that returns data
 * @param {number} ttl optional time in ms
 */
export const getCachedData = async (key, fetcher, ttl = 1000 * 60 * 5) => {
  const now = Date.now();

  const cached = cache.get(key);

  // return cached if still valid
  if (cached && now - cached.timestamp < ttl) {
    return cached.data;
  }

  // fetch fresh
  const data = await fetcher();

  cache.set(key, {
    data,
    timestamp: now,
  });

  return data;
};
