"use client";

import { Button } from "@/components/button";
import { useCarrinho } from "@/store/carrinho";
import {
  AlertCircle,
  ArrowRight,
  ArrowRightFromLine,
  ArrowRightSquare,
  ArrowUpRightIcon,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export function ButtonProdutos() {
  const router = useRouter();
  const produtos = useCarrinho((state) => state.produtos);
  const [error, setError] = useState(false);

  function handleNext() {
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
        <div className="flex items-center justify-center w-full">
          <AlertCircle className="mr-2" />
          <p>Selecione um produto</p>
        </div>
      )}
      {!error && (
        <div className="flex items-center justify-center w-full">
          <p>Proximo</p>
          <ArrowRight className="ml-2" />
        </div>
      )}
    </Button>
  );
}
