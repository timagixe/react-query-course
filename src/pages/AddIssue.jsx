import { memo } from "react";
import { useNavigate } from "react-router-dom";
import useAddIssueMutation from "../hooks/useAddIssueMutation";

function AddIssue() {
    const navigate = useNavigate();
    const addIssueMutation = useAddIssueMutation({
        onSuccess: (data) => navigate(`/issue/${data.number}`)
    });
    const onSubmit = (event) => {
        event.preventDefault();
        if (addIssueMutation.isLoading) return;
        addIssueMutation.mutate({
            title: event.target.title.value,
            comment: event.target.comment.value
        });
    };
    return (
        <div className="add-issue">
            <h2>Add Issue</h2>
            <form onSubmit={onSubmit}>
                <label htmlFor="title">Title</label>
                <input
                    type="text"
                    id="title"
                    placeholder="Title"
                    name="title"
                />
                <label htmlFor="comment">Comment</label>
                <textarea
                    placeholder="Comment"
                    id="comment"
                    name="comment"
                />
                <button
                    type="submit"
                    disabled={addIssueMutation.isLoading}
                >
                    {addIssueMutation.isLoading ? "Adding Issue..." : "Add Issue"}
                </button>
            </form>
        </div>
    );
}

export default memo(AddIssue);
