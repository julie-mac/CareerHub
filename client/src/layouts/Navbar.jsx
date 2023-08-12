import React from 'react'
import AppBar from '@mui/material/AppBar';
import { Container, Button, Toolbar, Typography, Box, IconButton, Link, Paper } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { useNavigate } from 'react-router-dom';

export default function NavBar() {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    const handleLogout = () => {
        console.log('Logging out...')
        localStorage.removeItem('token');
        navigate('/') // Redirects to the login page
    };

    const listItems = [
        token
            ? { title: 'Log Out', onClick: handleLogout }
            : { title: 'Log In', link: '../' },
        token
            ? { title: 'Profile', link: '../profile' }
            : { title: 'Sign-Up', link: '../Register' },
        {
            title: 'Topics',
            link: '../TopicsMain',
        },
        {
            title: 'Posts',
            link: '../Posts',
        }
    ];    

    const fontFamily = [
        'Nunito',
        'Comforter',
        'Roboto'
    ].join(',');

    const styles = {
        navBar: {
            textAlign: "center",
            fontFamily: fontFamily,
            backgroundColor: "inherit",
            fontSize: "2rem",
        },
        logo: {
            fontFamily: fontFamily,
            backgroundColor: "inherit",
            fontWeight: "bold",
            fontSize: "2.5rem",
            color: "white"
        },
        button: {
            fontSize: "1.7rem",
            fontWeight: "bold",
            fontFamily: fontFamily,
            color: "white",
            borderRadius: "28px"

        },
        link: {
            textDecoration: "none",
            fontFamily: fontFamily,
            color: "rgb(32, 33, 36)",
            fontWeight: 'bold'

        }
    }
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const open = Boolean(anchorElNav);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    return (

        <>
            <AppBar position="static" style={styles.navBar} elevation='0' maxWidth="xl">
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <Typography
                            variant="h6"
                            noWrap
                            component="div"
                            sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
                            style={styles.logo}
                        >
                            TBD
                        </Typography>

                        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                            <IconButton
                                onClick={handleOpenNavMenu}
                                aria-haspopup="true"
                                color="inherit"
                            >
                                <MenuIcon />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorElNav}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                }}
                                open={open}
                                onClose={handleCloseNavMenu}
                                MenuListProps={{
                                    'aria-labelledby': 'basic-button',
                                }}
                                sx={{
                                    display: { xs: 'block', sm: 'block', md: 'none' },
                                }}
                            >
                                {listItems.map((listItem, i) => (
                                    <Paper elevation={0}>
                                        <MenuItem 
                                            key={i} 
                                            onClick={listItem.onClick || handleCloseNavMenu}
                                        >
                                            <Typography textAlign="center"><Link href={listItem.link} style={styles.link}>{listItem.title}</Link></Typography>
                                        </MenuItem>
                                    </Paper>
                                ))}
                            </Menu>
                        </Box>
                        <Typography
                            variant="h6"
                            noWrap
                            component="div"
                            sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
                            style={styles.button}
                        >
                           TBD
                        </Typography>
                        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }} style={styles.button}>
                            {listItems.map((listItem, i) => (
                                <Button
                                    key={i}
                                    onClick={listItem.onClick || handleCloseNavMenu}
                                    sx={{ my: 2, color: 'white', display: 'block' }}
                                    href={listItem.link}
                                    style={styles.button}
                                >
                                    {listItem.title}
                                </Button>
                            ))}
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
        </>

    )
}