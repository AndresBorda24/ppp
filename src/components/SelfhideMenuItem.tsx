import { BaseButton } from "./button";
import { Icon } from "@iconify-icon/react/dist/iconify.mjs";

interface Props {
  icon?: string | undefined;
  label: string;
  onClick?: () => void | undefined
}
export const SelfhideMenuItem: React.FC<Props> = ({ label, icon, onClick }) => {
  return (
    <BaseButton
      size="small"
      color="free"
      onClick={onClick}
      title={label}
      type="button"
      role="menuitem"
      className="flex items-center gap-4 px-4 py-3 text-nowrap hover:bg-neutral-200 w-full rounded-none"
    >
      { icon && <Icon icon={icon} className="text-base"></Icon> }
      <span>{label}</span>
    </BaseButton>
  );
};
