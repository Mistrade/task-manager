import React, { ReactNode } from 'react';

import { SelectItemContainer } from '@components/Input/SelectInput/SelectItemContainer';
import { SelectListContainer } from '@components/Input/SelectInput/SelectListContainer';
import { Tooltip } from '@components/Tooltip/Tooltip';

interface DefaultDataElement {
  title: string;
  icon?: ReactNode;
  id: string;
}

interface DropDownButtonProps<T extends DefaultDataElement> {
  data: Array<T>;
  renderElement: ReactNode;
  selectedId?: string;
  onChange?: (element: T, e: React.MouseEvent<HTMLElement>) => void;
  stopPropagation?: boolean;
}

export function DropDownButton<T extends DefaultDataElement>({
  data,
  renderElement,
  selectedId,
  onChange,
  stopPropagation,
}: DropDownButtonProps<T>): JSX.Element {
  return (
    <Tooltip
      placement={'bottom'}
      offset={[0, 10]}
      interactive={true}
      interactiveBorder={20}
      hideOnClick={true}
      theme={'light'}
      trigger={'click'}
      delay={100}
      content={
        <SelectListContainer>
          {data.map((item) => (
            <SelectItemContainer
              key={item.id}
              isSelected={item.id === selectedId}
              onClick={(e) => {
                !!stopPropagation && e.stopPropagation();
                onChange && onChange(item, e);
              }}
            >
              {item.icon ? item.icon : <></>}
              <span>{item.title}</span>
            </SelectItemContainer>
          ))}
        </SelectListContainer>
      }
    >
      {renderElement}
    </Tooltip>
  );
}
