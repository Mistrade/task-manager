import { TestRender } from "../../../utils/test-utils"
import { Heading } from "../Heading"

describe("Render tag Heading: H1 and H2", () => {
    it('Test render tag H1', () => {
        const textChilden = 'TEST_H1'
        const testId = 'styledTagH1test'
        const { getByTestId, getByText } = TestRender(
            <Heading.H1 data-testid={testId}>
                {textChilden}
            </Heading.H1>
        )
        const h1 = getByTestId(testId)
        expect(getByText(textChilden)).toBeInTheDocument()
        expect(h1).toBeInTheDocument()
        expect(h1.tagName.toLowerCase()).toBe('h1')
        expect(h1.tagName.toLowerCase()).not.toBe('h2')
    })

    it('Test render tag H2', () => {
        const textChilden = 'TEST_H2'
        const testId = 'styledTagH1test'
        const { getByTestId, getByText } = TestRender(
            <Heading.H2 data-testid={testId}>
                {textChilden}
            </Heading.H2>
        )
        const h2 = getByTestId(testId)
        expect(getByText(textChilden)).toBeInTheDocument()
        expect(h2).toBeInTheDocument()
        expect(h2.tagName.toLowerCase()).toBe('h2')
        expect(h2.tagName.toLowerCase()).not.toBe('h1')
    })
})
