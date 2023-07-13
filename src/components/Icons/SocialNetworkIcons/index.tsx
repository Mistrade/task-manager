import { FC } from 'react';

import { IconProps } from '@components/Icons/Icons';
import { DefaultWebIcon } from '@components/Icons/SocialNetworkIcons/DefaultWeb';
import { DiscordLogoIcon } from '@components/Icons/SocialNetworkIcons/Discord';
import { FacebookLogoIcon } from '@components/Icons/SocialNetworkIcons/Facebook';
import { FigmaLogoIcon } from '@components/Icons/SocialNetworkIcons/Figma';
import { GoogleLogoIcon } from '@components/Icons/SocialNetworkIcons/Google';
import { InstagramLogoIcon } from '@components/Icons/SocialNetworkIcons/Instagram';
import { MiroLogoIcon } from '@components/Icons/SocialNetworkIcons/Miro';
import { SkypeLogoIcon } from '@components/Icons/SocialNetworkIcons/Skype';
import { TelegramLogoIcon } from '@components/Icons/SocialNetworkIcons/Telegram';
import { TwitchLogoIcon } from '@components/Icons/SocialNetworkIcons/Twitch';
import { ViberLogoIcon } from '@components/Icons/SocialNetworkIcons/Viber';
import { VkLogoIcon } from '@components/Icons/SocialNetworkIcons/Vk';
import { WhatsAppLogoIcon } from '@components/Icons/SocialNetworkIcons/WhatsApp';
import { ZoomLogoIcon } from '@components/Icons/SocialNetworkIcons/Zoom';


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