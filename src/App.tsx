import { useEffect, useState } from 'react';

import { toBlob } from 'html-to-image';

declare class ClipboardItem {
  constructor(data: { [mimeType: string]: Blob });
}

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

  const copyToClipboard = async () => {
    const trelloCoverNode: HTMLElement | null = document.getElementById('trello-cover');
    if (trelloCoverNode) {
      const rawImageData = await toBlob(trelloCoverNode);
      if (rawImageData) {
        const customNavigator = navigator.clipboard as any;
        customNavigator.write([new ClipboardItem({'image/png' : rawImageData})]);
      }
    }

    setCopyButtonMessage('Image copied!');
    setTimeout(() => setCopyButtonMessage('Copy'), 2000);
  }

  return (
    <div className="flex flex-col items-center">
      <div className="font-bold text-4xl mt-12 mb-1">Tover.</div>
      <div className="text-gray-400 font-bold text-lg">Trello card cover generator</div>

      <div className="mt-20 w-64 lg:w-80 shadow-lg rounded-md mb-12">
        <div id="trello-cover" className="flex items-center justify-center h-20 rounded-tl-md rounded-tr-md" style={{ backgroundColor: cardCoverColor }}>
          <h1 className="text-4xl font-bold" style={{ color: cardTextColor }}>{ cardMessage }</h1>
        </div>
        <div className="p-2 pb-4 rounded-bl-md rounded-br-md">
          <h3>This is a card's title</h3>
        </div>
      </div>

      <div className="flex flex-col mb-20">
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
          className="p-2 w-48 rounded-md border-2 border-black text-sm text-black font-bold focus:outline-none mb-2"
          onClick={copyToClipboard}
        >
          {copyButtonMessage}
        </button>
        <p className="flex justify-center text-sm text-gray-500">
          And paste it in a&nbsp;<span className="underline cursor-pointer" onClick={()=> window.open('https://trello.com', '_blank')}>Trello card</span>.
        </p>
      </div>

      <div className="">
        <p
          className="text-sm text-gray-500 cursor-pointer hover:underline"
          onClick={()=> window.open('https://github.com/parnpresso/tover', '_blank')}
        >
          github.com/parnpresso/tover
        </p>
      </div>
    </div>
  );
}

export default App;
