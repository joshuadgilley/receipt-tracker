import { useState, useEffect } from "react";
import axios, { AxiosResponse } from 'axios';
import Dropdown from "./Dropdown";

declare var process: {
  env: {
    REACT_APP_API_GET_COLORS: string;
  };
};

interface ColorListProps {
      data: Color[]
}

interface Color {
  ColorID: number;
  Color: string;
  Hex: string;
}

export default function Colors({sha}: {sha: string}) {
  const [colors, setColors] = useState<ColorListProps>({data: []});
  const [background, setBackground] = useState<string>("#eeeeee");

  const changeBackground = (bg: string) => {
    setBackground(bg)
  }
  useEffect(() => {
    (async function () {
        const res = await axios.get<ColorListProps, ColorListProps>(process.env.REACT_APP_API_GET_COLORS);
        setColors(res);
    })();
  }, []);

  return (
    <section className="bg-white dark:bg-gray-900 grid h-screen place-items-center" style={{backgroundColor: `${background}95`}}>
      <div style={{backgroundColor: "#eeeeee", border: "2px solid black", padding: "4rem", borderRadius: "0.25rem"}}>
        <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">Colors!</h1>
        <p className="mb-6 text-lg font-normal text-gray-500 dark:text-gray-400">Please select your favorite color.</p>
        <Dropdown colors={colors} sha={sha} changeBackground={changeBackground}/>
      </div>
    </section>
  );
}
