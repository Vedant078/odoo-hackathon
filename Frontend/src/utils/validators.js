/**
 * Validate email format
 * @param {string} email 
 * @returns {boolean}
 */
export const isValidEmail = (email) => {
  if (!email) return false;
  const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return re.test(String(email).toLowerCase());
};

/**
 * Validate password strength (min 6 characters, has number or letter)
 * @param {string} password 
 * @returns {boolean}
 */
export const isValidPassword = (password) => {
  if (!password) return false;
  return password.length >= 6;
};

/**
 * Validate required field
 * @param {any} value 
 * @returns {boolean}
 */
export const isRequired = (value) => {
  if (value === undefined || value === null) return false;
  if (typeof value === 'string') return value.trim().length > 0;
  return true;
};
