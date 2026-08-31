import { useCallback, useRef, useState } from "react";
import { type StringInputProps, set } from "sanity";
import {
  Button,
  Card,
  Flex,
  Grid,
  Popover,
  Text,
  useClickOutsideEvent,
} from "@sanity/ui";

interface SectionOption {
  title: string;
  value: string;
  thumbnail?: string;
}

function Thumb({ src, width = 64 }: { src?: string; width?: number }) {
  if (!src) return null;
  return (
    <img
      src={src}
      alt=""
      style={{
        width,
        maxWidth: "100%",
        height: "auto",
        display: "block",
        border: "1px solid var(--card-border-color)",
        borderRadius: 4,
      }}
    />
  );
}

export function SectionPicker(props: StringInputProps) {
  const { onChange, readOnly, value, schemaType } = props;
  const options = (schemaType.options?.list ?? []) as SectionOption[];
  const selected = options.find((option) => option.value === value);
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const handleSelect = useCallback(
    (next: string) => {
      onChange(set(next));
      setOpen(false);
    },
    [onChange],
  );

  useClickOutsideEvent(
    open ? () => setOpen(false) : false,
    () => [buttonRef.current, contentRef.current],
  );

  return (
    <Popover
      open={open}
      placement="bottom-start"
      portal
      // 13 sections in a 3-column grid stand taller than the viewport, so the
      // popover has to cap its own height and scroll rather than overflow.
      constrainSize
      content={
        <Card
          padding={2}
          radius={2}
          ref={contentRef}
          overflow="auto"
          style={{ width: 520, maxHeight: "60vh" }}
        >
          <Grid columns={[2, 3]} gap={2}>
            {options.map((option) => {
              const isSelected = option.value === value;
              return (
                <Card
                  key={option.value}
                  as="button"
                  padding={2}
                  radius={2}
                  tone={isSelected ? "default" : "transparent"}
                  onClick={() => handleSelect(option.value)}
                >
                  <Flex direction="column" align="center" gap={2}>
                    <Thumb src={option.thumbnail} width={140} />
                    <Text size={0} align="center">
                      {option.title}
                    </Text>
                  </Flex>
                </Card>
              );
            })}
          </Grid>
        </Card>
      }
    >
      <Button
        ref={buttonRef}
        mode="ghost"
        padding={2}
        disabled={readOnly}
        onClick={() => setOpen((current) => !current)}
      >
        <Flex align="center" gap={3}>
          <Thumb src={selected?.thumbnail} />
          <Text size={1}>{selected?.title ?? "Select a section"}</Text>
        </Flex>
      </Button>
    </Popover>
  );
}
