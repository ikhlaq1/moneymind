import { Text, TextProps } from "./Themed";

export function MonoText() {
  return <Text {...props} style={[props.style, { fontFamily: "poppins" }]} />;
}
