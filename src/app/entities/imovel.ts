export interface Imovel {

  id?: number
  logradouro: string;
  numero: string;
  bairro: string;
  cidade: string;
  uf: string;
  cep: string;
  tipo: string;
  descricao: string;
  valor: number;
  disponivel: boolean;
}
