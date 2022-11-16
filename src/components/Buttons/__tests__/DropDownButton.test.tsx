import { act, getByText } from "@testing-library/react";
import { TestRender } from "../../../utils/test-utils";
import { DropDownButton } from './../DropDownButton'
import { StyledButton } from './../Buttons.styled'
import userEvent from '@testing-library/user-event'
import { SelectListContainer } from "../../Input/SelectInput/SelectListContainer";
import ReactDOM from "react-dom";
import { ReactNode } from "react";
import { DropDownRenderElementObject } from "../../Dropdown/types";

const delay = (delayInms: number) => {
    return new Promise(resolve => setTimeout(resolve, delayInms));
}

describe('', () => {
    it('DropdownButton should in the document', async () => {
        const testid = "button--testid"
        const { getByTestId, queryByTestId, container } = TestRender(
            <DropDownButton
                data={[]}
                renderElement={(props) => (
                    // <>
                        // <SelectListContainer
                        //     data-testid={testid}
                        // // onClick={props.onClick}
                        // // onFocus={props.onElementFocused}
                        // // onBlur={props.onElementBlur}
                        // // ref={props.ref}
                        // />

                        <StyledButton
                            data-testid={testid}
                            onClick={props.onClick}
                            onFocus={props.onElementFocused}
                            onBlur={props.onElementBlur}
                            ref={props.ref}
                        />
                    // </>
                )}
                selectedId='123'
            />
        )

        const button = getByTestId(testid)
        // const listContainer = queryByTestId("dropdownButton--list--container")
        expect(button).toBeInTheDocument()
        // expect(listContainer).not.toBeInTheDocument()

        userEvent.click(button)

        // expect(getByTestId("dropdownButton--list--container")).toBeInTheDocument()
        
        // const get = async () => {
        //     await delay(300)
        //     console.log(123)
        //     return getByTestId("dropdownButton--list--container")
        // }

        // expect(get()).resolves.toBeInTheDocument()


    })
});
