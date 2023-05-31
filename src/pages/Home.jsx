import React, { useState } from "react";
import Projects from "./Projects";
import Clients from "./Clients";

function Home() {
  const [seletedPage, setSelectedPage] = useState(0);

  const page_options = [
    {
      component: <Projects setSelectedPage={setSelectedPage} />,
    },
    { component: <Clients setSelectedPage={setSelectedPage} /> },
  ];

  return <>{page_options[seletedPage].component}</>;
}

export default Home;
