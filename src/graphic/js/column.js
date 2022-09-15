import pym from "pym.js";
import { csv, select, rollup, scaleOrdinal } from "d3";
import { build, schemeMain, ColumnChart } from "@michigandaily/bore";

import downloadImage from "./download-image";

import datafile from "../data/2022-state.csv";

const draw = async () => {
  const csvfile = await csv(datafile);
  const districts = csvfile
    .filter((d) => d["School Type"] === "District")
    .map((d) => {
      if (d["Overall Rating"] === "Not Rated: Senate Bill 1365") {
        d["Overall Rating"] = "Not Rated (D/F)";
      }
      return d;
    });
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
        new ColumnChart()
          .wrappx(100)
          .margin({ left: 50, right: 50 })
          .height(400)
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
