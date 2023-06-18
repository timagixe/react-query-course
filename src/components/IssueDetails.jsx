import { useParams } from "react-router-dom";
import useIssueCommentsQuery from "../hooks/useCommentsQuery";
import useIssueQuery from "../hooks/useIssueQuery";
import IssueHeader from "./IssueHeader";
import Comment from "./Comment";
import { memo } from "react";
import IssueStatus from "./IssueStatus";
import IssueAssignment from "./IssueAssignment";
import IssueLabels from "./IssueLabels";
import useScrollToBottomAction from "../hooks/useScrollToBottomAction";
import Loader from "./Loader";

function IssueDetails() {
    const { number } = useParams();
    const issueQuery = useIssueQuery(number);
    const commentsQuery = useIssueCommentsQuery(number);

    useScrollToBottomAction(
        document,
        () => {
            if (commentsQuery.isFetching) return;
            commentsQuery.fetchNextPage();
        },
        100
    );

    return (
        <div className="issue-details">
            {issueQuery.isLoading ? (
                <p>Loading issue...</p>
            ) : (
                <>
                    <IssueHeader
                        title={issueQuery.data.title}
                        number={issueQuery.data.number}
                        status={issueQuery.data.status}
                        createdBy={issueQuery.data.createdBy}
                        createdDate={issueQuery.data.createdDate}
                        comments={issueQuery.data.comments}
                    />

                    <main>
                        <section>
                            {commentsQuery.isLoading ? (
                                <p>Loading...</p>
                            ) : (
                                commentsQuery.data?.pages.map((commentsPage) =>
                                    commentsPage.map((comment) => (
                                        <Comment
                                            key={comment.id}
                                            comment={comment.comment}
                                            createdBy={comment.createdBy}
                                            createdDate={comment.createdDate}
                                        />
                                    ))
                                )
                            )}
                            <Loader />
                        </section>
                        <aside>
                            <IssueStatus
                                issueNumber={issueQuery.data.number.toString()}
                                status={issueQuery.data.status}
                            />
                            <IssueAssignment
                                assignee={issueQuery.data.assignee}
                                issueNumber={issueQuery.data.number.toString()}
                            />
                            <IssueLabels
                                labels={issueQuery.data.labels}
                                issueNumber={issueQuery.data.number.toString()}
                            />
                        </aside>
                    </main>
                </>
            )}
        </div>
    );
}

export default memo(IssueDetails);
