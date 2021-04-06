import { useEffect, useState } from 'react';

const App = () => {
  const [cardCoverColor, setCardCoverColor] = useState<string>('#000000');
  const [cardMessage, setCardMessage] = useState<string>('APRIL 🦉');

  useEffect(() => {
    randomCardColor();
  }, [])

  const randomCardColor = () => {
    const randomColor = `#${Math.floor(Math.random()*16777215).toString(16)}`;
    setCardCoverColor(randomColor);
  }

  const downloadCover = () => {
    console.log('Download')
  }

  return (
    <div className="flex flex-col items-center">
      <div className="mt-12 text-gray-400 font-bold text-lg">Tover : Trello card cover generator</div>

      <div className="mt-20 w-64 shadow-lg rounded-md mb-8">
        <div className="flex items-center justify-center h-20 rounded-tl-md rounded-tr-md" style={{ backgroundColor: cardCoverColor }}>
          <h1 className="text-4xl font-bold">{ cardMessage }</h1>
        </div>
        <div className="p-2 pb-4 rounded-bl-md rounded-br-md">
          <h3>Trello card mockup</h3>
        </div>
      </div>

      <div className="flex items-start justify-start">
        <input
          className="shadow-md rounded-md p-2 bg-gray-50 focus:outline-none mr-2"
          type="text"
          value={cardMessage}
          onChange={(event) => setCardMessage(event.target.value)}
        />
        <button className="p-2 rounded-md shadow-md bg-gray-50 focus:outline-none mr-2" onClick={randomCardColor}>🔄</button>
        <button className="p-2 rounded-md shadow-md bg-gray-50 focus:outline-none" onClick={downloadCover}>⬇️</button>
      </div>
    </div>
  );
}

export default App;
