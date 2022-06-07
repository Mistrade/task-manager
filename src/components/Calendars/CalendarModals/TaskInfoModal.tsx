import { FC } from 'react'
import { TaskInfoModalProps } from '../types'
import { Modal, ModalBody, ModalFooter, ModalHeader } from '../../Modal/Modal'
import { TaskTileText } from '../Cell'
import { TaskInformer } from '../TaskInformer/TaskInformer'
import { FlexBlock } from '../../LayoutComponents/FlexBlock'
import { StyledButton } from '../../Buttons/Buttons.styled'
import { defaultColor } from '../../../common/constants'

export const TaskInfoModal: FC<TaskInfoModalProps> = ( { selectedTask, onClose } ) => {
  return (
    <Modal
      isView={!!selectedTask}
      onClose={() => onClose()}
    >
      <ModalHeader>
        <TaskTileText maxWidth={'100%'} fs={'18px'} data-title={selectedTask?.taskInfo.title}>
          {selectedTask?.taskInfo.title}
        </TaskTileText>
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
