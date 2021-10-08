import { NgModule } from '@angular/core';
import {
  IconBriefcase, IconShoppingBag, IconTrash2, IconUser, IconMap, IconDollarSign, IconPhone, IconSearch, IconX, IconChevronDown, IconCheck, IconCreditCard, IconSlash, IconInfo, IconEdit, IconAlertCircle, IconHeart, IconFacebook, IconShare, IconHome, IconInstagram, IconChevronLeft, IconChevronRight, IconChevronUp, IconUserX, IconLogIn, IconSave, IconTag, IconPlusCircle, IconCopy, IconCircle, IconCheckCircle, IconMoreVertical, IconLink } from 'angular-feather';
import { IconWhatsappComponent } from './whatsapp-icon/whatsapp-icon.component';
import { IconLoadingComponent } from './loading-icon/loading-icon.component';
import { InsertIconComponent } from './insert-icon/insert-icon.component';

const icons = [
  IconAlertCircle,
  IconBriefcase,
  IconCheck,
  IconCheckCircle,
  IconChevronDown,
  IconChevronLeft,
  IconChevronRight,
  IconChevronUp,
  IconCircle,
  IconCopy,
  IconCreditCard,
  IconDollarSign,
  IconEdit,
  IconFacebook,
  IconHeart,
  IconHome,
  IconInfo,
  IconInstagram,
  IconLoadingComponent,
  IconLink,
  IconLogIn,
  IconMap,
  IconMoreVertical,
  IconPhone,
  IconPlusCircle,
  IconSave,
  IconSearch,
  IconShare,
  IconShoppingBag,
  IconSlash,
  IconTag,
  IconTrash2,
  IconUser,
  IconUserX,
  IconWhatsappComponent,
  IconX,
  InsertIconComponent,
];

@NgModule({
  exports: icons,
  declarations: [ IconWhatsappComponent, IconLoadingComponent, InsertIconComponent ]
})
export class IconsModule { }
