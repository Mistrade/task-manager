import { useDebounce } from '@hooks/useDebounce';
import { FC, ReactNode, useEffect, useMemo, useRef, useState } from 'react';
import { useParams } from 'react-router';
import styled from 'styled-components';

import { EVENT_INFORMER_TAB_NAMES } from '@src/common/constants/enums';

import { ErrorScreen } from '@components/Errors/ErrorScreen';
import { FlexBlock } from '@components/LayoutComponents';

import { EventInfoBaseProps } from '@planner/types';

import { DefaultAnimationTimingFn } from '../../../../common/constants/styles';
import { CenteredContainer } from '../../../../routes/Interceptors/SessionInterceptor';
import { EventInfoUpdateFn } from '../SupportsComponent/ToggleTaskInformerButtons';
import { EventInfoAboutTab } from './Tabs/About/EventInfoAboutTab';
import { EventChainsTab } from './Tabs/Chains/EventChainsTab';
import { EventCheckList } from './Tabs/EventCheckList/EventCheckList';
import { EventVotes } from './Tabs/EventVotes';
import { FinanceCore, OnlyPremiumModuleAccessScreen } from './Tabs/Finance';
import { TaskComments } from './Tabs/TaskComments/TaskComments';
import { TaskHistory } from './Tabs/TaskHistory/TaskHistory';
import { TaskMembers } from './Tabs/TaskMembers/TaskMembers';


interface TaskInformerLeftBarProps extends EventInfoBaseProps {
  updateFn: EventInfoUpdateFn;
}

const Container = styled('div')`
  display: flex;
  flex-grow: 3;
  flex-direction: row;
  height: 100%;
  justify-content: center;
  gap: 12px;
  overflow: hidden;
  max-height: 100%;
`;

interface AnimationGroupProps<T extends string> {
  selectedKey: T;
  nodes: Array<NodeItem<T>>;
}

interface NodeItem<T extends string> {
  key: T;
  render: ReactNode;
}

interface MappedNodeItem<T extends string> extends NodeItem<T> {
  index: number;
}

type NodeHashType<T extends string> = {
  [key in T]: MappedNodeItem<T>;
};

const AnimationItemContainer = styled('div')`
  & {
    display: flex;
    opacity: 1;
    transition: opacity 0.4s ${DefaultAnimationTimingFn};
  }

  //
  //&.item--open {
  //  opacity: 1;
  //}
  //
  //&.item--closed {
  //  opacity: 0;
  //}
  //
  //&.item--stable {
  //  opacity: 1;
  //}
`;

export function VirtualAnimationGroup<T extends string>({
  selectedKey,
  nodes,
}: AnimationGroupProps<T>): JSX.Element {
  const ref = useRef<HTMLDivElement>(null);
  const [viewportWidth, setViewportWidth] = useState<number>(
    ref?.current?.offsetWidth || 0
  );

  const timeoutId = useRef<NodeJS.Timeout>();

  const data: NodeHashType<T> = useMemo(() => {
    const hash = {} as NodeHashType<T>;

    nodes.forEach((item, index) => {
      hash[item.key] = {
        key: item.key,
        index,
        render: item.render,
      };
    });

    return hash;
  }, [nodes]);

  const debounceSelected = useDebounce(selectedKey, 100);

  useEffect(() => {
    setViewportWidth(ref.current?.offsetWidth || 0);
    window.addEventListener('resize', resizeHandle);
    return () => {
      window.removeEventListener('resize', resizeHandle);
    };
  }, []);

  const resizeHandle = () => {
    const target = ref.current as HTMLDivElement;

    clearTimeout(timeoutId.current);

    timeoutId.current = setTimeout(() => {
      setViewportWidth(target.offsetWidth || 0);
    }, 50);
  };

  return (
    <FlexBlock
      basis={'100%'}
      direction={'row'}
      width={'100%'}
      overflow={'hidden'}
      ref={ref}
    >
      <FlexBlock
        style={{
          flexGrow: 3,
          flexBasis: `${100 * nodes.length}%`,
          transform: `translateX(-${
            data[selectedKey].index > 0
              ? (100 / nodes.length) * data[selectedKey].index
              : 0
          }%)`,
          transition: `transform .4s cubic-bezier(0.215, 0.610, 0.355, 1.000)`,
        }}
      >
        {nodes.map((item) => (
          <AnimationItemContainer
            style={{ width: viewportWidth }}
            key={item.key}
          >
            {item.key === debounceSelected ? item.render : <></>}
          </AnimationItemContainer>
        ))}
      </FlexBlock>
    </FlexBlock>
  );
}

export const TaskInformerLeftBar: FC<TaskInformerLeftBarProps> = ({
  eventInfo,
  updateFn,
}) => {
  const { tabName } = useParams<{ tabName: EVENT_INFORMER_TAB_NAMES }>();

  // const nodesArr: AnimationGroupProps<EVENT_INFORMER_TAB_NAMES>['nodes'] =
  //   useMemo(() => {
  //     return [
  //       {
  //         key: EVENT_INFORMER_TAB_NAMES.ABOUT,
  //         render: (
  //           <EventInfoAboutTab eventInfo={eventInfo} updateFn={updateFn} />
  //         ),
  //       },
  //       {
  //         key: EVENT_INFORMER_TAB_NAMES.CHECK_LIST,
  //         render: <EventCheckList eventInfo={eventInfo.base} />,
  //       },
  //       {
  //         key: EVENT_INFORMER_TAB_NAMES.HISTORY,
  //         render: <TaskHistory taskInfo={eventInfo.base} />,
  //       },
  //       {
  //         key: EVENT_INFORMER_TAB_NAMES.COMMENTS,
  //         render: <TaskComments taskInfo={eventInfo.base} />,
  //       },
  //       {
  //         key: EVENT_INFORMER_TAB_NAMES.MEMBERS,
  //         render: <TaskMembers taskItem={eventInfo.base} />,
  //       },
  //       {
  //         key: EVENT_INFORMER_TAB_NAMES.CHAINS,
  //         render: <EventChainsTab taskItem={eventInfo.base} />,
  //       },
  //       {
  //         key: EVENT_INFORMER_TAB_NAMES.VOTES,
  //         render: <EventVotes />,
  //       },
  //       {
  //         key: EVENT_INFORMER_TAB_NAMES.FINANCE,
  //         render: <FinanceCore eventInfo={eventInfo.base} />,
  //       },
  //       {
  //         key: EVENT_INFORMER_TAB_NAMES.NOTIFICATIONS,
  //         render: <OnlyPremiumModuleAccessScreen />,
  //       },
  //       {
  //         key: EVENT_INFORMER_TAB_NAMES.INTEGRATIONS,
  //         render: <OnlyPremiumModuleAccessScreen />,
  //       },
  //     ];
  //   }, [tabName, eventInfo]);

  const page = useMemo(() => {
    switch (tabName) {
      case EVENT_INFORMER_TAB_NAMES.ABOUT:
        return <EventInfoAboutTab eventInfo={eventInfo} updateFn={updateFn} />;
      case EVENT_INFORMER_TAB_NAMES.CHECK_LIST:
        return <EventCheckList eventInfo={eventInfo.base} />;
      case EVENT_INFORMER_TAB_NAMES.HISTORY:
        return <TaskHistory taskInfo={eventInfo.base} />;
      case EVENT_INFORMER_TAB_NAMES.COMMENTS:
        return <TaskComments taskInfo={eventInfo.base} />;
      case EVENT_INFORMER_TAB_NAMES.MEMBERS:
        return <TaskMembers taskItem={eventInfo.base} />;
      case EVENT_INFORMER_TAB_NAMES.CHAINS:
        return <EventChainsTab taskItem={eventInfo.base} />;
      case EVENT_INFORMER_TAB_NAMES.VOTES:
        return <EventVotes />;
      case EVENT_INFORMER_TAB_NAMES.FINANCE:
        return <FinanceCore eventInfo={eventInfo.base} />;
      case EVENT_INFORMER_TAB_NAMES.NOTIFICATIONS:
        return <OnlyPremiumModuleAccessScreen />;
      case EVENT_INFORMER_TAB_NAMES.INTEGRATIONS:
        return <OnlyPremiumModuleAccessScreen />;
      default:
        return (
          <CenteredContainer>
            <ErrorScreen
              title={'Раздел не найден'}
              errorType={'ERR_FORBIDDEN'}
            />
          </CenteredContainer>
        );
    }
  }, [tabName, eventInfo]);

  return (
    <Container>
      <FlexBlock
        grow={3}
        minWidth={'100%'}
        width={'100%'}
        height={'100%'}
        maxHeight={'100%'}
        direction={'row'}
        overflow={'hidden'}
      >
        {page}
      </FlexBlock>
    </Container>
  );
};