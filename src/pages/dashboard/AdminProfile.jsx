import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectAccessToken, selectUser } from "../../store/userSlice";
import { User } from "lucide-react";
import { toast } from "react-toastify";
import api from "../../Api/ApiService";

const AdminProfile = () => {
  const [user, setUser] = useState({});
  const stateUser = useSelector(selectUser);
  const token = useSelector(selectAccessToken);
  const [isLoading, setIsLoading] = useState(false);
  const [file, setFile] = useState(undefined);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
  });

  const getUserProfile = async () => {
    try {
      const response = await api.get(`/api/auth/getUserById/${stateUser?._id}`);
      setUser(response.data.data || {});
    } catch (error) {
      toast("Failed to fetch user profile");
    }
  };

  const handleProfileUpdate = async () => {
    try {
      const formData = new FormData();
      formData.append("profile", file);
      await api.post("/api/auth/updateImageOfUser", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      let msg = error?.message;
      toast(`Failed to update user: ${msg}`);
      console.log(error);
    }
  };

  const handleUserUpdate = async () => {
    try {
      setIsLoading(true);
      await api.put(
        `/api/auth/updateUser`,
        {
          ...form,
          userId: user?._id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (file) {
        await handleProfileUpdate();
      }
      return toast("Successfully updated user profile");
    } catch (error) {
      console.log(error);
      let msg = error?.response?.data?.message || error?.message;
      toast(`Failed to update: ${msg}`);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getUserProfile();
  }, []);

  useEffect(() => {
    if (!user?.email) return;
    setForm({
      name: user.name,
      email: user.email,
      city: user.city,
      phone: user.phone,
    });
  }, [user]);

  return (
    <div className="bg-gray-100 min-h-screen flex justify-center items-center max-w-[100vw] p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl p-4">
        {/* <div className="h-32 bg-gradient-to-r from-purple-500 to-pink-500 relative">
          <div className="absolute-bottom-12 mt-4 flex justify-center align-middle left-1/2 transform-translate-x-1/2">
            <div className="h-24 w-24 rounded-full pt-6 flex justify-center align-middle border-4 border-white bg-blue-400 text-white  overflow-hidden shadow-md">
              <span className="text-2xl">{user?.name[0]}</span>
            </div>
          </div>
        </div> */}
        <div className="flex items-center justify-center">
          <label className="relative border w-[125px] h-[125px] rounded-full bg-gray-300 block">
            {!file && !user.profile ? (
              <span className="capitalize absolute top-[65%] left-[60%] translate-x-[-50%] translate-y-[-50%] text-4xl font-bold">
                {user?.name?.at(0)}
              </span>
            ) : (
              <img
                className="w-[125px] h-[125px] rounded-full"
                src={user.profile || URL.createObjectURL(file)}
              />
            )}
            <input
              onChange={(e) => {
                console.log("files", e.target.files);
                setFile(e.target.files[0]);
              }}
              className="hidden"
              type="file"
            />
          </label>
        </div>
        <div className="px-6 py-6 text-center">
          <h1 className="text-2xl font-bold text-gray-800">{user?.name}</h1>
          <p># {user?._id}</p>
        </div>

        <div className="gap-5 mx-6 px-3 my-4">
          <div className="flex flex-wrap justify-between items-center gap-4 py-1">
            <p className="font-bold text-gray-800 text-sm">Name</p>
            <input
              className="h-10 border-2 rounded-md indent-2"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </div>
          <div className="flex flex-wrap justify-between items-center gap-4 py-1">
            <p className="font-bold text-gray-800 text-sm">Email</p>
            <input
              className="h-10 border-2 rounded-md indent-2"
              value={form.email}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
            />
          </div>
          <div className="flex flex-wrap justify-between items-center gap-4 py-1">
            <p className="text-gray-800 font-bold text-sm">Phone</p>
            <input
              className="h-10 border-2 rounded-md indent-2"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
            />
          </div>
          <div className="flex flex-wrap justify-between items-center gap-4 py-1">
            <p className="text-gray-800 font-bold text-sm">City</p>
            <input
              className="h-10 border-2 rounded-md indent-2"
              value={form.city}
              onChange={(e) => setForm({ ...form, city: e.target.value })}
            />
          </div>
          {/* <div className="flex flex-wrap justify-between items-center gap-4 py-1">
            <p className="text-gray-800 font-bold text-sm">Role</p>
            <input
              className="h-10 border-2 rounded-md indent-2" value={form.city} onChange={(e) => setForm({...form, city: e.target.value})} />
          </div>
          <div className="flex flex-wrap justify-between items-center gap-4 py-1">
            <p className="text-gray-800 font-bold text-sm">User Status</p>
            <p className="text-gray-600">{user?.userStatus}</p>
          </div> */}
          {/* <div className="flex flex-wrap justify-between items-center gap-4 py-1">
            <p className="text-gray-800 font-bold text-sm">Date</p>
            <p className="text-gray-600">
              {user?.createdAt.replace(
                /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}).*$/,
                "$3-$2-$1 $4:$5"
              )}
            </p>
          </div> */}

          <div className="h-20 flex justify-center items-center">
            <button
              disabled={isLoading}
              onClick={handleUserUpdate}
              className="border px-6 py-2 bg-blue-400 disabled:cursor-not-allowed text-white rounded-full hover:opacity-90 transition-colors duration-300"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
