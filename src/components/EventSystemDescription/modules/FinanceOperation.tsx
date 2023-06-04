import { EVENT_INFORMER_TAB_NAMES } from '../../../common/constants/enums';
import Badge from '../../Badge';
import { Informer } from '../../Inform/Informer';
import { IFinanceOperation } from '@api/finance-api/types';
import { ObjectId } from '@api/rtk-api.types';
import { useAppSelector } from '@redux/hooks/hooks';
import { plannerSelectBackgroundUrl } from '@selectors/planner';
import { Flex, HiddenText, kitColors, Text } from 'chernikov-kit';
import { FC } from 'react';
import { Link } from 'react-router-dom';


export interface FinanceOperationSystemDescriptionProps {
  data: IFinanceOperation;
  title?: string;
  message?: string;
  _id?: ObjectId;
  fromEventId: ObjectId;
}

export const FinanceOperationSystemDescription: FC<
  FinanceOperationSystemDescriptionProps
> = ({ title, message, data, fromEventId }) => {
  const backgroundUrl = useAppSelector(plannerSelectBackgroundUrl);
  return (
    <Informer>
      <Flex width={'100%'} direction={'column'} gap={12}>
        <Flex
          width={'100%'}
          justify={'flex-start'}
          direction={'column'}
          gap={6}
        >
          <Text rows={1} fontSize={18} color={kitColors.dark} weight={'bold'}>
            {title}
          </Text>
        </Flex>
        <Flex width={'100%'} direction={'column'} gap={6}>
          <Flex width={'100%'} gap={12}>
            <Badge type={data.operationType}>
              {data.operationType === 'income' ? 'Доход' : 'Расход'}
            </Badge>
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
        </Flex>
        {message && (
          <HiddenText
            fontSize={15}
            rows={2}
            color={kitColors.dark}
            buttonText={{
              show: 'Показать описание',
              hide: 'Скрыть описание',
            }}
          >
            {message}
          </HiddenText>
        )}
      </Flex>
    </Informer>
  );
};