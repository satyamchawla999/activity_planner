import axios from "axios";
import { notification } from "antd";
import userIconPhoto from "../../assets/images/userIcon.png";
import { useSelector } from "react-redux";

const CreateForm = ({ handleOk, page }) => {
  const uid = useSelector((state) => state.auth.uid);
  console.log(uid);
  const [api, contextHolder] = notification.useNotification();

  const openNotificationWithIcon = (type, message) => {
    api[type]({
      message: message,
    });
  };

  const addPet = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    let photoFile = null;
    if (e.target.pet_image.value) {
      photoFile = formData.get("pet_image");
    }

    if (photoFile) {
      try {
        formData.set("uid", uid);
        const endpoint = (
          page !== "adoption"
            ? "http://localhost:3001/pets/add-pet"
            : "http://localhost:3001/adoptions/add-adoption");

        console.log(endpoint)
        const response = await axios.post(endpoint, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        if (response.status === 200) {
          handleOk();
          e.target.reset();
          const userIcon = document.getElementById("user-circle-icon");
          userIcon.src = userIconPhoto;
          if (page === "adoption") {
            openNotificationWithIcon("success", "Adoption added successfully");
          } else {
            openNotificationWithIcon("success", "Pet added successfully");
          }
        }
      } catch (error) {
        if (page === "adoption") {
          openNotificationWithIcon("error", "Error in adding adoption");
        } else {
          openNotificationWithIcon("error", "Error in adding pet");
        }
      }
    } else {
      openNotificationWithIcon("error", "Please select a image file to upload");
    }
  };

  return (
    <div>
      {contextHolder}
      <form
        method="POST"
        className="mx-auto mt-0 max-w-xl sm:mt-5"
        encType="multipart/form-data"
        onSubmit={addPet}
      >
        <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "150px",
            }}
          >
            <div>
              <label
                htmlFor="photo"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Photo
              </label>
              <div className="mt-2 flex items-center gap-x-3">
                <img
                  id="user-circle-icon"
                  className="h-12 w-12 rounded-full ring-1 ring-inset ring-gray-400"
                  src={userIconPhoto}
                  alt="User Photo Preview"
                />

                <input
                  type="file"
                  accept="image/*"
                  name="pet_image"
                  id="photo"
                  className="hidden"
                  onChange={(e) => {
                    // Handle file selection and preview here
                    const selectedFile = e.target.files[0];
                    if (selectedFile) {
                      const reader = new FileReader();
                      reader.onload = (event) => {
                        // Set the preview image here
                        const previewImage = event.target.result;
                        // Update the UserCircleIcon with the preview image
                        const userCircleIcon =
                          document.getElementById("user-circle-icon");
                        if (userCircleIcon) {
                          userCircleIcon.src = previewImage;
                        }
                      };
                      reader.readAsDataURL(selectedFile);
                    }
                  }}
                />
                <label
                  htmlFor="photo"
                  className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 cursor-pointer"
                >
                  Change
                </label>
              </div>
            </div>
          </div>

          <div>
            <label
              htmlFor="first-name"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              Pet name
            </label>
            <div className="mt-2.5">
              <input
                type="text"
                name="name"
                id="first-name"
                autoComplete="given-name"
                required
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="pet-type"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              Pet type
            </label>
            <div className="mt-2.5">
              <input
                type="text"
                name="type"
                id="pet-type"
                placeholder="Example : Dog, Cat, ..."
                autoComplete="family-name"
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="age"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              Age
            </label>
            <div className="mt-2.5">
              <input
                type="number"
                name="age"
                id="age"
                min="0"
                max="100"
                autoComplete="given-name"
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="breed"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              Breed
            </label>
            <div className="mt-2.5">
              <input
                type="text"
                name="breed"
                id="breed"
                autoComplete="family-name"
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="gender"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              Gender
            </label>
            <div className="mt-2.5">
              <select
                name="gender"
                className="block w-full rounded-md border-0 px-3 py-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
          </div>

          {page === "adoption" && (
            <>
              <div>
                <label
                  htmlFor="number"
                  className="block text-sm font-semibold leading-6 text-gray-900"
                >
                  Phone number
                </label>
                <div className="mt-2.5">
                  <input
                    type="text"
                    name="number"
                    id="number"
                    autoComplete="family-name"
                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-semibold leading-6 text-gray-900"
                >
                  Email
                </label>
                <div className="mt-2.5">
                  <input
                    type="email"
                    name="email"
                    id="email"
                    autoComplete="family-name"
                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </>
          )}
        </div>
        <div className="mt-10">
          <button
            type="submit"
            className="block w-full rounded-md bg-red-600 text-white px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-red-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Add
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateForm;
