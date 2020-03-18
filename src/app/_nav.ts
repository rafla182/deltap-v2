export const navItems = [
  {
    name: 'Dashboard',
    icon: 'icon-speedometer',
    role: 'AdministradorGeral',
    children: [
      {
        name: 'Vendas',
        icon: 'fa fa-users',
        url: '/dashboard',
        role: 'AdministradorGeral'

      },
      {
        name: 'Ranking',
        url: '/dashboard-ranking',
        icon: 'fa fa-building',
        role: 'AdministradorGeral'
      },
      {
        name: 'Volume',
        url: '/dashboard-volume',
        icon: 'fa fa-shopping-bag',
        role: 'AdministradorGeral'
      },
      {
        name: 'Comparativo',
        icon: 'fa fa-user-circle',
        url: '/dashboard-comparativo',
        role: 'AdministradorGeral'
      }
    ]
  },
  {
    name: 'Resumo de Caixa',
    url: '/caixas',
    icon: 'fa fa-building',
    role: 'AdministradorGeral',
  },
  {
    name: 'Lançar',
    url: '/lancamentos',
    icon: 'fa fa-money',
    role: 'AdministradorGeral',
  },
  {
    name: 'Cadastros',
    icon: 'fas fa-cog',
    role: 'AdministradorGeral',
    children: [
      {
        name: 'Vendedores',
        icon: 'fa fa-users',
        url: '/vendedores',
        role: 'AdministradorGeral'
      },
      {
        name: 'Empresas',
        url: '/empresas',
        icon: 'fa fa-building',
        role: 'AdministradorGeral',

      },
      {
        name: 'Lojas',
        url: '/lojas',
        icon: 'fa fa-shopping-bag',
        role: 'AdministradorGeral',

      },
      {
        name: 'Usuarios',
        icon: 'fa fa-user-circle',
        url: '/usuarios',
        role: 'AdministradorGeral',

      }
    ]
  },
  {
    name: 'Configurações',
    icon: 'fas fa-cog',
    role: 'AdministradorGeral',
    children: [
      {
        name: 'Formas de Pagamento',
        url: '/parametros/forma-pagamento',
        icon: 'fas fa-money',
        role: 'AdministradorGeral'
      }
    ]
  },
];
