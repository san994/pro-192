let coordinates = {}
let places = []
let weather
let Name

$(document).ready(function(){
    get_coordinates()
    get_weather()
})

function get_coordinates(){
    let search_params = new URLSearchParams(window.location.search);

    if(search_params.has("source") && search_params.has("destination")){
        let source = search_params.get("source");
        let destination = search_params.get("destination");

        coordinates.source_lat = source.split(";")[0];
        coordinates.source_lon = source.split(";")[1];

        coordinates.destination_lat = destination.split(";")[0];
        coordinates.destination_lon = destination.split(";")[1];

        console.log(coordinates);

    }else{
        alert("cooredinates not selected")
        window.history.back()
    }
}

$(function(){
    $("#back-button").click(function(){
        window.location.href = `index.html`;
    })
})

function get_weather(){
    $.ajax({
        url:`https://api.openweathermap.org/data/2.5/weather?lat=${coordinates.destination_lat}&lon=${coordinates.destination_lon}&appid=94212e971d0ca977303f8ae892224bbd`,
        type:"get",
        success:function(response){
            weather = `${response.weather[0].main}`
            temprature = `${Math.round(response.main.temp-273)}`

            $("#scene_container").append(
                `
                   <a-entity>
                       <a-plane>
                        the weather is ${weather}
                        temprature is ${temprature}
                       </a-plane>
                   </a-entity>
                `
            )
        }
    })
}

// api kye = 94212e971d0ca977303f8ae892224bbd