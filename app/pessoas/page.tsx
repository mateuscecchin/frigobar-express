import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";
import { PessoaList } from "./components/PessoaList";
import supabase from "@/utils/supabase";

export default async function Pessoas() {
  const { data: pessoas } = await supabase.from("pessoa").select();

  return (
    <>
      <Link href="/">
        <p className="text-red-500 font-semibold flex gap-1 items-center">
          <ArrowLeftIcon className="w-4" /> Back
        </p>
      </Link>
      <header className="flex flex-col items-center gap-6 my-6">
        <h1 className="text-red-500 font-bold text-6xl mb-4">Pessoas</h1>
        <p className="text-xl">Selecione as pessoas</p>
      </header>

      <PessoaList pessoas={pessoas} />
    </>
  );
}
