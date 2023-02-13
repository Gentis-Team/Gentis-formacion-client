import {
    Avatar,
    Box,
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Grid,
    Typography,
} from '@mui/material';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import { useState } from 'react';
import CourseModal from '@/components/layout/modals/CourseModal';
import { toast } from 'react-toastify';
import UpdateCourse from './UpdateCourse';
import { format, parseISO } from 'date-fns';
import './CourseItemStyles.scss';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteCourseFn } from '@/api/courseApi';
import './CourseItemStyles.scss'
import { useStateContext } from '@/services/providers/StateContextProvider';

const SERVER_ENDPOINT = import.meta.env.VITE_REACT_APP_SERVER_ENDPOINT;

const CourseItem = ({ course }) => {
    const stateContext = useStateContext();
    const user = stateContext.state.authUser;

    const can = (permission) =>
        (user?.permissions).find((p) => p === permission) ? true : false;

    const queryClient = useQueryClient();
    const [openCourseModal, setOpenCourseModal] = useState(false);

    const { mutate: deleteCourse } = useMutation((id) => deleteCourseFn(id), {
        onSuccess(data) {
            queryClient.invalidateQueries('course');
            toast.success('Course deleted successfully');
        },
        onError(error) {
            if (Array.isArray((error).data.error)) {
                (error).data.error.forEach((el) =>
                    toast.error(el.message, {
                        position: 'top-right',
                    })
                );
            } else {
                toast.error((error).data.message, {
                    position: 'top-right',
                });
            }
        },
    });

    const onDeleteHandler = (id) => {
        if (window.confirm('Are you sure')) {
            deleteCourse(id);
        }
    };

    return (
        <>
            <Grid item xs={12} md={6} lg={4}>
                <Card sx={{ maxWidth: 345, overflow: 'visible' }}>
                    <CardMedia
                        component='img'
                        height='250'
                        image={`${course.image}`}
                        alt='green iguana'

                    />
                    <CardContent>
                        <Typography
                            gutterBottom
                            variant='h5'
                            component='div'
                            sx={{ fontWeight: 'bold' }}
                        >
                            {course.name.length > 20
                                ? `${course.name.substring(0, 20)}...`
                                : course.name}
                        </Typography>
                        <Box display='flex' alignItems='center' sx={{ mt: '1rem' }}>
                            <Typography
                                variant='body1'
                                sx={{
                                    p: '0.1rem 0.4rem',
                                    borderRadius: 1,
                                    mr: '1rem',
                                }}
                            >
                                {course.category}
                            </Typography>
                            <Typography
                                variant='body2'
                                sx={{
                                    color: '#ffa238',
                                }}
                            >
                                {format(parseISO(course.created_at), 'PPP')}
                            </Typography>
                        </Box>
                    </CardContent>
                    <CardActions>
                        <Box
                            display='flex'
                            justifyContent='space-between'
                            width='100%'
                            sx={{ px: '0.5rem' }}
                        >
                            <Box display='flex' alignItems='center'>
                                <Typography
                                    variant='body2'
                                    sx={{
                                        ml: '1rem',
                                    }}
                                >
                                    Codevo
                                </Typography>
                            </Box>
                            {user && can('edit courses') ?
                                <div className='course-settings'>
                                    <li>
                                        <MoreHorizOutlinedIcon />
                                    </li>
                                    <ul className='menu'>
                                        <li onClick={() => setOpenCourseModal(true)}>
                                            <ModeEditOutlineOutlinedIcon
                                                fontSize='small'
                                                sx={{ mr: '0.6rem' }}
                                            />
                                            Edit
                                        </li>
                                        {can('delete courses') ?
                                            <li onClick={() => onDeleteHandler(course.id)}>
                                                <DeleteOutlinedIcon
                                                    fontSize='small'
                                                    sx={{ mr: '0.6rem' }}
                                                />
                                                Delete
                                            </li> : null
                                        }
                                    </ul>
                                </div> : null
                            }
                        </Box>
                    </CardActions>
                </Card>
            </Grid>
            <CourseModal
                openCourseModal={openCourseModal}
                setOpenCourseModal={setOpenCourseModal}
            >
                <UpdateCourse setOpenCourseModal={setOpenCourseModal} course={course} />
            </CourseModal>
        </>
    );
};

export default CourseItem;
