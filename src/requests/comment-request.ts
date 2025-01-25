import { Comment, CommentWithTitle } from "../types";

import { appFetch } from "../AppFetch";
import { toast } from "sonner";

export const deleteComment = async (comment: Comment) => {
  const { data, error } = await appFetch<{ status: boolean }>("DELETE", {
    url: `/comments/${comment.id}/remove`,
  });

  if (error) {
    toast.error(error?.error);
    return false;
  }

  return Boolean(data?.status);
};

export const createComment = async (data: Comment) => {
  const { data: newComment, error } = await appFetch<CommentWithTitle>("POST", {
    url: "/comments/create",
    body: data,
  });

  if (error) {
    toast.error('Error al comentar. Intenta de nuevo.');
    return null;
  }

  return newComment;
}
