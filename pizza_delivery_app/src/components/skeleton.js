

const PizzaSkeleton = ({ count = 10 }) => {
  return (
    <div className="flex flex-wrap gap-6 items-center justify-center">
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="w-72 p-4 bg-white rounded-lg shadow animate-pulse border"
        >
          <div className="h-6 w-11/12 bg-gray-300 rounded mb-4 mx-auto"></div>
          <div className="h-36 w-36 bg-gray-300 rounded-full mx-auto mb-4"></div>
          <div className="h-4 w-11/12 bg-gray-300 rounded mb-2 mx-auto"></div>
          <div className="h-4 w-11/12 bg-gray-300 rounded mb-4 mx-auto"></div>

          <div className="space-y-2 mb-4">
            <div className="h-4 w-11/12 bg-gray-300 rounded mx-auto"></div>
            <div className="h-4 w-11/12 bg-gray-300 rounded mx-auto"></div>
            <div className="h-4 w-11/12 bg-gray-300 rounded mx-auto"></div>
            <div className="h-4 w-11/12 bg-gray-300 rounded mx-auto"></div>
          </div>

          <div className="h-8 w-24 bg-gray-300 rounded mx-auto"></div>
        </div>
      ))}
    </div>
  );
};

export default PizzaSkeleton;
