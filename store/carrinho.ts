import { create } from "zustand";

interface State {
  produtos: Produto[];
  pessoas: Pessoa[];
}

export interface Pessoa {
  id: number;
  nome: string;
  imagem_url: string;
}

export interface Produto {
  id: number;
  quantidade: number;
  valor: number;
}

interface Action {
  incrementProduto: (produto: Produto) => void;
  decrementProduto: (produto: Produto) => void;
  addPessoa: (pessoa: Pessoa) => void;
  reset: () => void;
}

const initialState: State = {
  produtos: [],
  pessoas: [],
};

export const useCarrinho = create<State & Action>((set, get) => ({
  ...initialState,
  addPessoa: (pessoa: Pessoa) => {
    const pessoas = get().pessoas;

    if (pessoas.some((pes) => pes.nome == pessoa.nome)) {
      const newPessoa = pessoas.filter((s) => s.nome != pessoa.nome);
      set({ pessoas: newPessoa });
      return;
    }

    set({ pessoas: [...pessoas, pessoa] });
  },
  incrementProduto: (produto: Produto) => {
    let produtos = [...get().produtos];
    const produtoIndex = produtos.findIndex((p) => p.id == produto.id);

    if (produtoIndex == -1) {
      const newProduto = {
        ...produto,
        quantidade: 1,
      };
      produtos = [...produtos, newProduto];
    } else {
      produtos[produtoIndex].quantidade += 1;
    }

    set({ produtos });
  },
  decrementProduto: (produto: Produto) => {
    let produtos = [...get().produtos];
    const produtoIndex = produtos.findIndex((p) => p.id == produto.id);
    if (produtoIndex == -1) return;

    const quantidade = produtos[produtoIndex].quantidade;

    if (quantidade == 1) {
      produtos = produtos.filter((p) => p.id != produto.id);
    } else {
      produtos[produtoIndex].quantidade -= 1;
    }

    set({ produtos });
  },

  reset: () => {
    set({ pessoas: [], produtos: [] });
  },
}));

export function useProdutoQuantidade(id: number) {
  const produtoQuantidade = useCarrinho(
    (state) =>
      state.produtos.find((p) => {
        return p.id == id;
      })?.quantidade
  );

  return produtoQuantidade ?? 0;
}

export function useProdutosPreco() {
  const produtoPreco = useCarrinho((state) =>
    state.produtos.reduce(
      (accumulator, current) =>
        accumulator + current.valor * current.quantidade,
      0
    )
  );

  return produtoPreco;
}
