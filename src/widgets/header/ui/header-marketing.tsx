"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Container, Group, Flex, Anchor, Burger, Button } from "@mantine/core";

import { headerLinks, LINKS_ID, routes } from "@/shared/config";
import { ColorSchemesSwitcher } from "@/features";
import { MobileMenu } from "./mobile-menu";
import { Logo } from "@/shared/ui";

export function HeaderMarketing() {
  const [drawerOpened, setDrawerOpened] = useState(false);
  const [activeSection, setActiveSection] = useState(`#${LINKS_ID.HOME}`);

  const onClick = (href: string) => {
    setDrawerOpened(false);
    const target = document.querySelector(href);
    if (target) target.scrollIntoView({ behavior: "smooth" });
    setActiveSection(href);
  };

  const onClose = () => setDrawerOpened(false);
  const onToogle = () => setDrawerOpened((o) => !o);

  useEffect(() => {
    const onScroll = () => {
      let current = `#${LINKS_ID.HOME}`;
      headerLinks.forEach((link) => {
        const section = document.querySelector(link.href);
        if (
          section &&
          window.scrollY >=
            section.getBoundingClientRect().top + window.scrollY - 100
        ) {
          current = link.href;
        }
      });
      setActiveSection(current);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <Container size="lg" py={10}>
      <Flex h="100%" align="center" justify="space-between">
        <Logo />
        <Group gap="xl" className="hidden lg:flex">
          {headerLinks.map((link) => (
            <Anchor
              key={link.href}
              onClick={() => onClick(link.href)}
              style={{ cursor: "pointer" }}
              c={activeSection === link.href ? "blue" : "dimmed"}
              fw={500}
              underline="never"
              className="transition-colors"
            >
              {link.label}
            </Anchor>
          ))}
        </Group>

        <Group className="hidden lg:flex">
          <ColorSchemesSwitcher />
          <Button component={Link} href={routes.LOGIN} variant="outline">
            Войти
          </Button>
          <Button component={Link} href={routes.REGISTER}>
            Регистрация
          </Button>
        </Group>
        <Group className="lg:hidden ml-auto" mr={"md"}>
          <ColorSchemesSwitcher />
        </Group>

        <Burger
          opened={drawerOpened}
          onClick={onToogle}
          size="sm"
          className="flex lg:hidden pt-4"
        />

        <MobileMenu
          opened={drawerOpened}
          onClose={onClose}
          activeSection={activeSection}
          handleLinkClick={onClick}
        />
      </Flex>
    </Container>
  );
}
