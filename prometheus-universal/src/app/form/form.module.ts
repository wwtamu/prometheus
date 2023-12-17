import { NgModule } from '@angular/core';
import { FormBuilder } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';
import { FormComponent } from './form.component';
import { FormFieldComponent } from './field/form-field.component';
import { FormModalComponent } from './modal/form-modal.component';
import { FormService } from './form.service';
import { FormOptionsResolverService } from './form-options-resolver.service';

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [
    FormComponent,
    FormFieldComponent,
    FormModalComponent
  ],
  exports: [
    FormComponent,
    FormFieldComponent,
    FormModalComponent
  ],
  providers: [
    FormBuilder,
    FormService,
    FormOptionsResolverService
  ]
})
export class FormModule { }
