# SGA App — Testes Táticos

App **Next.js** pronto para deploy na **Vercel**: micro testes táticos para captar atletas, com resultado (nota + perfil) e encaminhamento para produtos SGA Performance.

Identidade visual alinhada ao manual SGA (cores, **Source Sans 3**, **Good Times**, logos em `public/brand/`).

## Desenvolvimento

```bash
npm install
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000).

## Estrutura

| Caminho | Descrição |
|--------|-----------|
| `app/page.tsx` | Lista de testes |
| `app/tests/[slug]/` | Fluxo do questionário |
| `app/resultado/` | Nota, perfil tático e produtos recomendados |
| `lib/tests.ts` | Situações e opções dos testes |
| `lib/products.ts` | Catálogo e CTAs (ajuste `href` para URLs comerciais) |
| `lib/scoring.ts` | Cálculo de nota e perfil |

## Deploy na Vercel

1. Importe o repositório `Dev-SGA/SGA_app` na Vercel.
2. Framework detectado: **Next.js** (`vercel.json`).
3. Build command padrão: `next build`.

## Próximos passos sugeridos

- Substituir links em `lib/products.ts` pelas landing pages reais.
- Integrar formulário de lead (e-mail / WhatsApp) na página de resultado.
- Persistir resultados em API ou CRM.
