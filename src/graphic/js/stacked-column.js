// JS for your graphic
import pym from "pym.js";
import * as d3 from "d3";
import csvfile from "../data/grouped.csv";
import { build, StackedColumnChart } from "@michigandaily/bore";

import downloadImage from "./download-image";

const draw = async () => {
  const test = d3.rollup(
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
    .datum(test)
    .call((svg) => {
      console.time();
      svg.call(build(new StackedColumnChart().color(({ key }) => color(key))));
      console.timeEnd();
    });
};

window.onresize = () => {};

window.onload = () => {
  const pymChild = new pym.Child({ polling: 500 });
  pymChild.sendHeight();
  pymChild.onMessage("download", downloadImage);
  draw();
};