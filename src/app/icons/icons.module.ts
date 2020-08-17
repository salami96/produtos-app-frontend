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
  IconChevronRight
} from 'angular-feather';
import { IconWhatsappComponent } from './whatsapp-icon/whatsapp-icon.component';

const icons = [
  IconBriefcase,
  IconBookOpen,
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
];

@NgModule({
  exports: icons,
  declarations: [ IconWhatsappComponent ]
})
export class IconsModule { }
