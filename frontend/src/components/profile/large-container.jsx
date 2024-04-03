import { ACC_INFO_KEYS, PROFILE_LABELS } from "../../lib/constants";
import PROFILE_INFO from "../../lib/info.json";

export default function LargeContainer({ profileDetails }) {
  return (
    <div className="flex flex-col md:flex-row justify-evenly basis-full p-4 min-h-52 rounded-lg bg-violet-200">
      <div className="flex basis-1/3 flex-col justify-between border-violet-800 md:w-1/3 h-full">
        <h2 className="py-2 pr-2 text-xl">Bio</h2>
        <div className="border-t pt-2 border-violet-800 h-full w-full">
          <p>{profileDetails.bio}</p>
        </div>
      </div>
      <div className="flex basis-1/3 flex-col justify-between border-violet-800 md:w-1/3 h-full">
        <h2 className="py-2 pr-2 text-xl">Account Information</h2>
        <div className="flex flex-col py-2 gap-7 justify-evenly border-t border-violet-800 h-full w-full">
          {ACC_INFO_KEYS.map((key) => {
            return (
              <div key={key} className="flex">
                <p className="basis-5/12">{PROFILE_LABELS[key]}:</p>
                <p>{profileDetails[key]}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
