import React, { ChangeEvent, useRef, useState } from 'react';
import * as yup from 'yup';

import {
  Button,
  LinkButton,
  WhiteButton,
} from '@components/Buttons/Buttons.styled';
import { UrlIcon } from '@components/Icons/SocialNetworkIcons';
import { Informer } from '@components/Inform/Informer';
import {
  DefaultTextInputProps,
  TextInput,
} from '@components/Input/TextInput/TextInput';
import { FlexBlock } from '@components/LayoutComponents';

import { EventLinkItem } from '@planner/types';

export interface SelectLinksProps
  extends Omit<DefaultTextInputProps, 'onChange' | 'value'> {
  label?: string;
  onChange: (value: { key: string; value: string } | null) => void;
  tooltip?: DefaultTextInputProps['tooltip'];
  initialShowNotification?: boolean;
  initialLinkValue?: EventLinkItem | null;
}

interface LinkItem {
  key: string;
  pattern: string | Array<string>;
}

const linkList: Array<LinkItem> = [
  {
    key: 'vk',
    pattern: 'vk.com',
  },
  {
    key: 'instagram',
    pattern: 'instagram.com',
  },
  {
    key: 'google',
    pattern: [
      'google.com',
      'meet.google.com',
      'mail.google.com',
      'youtube.com',
    ],
  },
  {
    key: 'facebook',
    pattern: 'facebook.com',
  },
  {
    key: 'whatsApp',
    pattern: 'whatsapp.com',
  },
  {
    key: 'figma',
    pattern: 'figma.com',
  },
  {
    key: 'telegram',
    pattern: 'telegram.org',
  },
  {
    key: 'zoom',
    pattern: 'zoom.us',
  },
  {
    key: 'miro',
    pattern: 'miro.com',
  },
  {
    key: 'viber',
    pattern: 'viber.com',
  },
  {
    key: 'skype',
    pattern: 'skype.com',
  },
  {
    key: 'twitch',
    pattern: 'twitch.tv',
  },
  {
    key: 'discord',
    pattern: 'discord.com',
  },
];

export function SelectLinks<T>({
  label,
  onChange,
  tooltip,
  initialShowNotification = true,
  initialLinkValue,
  buttons,
  ...props
}: SelectLinksProps): JSX.Element {
  const [link, setLink] = useState<{ key: string; value: string }>(
    initialLinkValue || { key: 'default', value: '' }
  );
  const ref = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [isSecure, setIsSecure] = useState(true);
  const [showNotification, setShowNotification] = useState(
    !!initialShowNotification
  );

  const changeIconHandler = async (value: string): Promise<string> => {
    if (value) {
      setLoading(true);
      const url = new URL(value);
      setIsSecure(url.protocol === 'https:');

      const host = url.host.replace('www.', '');
      const index = linkList.findIndex((value, index) => {
        if (Array.isArray(value.pattern)) {
          return value.pattern.some((pattern) => {
            const r = new RegExp(pattern, 'i');
            return r.test(host);
          });
        }
        const r = new RegExp(value.pattern, 'i');
        return r.test(host);
      });

      setLoading(false);

      if (index < 0) {
        return 'default';
      } else {
        return linkList[index].key;
      }
    }

    return 'default';
  };

  const onReplaceLink = () => {
    setLink((prev) => {
      const v = prev.value.replace('http:', 'https:');
      if (yup.string().url().isValidSync(v)) {
        setIsSecure(true);
        return {
          key: prev.key,
          value: v,
        };
      }
      return prev;
    });
  };

  const blurHandle = async (e: React.FocusEvent<HTMLInputElement>) => {
    let value = e.target.value.toLowerCase();

    if (value) {
      const isHttp = /http:\/\//i.test(value);
      const isHttps = /https:\/\//i.test(value);

      if (!isHttp && !isHttps) {
        value = `https://${value}`;
      }
    }

    const isUrl = yup.string().url().isValidSync(value);

    if (isUrl) {
      changeIconHandler(value).then((r) => {
        const result = {
          key: r,
          value: value,
        };
        setLink(result);
        onChange && onChange(result);
      });
    } else {
      setLink({ key: 'default', value: value });
      onChange && onChange(null);
    }
  };

  const changeHandle = (e: ChangeEvent<HTMLInputElement>) => {
    setLink((prev) => ({ key: prev.key, value: e.target.value }));
  };

  return (
    <FlexBlock justify={'flex-start'} gap={6} width={'100%'} wrap={'wrap'}>
      <FlexBlock width={'100%'} gap={12} wrap={'nowrap'}>
        <FlexBlock width={'100%'}>
          <TextInput
            {...props}
            label={label || ''}
            ref={ref}
            tooltip={tooltip}
            placeholder={'Например: https://example.com/video/1234567890'}
            value={link.value}
            isLoading={loading}
            icon={<UrlIcon name={link.key} />}
            iconPlacement={'right'}
            onBlur={blurHandle}
            onChange={changeHandle}
            buttons={
              buttons ||
              (link.value && (
                <FlexBlock
                  justify={'flex-end'}
                  align={'center'}
                  height={'100%'}
                >
                  <LinkButton
                    href={link.value}
                    target={'_blank'}
                    rel={''}
                    resource={''}
                  >
                    Проверить
                  </LinkButton>
                </FlexBlock>
              ))
            }
          />
        </FlexBlock>
      </FlexBlock>
      {!isSecure && showNotification && (
        <Informer>
          <FlexBlock width={'100%'}>
            Внимание! Вы используете НЕ БЕЗОПАСНУЮ ссылку.
            <br />
            Заменить на безопасную?
          </FlexBlock>
          <FlexBlock mt={6} gap={6}>
            <Button onClick={onReplaceLink}>Заменить</Button>
            <WhiteButton onClick={() => setShowNotification(false)}>
              Игнорировать
            </WhiteButton>
          </FlexBlock>
        </Informer>
      )}
    </FlexBlock>
  );
}
