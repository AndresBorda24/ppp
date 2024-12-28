import { useEffect, useState } from "react";
import { useProjectStore } from "../stores/Project";
import { useTaskModalStore } from "../stores/TaskModal";
import { CommentWithTitle } from "../types";

export function useModalComments() {
    const [modalComments, setModalComments] = useState<CommentWithTitle[]>([]);
    const { comments } = useProjectStore();
    const { task } = useTaskModalStore();

    useEffect(() => {
        if (task) {
            setModalComments(comments.filter(
                comment => comment.obs_id === task.id && comment.obs_type === task.detail_type
            ));
        }
    }, [task, comments]);

    return { modalComments };
}
