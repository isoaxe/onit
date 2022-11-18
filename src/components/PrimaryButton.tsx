import Button from "@mui/material/Button";

function PrimaryButton(props): JSX.Element {
  const { label, type, disabled } = props;

  return (
    <Button variant="contained" type={type} disabled={disabled}>
      {label}
    </Button>
  );
}

export default PrimaryButton;
