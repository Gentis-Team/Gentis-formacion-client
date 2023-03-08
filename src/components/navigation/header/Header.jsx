import * as React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { useStateContext } from '@/services/providers/StateContextProvider';
import { LoadingButton } from '@mui/lab';
import { useMutation } from '@tanstack/react-query';
import { logoutUserFn } from '@/api/authApi';
import useHandleError from '@/services/hooks/useHandleError';
import { AccountCircle } from '@mui/icons-material';
import { withStyles } from '@mui/styles';


const drawerWidth = 240;

function DrawerAppBar(props) {
    const navigate = useNavigate();
    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const stateContext = useStateContext();
    const user = stateContext.state.authUser;

    const handleDrawerToggle = () => {
        setMobileOpen((prevState) => !prevState);
    };

    const { mutate: logoutUser, isLoading } = useMutation(
        async () => await logoutUserFn(),
        {
            onSuccess: (data) => {
                navigate("/login")
            },
            onError: (error) => useHandleError(error),

        }
    );

    const onLogoutHandler = async () => {
        logoutUser();
    };

    const drawer = (
        <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
            <Typography variant="h6" sx={{ my: 2 }}>
                Gentis
            </Typography>
            <Divider />
            <List>
                {
                    user && (
                        <>
                            <ListItem disablePadding>
                                <ListItemButton onClick={() => navigate('/create')} sx={{ textAlign: 'center' }}>
                                    <ListItemText primary={'Crear Curs'} />
                                </ListItemButton>
                            </ListItem>
                            <ListItem  disablePadding>
                                <ListItemButton onClick={onLogoutHandler} sx={{ textAlign: 'center' }}>
                                    <ListItemText primary={'Tanca Sessió'} />
                                </ListItemButton>
                            </ListItem>
                        </>
                    )}

            </List>
        </Box>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar component="nav" sx={{ display: 'flex', flexDirection: 'row' }} >
                <IconButton
                    aria-label="arrow"
                    size="large"
                    onClick={() => navigate('/')}
                    sx={{ display: { sm: 'none' } }}
                >
                    <ArrowBackIosIcon />
                </IconButton>
                <Typography
                    variant="h6"
                    component="div"
                    sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', ml: 4 }}
                >
                    Gentis
                </Typography>
                <Toolbar sx={{ display: 'flex', justifyContent: 'end' }}>
                    { user && (
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    )}
                    <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                        {
                            user && (
                                <>
                                    <LoadingButton
                                        loading={isLoading}
                                        onClick={() => navigate('/create')}
                                        sx={{
                                            color: "white"
                                        }}
                                    >
                                        Crear Curs
                                    </LoadingButton>
                                    <LoadingButton onClick={onLogoutHandler}
                                     sx={{
                                        color: "white"
                                    }}
                                    >
                                        Tanca Sessió
                                    </LoadingButton>
                                </>
                            )}
                    </Box>
                </Toolbar>
            </AppBar>
            <Box component="nav">
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    anchor={'right'}
                    ModalProps={{
                        keepMounted: true,
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    {drawer}
                </Drawer>
            </Box>
            <Box component="main" sx={{ p: 3 }}>
                <Toolbar />
            </Box>
        </Box>
    );
}

DrawerAppBar.propTypes = {

    window: PropTypes.func,
};

export default DrawerAppBar;
