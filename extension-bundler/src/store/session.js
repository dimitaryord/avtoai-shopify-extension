/**
 * Sets a value in sessionStorage.
 * @param {string} key The key under which to store the value.
 * @param {string} value The value to be stored.
 */
export function setItem(key, value) {
    sessionStorage.setItem(key, JSON.stringify(value))
}

/**
 * Gets a value from sessionStorage by key.
 * @param {string} key The key of the value to retrieve.
 * @return {any} The retrieved value, parsed from a stored JSON string.
 */
export function getItem(key) {
    const value = sessionStorage.getItem(key)
    return value ? JSON.parse(value) : null
}

/**
 * Deletes a value from sessionStorage by key.
 * @param {string} key The key of the value to delete.
 */
export function removeItem(key) {
    sessionStorage.removeItem(key)
}

/**
 * Clears all values from sessionStorage for the current session.
 */
export function clear() {
    sessionStorage.clear()
}
