export const config = {
  style: [
    {
      selector: "node",
      removed: false,
      selected: false,
      selectable: true,
      locked: false,
      grabbed: false,
      grabbable: true,
      style: {
        label: "data(name)",
        "background-color": "green"
      }
    },
    {
      selector: "edge",

      removed: false,
      selected: false,
      selectable: true,
      locked: false,
      grabbed: false,
      grabbable: true,
      style: {
        width: 1,
        "curve-style": "bezier",
        "line-color": "blue",
        "target-arrow-shape": "triangle",
        "target-arrow-color": "red"
      }
    },
    {
      selector: "node:selected",
      style: {
        "background-color": "blue"
      }
    },
    {
      selector: "edge:selected",
      style: {
        "line-color": "yellow"
      }
    }
  ],
  layout: {
    animate: true,
    animationDuration: 500,
    animationEasing: undefined,
    name: "cose",
    rows: 1
  }
};
