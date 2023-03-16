import { FC } from 'react';
import { VkLogoIcon } from './Vk';
import { IconProps } from '../Icons';
import { DefaultWebIcon } from './DefaultWeb';
import { DiscordLogoIcon } from './Discord';
import { FacebookLogoIcon } from './Facebook';
import { FigmaLogoIcon } from './Figma';
import { GoogleLogoIcon } from './Google';
import { InstagramLogoIcon } from './Instagram';
import { MiroLogoIcon } from './Miro';
import { SkypeLogoIcon } from './Skype';
import { TelegramLogoIcon } from './Telegram';
import { TwitchLogoIcon } from './Twitch';
import { ViberLogoIcon } from './Viber';
import { WhatsAppLogoIcon } from './WhatsApp';
import { ZoomLogoIcon } from './Zoom';

export const UrlIcon: FC<{ name: string } & IconProps> = ({
  name,
  ...iconProps
}) => {
  switch (name) {
    case 'vk':
      return <VkLogoIcon {...iconProps} />;
    case 'discord':
      return <DiscordLogoIcon {...iconProps} />;
    case 'facebook':
      return <FacebookLogoIcon {...iconProps} />;
    case 'figma':
      return <FigmaLogoIcon {...iconProps} />;
    case 'google':
      return <GoogleLogoIcon {...iconProps} />;
    case 'instagram':
      return <InstagramLogoIcon {...iconProps} />;
    case 'miro':
      return <MiroLogoIcon {...iconProps} />;
    case 'skype':
      return <SkypeLogoIcon {...iconProps} />;
    case 'telegram':
      return <TelegramLogoIcon {...iconProps} />;
    case 'twitch':
      return <TwitchLogoIcon {...iconProps} />;
    case 'viber':
      return <ViberLogoIcon {...iconProps} />;
    case 'whatsapp':
      return <WhatsAppLogoIcon {...iconProps} />;
    case 'zoom':
      return <ZoomLogoIcon {...iconProps} />;
    default:
      return <DefaultWebIcon {...iconProps} />;
  }
};
