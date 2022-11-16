// import { render } from "react-dom";
import { TestRender } from "../../../utils/test-utils"
import { Informer, StyledInformer, StyledInformerHeader, StyledInformerText } from "../Informer";
import { render, screen } from "@testing-library/react";

describe('All Informer TestGroup', () => {
    //todo
    // it('test -StyledInformer', () => {
    //     const testId = 'StyledInformerTestId'
    //     const { container, getByTestId } = TestRender(
    //         <Informer text={undefined} type={"default"} data-testid={testId}>
    //         </Informer >
    //     )

    //     const test = getByTestId(testId)
    //     expect(test).toBeInTheDocument()
    //     expect(test.tagName.toLowerCase()).toBe('div')
    // })

    it('test-StyledInformer', () => {
        const testId = 'StyledInformer'
        const testChildren = 'Test-text'
        const header = "header-text"
        const text = "testing-message"
        const { getByTestId, getByText } = TestRender(
            <StyledInformer
                data-testid={testId}
                type="info"
            >
                {header && (
                    <StyledInformerHeader>
                        {header}
                    </StyledInformerHeader>
                )}
                <StyledInformerText>
                    {text}
                </StyledInformerText>
            </StyledInformer>
        )
        const test = getByTestId(testId)
        expect(test).toBeInTheDocument()
        expect(getByText(header)).toBeInTheDocument()
        expect(getByText(text)).toBeInTheDocument()
    })


    it('test-StyledInformerHeader', () => {
        const testId = 'StyledInformerHeader'
        const testChildren = 'TEST-text'
        const { getByTestId, getByText } = TestRender(
            <StyledInformerHeader data-testid={testId}>
                {testChildren}
            </StyledInformerHeader>
        )

        const test = getByTestId(testId)
        expect(test).toBeInTheDocument()
        expect(getByText(testChildren)).toBeInTheDocument()
        expect(test.tagName.toLowerCase()).toBe('h4')
    })

    it('test-StyledInformerText', () => {
        const testId = 'StyledInformerText'
        const testChildren = 'test-text'
        const { container, getByTestId, getByText } = TestRender(
            <StyledInformerText data-testid={testId}>
                {testChildren}
            </StyledInformerText>
        )
        const test = getByTestId(testId)
        expect(container).toMatchSnapshot()
        expect(test).toBeInTheDocument()
        expect(getByText(testChildren)).toBeInTheDocument()
        expect(test.tagName.toLowerCase()).toBe('p')

        // const { container } = render(<StyledInformerText>{testChildren}</StyledInformer>>)
    })

    //todo

    it('render StyledInformerHeader', () => {
        const testChildren = 'test-text'
        render(<StyledInformerHeader>{testChildren}</StyledInformerHeader>)
        //todo
        // expect(screen.getByRole('h4')).toBeInTheDocument()
        expect(screen.getByText(testChildren)).toBeInTheDocument()
    })

    it('render StyledInformerText', () => {
        const testChildren = 'test-text'
        render(<StyledInformerText>{testChildren}</StyledInformerText>)
        const linkElement = screen.getByText(testChildren);
        expect(linkElement).toBeInTheDocument();
    })
})
