import { TestRender } from "../../../utils/test-utils"
import { StyledDropDownContainer } from "../DropDown.styled"

const onChange = jest.fn();

describe('All Default DropDown', () => {
    it('test-StyledDropDownContainer', () => {
        const testChildren = ''
        const testId = 'StyledDropDownContainer'
        const { getByTestId } = TestRender(
            <StyledDropDownContainer data-testid={testId}>
// todo как описать пропсы
            </StyledDropDownContainer>
        )
        const test = getByTestId(testId)
        expect(test).toBeInTheDocument()
    })
})
