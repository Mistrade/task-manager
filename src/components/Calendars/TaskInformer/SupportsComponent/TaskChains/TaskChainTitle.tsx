import {FC, ReactNode} from "react";
import {borderRadiusSize, currentColor, disabledColor} from "../../../../../common/constants";
import {EmptyButtonStyled} from "../../../../Buttons/EmptyButton.styled";
import {FlexBlock} from "../../../../LayoutComponents/FlexBlock";
import {Arrow, PlusIcon} from "../../../../Icons/Icons";
import {css} from "styled-components";
import {Badge} from "../../../../Badge/Badge";

interface TaskChainTitleProps {
	title: ReactNode,
	onClickOnAction?: () => void,
	onWrapTitle?: () => void,
	isWrap: boolean,
	content: ReactNode,
	titleBadge?: number
}

export const TaskChainTitle: FC<TaskChainTitleProps> = ({
	                                                        title,
	                                                        onClickOnAction,
	                                                        titleBadge,
	                                                        isWrap,
	                                                        onWrapTitle,
	                                                        content
                                                        }) => {
	return (
		<FlexBlock
			position={'relative'}
			direction={'row'}
			gap={12}
			justify={'flex-start'}
			align={isWrap ? 'flex-start' : 'center'}
			width={'100%'}
			p={4}
			borderRadius={borderRadiusSize.sm}
			border={!isWrap ? `1px solid ${disabledColor}` : undefined}
		>
			{onWrapTitle && (
				<FlexBlock
					height={30}
					maxWidth={30}
					align={'center'}
					direction={'row'}
					additionalCss={css`
            transform: rotate(${isWrap ? '0deg' : '90deg'});
            transition: all .3s ease-in;
					`}
				>
					<EmptyButtonStyled onClick={onWrapTitle} style={{maxHeight: 30, maxWidth: 30}}>
						<Arrow size={20} color={currentColor}/>
					</EmptyButtonStyled>
				</FlexBlock>
			)}
			<FlexBlock direction={'column'} gap={6} width={'100%'}>
				<FlexBlock direction={'row'} gap={20} height={30} justify={'space-between'} width={'100%'} align={'center'}>
					<FlexBlock fSize={18} style={{color: currentColor}} fWeight={'500'} gap={6} align={'center'}>
						{title}
						{titleBadge && (
							<Badge>
								{titleBadge}
							</Badge>
						)}
					</FlexBlock>
					{onClickOnAction && (
						<EmptyButtonStyled onClick={onClickOnAction}>
							<PlusIcon size={20} color={currentColor}/>
						</EmptyButtonStyled>
					)}
				</FlexBlock>
				<FlexBlock pl={8}>
					{content}
				</FlexBlock>
			</FlexBlock>
		</FlexBlock>
	)
}