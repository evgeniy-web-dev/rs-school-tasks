console.log('✔ map.js is linked')

mapboxgl.accessToken = 'pk.eyJ1IjoidGFuZXJvcyIsImEiOiJja3VtaDJ1eTQwZWlpMnZwMXR0MHRrbG4zIn0.jASSPXML7wpNDvysJiWYNw'
const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v11',
  center: [2.336342, 48.86094],
  zoom: 16,
})

const centerMarker = new mapboxgl.Marker({ color: 'black' }).setLngLat([2.3364, 48.8609]).addTo(map)
const topMarker = new mapboxgl.Marker({ color: 'grey' }).setLngLat([2.3365, 48.8625]).addTo(map)
const leftMarker = new mapboxgl.Marker({ color: 'grey' }).setLngLat([2.333, 48.8619]).addTo(map)
const rightMarker = new mapboxgl.Marker({ color: 'grey' }).setLngLat([2.3397, 48.8607]).addTo(map)
const bottomMarker = new mapboxgl.Marker({ color: 'grey' }).setLngLat([2.3333, 48.8602]).addTo(map)

map.addControl(new mapboxgl.NavigationControl())