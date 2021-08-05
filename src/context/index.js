import React, { useContext } from "react";
import Gun from "gun";
import sea from "gun/sea";

const peers = ["https://gun-us.herokuapp.com/gun"];

// Create context
const GunContext = React.createContext({});

export const GunProvider = ({ children }) => {
  const gun = Gun({ peers });

  return <GunContext.Provider value={{ gun }}>{children}</GunContext.Provider>;
};

export const useGun = () => {
  const { gun } = useContext(GunContext);

  return {
    gun,
  };
};

// const AppProviders = ({ children }) => {
//   return (
//     <Router>
//       <GunProvider peers={peers} sea={sea} Gun={Gun} keyFieldName="todoKeys">
//           {children}
//       </GunProvider>
//     </Router>
//   );
// };
