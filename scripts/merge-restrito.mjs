import { cpSync, rmSync, existsSync } from 'node:fs'
import { resolve } from 'node:path'

const root = resolve(import.meta.dirname, '..')
const source = resolve(root, 'dist-restrito')
const target = resolve(root, 'dist', 'restrito')

if (!existsSync(source)) {
  console.error('dist-restrito não encontrado. Rode "npm run build:restrito" antes.')
  process.exit(1)
}

rmSync(target, { recursive: true, force: true })
cpSync(source, target, { recursive: true })
rmSync(source, { recursive: true, force: true })

console.log('Build restrito mesclado em dist/restrito')
