import React, {useState, useEffect} from "react";
import styles from "./States.module.css";

export default function States () {
    const [country, setCountry] = useState([]);
    const [state, setState] = useState([]);
    const [city, setCity] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState("");
    const [selectedState, setSelectedState] = useState("");
    const [selectedCity, setSelectedCity] = useState("");

    useEffect(() => {
        fetch("https://crio-location-selector.onrender.com/countries")
        .then((response) => response.json())
        .then((data) => setCountry(data))
        .catch((error) => {
            console.log("Error in fetching country: ", error);
        })
    }, []);

    useEffect(() => {
        if(selectedCountry){
            fetch(`https://crio-location-selector.onrender.com/country=${selectedCountry}/states`)
            .then((response)=> response.json())
            .then((data)=> {
                setState(data);
                setCity([]);
                setSelectedCity("");
                setSelectedState("");
            })

            .catch((error)=>{
                console.log("Error in fetching state: ", error);
            })  
        }
    }, [selectedCountry]);

    useEffect(()=>{
        if(selectedCountry && selectedState){
            fetch(`https://crio-location-selector.onrender.com/country=${selectedCountry}/state=${selectedState}/cities`)
            .then((response)=>response.json())
            .then((data)=>{
                setCity(data);
                setSelectedCity("");
                })
            .catch((error)=>{
                console.log("Error in fetching cities: ", error);
            })
        }
        
    }, [selectedCountry, selectedState]);


    const handleCountryChange = (event) => {
        setSelectedCountry(event.target.value);
    }
    const handleStateChange = (event) => {
        setSelectedState(event.target.value);
    }

    const handleCityChange = (event) => {
        setSelectedCity(event.target.value);
    }
    
    return (
        <div className={styles.container}>
            <h1>Select Location</h1>
            <div className={styles.location}>
                    <select className={styles.dropdown} value={selectedCountry} onChange={handleCountryChange}>
                        <option value="" disabled>Select Country</option>
                        {country.map((country)=>
                        <option key={country} value={country}>{country}</option> )}
                    </select>

                    <select className={styles.dropdown} value={selectedState} onChange={handleStateChange}>
                        <option value="" disabled>Select State</option>
                        {state.map((state)=>
                        <option key={state} value={state}>{state}</option> )}
                    </select>

                    <select className={styles.dropdown} value={selectedCity} onChange={handleCityChange}>
                        <option value="" disabled>Select City</option>
                        {city.map((city)=>
                            <option key={city} value={city}>{city}</option> )}
                    </select>
            </div>
            {selectedCity && (
                <h2 className={styles.result}>
                    You selected <span className={styles.highlight}>{selectedCity},</span>
                    <span className={styles.fade}>{" "}{selectedState}, {selectedCountry}</span>
                </h2>
            )}

        </div>
    )
}
