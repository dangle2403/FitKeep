import { Spinner } from "../spinner";


const SignupSkeleton = () =>{
  return (
    <div className="flex items-center justify-center p-8">
      <div className="flex flex-col items-center space-y-4">
        <Spinner size={48} color="#FF6A00" />
        <div className="text-center">
          <p className="text-lg font-medium text-gray-700">Creating your account...</p>
          <p className="text-sm text-gray-500 mt-1">Please wait a moment</p>
        </div>
      </div>
    </div>
  );
};

export default SignupSkeleton;
