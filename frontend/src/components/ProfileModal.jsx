import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { saveSessionToken } from '../features/loginSlice';
import { UserContext } from '../context/UserContext';
import { Box, Typography, List, ListItemText, ListItemAvatar, ClickAwayListener, ListItemButton } from '@mui/material';
import { AccountCircle as AccountCircleIcon, Group as GroupIcon, ShoppingCart as ShoppingCartIcon, AdminPanelSettings as AdminPanelSettingsIcon, ExitToApp as ExitToAppIcon } from '@mui/icons-material';

const ProfileModal = ({ onClose }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user, logout } = useContext(UserContext);

    const handleLogout = () => {
        dispatch(saveSessionToken(null));
        logout();
        navigate('/login');
    };

    return (
        <ClickAwayListener onClickAway={onClose}>
            <Box className="absolute top-16 right-0 w-64 bg-white shadow-lg p-4">
                <Typography variant="h6" className="text-black font-bold mb-4">Menú</Typography>
                <List>
                    <ListItemButton onClick={() => navigate('/profile/' + user.userId)}>
                        <ListItemAvatar>
                            <AccountCircleIcon className="text-colors-1 bg-transparent" />
                        </ListItemAvatar>
                        <ListItemText primary="Gestionar mi perfil" />
                    </ListItemButton>

                    <ListItemButton onClick={() => navigate('/groups')}>
                        <ListItemAvatar>
                            <GroupIcon className="text-colors-1 bg-transparent" />
                        </ListItemAvatar>
                        <ListItemText primary="Mis grupos" />
                    </ListItemButton>

                    <ListItemButton onClick={() => navigate('/purchase-history')}>
                        <ListItemAvatar>
                            <ShoppingCartIcon className="text-colors-1 bg-transparent" />
                        </ListItemAvatar>
                        <ListItemText primary="Mis compras" />
                    </ListItemButton>

                    {user && user.userType === "administrator" && (
                        <ListItemButton onClick={() => navigate('/admin-panel')}>
                            <ListItemAvatar>
                                <AdminPanelSettingsIcon className="text-colors-1 bg-transparent" />
                            </ListItemAvatar>
                            <ListItemText primary="Panel Administrativo" />
                        </ListItemButton>
                    )}
                    <ListItemButton onClick={handleLogout}>
                        <ListItemAvatar>
                            <ExitToAppIcon className="text-colors-1 bg-transparent" />
                        </ListItemAvatar>
                        <ListItemText primary="Cerrar sesión" />
                    </ListItemButton>
                </List>
            </Box>
        </ClickAwayListener>
    );
};

export default ProfileModal;
