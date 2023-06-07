import { useAppSelector } from '@redux/hooks/hooks';
import { plannerSelectBackgroundUrl } from '@selectors/planner';
import { Flex, HiddenText, Text, kitColors } from 'chernikov-kit';
import { FC } from 'react';
import { Link } from 'react-router-dom';

import { getFinanceOperationValue } from '@planner/EventInfo/LeftBar/Tabs/Finance/utils/table.config';

import { IFinanceOperation } from '@api/finance-api/types';
import { ObjectId } from '@api/rtk-api.types';

import { DateHelper } from '../../../common/calendarSupport/dateHelper';
import { EVENT_INFORMER_TAB_NAMES } from '../../../common/constants/enums';
import Badge from '../../Badge';


export interface FinanceOperationSystemDescriptionProps {
  data: IFinanceOperation;
  _id?: ObjectId;
  fromEventId: ObjectId;
}

export const FinanceOperationWidget: FC<
  FinanceOperationSystemDescriptionProps
> = ({ data, fromEventId }) => {
  const backgroundUrl = useAppSelector(plannerSelectBackgroundUrl);
  return (
    <Flex
      width={'100%'}
      direction={'column'}
      gap={6}
      p={8}
      borderLeft={`5px solid ${kitColors.primary}`}
    >
      <Flex>
        <Link
          to={`${backgroundUrl}/event/info/${fromEventId}/${EVENT_INFORMER_TAB_NAMES.FINANCE}`}
        >
          <Text
            rows={1}
            fontSize={15}
            color={kitColors.primary}
            style={{
              textDecoration: 'underline',
              textDecorationColor: kitColors.primary,
            }}
            weight={'bold'}
          >
            {data.name}
          </Text>
        </Link>
      </Flex>
      {data.date && (
        <Text rows={1} fontSize={14} color={kitColors.dark}>
          {DateHelper.getHumanizeDateValue(data.date, {
            withTime: true,
            withYear: true,
            monthPattern: 'full',
            yearPattern: 'full',
          })}
        </Text>
      )}
      <Flex gap={10}>
        <Badge type={'primary'}>
          {data.operationType === 'income' ? 'Доход' : 'Расход'}
        </Badge>
        <Badge type={'primary'}>{getFinanceOperationValue(data.result)}</Badge>
        <Badge type={'primary'}>
          {data.state ? 'Подтверждено' : 'Не подтверждено'}
        </Badge>
      </Flex>
      {data.description && (
        <HiddenText rows={1} fontSize={15} color={kitColors.dark} buttonText={{show: 'Показать описание', hide: 'Скрыть описание'}}>
          {data.description}
        </HiddenText>
      )}
    </Flex>
  );
};