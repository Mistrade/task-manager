import { BaseEventHistoryFieldProps } from '../event-history.types';
import { CopyToClipboardButton } from '@components/Buttons/CopyToClipboardButton';
import { DontHoveredButton } from '@components/Buttons/EmptyButton.styled';
import { FlexBlock } from '@components/LayoutComponents';
import { CutText } from '@components/Text/Text';
import { kitColors } from 'chernikov-kit';
import { FC, useRef, useState } from 'react';
import { useIntersection } from 'react-use';


export interface HistoryDescriptionFieldProps
  extends BaseEventHistoryFieldProps<string> {
  useCopied?: boolean;
}

export const HistoryDescriptionField: FC<HistoryDescriptionFieldProps> = ({
  value,
  useCopied = true,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  const observer = useIntersection(ref, {
    root: null,
    rootMargin: '0px',
    threshold: 1,
  });

  if (!value?.trim()) {
    return <>Описание было удалено</>;
  }

  return (
    <FlexBlock direction={'column'} gap={6}>
      {value && useCopied && (
        <span>
          <CopyToClipboardButton
            style={'empty'}
            renderText={'Скопировать'}
            content={value || ''}
          />
        </span>
      )}
      <CutText isOpen={isOpen}>
        {value?.trim()}
        <span ref={ref}></span>
      </CutText>
      {!observer?.isIntersecting && observer?.target && !isOpen && (
        <DontHoveredButton
          style={{
            width: 'fit-content',
            fontSize: 14,
            color: kitColors.primary,
            padding: 0,
          }}
          onClick={(e) => {
            e.stopPropagation();
            setIsOpen(true);
          }}
        >
          Показать полностью
        </DontHoveredButton>
      )}
    </FlexBlock>
  );
};