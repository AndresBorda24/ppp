import { DeleteItem } from "../../components/DeleteItem";
import { Tabs } from "../../components/project/Tabs";
import { TaskModal } from "../../components/task/TaskModal";
import { UpdateForm } from "../../components/project/UpdateForm";
import View from "../../components/view";
import { useProjectStore } from "../../stores/Project";

export const ProjectView: React.FC = () => {
  const {
    id,
    author_name,
  } = useProjectStore((state) => state);

  return (
    <View>
      <div className="grid max-w-lg lg:grid-cols-2 lg:max-w-6xl mx-auto gap-4 h-full">
        <section className="pt-12 lg:pt-0">
          <UpdateForm />
          <DeleteItem type="project" itemId={id} className="py-4 mt-4" onDeleted={() => {}}/>
          {author_name ? (
            <p className="italic text-xs text-neutral-400 pt-5">
              Proyecto Creado Por:&nbsp;
              <span className="font-bold">{author_name}</span>
            </p>
          ) : null}
        </section>

        <Tabs />
      </div>
      <TaskModal />
    </View>
  );
};
