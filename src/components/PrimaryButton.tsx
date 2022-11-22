import Button from "@mui/material/Button";

function PrimaryButton(props): JSX.Element {
  const { label, onClick, type, disabled } = props;

  return (
    <Button
      variant="contained"
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      {label}
    </Button>
  );
}

export default PrimaryButton;
