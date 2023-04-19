import { FC, useCallback, useMemo } from 'react';

import { CheckList } from '@components/CheckList';
import { Checkbox } from '@components/Input/Checkbox/Checkbox';
import { FlexBlock } from '@components/LayoutComponents';

import { MaxHeightHidden } from '@planner/Forms/CreateEvent/CreateEventForm';
import { ICheckListItem } from '@planner/planner.types';

import { BaseCreateEventTabProps } from './Info';


export const CreateEventFormAdditional: FC<BaseCreateEventTabProps> = ({
  values,
  setFieldValue,
  setFieldTouched,
  touched,
  errors,
}) => {
  const checkListItems = useMemo(() => {
    return values.checkList.data;
  }, [values.checkList.data]);

  const addCheckListItemHandler = useCallback(
    async (value: string): Promise<boolean> => {
      if (!value.length) return false;

      const arr = [...checkListItems];

      arr.push({
        title: value,
        state: false,
        eventLink: null,
        _id: new Date().getTime().toString(),
      });

      setFieldValue('checkList.data', arr);
      return true;
    },
    [setFieldValue, checkListItems]
  );

  const editHandler = useCallback(
    async (item: ICheckListItem): Promise<boolean> => {
      const arr = [...checkListItems];

      const index = arr.findIndex((arrItem) => arrItem._id === item._id);

      if (index === -1) return false;

      arr[index] = item;

      setFieldValue('checkList.data', arr);
      return true;
    },
    [setFieldValue, checkListItems]
  );

  const removeHandler = useCallback(
    async (item: ICheckListItem): Promise<boolean> => {
      const arr = [...checkListItems];
      const index = arr.findIndex((arrItem) => arrItem._id === item._id);

      if (index === -1) {
        return false;
      }

      arr.splice(index, 1);

      setFieldValue('checkList.data', arr);
      return true;
    },
    [setFieldValue, checkListItems]
  );

  const changeTitleHandler = useCallback(
    async (value: string): Promise<boolean> => {
      setFieldValue('checkList.title', value);
      return true;
    },
    [setFieldValue]
  );

  return (
    <>
      <FlexBlock
        direction={'column'}
        width={'100%'}
        gap={12}
        height={'100%'}
        maxHeight={'100%'}
      >
        <Checkbox
          isChecked={values.attachCheckList}
          onChange={({ target }) => {
            setFieldValue('attachCheckList', target.checked);
          }}
          type={'checkbox'}
          title={'Приложить к событию чек-лист'}
          id={'create__event--checklist'}
        />

        {values.attachCheckList && (
          <MaxHeightHidden>
            <CheckList
              title={values.checkList.title}
              onChangeTitle={changeTitleHandler}
              onSaveNewElement={addCheckListItemHandler}
              checkList={values.checkList.data}
              onItemChange={editHandler}
              onRemoveItem={removeHandler}
            />
          </MaxHeightHidden>
        )}
      </FlexBlock>
    </>
  );
};