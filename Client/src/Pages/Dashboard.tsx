import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <div>
      Dashboard
      <div>
        <Link to={"/another"}>Another</Link>
      </div>
    </div>
  );
};

export default Dashboard;
