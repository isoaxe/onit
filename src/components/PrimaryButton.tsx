import Button from "@mui/material/Button";

function PrimaryButton(props): JSX.Element {
  const { label, type } = props;

  return (
    <Button variant="contained" type={type}>
      {label}
    </Button>
  );
}

export default PrimaryButton;
