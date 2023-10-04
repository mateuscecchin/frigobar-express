"use client";

import { Divider } from "@/components/divider";
import { Pessoa } from "@/components/pessoa";
import { useCarrinho, useProdutosPreco } from "@/store/carrinho";
import { formatCurrencyBRL } from "@/utils/currency";
import { ButtonPessoas } from "./ButtonPessoas";

export function PessoaList({ pessoas }: { pessoas: any }) {
  const pessoasSelecionadas = useCarrinho((state) => state.pessoas);
  const preco = useProdutosPreco();
  const addPessoa = useCarrinho((state) => state.addPessoa);

  const valorFormatted = preco / pessoasSelecionadas.length;

  return (
    <>
      <Pessoa>
        {pessoas?.map((pessoa: any) => {
          const precoFormatted = formatCurrencyBRL(valorFormatted);

          return (
            <Pessoa.Item key={pessoa.id} name={pessoa.nome}>
              <Pessoa.Input
                name={pessoa.nome}
                onChange={() => {
                  addPessoa(pessoa);
                }}
              />
              <Pessoa.Info>
                <Pessoa.Thumbnail thumbnail={pessoa.imagem_url} />
                <Pessoa.Name>{pessoa.nome}</Pessoa.Name>
              </Pessoa.Info>
              <Pessoa.Payment>
                {pessoasSelecionadas.some((pes) => pes.nome == pessoa.nome) &&
                  precoFormatted}
              </Pessoa.Payment>
            </Pessoa.Item>
          );
        })}
        <Pessoa.Summary />
      </Pessoa>
      <Divider />
      <ButtonPessoas />
    </>
  );
}
