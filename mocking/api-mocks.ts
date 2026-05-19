import type { Page,Route,Request } from '@playwright/test';

function methodIs(req:Request , method:string){
  return req.method().toUpperCase() === method.toUpperCase();
}

export async function setupApiMocks(page: Page): Promise<void> {
  await page.route('https://jsonplaceholder.typicode.com/todos?userId=1', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify([
        { id: 101, title: 'Keyboard order', completed: false },
        { id: 102, title: 'Monitor order', completed: true }
      ])
    });
  });

  await page.route('https://jsonplaceholder.typicode.com/users/1', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        id: 1,
        name: 'Avery Quinn',
        username: 'qa-engineer'
      })
    });
  });

  await page.route('**/posts', async (route: Route) => {
    const req = route.request();

    if (!methodIs(req, 'POST')) return route.fallback();

    const requestBody = req.postDataJSON() as {
      title: string;
      body: string;
      userId: number;
    };

    await route.fulfill({
      status: 201,
      headers: {
        'content-type': 'application/json; charset=utf-8',
        'access-control-allow-origin': '*',
      },
      body: JSON.stringify({ id: 101, ...requestBody }),
    });
  });

  await page.route('**/posts/1', async (route: Route) => {
    const req = route.request();

    if (methodIs(req, 'GET')) {
      return route.fulfill({
        status: 200,
        headers: {
          'content-type': 'application/json; charset=utf-8',
          'access-control-allow-origin': '*',
        },
        body: JSON.stringify({
          id: 1,
          title: 'mocked-get-title',
          body: 'mocked-get-body',
          userId: 1,
        }),
      });
    }
    if (methodIs(req, 'PUT')) {
      const requestBody = req.postDataJSON() as {
        id: number;
        title: string;
        body: string;
        userId: number;
      };

      return route.fulfill({
        status: 200,
        headers: {
          'content-type': 'application/json; charset=utf-8',
          'access-control-allow-origin': '*',
        },
        body: JSON.stringify(requestBody),
      });
    }
    if (methodIs(req, 'DELETE')) {
      return route.fulfill({
        status: 200,
        headers: {
          'content-type': 'application/json; charset=utf-8',
          'access-control-allow-origin': '*',
        },
        body: JSON.stringify({}),
      });
    }
    return route.fallback();
  });
}
