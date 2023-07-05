import { useEffect, useState } from 'react';
import { styled, alpha } from '@material-ui/core/styles';

import { Avatar, AppBar, Box, Toolbar, Tooltip, IconButton, Typography, InputBase, Badge, MenuItem, Menu, } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';

import memories from '../../images/logo.png'
import * as actionType from '../../actionConstants';
import { getPostsBySearch } from '../../actions/posts';
import useStyles from './styles';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate, Link } from 'react-router-dom';





const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 3, 0, 0),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 2),
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
}));

export default function PrimarySearchAppBar() {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const [search, setSearch] = useState('')
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    const classes = useStyles();
    const logout = () => {
        dispatch({ type: actionType.LOGOUT });
        navigate('/auth');
        setUser(null);
    };
    const [tags, setTags] = useState([])

    const searchPost = () => {
        if (search.trim() || tags) {
            dispatch(getPostsBySearch({ search, tags }))
            navigate(`/posts/search?searchQuery=${search}&tags=${tags}`)
        } else {
            navigate('/')
        }
    }

    useEffect(() => {
        // const token = user?.token;

        // if (token) {
        //   const decodedToken = decode(token);

        //    if (decodedToken.exp * 1000 < new Date().getTime()) logout();
        // }

        setUser(JSON.parse(localStorage.getItem('profile')));
    }, [location, user?.token]);



    const [anchorEl, setAnchorEl] = useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);

    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMenuClose = (e) => {
        setAnchorEl(null);
        handleMobileMenuClose();
        if (user && e.target.innerText === 'Logout') logout()
        if (!user) navigate('/auth')
        if (e.target.innerText === 'My account') navigate(`/user/${user?.result._id}`)

    };

    const handleMobileMenuOpen = (event) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };

    const menuId = 'primary-search-account-menu';
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={menuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem onClick={handleMenuClose}>Logout</MenuItem>
            <MenuItem onClick={handleMenuClose}>My account</MenuItem>

        </Menu>
    );

    const mobileMenuId = 'primary-search-account-menu-mobile';
    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >
            <MenuItem>
                <IconButton size="large" aria-label="show 4 new mails" color="inherit">
                    <Badge badgeContent={4} color="error">
                        <MailIcon />
                    </Badge>
                </IconButton>
                <p>Messages</p>
            </MenuItem>
            <MenuItem sx={{ mx: '16px' }}>
                <IconButton
                    size="large"
                    aria-label="show 17 new notifications"
                    color="inherit"

                >
                    <Badge badgeContent={17} color="error">
                        <NotificationsIcon />
                    </Badge>
                </IconButton>
                <p>Notifications</p>
            </MenuItem>
            <MenuItem onClick={handleMenuClose}>
                <IconButton size="large" aria-label="show 4 new mails" color="inherit">
                    <AccountCircleIcon />
                </IconButton>
                {user ? 'Logout' : 'Sign In'}</MenuItem>

            {user && <MenuItem onClick={handleMenuClose}>My account</MenuItem>}

            {/* <MenuItem onClick={handleProfileMenuOpen}>
                <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="primary-search-account-menu"
                    aria-haspopup="true"
                    color="inherit"
                >
                    <AccountCircle />
                </IconButton>
                <p>Profile</p>
            </MenuItem> */}
        </Menu>
    )

    return (
        <Box sx={{ flexGrow: 1, mb: 2 }}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography
                    className={classes.typography}
                        variant="h6"
                        sx={{ color : 'red' }}
                    >
                        Market Place
                    </Typography>
                    <Typography component={Link} to="/" >
                        <img src={memories} alt="icon" height="60" />

                    </Typography>
                    <Search >
                        <StyledInputBase
                            placeholder="Search…"
                            inputProps={{ 'aria-label': 'search' }}
                        />
                        <IconButton onClick={searchPost}>
                            <SearchIconWrapper >
                                <SearchIcon />
                            </SearchIconWrapper>
                        </IconButton>

                    </Search>
                    <Box sx={{ flexGrow: 1 }} />
                    <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
                            <Badge badgeContent={4} color="error">
                                <MailIcon />
                            </Badge>
                        </IconButton>
                        <IconButton
                            size="large"
                            aria-label="show 17 new notifications"
                            color="inherit"
                        >
                            <Badge badgeContent={17} color="error">
                                <NotificationsIcon />
                            </Badge>
                        </IconButton>
                        {/* <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton> */}
                        {user?.result ? (
                            <Tooltip title="Open settings">
                                <IconButton onClick={handleProfileMenuOpen} sx={{ p: 0 }}>
                                    <Avatar alt={user?.result?.name} src={user?.result?.profilePicture} />
                                </IconButton>
                            </Tooltip>
                        ) : (
                            <IconButton size="large" aria-label="show 4 new mails" color="inherit" component={Link} to="/auth" variant="contained" sx={{ color: 'white' }}>
                                <AccountCircleIcon fontSize='large' />
                            </IconButton>
                        )
                        }

                    </Box>
                    <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="show more"
                            aria-controls={mobileMenuId}
                            aria-haspopup="true"
                            onClick={handleMobileMenuOpen}
                            color="inherit"
                        >
                            <MoreIcon />
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>
            {renderMobileMenu}
            {renderMenu}
        </Box>
    );
}