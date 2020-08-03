import { NgModule } from '@angular/core';
import { PromsComponent } from './proms/proms.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [PromsComponent],
  imports: [
    RouterModule.forChild([
      { path: '', component: PromsComponent, pathMatch: 'full'}
    ])
  ]
})
export class PromsModule { }
