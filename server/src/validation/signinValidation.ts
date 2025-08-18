export async function signInValidation(data: {
  email: string;
  password: string;
}) {
  const { email, password } = data;
  const errors: string[] = [];

  // Email validation
  if (!email || email.trim().length === 0) {
    errors.push("Email is required");
  } else {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      errors.push("Please enter a valid email address");
    }
  }

  // Password validation (basic check for signin)
  if (!password || password.length === 0) {
    errors.push("Password is required");
  }

  // Return validation result
  return {
    isValid: errors.length === 0,
    errors: errors,
    sanitizedData: {
      email: email?.trim().toLowerCase(),
      password: password
    }
  };
}
