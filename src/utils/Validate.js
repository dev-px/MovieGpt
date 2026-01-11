export function signInValidation(email, password) {
  const isEmailValid = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
    email
  );
  const isPasswordValid = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(
    password
  );
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
