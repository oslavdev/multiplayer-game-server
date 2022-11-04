export const PasswordPattern =
  `^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[-/|\\\\,._:';~"§±#+?!@$%^&*<>(){}[\\]]).{8,}$` as string;
export const EmailPattern = '^\\S+@\\S+\\.\\S{2,}$' as string;
