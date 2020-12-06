export default createGeojson = (data) => {
        let dummyGeojson = {
            "type": "FeatureCollection",
            "features": [
            ]
        };

        data.forEach(home => {
            let feature = {
                "type": "Feature",
                "properties": home,
                "geometry": {
                  "type": "Point",
                  "coordinates": [home.longitude, home.latitude]
                }
            }

            dummyGeojson.features.push(feature)
        });

        return dummyGeojson;
}