import { Container, Text, Box, Flex, ActionIcon } from "@mantine/core";
import { IconBrandGithub } from "@tabler/icons-react";

export function Footer() {
  return (
    <footer>
      <Box py={40}>
        <Container size="lg">
          <Flex h="100%" align="center" justify="space-between">
            <Text>
              © {new Date().getFullYear()} QuizBuilder. Все права защищены.
            </Text>
            <ActionIcon
              component="a"
              href="https://github.com/MAChapurin"
              target="_blank"
              rel="noopener noreferrer"
            >
              <IconBrandGithub size={24} className="text-white" />
            </ActionIcon>
          </Flex>
        </Container>
      </Box>
    </footer>
  );
}
