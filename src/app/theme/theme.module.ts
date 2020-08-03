import { NgModule, ModuleWithProviders } from '@angular/core';
import { ThemeOptions, THEMES, ACTIVE_THEMES } from './symbols';
import { ThemeDirective } from './theme.directive';
import { ThemeService } from './theme.service';

@NgModule({
  providers: [ ThemeService ],
  declarations: [ ThemeDirective ],
  exports: [ ThemeDirective ],
  imports: [],
})
export class ThemeModule {
  static forRoot(options: ThemeOptions): ModuleWithProviders {
    return {
      ngModule: ThemeModule,
      providers: [
        {
          provide: THEMES,
          useValue: options.themes
        },
        {
          provide: ACTIVE_THEMES,
          useValue: options.active
        }
      ]
    };
  }
}
