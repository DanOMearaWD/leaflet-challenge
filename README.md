# Earthquake Data Visualization with Leaflet 🌍

Explore earthquake data from the past week through an interactive map built with [Leaflet.js](https://leafletjs.com/). This project visualizes data from the [USGS Earthquake API](https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson), displaying earthquake locations, magnitudes, and depths dynamically.

🌐 [**Live Demo**](https://danomearawd.github.io/leaflet-challenge/)

## 🚀 Features

- **Interactive Map**: Visualizes earthquake data dynamically.
- **Dynamic Markers**:
  - Size scales with earthquake magnitude.
  - Color reflects earthquake depth.
- **Tooltips**: Provide earthquake details (magnitude, depth, location) on click.
- **Legend**: Explains marker colors based on depth levels.

## 📂 Project Structure

```plaintext
leaflet-challenge/
├── index.html                     # Entry point for the web app
├── Leaflet-Part-1/
│   └── static/
│       ├── css/
│       │   └── style.css          # Custom styles for the map
│       └── js/
│           └── logic.js           # JavaScript logic for fetching and visualizing earthquake data
```

## 🛠️ Technologies Used

- **HTML/CSS**: Markup and styling to structure and design the webpage and map layout.
- **JavaScript**: Programming language used to implement the functionality for fetching, processing, and displaying earthquake data on the map.
- **Leaflet.js**: A JavaScript library for creating interactive maps, used to visualize the earthquake data.
- **D3.js**: A JavaScript library for manipulating documents based on data, used for loading and displaying the GeoJSON earthquake data.
- **GeoJSON**: A format used for encoding geographic data structures, used to represent the earthquake data.
