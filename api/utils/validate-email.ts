import * as Constants from '../constants';

export const validateEmail = (email: string): boolean => {
  return Boolean(email.match(Constants.EmailPattern));
};
