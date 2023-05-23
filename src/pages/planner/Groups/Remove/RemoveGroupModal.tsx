import { useSearchNavigate } from '@hooks/useSearchNavigate';
import { useAppSelector } from '@redux/hooks/hooks';
import { plannerSelectLayout } from '@selectors/planner';
import { FC, useContext } from 'react';
import { useParams } from 'react-router';

import { SERVICES_NAMES } from '@src/common/constants/enums';
import { getPath } from '@src/common/functions';

import { Button, WhiteButton } from '@components/Buttons/Buttons.styled';
import { ErrorScreen } from '@components/Errors/ErrorScreen';
import { FlexBlock } from '@components/LayoutComponents';
import {
  Modal,
  ModalBody,
  ModalContext,
  ModalFooter,
  ModalHeader,
} from '@components/LayoutComponents/Modal/Modal';
import { Loader } from '@components/Loaders/Loader';

import {
  useGetGroupInfoQuery,
  useRemoveGroupMutation,
} from '@api/planning-api';
import { CatchHandleForToast, thenHandleForToast } from '@api/tools';

export interface RemoveGroupModalContentProps {
  onClose: () => void;
}

const RemoveGroupModalContent: FC<RemoveGroupModalContentProps> = ({
  onClose,
}) => {
  const [removeGroup, { data }] = useRemoveGroupMutation();
  const { groupId } = useParams<{ groupId?: string }>();
  const {
    data: groupInfo,
    isError,
    isFetching,
  } = useGetGroupInfoQuery(groupId || '', {
    skip: !groupId,
  });

  const modalContext = useContext(ModalContext);

  const closeHandler = (action: () => any) => {
    if (modalContext?.closeModalAnimation) {
      modalContext.closeModalAnimation().then(action);
    } else {
      action();
    }
  };

  if (isFetching) {
    return <Loader isActive={true} title={'Загрузка данных'} />;
  }

  if (groupInfo?.data) {
    return (
      <>
        <ModalHeader>
          Вы действительно собираетесь удалить "{groupInfo?.data?.title}" ?
        </ModalHeader>
        <ModalBody>
          <FlexBlock p={20} direction={'column'} width={'100%'}>
            <FlexBlock width={'100%'} justify={'center'} direction={'column'}>
              Вы уверены, что хотите удалить группу событий: "
              {groupInfo.data.title}
              "?
              <br />
              <strong>
                Все события, закрепленные за данной группой, будут так же
                удалены.
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
                if (groupInfo.data?._id) {
                  await removeGroup({
                    groupId: groupInfo.data._id,
                  })
                    .unwrap()
                    .then((data) => {
                      thenHandleForToast(data);
                      closeHandler(onClose);
                    })
                    .catch(CatchHandleForToast);
                }
              }}
            >
              Удалить
            </Button>
            <WhiteButton onClick={() => closeHandler(onClose)}>
              Отмена
            </WhiteButton>
          </FlexBlock>
        </ModalFooter>
      </>
    );
  }

  return (
    <ErrorScreen
      title={'Не удалось загрузить информацию о группе событий'}
      errorType={'ERR_FORBIDDEN'}
    />
  );
};

export const RemoveGroupModal: FC = () => {
  const navigate = useSearchNavigate();
  const layout = useAppSelector(plannerSelectLayout);

  const onClose = () => {
    navigate(getPath(SERVICES_NAMES.PLANNER, layout), { replace: true });
  };

  return (
    <Modal style={{ height: 'fit-content' }} isView={true} onClose={onClose}>
      <RemoveGroupModalContent onClose={onClose} />
    </Modal>
  );
};
