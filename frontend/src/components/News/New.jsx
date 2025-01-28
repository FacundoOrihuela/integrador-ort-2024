import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import Header from "../Header";
import Footer from "../Footer";
import config from "../../utils/config.json";

const New = () => {
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
  
    const token = process.env.REACT_APP_API_TOKEN;

    const fetchNews = useCallback(async () => { // useCallback para evitar redefinir la función
        setLoading(true);
        setError(null); 
        try {
            const response = await axios.get(`${config.apiUrl}/api/news`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
    
            if (Array.isArray(response.data.data)) {
                setNews(response.data.data);
            } else {
                setError("No se pudieron cargar las noticias.");
                setNews([]);
            }
        } catch (error) {
            setError("Error al obtener las noticias.");
            setNews([]);
        } finally {
            setLoading(false);
        }
    }, [token]); // Dependencia de token

    useEffect(() => {
        fetchNews();
    }, [fetchNews]); // Agregar fetchNews como dependencia

    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow container mx-auto px-4 py-8">
                <h1 className="text-4xl font-bold mb-8">Noticias</h1>
                
                {loading && <p className="text-center mt-4">Cargando noticias...</p>}
                {error && <p className="text-center text-red-500 mt-4">{error}</p>}
    
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {news.length === 0 && !loading && !error ? (
                        <p className="text-center">No hay noticias disponibles.</p>
                    ) : (
                        news.map((item) => (
                            <div
                                key={item.id}
                                className="bg-white rounded-lg shadow-md overflow-hidden"
                            >
                                <img
                                    src={item.photo || "/path/to/default-image.jpg"}
                                    alt={item.title}
                                    className="w-full h-48 object-cover"
                                />
                                <div className="p-4">
                                    <h2 className="text-xl font-bold">{item.title}</h2>
                                    <p className="text-gray-600">{item.content}</p>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default New;
