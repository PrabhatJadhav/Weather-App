import axios from "axios";
import React, { useEffect, useRef, useState } from "react";

function Home() {
  const [name, setName] = useState("mumbai");
  const coord = useRef({ lat: "19.0759899", lon: "72.8773928" });
  const tempData = useRef([]);

  useEffect(() => {
    const getData = async () => {
      let initData = await axios.get(initUrl);
      let lat = initData.data[0].lat;
      let lon = initData.data[0].lon;
      coord.current = { lat, lon };

      let weatherData = await axios.get(mainUrl);
      let data = weatherData.data.list;
      //   console.log(data);

      tempData.current = data.map((data) => {
        let tempMax = data.main.temp_max;
        let tempMin = data.main.temp_min;

        let tempCelMax = parseInt(tempMax - 273.15, 10);
        let tempCelMin = parseInt(tempMin - 273.15, 10);

        data.main.temp_max = tempCelMax;
        data.main.temp_min = tempCelMin;
        return data;
      });
      console.log(tempData.current);
    };
    getData();
  }, []);

  const API_KEY1 = "18348c241fcdd66df3dc692a54f1eb49";

  const initUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${name}&limit=5&appid=${API_KEY1}`;

  const mainUrl = `http://api.openweathermap.org/data/2.5/forecast?lat=${coord.current.lat}&lon=${coord.current.lon}&appid=${API_KEY1}`;

  return <div>Home</div>;
}

export default Home;

// https://api.openweathermap.org/data/2.5/forecast?lat=19.0759899&lon=72.8773928&appid=18348c241fcdd66df3dc692a54f1eb49
