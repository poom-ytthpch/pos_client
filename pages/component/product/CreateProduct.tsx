import { Box } from "@mui/system";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import Alert from "@mui/material/Alert";
import { useState, useEffect } from "react";
import CreateUnit from "./CreateUnit";
import CreateCategory from "./CreateCategory";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import { Category, Unit } from "../../../types";
import { client } from "../../../common/apollo-client";
import { gql } from "@apollo/client";
import { FormControl } from "@mui/material";

import Image from "next/image";

interface Props {
  open: boolean;
  handleChange: any;
}

const CreateProduct = ({ open, handleChange }: Props) => {
  const [image, setImage] = useState("");
  const [alert, setAlert] = useState("");
  const [units, setUnits] = useState([]);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState([]);
  const [unit, setUnit] = useState("");
  const [openCreateUnit, setOpenCreateUnit] = useState(false);
  const [openCreateCategory, setOpenCreateCategory] = useState(false);

  useEffect(() => {
    getAllUnit();
    getAllCategory();
  }, []);

  const getAllUnit = async () => {
    const { data } = await client.query({
      query: gql`
        query Query {
          units {
            unit_id
            unit_name
          }
        }
      `,
    });

    data?.units.length <= 0 && setAlert("Please Create Unit");

    await setUnits(data?.units);
  };

  const getAllCategory = async () => {
    const { data } = await client.query({
      query: gql`
        query Query {
          categories {
            cate_id
            cate_name
          }
        }
      `,
    });

    data?.categories.length <= 0 && setAlert("Please Create Category");

    await setCategories(data?.categories);
  };

  const handleUnitChange = (e: any) => {
    setUnit(e.target.value);
    console.log(e.target.value);
  };

  const handleChangeCreateUnit = async () => {
    await getAllUnit();
    await setOpenCreateUnit(!openCreateUnit);
  };

  const handleChangeCreateCategory = async () => {
    await getAllCategory();
    await setOpenCreateCategory(!openCreateCategory);
  };

  const handleImageChange = async (e: any) => {
    const tmpFile = e.target.files[0];
    console.log({ tmpFile });
    const checkType = await tmpFile.type.match("image");

    if (!checkType) {
      setAlert("FILE NOT SUPPORT");

      setTimeout(() => {
        setAlert("");
      }, 3000);
    } else {
      setImage(URL.createObjectURL(tmpFile));
    }
  };

  const handleClearImage = () => {
    setImage("");
  };

  return (
    <Dialog open={open} onClose={handleChange}>
      <DialogTitle style={{ textAlign: "center" }}>CREATE PRODUCT </DialogTitle>
      <DialogContent>
        {alert && (
          <>
            <Alert severity="error">{alert}</Alert>
            <br />
          </>
        )}

        {openCreateUnit && (
          <CreateUnit
            open={openCreateUnit}
            handleChange={handleChangeCreateUnit}
          />
        )}

        {openCreateCategory && (
          <CreateCategory
            open={openCreateCategory}
            handleChange={handleChangeCreateCategory}
          />
        )}

        {units.length > 0 && (
          <>
            {image ? (
              <Box
                style={{
                  width: "100%",
                  textAlign: "center",
                }}
              >
                <Box
                  style={{
                    display: "flex",
                    width: "100%",
                    justifyContent: "center",
                  }}
                >
                  <Image width={300} height={500} src={image} alt="image" />
                </Box>
                <Box>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={handleClearImage}
                  >
                    Cancel
                  </Button>
                </Box>
              </Box>
            ) : (
              <Box style={{ width: "100%", textAlign: "center" }}>
                <label>
                  <AddPhotoAlternateIcon
                    className="image-box"
                    style={{ fontSize: "100px", marginTop: "20px" }}
                  />
                  <input type="file" onChange={handleImageChange} />
                </label>
              </Box>
            )}

            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Name"
              type="text"
              fullWidth
              variant="standard"
            />

            <FormControl variant="standard" fullWidth>
              <InputLabel id="demo-simple-select-standard-label">
                Category
              </InputLabel>
              <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                value={unit}
                onChange={handleUnitChange}
                label="Unit"
                fullWidth
              >
                {categories.map((cate: Category) => {
                  return (
                    <MenuItem key={cate?.cate_id} value={String(cate?.cate_id)}>
                      {cate?.cate_name}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>

            <FormControl variant="standard" fullWidth>
              <InputLabel id="demo-simple-select-standard-label">
                Unit
              </InputLabel>
              <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                value={unit}
                onChange={handleUnitChange}
                label="Unit"
                fullWidth
              >
                {units.map((unit: Unit) => {
                  return (
                    <MenuItem key={unit?.unit_id} value={String(unit?.unit_id)}>
                      {unit?.unit_name}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>

            <TextField
              autoFocus
              margin="dense"
              id="pu"
              label="Price per unit"
              type="text"
              fullWidth
              variant="standard"
            />

            <TextField
              autoFocus
              inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
              margin="dense"
              id="pu"
              label="amount"
              type="number"
              fullWidth
              variant="standard"
            />

            <TextField
              autoFocus
              margin="dense"
              id="pu"
              label="Cost price"
              type="number"
              fullWidth
              variant="standard"
            />

            {units.length > 0 && (
              <Button
                fullWidth
                variant="outlined"
                color="success"
                onClick={handleChange}
              >
                Create Product
              </Button>
            )}
          </>
        )}
      </DialogContent>
      <DialogActions>
        <Button
          variant="outlined"
          color="warning"
          onClick={handleChangeCreateCategory}
        >
          Create Category
        </Button>
        <Button
          variant="outlined"
          color="warning"
          onClick={handleChangeCreateUnit}
        >
          Create Unit
        </Button>
        <Button variant="outlined" color="warning" onClick={handleChange}>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateProduct;
