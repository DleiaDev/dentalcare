import { ReactNode } from "react";
import Avatar, { Props as AvatarProps } from "@/components/Avatar";
import { cn } from "@/lib/utils";

type Props = {
  before?: ReactNode;
  after?: ReactNode;
  avatarProps: AvatarProps;
} & (
  | {
      name: string | ReactNode;
      description: string | ReactNode;
      textSlot?: never;
    }
  | { name?: never; description?: never; textSlot: ReactNode }
);

export default function ProfileCard({
  before,
  after,
  name,
  description,
  textSlot,
  avatarProps,
}: Props) {
  return (
    <div className="flex items-center gap-x-4">
      {before}
      <Avatar {...avatarProps} className={avatarProps.className} />
      {textSlot ? (
        textSlot
      ) : (
        <div className="flex flex-col items-start">
          <div className="font-semibold whitespace-nowrap">{name}</div>
          <div className="font-medium whitespace-nowrap text-sm text-gray-600">
            {description}
          </div>
        </div>
      )}
      {after}
    </div>
  );
}
