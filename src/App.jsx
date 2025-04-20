import { InputBox } from './components';
import useCurrencyInfo from './hooks/useCurrencyInfo';
import { useState } from 'react';

function App() {
  const [amount, setAmount] = useState('');
  const [from, setFrom] = useState('usd');
  const [to, setTo] = useState('pkr');
  const [convertedAmount, setConvertedAmount] = useState(0);
  const currencyInfo = useCurrencyInfo(from);

  const options = Object.keys(currencyInfo);

  const swap = () => {
    setFrom(to);
    setTo(from);
    setConvertedAmount(amount);
    setAmount(convertedAmount);
  };

  const convert = () => {
    setConvertedAmount(amount * currencyInfo[to]);
  };

  return (
    <div
      className="w-full h-screen flex flex-col justify-center items-center bg-cover bg-no-repeat"
      style={{
        backgroundImage: `url('https://images.pexels.com/photos/6694543/pexels-photo-6694543.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')`,
      }}
    >
      <div className="w-full max-w-md mx-auto bg-white bg-opacity-70 shadow-xl rounded-lg p-6 backdrop-blur-md">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            convert();
          }}
        >
          <div className="mb-4">
            <InputBox
              label="From"
              amount={amount}
              currencyOptions={options}
              onCurrencyChange={(currency) => setFrom(currency)}
              onAmountChange={(amount) => setAmount(amount)}
              selectCurrency={from}
            />
          </div>
          <div className="relative w-full text-center my-4">
            <button
              type="button"
              className="inline-flex items-center justify-center w-10 h-10 bg-blue-500 text-white rounded-full shadow-lg transform transition-transform hover:rotate-180"
              onClick={swap}
            >
              ⇅
            </button>
          </div>
          <div className="mb-6">
            <InputBox
              label="To"
              amount={convertedAmount}
              currencyOptions={options}
              onCurrencyChange={(currency) => setTo(currency)}
              selectCurrency={to}
              amountDisable
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            {`${from.toUpperCase()} to ${to.toUpperCase()}`} 
            
          </button>
        </form>
      </div>
    </div>
  );
}
// Another method for the convert button is :
// Convert {from.toUpperCase()} to {to.toUppercase}
export default App;
