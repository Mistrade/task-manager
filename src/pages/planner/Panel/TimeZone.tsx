import { FlexBlock } from '@components/LayoutComponents';
import { CutText } from '@components/Text/Text';
import { Tooltip } from 'chernikov-kit';
import dayjs from 'dayjs';
import React from 'react';


export const TimeZone = () => {
  return (
    <FlexBlock
      textAlign={'left'}
      justify={'flex-end'}
      align={'flex-end'}
      width={'100%'}
    >
      <Tooltip
        content={`Рассчитано на основе текущего часового пояса: UTC${
          dayjs().utcOffset() >= 0
            ? `+${dayjs().utcOffset() / 60}`
            : `-${dayjs().utcOffset() / 60}`
        }`}
        placement={'right'}
        children={
          <CutText rows={1} fontSize={14}>
            Часовой пояс: {dayjs.tz.guess()}
          </CutText>
        }
      />
    </FlexBlock>
  );
};