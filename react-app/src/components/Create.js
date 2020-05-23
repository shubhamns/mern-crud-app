import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { createUser } from "./../services/user";

import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "50ch",
    },
  },
}));

function Create() {
  const classes = useStyles();
  const history = useHistory();
  const [inputs, setInputs] = useState({
    firstName: "",
    lastName: "",
    email: "",
    age: "",
    gender: "",
    state: "",
  });
  const { firstName, lastName, email, age, gender, state } = inputs;
  const [submitted, setSubmitted] = useState(false);
  const [states] = useState(["Afghanistan","Albania","Algeria","Andorra","Angola","Anguilla","Antigua &amp; Barbuda","Argentina","Armenia","Aruba","Australia","Austria","Azerbaijan","Bahamas","Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bermuda","Bhutan","Bolivia","Bosnia &amp; Herzegovina","Botswana","Brazil","British Virgin Islands","Brunei","Bulgaria","Burkina Faso","Burundi","Cambodia","Cameroon","Cape Verde","Cayman Islands","Chad","Chile","China","Colombia","Congo","Cook Islands","Costa Rica","Cote D Ivoire","Croatia","Cruise Ship","Cuba","Cyprus","Czech Republic","Denmark","Djibouti","Dominica","Dominican Republic","Ecuador","Egypt","El Salvador","Equatorial Guinea","Estonia","Ethiopia","Falkland Islands","Faroe Islands","Fiji","Finland","France","French Polynesia","French West Indies","Gabon","Gambia","Georgia","Germany","Ghana","Gibraltar","Greece","Greenland","Grenada","Guam","Guatemala","Guernsey","Guinea","Guinea Bissau","Guyana","Haiti","Honduras","Hong Kong","Hungary","Iceland","India","Indonesia","Iran","Iraq","Ireland","Isle of Man","Israel","Italy","Jamaica","Japan","Jersey","Jordan","Kazakhstan","Kenya","Kuwait","Kyrgyz Republic","Laos","Latvia","Lebanon","Lesotho","Liberia","Libya","Liechtenstein","Lithuania","Luxembourg","Macau","Macedonia","Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Mauritania","Mauritius","Mexico","Moldova","Monaco","Mongolia","Montenegro","Montserrat","Morocco","Mozambique","Namibia","Nepal","Netherlands","Netherlands Antilles","New Caledonia","New Zealand","Nicaragua","Niger","Nigeria","Norway","Oman","Pakistan","Palestine","Panama","Papua New Guinea","Paraguay","Peru","Philippines","Poland","Portugal","Puerto Rico","Qatar","Reunion","Romania","Russia","Rwanda","Saint Pierre &amp; Miquelon","Samoa","San Marino","Satellite","Saudi Arabia","Senegal","Serbia","Seychelles","Sierra Leone","Singapore","Slovakia","Slovenia","South Africa","South Korea","Spain","Sri Lanka","St Kitts &amp; Nevis","St Lucia","St Vincent","St. Lucia","Sudan","Suriname","Swaziland","Sweden","Switzerland","Syria","Taiwan","Tajikistan","Tanzania","Thailand","Timor L'Este","Togo","Tonga","Trinidad &amp; Tobago","Tunisia","Turkey","Turkmenistan","Turks &amp; Caicos","Uganda","Ukraine","United Arab Emirates","United Kingdom","Uruguay","Uzbekistan","Venezuela","Vietnam","Virgin Islands (US)","Yemen","Zambia","Zimbabwe"])

  function handleChange(e) {
    const { name, value } = e.target;
    setInputs((inputs) => ({ ...inputs, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    setSubmitted(true);
    if (!firstName || !lastName || !email || !age || !gender || !state) {
      return;
    }
    createUser(inputs).then(
      (data) => {
        console.log("user =>>", data);
        history.push("/");
      },
      (error) => {
        console.log("error =>>", error);
      }
    );
  }

  return (
    <React.Fragment>
      <h1 style={{ textAlign: "center" }}>Create User</h1>
      <form
        className={classes.root}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
        onSubmit={handleSubmit}
      >
        <TextField
          name="firstName"
          label="First Name"
          value={firstName}
          onChange={handleChange}
          fullWidth
          error={submitted && firstName === "" ? true : false}
        />
        <TextField
          name="lastName"
          label="Last Name"
          value={lastName}
          onChange={handleChange}
          fullWidth
          error={submitted && lastName === "" ? true : false}
        />
        <TextField
          name="email"
          label="Email"
          value={email}
          onChange={handleChange}
          fullWidth
          error={submitted && email === "" ? true : false}
        />
        <TextField
          type="number"
          name="age"
          label="Age"
          value={age}
          onChange={handleChange}
          fullWidth
          error={submitted && age === "" ? true : false}
        />

        <div style={{ marginTop: 20 }}>
          <FormLabel error={submitted && gender === "" ? true : false}>
            Gender *
          </FormLabel>
          <RadioGroup name="gender" value={gender} onChange={handleChange}>
            <div style={{ flexDirection: "row" }}>
              <FormControlLabel value="male" control={<Radio />} label="Male" />
              <FormControlLabel
                value="female"
                control={<Radio />}
                label="Female"
              />
            </div>
          </RadioGroup>
        </div>

        <div style={{ flex: 1 }}>
          <FormLabel error={submitted && state === "" ? true : false}>
            Select *
          </FormLabel>
          <Select
            name="state"
            value={state}
            onChange={handleChange}
            style={{
              width: "100%",
            }}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {states.map((state, index) => (
              <MenuItem key={index} value={state}>
                {state}
              </MenuItem>
            ))}
          </Select>
        </div>
        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </form>
    </React.Fragment>
  );
}

export default Create;
