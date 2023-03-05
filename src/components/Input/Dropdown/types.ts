import React, {ReactNode} from "react";
import {FlexBlockProps} from "../../LayoutComponents/FlexBlock";

export type DropDownElementsSupport = HTMLButtonElement | HTMLInputElement | HTMLTextAreaElement

export interface DropDownRenderElementObject<T extends HTMLElement = HTMLInputElement> {
	ref: React.RefObject<T>,
	onElementFocused: (e: React.FocusEvent<T>) => void,
	onElementBlur: (e: React.FocusEvent<T>) => void,
	onClick: (e: React.MouseEvent) => void
}

export interface DropDownProps<T extends HTMLElement = HTMLInputElement> {
	renderElement: (options: DropDownRenderElementObject<T>) => ReactNode,
	dropDownChildren: (methods: DropDownAdditionalMethods) => ReactNode,
	containerProps?: FlexBlockProps
}

export interface DropDownContainerProps {
	isOpen: boolean,
}

export interface DropDownAdditionalMethods {
	focusOut: () => void
}