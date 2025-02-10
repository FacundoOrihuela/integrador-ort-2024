import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import Header from "../Header";
import Footer from "../Footer";
import config from "../../utils/config.json";

const New = () => {
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [selectedNew, setselectedNew] = useState(null);

    const token = process.env.REACT_APP_API_TOKEN;

    const fetchNews = useCallback(async () => {
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
    }, [token]);

    useEffect(() => {
        fetchNews();
    }, [fetchNews]);

    useEffect(() => {
        document.body.style.overflow = selectedNew ? "hidden" : "auto";
    }, [selectedNew]);

    return (
        <div className="flex flex-col min-h-screen bg-colors-2">
            <Header />
            <main className="flex-grow container mx-auto px-6 lg:px-[120px] py-10">
                {loading && <p className="text-center text-lg text-gray-700">Cargando noticias...</p>}
                {error && <p className="text-center text-red-500 text-lg">{error}</p>}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {news.length === 0 && !loading && !error ? (
                        <p className="text-center text-gray-600 col-span-3">No hay noticias disponibles.</p>
                    ) : (
                        news.map((item, index) => (
                            <div
                                key={item.id}
                                className={`bg-white rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-[1.03] hover:shadow-2xl cursor-pointer flex flex-col 
                                    ${index % 7 === 0 || index % 7 === 3 || index % 7 === 4 ? "lg:col-span-2" : ""}
                                    ${index % 7 === 1 || index % 7 === 2 || index % 7 === 5 || index % 7 === 6 ? "sm:col-span-1" : ""}
                                `}
                                onClick={() => setselectedNew(item)}
                            >
                                {item.photo && (
                                    <img
                                        src={item.photo || "/path/to/default-image.jpg"}
                                        alt={item.title}
                                        className="w-full h-52 object-cover"
                                    />
                                )}
                                <div className="p-4 flex flex-col justify-between flex-grow">
                                    <h2 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h2>
                                    <p className="text-gray-700 text-sm line-clamp-3">{item.content}</p>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </main>
            <Footer />
            {selectedNew && (
                <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-start pt-10 z-[1000000] overflow-hidden" onClick={() => setselectedNew(null)}>
                    <div
                        className="bg-white p-6 rounded-lg max-w-4xl w-full max-h-[85vh] overflow-y-auto relative flex flex-col shadow-xl"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            className="absolute top-2 right-2 text-gray-500 text-3xl hover:text-gray-800"
                            onClick={() => setselectedNew(null)}
                        >
                            &times;
                        </button>
                        {selectedNew.photo && (
                            <img src={selectedNew.photo} alt={selectedNew.title} className="w-full h-80 object-cover mb-6 rounded-lg" />
                        )}
                        <h2 className="text-4xl font-bold mb-6">{selectedNew.title}</h2>
                        <p className="mb-6">{selectedNew.content}</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default New;