export async function normalizeNames(values: string[]): Promise<string[]> {
  return values.map((value) => value.trim().toUpperCase());
}

export async function mapOrderTotals(
  orders: Array<{ id: string; item: string; qty: number }>
): Promise<Record<string, string>> {
  return orders.reduce<Record<string, string>>((acc, order) => {
    acc[order.id] = `${order.item}:${order.qty}`;
    return acc;
  }, {});
}