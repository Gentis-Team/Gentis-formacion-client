import * as React from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Grid from "@mui/material/Grid";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import DateInput from "../Forms/inputs/DateInput";
import TimeInput from "../Forms/inputs/TimeInput";
import Checkboxe from "./inputs/Checkbox";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { createCourseFn } from "@/api/courseApi";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { object, string, z } from "zod";
import CategoriesRadios from "./inputs/CategoriesRadios";
import { useCategoriesContext } from "@/services/providers/CategoriesContextProvider";
import {
  useQueryLocations,
  useQueryRequirements,
  useQueryGroups,
  useQueryCategories,
} from "@/services/hooks/useQuery";
import FullScreenLoader from "@/components/layout/loaders/FullScreenLoader";
import { getAllCategoriesFn } from "@/api/categoryApi";
import { getAllLocationsFn } from "@/api/locationApi";
import { useLocationsContext } from "@/services/providers/LocationsContextProvider";
import { getAllRequirementsFn } from "@/api/requirementApi";
import { useRequirementsContext } from "@/services/providers/RequirementsContextProvider";
import { Box } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useNavigate } from "react-router-dom";
import { createTheme, ThemeProvider } from '@mui/material/styles';

const newTheme = createTheme();

newTheme.typography.h3 = {
  fontSize: '2rem',
  '@media (min-width:600px)': {
    fontSize: '4rem',
  },
  [newTheme.breakpoints.up('md')]: {
    fontSize: '4rem',
  },
};

export default function ColorButtons() {
  const categoriesContext = useCategoriesContext();
  const locationsContext = useLocationsContext();
  const [selectedLocations, setSelectedLocations] = React.useState({});
  const [selectedRequirements, setSelectedRequiretements] =
    React.useState("Sense titulacions");
  const [selectedCategories, setSelectedCategories] = useState({});
  const [form, setForm] = useState({});

  const handleChange = (event) => {
    const name = event.target.name;

    let value = event.target.value;
    setForm((values) => ({ ...values, [name]: value }));
  };

  const handleRequirementsChange = (event) => {
    setSelectedRequirements({
      ...selectedRequirements,
      [event.target.name]: event.target.checked,
    });
  };

  const { isLoading, data: categories } = useQuery(
    ["categories"],
    () => getAllCategoriesFn(),
    {
      select: (data) => data.categories,
      onSuccess: (data) => {
        categoriesContext.dispatch({ type: "SET_CATEGORIES", payload: data });
      },
      onError: (error) => useHandleError(error),
    }
  );

  const { data: locations } = useQuery(
    ["locations"],
    () => getAllLocationsFn(),
    {
      select: (data) => data.locations,
      onSuccess: (data) => {
        locationsContext.dispatch({ type: "SET_LOCATIONS", payload: data });
      },
      onError: (error) => useHandleError(error),
    }
  );

  const requirementsContext = useRequirementsContext();
  const navigate = useNavigate();

  const { data: requirements } = useQuery(
    ["requirements"],
    () => getAllRequirementsFn(),
    {
      select: (data) => data.requirements,
      onSuccess: (data) => {
        requirementsContext.dispatch({
          type: "SET_REQUIREMENTS",
          payload: data,
        });
      },
      onError: (error) => useHandleError(error),
    }
  );
  const queryClient = useQueryClient();
  const { mutate: createCourse } = useMutation(
    (course) => createCourseFn(course),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["courses"]);
        toast.success("Course created successfully");
      },
      onError: (error) => {
        if (Array.isArray(error.response.data.error)) {
          error.data.error.forEach((el) =>
            toast.error(el.message, {
              position: "top-right",
            })
          );
        } else {
          toast.error(error.response.data.message, {
            position: "top-right",
          });
        }
      },
    }
  );

  const handleCategoriesChange = (event) => {
    setSelectedCategories(event.target.value);
  };

  const handleLocationsChange = (event) => {
    setSelectedLocations(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = {
      categories: selectedCategories,
      code: form.code,
      name: form.name,
      location: selectedLocations,
      duration_theory: form.duration_theory,
      duration_practice: form.duration_practice,
      description: form.description,
    };

    createCourse(formData);
  };
  if (isLoading) {
    return <FullScreenLoader />;
  }
  return (
    <Box
      justifyContent="center"
      alignItems="center"
      alignContent="center"
      container
      direction="column"
      sx={{p: "16px", m: "auto", width: "90%" }}
    > 
    <ThemeProvider theme={newTheme}>
      <Typography variant="h3" sx={{ fontFamily: "Kanit", fontWeight: 700 }}>
          Crea un nou curs
        </Typography>
        </ThemeProvider>
      <Box sx={{ bgcolor: "#F4F8DD", p: "16px", m: "auto", width: "100%" }}>
        
        
        <Stack
          justifyContent="center"
          direction="row"
          spacing={2}
          sx={{ p: 2, m: 2 }}
        >
          <Button
            variant="outlined"
            onClick={() => navigate('/')}
            sx={{
              borderColor: "#BED730",
              color: "black",
              "&:hover": {
                borderColor: "red",
              },
              borderRadius: "16px",

              width: "189.5px",
            }}
          >
            Torna
          </Button>
          <LoadingButton
            variant="contained"
            sx={{
              bgcolor: "#BED730",
              color: "black",
              borderRadius: "16px",
              width: "189.5px",
            }}
            type="submit"
            loading={isLoading}
          >
            Desa
          </LoadingButton>
        </Stack>
        <Box
          component="form"
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit}
        >
          <List
            direction="column"
            sx={{ color: "black", width: 300, borderRadius: "16px" }}
          >
            Categoría
            <Stack sx={{ my: 1, bgcolor: "#E9F9FB", p: 2 }}>
              <RadioGroup
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="categories-radios"
                onChange={handleCategoriesChange}
                value={selectedCategories}
              >
                {categories?.map((category) => (
                  <CategoriesRadios
                    name="categories"
                    key={category.name}
                    value={category.id}
                    label={category.name}
                  />
                ))}
              </RadioGroup>
            </Stack>
          </List>
          <List sx={{ color: "black" }}>
            Codi
            <Box
              sx={{
                bgcolor: "#E9F9FB",
                alignItems: "center",
                my: 1,
                borderRadius: "16px",
              }}
            >
              <TextField
                placeholder="Escriu el codi del curs aquí"
                sx={{ width: "100%" }}
                id="demo-helper-text-aligned-no-helper"
                name="code"
                InputLabelProps={{
                  style: { color: "black" },
                }}
                InputProps={{ inputProps: { style: { color: "black" } } }}
                focused
                value={form.code}
                onChange={handleChange}
              />
            </Box>
          </List>
          <List sx={{ color: "black" }}>
            Titol
            <Stack
              sx={{
                bgcolor: "#E9F9FB",
                alignItems: "center",
                my: 2,
                borderRadius: "16px",
              }}
            >
              <TextField
                sx={{ width: "100%" }}
                id="demo-helper-text-aligned-no-helper"
                placeholder="Escriu el títol del curs aquí"
                InputLabelProps={{
                  style: { color: "black" },
                }}
                InputProps={{ inputProps: { style: { color: "black" } } }}
                focused
                name="name"
                value={form.name}
                onChange={handleChange}
              />
            </Stack>
          </List>
          <List sx={{ color: "black" }}>
            Seu
            <Stack
              sx={{
                flexGrow: 1,
                my: 1,
                bgcolor: "#E9F9FB",
                my: 2,
                width: 300,
                borderRadius: "16px",
              }}
            >
              <RadioGroup
                row
                container
                sx={{
                  justifyContent: "space-between",
                  px: 2,
                }}
                name="locations-radios"
                onChange={handleLocationsChange}
                value={selectedLocations}
              >
                {locations?.map((location) => (
                  <FormControlLabel
                    key={location.name}
                    value={location.id}
                    control={
                      <Radio
                        sx={{
                          color: "black",
                          "&.Mui-checked": {
                            color: "#BED730",
                          },
                        }}
                      />
                    }
                    label={location.location}
                  />
                ))}
              </RadioGroup>
            </Stack>
          </List>
          <List sx={{ color: "black" }}>
            Hores Teoria
            <Box
              sx={{
                bgcolor: "#E9F9FB",
                alignItems: "center",
                my: 2,
                borderRadius: "16px",
              }}
            >
              <Stack
                direction="row"
                sx={{
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <TextField
                  placeholder="800"
                  sx={{ width: "100%" }}
                  id="demo-helper-text-aligned-no-helper"
                  InputLabelProps={{
                    style: { color: "black" },
                  }}
                  type="number"
                  InputProps={{ inputProps: { style: { color: "black" } } }}
                  focused
                  name="duration_theory"
                  value={form.duration_theory}
                  onChange={handleChange}
                />
              </Stack>
            </Box>
          </List>
          <List sx={{ color: "black" }}>
            Hores pràctica
            <Box
              sx={{
                bgcolor: "#E9F9FB",
                alignItems: "center",
                my: 2,
                borderRadius: "16px",
              }}
            >
              <Stack
                direction="row"
                sx={{
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <TextField
                  sx={{ width: "100%" }}
                  id="demo-helper-text-aligned-no-helper"
                  InputLabelProps={{
                    style: { color: "black" },
                  }}
                  type="number"
                  placeholder="800"
                  InputProps={{ inputProps: { style: { color: "black" } } }}
                  focused
                  name="duration_practice"
                  value={form.duration_practice}
                  onChange={handleChange}
                />
              </Stack>
            </Box>
          </List>

          <List sx={{ color: "black" }}>
            Descripció
            <Stack
              sx={{
                bgcolor: "#E9F9FB",
                alignItems: "center",
                my: 2,
                borderRadius: "16px",
              }}
            >
              <Stack
                sx={{
                  width: "100%",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <TextField
                  sx={{ width: "100%" }}
                  id="demo-helper-text-aligned-no-helper"
                  InputLabelProps={{
                    style: { color: "black" },
                  }}
                  placeholder="Escriu la descripció del curs aquí."
                  InputProps={{ inputProps: { style: { color: "black" } } }}
                  focused
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                />
              </Stack>
            </Stack>
          </List>

          <Stack
            justifyContent="center"
            direction="row"
            spacing={2}
            sx={{ p: 2, m: 2 }}
          >
            <Button
              variant="outlined"
              sx={{
                borderColor: "#BED730",
                color: "black",
                "&:hover": {
                  borderColor: "red",
                },
                borderRadius: "16px",

                width: "189.5px",
                height: "44px",
              }}
            >
              Tanca
            </Button>
            <LoadingButton
              variant="contained"
              sx={{
                bgcolor: "#BED730",
                color: "black",
                borderRadius: "16px",
                width: "189.5px",
                height: "44px",
              }}
              type="submit"
              loading={isLoading}
            >
              Desa nou curs
            </LoadingButton>
          </Stack>
        </Box>
      </Box>
    </Box>
  );
}
