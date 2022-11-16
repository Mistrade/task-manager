import { render, screen } from '@testing-library/react';
import { EmptyButtonStyled } from '../EmptyButton.styled';

describe('block test EmptyButtonStyled', () => {
    it('EmptyButtonStyled component + data', () => {
        render(<EmptyButtonStyled>button-text</EmptyButtonStyled>)
        const Buttontext = screen.getByText('button-text');
        expect(Buttontext).toBeInTheDocument();
        expect(screen.getByRole('button')).toBeInTheDocument();
    })

    it('EmptyButtonStyled component no_data', () => {
        render(<EmptyButtonStyled />)
        // const Buttontext = screen.getByText('button-text');
        // expect(Buttontext).toBeInTheDocument();
        expect(screen.getByRole('button')).toBeInTheDocument();
        expect(screen.queryByRole('p')).toBeNull();
    })

    it('EmptyButtonStyled snapshot', () => {
        const button = render(<EmptyButtonStyled/>);
        expect(button).toMatchSnapshot();
    })
})