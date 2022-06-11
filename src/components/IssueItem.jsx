import { Link } from "react-router-dom";
import { GoIssueClosed, GoIssueOpened, GoComment } from "react-icons/go";
import { relativeDate } from "../helpers/relativeDate";
import { issueUtils } from "../helpers/issueUtils";
import { memo } from "react";

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
  return (
    <li>
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
            <span key={label} className={`label red`}>
              {label}
            </span>
          ))}
        </span>
        <small>
          #{number} opened {relativeDate(createdDate)} by {createdBy}
        </small>
      </div>
      {assignee ? <div>{assignee}</div> : null}
      <span className="comment-count">
        {commentCount > 0 ? (
          <>
            <GoComment />
            {commentCount}
          </>
        ) : null}
      </span>
    </li>
  );
}

export default memo(IssueItem);
