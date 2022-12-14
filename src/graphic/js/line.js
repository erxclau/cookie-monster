// JS for your graphic
import pym from "pym.js";
import * as d3 from "d3";
import { build, LineChart } from "@michigandaily/bore";

import downloadImage from "./util/download-image";
import setDisplayOptions from "./util/set-display";

import csv from "../data/covid.csv";

const draw = async () => {
  const confirmed = csv.filter((d) => d.CASE_STATUS === "Confirmed");

  const data = d3.rollup(
    confirmed,
    (v) => new Map(v.map((d) => [d.Date, d.Cases])),
    (d) => d.COUNTY
  );

  d3.select("figure")
    .append("svg")
    .datum(data.get("Washtenaw"))
    .call(
      build(
        new LineChart().height(400).curve(d3.curveNatural).margin({ left: 50 })
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
