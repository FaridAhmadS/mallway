# MallWay

### Smart Indoor Navigation for Multi-Floor Malls

> Navigate. Explore. Never Get Lost.

MallWay is a smart indoor navigation web application designed to help visitors navigate multi-floor shopping malls.

The prototype is developed using Royal Plaza Surabaya as the demonstration environment.

## Overview

Finding a specific store or facility inside a large multi-floor mall can be difficult, especially for first-time visitors.

MallWay provides an interactive indoor navigation experience that allows users to:

- Search for stores and facilities
- Explore different mall floors
- View destinations directly on floor plans
- Start indoor navigation
- Navigate across multiple floors
- Use accessible route preferences
- Ask the MallWay Assistant for navigation help
- Save parking locations

## Key Features

### 1. Interactive Indoor Map

Users can explore Royal Plaza floor plans across:

- Lower Ground (LG)
- Ground Floor (G)
- Upper Ground (UG)
- Floor 1
- Floor 2
- Floor 3

### 2. Destination Search

Users can search for stores, food outlets, entertainment venues, and other destinations.

### 3. Indoor Navigation

MallWay uses a navigation graph and A* pathfinding algorithm to calculate routes between navigation nodes.

### 4. Multi-Floor Navigation

The navigation system supports movement between floors using vertical connectors such as elevators.

### 5. Accessible Route

Users can enable an accessible navigation preference designed to prioritize accessible vertical connections.

### 6. AI Assistant

The MallWay Assistant provides a conversational interface for common navigation requests.

Example:

> Take me to Royal 21

or:

> Take me there without stairs

### 7. Parking Memory

Users can save their parking location so they can remember where their vehicle is parked.

## Technology Stack

- Next.js
- React
- TypeScript
- Tailwind CSS
- JavaScript
- GitHub
- A* Pathfinding Algorithm

## Project Structure

```text
mallway/
├── app/
│   ├── page.tsx
│   ├── layout.tsx
│   └── globals.css
│
├── data/
│   ├── pois.ts
│   └── nodes.ts
│
├── public/
│   └── maps/
│       ├── lg.jpg
│       ├── g.jpg
│       ├── ug.jpg
│       ├── floor1.jpg
│       ├── floor2.jpg
│       └── floor3.jpg
│
├── package.json
├── package-lock.json
└── README.md

Installation

Clone this repository:

git clone https://github.com/FaridAhmadS/mallway.git

Move into the project directory:

cd mallway

Install dependencies:

npm install

Run the development server:

npm run dev

Open:

http://localhost:3000
Navigation Algorithm

MallWay uses the A* pathfinding algorithm to calculate navigation paths through a graph of indoor navigation nodes.

Each node represents a navigation point such as:

Entrance
Corridor
Elevator
Escalator

The graph connects these nodes and allows MallWay to calculate a path from the user's starting position to the selected destination.

Indoor Positioning Concept

The current competition prototype uses simulated indoor positioning and navigation nodes.

For future real-world implementation, MallWay can integrate hybrid indoor positioning technologies such as:

BLE Beacons
QR Checkpoints
Smartphone Sensors
Wi-Fi Positioning
GPS for outdoor-to-indoor transition

This approach allows MallWay to evolve from a prototype into a real indoor navigation system.

Future Development

Potential improvements include:

Real-time indoor positioning
BLE beacon integration
More accurate map calibration
Dynamic route recalculation
Real AI navigation assistant
Real-time mall information
Emergency route navigation
Crowd-aware routing
Voice navigation
More detailed accessibility mapping
Project

MallWay: Smart Indoor Navigation for Multi-Floor Malls

Developed for:

International Web Technology Competition 2026

Part of:

GAYATAMA 5

License

This project is developed for educational and competition purposes.
