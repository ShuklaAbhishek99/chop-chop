import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

export default function Device({ stats }) {
    const deviceCount = stats?.reduce((acc, item) => {
        if (!acc[item?.device]) {
            acc[item?.device] = 0;
        }
        acc[item?.device]++;
        return acc;
    }, {});

    const result = Object.keys(deviceCount)?.map((device) => ({
        device,
        count: deviceCount[device],
    }));

    return (
        <div style={{ width: "100%", height: 300 }}>
            <ResponsiveContainer width={"100%"} height={"100%"}>
                <PieChart width={400} height={400}>
                    <Pie
                        data={result}
                        labelLine={false}
                        label={({
                            cx,
                            cy,
                            midAngle,
                            innerRadius,
                            outerRadius,
                            percent,
                            index,
                        }) => {
                            const radius =
                                innerRadius + (outerRadius - innerRadius) * 0.1;
                            const x =
                                cx +
                                radius * Math.cos((-midAngle * Math.PI) / 180);
                            const y =
                                cy +
                                radius * Math.sin((-midAngle * Math.PI) / 180);

                            return (
                                <text
                                    x={x}
                                    y={y}
                                    fill="red"
                                    textAnchor={x > cx ? "start" : "end"}
                                    dominantBaseline="central"
                                >
                                    {`${result[index]?.device}: ${(
                                        percent * 100
                                    ).toFixed(0)}%`}
                                </text>
                            );
                        }}
                        dataKey="count"
                    >
                        {result.map((entry, index) => (
                            <Cell
                                key={`cell-${index}`}
                                fill={COLORS[index % COLORS?.length]}
                            />
                        ))}
                    </Pie>
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
}
