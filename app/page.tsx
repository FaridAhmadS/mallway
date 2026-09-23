"use client"

import { useEffect, useMemo, useState } from "react"
import { pois } from "../data/pois"
import { nodes } from "../data/nodes"

const floors = ["LG", "G", "UG", "1", "2", "3"]

const floorNames: Record<string, string> = {
  LG: "Lower Ground",
  G: "Ground Floor",
  UG: "Upper Ground",
  "1": "Floor 1",
  "2": "Floor 2",
  "3": "Floor 3",
}

const mapImages: Record<string, string> = {
  LG: "/maps/lg.jpg",
  G: "/maps/g.jpg",
  UG: "/maps/ug.jpg",
  "1": "/maps/floor1.jpg",
  "2": "/maps/floor2.jpg",
  "3": "/maps/floor3.jpg",
}

function aStar(startId: string, goalId: string) {
  const nodeMap = new Map(nodes.map((node) => [node.id, node]))

  const openSet = [startId]
  const cameFrom = new Map<string, string>()

  const gScore = new Map<string, number>()
  const fScore = new Map<string, number>()

  nodes.forEach((node) => {
    gScore.set(node.id, Infinity)
    fScore.set(node.id, Infinity)
  })

  gScore.set(startId, 0)
  fScore.set(startId, 0)

  while (openSet.length > 0) {
    openSet.sort(
      (a, b) => (fScore.get(a) ?? Infinity) - (fScore.get(b) ?? Infinity)
    )

    const current = openSet.shift()

    if (!current) break

    if (current === goalId) {
      const path = [current]
      let currentNode = current

      while (cameFrom.has(currentNode)) {
        currentNode = cameFrom.get(currentNode)!
        path.unshift(currentNode)
      }

      return path
    }

    const currentData = nodeMap.get(current)

    if (!currentData) continue

    for (const neighborId of currentData.connections) {
      const neighbor = nodeMap.get(neighborId)

      if (!neighbor) continue

      const distance = Math.sqrt(
        Math.pow(currentData.x - neighbor.x, 2) +
          Math.pow(currentData.y - neighbor.y, 2)
      )

      const tentativeG =
        (gScore.get(current) ?? Infinity) + distance

      if (tentativeG < (gScore.get(neighborId) ?? Infinity)) {
        cameFrom.set(neighborId, current)
        gScore.set(neighborId, tentativeG)
        fScore.set(neighborId, tentativeG)

        if (!openSet.includes(neighborId)) {
          openSet.push(neighborId)
        }
      }
    }
  }

  return []
}

export default function Home() {
  const [floor, setFloor] = useState("LG")
  const [search, setSearch] = useState("")
  const [selectedPOI, setSelectedPOI] = useState<(typeof pois)[number] | null>(
    null
  )

  const [navigation, setNavigation] = useState(false)
  const [routeIndex, setRouteIndex] = useState(0)

  const [accessible, setAccessible] = useState(false)

  const [assistantOpen, setAssistantOpen] = useState(false)
  const [assistantInput, setAssistantInput] = useState("")
  const [assistantMessage, setAssistantMessage] = useState(
    "Hi! I'm MallWay Assistant. Where would you like to go?"
  )

  const [parkingSpot, setParkingSpot] = useState("")
  const [parkingSaved, setParkingSaved] = useState(false)

  const [mobilePanel, setMobilePanel] = useState(false)

  const filteredPOIs = useMemo(() => {
    return pois.filter((poi) => {
      const matchesFloor = poi.floor === floor
      const matchesSearch = poi.name
        .toLowerCase()
        .includes(search.toLowerCase())

      return matchesFloor && matchesSearch
    })
  }, [floor, search])

  const selectedOnCurrentFloor =
    selectedPOI?.floor === floor ? selectedPOI : null

  const route = useMemo(() => {
    if (!selectedPOI) return []

    const startNode =
      floor === "LG"
        ? "LG-ENT-01"
        : floor === "3"
          ? "F3-ELEV-01"
          : "LG-ENT-01"

    const goalNode =
      selectedPOI.id === "F3-001"
        ? "F3-N02"
        : selectedPOI.floor === "3"
          ? "F3-N01"
          : startNode

    return aStar(startNode, goalNode)
  }, [selectedPOI, floor])

  useEffect(() => {
    if (!navigation || route.length === 0) return

    const timer = setInterval(() => {
      setRouteIndex((current) => {
        if (current >= route.length - 1) {
          clearInterval(timer)
          return current
        }

        return current + 1
      })
    }, 1200)

    return () => clearInterval(timer)
  }, [navigation, route])

  const currentRouteNode =
    route.length > 0 ? nodes.find((n) => n.id === route[routeIndex]) : null

  const handlePOIClick = (poi: (typeof pois)[number]) => {
    setSelectedPOI(poi)
    setSearch(poi.name)
    setMobilePanel(true)
  }

  const startNavigation = () => {
    if (!selectedPOI) return

    setNavigation(true)
    setRouteIndex(0)

    if (selectedPOI.floor !== floor) {
      setFloor(selectedPOI.floor)
    }
  }

  const stopNavigation = () => {
    setNavigation(false)
    setRouteIndex(0)
  }

  const askAssistant = () => {
    const text = assistantInput.toLowerCase()

    if (text.includes("royal 21")) {
      const royal21 = pois.find((poi) => poi.name === "Royal 21")

      if (royal21) {
        setSelectedPOI(royal21)
        setFloor("3")
        setAssistantMessage(
          "Royal 21 is on Floor 3. I've selected it for you. Tap Start Navigation to begin."
        )
      }
    } else if (text.includes("tanpa tangga") || text.includes("tanpa stairs")) {
      setAccessible(true)
      setAssistantMessage(
        "Accessible route activated. MallWay will prioritize elevator connections."
      )
    } else if (
      text.includes("food") ||
      text.includes("makan") ||
      text.includes("restaurant")
    ) {
      setAssistantMessage(
        "Try Food Court on Floor 3, or search for a food tenant using the search box."
      )
    } else {
      setAssistantMessage(
        "Try asking me things like: 'Take me to Royal 21' or 'Take me there without stairs'."
      )
    }

    setAssistantInput("")
  }

  const saveParking = () => {
    if (!parkingSpot.trim()) return

    setParkingSaved(true)

    setTimeout(() => {
      setParkingSaved(false)
    }, 2500)
  }

  return (
    <main className="min-h-screen bg-slate-950 text-slate-900">
      {/* NAVBAR */}
      <nav className="border-b border-white/10 bg-slate-950 text-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
          <div>
            <div className="text-xl font-black tracking-tight">
              Mall<span className="text-cyan-400">Way</span>
            </div>

            <div className="text-[10px] font-medium uppercase tracking-[0.25em] text-slate-400">
              Smart Indoor Navigation
            </div>
          </div>

          <button
            onClick={() => setAssistantOpen(true)}
            className="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-2 text-sm font-semibold text-cyan-300 transition hover:bg-cyan-400/20"
          >
            ✦ AI Assistant
          </button>
        </div>
      </nav>

      {/* HERO */}
      <section className="bg-slate-950 px-5 pb-10 pt-10 text-white">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <div className="mb-3 inline-flex rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-xs font-semibold text-cyan-300">
              ROYAL PLAZA SURABAYA
            </div>

            <h1 className="text-4xl font-black tracking-tight sm:text-5xl">
              Navigate. Explore.
              <br />
              <span className="text-cyan-400">Never Get Lost.</span>
            </h1>

            <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-400 sm:text-base">
              MallWay helps visitors find stores, facilities, and destinations
              inside multi-floor shopping malls with intelligent indoor
              navigation.
            </p>
          </div>
        </div>
      </section>

      {/* MAIN */}
      <section className="bg-slate-100 px-4 py-5 sm:px-5 sm:py-8">
        <div className="mx-auto grid max-w-7xl gap-5 lg:grid-cols-[360px_1fr]">
          {/* LEFT PANEL */}
          <aside
            className={`space-y-4 ${
              mobilePanel ? "block" : "hidden lg:block"
            }`}
          >
            {/* SEARCH */}
            <div className="rounded-3xl bg-white p-5 shadow-sm">
              <div className="mb-3 text-sm font-bold text-slate-800">
                Where do you want to go?
              </div>

              <div className="relative">
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search store, food, cinema..."
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 pl-10 text-sm outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-100"
                />

                <span className="absolute left-4 top-3 text-slate-400">
                  ⌕
                </span>
              </div>

              {search && filteredPOIs.length > 0 && (
                <div className="mt-3 max-h-52 overflow-auto rounded-2xl border border-slate-100">
                  {filteredPOIs.map((poi) => (
                    <button
                      key={poi.id}
                      onClick={() => handlePOIClick(poi)}
                      className="flex w-full items-center justify-between border-b border-slate-100 px-4 py-3 text-left last:border-0 hover:bg-slate-50"
                    >
                      <div>
                        <div className="text-sm font-semibold text-slate-800">
                          {poi.name}
                        </div>

                        <div className="mt-0.5 text-xs text-slate-400">
                          Floor {poi.floor} · {poi.type}
                        </div>
                      </div>

                      <span className="text-slate-300">→</span>
                    </button>
                  ))}
                </div>
              )}

              {search && filteredPOIs.length === 0 && (
                <div className="mt-3 rounded-2xl bg-slate-50 p-4 text-center text-xs text-slate-400">
                  No destination found on this floor.
                </div>
              )}
            </div>

            {/* FLOOR SELECTOR */}
            <div className="rounded-3xl bg-white p-5 shadow-sm">
              <div className="mb-3 text-sm font-bold text-slate-800">
                Select Floor
              </div>

              <div className="grid grid-cols-3 gap-2">
                {floors.map((item) => (
                  <button
                    key={item}
                    onClick={() => {
                      setFloor(item)
                      setMobilePanel(false)
                    }}
                    className={`rounded-xl px-3 py-3 text-sm font-bold transition ${
                      floor === item
                        ? "bg-slate-950 text-white shadow-md"
                        : "bg-slate-100 text-slate-500 hover:bg-slate-200"
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>

              <div className="mt-3 text-xs text-slate-400">
                Currently viewing{" "}
                <span className="font-semibold text-slate-600">
                  {floorNames[floor]}
                </span>
              </div>
            </div>

            {/* SELECTED DESTINATION */}
            {selectedPOI && (
              <div className="rounded-3xl bg-white p-5 shadow-sm">
                <div className="mb-3 text-xs font-semibold uppercase tracking-wider text-cyan-500">
                  Destination
                </div>

                <div className="text-lg font-black text-slate-900">
                  {selectedPOI.name}
                </div>

                <div className="mt-1 text-sm text-slate-400">
                  Floor {selectedPOI.floor} · {selectedPOI.type}
                </div>

                <label className="mt-5 flex cursor-pointer items-center gap-3 rounded-2xl bg-slate-50 p-3">
                  <input
                    type="checkbox"
                    checked={accessible}
                    onChange={(e) => setAccessible(e.target.checked)}
                    className="h-4 w-4 accent-cyan-500"
                  />

                  <div>
                    <div className="text-sm font-semibold text-slate-700">
                      Accessible route
                    </div>
                    <div className="text-xs text-slate-400">
                      Prefer elevators and accessible paths
                    </div>
                  </div>
                </label>

                {!navigation ? (
                  <button
                    onClick={startNavigation}
                    className="mt-4 w-full rounded-2xl bg-cyan-500 px-4 py-3 text-sm font-bold text-white shadow-lg shadow-cyan-500/20 transition hover:bg-cyan-600"
                  >
                    Start Navigation →
                  </button>
                ) : (
                  <button
                    onClick={stopNavigation}
                    className="mt-4 w-full rounded-2xl bg-slate-900 px-4 py-3 text-sm font-bold text-white transition hover:bg-slate-800"
                  >
                    Stop Navigation
                  </button>
                )}
              </div>
            )}

            {/* NAVIGATION */}
            {navigation && (
              <div className="rounded-3xl bg-slate-950 p-5 text-white shadow-sm">
                <div className="text-xs font-semibold uppercase tracking-wider text-cyan-400">
                  Navigation Active
                </div>

                <div className="mt-2 text-lg font-black">
                  {selectedPOI?.name}
                </div>

                <div className="mt-4 rounded-2xl bg-white/10 p-4">
                  <div className="text-xs text-slate-400">
                    Current position
                  </div>

                  <div className="mt-1 font-semibold">
                    {currentRouteNode?.type || "Starting point"}
                  </div>

                  <div className="mt-1 text-xs text-slate-400">
                    {currentRouteNode?.floor
                      ? `Floor ${currentRouteNode.floor}`
                      : ""}
                  </div>
                </div>

                {accessible && (
                  <div className="mt-3 rounded-2xl bg-emerald-400/10 p-3 text-xs text-emerald-300">
                    ♿ Accessible route enabled
                  </div>
                )}

                <div className="mt-4 text-xs text-slate-400">
                  Step {Math.min(routeIndex + 1, Math.max(route.length, 1))} of{" "}
                  {Math.max(route.length, 1)}
                </div>
              </div>
            )}

            {/* PARKING */}
            <div className="rounded-3xl bg-white p-5 shadow-sm">
              <div className="mb-1 text-sm font-bold text-slate-800">
                🅿 Parking Memory
              </div>

              <div className="mb-3 text-xs text-slate-400">
                Save where you parked your vehicle.
              </div>

              <div className="flex gap-2">
                <input
                  value={parkingSpot}
                  onChange={(e) => setParkingSpot(e.target.value)}
                  placeholder="e.g. P2 - A17"
                  className="min-w-0 flex-1 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none focus:border-cyan-400"
                />

                <button
                  onClick={saveParking}
                  className="rounded-xl bg-slate-900 px-4 py-2 text-xs font-bold text-white"
                >
                  Save
                </button>
              </div>

              {parkingSaved && (
                <div className="mt-3 rounded-xl bg-emerald-50 p-3 text-xs font-semibold text-emerald-600">
                  Parking location saved ✓
                </div>
              )}
            </div>
          </aside>

          {/* MAP */}
          <div className="min-w-0">
            <div className="overflow-hidden rounded-[2rem] bg-white shadow-sm">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 px-5 py-4">
                <div>
                  <div className="text-sm font-black text-slate-900">
                    {floorNames[floor]}
                  </div>

                  <div className="text-xs text-slate-400">
                    Royal Plaza Surabaya
                  </div>
                </div>

                <button
                  onClick={() => setMobilePanel((value) => !value)}
                  className="rounded-xl bg-slate-100 px-4 py-2 text-xs font-bold text-slate-600 lg:hidden"
                >
                  {mobilePanel ? "Hide Controls" : "Show Controls"}
                </button>
              </div>

              {/* MAP AREA */}
              
               <div className="relative overflow-hidden bg-slate-200">
                <img
                  src={mapImages[floor]}
                  alt={`Royal Plaza ${floorNames[floor]} floor plan`}
                  className="block h-auto w-full select-none object-contain"
                />

            
                {/* POI MARKERS */}
                {pois
                  .filter((poi) => poi.floor === floor)
                  .map((poi) => {
                    const active = selectedPOI?.id === poi.id

                    return (
                      <button
                        key={poi.id}
                        onClick={() => handlePOIClick(poi)}
                        style={{
                          left: `${poi.x}%`,
                          top: `${poi.y}%`,
                        }}
                        className={`absolute -translate-x-1/2 -translate-y-1/2 transition ${
                          active ? "z-30 scale-125" : "z-20"
                        }`}
                      >
                        <div
                          className={`flex h-8 w-8 items-center justify-center rounded-full border-2 border-white text-xs shadow-lg ${
                            active
                              ? "bg-cyan-500 text-white"
                              : "bg-slate-950 text-white"
                          }`}
                        >
                          ●
                        </div>

                        {active && (
                          <div className="absolute left-1/2 top-9 -translate-x-1/2 whitespace-nowrap rounded-lg bg-slate-950 px-3 py-1.5 text-[10px] font-bold text-white shadow-lg">
                            {poi.name}
                          </div>
                        )}
                      </button>
                    )
                  })}

                {/* CURRENT POSITION */}
                {navigation && currentRouteNode && (
                  <div
                    style={{
                      left: `${currentRouteNode.x}%`,
                      top: `${currentRouteNode.y}%`,
                    }}
                    className="absolute z-40 -translate-x-1/2 -translate-y-1/2"
                  >
                    <div className="relative">
                      <div className="absolute -inset-3 animate-ping rounded-full bg-cyan-400/30" />

                      <div className="relative flex h-7 w-7 items-center justify-center rounded-full border-4 border-white bg-cyan-500 shadow-xl">
                        <div className="h-2 w-2 rounded-full bg-white" />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* MAP FOOTER */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 px-5 py-4">
                <div className="flex items-center gap-4 text-xs text-slate-400">
                  <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-slate-950" />
                    Destination
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-cyan-500" />
                    Current Position
                  </div>
                </div>

                <div className="text-xs font-semibold text-slate-400">
                  {pois.filter((poi) => poi.floor === floor).length} locations
                </div>
              </div>
            </div>

            {/* FEATURE CARDS */}
            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              <div className="rounded-2xl bg-white p-4 shadow-sm">
                <div className="text-lg">🧭</div>
                <div className="mt-2 text-sm font-bold">
                  Indoor Navigation
                </div>
                <div className="mt-1 text-xs leading-5 text-slate-400">
                  Find destinations across multiple floors.
                </div>
              </div>

              <div className="rounded-2xl bg-white p-4 shadow-sm">
                <div className="text-lg">♿</div>
                <div className="mt-2 text-sm font-bold">
                  Accessible Route
                </div>
                <div className="mt-1 text-xs leading-5 text-slate-400">
                  Support routes using accessible connectors.
                </div>
              </div>

              <div className="rounded-2xl bg-white p-4 shadow-sm">
                <div className="text-lg">✦</div>
                <div className="mt-2 text-sm font-bold">AI Assistant</div>
                <div className="mt-1 text-xs leading-5 text-slate-400">
                  Ask MallWay where you want to go.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AI MODAL */}
      {assistantOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-[2rem] bg-white p-6 shadow-2xl">
            <div className="flex items-start justify-between">
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-cyan-500">
                  MallWay AI
                </div>

                <div className="mt-1 text-xl font-black text-slate-900">
                  How can I help?
                </div>
              </div>

              <button
                onClick={() => setAssistantOpen(false)}
                className="rounded-full bg-slate-100 px-3 py-2 text-sm text-slate-500"
              >
                ✕
              </button>
            </div>

            <div className="mt-5 rounded-2xl bg-slate-50 p-4 text-sm leading-6 text-slate-600">
              {assistantMessage}
            </div>

            <div className="mt-4 flex gap-2">
              <input
                value={assistantInput}
                onChange={(e) => setAssistantInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") askAssistant()
                }}
                placeholder="Ask MallWay..."
                className="min-w-0 flex-1 rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-cyan-400"
              />

              <button
                onClick={askAssistant}
                className="rounded-xl bg-slate-950 px-4 py-3 text-sm font-bold text-white"
              >
                Ask
              </button>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              <button
                onClick={() => {
                  setAssistantInput("Take me to Royal 21")
                }}
                className="rounded-full bg-slate-100 px-3 py-2 text-xs font-semibold text-slate-600"
              >
                Royal 21
              </button>

              <button
                onClick={() => {
                  setAssistantInput("Take me there without stairs")
                }}
                className="rounded-full bg-slate-100 px-3 py-2 text-xs font-semibold text-slate-600"
              >
                Without stairs
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}