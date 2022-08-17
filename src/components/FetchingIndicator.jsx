import { useIsFetching } from "react-query"
import { memo } from "react";
import Loader from "./Loader";

function FetchingIndicator() {
    const isFetching = useIsFetching();

    if (!isFetching) return null;

    return (
        <div className="fetching-indicator">
            <Loader />
        </div>
    );
}

export default memo(FetchingIndicator);
