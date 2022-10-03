import {FC} from "react";
import {pxToCssValue} from "../../LayoutComponents/FlexBlock";
import {colorPalette, disabledColor, errorColor} from "../../../common/constants";
import {EmptyButtonStyled} from "../../Buttons/EmptyButton.styled";
import {CalendarIdentifier} from "../CalendarList/CalendarList.styled";
import styled, {css} from "styled-components";
import {SelectIcon} from "../../Icons/Icons";

interface ColorSchemeProps {
	gap: number | string,
	size: number,
	onSelect?: (color: string) => void,
	isError?: boolean,
	selectedValue: string
}

const Grid = styled('div')<{ gap?: number | string, borderColor?: string }>`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  padding: 8px;
  border-radius: 4px;
  border: 1px solid ${_ => _.borderColor || disabledColor};
  width: 100%;
  justify-items: center;
  align-items: center;
`

export const ColorScheme: FC<ColorSchemeProps> = ({gap = 6, size = 30, onSelect, isError, selectedValue}) => {
	return (
		<Grid gap={gap} borderColor={isError ? errorColor : disabledColor}>
			{colorPalette.map((color) => (
				<EmptyButtonStyled style={{padding: 4}} onClick={() => onSelect && onSelect(color)}>
					{color === selectedValue && (
						<SelectIcon
							position={'absolute'}
							width={'100%'}
							height={'100%'}
							justify={'center'}
							align={'center'}
							color={'#fff'}
							size={20}
							additionalCss={css`
                top: 50%;
                left: 50%;
                transform: translateY(-50%) translateX(-50%);
							`}
						/>
					)}
					<CalendarIdentifier color={color} size={size}/>
				</EmptyButtonStyled>
			))}
		</Grid>
	)
}