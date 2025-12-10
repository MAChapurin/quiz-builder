import { Dots } from "@/shared/ui/dots";

export const HeroBG = () => {
  return (
    <>
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
        style={{ left: 20, top: 140 }}
      />
      <Dots
        className={
          "hidden md:block absolute text-[var(--mantine-color-gray-1)] dark:text-[var(--mantine-color-gray-5)] -z-10"
        }
        style={{ left: 160, top: 140 }}
      />
      <Dots
        className={
          "hidden md:block absolute text-[var(--mantine-color-gray-1)] dark:text-[var(--mantine-color-gray-5)] -z-10"
        }
        style={{ right: 160, top: 140 }}
      />
      <Dots
        className={
          "hidden md:block absolute text-[var(--mantine-color-gray-1)] dark:text-[var(--mantine-color-gray-5)] -z-10"
        }
        style={{ right: 20, top: 0 }}
      />
      <Dots
        className={
          "hidden md:block absolute text-[var(--mantine-color-gray-1)] dark:text-[var(--mantine-color-gray-5)] -z-10"
        }
        style={{ right: 20, top: 140 }}
      />
    </>
  );
};
