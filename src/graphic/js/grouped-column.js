import pym from "pym.js";
import { select, rollup, scaleOrdinal } from "d3";
import { build, BarChart, schemeMain } from "@michigandaily/bore";

import downloadImage from "./download-image";

import csvfile from "../data/2022-state.csv";

const draw = () => {
  const districts = csvfile.filter((d) => d["School Type"] === "District");
  const data = rollup(
    districts,
    (v) => v.length,
    (d) => d["Overall Rating"]
  );

  const color = scaleOrdinal()
    .domain(data.keys())
    .range(schemeMain.slice(0, data.size));

  select("figure")
    .append("svg")
    .datum(data)
    .call(
      build(
        new BarChart()
          .wrappx(100)
          .margin({ left: 50, right: 50 })
          .height(250)
          .color((d) => color(d[0]))
      )
    );
};

window.onresize = () => {};

window.onload = () => {
  const pymChild = new pym.Child({ polling: 500 });
  pymChild.sendHeight();
  pymChild.onMessage("download", downloadImage);
  draw();
};
