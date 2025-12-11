"use client";

import { Drawer, Tooltip, ActionIcon, ScrollArea } from "@mantine/core";
import { IconHelpCircle } from "@tabler/icons-react";
import { ReactNode, useState } from "react";

export function HelpDrawer({ content }: { content: ReactNode }) {
  const [opened, setOpened] = useState(false);

  return (
    <>
      <Tooltip label="Инструкция по странице" withArrow>
        <ActionIcon variant="default" size="lg" onClick={() => setOpened(true)}>
          <IconHelpCircle size={20} />
        </ActionIcon>
      </Tooltip>

      <Drawer
        opened={opened}
        onClose={() => setOpened(false)}
        position="right"
        overlayProps={{ opacity: 0.4, blur: 2 }}
        size="md"
        title="Инструкция по использованию страницы"
      >
        <ScrollArea h="100%" pr="sm">
          {content}
        </ScrollArea>
      </Drawer>
    </>
  );
}
