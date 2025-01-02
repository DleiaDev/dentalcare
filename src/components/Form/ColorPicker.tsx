import { cn } from "@/lib/utils";
import Button from "@/components/Button";
import Label from "@/components/Form/Label";
import { RefreshCcwIcon } from "lucide-react";
import TextInput from "@/components/Form/TextInput";
import { useFormContext } from "react-hook-form";
import getColorLuminance from "@/lib/utils/getColorLuminance";
import getRandomColor from "@/lib/utils/getRandomColor";
import { useState } from "react";
import getColorFormat from "@/lib/utils/getColorFormat";

type Props = {
  name: string;
  label: string;
};

const colors = {
  dark: [
    "#b60205",
    "#d93f0b",
    "#ffa500",
    "#0e8a16",
    "#006b75",
    "#1d76db",
    "#0052cc",
    "#5319e7",
  ],
  light: [
    "#e99695",
    "#f9d0c4",
    "#fef2c0",
    "#c2e0c6",
    "#bfdadc",
    "#c5def5",
    "#bfd4f2",
    "#d4c5f9",
  ],
};

export default function ColorPicker({ name, label }: Props) {
  const { setValue, watch } = useFormContext();
  const color = watch(name);

  const [hexColor, setHexColor] = useState(color);

  const setColor = (color: string) => {
    setValue(name, color);
    setHexColor(color);
  };

  const handleGenerateRandomColor = () => {
    setColor(getRandomColor());
  };

  const handleHexColorChange = (text: string) => {
    if (text.indexOf("#") !== 0) return;
    setHexColor(text);
    const isColorValid = getColorFormat(text) === "hex";
    if (isColorValid) setColor(text);
  };

  const isColorBright = color ? getColorLuminance(color) > 0.6 : undefined;
  const textColorClassName = isColorBright
    ? "text-gray-900 hover:text-gray-900"
    : "text-white hover:text-white";

  return (
    <div className="mb-7">
      <div className="mb-7">
        <Label>{label}</Label>

        {/* Input */}
        <div className="flex gap-3 items-center">
          <Button
            intent="text"
            className={cn("w-10 h-10", textColorClassName)}
            style={{ backgroundColor: color }}
            onClick={handleGenerateRandomColor}
          >
            <RefreshCcwIcon />
          </Button>
          <TextInput
            value={hexColor}
            containerClassName="mb-0"
            onValueChange={handleHexColorChange}
            spellCheck={false}
            className="uppercase"
          />
        </div>
      </div>

      {/* Color grid */}
      <div className="flex justify-between mb-3">
        {colors.dark.map((color) => (
          <Button
            key={color}
            intent="text"
            style={{ backgroundColor: color }}
            className="rounded-lg w-8 h-8 p-0"
            onClick={() => setColor(color)}
          />
        ))}
      </div>
      <div className="flex justify-between">
        {colors.light.map((color) => (
          <Button
            key={color}
            intent="text"
            style={{ backgroundColor: color }}
            className="rounded-lg w-8 h-8 p-0"
            onClick={() => setColor(color)}
          />
        ))}
      </div>
    </div>
  );
}
