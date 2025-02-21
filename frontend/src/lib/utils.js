/**
 * Formats a date/time value into a standardized 24-hour time string
 * @param {Date|string|number} date - Valid date value (Date object, ISO string, or timestamp)
 * @returns {string} Time string in HH:MM format (24-hour clock)
 * @example
 * // Returns "14:30"
 * formatMessageTime(new Date(2023, 0, 1, 14, 30));
 * @example
 * // Returns "09:05"
 * formatMessageTime("2023-01-01T09:05:00Z");
 */
export function formatMessageTime(date) {
  return new Date(date).toLocaleTimeString("en-US", {
    hour: "2-digit",  // Ensures leading zero for single-digit hours
    minute: "2-digit", // Ensures leading zero for single-digit minutes
    hour12: false,    // Forces 24-hour time format
  });
}
