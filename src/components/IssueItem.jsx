import { useCallback } from "react";
import { Link } from "react-router-dom";
import { GoIssueClosed, GoIssueOpened, GoComment } from "react-icons/go";
import { relativeDate } from "../helpers/relativeDate";
import { issueUtils } from "../helpers/issueUtils";
import { memo } from "react";
import useUserQuery from "../hooks/useUserQuery";
import Label from "./Label";
import { useQueryClient } from "react-query";
import { fetchIssuesCommentsFunction } from "../hooks/useCommentsQuery";
import { fetchIssueFunction } from "../hooks/useIssueQuery";

function IssueItem({
  title,
  number,
  assignee,
  commentCount,
  createdBy,
  createdDate,
  labels,
  status,
}) {
  const queryClient = useQueryClient();
  const assigneeQuery = useUserQuery(assignee);
  const createdByQuery = useUserQuery(createdBy);

  const onMouseEnterLiElement = useCallback(() => {
    queryClient.prefetchQuery(
      [{ scope: "issue", number: String(number) }],
      fetchIssueFunction
    );

    queryClient.prefetchQuery(
      [{ scope: "issueComments", number: String(number) }],
      fetchIssuesCommentsFunction
    );
  }, [queryClient, number]);

  return (
    <li onMouseEnter={onMouseEnterLiElement}>
      <div>
        {issueUtils.isClosed(status) ? (
          <GoIssueClosed style={{ color: "red" }} />
        ) : (
          <GoIssueOpened style={{ color: "green" }} />
        )}
      </div>
      <div className="issue-content">
        <span>
          <Link to={`/issue/${number}`}>{title}</Link>
          {labels.map((label) => (
            <Label key={label} label={label} />
          ))}
        </span>
        <small>
          #{number} opened {relativeDate(createdDate)}
          <span>&nbsp;</span>
          {createdByQuery.isSuccess && `by ${createdByQuery.data.name}`}
        </small>
      </div>
      {assigneeQuery.isSuccess && (
        <img
          src={assigneeQuery.data.profilePictureUrl}
          className="assigned-to"
          alt={`Assigned to ${assigneeQuery.data.name}`}
        />
      )}
      <span className="comment-count">
        {Boolean(commentCount) && (
          <>
            <GoComment />
            {commentCount}
          </>
        )}
      </span>
    </li>
  );
}

export default memo(IssueItem);
