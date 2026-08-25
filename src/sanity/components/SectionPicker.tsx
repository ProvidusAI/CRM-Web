import { useCallback } from "react";
import { type StringInputProps, set } from "sanity";
import { Button, Flex, Menu, MenuButton, MenuItem, Text } from "@sanity/ui";

interface SectionOption {
  title: string;
  value: string;
  thumbnail?: string;
}

const thumbStyle = {
  width: 64,
  height: "auto",
  border: "1px solid var(--card-border-color)",
  borderRadius: 4,
} as const;

function Thumb({ src }: { src?: string }) {
  if (!src) return null;
  return <img src={src} alt="" style={thumbStyle} />;
}

export function SectionPicker(props: StringInputProps) {
  const options = (props.schemaType.options?.list ?? []) as SectionOption[];
  const selected = options.find((option) => option.value === props.value);
  const { onChange } = props;

  const handleSelect = useCallback(
    (value: string) => onChange(set(value)),
    [onChange],
  );

  return (
    <MenuButton
      id={props.id}
      button={
        <Button mode="ghost" padding={2}>
          <Flex align="center" gap={3}>
            <Thumb src={selected?.thumbnail} />
            <Text size={1}>{selected?.title ?? "Select a section"}</Text>
          </Flex>
        </Button>
      }
      menu={
        <Menu>
          {options.map((option) => (
            <MenuItem
              key={option.value}
              onClick={() => handleSelect(option.value)}
              padding={2}
            >
              <Flex align="center" gap={3}>
                <Thumb src={option.thumbnail} />
                <Text size={1}>{option.title}</Text>
              </Flex>
            </MenuItem>
          ))}
        </Menu>
      }
    />
  );
}
