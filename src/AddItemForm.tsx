import { AddCircle, AddCircleOutlineOutlined } from "@mui/icons-material";
import { Grid, Icon, IconButton, TextField } from "@mui/material";
import { green } from "@mui/material/colors";
import { ChangeEvent, KeyboardEvent, useState } from "react";

type AddItemFormPropsType = {
  addItem: (title: string) => void;
};

export function AddItemForm(props: AddItemFormPropsType) {
  const [title, setTitle] = useState("");
  const [error, setError] = useState<string | null>(null);

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value);
  };

  const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    setError(null);
    if (e.ctrlKey && e.key === "Enter") addItem();
  };

  const addItem = () => {
    if (title.trim() === "") {
      setError("Field is required");
      return;
    }
    props.addItem(title.trim());
    setTitle("");
  };

  return (
    <div>
      {/* <input
        value={title}
        onChange={onChangeHandler}
        onKeyDown={onKeyDownHandler}
        className={error ? "error" : ""}
      /> */}

      <Grid container>
        <TextField
          variant={"outlined"}
          label={"NewItem"}
          value={title}
          onChange={onChangeHandler}
          onKeyDown={onKeyDownHandler}
          helperText={error}
          error={!!error}
        />
        <IconButton onClick={addItem}>
          <AddCircleOutlineOutlined sx={{ color: green[500] }} />
        </IconButton>
      </Grid>
      {/* {error && <div className="error-message">{error}</div>} */}
    </div>
  );
}
