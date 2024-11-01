"use client";

import { CheckIcon, ChevronDownIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";
import { triggerAsyncId } from "async_hooks";

type Item = {
  label: string;
  value: string | number;
};

type Props = {
  items: Item[];
  value?: Item[];
  allVerbiage?: string;
  triggerClassName?: string;
};

export default function MultiSelect1({
  items,
  value = [],
  allVerbiage = "All Items",
  triggerClassName,
}: Props) {
  const [checkedItems, setCheckedItems] = useState<Item[]>([]);

  const onSelect = (item: Item) => {
    let newCheckedItems = [...checkedItems];
    const isAlreadyChecked = checkedItems.find(
      (checkedItem) => checkedItem.value === item.value,
    );
    if (isAlreadyChecked) {
      newCheckedItems = checkedItems.filter(
        (checkedItem) => checkedItem.value !== item.value,
      );
    } else {
      newCheckedItems.push(item);
      newCheckedItems.sort((a, b) => a.label.localeCompare(b.label));
    }
    setCheckedItems(newCheckedItems);
  };

  const onSelectAll = () => {
    setCheckedItems([]);
  };

  const checkedItemsMap = checkedItems.reduce<Record<Item["value"], true>>(
    (acc, curr) => ((acc[curr.value] = true), acc),
    {},
  );

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          intent="outlined"
          color="black"
          role="combobox"
          className={cn(
            "border-border shadow-none w-52 justify-between text-md font-semibold",
            triggerClassName,
          )}
        >
          {checkedItems.length
            ? `${checkedItems.length} selected`
            : allVerbiage}
          <ChevronDownIcon className="ml-2 h-5 w-5 shrink-0 text-gray-600" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-52 p-0">
        <Command>
          <CommandInput placeholder="Search..." className="h-9" />
          <CommandList>
            <CommandEmpty>No items found.</CommandEmpty>
            <CommandGroup>
              <CommandItem onSelect={onSelectAll}>{allVerbiage}</CommandItem>
            </CommandGroup>
            <CommandGroup>
              {items.map((item) => (
                <CommandItem
                  value={item.label}
                  key={item.value}
                  onSelect={() => onSelect(item)}
                >
                  {item.label}
                  <CheckIcon
                    className={cn(
                      "ml-auto h-4 w-4",
                      checkedItemsMap[item.value] ? "opacity-100" : "opacity-0",
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
