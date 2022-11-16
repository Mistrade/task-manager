import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import { CalendarNameCheckbox } from '../CalendarList.styled';


describe('Tooltip component testing', () => {
    it('render TooltipContent', () => {
        const onChange = jest.fn();
        render(<CalendarNameCheckbox
            color={'red'}
            onChange={onChange}
        />)
        expect(onChange).toHaveBeenCalledTimes(0);
        userEvent.type(screen.getByRole('textbox'), 'React');
        expect(onChange).toBeCalled()
        expect(onChange).toHaveBeenCalledTimes(5);
        expect(onChange).not.toHaveBeenCalledTimes(4);
    })
})

const sum = (a: any, b: any) => a + b;
test('sum_test', () => {
    expect(sum(5, 2)).toBe(7);
    expect(sum(5, 2)).not.toBe(6);
});
