import { useGroupList } from '@hooks/useGroupList';
import React from 'react';

import { FlexBlock, VerticalScroll } from '@components/LayoutComponents';

import { Delay } from '../../../common/functions';
import { GroupItemWithContextMenu } from './GroupItemWithContextMenu';
import { GroupListStyled } from './styled';

export const GroupListShort = () => {
  const { currentData, onDelete, onEdit, changeHandler, onCreateEvent } =
    useGroupList();

  return (
    <FlexBlock direction={'column'} width={'100%'} grow={3} overflow={'hidden'}>
      {/*<FlexBlock direction={'column'} height={'100%'}>*/}
      <VerticalScroll useShadow={true} renderPattern={'top-bottom'}>
        <GroupListStyled>
          {currentData?.data?.map((item, index) => {
            return (
              <GroupItemWithContextMenu
                onCreateEvent={onCreateEvent}
                index={index}
                renderPattern={'short'}
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
      </VerticalScroll>
      {/*</FlexBlock>*/}
    </FlexBlock>
  );
};
