import { NgModule } from '@angular/core';
import {
  IconBriefcase,
  IconBookOpen,
  IconShoppingBag,
  // -------
  IconTrash2,
  IconUser,
  IconGithub,
  IconPlus,
  IconMail,
  IconMap,
  IconDollarSign,
  IconCalendar,
  IconSmartphone,
  IconLinkedin,
  IconImage,
  IconBell,
  IconMenu,
  IconBellOff,
  IconXSquare,
  IconPhone,
  IconHelpCircle,
  IconSearch,
  IconX,
  IconChevronDown,
  IconShoppingCart,
  IconMinus,
  IconArrowLeft,
  IconCheck,
  IconCreditCard,
  IconSlash,
  IconLoader,
  IconInfo,
  IconLock,
  IconGlobe,
  IconEdit,
  IconAlertCircle,
  IconHeart,
  IconTrendingDown,
  IconPlay,
  IconUsers,
  IconFacebook,
  IconStar,
  IconShare,
  IconHome,
  IconInstagram,
  IconChevronLeft,
  IconChevronRight,
  IconEdit2,
  IconChevronUp,
  IconUserX,
  IconLogIn, IconSave, IconTag, IconPlusCircle, IconCopy
} from 'angular-feather';
import { IconWhatsappComponent } from './whatsapp-icon/whatsapp-icon.component';
import { IconLoadingComponent } from './loading-icon/loading-icon.component';

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
  IconSave,
  IconSlash,
  IconLoadingComponent,
  IconAlertCircle,
  IconCheck,
  IconPlusCircle,
  IconCopy
];

@NgModule({
  exports: icons,
  declarations: [ IconWhatsappComponent, IconLoadingComponent ]
})
export class IconsModule { }
