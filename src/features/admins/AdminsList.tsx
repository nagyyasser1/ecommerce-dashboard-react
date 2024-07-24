import { Link } from "react-router-dom";
import { useFetchAdminsQuery } from "../../app/services/adminsService";
import { Admin } from "./interfaces";
import styles from "./styles/AdminsList.module.css";

const AdminsList = () => {
  const { data: admins, isLoading, isError } = useFetchAdminsQuery({});

  if (isLoading) {
    return <p>isLoading Admins</p>;
  }

  if (isError) {
    return <p>error fetching users</p>;
  }

  return (
    <div className={styles.adminsList}>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {admins.map((admin: Admin, index: number) => (
            <tr>
              <Link to={`edit/${admin.id}`}>
                <td>{admin.fname + " " + admin.lname}</td>
              </Link>
              <td>{admin.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminsList;
