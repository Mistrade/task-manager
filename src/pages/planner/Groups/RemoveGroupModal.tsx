import { FC } from 'react';

import { Button, WhiteButton } from '@components/Buttons/Buttons.styled';
import { FlexBlock } from '@components/LayoutComponents';
import {
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from '@components/LayoutComponents/Modal/Modal';

import { useRemoveGroupMutation } from '@api/planning-api';
import { CatchHandleForToast, thenHandleForToast } from '@api/tools';

import { RemoveGroupHockProps, RemoveGroupModalProps } from './groups.types';


export const RemoveGroupHock: FC<RemoveGroupHockProps> = (props) => {
  if (props.groupInfo !== null) {
    return (
      <RemoveGroupModal {...props} count={0} groupInfo={props.groupInfo} />
    );
  }

  return <></>;
};

export const RemoveGroupModal: FC<RemoveGroupModalProps> = ({
  groupInfo,
  count,
  onSuccess,
  onClose,
}) => {
  const [removeGroup, { data }] = useRemoveGroupMutation();
  return (
    <Modal style={{ height: 'fit-content' }} isView={true} onClose={onClose}>
      <ModalHeader>
        Вы действительно собираетесь удалить "{groupInfo.title}" ?
      </ModalHeader>
      <ModalBody>
        <FlexBlock p={20} direction={'column'} width={'100%'}>
          <FlexBlock width={'100%'} justify={'center'} direction={'column'}>
            Вы уверены, что хотите удалить группу событий: "{groupInfo.title}"?
            <br />
            <strong>
              Все события, закрепленные за данной группой, будут так же удалены.
            </strong>
          </FlexBlock>
        </FlexBlock>
      </ModalBody>
      <ModalFooter>
        <FlexBlock
          direction={'row'}
          justify={'flex-end'}
          align={'center'}
          width={'100%'}
          gap={8}
        >
          <Button
            type={'button'}
            onClick={async () => {
              await removeGroup({
                groupId: groupInfo._id,
              })
                .unwrap()
                .then((data) =>
                  thenHandleForToast(data, () => onSuccess && onSuccess())
                )
                .catch(CatchHandleForToast);
            }}
          >
            Удалить
          </Button>
          <WhiteButton onClick={onClose}>Отмена</WhiteButton>
        </FlexBlock>
      </ModalFooter>
    </Modal>
  );
};