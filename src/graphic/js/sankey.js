import pym from "pym.js";
import { csv, index, flatRollup, select, ascending } from "d3";
import { build, SankeyDiagram } from "@michigandaily/bore";

import downloadImage from "./download-image";

import csv2019 from "../data/2019-state.csv";
import csv2022 from "../data/2022-state.csv";

const draw = async () => {
  const data2019 = await csv(csv2019);
  const data2022 = await csv(csv2022);

  const isCampus = (d) => d["School Type"] !== "District";

  const campus2019 = data2019.filter(isCampus);
  const campus2022 = data2022.filter(isCampus);

  const campusindex2019 = index(campus2019, (d) => d["Campus Number"]);

  const nodes2019 = Array.from(
    new Set(campus2019.map((d) => d["Overall Rating *"]))
  )
    .map((d) => ({ id: `2019-${d}`, name: d }))
    .sort((a, b) => ascending(a.name, b.name));

  const nodes2022 = Array.from(
    new Set(campus2022.map((d) => d["Overall Rating"]))
  ).map((d) => ({ id: `2022-${d}`, name: d }));

  const links = flatRollup(
    campus2022,
    (v) => v.length,
    (d) =>
      campusindex2019.has(d["Campus Number"])
        ? `2019-${campusindex2019.get(d["Campus Number"])["Overall Rating *"]}`
        : null,
    (d) => `2022-${d["Overall Rating"]}`
  )
    .map((d) => ({ source: d[0], target: d[1], value: d[2] }))
    .filter((d) => d.source);

  const data = {
    nodes: [...nodes2019, ...nodes2022],
    links: Array.from([...links]),
  };

  select("figure")
    .append("svg")
    .datum(data)
    .call(
      build(
        new SankeyDiagram().label(
          (d) => `2019 ${d.source.name} → 2022 ${d.target.name}\n${d.value}`
        )
      )
    );

  const notAtoA = campus2022.filter(
    (d) =>
      d["Overall Rating"] === "A" &&
      campusindex2019.has(d["Campus Number"]) &&
      campusindex2019.get(d["Campus Number"])["Overall Rating *"] !== "A"
  );
  console.log(notAtoA.length);
};

window.onresize = () => {};

window.onload = () => {
  const pymChild = new pym.Child({ polling: 500 });
  pymChild.sendHeight();
  pymChild.onMessage("download", downloadImage);
  draw();
};
