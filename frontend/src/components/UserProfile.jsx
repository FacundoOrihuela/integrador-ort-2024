import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Button, TextField, CardContent, Typography, CircularProgress, Box, Paper, IconButton, Avatar, Alert } from '@mui/material';
import { Edit as EditIcon, AccountCircle as AccountCircleIcon } from '@mui/icons-material';
import { toast } from 'react-toastify';
import Header from './Header';
import Footer from './Footer';
import { UserContext } from '../context/UserContext';
import config from "../utils/config.json";

const UserProfile = () => {
    const { userId } = useParams();
    const { user } = useContext(UserContext);
    const [profile, setProfile] = useState(null);
    const [userType, setUserType] = useState('');
    const [membershipName, setMembershipName] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({ name: '', email: '', photo: '' });
    const [selectedFile, setSelectedFile] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const [isUploading, setIsUploading] = useState(false);
    const [imageError, setImageError] = useState(false);

    useEffect(() => {
        const fetchProfile = async () => {
            const token = localStorage.getItem('token');
            try {
                const { data: { user } } = await axios.get(`${config.apiUrl}/api/user/${userId}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setProfile(user);
                setUserType(user.userType);
                setFormData({ name: user.name, email: user.email, photo: user.photo });

                if (user.userType === 'client') {
                    const { data: { data: clientData } } = await axios.get(`${config.apiUrl}/api/clients/${user.email}`, {
                        headers: { Authorization: `Bearer ${token}` },
                    });
                    setProfile({ ...user, ...clientData });

                    if (clientData.membershipId) {
                        const { data: { data: membership } } = await axios.get(`${config.apiUrl}/api/memberships/${clientData.membershipId}`, {
                            headers: { Authorization: `Bearer ${token}` },
                        });
                        setMembershipName(membership.name);
                    }
                } else if (user.userType === 'teacher') {
                    const { data: { data: teacherData } } = await axios.get(`${config.apiUrl}/api/teachers/${user.email}`, {
                        headers: { Authorization: `Bearer ${token}` },
                    });
                    setProfile({ ...user, ...teacherData });
                } else if (user.userType === 'administrator') {
                    const { data: { data: adminData } } = await axios.get(`${config.apiUrl}/api/administrators/${user.email}`, {
                        headers: { Authorization: `Bearer ${token}` },
                    });
                    setProfile({ ...user, ...adminData });
                }
            } catch (error) {
                console.error('Error fetching profile:', error);
            }
        };

        fetchProfile();
    }, [userId]);

    const handleEditToggle = () => {
        setIsEditing(!isEditing);
        setErrorMessage('');
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedFile(file);
            await handlePhotoUpload(file);
        }
    };

    const handlePhotoUpload = async (file) => {
        setIsUploading(true);
        const token = localStorage.getItem('token');
        const imageFormData = new FormData();
        imageFormData.append('image', file);

        try {
            const { data: { data: { photo } } } = await axios.post(`${config.apiUrl}/api/user/upload-profile-image/${userId}`, imageFormData, {
                headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' },
            });
            setProfile((prevProfile) => ({ ...prevProfile, photo }));
            setSelectedFile(null);
            setImageError(false);
        } catch (error) {
            console.error('Error uploading profile image:', error);
        } finally {
            setIsUploading(false);
        }
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        const dataToSend = { name: formData.name, email: formData.email };

        if (formData.name === profile.name && formData.email === profile.email && !selectedFile) {
            setErrorMessage('Los datos no pueden ser iguales a los existentes');
            return;
        }

        try {
            const endpoint = userType === 'client' ? 'clients' : userType === 'teacher' ? 'teachers' : 'administrators';
            await axios.put(`${config.apiUrl}/api/${endpoint}/${userId}`, dataToSend, {
                headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
            });

            const { data: { user: updatedUser } } = await axios.get(`${config.apiUrl}/api/user/${userId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setProfile(updatedUser);
            setIsEditing(false);
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                toast.error(error.response.data.message);
            } else {
                console.error('Error updating profile:', error);
            }
        }
    };

    if (!profile) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                <CircularProgress />
                <Box ml={2}>Cargando perfil...</Box>
            </Box>
        );
    }

    const isOwnProfile = user && user.id === parseInt(userId);

    return (
        <Box display="flex" flexDirection="column" minHeight="100vh">
            <Header />
            <Paper className="p-10 max-w-[90%] lg:max-w-xl" sx={{ flexGrow: 1, width: '100%', height: '100%', display: 'flex', flexDirection: 'column', marginX: 'auto', marginY: 4 }}>
                <Box display="flex" justifyContent="center" mb={4} position="relative">
                    <Box width={192} height={192} position="relative">
                        {isUploading ? (
                            <CircularProgress size={192} sx={{ position: 'absolute', top: 0, left: 0, zIndex: 1 }} />
                        ) : profile.photo ? (
                            <Avatar
                                src={profile.photo}
                                alt="Profile"
                                onError={() => setImageError(true)}
                                sx={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }}
                            />
                        ) : (
                            <AccountCircleIcon sx={{ width: '100%', height: '100%', color: 'gray' }} />
                        )}
                        {imageError && (
                            <Typography variant="body1" color="error" sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
                                Error al cargar la imagen
                            </Typography>
                        )}
                        {isOwnProfile && (
                            <IconButton
                                component="label"
                                sx={{
                                    position: 'absolute',
                                    bottom: 0,
                                    right: 0,
                                    backgroundColor: 'white',
                                    color: 'primary.main',
                                    boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.3)',
                                    '&:hover': { backgroundColor: 'white' },
                                }}
                            >
                                <EditIcon />
                                <input type="file" hidden onChange={handleFileChange} />
                            </IconButton>
                        )}
                    </Box>
                </Box>
                <CardContent sx={{ flexGrow: 1 }}>
                    <Typography variant="body1" sx={{ mb: 2 }}><strong>{profile.name}</strong> </Typography>
                    <Typography variant="body1" sx={{ mb: 2 }}>{profile.email}</Typography>
                    <Typography variant="body1" sx={{ mb: 2 }}><strong>Usuario desde:</strong> {new Date(profile.created).toLocaleDateString()}</Typography>
                    {userType === 'client' && (
                        <Typography variant="body1" sx={{ mb: 2 }}><strong>Membresía:</strong> {membershipName ? membershipName : 'Ninguna'}</Typography>
                    )}
                    {userType === 'teacher' && (
                        <>
                            <Typography variant="body1" sx={{ mb: 2 }}><strong>Especialidad:</strong> {profile.specialty}</Typography>
                            <Typography variant="body1" sx={{ mb: 2 }}><strong>Descripción:</strong> {profile.description}</Typography>
                        </>
                    )}
                </CardContent>
                {isOwnProfile && (
                    <CardContent>
                        <Button variant="contained" color="primary" onClick={handleEditToggle} sx={{ mt: 2 }}>
                            {isEditing ? 'Cancelar' : 'Editar Perfil'}
                        </Button>
                        {isEditing && (
                            <Box component="form" onSubmit={handleFormSubmit} sx={{ mt: 2 }}>
                                {errorMessage && <Alert severity="error" sx={{ mb: 2 }}>{errorMessage}</Alert>}
                                <TextField
                                    label="Nombre"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    fullWidth
                                    sx={{ mb: 2 }}
                                />
                                <TextField
                                    label="Email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    fullWidth
                                    sx={{ mb: 2 }}
                                />
                                <Button type="submit" variant="contained" color="success" sx={{ mt: 2 }}>
                                    Guardar Cambios
                                </Button>
                            </Box>
                        )}
                    </CardContent>
                )}
            </Paper>
            <Footer />
        </Box>
    );
};

export default UserProfile;
