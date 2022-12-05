import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { tertiaryLight } from "../util/colours";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name: string, personName: string[]) {
  return {
    fontWeight: personName.indexOf(name) === -1 ? 400 : 700,
    background: personName.indexOf(name) === -1 ? 50 : tertiaryLight,
  };
}

function StaffSelect(props) {
  const { staff, selectedStaff, onSelect } = props;

  const handleChange = (event: SelectChangeEvent<typeof staff>) => {
    const name = event.target.value;
    onSelect(name);
  };

  return (
    <div>
      <FormControl sx={{ m: 1, width: 192 }}>
        <InputLabel id="staff-select-label">Assign Staff</InputLabel>
        <Select
          labelId="staff-select-label"
          multiple
          value={selectedStaff}
          onChange={handleChange}
          input={<OutlinedInput label="Assign Staff" />}
          MenuProps={MenuProps}
        >
          {staff.map((user) => {
            const { fullName, uid } = user;
            return (
              <MenuItem
                key={uid}
                value={fullName}
                style={getStyles(fullName, selectedStaff)}
              >
                {fullName}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </div>
  );
}

export default StaffSelect;
