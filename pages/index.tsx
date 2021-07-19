import React from "react";
import {Panel} from "../components/Panel";
import {Main} from "./main";

type MainContextProps = {
    name: string
}

export const MainContext = React.createContext<MainContextProps>({} as MainContextProps);

export default function Home() {
  return (
          <div className="grid">
              <Panel/>
              <Main/>
          </div>
  )
}
