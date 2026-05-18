import { test, expect } from '../../../fixtures/test-fixtures';
import { mapOrderTotals, normalizeNames } from '../../../utils/transform-utils';

test.describe('Week 3 - Task 6 Coding Set @week3 @task6 @coding @ci', () => {
  test('uses async/await to transform array values', async () => {
    const input = ['  alex', 'jo  ', '  PRIYA  '];
    const output = await normalizeNames(input);
    expect(output).toEqual(['ALEX', 'JO', 'PRIYA']);
  });

  test('transforms object array into keyed summary map', async () => {
    const data = [
      { id: 'A1', item: 'Mouse', qty: 2 },
      { id: 'A2', item: 'Keyboard', qty: 1 }
    ];

    const summary = await mapOrderTotals(data);

    expect(summary).toEqual({
      A1: 'Mouse:2',
      A2: 'Keyboard:1'
    });
  });

  test('explains deterministic async behavior in assertions', async () => {
    const names = await normalizeNames([' x ', ' y ']);

    const explanation = {
      concept: 'await resolves async transform before assertion',
      result: names
    };

    expect(explanation).toEqual({
      concept: 'await resolves async transform before assertion',
      result: ['X', 'Y']
    });
  });
});
