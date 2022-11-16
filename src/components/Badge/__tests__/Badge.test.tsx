import { TestRender } from "../../../utils/test-utils"
import { Badge } from '../Badge';

describe('Default badge TestGroup', () => {
    it('test-Badge', () => {
        const testId = 'StyledBadgeTestId'
        const { getByTestId } = TestRender(
            <Badge data-testid={testId} />
        )

        const badge = getByTestId(testId)
        expect(badge).toBeInTheDocument()
        expect(badge.tagName.toLowerCase()).toBe('span')
    })
})