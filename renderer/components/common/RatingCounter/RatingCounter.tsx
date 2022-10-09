import React from "react";

const RatingCounter: React.FC<{ rating: number }> = ({ rating }) => {
  return (
    <div className="flex flex-row gap-4 rounded-full bg-gray-900/90 p-1 w-fit items-center">
      <div className="flex flex-col w-14 h-14 p-1 items-center rounded-full justify-center border-2 border-gray-600">
        <div className="flex flex-row gap-[2px] items-start justify-center">
          <span className="text-xl tracking-tighter text-teal-300">
            {Math.round(rating * 10)}
          </span>
          <span className="text-xs mt-1 tracking-tighter text-gray-200">%</span>
        </div>
      </div>
      <div className="pr-7 tracking-tighter text-md text-gray-200">
        Rating
      </div>
    </div>
  );
};

export default RatingCounter;
