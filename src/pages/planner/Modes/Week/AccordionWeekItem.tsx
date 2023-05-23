import { FC } from 'react';

import { WeekItemProps } from '../../types';
import { WeekItem } from './components/WeekItem';
import { BaseWeekContainer } from './components/styled';

export const AccordionWeekItem: FC<WeekItemProps> = ({
  config,
  renderMode,
  taskStorage,
  renderTaskCount,
  animationIndex,
}) => {
  return (
    // <Accordion title={<WeekHeader config={config} />}>
    <BaseWeekContainer>
      <WeekItem
        config={config}
        taskStorage={taskStorage}
        renderMode={renderMode}
        renderTaskCount={renderTaskCount}
        animationIndex={animationIndex}
      />
    </BaseWeekContainer>
    // </Accordion>
  );
};
