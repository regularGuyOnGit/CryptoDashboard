import React from "react";
import { Line, Bar } from "react-chartjs-2";

function LineGraph({ data, graph }) {
  return (
    <div>
      {graph == "line" && (
        <Line
          data={data}
          options={{
            plugins: {
              title: {
                display: true,
                text: "Coin Valuation",
              },
            },
          }}
        />
      )}
      {graph == "bar" && (
        <Bar
          data={data}
          options={{
            plugins: {
              title: {
                display: true,
                text: "Coin Valuation",
              },
            },
          }}
        />
      )}
    </div>
  );
}

export default LineGraph;
