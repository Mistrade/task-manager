import { act, getByText } from "@testing-library/react";
import { ReactElement, JSXElementConstructor, ReactFragment, ReactPortal } from "react";
import { TestRender } from "../../../utils/test-utils";
import { FlexBlock } from "../../LayoutComponents/FlexBlock";
import { TooltipContent } from "../Tooltip.styled";

describe('Tooltip component testing', () => {
    it('render TooltipContent', () => {
        const testId = "button--testid"
        const testText = 'Tooltip text'
        const { container, getByTestId, getByText } = TestRender(
            <TooltipContent
                data-testid={testId}
                isVisible={true}
                left={0}
                top={0}
                opacity={1}
                placement={'top'}
            >
                {testText}
            </TooltipContent>
        )
        const span = getByTestId(testId)
        expect(getByText(/tooltip text/i)).toBeInTheDocument()
        expect(span).toBeInTheDocument()
        expect(span.tagName.toLowerCase()).toBe('span')
    })

    it('render TooltipContent', () => {
        const testId = "span--testid"
        const testId2 = "div--testid"
        const testText = 'Tooltip text'
        const { container, getByTestId, getByText } = TestRender(
            <TooltipContent
                data-testid={testId}
                isVisible={false}
                left={0}
                top={0}
                opacity={1}
                placement={'top'}
            >
                <FlexBlock
                    data-testid={testId2}
                >
                    {'testing-string'}
                </FlexBlock>
                {testText}
            </TooltipContent>
        )
        const flexblock = getByTestId(testId2)
        expect(getByText(testText)).toBeInTheDocument()
        expect(getByText('testing-string')).toBeInTheDocument()
        expect(flexblock.tagName.toLowerCase()).toBe('div')
    })
})