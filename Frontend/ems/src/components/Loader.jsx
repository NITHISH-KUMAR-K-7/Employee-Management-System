
import { ImSpinner2 } from "react-icons/im";


const Loader = () => {
  return (
    <div className="w-full h-[415px] flex justify-center items-center mt-[3%] text-gray-500 bg-blue-50/70">
      <ImSpinner2 className="animate-spin mb-2 text-blue-600" size={60} />
      <p className="text-2xl text-blue-900 font-semibold">Loading...</p>
    </div>
  );
};

export default Loader;
