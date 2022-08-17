import { FaSpinner } from "react-icons/fa";
import { memo } from "react";

function Loader() {
    return <FaSpinner className="loader" />;
}

export default memo(Loader);
