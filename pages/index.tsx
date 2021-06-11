import React from "react";

type MainContextProps = {
}

export const MainContext = React.createContext<MainContextProps>({} as MainContextProps);

export default function Home() {
  return (
    <div className="grid">
      <div>kbkh</div>
      <div>kbkh</div>
      <div>kbkh</div>
    </div>
  )
}
