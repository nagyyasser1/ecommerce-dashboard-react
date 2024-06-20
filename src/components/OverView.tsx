import styles from "./styles/OverView.module.css";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Page A", uv: 4000, pv: 2400, amt: 2400 },
  { name: "Page B", uv: 3000, pv: 1398, amt: 2210 },
  { name: "Page C", uv: 2000, pv: 9800, amt: 2290 },
  { name: "Page D", uv: 2780, pv: 3908, amt: 2000 },
  { name: "Page E", uv: 1890, pv: 4800, amt: 2181 },
  { name: "Page F", uv: 2390, pv: 3800, amt: 2500 },
  { name: "Page G", uv: 3490, pv: 4300, amt: 2100 },
];

const OverView = () => {
  return (
    <div className={styles.overView}>
      <div className={styles.overView_products}>
        <p>Products</p>
        <span className={styles.overView_count}>23</span>
      </div>
      <div className={styles.overView_orders}>
        <p>Orders</p>
        <span className={styles.overView_count}>230</span>
      </div>
      <div className={styles.overView_users}>
        <p>Users</p>
        <span className={styles.overView_count}>1290</span>
      </div>
      <div className={styles.overView_categories}>
        <p>Categories</p>
        <span className={styles.overView_count}>5</span>
      </div>
      <div className={styles.overView_charts}>
        <ResponsiveContainer>
          <BarChart
            width={500}
            height={500}
            data={data}
            margin={{
              top: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="pv" fill="#e0b61e" />
            <Bar dataKey="uv" fill="darkslategrey" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default OverView;
