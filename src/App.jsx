import { useState } from "react";
import useCurrencyInfo from "./hooks/useCurrencyInfo";
import {InputBox} from "./components/index";

const BackgroundImage = 'https://img.freepik.com/free-vector/digital-rupee-concept-technology-background_1017-36657.jpg?w=1060&t=st=1696852096~exp=1696852696~hmac=8682ead0b9163031c5890d0fdbe24cf2061d8749e22012fdf9907ad8a95dcdd6'

export default function App() {
  const [From, setFrom] = useState('usd');
  const [To, setTo] = useState('inr');
  const [amount, setAmount] = useState(1);
  const [convertedAmount, setConvertedAmount] = useState(0);

  const currencyData = useCurrencyInfo(From);
  const options = Object.keys(currencyData);

  const swap = ()=> {
    setFrom(To);
    setTo(From);
    setAmount(convertedAmount);
    setConvertedAmount(amount);
  }
  
  return (
    <div
        className="w-full h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat"
        style={{
            backgroundImage: `url('${BackgroundImage}')`,
        }}
    >
        <div className="w-full">
            <div className="w-full max-w-md mx-auto border border-gray-60 rounded-lg p-5 backdrop-blur-sm bg-white/30">
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        setConvertedAmount(amount * currencyData[To]);
                    }}
                >
                    <div className="w-full mb-1">
                        <InputBox
                            label="From"
                            selectCurrency={From}
                            currencyOptions={options}
                            amount={amount}
                            onCurrencyChange={(currency)=> setFrom(currency)}
                            onAmountChange={(amount)=> setAmount(amount)}
                        />
                    </div>
                    <div className="relative w-full h-0.5">
                        <button
                            type="button"
                            className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-md bg-blue-600 text-white px-2 py-0.5"
                            onClick={swap}
                        >
                            swap
                        </button>
                    </div>
                    <div className="w-full mt-1 mb-4">
                        <InputBox
                            label="To"
                            selectCurrency={To}
                            currencyOptions={options}
                            amount={convertedAmount}
                            onCurrencyChange={(currency)=> setTo(currency)}
                            amountDisabled
                        />
                    </div>
                    <button type="submit" className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg">
                        Convert {From.toUpperCase()} To {To.toUpperCase()}
                    </button>
                </form>
            </div>
        </div>
    </div>
);
}