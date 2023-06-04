import { WhiteButton } from '@components/Buttons/Buttons.styled';
import { CancelIcon, LoaderIcon, SendIcon } from '@components/Icons/Icons';
import { kitColors } from 'chernikov-kit';
import { FC, useMemo } from 'react';


interface EditableFieldsButtonsProps {
  isLoading: boolean;
  onDecline?: () => void;
  iconSize?: number;
}

export const EditableFieldsButtons: FC<EditableFieldsButtonsProps> = ({
  isLoading,
  onDecline,
  iconSize = 22,
}) => {
  const icon = useMemo(() => {
    if (isLoading)
      return <LoaderIcon size={iconSize} color={kitColors.primary} />;
    return <SendIcon size={iconSize} color={kitColors.primary} />;
  }, [isLoading]);

  return (
    <>
      <WhiteButton
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        type={'submit'}
      >
        {icon}
      </WhiteButton>
      <WhiteButton type={'button'} onClick={onDecline}>
        <CancelIcon size={iconSize} color={kitColors.divider} />
      </WhiteButton>
    </>
  );
};