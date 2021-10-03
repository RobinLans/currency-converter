import React from "react";
import { MdCached } from "react-icons/md";
import { Select, MenuItem, FormControl } from "@material-ui/core";

function Converter() {
  return (
    <div className="container">
      <FormControl variant="outlined" size="medium">
        <Select id="select" value="USD">
          <MenuItem value="USD">USD</MenuItem>
          <MenuItem value="SEK">SEK</MenuItem>
        </Select>
      </FormControl>
      <input type="text" placeholder="USD" />
      <button>
        <MdCached />
      </button>
      <input type="text" placeholder="SEK" />
      <FormControl variant="outlined" size="medium">
        <Select id="select" value="USD">
          <MenuItem value="USD">USD</MenuItem>
          <MenuItem value="SEK">SEK</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}

export default Converter;
