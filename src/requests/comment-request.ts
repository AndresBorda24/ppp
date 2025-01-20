import { Comment } from "../types";
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
