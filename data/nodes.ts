export type Node = {
  id: string
  floor: string
  type: string
  x: number
  y: number
  connections: string[]
}

export const nodes: Node[] = [
  {
    id: "LG-ENT-01",
    floor: "LG",
    type: "Entrance",
    x: 10,
    y: 82,
    connections: ["LG-N01"],
  },
  {
    id: "LG-N01",
    floor: "LG",
    type: "Corridor",
    x: 22,
    y: 78,
    connections: ["LG-ENT-01", "LG-N02"],
  },
  {
    id: "LG-N02",
    floor: "LG",
    type: "Corridor",
    x: 38,
    y: 70,
    connections: ["LG-N01", "LG-N03"],
  },
  {
    id: "LG-N03",
    floor: "LG",
    type: "Corridor",
    x: 52,
    y: 70,
    connections: ["LG-N02", "LG-N04"],
  },
  {
    id: "LG-N04",
    floor: "LG",
    type: "Corridor",
    x: 65,
    y: 70,
    connections: ["LG-N03", "LG-N05"],
  },
  {
    id: "LG-N05",
    floor: "LG",
    type: "Corridor",
    x: 75,
    y: 60,
    connections: ["LG-N04", "LG-ELEV-01"],
  },
  {
    id: "LG-ELEV-01",
    floor: "LG",
    type: "Elevator",
    x: 80,
    y: 52,
    connections: ["LG-N05", "F1-ELEV-01"],
  },

  {
    id: "F1-ELEV-01",
    floor: "1",
    type: "Elevator",
    x: 80,
    y: 52,
    connections: ["LG-ELEV-01", "F2-ELEV-01"],
  },
  {
    id: "F2-ELEV-01",
    floor: "2",
    type: "Elevator",
    x: 80,
    y: 52,
    connections: ["F1-ELEV-01", "F3-ELEV-01"],
  },
  {
    id: "F3-ELEV-01",
    floor: "3",
    type: "Elevator",
    x: 70,
    y: 45,
    connections: ["F2-ELEV-01", "F3-N01"],
  },
  {
    id: "F3-N01",
    floor: "3",
    type: "Corridor",
    x: 70,
    y: 40,
    connections: ["F3-ELEV-01", "F3-N02"],
  },
  {
    id: "F3-N02",
    floor: "3",
    type: "Corridor",
    x: 70,
    y: 30,
    connections: ["F3-N01"],
  },
]