"use client";

import { Button } from "@/components/button";
import { useCarrinho, useProdutosPreco } from "@/store/carrinho";
import { createClient } from "@supabase/supabase-js";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export function ButtonPessoas() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
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

    setSuccess(true);

    await new Promise(() =>
      setTimeout(() => {
        reset();
        router.back();
      }, 1500)
    );
  }

  useEffect(() => {
    if (!error) return;

    setTimeout(() => {
      setError(false);
    }, 1500);
  }, [error]);

  return (
    <Button onClick={handleSubmit} disabled={error} data-success={success}>
      {error && <Error />}
      {!error && !success && <>Finalizar</>}
      {success && <Success />}
    </Button>
  );
}

function Error() {
  return (
    <div className="flex gap-2">
      <AlertCircle />
      <p>Selecione uma pessoa</p>
    </div>
  );
}

function Success() {
  return (
    <div className="flex gap-2">
      <CheckCircle2 />
      <p>Sucesso !</p>
    </div>
  );
}
