import AccountDetail from './AccountDetail';
import Accounts from './Accounts';

export const routes = [
  { path: '/accounts', component: Accounts },
  { path: '/accounts/:accoutNumber', component: AccountDetail },
];
