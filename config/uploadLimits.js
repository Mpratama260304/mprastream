/**
 * Central configuration for upload limits.
 * All file size limits should be imported from this module to ensure consistency.
 */

// Read from environment variables with sensible defaults
const MAX_VIDEO_SIZE_GB = parseInt(process.env.MAX_VIDEO_SIZE_GB, 10) || 200;
const CHUNK_SIZE_MB = parseInt(process.env.CHUNK_SIZE_MB, 10) || 50;

// Computed values in bytes
const MAX_VIDEO_SIZE_BYTES = MAX_VIDEO_SIZE_GB * 1024 * 1024 * 1024;
const CHUNK_SIZE_BYTES = CHUNK_SIZE_MB * 1024 * 1024;

// Express body parser limit for chunk uploads (chunk size + 10MB buffer for headers/overhead)
const CHUNK_BODY_LIMIT = `${CHUNK_SIZE_MB + 10}mb`;

// Express body parser limit for JSON payloads on upload routes
const UPLOAD_BODY_LIMIT = `${MAX_VIDEO_SIZE_GB}gb`;

/**
 * Format bytes to human-readable string (e.g., "200 GB")
 * @param {number} bytes - Size in bytes
 * @param {number} decimals - Number of decimal places
 * @returns {string} Formatted size string
 */
function formatBytes(bytes, decimals = 2) {
  if (!bytes || bytes === 0) return '0 B';
  
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
  
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

/**
 * Format size in GB for display messages
 * @param {number} bytes - Size in bytes
 * @returns {string} Formatted size in GB (e.g., "200GB")
 */
function formatAsGB(bytes) {
  const gb = bytes / (1024 * 1024 * 1024);
  return `${Math.round(gb)}GB`;
}

/**
 * Check if a file size exceeds the maximum allowed video size
 * @param {number} fileSize - File size in bytes
 * @returns {boolean} True if file is too large
 */
function isFileTooLarge(fileSize) {
  return fileSize > MAX_VIDEO_SIZE_BYTES;
}

/**
 * Get the maximum file size error message
 * @returns {string} Error message with the configured max size
 */
function getFileTooLargeMessage() {
  return `File too large. Maximum size is ${formatAsGB(MAX_VIDEO_SIZE_BYTES)}.`;
}

module.exports = {
  // Size limits
  MAX_VIDEO_SIZE_GB,
  MAX_VIDEO_SIZE_BYTES,
  CHUNK_SIZE_MB,
  CHUNK_SIZE_BYTES,
  CHUNK_BODY_LIMIT,
  UPLOAD_BODY_LIMIT,
  
  // Helper functions
  formatBytes,
  formatAsGB,
  isFileTooLarge,
  getFileTooLargeMessage
};
