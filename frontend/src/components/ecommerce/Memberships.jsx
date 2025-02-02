import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "../../context/UserContext";
import axios from "axios";
import config from "../../utils/config.json";
import RegisterAlert from "../RegisterAlert";

const Memberships = () => {
  const [memberships, setMemberships] = useState([]);
  const [error, setError] = useState(null);
  const [userMembership, setUserMembership] = useState(null);
  const { user } = useContext(UserContext);
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    fetch(`${config.apiUrl}/api/memberships`)
      .then((respuesta) => {
        if (!respuesta.ok) {
          throw new Error("Error al obtener las membresías");
        }
        return respuesta.json();
      })
      .then((dataMemberships) => {
        setMemberships(dataMemberships.data);
      })
      .catch((err) => {
        setError(err.message);
      });

    if (user && user.userType === "client") {
      fetch(`${config.apiUrl}/api/clients/${user.email}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
        .then((respuesta) => {
          if (!respuesta.ok) {
            throw new Error("Error al obtener el cliente");
          }
          return respuesta.json();
        })
        .then((data) => {
          setUserMembership(data.data.membershipId);
        })
        .catch((err) => {
          setError(err.message);
        });
    } else if (user) {
      setError("Solo los clientes pueden acceder a una membresía.");
    }
  }, [user]);

  const handleRestrictedClick = (membership) => {
    if (!user) {
      setShowAlert(true);
    } else {
      handleMembershipAction(membership);
    }
  };

  const handleMembershipAction = async (membership) => {
    if (userMembership === membership.id) {
      try {
        const response = await axios.post(
          `${config.apiUrl}/api/memberships/revoke`,
          {
            userId: user.id,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        console.log("Respuesta de revocar membresía:", response.data);
        setUserMembership(null);
      } catch (error) {
        console.error("Error al revocar la membresía:", error);
        setError("Error al revocar la membresía");
      }
    } else {
      try {
        localStorage.setItem("membershipId", membership.id);

        const response = await axios.post(
          `${config.apiUrl}/api/mercadopago/create-order`,
          {
            email: user.email,
            name: user.name,
            items: [
              {
                product: {
                  id: membership.id,
                  name: membership.name,
                  description: membership.description || "none",
                  price: parseFloat(membership.price),
                  categoryId: "none",
                  image: "none",
                  file: "none",
                  timesSold: 0,
                },
                priceAtPurchase: parseFloat(membership.price),
                quantity: 1,
              },
            ],
          }
        );

        const result = response.data;
        console.log("Respuesta de MercadoPago:", result);

        if (result.url) {
          window.location.href = result.url;
        }
      } catch (error) {
        console.error("Error al crear la sesión de MercadoPago:", error);
        setError("Error al iniciar el proceso de pago");
      }
    }
  };

  if (error) {
    return <div className="text-center text-red-500">Error: {error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-center text-4xl font-bold text-gray-800 mb-8">
        Membresías
      </h1>

      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {memberships.map((membership) => (
          <li
            key={membership.id}
            className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow duration-300"
          >
            <h2 className="text-2xl font-semibold text-gray-700 mb-2">
              {membership.name}
            </h2>
            <p className="text-gray-600 mb-4">{membership.description}</p>
            <p className="text-lg font-bold text-gray-900 mb-4">
              ${membership.price}
            </p>
            <button
              onClick={() => handleRestrictedClick(membership)}
              className="bg-colors-1 text-white px-4 py-2 rounded hover:bg-colors-1 transition-colors duration-200"
            >
              {userMembership === membership.id
                ? "Revocar"
                : userMembership
                ? "Actualizar"
                : "Adquirir"}
            </button>
          </li>
        ))}
      </ul>
      {showAlert && (
        <RegisterAlert open={showAlert} onClose={() => setShowAlert(false)} />
      )}
    </div>
  );
};

export default Memberships;
