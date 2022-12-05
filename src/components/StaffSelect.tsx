import { useState } from "react";
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

const names = [
  "Oliver Hansen",
  "Van Henry",
  "April Tucker",
  "Ralph Hubbard",
  "Omar Alexander",
  "Carlos Abbott",
  "Miriam Wagner",
  "Bradley Wilkerson",
  "Virginia Andrews",
  "Kelly Snyder",
];

function getStyles(name: string, personName: string[]) {
  return {
    fontWeight: personName.indexOf(name) === -1 ? 400 : 700,
    background: personName.indexOf(name) === -1 ? 50 : tertiaryLight,
  };
}

function StaffSelect(props) {
  const [personName, setPersonName] = useState<string[]>([]);
  const { staff, onSelect } = props;

  const handleChange = (event: SelectChangeEvent<typeof personName>) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  return (
    <div>
      <FormControl sx={{ m: 1, width: 192 }}>
        <InputLabel id="staff-select-label">Assign Staff</InputLabel>
        <Select
          labelId="staff-select-label"
          multiple
          value={personName}
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
                style={getStyles(fullName, personName)}
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