/**
 * Checks if string is SBN
 * @param {string} isbn - ISBN strng
 * @returns {boolean} true if length of isbn equals 9
 */
export function isSbn(isbn) {
    return isbn.length === 9;
}

/**
 * Checks if string is ISBN-10
 * @param {string} isbn - ISBN strng
 * @returns {boolean} true if length of isbn equals 10
 */
export function isIsbn10(isbn) {
    return isbn.length === 10;
}

/**
 * Checks if string is ISBN-13
 * @param {string} isbn - ISBN strng
 * @returns {boolean} true if length of isbn equals 13
 */
export function isIsbn13(isbn) {
    return isbn.length === 13;
}

/**
 * Checks if string is one of ISBN types
 * @param {string} isbn - ISBN strng
 * @returns {boolean} true if string is one of ISBN types
 */
export function checkIsbnLength(isbn) {
    return isSbn(isbn) || isIsbn10(isbn) || isIsbn13(isbn);
}

/**
 * Converts ISBN to one of ISBN type's name
 * @param {string} isbn - ISBN strng
 * @returns {"SBN" | "ISBN-10" | "ISBN-13"} string representation of ISBN type
 */
export function isbnTypeName(isbn) {
    if (isSbn(isbn)) {
        return "SBN";
    }

    if (isIsbn10(isbn)) {
        return "ISBN-10";
    }

    return "ISBN-13";
}

/**
 * Checks if ISBN string contains invalid characters
 *
 * @param {string} isbn - ISBN string representation
 * @returns {string | true} invalid char or true if string does not contains any invalid characters
 */
export function hasInvalidCharacters(isbn) {
    const validChars =
        isSbn(isbn) || isIsbn10(isbn) ? "0123456789Xx" : "0123456789";

    for (const char of isbn) {
        if (validChars.indexOf(char) === -1) {
            return char;
        }
    }

    return false;
}

/**
 * Converts ISBN string to digit array (X in ISBN-10 also supported)
 *
 * @param {string} isbn - ISBN string representation
 * @returns {number[]} array of digits, converted to numbers
 */
export function toIsbnDigits(isbn) {
    return [...isbn].map(char => 
        char.toLowerCase() === "x" ? 10 : Number.parseInt(char));
}

/**
 * Calculates check sum of ISBN-10
 *
 * @param {number[]} digits - ISBN-10 digit array
 * @returns {number} check sum of ISBN-10
 */
export function checksumIsbn10(digits) {
    let sum = 0;
    for (let i = 0; i < 9; i++) {
        sum += (10 - i) * digits[i];
    }

    const digit = (11 - (sum % 11)) % 11;
    return digit === 10 ? "X" : digit;
}

/**
 * Calculates check sum of ISBN-13
 *
 * @param {number[]} digits - ISBN-13 digit array
 * @returns {number} check sum of ISBN-13
 */
export function checksumIsbn13(digits) {
    // Helper function, returns 1 if x is odd, 3 otherwise
    function factor(x) {
        return (x % 2 === 1) ? 1 : 3;
    }

    let sum = 0;
    for (let i = 0; i < 12; i++) {
        sum += factor(i+1) * digits[i];
    }

    return (10 - (sum % 10)) % 10;
}

/**
  * Checks if ISBN-10 checksum is correct
  * 
  * @param {string} isbn10 
  * @returns {boolean} true if checksum is correct, false otherwise
  */
export function checkChecksumIsbn10(isbn10) {
    const digits = toIsbnDigits(isbn10);
    const checksum = checksumIsbn10(digits);

    return digits[digits.length - 1] === checksum;
}

/**
  * Checks if ISBN-13 checksum is correct
  * 
  * @param {string} isbn13
  * @returns {boolean} true if checksum is correct, false otherwise
  */
export function checkChecksumIsbn13(isbn13) {
    const digits = toIsbnDigits(isbn13);
    const checksum = checksumIsbn13(digits);

    return digits[digits.length - 1] === checksum;
}

/**
  * Converts SBN to ISBN-10
  * @param {string} sbn - SBN string
  * @returns {string} ISBN-10 string
  */
export function sbnToIsbn10(sbn) {
    const isbn10 = "0" + sbn;

    if (!checkChecksumIsbn10(isbn10)) {
        return { result: "Error: SBN invalid checksum", isError: true };
    }

    return { result: isbn10, isError: false };
}

/**
  * Converts ISBN-10 to ISBN-13
  * @param {string} isbn10 - ISBN-10 string
  * @returns {string} ISBN-13 string
  */
export function isbn10ToIsbn13(isbn10) {
    if (!checkChecksumIsbn10(isbn10)) {
        return { result: "Error: ISBN-10 invalid checksum", isError: true };
    }

    const isbn13WithoutChecksum = "978" + isbn10.substring(0, 9);

    return {
        result:
            isbn13WithoutChecksum +
            checksumIsbn13(toIsbnDigits(isbn13WithoutChecksum)),
        isError: false,
    };
}

/**
  * Converts any ISBN to ISBN-13
  * @param {string} isbn - ISBN string
  * @returns {string} ISBN-13 string
  */
export function toIsbn13(isbn) {
    if (isIsbn13(isbn)) {
        if (!checkChecksumIsbn13(isbn)) {
            return { result: "Error: ISBN-13 invalid checksum", isError: true };
        }

        return { result: isbn, isError: false };
    }

    if (isSbn(isbn)) {
        const isbn10ConversionResult = sbnToIsbn10(isbn);

        return isbn10ConversionResult.isError
            ? isbn10ConversionResult
            : isbn10ToIsbn13(isbn10ConversionResult.result);
    }

    return isbn10ToIsbn13(isbn);
}

/**
  * Checks if ISBN is valid ISBN and returns its ISBN-13 value
  * @param {string} isbn - ISBN string
  * @returns {string | null} ISBN-13 string or error message
  */
export function validateIsbn(isbn) {
    const value = isbn.replace(/[- ]/g, "");

    if (!checkIsbnLength(value)) {
        return "Error: ISBN should contain 9, 10 or 13 digits";
    }

    const invalidChar = hasInvalidCharacters(value);
    if (invalidChar) {
        const isbnType = isbnTypeName(value);
        return `Error: ${isbnType} can not contain character '${invalidChar}'`;
    }

    const isbn13ConversionResult = toIsbn13(value);

    if (isbn13ConversionResult.isError) {
        return isbn13ConversionResult.result;
    }

    return null;
}