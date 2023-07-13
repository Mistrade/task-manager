import { Button } from './Buttons.styled';
import { EmptyButtonStyled } from './EmptyButton.styled';
import { CopyIcon } from '@components/Icons/AppIcon/CopyIcon';
import { CompleteIcon, IconProps } from '@components/Icons/Icons';
import { FlexBlockProps } from '@components/LayoutComponents/FlexBlock';
import { kitColors } from 'chernikov-kit';
import { FC, useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';


export interface CopyToClipboardButtonProps extends Omit<IconProps, 'onClick'> {
  iconContainerProps?: FlexBlockProps;
  content: string | (() => string);
  renderText?: string;
  style?: 'empty' | 'current';
}

export const CopyToClipboardButton: FC<CopyToClipboardButtonProps> = ({
  size = 16,
  iconContainerProps,
  color = kitColors.primary,
  content,
  renderText = '',
  style = 'empty',
}) => {
  const [isCopied, setIsCopied] = useState(false);
  const [timeoutId, setTimeoutId] = useState<any>(null);

  useEffect(() => {
    if (isCopied) {
      clearTimeout(timeoutId);

      const id = setTimeout(() => {
        setIsCopied(false);
      }, 5000);

      setTimeoutId(id);

      return () => {
        clearTimeout(id);
      };
    }
  }, [isCopied]);

  const copiedHandler = useCallback(() => {
    const text = typeof content === 'string' ? content : content()
    
    navigator.clipboard
      .writeText(text)
      .then(() => {
        setIsCopied(true);
        toast('Текст скопирован в Буфер обмена', { type: 'success' });
      })
      .catch(() => {
        setTimeoutId((prev: any) => {
          clearTimeout(prev);
          return null;
        });
        setIsCopied(false);
        toast('Не удалось скопировать текст в буфер обмена', {
          type: 'warning',
        });
      });
  }, [content]);

  if (style === 'current') {
    return (
      <Button style={{ fontSize: 14 }} onClick={copiedHandler}>
        {isCopied ? (
          <CompleteIcon size={16} color={'#fff'} />
        ) : (
          <CopyIcon {...iconContainerProps} size={size} color={'#fff'} />
        )}
        {renderText}
      </Button>
    );
  }

  return (
    <EmptyButtonStyled onClick={copiedHandler}>
      {isCopied ? (
        <CompleteIcon size={16} color={kitColors.primary} />
      ) : (
        <CopyIcon {...iconContainerProps} size={size} color={color} />
      )}
      {renderText}
    </EmptyButtonStyled>
  );
};