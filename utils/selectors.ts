/** Selectors for https://practicetestautomation.com/practice-test-login/ */
export const selectors = {
  // Login page
  loginTitle: 'h2',
  usernameInput: '#username',
  passwordInput: '#password',
  loginButton: '#submit',
  loginError: '#error',

  // Post-login page
  dashboardTitle: '.post-title',
  userDropdownName: 'a:has-text("Log out")',
  sidebarMenu: 'a:has-text("Log out")'
} as const;

export const LOGIN_URL =
  'https://practicetestautomation.com/practice-test-login/';

export const ORANGEHRM_CREDENTIALS = {
  username: 'student',
  password: 'Password123'
} as const;