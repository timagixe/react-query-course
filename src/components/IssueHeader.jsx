import { memo } from "react";
import { GoIssueClosed, GoIssueOpened } from "react-icons/go";
import { STATUSES } from "../helpers/defaultData";
import useUserQuery from "../hooks/useUserQuery";
import { issueUtils } from "../helpers/issueUtils";
import { relativeDate } from "../helpers/relativeDate";

function IssueHeader({
  title,
  number,
  status = "todo",
  createdBy,
  createdDate,
  comments,
}) {
  const statusData = STATUSES.find(({ id }) => id === status);
  const createdByQuery = useUserQuery(createdBy);
  return (
    <header>
      <h2>
        {title} <span>#{number}</span>
      </h2>
      <div>
        <span className={issueUtils.isClosed(status) ? "closed" : "open"}>
          {issueUtils.isClosed(status) ? <GoIssueClosed /> : <GoIssueOpened />}
          {statusData.label}
        </span>
        <span className="created-by">
          {createdByQuery.isLoading ? "..." : createdByQuery.data?.name}
        </span>{" "}
        opened this issue {relativeDate(createdDate)} · {comments.length}{" "}
        comments
      </div>
    </header>
  );
}

export default memo(IssueHeader);
