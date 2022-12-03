import pym from "pym.js";
import { select, rollup, scaleOrdinal } from "d3";
import { build, schemeMain, ColumnChart } from "@michigandaily/bore";

import downloadImage from "./util/download-image";
import setDisplayOptions from "./util/set-display";

import csvfile from "../data/2022-state.csv";

const draw = () => {
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
  const child = new pym.Child({ polling: 500 });
  child.sendHeight();
  child.onMessage("download", downloadImage);
  setDisplayOptions();
  draw();
};
