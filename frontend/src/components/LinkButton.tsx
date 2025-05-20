// src/components/LinkButton.tsx
import { Button, ButtonProps } from "react-bootstrap";
import { Link, LinkProps } from "react-router-dom";

type Props = ButtonProps & LinkProps;

const LinkButton = (props: Props) => {
  return <Button as={Link as any} {...props} />;
};

export default LinkButton;
