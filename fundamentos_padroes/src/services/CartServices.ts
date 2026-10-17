import { Product } from '../models/Product';

export class CartService {
  static calculateTotal(products: Product[]): number {
    return products.reduce(
      (total, product) => total + product.price,
      0,
    );
  }
}