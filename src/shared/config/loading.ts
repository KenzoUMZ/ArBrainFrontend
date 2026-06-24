/** Só exibe skeleton se o carregamento durar mais que isso (evita flash em loads rápidos). */
export const LOADING_SKELETON_DELAY_MS = 300

/** Duração de um ciclo da animação shimmer (referência para CSS). */
export const SHIMMER_ANIMATION_DURATION_MS = 1500

/**
 * Tempo mínimo que o skeleton permanece visível depois de aparecer.
 * Garante que o shimmer seja percebido mesmo quando a API responde quase instantaneamente.
 */
export const SHIMMER_MIN_VISIBLE_MS = 800
