import { FC } from 'react'
import { TaskInfoModalProps } from '../types'
import { Modal, ModalBody, ModalFooter, ModalHeader } from '../../Modal/Modal'
import { TaskTileText } from '../Cell'
import { TaskInformer } from '../TaskInformer/TaskInformer'
import { FlexBlock } from '../../LayoutComponents/FlexBlock'
import { StyledButton } from '../../Buttons/Buttons.styled'
import { defaultColor } from '../../../common/constants'
import { Tooltip } from '../../Tooltip/Tooltip'

export const TaskInfoModal: FC<TaskInfoModalProps> = ( { selectedTask, onClose } ) => {
  return (
    <Modal
      isView={!!selectedTask}
      onClose={() => onClose()}
    >
      <ModalHeader>
        Событие #{selectedTask?.taskInfo.id || ''}
      </ModalHeader>
      <ModalBody>
        <TaskInformer taskItem={selectedTask}/>
      </ModalBody>
      <ModalFooter>
        <FlexBlock justify={'end'} align={'center'} width={'100%'}>
          <StyledButton>
            Ок
          </StyledButton>
          <StyledButton
            onClick={() => onClose()}
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
