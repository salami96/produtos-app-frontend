import { InjectionToken } from '@angular/core';

export const THEMES = new InjectionToken('THEMES');
export const ACTIVE_THEMES = new InjectionToken('ACTIVE_THEMES');

export interface Theme {
    name: string;
    properties: any;
}
export interface ThemeOptions {
    themes: Theme[];
    active: string;
}
