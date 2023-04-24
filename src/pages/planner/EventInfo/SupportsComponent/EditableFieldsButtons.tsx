import { FC, useMemo } from 'react';

import { currentColor, defaultColor } from '@src/common/constants/constants';

import { WhiteButton } from '@components/Buttons/Buttons.styled';
import { CancelIcon, LoaderIcon, SendIcon } from '@components/Icons/Icons';

interface EditableFieldsButtonsProps {
  isLoading: boolean;
  onDecline?: () => void;
}

export const EditableFieldsButtons: FC<EditableFieldsButtonsProps> = ({
  isLoading,
  onDecline,
}) => {
  const icon = useMemo(() => {
    if (isLoading) return <LoaderIcon size={22} color={currentColor} />;
    return <SendIcon size={22} color={currentColor} />;
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
        <CancelIcon size={22} color={defaultColor} />
      </WhiteButton>
    </>
  );
};
