# ArBrain Frontend

SPA **React + TypeScript** com arquitetura **feature-driven** para o ERP fermentativo de cervejas.

## Estrutura

```text
src/
├── app/                        # Router, providers, App root
├── features/
│   ├── beers/                  # api, hooks, pages
│   ├── tanks/
│   ├── fermentation/
│   └── dashboard/
├── shared/
│   ├── api/                    # apiClient, queryKeys
│   ├── types/                  # DTOs e enums da API
│   ├── icons/                  # componente Icon
│   ├── logos/                  # componente Logo
│   └── components/             # Layout, Sidebar, estados de UI
├── assets/
│   ├── icons/                  # SVGs exportados do Figma
│   └── logos/                  # Logos do Frame 170
└── index.css                   # Paleta de cores e tokens
```

Cada feature segue o padrão:

```text
features/<nome>/
├── api/<nome>Api.ts      # chamadas HTTP
├── hooks/use<Nome>.ts    # TanStack Query (queries + mutations)
└── pages/                # telas da rota
```

## Integração com a API

| Feature | Endpoints | Hooks |
|---------|-----------|-------|
| `beers` | CRUD + parâmetros | `useBeers`, `useBeer`, `useBeerParameters`, `useCreateBeer`, `useUpdateBeer`, `useDeleteBeer`, `useUpsertBeerParameters` |
| `tanks` | CRUD | `useTanks`, `useTank`, `useCreateTank`, `useUpdateTank`, `useDeleteTank` |
| `fermentation` | apontamentos + lotes | `useFermentationRecords`, `useFermentationRecord`, `useBatches`, `useBatchHistory`, `useCreateFermentationRecord` |
| `dashboard` | resumo | `useDashboardSummary` |

Tipos compartilhados em `src/shared/types/api.ts` (DTOs, enums e labels).

## Rotas

| Rota | Página | Status |
|------|--------|--------|
| `/` | Dashboard fermentativo | integrado |
| `/cervejas` | Cadastro de cervejas | placeholder |
| `/tanques` | Cadastro de tanques | placeholder |
| `/fermentacao` | Registro de fermentação | placeholder |
| `/lotes` | Histórico de lotes | placeholder |

## Paleta

| Token | Cor | Uso |
|-------|-----|-----|
| `--color-ink` | `#1D1D2D` | Texto principal |
| `--color-primary` | `#063852` | Sidebar, títulos |
| `--color-muted` | `#ACBBCD` | Texto secundário, bordas |
| `--color-neutral` | `#A4A4A4` | Labels, metadados |
| `--color-surface` | `#E8E8E8` | Fundo da página |
| `--color-accent` | `#FFC524` | Destaque, nav ativo |
| `--color-success` | `#9CDA97` | Conformidade OK |
| `--color-danger` | `#FA9897` | Fora do padrão, erros |

## Rodar

```bash
npm install
npm run dev
```

O Vite faz proxy de `/api` para `http://localhost:5242`.

## Ícones (Figma)

Ícones extraídos da seção **Ícones Desktop** do arquivo `Padrões ArBrain - Desafio.fig`.

```bash
npm run icons:export   # re-exporta SVGs do .fig
```

Uso:

```tsx
import { Icon } from '../shared/icons/Icon'

<Icon name="home" size={20} />
<Icon name="entrega" size={24} />
```

Lista completa em `src/assets/icons/iconNames.js` (93 ícones).

## Logos (Figma)

Logos extraídas do **Frame 170** (seção Logos) do arquivo `Padrões ArBrain - Desafio.fig`.

```bash
npm run logos:export   # re-exporta SVGs do .fig
```

Variantes:

| Nome | Uso |
|------|-----|
| `logo-arbrain` | Ícone colorido (#334355 + detalhes brancos) |
| `logo-mark` | Marca (ícone branco, ideal para fundo escuro) |
| `logo-wordmark` | Tipografia "ArBrain" (branca) |

Uso:

```tsx
import { Logo } from '../shared/logos/Logo'

<Logo name="logo-mark" height={36} />
<Logo name="logo-wordmark" height={24} />
```
