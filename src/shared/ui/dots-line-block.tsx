import { Container } from "@mantine/core";
import { Dots } from "./dots";

export const DotsLineBlock = () => {
  return (
    <Container
      size={"lg"}
      pos={"relative"}
      className="hidden md:block overflow-hidden"
      h={200}
    >
      <Dots
        className={
          "hidden md:block absolute text-[var(--mantine-color-gray-1)] dark:text-[var(--mantine-color-gray-5)] -z-10"
        }
        style={{ left: 20, top: 0 }}
      />
      <Dots
        className={
          "hidden md:block absolute text-[var(--mantine-color-gray-1)] dark:text-[var(--mantine-color-gray-5)] -z-10"
        }
        style={{ left: 220, top: 0 }}
      />
      <Dots
        className={
          "hidden md:block absolute text-[var(--mantine-color-gray-1)] dark:text-[var(--mantine-color-gray-5)] -z-10"
        }
        style={{ left: 420, top: 0 }}
      />
      <Dots
        className={
          "hidden md:block absolute text-[var(--mantine-color-gray-1)] dark:text-[var(--mantine-color-gray-5)] -z-10"
        }
        style={{ left: 620, top: 0 }}
      />
      <Dots
        className={
          "hidden md:block absolute text-[var(--mantine-color-gray-1)] dark:text-[var(--mantine-color-gray-5)] -z-10"
        }
        style={{ left: 820, top: 0 }}
      />
      <Dots
        className={
          "hidden md:block absolute text-[var(--mantine-color-gray-1)] dark:text-[var(--mantine-color-gray-5)] -z-10"
        }
        style={{ left: 1020, top: 0 }}
      />
    </Container>
  );
};
