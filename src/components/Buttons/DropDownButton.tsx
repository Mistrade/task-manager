import React, {ReactNode} from "react";
import {DropDown} from "../Dropdown/DropDown";
import {SelectItemContainer} from "../Input/SelectInput/SelectItemContainer";
import {SelectListContainer} from "../Input/SelectInput/SelectListContainer";
import {DropDownRenderElementObject} from "../Dropdown/types";

interface DefaultDataElement {
	title: string,
	icon?: ReactNode,
	id: string,
}

interface DropDownButtonProps<T extends DefaultDataElement> {
	data: Array<T>,
	renderElement: (options: DropDownRenderElementObject<HTMLButtonElement>) => ReactNode,
	selectedId: string,
	onChange?: (element: T, e: React.MouseEvent<HTMLElement>) => void,
	stopPropagation?: boolean
}

export function DropDownButton<T extends DefaultDataElement>({
																															 data,
																															 renderElement,
																															 selectedId,
																															 onChange,
																															 stopPropagation
																														 }: DropDownButtonProps<T>): JSX.Element {
	return (
		<DropDown
			containerProps={{width: 'fit-content'}}
			renderElement={renderElement}
			dropDownChildren={(methods) => (
				<>
					<SelectListContainer>
						{data.map(item => (
							<SelectItemContainer
								isSelected={item.id === selectedId}
								onClick={(e) => {
									!!stopPropagation && e.stopPropagation()
									onChange && onChange(item, e)
									methods.focusOut()
								}}
							>
								{item.icon ? item.icon : <></>}
								<span>
                  {item.title}
                </span>
							</SelectItemContainer>
						))}
					</SelectListContainer>
				</>
			)}
		/>
	)
}