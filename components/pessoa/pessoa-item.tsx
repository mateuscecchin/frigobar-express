"use client";

import { useCarrinho } from "@/store/carrinho";
import { ComponentProps } from "react";

export function PessoaItem({
  children,
  name,
  ...rest
}: ComponentProps<"li"> & { name: string }) {
  const pessoas = useCarrinho((state) => state.pessoas);

  return (
    <li {...rest}>
      <label
        htmlFor={name}
        data-active={!!pessoas.some((pes) => pes.nome == name)}
        className="flex-1 gap-3 items-center data-[active=true]:bg-red-100 transition-colors duration-150 bg-gray-100 flex px-6 py-4 rounded cursor-pointer mb-4"
      >
        {children}
      </label>
    </li>
  );
}
