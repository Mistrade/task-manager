import { FC, useMemo } from 'react';
import { TaskStatusesType } from '@pages/planner/planner.types';
import { ContinueWorkTaskButtonName, darkColor } from '@src/common/constants';
import { convertEventStatus } from '@src/common/functions';
import { WhiteButton } from '../Buttons.styled';
import { FlexBlock } from '@components/LayoutComponents/FlexBlock';
import { ArrowRightIcon } from '@components/Icons/Icons';

interface ContinueTaskButtonGroupProps {
  status: TaskStatusesType;
  updateFn: (nextStatus: TaskStatusesType) => Promise<void>;
}

export const ContinueTaskButtonGroup: FC<ContinueTaskButtonGroupProps> = ({
  status,
  updateFn,
}) => {
  const buttons = useMemo(() => {
    return ContinueWorkTaskButtonName[status];
  }, [status]);
  return (
    <FlexBlock direction={'row'} gap={8} align={'center'}>
      <WhiteButton withHover={false} disabled={true}>
        {convertEventStatus(status)}
      </WhiteButton>
      {buttons.length > 0 && (
        <>
          <ArrowRightIcon size={18} color={darkColor} />
          <FlexBlock gap={4} align={'center'} direction={'row'}>
            {buttons.map((continueItem) => (
              <WhiteButton
                key={continueItem.nextStatus + continueItem.title}
                onClick={async (e) => {
                  e.stopPropagation();
                  await updateFn(continueItem.nextStatus);
                }}
              >
                {continueItem.title}
              </WhiteButton>
            ))}
          </FlexBlock>
        </>
      )}
    </FlexBlock>
  );
};
