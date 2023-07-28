import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";
import Navbar from "./components/Navbar";


export default function Home() {
  const [locationInput, setlocationInput] = useState("");
  const [result, setResult] = useState();
  const [imageArray, setImageArray] = useState([]);
  const [placesArray, setPlacesArray] = useState([]);
  const [name, setName] = useState("");
  const [finalname,setfinalName] = useState("");

  const handleNameChange = (event) => {
             setName(event.target.value)
  };

  async function onSubmit(event) {
    event.preventDefault();
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ animal: locationInput }),
      });

      const data = await response.json();
      if (response.status !== 200) {
        throw data.error || new Error(`Request failed with status ${response.status}`);
      }

      if (data.result) {
        const temp = data.result.split(", ");
        setPlacesArray(temp);
        setResult(data.result);
      }
       setfinalName(name);
      setlocationInput("");
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  }

  return (
    <div>
      <Head>
        <title>Date Generator</title>
        <link rel="icon" href="/dog.png" />
      </Head>
      <Navbar />
      <main className={styles.main}>

        <img src="/hearts.jpg" className={styles.icon} />
        <h3>I would like to go on a date with </h3>
        <input type="text" value={name} onChange={handleNameChange} placeholder="Enter the name of your date"/>

        <h3>Where do I go for a date?</h3>

        <form onSubmit={onSubmit}>
          <input
            type="text"
            name="animal"
            placeholder="Enter a city to begin your date!"
            value={locationInput}
            onChange={(e) => setlocationInput(e.target.value)}
          />
          <input type="submit" value="Generate dates" />
        </form>

        <div className={styles.result}>{result}</div>

        {placesArray.length > 0 && finalname && (
          <div>
            <h4>With {finalname}, you can:</h4>

            <ul>
              {placesArray.map((place) => (
                <li key={place}>{place}</li>
              ))}
            </ul>
          </div>
        )}
      </main>
    </div>
  );
}
