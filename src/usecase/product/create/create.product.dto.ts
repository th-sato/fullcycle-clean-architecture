export interface InputCreateProdutoDto {
  type: string,
  name: string,
  price: number,
}

export interface OutputCreateProdutoDto {
  id: string,
  name: string,
  price: number,
}