import { Box } from "@mui/system";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import Alert from "@mui/material/Alert";
import { useState, useEffect } from "react";
import { client } from "../../../common/apollo-client";
import { gql } from "@apollo/client";

interface Props {
  open: boolean;
  handleChange: any;
}

const CreateCategory = ({ open, handleChange }: Props) => {
  const [alert, setAlert] = useState("");
  const [name, setName] = useState("");

  const handleSetUnitName = (e: any) => {
    setName(e.target.value);
  };

  const handleCreateUnit = async () => {
    if (name != "") {
      try {
        const { data } = await client.mutate({
          mutation: gql`
            mutation Mutation($createCategoryInput: CreateCategoryInput!) {
              createCategory(createCategoryInput: $createCategoryInput) {
                cate_id
                cate_name
              }
            }
          `,
          variables: {
            createCategoryInput: {
              name: name,
            },
          },
        });

        setTimeout(()=>{
            handleChange()
        },300)
      } catch (error) {
        setAlert(String(error).replace("Error: ", ""));

        setTimeout(() => {
          setAlert("");
        }, 3000);
      }
    } else {
      setAlert("Please input name");

      setTimeout(() => {
        setAlert("");
      }, 3000);
    }
  };

  return (
    <Dialog style={{ textAlign: "center" }} open={open} onClose={handleChange}>
      <DialogTitle>CREATE CATEGORY</DialogTitle>
      <DialogContent style={{ maxWidth: "300px" }}>
        {/* <DialogContentText>
      To subscribe to this website, please enter your email address here. We
      will send updates occasionally.
    </DialogContentText> */}

        {alert && (
          <>
            <Alert severity="error">{alert}</Alert>
            <br />
          </>
        )}

        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Name"
          type="text"
          fullWidth
          variant="standard"
          onChange={handleSetUnitName}
        />
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" color="warning" onClick={handleChange}>
          Cancel
        </Button>
        <Button variant="outlined" color="success" onClick={handleCreateUnit}>
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateCategory;
