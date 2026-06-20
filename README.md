# ArBrain Frontend

SPA React com arquitetura **feature-driven** para o ERP de cervejas.

## Estrutura

```text
src/
├── app/                  # Router, providers, App root
├── features/
│   ├── beers/            # api, hooks, components, pages
│   └── dashboard/
├── shared/
│   ├── api/              # apiClient (axios)
│   ├── icons/            # componente Icon + estilos
│   └── components/       # Layout, Sidebar, UI compartilhado
├── assets/
│   └── icons/            # SVGs exportados do Figma
└── index.css             # Paleta de cores e tokens
```

## Paleta

| Token | Cor | Uso |
|-------|-----|-----|
| `--color-ink` | `#1D1D2D` | Texto principal |
| `--color-primary` | `#063852` | Sidebar, títulos |
| `--color-muted` | `#ACBBCD` | Texto secundário, bordas |
| `--color-neutral` | `#A4A4A4` | Labels, metadados |
| `--color-surface` | `#E8E8E8` | Fundo da página |
| `--color-accent` | `#FFC524` | Destaque, nav ativo |
| `--color-success` | `#9CDA97` | Estoque OK |
| `--color-danger` | `#FA9897` | Estoque baixo, erros |

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

```jsx
import { Icon } from '../shared/icons/Icon'

<Icon name="home" size={20} />
<Icon name="entrega" size={24} />
```

Lista completa em `src/assets/icons/iconNames.js` (93 ícones).
