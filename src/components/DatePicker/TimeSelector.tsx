import { disabledColor } from '../../common/constants/constants';
import { borderRadiusSize } from '../../common/css/mixins';
import { FlexBlock, VerticalScroll } from '@components/LayoutComponents';
import { CutText } from '@components/Text/Text';
import { TimeSelectorButton } from '@planner/styled';
import {
  addNull,
  generateHoursArray,
  generateMinuteArray,
} from '@src/common/functions';
import { kitColors } from 'chernikov-kit';
import dayjs from 'dayjs';
import { FC, useCallback, useEffect, useMemo, useRef } from 'react';


type TimeButtonUnitTypes = 'hour' | 'minute';

interface TimeButtonProps {
  isSelected: boolean;
  value: number;
  unitType: TimeButtonUnitTypes;

  handler(value: number, type: TimeButtonUnitTypes): void;
}

const TimeButton: FC<TimeButtonProps> = ({
  isSelected,
  value,
  handler,
  unitType,
}) => {
  const ref = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    if (isSelected && ref.current) {
      timeoutId = setTimeout(() => {
        ref.current?.scrollIntoView({ block: 'center' });
      }, 0);
    }

    return () => {
      if (timeoutId && ref.current) {
        clearTimeout(timeoutId);
      }
    };
  }, [isSelected]);

  return (
    <TimeSelectorButton
      autoFocus={isSelected}
      key={value}
      ref={isSelected ? ref : undefined}
      data-title={`hour_${value}`}
      isSelected={isSelected}
      type={'button'}
      onClick={(event) => {
        handler(value, unitType);
      }}
    >
      {addNull(value)}
    </TimeSelectorButton>
  );
};

interface TimeSelectorProps {
  currentDate: Date;
  minuteStep?: number;
  onChange?: (date: Date) => void;
}

export const TimeSelector: FC<TimeSelectorProps> = ({
  currentDate,
  minuteStep = 1,
  onChange,
}) => {
  const hours = useMemo(() => {
    return generateHoursArray({ start: 0, end: 23 });
  }, []);

  const minutes = useMemo(() => {
    return generateMinuteArray({ step: minuteStep });
  }, [minuteStep]);

  const handler = useCallback(
    (value: number, type: 'hour' | 'minute') => {
      if (onChange) {
        const d = dayjs(currentDate);
        const r = d.set(type, value);
        onChange(r.toDate());
      }
    },
    [onChange, currentDate]
  );

  return (
    <FlexBlock height={'100%'} direction={'column'} overflow={'hidden'} gap={4}>
      <FlexBlock
        justify={'center'}
        width={'100%'}
        mb={8}
        gap={6}
        shrink={0}
        basis={'28px'}
        height={28}
        align={'center'}
      >
        <CutText
          rows={1}
          fontSize={16}
          color={kitColors.primary}
          lineHeight={28}
          textAlign={'center'}
          verticalAlign={'middle'}
        >
          Время
        </CutText>
      </FlexBlock>
      <FlexBlock grow={3} gap={4} direction={'row'} overflow={'hidden'}>
        <VerticalScroll
          useShadow={true}
          renderPattern={'top-bottom'}
          containerProps={{
            position: 'relative',
            border: `1px solid ${disabledColor}`,
            pl: 6,
            pr: 6,
            borderRadius: borderRadiusSize.sm,
          }}
        >
          <FlexBlock direction={'column'} gap={4} pt={'50vh'} pb={'50vh'}>
            {hours.map((value, index, array) => {
              const isSelected = currentDate.getHours() === value;
              return (
                <TimeButton
                  key={`hour_${value}`}
                  isSelected={isSelected}
                  value={value}
                  handler={handler}
                  unitType={'hour'}
                />
              );
            })}
          </FlexBlock>
        </VerticalScroll>
        <VerticalScroll
          intersectionProps={{ topMargin: '60%' }}
          useShadow={true}
          renderPattern={'top-bottom'}
          containerProps={{
            position: 'relative',
            border: `1px solid ${disabledColor}`,
            pl: 6,
            pr: 6,
            borderRadius: borderRadiusSize.sm,
          }}
        >
          <FlexBlock direction={'column'} gap={4} pt={'50vh'} pb={'50vh'}>
            {minutes.map((value, index, array) => {
              const isSelected = currentDate.getMinutes() === value;
              return (
                <TimeButton
                  key={`minute_${value}`}
                  isSelected={isSelected}
                  value={value}
                  handler={handler}
                  unitType={'minute'}
                />
              );
            })}
          </FlexBlock>
        </VerticalScroll>
      </FlexBlock>
    </FlexBlock>
  );
};