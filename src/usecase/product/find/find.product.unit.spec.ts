import Product from "../../../domain/product/entity/product";
import FindProductUseCase from "./find.product.usecase";

const product = new Product(
  "123",
  "Product",
  10,
);

const MockRepository = () => {
  return {
    find: jest.fn().mockReturnValue(Promise.resolve(product)),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  }
}

describe("Unit test find Product use case", () => {
  it("Should find a product", async () => {
    const productRepository = MockRepository();
    const usecase = new FindProductUseCase(productRepository);

    const input = {
      id: product.id,
    };
    const output = {
      id: product.id,
      name: product.name,
      price: product.price,
    }
    const result = await usecase.execute(input);

    expect(result).toEqual(output);
  });

  it("Should not find a product", async () => {
    const productRepository = MockRepository();
    productRepository.find.mockImplementation(() => {
      throw new Error("Product not found")
    });
    const usecase = new FindProductUseCase(productRepository);

    const input = {
      id: product.id,
    };

    expect(() => {
      return usecase.execute(input);
    }).rejects.toThrow("Product not found");
  });

});