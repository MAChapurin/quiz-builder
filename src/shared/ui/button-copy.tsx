"use client";

import { IconCheck, IconCopy } from "@tabler/icons-react";
import { Button, Tooltip } from "@mantine/core";
import { useClipboard } from "@mantine/hooks";

type ButtonCopyProps = {
  value: string;
  label?: string;
  tooltip?: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  height?: number;
  className?: string;
  onCopy?: () => void;
};

export function ButtonCopy({
  value,
  label = "Скопировать ссылку",
  tooltip = "Скопировано",
  size = "md",
  height = 48,
  className,
  onCopy,
}: ButtonCopyProps) {
  const clipboard = useClipboard();

  const handleCopy = () => {
    clipboard.copy(value);
    onCopy?.();
  };

  return (
    <Tooltip
      label={tooltip}
      offset={5}
      position="bottom"
      transitionProps={{ duration: 100, transition: "slide-down" }}
      opened={clipboard.copied}
    >
      <Button
        rightSection={
          clipboard.copied ? (
            <IconCheck size={20} stroke={1.5} />
          ) : (
            <IconCopy size={20} stroke={1.5} />
          )
        }
        size={size}
        pr={14}
        h={height}
        className={className}
        styles={{ section: { marginLeft: 22 } }}
        onClick={handleCopy}
      >
        {label}
      </Button>
    </Tooltip>
  );
}
