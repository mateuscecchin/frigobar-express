import { Produto } from "../components/produto";
import { Divider } from "@/components/divider";
import { ButtonProdutos } from "./components/ButtonProdutos";
import supabase from "@/utils/supabase";

export const dynamic = "force-dynamic";

export default async function Home() {
  const { data } = await supabase.from("produto").select().eq("situacao_id", 1);

  return (
    <>
      <header className="flex flex-col items-center my-6">
        <h1 className="text-red-500 font-bold text-6xl mb-6">Produtos</h1>
        <p className="text-lg text-center mx-4">
          Selecione um produto adicionando uma quantidade a ele
        </p>
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
      </Produto>
      <Produto.Summary />
      <Divider />
      <ButtonProdutos />
    </>
  );
}
