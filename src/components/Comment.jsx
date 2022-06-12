import { memo } from "react";
import { relativeDate } from "../helpers/relativeDate";
import useUserQuery from "../hooks/useUserQuery";

function Comment({ comment, createdBy, createdDate }) {
  const createdByQuery = useUserQuery(createdBy);

  if (createdByQuery.isLoading)
    return (
      <div className="comment">
        <div>
          <div className="comment-header">Loading...</div>
        </div>
      </div>
    );

  return (
    <div className="comment">
      <img src={createdByQuery.data.profilePictureUrl} alt="Commenter Avatar" />
      <div>
        <div className="comment-header">
          <span>{createdByQuery.data.name}</span> commented{" "}
          <span>{relativeDate(createdDate)}</span>
        </div>
        <div className="comment-body">{comment}</div>
      </div>
    </div>
  );
}

export default memo(Comment);
