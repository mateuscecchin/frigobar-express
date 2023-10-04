import { Produto } from "../components/produto";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { Divider } from "@/components/divider";
import { ButtonProdutos } from "./components/ButtonProdutos";
import { cookies } from "next/headers";

export const dynamic = "force-dynamic";

export default async function Home() {
  const supabase = createServerComponentClient({ cookies });

  const { data } = await supabase.from("produto").select().eq("situacao_id", 1);

  return (
    <>
      <header className="flex flex-col items-center gap-6 my-6">
        <h1 className="text-red-500 font-bold text-4xl">Produtos</h1>
        <p className="text-base">Selecione os produtos</p>
      </header>
      <Produto>
        {data?.map((produto: any) => {
          return (
            <Produto.Item key={produto.id} produtoId={produto.id}>
              <Produto.ItemThumbnail thumbnail={produto.imagem_url} />

              <Produto.ItemInfo
                description={produto.descricao}
                price={produto.valor}
              />

              <Produto.ItemInput
                name={produto.descricao}
                produto={{
                  id: produto.id,
                  quantidade: 0,
                  valor: produto.valor,
                }}
              />
            </Produto.Item>
          );
        })}
        <Produto.Summary />
      </Produto>
      <Divider />
      <ButtonProdutos />
    </>
  );
}
