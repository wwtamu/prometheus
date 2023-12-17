import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { HomeModule } from './home/home.module';
import { AboutModule } from './about/about.module';
import { RegistrationModule } from './auth/registration/registration.module';
import { LoginModule } from './auth/login/login.module';
import { ProfileModule } from './profile/profile.module';
import { SettingsModule } from './settings/settings.module';
import { SidebarModule } from './sidebar/sidebar.module';
import { FormModule } from './form/form.module';
import { AdminModule } from './admin/admin.module';

import { AppComponent } from './app.component';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { NotificationComponent } from './notification/notification.component';
import { FormModalComponent } from './form/modal/form-modal.component';
import { ConfirmModalComponent } from './modal/confirm/confirm-modal.component';

import { AuthGuard } from './auth/auth.guard';

export { AppComponent } from './app.component';

@NgModule({
  imports: [
    CoreModule,
    SharedModule,
    HomeModule,
    AboutModule,
    RegistrationModule,
    LoginModule,
    ProfileModule,
    SettingsModule,
    SidebarModule,
    FormModule,
    AdminModule,
    AppRoutingModule
  ],
  declarations: [
    AppComponent,
    BreadcrumbComponent,
    HeaderComponent,
    FooterComponent,
    NotificationComponent,
    ConfirmModalComponent
  ],
  providers: [
    AuthGuard
  ],
  entryComponents: [
    FormModalComponent,
    ConfirmModalComponent
  ],
})
export class AppModule {

}
