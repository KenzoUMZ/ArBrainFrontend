import { mkdirSync, writeFileSync, readFileSync } from 'fs'
import { join } from 'path'
import { parseFig, nodeId, resolveVectorNodePaths } from 'openfig-core'

const FIG_FILE = 'Padrões ArBrain - Desafio.fig'
const OUTPUT_DIR = 'src/assets/logos'
const LOGOS_FRAME_ID = '207:2152' // Frame 170 — Logos

/** Nomes estáveis para variantes exportadas do Frame 170. */
const NAME_OVERRIDES = {
  '207:2153': 'logo-arbrain',
  '207:2156': 'logo-mark',
  '207:2157': 'logo-wordmark',
}

const doc = parseFig(new Uint8Array(readFileSync(FIG_FILE)))

function slugify(name) {
  return name
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '') || 'logo'
}

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
  const id = nodeId(node)
  for (const child of doc.childrenMap.get(id) || []) {
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

function exportLogoNode(node) {
  const shapes = collectShapeNodes(node)
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
  console.error('Logos frame (Frame 170) not found')
  process.exit(1)
}

mkdirSync(OUTPUT_DIR, { recursive: true })

const children = doc.childrenMap.get(LOGOS_FRAME_ID) || []
const exported = []

for (const child of children) {
  if (!['FRAME', 'GROUP', 'VECTOR'].includes(child.type)) continue

  const svg = exportLogoNode(child)
  if (!svg) continue

  const childId = nodeId(child)
  const baseName = NAME_OVERRIDES[childId] ?? slugify(child.name)
  const fileName = `${baseName}.svg`

  writeFileSync(join(OUTPUT_DIR, fileName), svg)
  exported.push({ name: child.name, fileName, id: childId })
}

const indexContent = exported
  .map(({ fileName }) => fileName.replace('.svg', ''))
  .sort()
  .map((name) => `  '${name}',`)
  .join('\n')

writeFileSync(
  'src/assets/logos/logoNames.js',
  `// Auto-generated from Figma — Frame 170 (Logos)\nexport const logoNames = [\n${indexContent}\n]\n`,
)

console.log(`Exported ${exported.length} logos to ${OUTPUT_DIR}`)
exported.forEach(({ fileName, name, id }) => console.log(`  ${fileName} ← ${name} (${id})`))
