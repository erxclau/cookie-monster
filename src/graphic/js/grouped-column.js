// JS for your graphic
import pym from "pym.js";
import * as d3 from "d3";
import csvfile from "../data/grouped.csv";
import { build, GroupedColumnChart } from "@michigandaily/bore";

import downloadImage from "./util/download-image";
import setDisplayOptions from "./util/set-display";

const draw = async () => {
  const data = d3.rollup(
    csvfile,
    (v) =>
      Object.fromEntries(v.map(({ Comfort, Percent }) => [Comfort, Percent])),
    (d) => d.Politics
  );

  const color = d3
    .scaleOrdinal()
    .domain(new Set(csvfile.map((d) => d.Comfort)))
    .range(["MediumSeaGreen", "lightgreen", "pink", "LightCoral"]);

  d3.select("figure")
    .append("svg")
    .datum(data)
    .call(
      build(
        new GroupedColumnChart()
          .height(500)
          .color(color)
          .xScale(d3.scaleLinear().domain([0, 100]))
          .label((d) => `${d[1]}%`)
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
