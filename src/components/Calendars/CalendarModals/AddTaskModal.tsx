import { FC, useState } from 'react'
import { AddTaskModalProps } from '../types'
import { Modal, ModalBody, ModalFooter, ModalHeader } from '../../Modal/Modal'
import { TaskTileText } from '../Cell'
import dayjs from 'dayjs'
import { DATE_RENDER_FORMAT, defaultColor, getHumanizeDateValue } from '../../../common/constants'
import { FlexBlock } from '../../LayoutComponents/FlexBlock'
import { StyledButton } from '../../Buttons/Buttons.styled'
import { AddTaskForm } from '../Forms/AddTaskForm'
import { useAppDispatch } from '../../../store/hooks/hooks'
import { addEvent } from '../../../store/thunk/events'
import { Tooltip } from '../../Tooltip/Tooltip'

export const AddTaskModal: FC<AddTaskModalProps> = ( { date, onClose } ) => {
  const dispatch = useAppDispatch()

  return (
    <Modal
      isView={!!date}
      onClose={onClose}
    >
      <ModalHeader>
        <Tooltip
          text={'Дата выбирается автоматически, когда вы нажимаете "Добавить задание".\nЕсли дата была в прошлом, выберется текущий календарный день и время.'}
          children={`Добавить событие ${getHumanizeDateValue( date?.value || new Date(), false )}`}
          placement={'right'}
        />
      </ModalHeader>
      <ModalBody>
        <FlexBlock minWidth={'50vw'} maxWidth={'60vw'} grow={10}>
          <AddTaskForm
            onComplete={( value ) => {
              console.log( 'onComplete' )
              dispatch(
                addEvent( {
                  event: value,
                  onComplete: () => onClose && onClose()
                } )
              )
            }}
            onCancel={( value ) => onClose && onClose()}
            date={date}
          />
        </FlexBlock>
      </ModalBody>
    </Modal>
  )
}
