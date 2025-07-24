import TravelTable from "../dashboard/DashboardComponents/TravelTable";
import TopContainer from "./DashboardComponents/TopContainer";

const UserDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row w-full">
      <main className="flex-1 space-y-3 p-6">
        <TopContainer />
        {/* <Filter  /> */}
        <TravelTable />
      </main>
    </div>
  );
};

export default UserDashboard;
