import { useForm } from "react-hook-form";
import "./App.css";
import {
  Box,
  InputLabel,
  MenuItem,
  Select,
  FormControl,
  Button,
  TextField,
} from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Controller } from "react-hook-form";

const schema = yup.object().shape({
  firstName: yup
    .string()
    .required("First name is required")
    .min(2, "Should contain at least 2 characters"),
  lastName: yup.string().required("Last name is required"),
  phone: yup
    .string()
    .required("Phone number is required")
    .matches(/^[1-9]\d{9}$/, "Enter a valid phone number"),
  email: yup
    .string()
    .required("Email is required")
    .email("Enter a valid email address"),
  address: yup.string().required("Address is required"),
  gender: yup.string().required("Gender is required"),
});
//Yup.object().shape({...}) defines an object schema

function App() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    const fullName = `${data.firstName} ${data.lastName}`;
    const formData = { ...data, name: fullName };
    console.log(formData);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box
        sx={{
          "& > :not(style)": { m: 1, width: 500 },
          p: 5,
          m: 5,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
        autoComplete="off"
      >
        <TextField
          label="First Name"
          variant="outlined"
          {...register("firstName")}
          error={!!errors.firstName}
          helperText={errors.firstName?.message}
        />

        <TextField
          label="Last Name"
          variant="outlined"
          {...register("lastName")}
          error={!!errors.lastName}
          helperText={errors.lastName?.message}
        />

        <TextField
          label="Phone Number"
          variant="outlined"
          {...register("phone")}
          error={!!errors.phone}
          helperText={errors.phone?.message}
        />

        <TextField
          label="Email"
          variant="outlined"
          {...register("email")}
          error={!!errors.email}
          helperText={errors.email?.message}
        />

        <TextField
          label="Address"
          variant="outlined"
          {...register("address")}
          error={!!errors.address}
          helperText={errors.address?.message}
        />

        <Controller
          name="gender"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <FormControl fullWidth variant="outlined" error={!!errors.gender}>
              <InputLabel id="gender-label">Gender</InputLabel>
              <Select labelId="gender-label" label="Gender" {...field}>
                <MenuItem value="male">Male</MenuItem>
                <MenuItem value="female">Female</MenuItem>
              </Select>
              <p style={{ color: "red", margin: 0 }}>
                {errors.gender?.message}
              </p>
            </FormControl>
          )}
        />

        <Button type="submit" variant="contained">
          Submit
        </Button>
      </Box>
    </form>
  );
}

export default App;
