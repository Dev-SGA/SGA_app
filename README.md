# SGA App — Testes Táticos

App **Next.js** pronto para deploy na **Vercel**: landing e fluxo de testes inspirados na experiência do [GST Tactical Test](https://gst-tactical-test.vercel.app/), com **cores, fontes e logos SGA** (manual 2023).

Micro testes táticos para captar atletas, com briefing, questionário, resultado (nota + perfil) e encaminhamento para produtos SGA Performance.

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

## Mídia (vídeos / thumbnails)

- Hero: configure `videoSrc` em `components/HeroVideo.tsx` ou arquivos em `public/media/`.
- Perguntas: campo opcional `media` em `lib/tests.ts` (`videoSrc`, `poster`).
- Conceitos: `lib/concepts.ts` — substituir placeholders quando os assets estiverem prontos.

## Próximos passos sugeridos

- Substituir links em `lib/products.ts` pelas landing pages reais.
- Integrar formulário de lead (e-mail / WhatsApp) na página de resultado.
- Persistir resultados em API ou CRM.
