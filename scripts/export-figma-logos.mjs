import { mkdirSync, writeFileSync, readFileSync, unlinkSync, readdirSync } from 'fs'
import { join } from 'path'
import { parseFig, nodeId, resolveVectorNodePaths } from 'openfig-core'

const FIG_FILE = 'Padrões ArBrain - Desafio.fig'
const OUTPUT_DIR = 'src/assets/logos'
const LOGOS_FRAME_ID = '207:2152' // Frame 170

/**
 * Três itens irmãos dentro do Frame 170 (layout horizontal no Figma).
 * Cada entrada gera exatamente um SVG — nunca exportamos o frame pai inteiro.
 */
const LOGO_ITEMS = [
  { id: '207:2153', fileName: 'logo-colored', label: 'LogoArbrain (ícone colorido)' },
  { id: '207:2156', fileName: 'logo-icon-white', label: 'VectorArBrain (ícone branco)' },
  { id: '207:2157', fileName: 'logo-wordmark-white', label: 'VectorArBrain (tipografia branca)' },
]

const doc = parseFig(new Uint8Array(readFileSync(FIG_FILE)))

function paintToFill(paints) {
  if (!paints?.length) return 'currentColor'
  const paint = paints.find((p) => p.visible !== false) ?? paints[0]
  if (!paint?.color) return 'currentColor'
  const { r, g, b, a = 1 } = paint.color
  const opacity = (paint.opacity ?? 1) * a
  if (opacity >= 0.999) {
    const toHex = (v) => Math.round(v * 255).toString(16).padStart(2, '0')
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`
  }
  return `rgba(${Math.round(r * 255)}, ${Math.round(g * 255)}, ${Math.round(b * 255)}, ${opacity})`
}

function collectShapeNodes(node, acc = []) {
  if (['VECTOR', 'BOOLEAN_OPERATION', 'ELLIPSE', 'RECTANGLE', 'STAR', 'LINE'].includes(node.type)) {
    acc.push(node)
  }
  for (const child of doc.childrenMap.get(nodeId(node)) || []) {
    collectShapeNodes(child, acc)
  }
  return acc
}

function nodeToPaths(node) {
  try {
    const resolved = resolveVectorNodePaths(doc, node)
    const paths = []
    for (const entry of [...(resolved.fill ?? []), ...(resolved.stroke ?? [])]) {
      if (entry.svgPath) {
        paths.push({
          d: entry.svgPath,
          fill: paintToFill(entry.paints),
          rule: entry.windingRule === 'EVENODD' || entry.windingRule === 'ODD' ? 'evenodd' : 'nonzero',
        })
      }
    }
    return paths
  } catch {
    return []
  }
}

function exportSingleItem(node) {
  const shapes = node.type === 'VECTOR' ? [node] : collectShapeNodes(node)
  const allPaths = shapes.flatMap(nodeToPaths)
  if (!allPaths.length) return null

  const size = node.size ?? { x: 100, y: 100 }
  const width = Math.ceil(size.x)
  const height = Math.ceil(size.y)

  const pathMarkup = allPaths
    .map((p) => `  <path fill-rule="${p.rule}" d="${p.d}" fill="${p.fill}" />`)
    .join('\n')

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}">\n${pathMarkup}\n</svg>\n`
}

const frame = doc.nodeMap.get(LOGOS_FRAME_ID)
if (!frame) {
  console.error('Frame 170 (Logos) não encontrado no arquivo Figma.')
  process.exit(1)
}

mkdirSync(OUTPUT_DIR, { recursive: true })

const exported = []

for (const item of LOGO_ITEMS) {
  const node = doc.nodeMap.get(item.id)
  if (!node) {
    console.warn(`Nó ${item.id} não encontrado — ${item.label}`)
    continue
  }

  const svg = exportSingleItem(node)
  if (!svg) {
    console.warn(`Sem paths exportáveis — ${item.label} (${item.id})`)
    continue
  }

  const fileName = `${item.fileName}.svg`
  writeFileSync(join(OUTPUT_DIR, fileName), svg)
  exported.push({
    ...item,
    fileName,
    figmaName: node.name,
    pathCount: (svg.match(/<path/g) ?? []).length,
  })
}

const PRESERVED_LOGOS = ['logo-white.svg', 'logo-filled.svg']

const allowed = new Set([...exported.map((e) => e.fileName), ...PRESERVED_LOGOS])
for (const file of readdirSync(OUTPUT_DIR)) {
  if (file.endsWith('.svg') && !allowed.has(file)) {
    unlinkSync(join(OUTPUT_DIR, file))
    console.log(`Removido SVG obsoleto: ${file}`)
  }
}

const indexContent = exported
  .map(({ fileName }) => fileName.replace('.svg', ''))
  .map((name) => `  '${name}',`)
  .join('\n')

writeFileSync(
  'src/assets/logos/logoNames.js',
  `// Auto-generated from Figma — Frame 170 (3 itens separados)\nexport const logoNames = [\n${indexContent}\n]\n`,
)

console.log(`Exportados ${exported.length} logos (itens separados do Frame 170):`)
exported.forEach(({ fileName, label, figmaName, id, pathCount }) => {
  console.log(`  ${fileName} ← ${figmaName} [${pathCount} path(s)] — ${label}`)
})
