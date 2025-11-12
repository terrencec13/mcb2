/**
 * Onboarding utilities and validation
 */

import { validateEmail, validateName, validateOrganizationName, validatePhone } from './security';

export interface OnboardingData {
  firstName: string;
  lastName: string;
  organization: string;
  phone: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface OnboardingValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}

/**
 * Validates all onboarding form fields
 */
export function validateOnboardingData(data: OnboardingData): OnboardingValidationResult {
  const errors: Record<string, string> = {};

  // First name validation
  if (!data.firstName.trim()) {
    errors.firstName = 'First name is required';
  } else if (!validateName(data.firstName)) {
    errors.firstName = 'First name must be 2-50 characters and contain only letters, spaces, hyphens, or apostrophes';
  }

  // Last name validation
  if (!data.lastName.trim()) {
    errors.lastName = 'Last name is required';
  } else if (!validateName(data.lastName)) {
    errors.lastName = 'Last name must be 2-50 characters and contain only letters, spaces, hyphens, or apostrophes';
  }

  // Organization validation (optional but validate if provided)
  if (data.organization.trim() && !validateOrganizationName(data.organization)) {
    errors.organization = 'Organization name must be 2-100 characters and contain only valid characters';
  }

  // Phone validation (optional but validate if provided)
  if (data.phone.trim() && !validatePhone(data.phone)) {
    errors.phone = 'Please enter a valid phone number';
  }

  // Email validation
  if (!data.email.trim()) {
    errors.email = 'Email is required';
  } else if (!validateEmail(data.email)) {
    errors.email = 'Please enter a valid email address';
  }

  // Password validation
  if (!data.password) {
    errors.password = 'Password is required';
  } else if (data.password.length < 8) {
    errors.password = 'Password must be at least 8 characters long';
  }

  // Confirm password validation
  if (!data.confirmPassword) {
    errors.confirmPassword = 'Please confirm your password';
  } else if (data.password !== data.confirmPassword) {
    errors.confirmPassword = 'Passwords do not match';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

/**
 * Formats phone number for display
 */
export function formatPhoneNumber(phone: string): string {
  const digitsOnly = phone.replace(/\D/g, '');
  
  if (digitsOnly.length === 10) {
    return `(${digitsOnly.slice(0, 3)}) ${digitsOnly.slice(3, 6)}-${digitsOnly.slice(6)}`;
  }
  
  return phone;
}

