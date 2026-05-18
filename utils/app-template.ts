export const appHtml = `
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Playwright Lab Dashboard</title>
</head>
<body>
<main>
  <h1 data-testid="page-title">Playwright Lab Dashboard</h1>

  <section>
    <label for="username">Username</label>
    <input id="username" data-testid="username-input" />
    <button data-testid="login-button">Login</button>
    <p data-testid="welcome-message"></p>
  </section>

  <section>
    <button data-testid="load-orders">Load Orders</button>
    <ul data-testid="orders-list"></ul>
  </section>

  <section>
    <button data-testid="load-profile">Load Profile</button>
    <p data-testid="profile-name"></p>
  </section>

  <script>
    const username = document.querySelector('[data-testid="username-input"]');
    const loginButton = document.querySelector('[data-testid="login-button"]');
    const welcomeMessage = document.querySelector('[data-testid="welcome-message"]');
    const loadOrdersButton = document.querySelector('[data-testid="load-orders"]');
    const ordersList = document.querySelector('[data-testid="orders-list"]');
    const loadProfileButton = document.querySelector('[data-testid="load-profile"]');
    const profileName = document.querySelector('[data-testid="profile-name"]');

    loginButton.addEventListener('click', () => {
      const name = (username.value || 'guest').trim() || 'guest';
      welcomeMessage.textContent = 'Welcome, ' + name + '!';
    });

    loadOrdersButton.addEventListener('click', async () => {
      ordersList.innerHTML = '';
      const response = await fetch('https://jsonplaceholder.typicode.com/todos?userId=1');
      const payload = await response.json();
      for (const order of payload.slice(0, 2)) {
        const li = document.createElement('li');
        li.setAttribute('data-testid', 'order-row');
        li.textContent = 'ORD-' + order.id + ' - ' + order.title;
        ordersList.appendChild(li);
      }
    });

    loadProfileButton.addEventListener('click', async () => {
      const response = await fetch('https://jsonplaceholder.typicode.com/users/1');
      const payload = await response.json();
      profileName.textContent = payload.name + ' (' + payload.username + ')';
    });
  </script>
</main>
</body>
</html>
`;