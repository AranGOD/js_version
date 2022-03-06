var map = L.map('map-template');
TileURL = 'https://tile.openstreetmap.org/{z}/{x}/{y}.png';
L.tileLayer(TileURL).addTo(map);

// Usamos selector para asignar el valor de la fila en un id
id = document.getElementById('id')
latitud = document.getElementById('latitud')
longitud = document.getElementById('longitud')
fecha = document.getElementById('fecha')
hora = document.getElementById('hora')  

// crea un long polling para simular un socket y pedir los datos periodicamente con un intervalos de 5seg
setInterval(() => {
    $.ajax({
        url: '/getData',
        success: function(data){
            Actualizar(data);
            UpdateMap(data);
        }
    })    

}, 1000);

function Actualizar(data){
    id.innerHTML = data[0].ID             // innerHTML establece la conexion en los id's 
    latitud.innerHTML = data[0].latitud
    longitud.innerHTML = data[0].longitud
    fecha.innerHTML = data[0].fecha.replace("T05:00:00.000Z","")
    hora.innerHTML = data[0].hora
}

function UpdateMap(data){

    Lat = data[0].latitud;
    Lon = data[0].longitud;
    map.setView([Lat,Lon],14);
    const marker = L.marker([Lat,Lon]);
    marker.bindPopup(Lat + ", "+ Lon);
    map.addLayer(marker);
}
