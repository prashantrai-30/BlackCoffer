import DashboardLayout from "@/components/layout/DashboardLayout";
import MainContainer from "@/components/layout/MainContainer";
import Navbar from "@/components/navigation/Navbar";
import Sidebar from "@/components/navigation/Sidebar";

const DashboardPage = () => (
	<DashboardLayout sidebar={<Sidebar />} navbar={<Navbar />}> 
		<MainContainer>
			<h1 className="text-2xl font-semibold text-slate-800">Dashboard</h1>
		</MainContainer>
	</DashboardLayout>
);

export default DashboardPage;