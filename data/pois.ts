export type POI = {
  id: string
  name: string
  floor: string
  type: string
  x: number
  y: number
}

export const pois: POI[] = [
  { id: "LG-001", name: "Hypermart", floor: "LG", type: "Store", x: 20, y: 78 },
  { id: "LG-002", name: "Golden Lamian", floor: "LG", type: "Food", x: 35, y: 70 },
  { id: "LG-003", name: "Marugame Udon", floor: "LG", type: "Food", x: 45, y: 70 },
  { id: "LG-004", name: "Texas", floor: "LG", type: "Food", x: 55, y: 70 },
  { id: "LG-005", name: "A&W", floor: "LG", type: "Food", x: 65, y: 70 },
  { id: "LG-006", name: "Guardian", floor: "LG", type: "Store", x: 75, y: 62 },
  { id: "LG-007", name: "J.CO", floor: "LG", type: "Food", x: 82, y: 55 },

  { id: "G-001", name: "Matahari Department Store", floor: "G", type: "Store", x: 25, y: 45 },
  { id: "G-002", name: "J.CO", floor: "G", type: "Food", x: 40, y: 35 },
  { id: "G-003", name: "A&W", floor: "G", type: "Food", x: 50, y: 35 },
  { id: "G-004", name: "Top Noodle", floor: "G", type: "Food", x: 60, y: 35 },
  { id: "G-005", name: "KFC", floor: "G", type: "Food", x: 70, y: 35 },
  { id: "G-006", name: "Pizza Hut", floor: "G", type: "Food", x: 80, y: 45 },

  { id: "UG-001", name: "Matahari Department Store", floor: "UG", type: "Store", x: 25, y: 45 },
  { id: "UG-002", name: "Gramedia", floor: "UG", type: "Store", x: 50, y: 35 },
  { id: "UG-003", name: "D'Cost", floor: "UG", type: "Food", x: 72, y: 45 },

  { id: "F1-001", name: "ACE Hardware", floor: "1", type: "Store", x: 25, y: 40 },
  { id: "F1-002", name: "Sport Station", floor: "1", type: "Store", x: 45, y: 35 },
  { id: "F1-003", name: "Bank Mandiri", floor: "1", type: "Bank", x: 65, y: 40 },
  { id: "F1-004", name: "Payless", floor: "1", type: "Store", x: 80, y: 50 },

  { id: "F2-001", name: "Informa", floor: "2", type: "Store", x: 25, y: 40 },
  { id: "F2-002", name: "JYSK", floor: "2", type: "Store", x: 50, y: 35 },
  { id: "F2-003", name: "DIY", floor: "2", type: "Store", x: 75, y: 45 },

  { id: "F3-001", name: "Royal 21", floor: "3", type: "Entertainment", x: 70, y: 30 },
  { id: "F3-002", name: "Fun World", floor: "3", type: "Entertainment", x: 45, y: 35 },
  { id: "F3-003", name: "Food Court", floor: "3", type: "Food", x: 60, y: 55 },
]