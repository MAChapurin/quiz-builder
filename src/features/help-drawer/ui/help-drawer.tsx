"use client";

import { Drawer, Tooltip, ActionIcon, ScrollArea } from "@mantine/core";
import { IconHelpCircle } from "@tabler/icons-react";
import { ReactNode, useState } from "react";
import { useTranslations } from "next-intl";
import { on } from "events";

export function HelpDrawer({ content }: { content: ReactNode }) {
  const t = useTranslations("features.helpDrawer");

  const [opened, setOpened] = useState(false);
  const onOpen = () => setOpened(true);
  const onClose = () => setOpened(false);

  return (
    <>
      <Tooltip label={t("tooltip")} withArrow>
        <ActionIcon
          variant="default"
          size="lg"
          onClick={onOpen}
          aria-label={t("tooltip")}
        >
          <IconHelpCircle size={20} />
        </ActionIcon>
      </Tooltip>

      <Drawer
        opened={opened}
        onClose={onClose}
        position="right"
        overlayProps={{ opacity: 0.4, blur: 2 }}
        size="md"
        title={t("title")}
      >
        <ScrollArea h="100%" pr="sm">
          {content}
        </ScrollArea>
      </Drawer>
    </>
  );
}
