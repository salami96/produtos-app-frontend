import { NgModule } from '@angular/core';
import { E404Component } from './e404/e404.component';
import { RouterModule } from '@angular/router';
import { DrawModule } from '../draw/draw.module';

@NgModule({
    declarations: [E404Component],
    imports: [
        DrawModule,
        RouterModule.forChild([
            { path: '', component: E404Component, children: [

            ] }
        ]
    )]
})
export class ErrorsModule { }
