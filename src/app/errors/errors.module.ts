import { NgModule } from '@angular/core';
import { E404Component } from './e404/e404.component';
import { RouterModule } from '@angular/router';
import { DrawModule } from '../draw/draw.module';
import { IconsModule } from '../icons/icons.module';

@NgModule({
    declarations: [E404Component],
    imports: [
        DrawModule,
        IconsModule,
        RouterModule.forChild([
            { path: '', component: E404Component, children: [

            ] }
        ]
    )]
})
export class ErrorsModule { }
