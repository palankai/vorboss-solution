import { Order } from '../src/dashboard';

function getRndInteger(min: number, max_exl: number) {
  return Math.floor(Math.random() * (max_exl - min)) + min;
}

function pickRandom(items: string[]): string {
  return items[getRndInteger(0, items.length)];
}

function randomProductName() {
  return pickRandom(['bowtie', 'bow', 'fish necklace', 'mouse earrings', 'i heart milk brooch', 'fishbone necklace']);
}

function randomPrice(): string {
  return (1 + Math.random() * 200).toFixed(2);
}

function randomName() {
  return pickRandom(['John', 'Jane', 'Michel', 'Alex', 'Alice', 'Bob', 'Greg']);
}

function randomStatus() {
  return pickRandom(['cancelled', 'shipped', 'placed', 'in_progress']);
}

export function makeOrder(overrides?: { orderPlaced?: Date; status?: string; price?: string }): Order {
  const firstName = randomName();
  const lastName = randomName();
  const email = `${firstName}.${lastName}.${getRndInteger(1000, 10000)}@example.com`;

  const order: Order = {
    orderId: getRndInteger(1, 10000).toString(),
    orderPlaced: overrides?.orderPlaced || new Date(),
    productName: randomProductName(),
    price: overrides?.price || randomPrice(),
    firstName,
    lastName,
    address: `${getRndInteger(1, 100)} ${randomName()} House ${getRndInteger(1, 100)} ${randomName()} Road`,
    email,
    status: overrides?.status || randomStatus(),
  };
  return order;
}
