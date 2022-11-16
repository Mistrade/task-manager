import { TestRender } from '../../../utils/test-utils';
import { FlexBlock } from '../../LayoutComponents/FlexBlock';
import { MainHeaderUserInfo } from '../MainHeaderUserInfo';

describe('All Components MainHeader', () => {
    it('should render correctly FlexBlock', () => {
        const testChildren = 'TEST_NAME'
        const testId = 'StyledButtonTestId'
        const { getByTestId, getByText } = TestRender(
            <FlexBlock
                data-testid={testId}
            >
                {testChildren}
            </FlexBlock>
        )
        const block = getByTestId(testId)
        expect(getByText(testChildren)).toBeInTheDocument()
        expect(block).toBeInTheDocument()
        expect(block.tagName.toLowerCase()).toBe('div')
    })

    it('should render correctly FlexBlock on_data', () => {
        const testChildren = 'data_text'
        const testId = 'StyledButtonTestId'
        const { getByText } = TestRender(
            <FlexBlock
                data-testid={testId}
            >
            </FlexBlock>
        )
        expect(() => getByText(testChildren)).toThrow('Unable to find an element')
    })
})





