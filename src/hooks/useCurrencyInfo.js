import { useEffect, useState } from "react";

export default function useCurrencyInfo(currency) {
    const [currencyData, setCurrencyData] = useState({});

    let url = `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${currency}.json`

    useEffect(()=> {
        fetch(url)
        .then((res)=> res.json())
        .then((data)=> setCurrencyData(data[currency]));
    }, [currency])
    
    return currencyData;
}