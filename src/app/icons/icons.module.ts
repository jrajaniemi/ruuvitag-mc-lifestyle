import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconGithub, IconSun, IconWind, IconDroplet, IconFacebook, IconInstagram, IconHome } from 'angular-feather';
const icons = [
  IconSun,
  IconWind,
  IconDroplet,
  IconGithub, IconFacebook, IconInstagram, IconHome
];

@NgModule({
  imports: icons,
  exports: icons
})
export class IconsModule { }
