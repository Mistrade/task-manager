import {useNavigate} from "react-router-dom";
import {useLocation} from "react-router";

export const useSearchNavigate = () => {
	const navigate = useNavigate()
	const location = useLocation()
	
	return (url: string, options?: { replace: boolean }) => {
		const urlRes = location.search ? url + location.search : url
		navigate(urlRes, options)
	}
}