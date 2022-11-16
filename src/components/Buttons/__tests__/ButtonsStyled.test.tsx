import { TestRender } from "../../../utils/test-utils"
import { Button, LinkButton, StyledButton, WhiteButton, JoinToEventButton } from "../Buttons.styled"

describe('All Default Buttons TestGroup', () => {
    it('test-StyledButton', () => {
        const testChildren = 'TEST'
        const testId = 'StyledButtonTestId'
        const { container, getByTestId, getByText } = TestRender(
            <StyledButton
                data-testid={testId}
            >
                {testChildren}
            </StyledButton>
        )
        const button = getByTestId(testId)
        expect(getByText(testChildren)).toBeInTheDocument()
        expect(button).toBeInTheDocument()
        expect(button.tagName.toLowerCase()).toBe('button')
    })

    it('test render JoinToEventButton', () => {
        const text = "Join To Event"
        const testId = "JoinToEventTestId"
        const { getByTestId, getByText } = TestRender(
            <JoinToEventButton data-testid={testId}>
                {text}
            </JoinToEventButton>
        )
        const link = getByTestId(testId)
        expect(link).toBeInTheDocument()
        expect(getByText(text)).toBeInTheDocument()
        expect(link.tagName.toLowerCase()).toBe('a')
    })

    it('test render WhiteButton', () => {
        const text = "White Button"
        const testId = "WhiteButtonTestId"
        const { getByTestId, getByText } = TestRender(
            <WhiteButton data-testid={testId}>
                {text}
            </WhiteButton>
        )
        const link = getByTestId(testId)
        expect(link).toBeInTheDocument()
        expect(getByText(text)).toBeInTheDocument()
        expect(link.tagName.toLowerCase()).toBe('button')
    })

    it('test render Button', () => {
        const text = "button_text"
        const testId = "buttonTestId"
        const { getByTestId, getByText } = TestRender(
            <Button data-testid={testId}>{text}</Button>
        )
        const link = getByTestId(testId)
        expect(link).toBeInTheDocument()
        expect(getByText(text)).toBeInTheDocument()
        expect(link.tagName.toLowerCase()).toBe('button')
    })

    it('test render Button', () => {
        const text = "button_text"
        const testId = "buttonTestId"
        const { getByTestId, getByText } = TestRender(
            <LinkButton data-testid={testId}>{text}</LinkButton>
        )
        const link = getByTestId(testId)
        expect(link).toBeInTheDocument()
        expect(getByText(text)).toBeInTheDocument()
        expect(link.tagName.toLowerCase()).toBe('a')
    })
})
