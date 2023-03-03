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
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import DateInput from "../Forms/inputs/DateInput";
import TimeInput from "../Forms/inputs/TimeInput";
import Checkboxe from "./inputs/Checkbox";
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { createCourseFn } from '@/api/courseApi';
import {
  Controller,
  FormProvider,
  useForm,
} from 'react-hook-form';
import { object, string, z } from 'zod';
import CategoriesRadios from "./inputs/CategoriesRadios";
import { useCategoriesContext } from '@/services/providers/CategoriesContextProvider';
import {useQueryLocations, useQueryRequirements, useQueryGroups, useQueryCategories }from '@/services/hooks/useQuery';
import FullScreenLoader from '@/components/layout/loaders/FullScreenLoader';
import { getAllCategoriesFn } from '@/api/categoryApi';
import { getAllLocationsFn } from '@/api/locationApi';
import { useLocationsContext } from '@/services/providers/LocationsContextProvider';
import { getAllRequirementsFn } from '@/api/requirementApi';
import { useRequirementsContext } from '@/services/providers/RequirementsContextProvider';
import { Box } from "@mui/material";
import { LoadingButton } from "@mui/lab";

const createCourseSchema = object({
    code: string(),
    name: string().max(70),
    description: string(),
});

export default function ColorButtons() {
  const categoriesContext = useCategoriesContext();
  const locationsContext = useLocationsContext();

    const {isLoading, data: categories } = useQuery(['categories'], () => getAllCategoriesFn(), {
        select: (data) => data.categories,
        onSuccess: (data) => {
          categoriesContext.dispatch({ type: 'SET_CATEGORIES', payload: data });
        },
        onError: (error) => useHandleError(error),
      });
  
      const {data: locations } = useQuery(['locations'], () => getAllLocationsFn(), {
        select: (data) => data.locations,
        onSuccess: (data) => {
          locationsContext.dispatch({ type: 'SET_LOCATIONS', payload: data });
        },
        onError: (error) => useHandleError(error),
      });

      const requirementsContext = useRequirementsContext();

      const {data: requirements } = useQuery(['requirements'], () => getAllRequirementsFn(), {
          select: (data) => data.requirements,
          onSuccess: (data) => {
            requirementsContext.dispatch({ type: 'SET_REQUIREMENTS', payload: data });
          },
          onError: (error) => useHandleError(error),
        });
  const queryClient = useQueryClient();
    const { mutate: createCourse } = useMutation(
        (course) => createCourseFn(course),
        {
            onSuccess: () => {
                queryClient.invalidateQueries(['courses']);
                toast.success('Course created successfully');
                setOpenCourseModal(false);
            },
            onError: (error) => {
                setOpenCourseModal(false);
                if (Array.isArray(error.response.data.error)) {
                    error.data.error.forEach((el) =>
                        toast.error(el.message, {
                            position: 'top-right',
                        })
                    );
                } else {
                    toast.error(error.response.data.message, {
                        position: 'top-right',
                    });
                }
            },
        }
    );

    const methods = useForm({
        resolver: zodResolver(createCourseSchema),
    });

    const {
        formState: { errors, isSubmitSuccessful },
    } = methods;

    useEffect(() => {
        if (isSubmitSuccessful) {
            methods.reset();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isSubmitSuccessful]);

    const onSubmitHandler = (values) => {
        createCourse(values);
    };
    if (isLoading) {
      return <FullScreenLoader />;
    }
  return (
    <Grid
      justifyContent="center"
      alignItems="center"
      alignContent="center"
      container
      direction="column"
      sx={{ bgcolor: "white", p:'16px', width:'100%' }}

    >
      <Stack
        justifyContent="center"
        direction="row"
        spacing={2}
        sx={{ p: 2, m: 2,  }}
      >
        <Button
          variant="contained"
          sx={{
            bgcolor: "#BED730",
            color: "black",
            borderRadius: "16px",
            width: 130,
          }}
        >
          Edita Curs
        </Button>
        <Button
          variant="outlined"
          sx={{
            borderColor: "#BED730",
            color: "black",
            "&:hover": {
              borderColor: "red",
            },
            borderRadius: "16px",
            width: 130,
          }}
        >
          Tanca
        </Button>
      </Stack>
      <FormProvider {...methods}>
          <Box
            component='form'
            noValidate
            autoComplete='off'
            onSubmit={methods.handleSubmit(onSubmitHandler)}
          >
      <List direction="column" sx={{ color: "black", width: 300 }}>
        Categoría
        <Stack sx={{ my: 1, bgcolor: "#E9F9FB", p: 2 }}>
            <RadioGroup
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
            >
            {categories?.map((category) => (
                <CategoriesRadios key={category.id} value={category.id} label={category.name}/>
              ))}
            </RadioGroup>
        </Stack>
      </List>
      <List sx={{ color: "black" }}>
        Codi
        <Stack sx={{ bgcolor: "#E9F9FB", alignItems: "center", my: 1 }}>
          <TextField
            placeholder="Escriu el codi del curs aquí"
            sx={{ width: 300,  }}
            id="demo-helper-text-aligned-no-helper"
            
            InputLabelProps={{
              style: { color: "black" },
            }}
            InputProps={{ inputProps: { style: { color: "black" } } }}
            focused
          />
        </Stack>
      </List>
      <List sx={{ color: "black" }}>
        Titol
        <Stack sx={{ bgcolor: "#E9F9FB", alignItems: "center", my: 2 }}>
          <TextField
            sx={{ width: 300,  }}
            id="demo-helper-text-aligned-no-helper"
            placeholder="Escriu el títol del curs aquí"
            InputLabelProps={{
              style: { color: "black" },
            }}
            InputProps={{ inputProps: { style: { color: "black" } } }}
            focused
          />
        </Stack>
      </List>
      <List sx={{ color: "black" }}>
        Seu
        <Stack
          sx={{ flexGrow: 1, my: 1, bgcolor: "#E9F9FB", my: 2, width: 300 }}
        >
            <RadioGroup
              row
              container
              sx={{
                justifyContent: "space-between",
                px: 2,
              }}
            >
              {locations?.map((location) => (
                <FormControlLabel
                key={location.id}
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
        <Stack sx={{ bgcolor: "#E9F9FB", alignItems: "center", my: 2 }}>
          <Stack
            direction="row"
            sx={{
              width: 300,
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <TextField
             placeholder="800"
              sx={{ width: 120 }}
              id="demo-helper-text-aligned-no-helper"
              InputLabelProps={{
                style: { color: "black" },
              }}
              InputProps={{ inputProps: { style: { color: "black" } } }}
              focused
            />
           
              <FormControlLabel
                control={
                  <Checkbox
                    defaultChecked
                    sx={{
                      color: "black",
                      "&.Mui-checked": {
                        color: "#BED730",
                      },
                    }}
                  />
                }
                label="Cap teoria"
              />
           
          </Stack>
        </Stack>
      </List>
      <List sx={{ color: "black" }}>
        Hores pràctica
        <Stack sx={{ bgcolor: "#E9F9FB", alignItems: "center", my: 2 }}>
          <Stack
            direction="row"
            sx={{
              width: 300,
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <TextField
              sx={{ width: 120 }}
              id="demo-helper-text-aligned-no-helper"
              InputLabelProps={{
                style: { color: "black" },
              }}
              placeholder="800"
              InputProps={{ inputProps: { style: { color: "black" } } }}
              focused
            />
            
              <FormControlLabel
                control={
                  <Checkbox
                    defaultChecked
                    sx={{
                      color: "black",
                      "&.Mui-checked": {
                        color: "#BED730",
                      },
                    }}
                  />
                }
                label="Cap pràctica"
              />
            
          </Stack>
        </Stack>
      </List>
      <List sx={{ color: "black" }}>
        Data d’inici
        <Stack sx={{ bgcolor: "#E9F9FB", alignItems: "center", my: 2 }}>
          <Stack
            direction="row"
            sx={{
              width: 300,
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <DateInput sxDate={{ input: { color: "black" } }} />
          </Stack>
        </Stack>
      </List>
      <List sx={{ color: "black" }}>
        Horari
        <Stack sx={{ bgcolor: "#E9F9FB", alignItems: "center", my: 2 }}>
          <Stack
            sx={{
              width: 300,
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <TimeInput direction="row" sxTime={{ input: { color: "black" } }} />
          </Stack>
        </Stack>
      </List>
      <List sx={{ color: "black" }}>
        Descripció
        <Stack sx={{ bgcolor: "#E9F9FB", alignItems: "center", my: 2 }}>
          <Stack
            sx={{
              width: 300,
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <TextField
              sx={{ width: 300,  }}
              id="demo-helper-text-aligned-no-helper"
              InputLabelProps={{
                style: { color: "black" },
              }}
              placeholder="Escriu la descripció del curs aquí."
              InputProps={{ inputProps: { style: { color: "black" } } }}
              focused
            />
          </Stack>
        </Stack>
      </List>
      <List sx={{ color: "black" }}>
        Sortides professionals
        <Stack sx={{ bgcolor: "#E9F9FB", alignItems: "center", my: 2 }}>
          <Stack
            sx={{
              
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <TextField
              sx={{ width: 300,  }}
              id="demo-helper-text-aligned-no-helper"
              InputLabelProps={{
                style: { color: "black" },
              }}
              placeholder="Escriu examples de sortides professionals aquí."
              InputProps={{ inputProps: { style: { color: "black" } } }}
              focused
            />
          </Stack>
        </Stack>
      </List>
      <List sx={{ color: "black" }}>
        Requisits
        <Stack  sx={{ bgcolor: "#E9F9FB", my: 2,  alignContent:'flex-start' , p:2 }}>
        {requirements?.map((requirement) => ( 
          <Checkboxe name={requirement.name}/>
        ))}
          
        </Stack>
      </List>
      <Stack
        justifyContent="center"
        direction="row"
        spacing={2}
        sx={{ p: 2, m: 2,  }}
      >
        <LoadingButton
              variant='contained'
              sx={{
                bgcolor: "#BED730",
                color: "black",
                borderRadius: "16px",
                width: 130,
              }}
              type='submit'
              loading={isLoading}
            >
              Desa
            </LoadingButton>
        <Button
          variant="outlined"
          sx={{
            borderColor: "red",
            color: "black",
            "&:hover": {
              borderColor: "#BED730",
            },
            borderRadius: "16px",
            width: 130,
          }}
        >
          Descarta
        </Button>
      </Stack>
      </Box>
      </FormProvider>
      
    </Grid>
  );
}
