import React, { FC } from 'react';

import { disabledColor } from '@src/common/constants/constants';
import { borderRadiusSize } from '@src/common/css/mixins';

import { FlexBlock } from '@components/LayoutComponents';

import { PanelDateHeader } from '@planner/Panel/PanelDateHeader';

import { CalendarHeaderAddButton } from './CalendarHeaderAddButton';
import { PlannerBreadCrumbs } from './PlannerBreadCrumbs';

export const CalendarCurrentTitle: FC<{ pattern: 'full' | 'short' }> =
  React.memo<{ pattern: 'full' | 'short' }>(
    ({ pattern }) => {
      return (
        <FlexBlock
          direction={'column'}
          gap={4}
          border={`1px solid ${disabledColor}`}
          width={'100%'}
          borderRadius={borderRadiusSize.sm}
          pt={6}
          pb={6}
          shrink={0}
          overflow={'hidden'}
        >
          <FlexBlock direction={'column'} gap={6} p={`3px 12px`}>
            <FlexBlock
              align={'center'}
              justify={'space-between'}
              width={'100%'}
            >
              <PanelDateHeader />
              <CalendarHeaderAddButton pattern={pattern} />
            </FlexBlock>
            <PlannerBreadCrumbs />
          </FlexBlock>
        </FlexBlock>
      );
    },
    (prevProps, nextProps) => prevProps.pattern === nextProps.pattern
  );
