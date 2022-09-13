import React, { useEffect, useState } from "react";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";

export default function CatalogueRow(props) {
  const [rowItems, setRowItems] = useState([]);

  useEffect(() => {
    async function getItems() {
      let response = await fetch(props.fetchURL);
      response = await response.json();
      setRowItems(response.results);
    }
    getItems();
    // eslint-disable-next-line
  }, []);

  const slideLeft = () => {
    let slider = document.getElementById(props.rowId);
    slider.scrollLeft = slider.scrollLeft - 500;
  };
  const slideRight = () => {
    let slider = document.getElementById(props.rowId);
    slider.scrollLeft = slider.scrollLeft + 500;
  };

  return (
    <div>
      <div className="text-white py-5 px-2 tablet:px-6 laptop:px-10 tablet:text-lg laptop:text-xl font-[500]">
        {props.title}
      </div>
      <div className="relative flex items-center group">
        <BsChevronLeft
          size={40}
          className="bg-white left-0 rounded-full p-2 absolute opacity-40 hover:animate-pulse hover:opacity-100 cursor-pointer z-10 hidden group-hover:block"
          onClick={slideLeft}
        />
        <div
          id={props.rowId}
          className="w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide relative"
        >
          {rowItems.map((item, index) => {
            return (
              <div
                key={index}
                className="w-[160px] tablet:w-[200px] laptop:w-[240px] desktop:w-[280px] inline-block cursor-pointer p-2 relative"
                onClick={() => {
                  props.onWatch({
                    id: item.id,
                    media_type: props.watchType,
                  });
                }}
              >
                <img
                  className="w-full h-auto block"
                  src={`https://image.tmdb.org/t/p/w300/${item.backdrop_path}`}
                  alt={item.title || item.name}
                />
                <div className="absolute top-0 left-0 p-4 w-full h-full hover:bg-black/80 opacity-0 text-white hover:opacity-100">
                  <p className="whitespace-normal text-xs tablet:text-sm flex justify-center items-center font-[500] h-full text-center">
                    {item.title || item.name}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
        <BsChevronRight
          size={40}
          className="bg-white right-0 rounded-full p-2 absolute opacity-40 hover:animate-pulse hover:opacity-100 cursor-pointer z-10 hidden group-hover:block"
          onClick={slideRight}
        />
      </div>
    </div>
  );
}
