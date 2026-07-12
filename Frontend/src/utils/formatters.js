/**
 * Format a date string or timestamp into a readable format
 * @param {Date|string|number} date 
 * @param {boolean} includeTime 
 * @returns {string}
 */
export const formatDate = (date, includeTime = false) => {
  if (!date) return "-";
  const d = new Date(date);
  if (isNaN(d.getTime())) return "-";
  
  const options = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    ...(includeTime && { hour: '2-digit', minute: '2-digit' })
  };
  
  return d.toLocaleDateString('en-US', options);
};

/**
 * Format currency numbers into USD format
 * @param {number} value 
 * @returns {string}
 */
export const formatCurrency = (value) => {
  if (value === undefined || value === null) return "-";
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  }).format(value);
};

/**
 * Capitalize first letter of a string
 * @param {string} str 
 * @returns {string}
 */
export const capitalize = (str) => {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

/**
 * Humanize internal status slugs (e.g. "in_use" -> "In Use")
 * @param {string} status 
 * @returns {string}
 */
export const formatStatusText = (status) => {
  if (!status) return "";
  return status.split('_').map(word => capitalize(word)).join(' ');
};
