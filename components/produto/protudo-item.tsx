"use client";

import type { ComponentProps } from "react";
import { useProdutoQuantidade } from "../../store/carrinho";

interface Props extends ComponentProps<"li"> {
  produtoId: number;
}

export function ProdutoItem({ children, produtoId, ...rest }: Props) {
  const quantidade = useProdutoQuantidade(produtoId);

  return (
    <li
      data-active={!!quantidade}
      className="w-full gap-3 items-center data-[active=true]:bg-red-100 transition-colors duration-150 bg-gray-100 flex px-6 py-4 rounded"
      {...rest}
    >
      {children}
    </li>
  );
}
