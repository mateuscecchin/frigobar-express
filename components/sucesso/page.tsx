"use client";

import { CheckCircle2 } from "lucide-react";
import { useRouter } from "next/navigation";

export function Sucesso() {
  const router = useRouter();

  setTimeout(() => {
    router.push("/");
  }, 2000);

  return (
    <div className="absolute flex flex-col items-center justify-center inset-0 min-h-screen min-w-screen bg-green-500">
      <CheckCircle2 className="text-white w-40 h-40" />
      <p className="text-white text-7xl">Sucesso !</p>
    </div>
  );
}
