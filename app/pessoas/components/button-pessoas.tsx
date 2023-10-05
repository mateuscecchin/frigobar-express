"use client";

import { Button } from "@/components/button";
import { Sucesso } from "@/components/sucesso/page";
import { useCarrinho, useProdutosPreco } from "@/store/carrinho";
import supabase from "@/utils/supabase";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export function ButtonPessoas() {
  const router = useRouter();

  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const pessoasSelecionadas = useCarrinho((state) => state.pessoas);
  const produtos = useCarrinho((state) => state.produtos);
  const reset = useCarrinho((state) => state.reset);
  const preco = useProdutosPreco();

  const valorFormatted = preco / pessoasSelecionadas.length;

  async function handleSubmit() {
    if (!pessoasSelecionadas.length || !produtos.length) {
      setError(true);
      return;
    }
    try {
      pessoasSelecionadas.forEach(async (pes) => {
        const resVenda = await supabase
          .from("venda")
          .insert({
            pessoa_id: pes.id,
            valor: valorFormatted,

            situacao_id: 4,
          })
          .select();

        const venda = resVenda.data?.[0];

        produtos.forEach(async (prod) => {
          const quantidade = prod.quantidade / pessoasSelecionadas.length;

          await supabase.from("venda_item").insert({
            produto_id: prod.id,
            valor: prod.valor * quantidade,
            quantidade,
            venda_id: venda.id,
          });
        });
      });
    } catch (err) {
      setError(true);
    }

    setSuccess(true);

    await new Promise(() =>
      setTimeout(() => {
        reset();
      }, 1500)
    );
  }

  useEffect(() => {
    if (!error) return;

    setTimeout(() => {
      setError(false);
    }, 1500);
  }, [error]);

  if (success) return <Sucesso />;

  return (
    <Button
      onClick={handleSubmit}
      disabled={error || success}
      data-success={success}
    >
      {error && <Error />}
      {!error && <>Concluir</>}
    </Button>
  );
}

function Error() {
  return (
    <div className="flex items-center">
      <AlertCircle className="mr-4" />
      <p>Selecione uma pessoa</p>
    </div>
  );
}
