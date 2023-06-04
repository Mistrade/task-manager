import { EditableFieldsButtons } from '../../../../../SupportsComponent/EditableFieldsButtons';
import { TFinanceOperationWithDate } from '@api/finance-api/types';
import { DatePicker } from '@components/DatePicker/DatePicker';
import { CalendarIcon } from '@components/Icons/AppIcon/CalendarIcon';
import {
  TextInput,
  TextInputProps,
} from '@components/Input/TextInput/TextInput';
import { FlexBlock } from '@components/LayoutComponents';
import { TUpdateOperationFn } from '@hooks/useFinanceOperationTable';
import { kitColors } from 'chernikov-kit';
import dayjs from 'dayjs';
import { MRT_Row, MRT_TableInstance } from 'material-react-table';
import React, { FC, useState } from 'react';


interface EditableFinanceInputProps<T extends string | number>
  extends TextInputProps {
  initialValue: T;
  onDecline: () => void;
  onSave: (value: T) => Promise<void>;
}

interface EditableDateProps {
  updateFn: TUpdateOperationFn;
  item: TFinanceOperationWithDate;
  table: MRT_TableInstance<TFinanceOperationWithDate>;
  index: number;
}

export const EditableDate: FC<EditableDateProps> = ({
  item,
  updateFn,
  index,
  table,
}) => {
  return (
    <FlexBlock width={'100%'} gap={6}>
      <DatePicker
        icon={<CalendarIcon size={15} color={kitColors.primary} />}
        withArrow={true}
        currentDate={item.date ? dayjs(item.date).toDate() : null}
        placement={'right'}
        onDecline={() => {
          table.setEditingCell(null);
        }}
        onChange={(date) => {
          setTimeout(() => {
            updateFn(
              {
                key: 'date',
                value: date,
              },
              item,
              index
            ).then(() => table.setEditingCell(null));
          }, 200);
        }}
      />
    </FlexBlock>
  );
};

export const EditableTextInput: FC<EditableFinanceInputProps<string>> = ({
  initialValue,
  onSave,
  onDecline,
  ...textInputProps
}) => {
  const [value, setValue] = useState<string>(initialValue);
  const [isLoading, setIsLoading] = useState(false);
  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();

        setIsLoading(true);
        setTimeout(async () => {
          await onSave(value);
          setIsLoading(false);
        }, 200);
      }}
    >
      <TextInput
        value={value.toString()}
        buttons={
          <FlexBlock gap={4}>
            <EditableFieldsButtons
              isLoading={isLoading}
              onDecline={onDecline}
              iconSize={15}
            />
          </FlexBlock>
        }
        onChange={(e) => {
          const value = e.target.value;
          setValue(value);
        }}
        {...textInputProps}
      />
    </form>
  );
};

export const EditableNumberInput: FC<EditableFinanceInputProps<number>> = ({
  initialValue,
  onSave,
  onDecline,
  ...textInputProps
}) => {
  console.log(initialValue);

  const [value, setValue] = useState<number>(initialValue);
  const [isLoading, setIsLoading] = useState(false);
  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setTimeout(async () => {
          await onSave(value);
          setIsLoading(false);
        }, 200);
      }}
    >
      <TextInput
        value={`${value}`}
        buttons={
          <FlexBlock gap={4}>
            <EditableFieldsButtons
              isLoading={isLoading}
              onDecline={onDecline}
              iconSize={15}
            />
          </FlexBlock>
        }
        onChange={(e) => {
          const value = +e.target.value;

          if (!isNaN(value)) {
            setValue(value);
          }
        }}
        {...textInputProps}
      />
    </form>
  );
};

interface EditOperationNameProps {
  row: MRT_Row<TFinanceOperationWithDate>;
  table: MRT_TableInstance<TFinanceOperationWithDate>;
  updateFn: TUpdateOperationFn;
  index: number;
}

export const EditOperationName: FC<EditOperationNameProps> = ({
  row,
  table,
  updateFn,
  index,
}) => {
  return (
    <FlexBlock width={'100%'} gap={6}>
      <EditableTextInput
        initialValue={row.original.name}
        onSave={async (value) => {
          return await updateFn(
            { key: 'name', value },
            row.original,
            index
          ).then(() => table.setEditingCell(null));
        }}
        onDecline={() => table.setEditingCell(null)}
      />
    </FlexBlock>
  );
};

interface EditOperationNumberFieldsProps extends EditOperationNameProps {
  objKey: 'count' | 'value';
}

export const EditOperationNumberFields: FC<EditOperationNumberFieldsProps> = ({
  objKey,
  row,
  table,
  index,
  updateFn,
}) => {
  console.log('row: ', row);

  return (
    <EditableNumberInput
      initialValue={row.original[objKey]}
      onSave={async (value) => {
        return await updateFn({ key: objKey, value }, row.original, index).then(
          () => table.setEditingCell(null)
        );
      }}
      onDecline={() => table.setEditingCell(null)}
    />
  );
};