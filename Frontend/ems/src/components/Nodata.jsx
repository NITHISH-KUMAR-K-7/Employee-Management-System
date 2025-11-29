import { MdSearchOff } from "react-icons/md";
import { AiOutlineFileExclamation } from "react-icons/ai";



const NoData = () => {
  return (
    <div className="w-full h-[415px] flex flex-col justify-center items-center mt-[3%] text-gray-500 bg-blue-50/70">
      <AiOutlineFileExclamation size={60} className="mb-2 text-blue-600" />
      <p className="text-lg font-medium text-blue-600">
        No matching data found
      </p>
    </div>
  );
};

export default NoData;