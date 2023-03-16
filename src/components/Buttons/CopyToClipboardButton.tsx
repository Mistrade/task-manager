import { CopyIcon } from '../Icons/AppIcon/CopyIcon';
import { currentColor } from '../../common/constants';
import { EmptyButtonStyled } from './EmptyButton.styled';
import { CompleteIcon, IconProps } from '../Icons/Icons';
import { FlexBlockProps } from '../LayoutComponents/FlexBlock';
import { FC, useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Button } from './Buttons.styled';

export interface CopyToClipboardButtonProps extends Omit<IconProps, 'onClick'> {
  iconContainerProps?: FlexBlockProps;
  content: string;
  renderText?: string;
  style?: 'empty' | 'current';
}

export const CopyToClipboardButton: FC<CopyToClipboardButtonProps> = ({
  size = 16,
  iconContainerProps,
  color = currentColor,
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
    navigator.clipboard
      .writeText(content)
      .then(() => {
        setIsCopied(true);
        toast('Скопировано в Буфер обмена', { type: 'success' });
      })
      .catch(() => {
        setTimeoutId((prev: any) => {
          clearTimeout(prev);
          return null;
        });
        setIsCopied(false);
        toast('Не удалось скопировать в буфер обмена', { type: 'warning' });
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
        <CompleteIcon size={16} color={currentColor} />
      ) : (
        <CopyIcon {...iconContainerProps} size={size} color={color} />
      )}
      {renderText}
    </EmptyButtonStyled>
  );
};
