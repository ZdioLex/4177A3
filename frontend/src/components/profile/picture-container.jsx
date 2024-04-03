import { ArrowUpTrayIcon, TrashIcon } from "@heroicons/react/24/outline";

export default function ProfilePicture() {
  return (
    <div className="flex items-center justify-around flex-col drop-shadow-xl w-2/3 md:w-5/12 p-4 border border-violet-300 rounded-lg bg-violet-200">
      <div className="w-32 h-32 bg-violet-950 drop-shadow-2xl rounded-full md:w-60 md:h-60 overflow-hidden">
        <img
          src="https://via.placeholder.com/300"
          alt="Profile picture of account owner."
          className="object-contain"
        />
      </div>
      <div className="flex items-center justify-center flex-col md:flex-row gap-4 md:mt-4 lg:gap-7">
        <button className="flex w-full items-center gap-2 justify-center rounded-lg border border-violet-500 p-2 bg-violet-900 text-white hover:bg-violet-500">
          <ArrowUpTrayIcon className="hidden lg:block w-7" />
          <span>Upload</span>
        </button>
        <button className="flex w-full items-center gap-2 justify-center rounded-lg border border-violet-500 p-2 bg-violet-900 text-white hover:bg-violet-500">
          <TrashIcon className="hidden lg:block w-7" />
          <span>Delete</span>
        </button>
      </div>
    </div>
  );
}
