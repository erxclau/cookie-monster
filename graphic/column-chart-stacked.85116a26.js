!function(e,o,r,n,t){var a="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},l="function"==typeof a.parcelRequire2f2b&&a.parcelRequire2f2b,i=l.cache||{},f="undefined"!=typeof module&&"function"==typeof module.require&&module.require.bind(module);function d(o,r){if(!i[o]){if(!e[o]){var n="function"==typeof a.parcelRequire2f2b&&a.parcelRequire2f2b;if(!r&&n)return n(o,!0);if(l)return l(o,!0);if(f&&"string"==typeof o)return f(o);var t=new Error("Cannot find module '"+o+"'");throw t.code="MODULE_NOT_FOUND",t}m.resolve=function(r){var n=e[o][1][r];return null!=n?n:r},m.cache={};var s=i[o]=new d.Module(o);e[o][0].call(s.exports,m,s,s.exports,this)}return i[o].exports;function m(e){var o=m.resolve(e);return!1===o?{}:d(o)}}d.isParcelRequire=!0,d.Module=function(e){this.id=e,this.bundle=d,this.exports={}},d.modules=e,d.cache=i,d.parent=l,d.register=function(o,r){e[o]=[function(e,o){o.exports=r},{}]},Object.defineProperty(d,"root",{get:function(){return a.parcelRequire2f2b}}),a.parcelRequire2f2b=d;for(var s=0;s<o.length;s++)d(o[s]);var m=d(r);"object"==typeof exports&&"undefined"!=typeof module?module.exports=m:"function"==typeof define&&define.amd&&define((function(){return m}))}({h5V89:[function(e,o,r){var n=e("@parcel/transformer-js/src/esmodule-helpers.js"),t=e("pym.js"),a=n.interopDefault(t),l=e("d3"),i=e("../data/grouped.csv"),f=n.interopDefault(i),d=e("@michigandaily/bore"),s=e("./download-image"),m=n.interopDefault(s);window.onresize=()=>{},window.onload=()=>{const e=new a.default.Child({polling:500});e.sendHeight(),e.onMessage("download",m.default),(async()=>{const e=l.rollup(f.default,(e=>Object.fromEntries(e.map((({Comfort:e,Percent:o})=>[e,o])))),(e=>e.Politics)),o=l.scaleOrdinal().domain(new Set(f.default.map((e=>e.Comfort)))).range(["MediumSeaGreen","lightgreen","pink","LightCoral"]);l.select("figure").append("svg").datum(e).call((e=>{console.time(),e.call((0,d.build)((new(0,d.StackedColumnChart)).color((({key:e})=>o(e))))),console.timeEnd()}))})()}},{"pym.js":"cqxOy",d3:"grFMH","../data/grouped.csv":"eDfQw","@michigandaily/bore":"4aryn","./download-image":"DrfdK","@parcel/transformer-js/src/esmodule-helpers.js":"7zlv8"}],eDfQw:[function(e,o,r){e("@parcel/transformer-js/src/esmodule-helpers.js").defineInteropFlag(r);var n=e("d3-dsv");r.default=(0,n.csvParse)("Politics,Comfort,Percent\nVery Conservative,Very Comfortable,71.05\nVery Conservative,Somewhat Comfortable,23.68\nVery Conservative,Somewhat Uncomfortable,2.63\nVery Conservative,Very Uncomfortable,2.63\nSomewhat Conservative,Very Comfortable,64.41\nSomewhat Conservative,Somewhat Comfortable,21.19\nSomewhat Conservative,Somewhat Uncomfortable,10.17\nSomewhat Conservative,Very Uncomfortable,4.24\nModerate,Very Comfortable,37.39\nModerate,Somewhat Comfortable,35.98\nModerate,Somewhat Uncomfortable,16.71\nModerate,Very Uncomfortable,9.92\nSomewhat Liberal,Very Comfortable,22.66\nSomewhat Liberal,Somewhat Comfortable,41.76\nSomewhat Liberal,Somewhat Uncomfortable,25.66\nSomewhat Liberal,Very Uncomfortable,9.93\nVery Liberal,Very Comfortable,19.44\nVery Liberal,Somewhat Comfortable,39.25\nVery Liberal,Somewhat Uncomfortable,28.79\nVery Liberal,Very Uncomfortable,12.52",n.autoType)},{"d3-dsv":"iqX37","@parcel/transformer-js/src/esmodule-helpers.js":"7zlv8"}]},["h5V89"],"h5V89");
//# sourceMappingURL=column-chart-stacked.85116a26.js.map