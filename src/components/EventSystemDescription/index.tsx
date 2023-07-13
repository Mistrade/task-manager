import { Flex, HiddenText, Text, kitColors } from 'chernikov-kit';
import { FC } from 'react';

import {
  EVENT_WIDGET_MODEL_MAP,
  TEventSystemDescription,
} from '@planner/types';

import { Accordion } from '../Accordion/Accordion';
import { Informer } from '../Inform/Informer';
import { FinanceOperationWidget } from './modules/FinanceOperation';


export interface EventSystemDescriptionProps {
  data: TEventSystemDescription;
}

export const EventSystemWidget: FC<EventSystemDescriptionProps> = ({
  data,
}) => {
  return (
    <Informer>
      <Flex width={'100%'} direction={'column'} gap={12}>
        <Accordion
          initialState={false}
          title={
            <Text rows={1} fontSize={18} color={kitColors.dark} weight={'bold'}>
              {data.title}
            </Text>
          }
        >
          <Proxy data={data} />
          {data.message && (
            <HiddenText
              fontSize={15}
              rows={2}
              color={kitColors.dark}
              buttonText={{
                show: 'Показать описание',
                hide: 'Скрыть описание',
              }}
            >
              {data.message}
            </HiddenText>
          )}
        </Accordion>
      </Flex>
    </Informer>
  );
};

const Proxy: FC<EventSystemDescriptionProps> = ({ data }) => {
  switch (data.model) {
    case EVENT_WIDGET_MODEL_MAP.FINANCE:
      return (
        <FinanceOperationWidget
          data={data.data}
          _id={data.modelId}
          fromEventId={data.fromEvent}
        />
      );
  }
};