import {
  BASIC_INFO_KEYS,
  CONTACT_INFO_KEYS,
  PROFILE_LABELS,
} from "../../lib/constants";

export default function MediumContainer({ profileDetails }) {
  return (
    <div className="flex overflow-scroll flex-col md:flex-row justify-evenly w-full min-h-52 p-4 h-full lg:basis-full rounded-lg bg-violet-200">
      <div className="flex flex-col justify-between border-violet-800 md:w-1/3 h-full">
        <h2 className="py-2 pr-2 text-xl">Basic Information</h2>
        <div className="flex flex-col py-2 gap-7 justify-evenly border-t border-violet-800 h-full w-full">
          {BASIC_INFO_KEYS.map((key) => {
            return (
              <div key={key} className="flex">
                <p className="basis-5/12">{PROFILE_LABELS[key]}:</p>
                <p className="">{profileDetails[key]}</p>
              </div>
            );
          })}
        </div>
      </div>
      <div className="flex flex-col justify-between border-violet-800 md:w-1/3 h-full">
        <h2 className="py-2 pr-2 text-xl">Contact Information</h2>
        <div className="flex flex-col py-2 gap-7 justify-evenly border-t border-violet-800 h-full w-full">
          {CONTACT_INFO_KEYS.map((key) => {
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
