import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Button, TextField, Card, CardContent, Typography, CircularProgress, Box, Container, Alert, IconButton } from '@mui/material';
import { Edit as EditIcon } from '@mui/icons-material';
import Header from './Header';
import Footer from './Footer';

const UserProfile = () => {
    const { userId } = useParams();
    const [profile, setProfile] = useState(null);
    const [userType, setUserType] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        photo: '',
    });
    const [selectedFile, setSelectedFile] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const [isUploading, setIsUploading] = useState(false);
    const [imageError, setImageError] = useState(false);

    useEffect(() => {
        const fetchProfile = async () => {
            const token = localStorage.getItem('token');
            try {
                const response = await axios.get(`http://localhost:3001/api/user/${userId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                const user = response.data.user;
                setProfile(user);
                setUserType(user.userType);
                setFormData({
                    name: user.name,
                    email: user.email,
                    photo: user.photo,
                });

                // Fetch additional data based on user type
                if (user.userType === 'client') {
                    const clientResponse = await axios.get(`http://localhost:3001/api/clients/${user.email}`, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
                    setProfile({ ...user, ...clientResponse.data.data });
                } else if (user.userType === 'teacher') {
                    const teacherResponse = await axios.get(`http://localhost:3001/api/teachers/${user.email}`, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
                    setProfile({ ...user, ...teacherResponse.data.data });
                } else if (user.userType === 'administrator') {
                    const adminResponse = await axios.get(`http://localhost:3001/api/administrators/${user.email}`, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
                    setProfile({ ...user, ...adminResponse.data.data });
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
        setFormData({
            ...formData,
            [name]: value,
        });
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
            const uploadResponse = await axios.post(`http://localhost:3001/api/user/upload-profile-image/${userId}`, imageFormData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
            });

            // Actualizar la URL de la foto en el estado del perfil
            setProfile((prevProfile) => ({
                ...prevProfile,
                photo: uploadResponse.data.data.photo,
            }));
            setSelectedFile(null);
            setImageError(false);
        } catch (error) {
            console.error('Error uploading profile image:', error);
        } finally {
            setIsUploading(false);
        }
    };

    const handleImageError = () => {
        setImageError(true);
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        const dataToSend = {
            name: formData.name,
            email: formData.email,
        };

        // Verificar si los datos nuevos son iguales a los datos existentes
        if (
            formData.name === profile.name &&
            formData.email === profile.email &&
            !selectedFile
        ) {
            setErrorMessage('Los datos no pueden ser iguales a los existentes');
            return;
        }

        try {
            // Actualizar los datos del usuario según su tipo
            if (userType === 'client') {
                await axios.put(`http://localhost:3001/api/clients/${userId}`, dataToSend, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });
            } else if (userType === 'teacher') {
                await axios.put(`http://localhost:3001/api/teachers/${userId}`, dataToSend, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });
            } else if (userType === 'administrator') {
                await axios.put(`http://localhost:3001/api/administrators/${userId}`, dataToSend, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });
            }

            // Obtener el perfil actualizado
            const response = await axios.get(`http://localhost:3001/api/user/${userId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setProfile(response.data.user);
            setIsEditing(false);
        } catch (error) {
            console.error('Error updating profile:', error);
        }
    };

    if (!profile) {
        return <Box display="flex" justifyContent="center" alignItems="center" height="100vh"><CircularProgress /></Box>;
    }

    const isOwnProfile = profile.id === parseInt(userId);

    return (
        <Box display="flex" flexDirection="column" minHeight="100vh">
            <Header />
            <Box display="flex" flexDirection="column" flexGrow={1}>
                <Container component="main" sx={{ flexGrow: 1, py: 4, height: '80vh', mt: 6 }}>
                    <Card sx={{ p: 4, flexGrow: 1, display: 'flex', flexDirection: 'column'}}>
                        <CardContent sx={{ display: 'flex', justifyContent: 'center', mb: 4, position: 'relative' }}>
                            <Box sx={{ width: 192, height: 192, position: 'relative' }}>
                                {isUploading ? (
                                    <CircularProgress
                                        size={192}
                                        sx={{ position: 'absolute', top: 0, left: 0, zIndex: 1 }}
                                    />
                                ) : (
                                    <img
                                        src={profile.photo}
                                        alt="Profile"
                                        onError={handleImageError}
                                        style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }}
                                    />
                                )}
                                {imageError && (
                                    <Typography variant="body1" color="error" sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
                                        Error al cargar la imagen
                                    </Typography>
                                )}
                                <IconButton
                                    component="label"
                                    sx={{
                                        position: 'absolute',
                                        bottom: 0,
                                        right: 0,
                                        backgroundColor: 'white',
                                        color: 'primary.main',
                                        boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.3)',
                                        '&:hover': {
                                            backgroundColor: 'white',
                                        },
                                    }}
                                >
                                    <EditIcon />
                                    <input
                                        type="file"
                                        hidden
                                        onChange={handleFileChange}
                                    />
                                </IconButton>
                            </Box>
                        </CardContent>
                        <CardContent sx={{ flexGrow: 1 }}>
                            <Typography variant="body1" sx={{ mb: 4 }}><strong>Nombre:</strong> {profile.name}</Typography>
                            <Typography variant="body1" sx={{ mb: 4 }}><strong>Email:</strong> {profile.email}</Typography>
                            <Typography variant="body1" sx={{ mb: 4 }}><strong>Tipo de Usuario:</strong> {profile.userType}</Typography>
                            <Typography variant="body1" sx={{ mb: 4 }}><strong>Fecha de Creación:</strong> {new Date(profile.created).toLocaleDateString()}</Typography>
                            <Typography variant="body1" sx={{ mb: 4 }}><strong>Verificado:</strong> {profile.isVerified ? 'Sí' : 'No'}</Typography>
                            {userType === 'client' && (
                                <Typography variant="body1" sx={{ mb: 4 }}><strong>Membresía:</strong> {profile.membership}</Typography>
                            )}
                            {userType === 'teacher' && (
                                <>
                                    <Typography variant="body1" sx={{ mb: 4 }}><strong>Especialidad:</strong> {profile.specialty}</Typography>
                                    <Typography variant="body1" sx={{ mb: 4 }}><strong>Descripción:</strong> {profile.description}</Typography>
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
                    </Card>
                </Container>
            </Box>
            <Footer />
        </Box>
    );
};

export default UserProfile;