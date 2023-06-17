import useLabelsQuery from "../hooks/useLabelsQuery";
import useSetLabelMutation from "../hooks/useSetLabelMutation";
import { GoGear } from "react-icons/go";
import { useState } from "react";

export default function IssueLabels({ labels, issueNumber }) {
    const labelsQuery = useLabelsQuery();
    const [menuOpen, setMenuOpen] = useState(false);
    const setLabelMutation = useSetLabelMutation({ issueNumber, labels });

    return (
        <div className="issue-options">
            <div>
                <span>Labels</span>
                {labelsQuery.isLoading
                    ? null
                    : labels.map((label) => {
                          const labelObject = labelsQuery.data.find(
                              (queryLabel) => queryLabel.id === label
                          );
                          if (!labelObject) return null;
                          return (
                              <span
                                  key={label}
                                  className={`label ${labelObject.color}`}
                              >
                                  {labelObject.name}
                              </span>
                          );
                      })}
            </div>
            <GoGear onClick={() => !labelsQuery.isLoading && setMenuOpen((open) => !open)} />
            {menuOpen && (
                <div className="picker-menu labels">
                    {labelsQuery.data?.map((label) => {
                        const selected = labels.includes(label.id);
                        return (
                            <div
                                key={label.id}
                                className={selected ? "selected" : ""}
                                onClick={() => setLabelMutation.mutate(label.id)}
                            >
                                <span
                                    className="label-dot"
                                    style={{ backgroundColor: label.color }}
                                ></span>
                                {label.name}
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
