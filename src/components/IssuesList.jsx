import useIssuesQuery from "../hooks/useIssuesQuery";
import IssueItem from "./IssueItem";
import { memo, useState, useCallback } from "react";
import useSearchIssuesQuery from "../hooks/useSearchIssuesQuery";
import isIdleLoading from "../helpers/isIdleLoading";
import Loader from "./Loader";

function IssuesList({ selectedLabels, selectedStatus, pageNumber, onPageChange }) {
    const issuesQuery = useIssuesQuery({
        labels: selectedLabels,
        status: selectedStatus,
        pageNumber
    });

    const [searchValue, setSearchValue] = useState("");

    const searchIssuesQuery = useSearchIssuesQuery(searchValue);

    const onSubmit = useCallback((event) => {
        event.preventDefault();
        setSearchValue(event.target.elements.search.value);
    }, []);

    const onSearchChange = useCallback(
        (event) => {
            if (!event.target.value.length) {
                setSearchValue("");
            }
        },
        [setSearchValue]
    );

    return (
        <div>
            <form onSubmit={onSubmit}>
                <label htmlFor="search">Search Issues</label>
                <input
                    type="search"
                    placeholder="Search"
                    name="search"
                    id="search"
                    onChange={onSearchChange}
                />
            </form>
            <h2>
                {Boolean(searchValue)
                    ? "Search Results"
                    : ["Issues List", issuesQuery.isFetching && <Loader />]}
            </h2>
            {issuesQuery.isLoading ? (
                <p>Loading...</p>
            ) : issuesQuery.isError ? (
                <p>{issuesQuery.error.message}</p>
            ) : isIdleLoading(searchIssuesQuery) ? (
                <>
                    <ul className="issues-list">
                        {issuesQuery.data.map((issue) => (
                            <IssueItem
                                key={issue.id}
                                title={issue.title}
                                number={issue.number}
                                assignee={issue.assignee}
                                commentCount={issue.comments.length}
                                createdBy={issue.createdBy}
                                createdDate={issue.createdDate}
                                labels={issue.labels}
                                status={issue.status}
                            />
                        ))}
                    </ul>
                    <div className="pagination">
                        <button
                            onClick={() => {
                                if (pageNumber - 1 > 0) {
                                    onPageChange(pageNumber - 1);
                                }
                            }}
                            disabled={pageNumber === 1}
                        >
                            Previous
                        </button>
                        <p>
                            Page {pageNumber} {issuesQuery.isFetching ? "..." : ""}
                        </p>
                        <button
                            disabled={issuesQuery.data?.length === 0 || issuesQuery.isPreviousData}
                            onClick={() => {
                                if (issuesQuery.data?.length !== 0 && !issuesQuery.isPreviousData) {
                                    onPageChange(pageNumber + 1);
                                }
                            }}
                        >
                            Next
                        </button>
                    </div>
                </>
            ) : (
                <>
                    {searchIssuesQuery.isLoading ? (
                        <p>Loading...</p>
                    ) : (
                        <>
                            <p>{searchIssuesQuery.data.count} Results</p>
                            <ul className="issues-list">
                                {searchIssuesQuery.data.items.map((issue) => (
                                    <IssueItem
                                        key={issue.id}
                                        title={issue.title}
                                        number={issue.number}
                                        assignee={issue.assignee}
                                        commentCount={issue.comments.length}
                                        createdBy={issue.createdBy}
                                        createdDate={issue.createdDate}
                                        labels={issue.labels}
                                        status={issue.status}
                                    />
                                ))}
                            </ul>
                        </>
                    )}
                </>
            )}
        </div>
    );
}

export default memo(IssuesList);
