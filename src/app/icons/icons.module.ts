import { NgModule } from '@angular/core';
import {
  IconBriefcase, IconShoppingBag, IconTrash2, IconUser, IconMap, IconDollarSign, IconPhone, IconSearch, IconX, IconChevronDown, IconCheck, IconCreditCard, IconSlash, IconInfo, IconEdit, IconAlertCircle, IconHeart, IconFacebook, IconShare, IconHome, IconInstagram, IconChevronLeft, IconChevronRight, IconChevronUp, IconUserX, IconLogIn, IconSave, IconTag, IconPlusCircle, IconCopy, IconCircle, IconCheckCircle, IconMoreVertical } from 'angular-feather';
import { IconWhatsappComponent } from './whatsapp-icon/whatsapp-icon.component';
import { IconLoadingComponent } from './loading-icon/loading-icon.component';
import { InsertIconComponent } from './insert-icon/insert-icon.component';

const icons = [
  IconBriefcase,
  IconTag,
  IconShoppingBag,
  IconUser,
  IconPhone,
  IconFacebook,
  IconInstagram,
  IconWhatsappComponent,
  IconMap,
  IconHeart,
  IconSearch,
  IconChevronLeft,
  IconChevronRight,
  IconTrash2,
  IconEdit,
  IconChevronDown,
  IconChevronUp,
  IconX,
  IconUserX,
  IconLogIn,
  IconMoreVertical,
  IconSave,
  IconSlash,
  IconLoadingComponent,
  IconAlertCircle,
  IconCheck,
  IconPlusCircle,
  IconCopy,
  IconInfo,
  IconCircle,
  IconCheckCircle,
  IconShare,
  IconDollarSign,
  IconCreditCard,
  InsertIconComponent,
  IconHome
];

@NgModule({
  exports: icons,
  declarations: [ IconWhatsappComponent, IconLoadingComponent, InsertIconComponent ]
})
export class IconsModule { }
