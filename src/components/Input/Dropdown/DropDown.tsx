import { useDebounce } from '@hooks/useDebounce';
import React, { useCallback, useRef, useState } from 'react';

import { StyledDropDownContainer } from '@components/Input/Dropdown/DropDown.styled';
import {
  DropDownAdditionalMethods,
  DropDownProps,
} from '@components/Input/Dropdown/types';
import { FlexBlock } from '@components/LayoutComponents/FlexBlock';


export function DropDown<T extends HTMLElement = HTMLElement>({
  renderElement,
  dropDownChildren,
  containerProps,
}: DropDownProps<T>): JSX.Element {
  const [focused, setFocused] = useState<boolean>(false);

  const elRef = useRef<T>(null);
  const ref = useRef<HTMLDivElement>(null);

  const dFocus = useDebounce(focused, 150);

  const focusHandler = useCallback(
    (e: React.FocusEvent<T>) => {
      if (e.type === 'focus') {
        return setFocused(true);
      }

      if (e.type === 'blur') {
        const relTarget = e.relatedTarget;

        if (!relTarget || !ref.current?.contains(relTarget)) {
          return setFocused(false);
        }

        return elRef.current?.focus();
      }
    },
    [ref.current, setFocused, elRef.current]
  );

  const [methods] = useState<DropDownAdditionalMethods>({
    focusOut: () => {
      setFocused(false);
      elRef.current?.blur();
    },
  });

  const onClickHandler = useCallback((e: React.MouseEvent) => {
    setFocused(true);
  }, []);

  return (
    <FlexBlock
      width={'100%'}
      {...(containerProps || {})}
      position={'relative'}
      ref={ref}
    >
      {renderElement({
        onElementBlur: focusHandler,
        onElementFocused: focusHandler,
        ref: elRef,
        onClick: onClickHandler,
      })}
      {dFocus && (
        <StyledDropDownContainer tabIndex={1} isOpen={dFocus}>
          {dropDownChildren(methods)}
        </StyledDropDownContainer>
      )}
    </FlexBlock>
  );
}