"use client";

import type { ComponentProps } from "react";
import { useState } from "react";
import { MinusIcon, PlusIcon } from "lucide-react";
import {
  Produto,
  useCarrinho,
  useProdutoQuantidade,
} from "../../store/carrinho";

interface Props extends ComponentProps<"input"> {
  produto: Produto;
}

export function ProdutoItemInput({ children, produto, ...rest }: Props) {
  const value = useProdutoQuantidade(produto.id);

  const increment = useCarrinho((state) => state.incrementProduto);
  const decrement = useCarrinho((state) => state.decrementProduto);

  function handleIncrement() {
    increment(produto);
  }

  function handleDecrement() {
    decrement(produto);
  }

  return (
    <div className="bg-white flex items-center rounded p-1">
      <button
        className="text-red-500 p-1 active:text-red-400"
        onClick={handleDecrement}
      >
        <MinusIcon className="w-10 h-10" />
      </button>
      <input
        type="number"
        className="appearance-none outline-none w-12 text-2xl text-center bg-white"
        value={value}
        disabled
        {...rest}
      >
        {children}
      </input>
      <button
        className="text-red-500 p-1 active:text-red-400"
        onClick={handleIncrement}
      >
        <PlusIcon className="w-10 h-10" />
      </button>
    </div>
  );
}
