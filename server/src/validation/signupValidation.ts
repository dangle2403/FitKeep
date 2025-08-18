

export async function signUpValidation(data: {
  name: string;
  email: string;
  password: string;
}) {
  const { name, email, password } = data;
  const errors: string[] = [];

  // Name validation
  if (!name || name.trim().length === 0) {
    errors.push("Name is required");
  } else if (name.trim().length < 2) {
    errors.push("Name must be at least 2 characters long");
  } else if (name.trim().length > 50) {
    errors.push("Name must be less than 50 characters");
  } else if (!/^[a-zA-Z\s]+$/.test(name.trim())) {
    errors.push("Name can only contain letters and spaces");
  }

  // Email validation
  if (!email || email.trim().length === 0) {
    errors.push("Email is required");
  } else {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      errors.push("Please enter a valid email address");
    } else if (email.length > 255) {
      errors.push("Email must be less than 255 characters");
    }
  }

  // Password validation
  if (!password) {
    errors.push("Password is required");
  } else {
    if (password.length < 8) {
      errors.push("Password must be at least 8 characters long");
    }
    if (password.length > 128) {
      errors.push("Password must be less than 128 characters");
    }
    if (!/(?=.*[a-z])/.test(password)) {
      errors.push("Password must contain at least one lowercase letter");
    }
    if (!/(?=.*[A-Z])/.test(password)) {
      errors.push("Password must contain at least one uppercase letter");
    }
    if (!/(?=.*\d)/.test(password)) {
      errors.push("Password must contain at least one number");
    }
    if (!/(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])/.test(password)) {
      errors.push("Password must contain at least one special character");
    }
    if (/\s/.test(password)) {
      errors.push("Password cannot contain spaces");
    }
  }

  // Return validation result
  return {
    isValid: errors.length === 0,
    errors: errors,
    sanitizedData: {
      name: name?.trim(),
      email: email?.trim().toLowerCase(),
      password: password // Don't trim password as spaces might be intentional
    }
  };
}