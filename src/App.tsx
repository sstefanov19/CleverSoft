import { useState } from 'react';


function App() {
    const [number, setNumber] = useState<number | null>(null);
    const [tries, setTries] = useState<number>(3);
    const [message, setMessage] = useState<string | null>(null);
    const [latestGuess , setLatestGuess] = useState<number | null>(null);

    const handleGuess =  async () => {
        if (tries <= 0) return;

    try {
        const response = await fetch('http://localhost:3000/guess', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ number, tries }),
        });

        if(number){
            if (number < 1 || number > 50) {
                setMessage('Please enter a number between 1 and 50.');
                return;
            }
        }


        const data = await response.json();
        setMessage(data.message);
        setLatestGuess(number);

        if (data.success) {
            return;
        }

        setTries(tries - 1);
    } catch (error) {
        console.error('Error making guess:', error);
        setMessage('Something went wrong. Please try again.');
    }
    };

    const resetGame = () => {
        setTries(3);
        setNumber(0);
        setMessage(null);
        setLatestGuess(null);
    };

    return (
        <div className="h-screen w-screen bg-slate-600 flex justify-center items-center">
            <div className="h-1/2 w-2/4 flex flex-col rounded-lg bg-slate-800 justify-center items-center">
                <h1 className="text-3xl text-white font-bold mb-4">Number Guessing Game(guess from 1-50)</h1>
                {message && <p className="mb-4 text-xl text-white font-semibold">{message}</p>}
                {latestGuess !== null && <p className="mb-4 text-xl text-white font-semibold">Latest guess: {latestGuess}</p>}
                <input
                    type="number"
                    value={number !== null ? number : ''}
                    onChange={(e) => setNumber(Number(e.target.value))}
                    placeholder="Enter a number between 1 and 50"
                    className="mb-4 p-2 border border-gray-300 rounded"
                />
                <div className='flex justify-between gap-4 my-4'>

                <button
                    onClick={handleGuess}
                    disabled={tries <= 0}
                    className={`p-2 text-white w-[150px] rounded-full ${tries > 0 ? 'bg-slate-500' : 'bg-gray-400 cursor-not-allowed'}`}
                    >
                    Submit Guess
                </button>

                    <button
                        className="p-2 rounded-full w-[150px] bg-slate-500 text-white "
                        onClick={resetGame}
                        >
                        Reset Game
                    </button>
                        </div>
            </div>
        </div>
    );
}

export default App;
