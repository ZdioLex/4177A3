import TextInput from "./inputField";

export default function FormSection({ keySet, register, errors }) {
  return (
    <div className="flex flex-col justify-between border-violet-800 lg:w-5/12 h-full">
      <h2 className="py-2 pr-2 text-xl">Basic Information</h2>
      <div className="flex flex-col py-2 gap-7 justify-evenly border-t border-violet-800 h-full w-full">
        {/* generates form fields */}
        {keySet.map((key) => {
          return (
            <TextInput
              key={key}
              currentKey={key}
              register={register}
              errors={errors}
            />
          );
        })}
      </div>
    </div>
  );
}
