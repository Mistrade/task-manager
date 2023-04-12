import { BaseCreateEventTabProps } from './Info';
import { FC } from 'react';
import { ScrollVerticalView } from '@components/LayoutComponents/ScrollView/ScrollVerticalView';
import { FlexBlock } from '@components/LayoutComponents/FlexBlock';
import { SelectInput } from '@components/Input/SelectInput/SelectInput';
import { ErrorScreen } from '@components/Errors/ErrorScreen';

export interface CreateEventMembersTabProps extends BaseCreateEventTabProps {}

export const CreateEventMembersTab: FC<CreateEventMembersTabProps> = ({
  values,
  setFieldValue,
  setFieldTouched,
  touched,
  errors,
}) => {
  return (
    <ScrollVerticalView
      placementStatic={'top'}
      renderPattern={'top-bottom'}
      gap={12}
      staticContent={
        <SelectInput
          label={'Добавьте участника'}
          placeholder={'Укажите ФИО/Email/Номер телефона для поиска'}
          data={[]}
          renderData={() => <></>}
        />
      }
    >
      {!!values.members.length ? (
        <FlexBlock direction={'column'} gap={24}></FlexBlock>
      ) : (
        <FlexBlock
          width={'100%'}
          height={'100%'}
          justify={'center'}
          align={'center'}
        >
          <FlexBlock maxWidth={500}>
            <ErrorScreen
              title={'Вы пока не добавили ни одного участника к событию'}
              errorType={'SYSTEM_ERROR'}
              description={'Добавляемые участники будут отображаться тут'}
            />
          </FlexBlock>
        </FlexBlock>
      )}
    </ScrollVerticalView>
  );
};
