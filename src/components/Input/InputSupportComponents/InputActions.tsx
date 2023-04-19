import React, { FC } from 'react';

import { InputActionDeleteElement } from './InputActionDeleteElement';
import {
  InputActionStyledItem,
  InputActionsStyledContainer,
} from './InputActions.styled';

export interface TextInputAdditionalAction {
  title: string;
  actionKey: string;
}

export interface InputActionsProps {
  actions?: Array<TextInputAdditionalAction>;
  actionHandler?: (action: TextInputAdditionalAction) => void;
  onDeleteAction?: (action: TextInputAdditionalAction) => void;
}

export const InputActions: FC<InputActionsProps> = ({
  actions,
  actionHandler,
  onDeleteAction,
}) => {
  if (actions && actionHandler) {
    const deleteActionHandler = (
      e: React.MouseEvent<HTMLSpanElement>,
      action: TextInputAdditionalAction
    ) => {
      e.stopPropagation();
      onDeleteAction && onDeleteAction(action);
    };

    return (
      <InputActionsStyledContainer>
        {actions.map((action, index) => (
          <InputActionStyledItem
            key={action.actionKey + action.title}
            type={'button'}
            onClick={() => actionHandler(action)}
            withDelete={!!onDeleteAction}
          >
            {action.title}
            <InputActionDeleteElement
              onDelete={
                onDeleteAction && ((e) => deleteActionHandler(e, action))
              }
            />
          </InputActionStyledItem>
        ))}
      </InputActionsStyledContainer>
    );
  }

  return <></>;
};
