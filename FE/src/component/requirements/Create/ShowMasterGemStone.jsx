import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";

function ShowMasterGemStone(props, dataFilterLastMasterGemstone, setMasterGemstoneObject, setIndex, gettingIndex) {
  const getBoxMasterGemStone = document.getElementById("MasterGemstoneContainerFloat");
  if (getBoxMasterGemStone) {
    const root = createRoot(getBoxMasterGemStone);
    root.render(
      <ViewDetailMasterGemStone
        initialGemstone={props}
        dataFilterLastMasterGemstone={dataFilterLastMasterGemstone}
        setMasterGemstoneObject={setMasterGemstoneObject}
        setIndex={setIndex}
        gettingIndex={gettingIndex}
      />
    );
  } else {
    console.error("Element with id 'MasterGemstoneContainerFloat' not found.");
  }
}

function ViewDetailMasterGemStone({ initialGemstone, dataFilterLastMasterGemstone, setMasterGemstoneObject, setIndex, gettingIndex }) {
  const [masterGemstone, setMasterGemstone] = useState({ ...initialGemstone });
  const [filteredData, setFilteredData] = useState(dataFilterLastMasterGemstone);
  useEffect(() => {
    setMasterGemstoneObject(masterGemstone);
  }, [masterGemstone]);
  return (
    <div className="relative h-full w-full right-0 overflow-hidden">
      <div className="flex justify-around p-3 border-b gap-1">
        <h4>Clarity: {masterGemstone.clarity}</h4>
        <h4>Cut: {masterGemstone.cut}</h4>
        <h4>Weight: {masterGemstone.weight}</h4>
      </div>
      <div className="absolute -translate-y-1/2 -translate-x-1/2 w-full left-1/2 top-1/2">
        <img
          src={masterGemstone.image}
          className="mx-auto w-[250px] h-[250px] object-center object-contain px-3 rounded-lg"
          alt={"image of " + masterGemstone.kind + ` ${masterGemstone.shape}`}
        />
        <h4 className="text-center text-[20px]">{masterGemstone.price} VND</h4>
      </div>
      <div className="absolute -bottom-2 w-full rounded-lg overflow-hidden" style={filteredData.length>1?{display:"block"}:{display:"none"}}>
        <h3 className="text-[20px] ml-2">Another choices:</h3>
        <ScrollBoxSelection
          setMasterGemstone={setMasterGemstone}
          dataFilterLastMasterGemstone={filteredData}
          setIndex={setIndex}
          gettingIndex={gettingIndex}
        />
      </div>
    </div>
  );
}
function ScrollBoxSelection({ setMasterGemstone, dataFilterLastMasterGemstone, setIndex, gettingIndex }) {
  return (
    <div className="overflow-x-auto">
      <div className="h-[75px] px-3 flex" style={{ width: `${dataFilterLastMasterGemstone.length * 25}%` }}>
        {dataFilterLastMasterGemstone.map((item, index) => (
          <div
            key={index}
            onClick={() => {
              setMasterGemstone(item);
              setIndex(index);
            }}
            className="w-1/4 cursor-pointer px-2 box-border"
          >
            <img
              src={item.image}
              alt={`${item.kind} ${item.shape}`}
              className={`w-full h-[75px] object-contain ${(index === gettingIndex ? "border border-l-green-950" : "")}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
}


export default ShowMasterGemStone;
