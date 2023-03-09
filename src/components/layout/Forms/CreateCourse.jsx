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
import { useQueryLocations, useQueryRequirements, useQueryGroups, useQueryCategories } from '@/services/hooks/useQuery';
import FullScreenLoader from '@/components/layout/loaders/FullScreenLoader';
import { getAllCategoriesFn } from '@/api/categoryApi';
import { getAllLocationsFn } from '@/api/locationApi';
import { useLocationsContext } from '@/services/providers/LocationsContextProvider';
import { getAllRequirementsFn } from '@/api/requirementApi';
import { useRequirementsContext } from '@/services/providers/RequirementsContextProvider';
import { Box, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";

const createCourseSchema = object({
    
});

const CreateCourse = () => {
    const categoriesContext = useCategoriesContext();
    const locationsContext = useLocationsContext();

    const { isLoading, data: categories } = useQuery(['categories'], () => getAllCategoriesFn(), {
        select: (data) => data.categories,
        onSuccess: (data) => {
            categoriesContext.dispatch({ type: 'SET_CATEGORIES', payload: data });
        },
        onError: (error) => useHandleError(error),
    });

    const { data: locations } = useQuery(['locations'], () => getAllLocationsFn(), {
        select: (data) => data.locations,
        onSuccess: (data) => {
            locationsContext.dispatch({ type: 'SET_LOCATIONS', payload: data });
        },
        onError: (error) => useHandleError(error),
    });

    const requirementsContext = useRequirementsContext();

    const { data: requirements } = useQuery(['requirements'], () => getAllRequirementsFn(), {
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
                toast.success('Curs creat amb èxit');
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
        <>
            <Grid
                justifyContent="center"
                alignItems="center"
                alignContent="center"
                container
                direction="column"
                sx={{ bgcolor: "white", p: '16px', width: '100%' }}
            >
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
                                        <CategoriesRadios key={category.id} value={category.id} label={category.name} />
                                    ))}
                                </RadioGroup>
                            </Stack>
                        </List>
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
                    </Box>
                </FormProvider>
            </Grid>
        </>
    )
}

export default CreateCourse