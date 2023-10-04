import { ComponentProps, useId } from "react";
import { PessoaItem } from "./pessoa-item";
import { PessoaSummary } from "./pessoa-summary";

function Root({ ...rest }: ComponentProps<"ul">) {
  return (
    <ul
      className="flex flex-1 max-h-[650px] flex-col overflow-y-auto mb-3"
      {...rest}
    />
  );
}

function Info({ ...rest }: ComponentProps<"div">) {
  return <div className="flex items-center gap-2 flex-1" {...rest} />;
}

function Name({ ...rest }: ComponentProps<"p">) {
  return <p className="text-2xl font-medium" {...rest} />;
}

function Thumbnail({
  thumbnail,
  ...rest
}: ComponentProps<"span"> & { thumbnail: string }) {
  return (
    <span className="text-3xl" {...rest}>
      {thumbnail}
    </span>
  );
}

function Payment({ ...rest }: ComponentProps<"p">) {
  return <p className="font-bold text-xl" {...rest} />;
}

function Input({ name, ...rest }: ComponentProps<"input">) {
  return (
    <input
      id={name}
      name={name}
      type="checkbox"
      className="sr-only"
      {...rest}
    />
  );
}

export const Pessoa = Object.assign(Root, {
  Root,
  Input,
  Info,
  Name,
  Thumbnail,
  Payment,
  Item: PessoaItem,
  Summary: PessoaSummary,
});
