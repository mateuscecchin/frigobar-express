import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";
import { PessoaList } from "./components/PessoaList";
import { getCookieData } from "@/utils/cookie";

export default async function Pessoas() {
  const cookies = await getCookieData();

  const supabase = createServerComponentClient({ cookies });

  const { data: pessoas } = await supabase.from("pessoa").select();

  return (
    <div>
      <Link href="/">
        <p className="text-red-500 font-semibold flex gap-1 items-center">
          <ArrowLeftIcon className="w-4" /> Back
        </p>
      </Link>
      <header className="flex flex-col items-center gap-6 my-6">
        <h1 className="text-red-500 font-bold text-4xl">Pessoas</h1>
        <p className="text-base">Selecione as pessoas</p>
      </header>

      <PessoaList pessoas={pessoas} />
    </div>
  );
}
