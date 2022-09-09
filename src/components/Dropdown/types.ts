import React, {ReactNode} from "react";
import {FlexBlockProps} from "../LayoutComponents/FlexBlock";

export type DropDownElementsSupport = HTMLButtonElement | HTMLInputElement | HTMLTextAreaElement

export interface DropDownRenderElementObject<T extends DropDownElementsSupport = HTMLInputElement> {
	ref: React.RefObject<T>,
	onElementFocused: (e: React.FocusEvent<T>) => void,
	onElementBlur: (e: React.FocusEvent<T>) => void,
}

export interface DropDownProps<T extends DropDownElementsSupport = HTMLInputElement> {
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