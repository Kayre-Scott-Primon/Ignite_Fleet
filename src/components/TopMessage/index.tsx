import { useTheme } from "styled-components/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { IconBoxProps } from "../ButtonIcon";
import { Container, Title } from "./styles";

type Props = {
  icon?: IconBoxProps;
  title: string;
};

export function TopMessage({ title, icon: Icon }: Props) {
  const { COLORS } = useTheme();
  const insets = useSafeAreaInsets();

  const paddingTop = insets.top + 5;

  return (
    <Container style={{ paddingTop }}>
      {Icon && <Icon color={COLORS.GRAY_100} size={18} />}
      <Title>{title}</Title>
    </Container>
  );
}
