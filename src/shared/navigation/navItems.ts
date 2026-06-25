export const navItems = [
  {
    to: '/',
    label: 'Dashboard',
    title: 'Dashboard Fermentativo',
    description: 'Visão geral da conformidade dos apontamentos registrados.',
    icon: 'monitor-dashboard',
    end: true as const,
    searchable: false,
  },
  {
    to: '/cervejas',
    label: 'Cervejas',
    title: 'Cadastro de Cervejas',
    description: 'Gerencie estilos e parâmetros fermentativos aceitáveis.',
    icon: 'beer',
    searchable: true,
    searchPlaceholder: 'Buscar por nome ou estilo...',
  },
  {
    to: '/tanques',
    label: 'Tanques',
    title: 'Cadastro de Tanques',
    description: 'Tanques de fermentação disponíveis na planta.',
    icon: 'tank',
    searchable: true,
    searchPlaceholder: 'Buscar tanque por nome...',
  },
  {
    to: '/fermentacao',
    label: 'Fermentação',
    title: 'Registro de Fermentação',
    description: 'Registre leituras de temperatura, pH e extrato durante a fermentação.',
    icon: 'barrel',
    searchable: true,
    searchPlaceholder: 'Buscar por lote, cerveja ou tanque...',
  },
  {
    to: '/lotes',
    label: 'Lotes',
    title: 'Histórico de Lotes',
    description: 'Selecione um lote para acompanhar a evolução dos apontamentos.',
    icon: 'batch',
    searchable: true,
    searchPlaceholder: 'Buscar lote ou cerveja...',
  },
] as const

export function findNavItem(pathname: string) {
  if (pathname === '/') {
    return navItems[0]
  }

  return navItems.find((item) => item.to !== '/' && pathname.startsWith(item.to))
}
