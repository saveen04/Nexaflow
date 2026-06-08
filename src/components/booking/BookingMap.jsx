"use client"
import { useEffect, useState } from "react"
import { MapContainer, TileLayer, Marker, Polyline, useMap } from "react-leaflet"
import L from "leaflet"
import "leaflet/dist/leaflet.css"

function MapContent({ source, destination, route, icon }) {
  const map = useMap()
  const [ready, setReady] = useState(false)

  useEffect(() => {
    if (map) {
      setReady(true)
      // Force a resize check to avoid initialization errors
      map.invalidateSize()
    }
  }, [map])

  if (!ready || !map) return null

  return (
    <>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {source && source.length === 2 && (
        <Marker position={source} icon={icon} />
      )}
      {destination && destination.length === 2 && (
        <Marker position={destination} icon={icon} />
      )}
      {route && route.length > 0 && (
        <Polyline positions={route} color="#a3e635" weight={4} dashArray="10, 10" />
      )}
    </>
  )
}

function MapUpdater({ center }) {
  const map = useMap()
  useEffect(() => {
    if (center && map) {
      map.setView(center, map.getZoom())
    }
  }, [center, map])
  return null
}

export default function BookingMap({ source, destination, route }) {
  const [mounted, setMounted] = useState(false)
  const [icon, setIcon] = useState(null)

  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true)
      if (typeof window !== "undefined") {
        setIcon(L.icon({
          iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
          shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
          iconSize: [25, 41],
          iconAnchor: [12, 41]
        }))
      }
    }, 100) // Small delay to ensure DOM is settled
    return () => clearTimeout(timer)
  }, [])

  if (!mounted || !icon) return (
    <div className="w-full h-full bg-[#0a0a0a] animate-pulse rounded-2xl flex items-center justify-center text-[9px] font-black uppercase tracking-[0.4em] text-white/20">
      Initializing Neural Map...
    </div>
  )

  const center = source || [12.9716, 77.5946]
  
  return (
    <MapContainer 
      center={center} 
      zoom={source && destination ? 5 : 13} 
      className="w-full h-full rounded-2xl"
      zoomControl={false}
      scrollWheelZoom={false}
      style={{ height: '100%', width: '100%' }}
    >
      <MapContent source={source} destination={destination} route={route} icon={icon} />
      <MapUpdater center={center} />
    </MapContainer>
  )
}
