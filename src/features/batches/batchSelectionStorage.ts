const STORAGE_KEY = 'arbrain:selected-batch'

/** Persiste o lote selecionado por aba (sessionStorage) para manter o contexto ao recarregar. */
export function readPersistedBatchSelection(): string | null {
  try {
    return sessionStorage.getItem(STORAGE_KEY)
  } catch {
    return null
  }
}

export function persistBatchSelection(batchNumber: string | null): void {
  try {
    if (batchNumber) {
      sessionStorage.setItem(STORAGE_KEY, batchNumber)
    } else {
      sessionStorage.removeItem(STORAGE_KEY)
    }
  } catch {
    // sessionStorage indisponível (modo privado, quota, etc.)
  }
}
