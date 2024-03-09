import { useAuth0 } from "@auth0/auth0-react";
import React, { useState, useEffect } from "react";
import { PageLayout } from "../components/page-layout";
import { PageLoader } from "../components/page-loader";

export const ProfilePage = () => {
  const { user } = useAuth0();
  const [serialDataInput, setSerialDataInput] = useState("");
  const [serialData, setSerialData] = useState("")
  const [loading, setLoading] = useState(false);

  const deviceActivationUrl = process.env.REACT_APP_ACTIVATE_DEVICE_URL;

  useEffect(() => {
    // Define the function to make the API call
    const fetchData = async () => {
      try {
        const res = await fetch(deviceActivationUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ "email": user.email }),
        });
        if (!res.ok) {
          throw new Error('Failed to fetch data');
        }
        const result = await res.json();
        setSerialData(result.serial);
      } catch (error) {
        console.error('Error:', error.message);
      }
    };

    fetchData();
  }, []);

  const handleInputChange = (event) => {
    setSerialDataInput(() => event.target.value);
  };

  if (!user) {
    return null;
  }

  const activateDevice = async () => {
    setLoading(true);
    const res = await fetch(deviceActivationUrl, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ "serial": serialDataInput, "email": user.email }),
    });
    setLoading(false);
    if (res.ok) {
      setSerialData(serialDataInput);
    } else {
      throw new Error('Failed to Activate');
    }
  };

  const deactivateDevice = async () => {
    setLoading(true);
    const res = await fetch(deviceActivationUrl, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ "email": user.email }),
    });
    setLoading(false);
    if (res.ok) {
      setSerialData("");
      setSerialDataInput("");
    } else {
      throw new Error('Failed to Deactivate');
    }
  }

  return (
    <div>
      <PageLayout />
      <div className="content-layout">
        {loading && (<div className="loader-container">
          <PageLoader />
        </div>)}
        <div className="content__body">
          <div className="profile-grid">
            <h1 id="page-title" className="content__title">
              Profile Page
            </h1>
            <div className="profile__header">
              <img
                src={user.picture}
                alt="Profile"
                className="profile__avatar"
              />
              <div className="profile__headline">
                <h2 className="profile__title">{user.name}</h2>
                <span className="profile__description">Device: {serialData || "Not Found"}</span>
              </div>
            </div>
            {!serialData ? (
              <div>
                <input
                  className="input__activate"
                  type="text"
                  placeholder="Serial Number"
                  value={serialDataInput}
                  onChange={handleInputChange}
                />
                <button className="button__activate" onClick={() => activateDevice()}>
                  Activate Device
                </button>
              </div>
            ) : (
              <button className="button__deactivate" onClick={() => deactivateDevice()}>
                Deactivate Device
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
