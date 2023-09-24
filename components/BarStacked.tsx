// @ts-nocheck
"use client";
import ResizableBox from "./ResizableBox";
import useDemoConfig from "../hooks/useDemoConfig";
import React from "react";
import { AxisOptions, Chart } from "react-charts";
import dynamic from 'next/dynamic';

// Dynamically import the specific named exports
const DynamicChart = dynamic(() =>
  import('react-charts').then((mod) => mod.Chart), { ssr: false }
);

const DynamicAxisOptions = dynamic(() =>
  import('react-charts').then((mod) => mod.AxisOptions, { ssr: false })
);

export default function BarStacked() {
  const { data, randomizeData } = useDemoConfig({
    series: 10,
    dataType: "ordinal",
  });

  const primaryAxis = React.useMemo<
    AxisOptions<typeof data[number]["data"][number]>
  >(
    () => ({
      getValue: (datum) => datum.primary,
    }),
    []
  );

  const secondaryAxes = React.useMemo<
    AxisOptions<typeof data[number]["data"][number]>[]
  >(
    () => [
      {
        getValue: (datum) => datum.secondary,
        stacked: true,
      },
    ],
    []
  );

  return (
    <>
      <ResizableBox resizable={true}>
        <DynamicChart
          options={{
            data,
            primaryAxis,
            secondaryAxes,
          }}
        />
      </ResizableBox>
    </>
  );
}
