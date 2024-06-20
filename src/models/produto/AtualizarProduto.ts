export default interface AtualizarProduto {
    id: number;
    nome: string;
    descricao: string;
    foto: string;
    valor: number;
    disponivel: boolean;
    subcategoria: {
        id: number;
    }
}