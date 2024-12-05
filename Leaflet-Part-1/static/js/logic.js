let url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// Function to get color based on depth
function getColor(depth) {
    if (depth < 10) {
        return '#00FF00'; // Green
    } else if (depth < 21) {
        return '#80FF00'; // Lime Green
    } else if (depth < 31) {
        return '#FFFF00'; // Yellow
    } else if (depth < 41) {
        return '#FFBF00'; // Yellow-Orange
    } else if (depth < 51) {
        return '#FF8000'; // Orange-Red
    } else {
        return '#FF0000'; // Red
    }
}


// Fetch earthquake data
d3.json(url).then(function (data) {
    //SET map title for page
    map_title = d3.select('#map-title');
    let title = data.metadata.title;
    if (title) {
        map_title.html(title).style('display', 'block'); //add title to html and display
    }

    // Tile layers
    let street_tile = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        noWrap: true // Disable tile wrapping
    });

    let topo_tile = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
        attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)',
        noWrap: true // Disable tile wrapping
    });

    // Layer group for earthquake markers
    let earthquakesLayer = L.layerGroup();

    // Add GeoJSON layer for earthquakes
    L.geoJSON(data, {
        onEachFeature: function (feature, layer) {
            if (feature.geometry.type === "Point") {
                let coords = feature.geometry.coordinates;
                let lat = coords[1];
                let lng = coords[0];
                let depth = coords[2];

                // Create a circle for each earthquake
                let circle = L.circle([lat, lng], {
                    radius: feature.properties.mag * 20000,
                    color: 'black',
                    weight: 0.5,
                    fillColor: getColor(depth),
                    fillOpacity: 0.5
                })
                    .bindPopup(`
                        <strong>Location:</strong> ${feature.properties.place}<br>
                        <strong>Magnitude:</strong> ${feature.properties.mag}<br>
                        <strong>Depth:</strong> ${depth.toFixed(2)} m<br>
                        <strong>Time:</strong> ${new Date(feature.properties.time).toLocaleString()}
                    `);

                earthquakesLayer.addLayer(circle);
            }
        }
    });

    // Overlay map layers
    let overlayMaps = {
        "Earthquakes": earthquakesLayer
    };

    // Create the map object with overlay layers included in the initial setup
    let map = L.map("map", {
        center: [37, -120], // California
        zoom: 5,
        layers: [street_tile, earthquakesLayer]  // Here, we include street_tile as base layer and earthquakesLayer as overlay
    });

    // Add layer control to the map with both base and overlay layers
    L.control.layers({
        "Street Map": street_tile,
        "Topographic Map": topo_tile
    }, overlayMaps, { collapsed: false }).addTo(map);
});
