"use client";

import { Button } from "@/components/button";
import { useCarrinho } from "@/store/carrinho";
import { AlertCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export function ButtonProdutos() {
  const router = useRouter();
  const produtos = useCarrinho((state) => state.produtos);
  const [error, setError] = useState(false);

  function handleNext() {
    console.log("teste");
    if (!produtos.length) {
      setError(true);
      return;
    }

    router.push("/pessoas");
  }

  useEffect(() => {
    if (!error) return;

    setTimeout(() => {
      setError(false);
    }, 1500);
  }, [error]);

  return (
    <Button onClick={handleNext} disabled={error}>
      {error && (
        <div className="flex gap-2 justify-center w-full">
          <AlertCircle />
          <p>Selecione um produto</p>
        </div>
      )}
      {!error && <>Proximo</>}
    </Button>
  );
}
