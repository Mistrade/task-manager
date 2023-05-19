import { useGroupList } from '@hooks/useGroupList';
import React, { memo } from 'react';

import { Delay } from '@src/common/functions';
import { GroupListStyled } from '@src/pages/planner/Groups/styled';

import { LayoutAccordion } from '@components/Accordion/LayoutAccordion';
import Badge from '@components/Badge';
import { CutText } from '@components/Text/Text';

import { GroupItem } from './GroupItem';
import { GroupListScrollContainer } from './ScrollContainer';

export const GroupList = memo(() => {
  const { currentData, onDelete, onEdit, changeHandler, onCreateEvent } =
    useGroupList();
  return (
    <LayoutAccordion
      containerProps={{ pl: 0, pr: 0 }}
      initialState={true}
      type={'info'}
      title={
        <CutText rows={1} fontSize={16}>
          {currentData?.data?.length ? (
            <Badge type={'primary'}>{currentData.data.length}</Badge>
          ) : (
            0
          )}{' '}
          Групп событий
        </CutText>
      }
    >
      <GroupListScrollContainer>
        <GroupListStyled>
          {currentData?.data?.map((item, index) => {
            return (
              <GroupItem
                onCreateEvent={onCreateEvent}
                renderPattern={'full'}
                item={item}
                key={item._id}
                onDelete={onDelete}
                isChecked={item.isSelected}
                onEdit={onEdit}
                onSuccessChangeSelect={async () => await Delay(1000)}
                onChange={changeHandler}
              />
            );
          })}
        </GroupListStyled>
      </GroupListScrollContainer>
    </LayoutAccordion>
  );
});
