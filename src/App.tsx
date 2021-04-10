import { useEffect, useState } from 'react';

const App = () => {
  const [cardCoverColor, setCardCoverColor] = useState<string>('#000000');
  const [cardTextColor, setCardTextColor] = useState<string>('#000000');
  const [cardMessage, setCardMessage] = useState<string>('APRIL 🦉');
  const [copyButtonMessage, setCopyButtonMessage] = useState<string>('Copy');

  useEffect(() => {
    randomCardColor();
  }, [])

  const randomCardColor = () => {
    const randomColor = `#${Math.floor(Math.random()*16777215).toString(16)}`;
    setCardCoverColor(randomColor);
  }

  const changeTextColor = () => {
    if (cardTextColor === '#000000') setCardTextColor('#FFFFFF');
    else setCardTextColor('#000000');
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText('test');
    setCopyButtonMessage('Image copied!');
    setTimeout(() => setCopyButtonMessage('Copy'), 2000);
  }

  return (
    <div className="flex flex-col items-center">
      <div className="mt-12 text-gray-400 font-bold text-lg">Tover : Trello card cover generator</div>

      <div className="mt-20 w-64 lg:w-80 shadow-lg rounded-md mb-12">
        <div className="flex items-center justify-center h-20 rounded-tl-md rounded-tr-md" style={{ backgroundColor: cardCoverColor }}>
          <h1 className="text-4xl font-bold" style={{ color: cardTextColor }}>{ cardMessage }</h1>
        </div>
        <div className="p-2 pb-4 rounded-bl-md rounded-br-md">
          <h3>This is a card's title</h3>
        </div>
      </div>

      <div className="flex flex-col mb-4">
        <input
          className="p-2 w-48 rounded-md border-2 border-black text-black focus:outline-none mb-2"
          type="text"
          value={cardMessage}
          onChange={(event) => setCardMessage(event.target.value)}
        />

        <button
          className="p-2 w-48 rounded-md border-2 border-black text-sm text-black font-bold focus:outline-none mb-2"
          onClick={randomCardColor}
        >
          Background color
        </button>

        <button
          className="p-2 w-48 rounded-md border-2 border-black text-sm text-black font-bold focus:outline-none mb-8"
          onClick={changeTextColor}
        >
          Text color
        </button>

        <button
          className="p-2 w-48 rounded-md border-2 border-black text-black font-bold focus:outline-none"
          onClick={copyToClipboard}
        >
          {copyButtonMessage}
        </button>
      </div>
    </div>
  );
}

export default App;
