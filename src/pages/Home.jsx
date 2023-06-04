import React, { useState } from "react";
import Projects from "./Projects";
import Clients from "./Clients";
import Users from "./Users";

function Home() {
  const [seletedPage, setSelectedPage] = useState(0);

  const page_options = [
    {
      component: <Projects setSelectedPage={setSelectedPage} />,
    },
    { component: <Clients setSelectedPage={setSelectedPage} /> },
    { component: <Users setSelectedPage={setSelectedPage} /> },
  ];

  return <>{page_options[seletedPage].component}</>;
}

export default Home;
