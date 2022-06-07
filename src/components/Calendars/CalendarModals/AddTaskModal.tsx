import { FC } from 'react'
import { AddTaskModalProps } from '../types'
import { Modal, ModalBody, ModalFooter, ModalHeader } from '../../Modal/Modal'
import { TaskTileText } from '../Cell'
import dayjs from 'dayjs'
import { DATE_RENDER_FORMAT, defaultColor } from '../../../common/constants'
import { FlexBlock } from '../../LayoutComponents/FlexBlock'
import { StyledButton } from '../../Buttons/Buttons.styled'

export const AddTaskModal: FC<AddTaskModalProps> = ( { date, onClose, onComplete } ) => {
  return (
    <Modal
      isView={!!date}
      onClose={onClose}
    >
      <ModalHeader>
        <TaskTileText maxWidth={'100%'} fs={'18px'}>
          Добавить задание на {dayjs( date?.value ).format( DATE_RENDER_FORMAT )}
        </TaskTileText>
      </ModalHeader>
      <ModalBody>
      </ModalBody>
      <ModalFooter>
        <FlexBlock justify={'flex-end'} align={'center'} width={'100%'}>
          <StyledButton onClick={() => onComplete && onComplete()}>
            Ок
          </StyledButton>
          <StyledButton
            onClick={() => onClose && onClose()}
            fillColor={'#fff'}
            textColor={defaultColor}
          >
            Закрыть
          </StyledButton>
        </FlexBlock>
      </ModalFooter>
    </Modal>
  )
}
