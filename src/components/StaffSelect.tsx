import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { FormattedStaff } from "../util/types";
import { tertiaryLight } from "../util/colours";

function getStyles(name: FormattedStaff, names: FormattedStaff[]) {
  return {
    fontWeight: names.indexOf(name) === -1 ? 400 : 700,
    background: names.indexOf(name) === -1 ? 50 : tertiaryLight,
  };
}

function StaffSelect(props) {
  const { staff, selectedStaff, onSelect } = props;

  function handleChange(event: SelectChangeEvent<typeof staff>) {
    onSelect(event.target.value);
  }

  return (
    <div>
      <FormControl sx={{ m: 1, width: 258 }}>
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
                value={user}
                style={getStyles(user, selectedStaff)}
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
