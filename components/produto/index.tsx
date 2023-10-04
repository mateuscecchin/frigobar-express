import type { ComponentProps } from "react";
import { useState } from "react";
import { ProdutoItemInput } from "./produto-item-input";
import { ProdutoItem } from "./protudo-item";
import { ProdutoSummary } from "./produto-summary";
import { formatCurrencyBRL } from "../../utils/currency";

interface InfoProps {
  description: string;
  price: number;
}

function Root({ ...rest }: ComponentProps<"ul">) {
  return (
    <ul
      className="flex flex-col flex-1 max-h-[650px] space-y-4 overflow-y-auto"
      {...rest}
    />
  );
}

function ItemThumbnail({
  thumbnail,
  ...rest
}: ComponentProps<"span"> & { thumbnail: string }) {
  return (
    <span className="text-3xl" {...rest}>
      {thumbnail}
    </span>
  );
}

function ItemDescription({ ...rest }: ComponentProps<"p">) {
  return <p className="flex flex-1" {...rest} />;
}

function ItemInfo({ description, price }: InfoProps) {
  return (
    <div className="flex flex-col flex-1">
      <p className="text-2xl font-semibold">{description}</p>
      <span className="text-xl">{formatCurrencyBRL(price)}</span>
    </div>
  );
}

export const Produto = Object.assign(Root, {
  Root,
  ItemThumbnail,
  ItemDescription,
  ItemInfo,
  Item: ProdutoItem,
  ItemInput: ProdutoItemInput,
  Summary: ProdutoSummary,
});
