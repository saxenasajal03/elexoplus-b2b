import React, { createContext, useContext, useState, useEffect } from 'react';

const B2BAuthContext = createContext();

export const B2BAuthProvider = ({ children }) => {
  const [vendor, setVendor] = useState(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('b2b_vendor');
    if (saved) {
      try {
        setVendor(JSON.parse(saved));
      } catch (e) {
        localStorage.removeItem('b2b_vendor');
      }
    }
    setReady(true);
  }, []);

  const login = (vendorData) => {
    localStorage.setItem('b2b_vendor', JSON.stringify(vendorData));
    setVendor(vendorData);
  };

  const logout = () => {
    localStorage.removeItem('b2b_vendor');
    setVendor(null);
  };

  return (
    <B2BAuthContext.Provider
      value={{
        vendor,
        dealer: vendor, // Aliased for components that use either terminology
        token: vendor?.token || vendor?.auth_token || '',
        login,
        logout,
        ready,
        isAuthenticated: !!vendor
      }}
    >
      {children}
    </B2BAuthContext.Provider>
  );
};

export const useB2BAuth = () => useContext(B2BAuthContext);
