import { styled } from '@mui/material/styles';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import {
    IconButton,
    Box,
    Avatar,
    Collapse,
    Card,
    CardActions,
    CardHeader,
    CardContent,
    CardMedia,
    Grid,
    Typography,
    Tooltip,
} from '@mui/material';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import React, { useState } from 'react';
import CourseModal from '@/components/modals/CourseModal';
import { toast } from 'react-toastify';
import UpdateCourse from '@/components/modals/UpdateCourse';
import { format, parseISO } from 'date-fns';
import './CourseItemStyles.scss';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteCourseFn } from '@/api/courseApi';
import { useStateContext } from '@/services/providers/StateContextProvider';
import InfoIcon from '@mui/icons-material/Info';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import SettingsMenu from './SettingsMenu';
import ReactWhatsapp from 'react-whatsapp';
import { Link, useNavigate } from 'react-router-dom';
import Tags from '../../Navigation/tags/Tags';
import EmailIcon from '@mui/icons-material/Email';


const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

const CourseItem = ({ course }) => {
    const navigate = useNavigate();
    const stateContext = useStateContext();
    const user = stateContext.state.authUser;
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const can = (permission) =>
        (user?.permissions).find((p) => p === permission) ? true : false;

    const queryClient = useQueryClient();
    const [openCourseModal, setOpenCourseModal] = useState(false);

    const { mutate: deleteCourse } = useMutation((id) => deleteCourseFn(id), {
        onSuccess(data) {
            queryClient.invalidateQueries('course');
            toast.success('El curs s\'ha suprimit correctament');
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
        if (window.confirm('Està segur')) {
            deleteCourse(id);
        }
    };

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleSettingsClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <Grid item xs={12} md={6}>
                <Card  sx={{
          bgcolor: 'background.paper',
          borderRadius: 2,
        }}
        style={{ border: "2px solid #BED730" }}
 >
                    <CardHeader
                        avatar={
                            <Avatar aria-label="recipe">
                                <FileCopyIcon />
                            </Avatar>
                        }
                        action={
                            user && can('edit courses') && (
                                <IconButton onClick={handleSettingsClick} aria-label="settings">
                                    <MoreVertIcon />
                                </IconButton>
                            )
                            
                        }
                        titleTypographyProps={{ variant: 'body2' }}
                        subheaderTypographyProps={{ variant: 'subtitle2' }}
                        title={`${course.categories[0].name} | ${course.code}`}
                        subheader={course.name}
                    />
                    <SettingsMenu 
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        setOpenCourseModal={setOpenCourseModal} 
                        onDeleteHandler={onDeleteHandler}
                        courseId={course.id}
                    />
                    <CardContent onClick={() => navigate('/single-course/' + course.id)}>
                        <Typography variant="body2" color="text.secondary">
                            <Tags course={course}/>
                        </Typography>
                    </CardContent>
                    <CardActions disableSpacing>
                        <Tooltip title="Demana més informació" placement="bottom">
                            <IconButton onClick={() => navigate('/new-student')}aria-label="Demana més informació">
                                <EmailIcon color="primary" />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Posat en contacte amb nosaltres" placement="bottom">
                            <IconButton component="a" href={"https://wa.me/34" + course.users[0].phone} aria-label="Posa't en contacte amb nosaltres utilitzant Whatsapp">
                                <WhatsAppIcon color="success" />
                            </IconButton>
                        </Tooltip>

                        <ExpandMore
                            expand={expanded}
                            onClick={handleExpandClick}
                            aria-expanded={expanded}
                            aria-label="show more"
                        >
                            <ExpandMoreIcon />
                        </ExpandMore>
                    </CardActions>
                    <Collapse in={expanded} timeout="auto" unmountOnExit>
                        <CardContent>
                            <Typography paragraph>{course.description}</Typography>
                        </CardContent>
                    </Collapse>
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

{/* <Box
                            display='flex'
                            justifyContent='space-between'
                            width='100%'
                            sx={{ px: '0.5rem' }}
                        >
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
                            </Box> */}