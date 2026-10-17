import { CartService } from '../src/services/CartServices';
import { CurrencyFormatter } from '../src/utils/CurrencyFormatter';

describe('Shopping Cart', () => {
  it('should calculate cart total and format currency', () => {
    const products = [
      {
        id: 101,
        name: 'Teclado Mecânico',
        price: 250,
      },
    ];

    const total = CartService.calculateTotal(products);

    expect(total).toBe(250);

    expect(
      CurrencyFormatter.toBRL(total)
    ).toBe('R$ 250,00');
  });

  it('should calculate multiple products', () => {
    const products = [
      {
        id: 1,
        name: 'Mouse',
        price: 100,
      },
      {
        id: 2,
        name: 'Teclado',
        price: 250,
      },
    ];

    expect(
      CartService.calculateTotal(products)
    ).toBe(350);
  });
});