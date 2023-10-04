### Funcao getCookieData criada a partir de erro gerado no build;

- Gerencie contextos de execução corretamente: operações JavaScript como setTimeout, setInterval, manipuladores de eventos e promessas criam novos contextos de execução. Você precisa manter o contexto assíncrono ao usar essas operações. Algumas estratégias incluem:

- Invoque a função que depende do contexto assíncrono fora da função que cria um novo contexto de execução.
- Certifique-se de aguardar promessas que invocam uma função que depende do contexto assíncrono, caso contrário, a função poderá ser chamada após a conclusão da operação assíncrona.
  Exemplo de uso correto

```js
import { cookies } from "next/headers";

async function getCookieData() {
  const cookieData = cookies().getAll();
  return new Promise((resolve) =>
    setTimeout(() => {
      resolve(cookieData);
    }, 1000)
  );
}

export default async function Page() {
  const cookieData = await getCookieData();
  return <div>Hello World</div>;
}
```

Link: `https://nextjs.org/docs/messages/dynamic-server-error`
