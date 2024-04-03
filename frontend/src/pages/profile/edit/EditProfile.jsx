import { BASIC_INFO_KEYS, CONTACT_INFO_KEYS } from "../../../lib/constants";
import { CheckIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useForm } from "react-hook-form";
import FormSection from "../../../components/profile/form/formSection";
import { Link } from "react-router-dom";
import SideBar from "../../../components/SideBar";
import { useNavigate, useParams } from "react-router-dom";
import { setProfileDetails } from "../../../services/userServices";
import Title from "../../../components/DashboardTitle";

export default function ProfileEdit() {
  const { userId } = useParams();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = (data) => {
    console.log(data);
    setProfileDetails(userId, data).then((response) => {
      if (response.success) {
        navigate(`/${userId}/profile`);
      } else {
        // Handle error - maybe show a message or log it
        console.error("Failed to update profile details:", response.error);
      }
    });
  };

  return (
    <main className="flex flex-col h-full overflow-hidden">
      <Title />
      <SideBar page={"editProfile"} />
      <div className="flex flex-col h-full pb-16 px-64">
        <h1 className="flex items-center justify-center lg:justify-start mb-4 text-xl text-purp-1 md:text-3xl">
          My Profile - Edit
        </h1>
        <div className="flex h-full p-7 lg:p-14 bg-violet-200 border border-violet-300 drop-shadow-lg rounded-xl">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col w-full justify-around"
          >
            <div className="flex justify-around flex-col lg:flex-row w-full h-full">
              <FormSection
                register={register}
                keySet={BASIC_INFO_KEYS}
                errors={errors}
              />
              <FormSection
                register={register}
                keySet={CONTACT_INFO_KEYS}
                errors={errors}
              />
            </div>
            <div className="flex flex-col lg:self-center lg:w-10/12 justify-between border-violet-800">
              <div className="flex items-center">
                <label className="lg:basis-1/12 basis-1/3 h-full">
                  <p className="flex item-center"> Bio:</p>
                </label>
                <textarea
                  name="bio"
                  {...register("bio")}
                  className="rounded-md p-1 w-full h-36 bg-violet-50 outline-none border hover:outline-violet-400 focus:outline-violet-600 border-violet-400"
                />
              </div>
            </div>
            <div className="flex gap-2 pt-14 lg:gap-12 justify-center">
              <button
                className="flex min-w-36 self-center items-center gap-2 justify-center rounded-lg border border-violet-500 px-2 py-1 bg-violet-900 text-white hover:bg-violet-500"
                type="submit"
              >
                <CheckIcon className="w-7" />
                <span>Save</span>
              </button>
              <Link
                className="flex min-w-36 self-center items-center gap-2 justify-center rounded-lg border border-violet-500 px-2 py-1 bg-violet-900 text-white hover:bg-violet-500"
                to="/dashboard/profile"
              >
                <XMarkIcon className="w-7" />
                <span>Discard</span>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
