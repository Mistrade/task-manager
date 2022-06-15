import { FC, useState } from 'react'
import { AddTaskModalProps } from '../types'
import { Modal, ModalBody, ModalFooter, ModalHeader } from '../../Modal/Modal'
import { TaskTileText } from '../Cell'
import dayjs from 'dayjs'
import { DATE_RENDER_FORMAT, defaultColor, getHumanizeDateValue } from '../../../common/constants'
import { FlexBlock } from '../../LayoutComponents/FlexBlock'
import { StyledButton } from '../../Buttons/Buttons.styled'
import { AddTaskForm } from '../Forms/AddTaskForm'

export const AddTaskModal: FC<AddTaskModalProps> = ( { date, onClose, onComplete } ) => {
  const [startDate, setStartDate] = useState<{ start: Date, end: Date }>( {
    start: date?.value || new Date(),
    end: dayjs( date?.value || new Date() ).add( 1, 'hour' ).toDate()
  } )

  return (
    <Modal
      isView={!!date}
      onClose={onClose}
    >
      <ModalHeader>
        <TaskTileText maxWidth={'100%'} fs={'18px'}>
          Добавить событие
          на {getHumanizeDateValue( startDate.start )} - {getHumanizeDateValue( startDate.end )}
        </TaskTileText>
      </ModalHeader>
      <ModalBody>
        <FlexBlock minWidth={'50vw'} maxWidth={'60vw'} grow={10}>
          <AddTaskForm
            date={date}
            onChangeDate={( date ) => setStartDate( date )}
          />
        </FlexBlock>
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
