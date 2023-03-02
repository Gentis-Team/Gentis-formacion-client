import { Box, Container, Typography } from '@mui/material';
import { useStateContext } from '@/services/providers/StateContextProvider';

const ProfilePage = () => {
    const stateContext = useStateContext();

    const user = stateContext.state.authUser;

    return (
        <Container
            maxWidth={false}
            sx={{
                backgroundColor: 'always.alwaysWhite',
                minHeight: '100vh',
            }}
        >
            <Box
                maxWidth='lg'
                sx={{
                    backgroundColor: 'green.100',
                    maxHeight: '20rem',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    p: '2rem',
                    mx: 'auto',
                }}
            >
                <Typography
                    variant='h2'
                    component='h1'
                    sx={{ color: '#1f1e1e', fontWeight: 500 }}
                >
                    Pàgina de perfil
                </Typography>
                <Box sx={{ mt: 2 }}>
                    <Typography gutterBottom>
                        <strong>Id:</strong> {user?.id}
                    </Typography>
                    <Typography gutterBottom>
                        <strong>Nom Complet:</strong> {user?.name}
                    </Typography>
                    <Typography gutterBottom>
                        <strong>Email:</strong> {user?.email}
                    </Typography>
                    <Typography gutterBottom>
                        <strong>Role:</strong> {user?.role}
                    </Typography>
                </Box>
            </Box>
        </Container>
    );
};

export default ProfilePage;
