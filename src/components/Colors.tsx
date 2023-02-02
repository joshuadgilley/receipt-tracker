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

export default function Colors() {

  const [colors, setColors] = useState<ColorListProps>({data: []});
  useEffect(() => {
    (async function () {
        const res = await axios.get<ColorListProps, ColorListProps>(process.env.REACT_APP_API_GET_COLORS);
        setColors(res);
    })();
  }, []);

  return (
    <section className="bg-white dark:bg-gray-900 grid h-screen place-items-center">
      <div>
        <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">Colors!</h1>
        <p className="mb-6 text-lg font-normal text-gray-500 dark:text-gray-400">Please select your favorite color.</p>
        <Dropdown colors={colors}/>
      </div>
    </section>
  );
}
