# Playwright Capstone – SauceDemo E2E Test Automation Framework

End-to-end test automation framework for [https://www.saucedemo.com](https://www.saucedemo.com) built with **Playwright + TypeScript** following the **Page Object Model (POM)** design pattern.

---

## Project Structure

```
PlaywrightCapstoneWork-LAB/
├── pages/                    # Page Object Model classes
│   ├── LoginPage.ts
│   ├── InventoryPage.ts
│   ├── CartPage.ts
│   └── CheckoutPage.ts
│
├── tests/                    # Test specifications
│   ├── login.spec.ts         # Login scenarios
│   ├── inventory.spec.ts     # Product listing, details, sorting
│   ├── cart.spec.ts          # Cart add/remove/badge
│   ├── checkout.spec.ts      # Checkout flow & order confirmation
│   └── advanced.spec.ts      # Mobile, network failure, a11y, API mocking
│
├── playwright.config.ts      # Playwright configuration
├── package.json
├── tsconfig.json
└── README.md
```

---

## Prerequisites

- **Node.js** >= 18
- **npm** >= 9

---

## Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Install Playwright browsers

```bash
npx playwright install
```

### 3. Configure environment variables

Create a `.env` file in the project root:

```env
BASE_URL=https://www.saucedemo.com
S_USERNAME=standard_user
PASSWORD=secret_sauce
CHECKOUT_FIRST_NAME=John
CHECKOUT_LAST_NAME=Doe
CHECKOUT_POSTAL_CODE=560001
```

---

## Running Tests

| Command | Description |
|---------|-------------|
| `npm test` | Run all tests on Chromium (default) |
| `npm run test:all` | Run all tests on all configured browsers |
| `npm run test:chromium` | Run on Chromium only |
| `npm run test:firefox` | Run on Firefox only |
| `npm run test:webkit` | Run on WebKit (Safari engine) |
| `npm run test:mobile` | Run `advanced.spec.ts` on Mobile Chrome & Mobile Safari |
| `npm run test:headed` | Run on Chromium in headed (visible browser) mode |
| `npm run test:ui` | Open Playwright UI mode |
| `npm run test:debug` | Run in step-by-step debug mode |
| `npm run test:report` | Open the last HTML report |

### Run a single spec file

```bash
npx playwright test tests/login.spec.ts --project=chromium
```

### Run a specific test by name

```bash
npx playwright test -g "Valid Login" --project=chromium
```

---

## Test Coverage

### Login (`login.spec.ts`)
| Test | Description |
|------|-------------|
| Valid Login | Logs in with correct credentials and verifies inventory page |
| Invalid Login | Wrong password – verifies error message |
| Locked User Login | Locked account – verifies locked-out error message |
| Empty Field Validation | Empty username – verifies required field error |

### Product Validation (`inventory.spec.ts`)
| Test | Description |
|------|-------------|
| Verify Product Listing | 6 products displayed on inventory page |
| Verify Product Details | First item has name, price, description visible |
| Validate Name, Price, Description | All 6 products have non-empty name, valid `$X.XX` price, non-empty description |
| Sort Name A–Z | Products sorted alphabetically ascending |
| Sort Name Z–A | Products sorted alphabetically descending |
| Sort Price Low–High | Prices in ascending order |
| Sort Price High–Low | Prices in descending order |

### Cart (`cart.spec.ts`)
| Test | Description |
|------|-------------|
| Add Products to Cart | Adds item, badge shows 1, item visible in cart |
| Remove Products from Cart | Removes item from cart, cart is empty |
| Validate Cart Badge Count | Badge updates correctly on add/remove |
| Add Multiple Products | Adds 3 products, cart shows 3 items |

### Checkout (`checkout.spec.ts`)
| Test | Description |
|------|-------------|
| Checkout with Empty Fields | Submitting blank form shows error |
| Complete Successful Checkout | Full flow from add-to-cart to order complete |
| Verify Order Confirmation | "Thank you for your order!" message verified |

### Advanced Scenarios (`advanced.spec.ts`)
| Test | Description |
|------|-------------|
| **Mobile Viewport** – Login renders | Login inputs visible at 390×844 |
| **Mobile Viewport** – Inventory renders | All 6 products visible on mobile |
| **Mobile Viewport** – Add to cart | Cart works end-to-end on mobile |
| **Network Failure** – Abort images | Page loads without images (`route.abort()`) |
| **Network Failure** – Abort CSS | Form elements still present with no styles |
| **Network Failure** – Abort cart nav | Navigation failure handled gracefully |
| **Accessibility** – Input placeholders | Username/password inputs have placeholders |
| **Accessibility** – Login button ARIA | Button accessible by `getByRole` |
| **Accessibility** – Image alt attributes | Every product image has an `alt` attribute |
| **Accessibility** – Keyboard focus | Cart link is keyboard-focusable |
| **Accessibility** – Product names | All 6 product names visible and non-empty |
| **API Mocking** – Intercept inventory | `route.fulfill()` passes through real response |
| **API Mocking** – Mock product images | Images replaced with SVG placeholder |
| **API Mocking** – Intercept cart | Cart page intercepted and fulfilled |

---

## Framework Features

### Page Object Model (POM)
Each page is encapsulated in a dedicated class under `pages/`:
- `LoginPage` – navigation, login, error locators
- `InventoryPage` – product list, details, sort
- `CartPage` – add/remove products, cart badge, open cart
- `CheckoutPage` – fill form, continue, finish, confirmation

### Parallel Execution
`fullyParallel: true` with `workers: 4` (local) / `workers: 2` (CI) runs tests concurrently across files.

### Retry Strategy
`retries: 2` automatically re-runs failing tests twice to handle flaky network conditions.

### Failure Artifacts
On test failure, Playwright automatically captures:
- **Screenshots** (`screenshot: 'only-on-failure'`)
- **Videos** (`video: 'retain-on-failure'`)
- **Traces** (`trace: 'on-first-retry'`) – open with `npx playwright show-trace trace.zip`

### HTML Report
Generated automatically after every run in `playwright-report/`. Open with:
```bash
npm run test:report
```

### Multi-Browser / Multi-Device Projects
| Project | Device |
|---------|--------|
| chromium | Desktop Chrome |
| firefox | Desktop Firefox |
| webkit | Desktop Safari |
| Mobile Chrome | Pixel 5 (390×851) |
| Mobile Safari | iPhone 12 (390×844) |

Mobile projects run `advanced.spec.ts` only.

---

## Environment Variables Reference

| Variable | Default | Description |
|----------|---------|-------------|
| `BASE_URL` | `https://www.saucedemo.com` | Application base URL |
| `S_USERNAME` | — | Valid login username |
| `PASSWORD` | — | Valid login password |
| `CHECKOUT_FIRST_NAME` | `John` | Checkout first name |
| `CHECKOUT_LAST_NAME` | `Doe` | Checkout last name |
| `CHECKOUT_POSTAL_CODE` | `560001` | Checkout postal code |

---

## Viewing Traces

After a test failure with retry, a trace file is saved under `test-results/`. Open it with:

```bash
npx playwright show-trace test-results/<test-folder>/trace.zip
```
