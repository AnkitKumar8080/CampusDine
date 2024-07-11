import React, { useState } from "react";
import context from "./context";
export default function ContextProvider({ children }) {
  const [selectedOrderItem, setSelectedOrderItem] = useState({});

  const providerValues = {
    selectedOrderItem,
    setSelectedOrderItem,
  };
  return <context.Provider value={providerValues}>{children}</context.Provider>;
}
