import { PROFILE_LABELS } from "../../../lib/constants";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { profileEditValidation } from "../../../lib/utils";

export default function TextInput({ currentKey, register, errors }) {
  const name = PROFILE_LABELS[currentKey];
  const validationRules = profileEditValidation(name);
  return (
    <div key={currentKey} className="flex flex-col justify-center">
      <div className="flex items-center">
        <label className="basis-1/3">
          <p className="flex item-center"> {name}:</p>
        </label>
        <input
          name={name}
          className="rounded-md p-1 w-full bg-violet-50 outline-none border hover:outline-violet-400 focus:outline-violet-600 border-violet-400"
          {...register(PROFILE_LABELS[currentKey], validationRules)}
        />
      </div>
      <div className="flex mt-2 items-center">
        {errors[name] && (
          <>
            <div className="basis-1/4"></div>
            <ExclamationTriangleIcon className="stroke-red-500 w-7 pr-1" />
            <p className="text-sm font-bold text-red-500">
              {errors[name].message}
            </p>
          </>
        )}
      </div>
    </div>
  );
}
