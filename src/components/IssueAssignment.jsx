import { memo, useState } from "react";
import { GoGear } from "react-icons/go";
import useSetAssigneeMutation from "../hooks/useSetAssigneeMutation";
import useUserQuery from "../hooks/useUserQuery";
import useUsersQuery from "../hooks/useUsersQuery";

function IssueAssignment({ assignee, issueNumber }) {
    const user = useUserQuery(assignee);
    const [menuOpen, setMenuOpen] = useState(false);
    const usersQuery = useUsersQuery();
    const setAssignmentMutation = useSetAssigneeMutation(issueNumber);

    return (
        <div className="issue-options">
            <div>
                <span>Assignment</span>
                {user.isSuccess && (
                    <div>
                        <img src={user.data.profilePictureUrl} />
                        {user.data.name}
                    </div>
                )}
            </div>
            <GoGear
                onClick={() =>
                    !usersQuery.isLoading && setMenuOpen((open) => !open)
                }
            />
            {menuOpen && (
                <div className="picker-menu">
                    {usersQuery.data?.map((user) => (
                        <div
                            key={user.id}
                            onClick={() =>
                                setAssignmentMutation.mutate(user.id)
                            }
                        >
                            <img src={user.profilePictureUrl} />
                            {user.name}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default memo(IssueAssignment);
