import Header from "../Header/header";
import Head from "next/head";
import { useCallback, useState } from "react";

interface Props {}

const Layout: React.FC<Props> = ({ children }) => {
  const [theme, setTheme] = useState("theme-dark");
  const toggleTheme = useCallback(
    () =>
      setTheme((prev: string) =>
        prev === "theme-dark" ? "theme-light" : "theme-dark"
      ),
    []
  );

  return (
    <div>
      <Head>
        <title>TMDB Test APP</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link
          href="https://fonts.googleapis.com/css2?family=Balsamiq+Sans:wght@400;700&display=swap"
          rel="stylesheet"
        ></link>
      </Head>
      <main id="app-root" className={theme}>
        <div className="background">
          <Header toggleTheme={toggleTheme}></Header>
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;
