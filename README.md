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
