// Validation functions for sign-in and sign-up forms
function validateEmail(email) {
  const isEmailValid = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
    email
  );
  return isEmailValid;
}

// Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, and one number.
function validatePassword(password) {
  const isPasswordValid = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(
    password
  );
  return isPasswordValid;
}

// Returns an error object if validation fails, or null if validation passes
export function signInValidation(email, password) {
  const isEmailValid = validateEmail(email);
  const isPasswordValid = validatePassword(password);
  const error = {};

  if (!isEmailValid) {
    error.email = "Invalid email format.";
  }
  if (!isPasswordValid) {
    error.password =
      "Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, and one number.";
  }
  return Object.keys(error).length > 0 ? error : null;
}

// Returns an error object if validation fails, or null if validation passes
export function signUpValidation(name, email, password) {
  const isNameValid = name.trim().length > 0;
  const isEmailValid = validateEmail(email);
  const isPasswordValid = validatePassword(password);
  const error = {};
  if (!isNameValid) {
    error.name = "Name cannot be empty.";
  }
  if (!isEmailValid) {
    error.email = "Invalid email format.";
  }
  if (!isPasswordValid) {
    error.password =
      "Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, and one number.";
  }
  return Object.keys(error).length > 0 ? error : null;
}

// Validation function for movie ID (should be a positive integer)
export function movieIdValidator(movieId) {
  const isValid = /^\d+$/.test(movieId);
  return !isValid;
}
