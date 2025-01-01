import { useEffect, useState } from "react";

import { AppInput } from "../forms";
import { CommentItem } from "../comments/CommentItem";
import { CommentWithTitle } from "../../types";
import { NewComment } from "../comments/NewComment";
import { useDebounce } from "use-debounce";
import { useProjectStore } from "../../stores/Project";

export const Comments: React.FC = () => {
  const { comments, id } = useProjectStore();
  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebounce(search, 300);
  const [filteredComments, setFilteredComments] = useState<CommentWithTitle[]>(
    []
  );

  useEffect(() => {
    const trimmedSearch = debouncedSearch.trim();
    if (!trimmedSearch) {
      setFilteredComments(
        comments.filter((comment) => comment.obs_type === "project")
      );
      return;
    }

    const searchResults = comments.filter((comment) => {
      return (
        comment.body.toLowerCase().includes(trimmedSearch.toLowerCase())
      );
    });

    setFilteredComments(searchResults);
  }, [debouncedSearch, comments]);

  return (
    <div className="w-full relative">
      <header className="mb-4">
        <h5 className="text-aso-secondary font-bold text-base mb-1">
          Comentarios
        </h5>

        <AppInput
          type="search"
          name="search-comments"
          defaultValue={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Buscar comentarios"
        />
      </header>

      <div className="mb-4">
        <NewComment type="project" id={id} />
      </div>

      {filteredComments.length === 0 ? (
        <span>Aún no hay comentarios para este Proyecto.</span>
      ) : (
        <div role="list" className="flex flex-col space-y-6 overflow-auto">
          {filteredComments.map((comment) => (
            <CommentItem key={comment.id} comment={comment} />
          ))}
        </div>
      )}
    </div>
  );
};
