import Button from "@mui/material/Button";

function PrimaryButton(props): JSX.Element {
  const { label, onClick, type, disabled } = props;

  return (
    <Button
      variant="contained"
      onClick={onClick}
      type={type}
      disabled={disabled}
      sx={style}
    >
      {label}
    </Button>
  );
}

export default PrimaryButton;

const style = { margin: "5px" };
