import { FC } from 'react';
import { ChainsRenderModeProps } from '@planner/TaskInformer/LeftBar/Tabs/Chains/event-chains.types';
import { ChildrenEventList } from './ChildrenEventList';
import { FlexBlock } from '@components/LayoutComponents/FlexBlock';
import { Tooltip } from '@components/Tooltip/Tooltip';
import { TooltipIcon } from '@components/Icons/TooltipIcon';
import { currentColor } from '@src/common/constants';

export const ChainsRenderModeList: FC<ChainsRenderModeProps> = ({
  eventItem,
  chains,
  onConnectChains,
}) => {
  return (
    <FlexBlock
      direction={'column'}
      gap={12}
      justify={'flex-start'}
      align={'flex-start'}
      pb={20}
    >
      <ChildrenEventList
        onConnectClick={onConnectChains}
        childrenEvents={chains.childrenEvents || []}
        eventInfo={eventItem}
        title={
          <FlexBlock gap={6} align={'center'} direction={'row'}>
            Child - события
            <Tooltip
              theme={'current'}
              placement={'right'}
              content={
                <div
                  style={{
                    textAlign: 'center',
                    width: '100%',
                    whiteSpace: 'pre-wrap',
                  }}
                >
                  <span style={{ fontWeight: 'bold', display: 'inline' }}>
                    ChildOf
                  </span>{' '}
                  - это вложенные события.
                  <br />
                  Чаще всего эта связь используется для осуществления
                  вложенности и дробления события. <br />
                  Например одно большое событие может состоять из нескольких
                  маленьких. <br />
                  Эти маленькие события и есть -{' '}
                  <span style={{ fontWeight: 'bold', display: 'inline' }}>
                    ChildOf
                  </span>
                </div>
              }
            >
              <TooltipIcon size={20} color={currentColor} />
            </Tooltip>
          </FlexBlock>
        }
      />
      <ChildrenEventList
        onConnectClick={onConnectChains}
        eventInfo={eventItem}
        title={'Parent - события'}
        childrenEvents={chains.parentEvent ? [chains.parentEvent] : []}
      />
      <ChildrenEventList
        onConnectClick={onConnectChains}
        eventInfo={eventItem}
        title={'Донор событие'}
        childrenEvents={chains.linkedFromEvent ? [chains.linkedFromEvent] : []}
      />
    </FlexBlock>
  );
};
