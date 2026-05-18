/** Selectors for https://opensource-demo.orangehrmlive.com */
export const selectors = {
  // Login page
  loginTitle: 'h5',
  usernameInput: 'input[placeholder="Username"]',
  passwordInput: 'input[placeholder="Password"]',
  loginButton: 'button[type="submit"]',
  loginError: '.oxd-alert-content-text',

  // Post-login dashboard
  dashboardTitle: '.oxd-topbar-header-breadcrumb',
  userDropdownName: '.oxd-userdropdown-name',
  sidebarMenu: '.oxd-sidepanel'
} as const;

export const ORANGEHRM_LOGIN_URL =
  'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login';

export const ORANGEHRM_CREDENTIALS = {
  username: 'Admin',
  password: 'admin123'
} as const;