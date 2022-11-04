import { isFulfilled } from '@reduxjs/toolkit';

export const isEmty = (value: unknown) => {
  if (!value) return true;
  return false;
};

export const isEmail = (email: string) => {
  const re =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  return re.test(email);
};

export const isPassword = (password: string) => {
  const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/i;
  return re.test(password);
};

export const isMatch = (password: string, confirmPassword: string) => {
  if (password === confirmPassword) return true;
  return false;
};
