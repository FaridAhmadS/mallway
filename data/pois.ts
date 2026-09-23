export type POI = {
  id: string
  name: string
  floor: string
  type: string
  x: number
  y: number
}

export const pois: POI[] = [
  // LOWER GROUND
  {
    id: "LG-001",
    name: "Hypermart",
    floor: "LG",
    type: "Store",
    x: 50.02,
    y: 37.36,
  },
  {
    id: "LG-002",
    name: "Golden Lamian",
    floor: "LG",
    type: "Food",
    x: 36.35,
    y: 88.24,
  },
  {
    id: "LG-003",
    name: "Marugame Udon",
    floor: "LG",
    type: "Food",
    x: 43.09,
    y: 65.82,
  },
  {
    id: "LG-004",
    name: "Texas",
    floor: "LG",
    type: "Food",
    x: 57.66,
    y: 66.30,
  },
  {
    id: "LG-005",
    name: "A&W",
    floor: "LG",
    type: "Food",
    x: 32.32,
    y: 88.08,
  },
  {
    id: "LG-006",
    name: "Guardian",
    floor: "LG",
    type: "Store",
    x: 10.54,
    y: 74.03,
  },
  {
    id: "LG-007",
    name: "J.CO",
    floor: "LG",
    type: "Food",
    x: 29.07,
    y: 71.46,
  },

  // GROUND
  {
    id: "G-001",
    name: "Matahari Department Store",
    floor: "G",
    type: "Store",
    x: 39.66,
    y: 39.67,
  },
  {
    id: "G-002",
    name: "J.CO",
    floor: "G",
    type: "Food",
    x: 87.61,
    y: 70.77,
  },
  {
    id: "G-003",
    name: "A&W",
    floor: "G",
    type: "Food",
    x: 27.23,
    y: 84.19,
  },
  {
    id: "G-004",
    name: "Top Noodle",
    floor: "G",
    type: "Food",
    x: 39.31,
    y: 84.03,
  },
  {
    id: "G-005",
    name: "KFC",
    floor: "G",
    type: "Food",
    x: 56.0,
    y: 84.35,
  },
  {
    id: "G-006",
    name: "Pizza Hut",
    floor: "G",
    type: "Food",
    x: 68.19,
    y: 83.56,
  },

  // UPPER GROUND
  {
    id: "UG-001",
    name: "Matahari Department Store",
    floor: "UG",
    type: "Store",
    x: 32.68,
    y: 41.2,
  },
  {
    id: "UG-002",
    name: "Gramedia",
    floor: "UG",
    type: "Store",
    x: 54.22,
    y: 37.88,
  },
  {
    id: "UG-003",
    name: "D'Cost",
    floor: "UG",
    type: "Food",
    x: 84.06,
    y: 58.41,
  },

  // FLOOR 1
  {
    id: "F1-001",
    name: "ACE Hardware",
    floor: "1",
    type: "Store",
    x: 76.48,
    y: 63.98,
  },
  {
    id: "F1-002",
    name: "Sport Station",
    floor: "1",
    type: "Store",
    x: 20.84,
    y: 72.03,
  },
  {
    id: "F1-003",
    name: "Bank Mandiri",
    floor: "1",
    type: "Bank",
    x: 54.81,
    y: 53.25,
  },
  {
    id: "F1-004",
    name: "Payless",
    floor: "1",
    type: "Store",
    x: 24.98,
    y: 81.98,
  },

  // FLOOR 2
  {
    id: "F2-001",
    name: "Informa",
    floor: "2",
    type: "Store",
    x: 71.27,
    y: 63.83,
  },
  {
    id: "F2-002",
    name: "JYSK",
    floor: "2",
    type: "Store",
    x: 20.36,
    y: 73.14,
  },
  {
    id: "F2-003",
    name: "DIY",
    floor: "2",
    type: "Store",
    x: 21.07,
    y: 79.45,
  },

  // FLOOR 3
  {
    id: "F3-001",
    name: "Royal 21",
    floor: "3",
    type: "Entertainment",
    x: 32.56,
    y: 51.67,
  },
  {
    id: "F3-002",
    name: "Fun World",
    floor: "3",
    type: "Entertainment",
    x: 44.51,
    y: 57.98,
  },
  {
    id: "F3-003",
    name: "Food Court",
    floor: "3",
    type: "Food",
    x: 71.27,
    y: 65.88,
  },
]