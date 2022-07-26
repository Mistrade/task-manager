import { FlexBlock } from '../../../LayoutComponents/FlexBlock'
import React, { ReactNode, useRef, useState } from 'react'
import { DefaultTextInputProps, TextInput } from '../../TextInput'
import { currentColor, hoverColor } from '../../../../common/constants'
import * as yup from 'yup'
import { Button, LinkButton, WhiteButton } from '../../../Buttons/Buttons.styled'
import { VkLogoIcon } from '../../../Icons/SocialNetworkIcons/Vk'
import { InstagramLogoIcon } from '../../../Icons/SocialNetworkIcons/Instagram'
import { GoogleLogoIcon } from '../../../Icons/SocialNetworkIcons/Google'
import { FacebookLogoIcon } from '../../../Icons/SocialNetworkIcons/Facebook'
import { WhatsAppLogoIcon } from '../../../Icons/SocialNetworkIcons/WhatsApp'
import { FigmaLogoIcon } from '../../../Icons/SocialNetworkIcons/Figma'
import { TelegramLogoIcon } from '../../../Icons/SocialNetworkIcons/Telegram'
import { ZoomLogoIcon } from '../../../Icons/SocialNetworkIcons/Zoom'
import { DefaultWebIcon } from '../../../Icons/SocialNetworkIcons/DefaultWeb'
import { MiroLogoIcon } from '../../../Icons/SocialNetworkIcons/Miro'
import { ViberLogoIcon } from '../../../Icons/SocialNetworkIcons/Viber'
import { SkypeLogoIcon } from '../../../Icons/SocialNetworkIcons/Skype'
import { TwitchLogoIcon } from '../../../Icons/SocialNetworkIcons/Twitch'
import { DiscordLogoIcon } from '../../../Icons/SocialNetworkIcons/Discord'
import { UrlIcon } from '../../../Icons/SocialNetworkIcons'

export interface SelectLinksProps {
  label?: string,
  onChange: ( value: { key: string, value: string } | null ) => void,
  tooltip?: DefaultTextInputProps['tooltip']
}

interface LinkItem {
  key: string,
  pattern: string | Array<string>,
}

const linkList: Array<LinkItem> = [
  {
    key: 'vk',
    pattern: 'vk.com'
  },
  {
    key: 'instagram',
    pattern: 'instagram.com'
  },
  {
    key: 'google',
    pattern: ['google.com', 'meet.google.com', 'mail.google.com', 'youtube.com']
  },
  {
    key: 'facebook',
    pattern: 'facebook.com'
  },
  {
    key: 'whatsApp',
    pattern: 'whatsapp.com'
  },
  {
    key: 'figma',
    pattern: 'figma.com'
  },
  {
    key: 'telegram',
    pattern: 'telegram.org'
  },
  {
    key: 'zoom',
    pattern: 'zoom.us'
  },
  {
    key: 'miro',
    pattern: 'miro.com'
  },
  {
    key: 'viber',
    pattern: 'viber.com'
  },
  {
    key: 'skype',
    pattern: 'skype.com'
  },
  {
    key: 'twitch',
    pattern: 'twitch.tv'
  },
  {
    key: 'discord',
    pattern: 'discord.com'
  }
]

const DefaultIcon = <DefaultWebIcon size={24} color={currentColor}/>

export function SelectLinks<T>( {
                                  label,
                                  onChange,
                                  tooltip,
                                  ...props
                                }: SelectLinksProps ): JSX.Element {


  //TODO компонент должен принимать только ссылки, при визуализации показывать только домен, без пути
  //TODO так же для ссылки можно добавить описание и выбрать одну основную ссылку
  //TODO если в домене ссылки удалось распознать какой-то популярный ресурс например ВК, скайп или зум - то поставить логотип, если не удалось, установить дефолтный логотип WWW
  //TODO если ссылка корректная и проходит валидацию, должна быть кнопка "перейти"
  //TODO каждая ссылка должна открываться в новом окне

  const [link, setLink] = useState<{ key: string, value: string }>( { key: 'default', value: '' } )
  const ref = useRef<HTMLInputElement>( null )
  const [loading, setLoading] = useState<boolean>( false )
  const [isSecure, setIsSecure] = useState( true )
  const [showNotification, setShowNotification] = useState( true )

  const changeIconHandler = async ( value: string ): Promise<string> => {
    setLoading( true )
    const url = new URL( value )

    if( url.protocol === 'http:' ) {
      setIsSecure( false )
    } else {
      setIsSecure( true )
    }


    const host = url.host.replace( 'www.', '' )
    const index = linkList.findIndex( ( value, index ) => {
      if( Array.isArray( value.pattern ) ) {
        return value.pattern.some( ( pattern ) => {
          const r = new RegExp( pattern, 'i' )
          return r.test( host )
        } )
      }
      const r = new RegExp( value.pattern, 'i' )
      return r.test( host )
    } )

    setLoading( false )

    if( index < 0 ) {
      return 'default'
    } else {
      return linkList[ index ].key
    }
  }


  return (
    <FlexBlock justify={'flex-start'} gap={6} width={'100%'} wrap={'wrap'}>
      <FlexBlock width={'100%'} gap={12} wrap={'nowrap'}>
        <FlexBlock width={'100%'}>
          <TextInput
            label={label || ''}
            ref={ref}
            tooltip={tooltip}
            placeholder={'Например: https://example.com/video/1234567890'}
            value={link.value}
            isLoading={loading}
            icon={<UrlIcon name={link.key}/>}
            iconPlacement={'right'}
            onBlur={async ( e ) => {
              if( e.target.value.length < 4 ) {
                setIsSecure( true )
                const result = {
                  key: 'default', value: e.target.value
                }
                setLink( result )
                onChange && onChange( null )
                return
              }

              const isUrl = yup.string().url().isValidSync( e.target.value )
              if( isUrl ) {
                changeIconHandler( e.target.value )
                  .then( r => {
                    const result = {
                      key: r,
                      value: link.value
                    }
                    setLink( result )
                    onChange && onChange( result )
                  } )
              } else {
                setLink( { key: 'default', value: '' } )
                onChange && onChange( null )
              }
            }}
            onChange={( e ) => {
              setLink( prev => ( { key: prev.key, value: e.target.value } ) )
            }}
          />
        </FlexBlock>
        {link.value && (
          <FlexBlock justify={'flex-end'} align={'flex-end'} height={'100%'}>
            <LinkButton
              href={link.value}
              target={'_blank'}
              rel={''}
              resource={''}
            >
              Проверить
            </LinkButton>
          </FlexBlock>
        )}
      </FlexBlock>
      {!isSecure && showNotification && (
        <FlexBlock
          border={`1px solid ${currentColor}`}
          bgColor={hoverColor}
          width={'100%'}
          borderRadius={4}
          p={16}
          wrap={'nowrap'}
          align={'flex-start'}
        >
          <FlexBlock width={'100%'}>
            Внимание! Вы используете НЕ БЕЗОПАСНУЮ ссылку.
            <br/>
            Заменить на безопасную?
          </FlexBlock>
          <FlexBlock mt={6} gap={6}>
            <Button
              onClick={() => {
                changeIconHandler( link.value.replace( 'http:', 'https:' ) ).then( r => r )
              }}
            >
              Заменить
            </Button>
            <WhiteButton
              onClick={() => setShowNotification( false )}
            >
              Игнорировать
            </WhiteButton>
          </FlexBlock>
        </FlexBlock>
      )}
    </FlexBlock>
  )
}
