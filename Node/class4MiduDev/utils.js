import { createRequire } from 'node:module';

const requirePropio = createRequire(import.meta.url);
export const readJson = (path) => requirePropio(path) // importamos las movies con la funcion require que cree
