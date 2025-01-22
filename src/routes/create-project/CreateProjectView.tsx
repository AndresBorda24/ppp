import { AppLabel, BasicInput, BasicTextarea } from "../../components/forms";
import { Form, useActionData, useNavigation } from "react-router-dom";
import { Priority, RequestFormError } from "../../types";

import { BaseButton } from "../../components/button";
import { Icon } from "@iconify-icon/react/dist/iconify.mjs";
import { SelectPriority } from "../../components/Priority";
import { ShowRequestErrors } from "../../components/ShowRequestError";
import View from "../../components/view";
import { useState } from "react";

export const CreateProjectView: React.FC = () => {
  const { state } = useNavigation();
  const [priority, setPriority] = useState<Priority>("normal");
  const requestError = useActionData() as RequestFormError | undefined;
  const isLoading = state !== "idle";

  return (
    <View>
      <div className="lg:grid max-w-4xl mx-auto place-content-center">
        <Form
          method="POST"
          className="max-w-lg border p-8 rounded-lg w-screen shadow-[rgba(7,_65,_210,_0.1)_0px_9px_30px]"
        >
          {requestError ? <ShowRequestErrors errors={requestError} fieldErrors /> : null}

          <AppLabel className="mb-4" htmlFor="title">
            <BasicInput
              required
              autoFocus
              type="text"
              name="title"
              id="create-project-title"
              readOnly={isLoading}
              minLength={2}
              placeholder="Titulo del Proyecto"
              className="text-xl text-neutral-800 font-bold w-full rounded px-2"
            />
          </AppLabel>

          <AppLabel className="mb-4" htmlFor="description">
            <BasicTextarea
              required
              readOnly={isLoading}
              name="description"
              id="create-project-description"
              placeholder="Descripción del Proyecto"
              className="text-base text-neutral-700 w-full mb-1 resize-none min-h-14 px-2 rounded"
            />
          </AppLabel>

          <input type="hidden" name="priority" value={priority} />
          <AppLabel>Prioridad</AppLabel>
          <SelectPriority
            priority={priority}
            setPriority={setPriority}
            className="mb-6"
          />

          <BaseButton
            type="submit"
            color="secondary"
            disabled={isLoading}
            className="ml-auto flex items-center gap-2 disabled:opacity-90"
          >
            {isLoading ? <Icon icon="svg-spinners:pulse" /> : null}
            {isLoading ? "Guardando..." : "Guardar"}
          </BaseButton>
        </Form>
      </div>
    </View>
  );
};
