import {FC, ReactNode, Suspense} from "react";
import {Loader} from "./Loader";

export const WithSuspense: FC<{ children: ReactNode, title: string }> = ({children, title}) => {
	return (
		<Suspense fallback={<Loader title={title} isActive={true}/>}>
			{children}
		</Suspense>
	)
}