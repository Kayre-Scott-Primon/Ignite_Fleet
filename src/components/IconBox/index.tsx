import { IconProps } from "phosphor-react-native";
import { Container, SizeProps } from "./styles";
import { useTheme } from "styled-components/native";

export type IconBoxPros = (props: IconProps) => JSX.Element;

type Props = {
  size?: SizeProps;
  icon: IconBoxPros;
};

export function IconBox({ size = "NORMAL", icon: Icon }: Props) {
  const { COLORS } = useTheme();
  const iconSize = size === "NORMAL" ? 24 : 16;

  return (
    <Container size={size}>
      <Icon size={iconSize} color={COLORS.BRAND_LIGHT} />
    </Container>
  );
}
