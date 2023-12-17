import { Route } from './route';
import { Role } from './app/auth/model/role';

export const routes: any = {
  'home': new Route('home', Role.ROLE_ANONYMOUS),
  'about': new Route('about', Role.ROLE_ANONYMOUS),
  'about/contact': new Route('about/contact', Role.ROLE_ANONYMOUS),
  'registration': new Route('registration', Role.ROLE_ANONYMOUS),
  'login': new Route('login', Role.ROLE_ANONYMOUS),

  'settings': new Route('settings', Role.ROLE_USER),
  'profile': new Route('profile', Role.ROLE_USER),

  'admin': new Route('admin', Role.ROLE_ADMIN),
  'admin/account': new Route('admin/account', Role.ROLE_ADMIN),
  'admin/user': new Route('admin/user', Role.ROLE_ADMIN),
  'admin/application': new Route('admin/application', Role.ROLE_ADMIN)
};
