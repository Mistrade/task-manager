import {
  greenColor,
  orangeColor,
} from '../../../../../../../common/constants/constants';
import {
  FINANCE_OPERATION_TYPES,
  TInitialFinanceOperationArgs,
} from '@api/finance-api/types';
import { ObjectId } from '@api/rtk-api.types';
import { ButtonWithLoading } from '@components/Buttons/ButtonWithLoading';
import { EmptyButtonStyled } from '@components/Buttons/EmptyButton.styled';
import { DatePicker } from '@components/DatePicker/DatePicker';
import { InputGroup } from '@components/Input/InputGroup';
import { SelectInput } from '@components/Input/SelectInput/SelectInput';
import { SelectItemContainer } from '@components/Input/SelectInput/SelectItemContainer';
import { SelectListContainer } from '@components/Input/SelectInput/SelectListContainer';
import { TextAreaInput } from '@components/Input/TextAreaInput/TextAreaInput';
import { TextInput } from '@components/Input/TextInput/TextInput';
import { FlexBlock } from '@components/LayoutComponents';
import { Heading } from '@components/Text/Heading';
import { CutText } from '@components/Text/Text';
import { useFormik } from 'formik';
import { FC } from 'react';


export interface FinanceItem {
  sum: number;
  date: null | Date;
  type: FINANCE_TRANSACTION_TYPES;
  name: string;
}

export enum FINANCE_TRANSACTION_TYPES {
  'INCOME' = 'income',
  'CONSUMPTION' = 'consumption',
}

const bgColors = {
  consumption: orangeColor,
  income: greenColor,
};

export const FINANCE_OPERATION_TITLES = {
  consumption: 'Расход',
  income: 'Доход',
};

export type TFinanceOperationFormType = Omit<
  TInitialFinanceOperationArgs,
  'model'
> & { _id: ObjectId };

const initialFinanceItemValue: TFinanceOperationFormType = {
  _id: '',
  date: null,
  operationType: FINANCE_OPERATION_TYPES.INCOME,
  name: '',
  value: 0,
  count: 1,
  description: '',
};

export const FinanceForm: FC<{
  onSave: (
    item: TFinanceOperationFormType,
    isUpdateMode: boolean
  ) => Promise<void>;
  isUpdateMode?: boolean;
  initialValues: TFinanceOperationFormType;
  onDecline?: () => void;
  isLoading?: boolean;
  clearAfterOnSave?: boolean;
}> = ({
  onSave,
  isUpdateMode,
  initialValues,
  onDecline,
  isLoading,
  clearAfterOnSave = true,
}) => {
  const { values, errors, handleSubmit, setFieldValue, resetForm, setValues } =
    useFormik<TFinanceOperationFormType>({
      onSubmit(value) {
        onSave(value, isUpdateMode || false).then(() => {
          if (clearAfterOnSave) {
            resetForm();
            setValues(
              {
                ...initialFinanceItemValue,
                date: value.date || null,
                operationType: value.operationType,
              },
              false
            );
          }
        });
      },
      initialValues,
    });

  return (
    <form
      style={{ width: '100%', padding: 0, marginTop: 4, marginBottom: 4 }}
      onSubmit={handleSubmit}
    >
      <FlexBlock direction={'column'} width={'100%'} gap={12} basis={'100%'}>
        <FlexBlock direction={'row'} justify={'center'}>
          <Heading.H3>
            <CutText rows={1} fontSize={18} weight={'bold'}>
              {isUpdateMode ? 'Редактирование операции' : 'Создание операции'}
            </CutText>
          </Heading.H3>
        </FlexBlock>
        <TextInput
          isDisabled={isLoading}
          inputId={'operation--name'}
          label={'Наименование'}
          containerProps={{ grow: 1 }}
          placeholder={'Наименование'}
          value={values.name}
          onChange={(e) => setFieldValue('name', e.target.value)}
        />
        <DatePicker
          isDisabled={isLoading}
          inputId={'operation--date'}
          label={'Дата операции'}
          placement={'bottom'}
          useForceUpdateValue={true}
          placeholder={'Дата (необязательно)'}
          currentDate={values.date}
          onChange={(date) => {
            setFieldValue('date', date);
          }}
          onClear={() => setFieldValue('date', null)}
        />
        <InputGroup>
          <SelectInput
            isDisabled={isLoading}
            inputId={'operation--type'}
            label={'Тип операции'}
            placeholder={'Тип операции'}
            value={
              values.operationType
                ? FINANCE_OPERATION_TITLES[values.operationType]
                : ''
            }
            data={[
              {
                title: 'Доход',
                key: FINANCE_TRANSACTION_TYPES.INCOME,
              },
              { title: 'Расход', key: FINANCE_TRANSACTION_TYPES.CONSUMPTION },
            ]}
            renderData={(data, setIsOpenState) => (
              <SelectListContainer minWidth={200} width={'100%'}>
                {data.map((item) => (
                  <SelectItemContainer
                    key={item.key}
                    bgColor={bgColors[item.key]}
                    onClick={() => {
                      setFieldValue('operationType', item.key);
                      setIsOpenState(false);
                    }}
                  >
                    {item.title}
                  </SelectItemContainer>
                ))}
              </SelectListContainer>
            )}
          />

          <TextInput
            isDisabled={isLoading}
            inputId={'operation--value'}
            label={'Сумма'}
            placeholder={'Сумма'}
            value={`${values.value || ''}`}
            onChange={(event) => {
              const value = Number(event.target.value);

              if (!isNaN(value)) {
                setFieldValue('value', +value);
              }
            }}
          />
          <TextInput
            isDisabled={isLoading}
            inputId={'operation--count'}
            label={'Кол-во'}
            placeholder={'Кол-во'}
            value={`${values.count || ''}`}
            onChange={(event) => {
              const value = Number(event.target.value);

              if (!isNaN(value)) {
                setFieldValue('count', +value);
              }
            }}
          />
        </InputGroup>
        <TextAreaInput
          label={'Комментарий'}
          placeholder={'Комментарий к операции'}
          rows={3}
          isDisabled={isLoading}
          value={values.description}
          onChange={(value) => setFieldValue('description', value)}
        />
        <FlexBlock
          height={'fit-content'}
          align={'center'}
          gap={6}
          justify={'flex-end'}
        >
          <ButtonWithLoading
            type={'submit'}
            buttonType={'primary'}
            disabled={isLoading}
            isLoading={isLoading}
          >
            {isUpdateMode ? 'Сохранить' : 'Добавить'}
          </ButtonWithLoading>
          <EmptyButtonStyled
            disabled={isLoading}
            type={'button'}
            onClick={onDecline}
          >
            Закрыть
          </EmptyButtonStyled>
        </FlexBlock>
      </FlexBlock>
    </form>
  );
};