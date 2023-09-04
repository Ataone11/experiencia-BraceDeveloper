import { Location } from "aws-sdk";
import AWS from "aws-sdk/global";
import { Map } from "maplibre-gl";
import { Signer } from "@aws-amplify/core";

// AWS Resources
// Cognito:
const identityPoolId = "us-east-1:1c0ab87f-b06a-4173-8e83-72063b36fb82";

// Amazon Location Service:
export const MAP_NAME = "GoAmplifyMap";
const placesName = "GoAmplifyIndex";

// Extract the region from the Identity Pool ID
AWS.config.region = identityPoolId.split(":")[0];

const credentials = new AWS.CognitoIdentityCredentials({
    IdentityPoolId: identityPoolId,
});

// Sign requests made by MapLibre GL JS using AWS SigV4:
export const transformRequest = (url: string, resourceType: any) => {
    if (resourceType === "Style" && !url.includes("://")) {
        // Resolve to an AWS URL
        url = `https://maps.geo.${AWS.config.region}.amazonaws.com/maps/v0/maps/${url}/style-descriptor`;
    }

    if (url.includes("amazonaws.com")) {
        // Sign AWS requests (with the signature as part of the query string)
        return {
            url: Signer.signUrl(url, {
                access_key: credentials.accessKeyId,
                secret_key: credentials.secretAccessKey,
                session_token: credentials.sessionToken,
            }),
        };
    }

    // If not amazonaws.com, falls to here without signing
    return { url };
};

export const initializeMap = async () => {
    // Load credentials and set them up to refresh
    await credentials.getPromise();

    // Initialize the map
    const mlglMap = new Map({
        container: "map", // HTML element ID of map element
        center: [-74.09297263093944, 4.663252353581347], // Initial map centerpoint
        zoom: 4, // Initial map zoom
        style: MAP_NAME,
        transformRequest,
    });

    return mlglMap;
};

export const main = async (searchCallback: any) => {
    // Initialize map and AWS SDK for Location Service:
    const map = await initializeMap();
    const location = new Location({ credentials, region: AWS.config.region });

    // On mouse click, display marker and get results:
    map.on("click", (e) => {
        // Set up parameters for search call
        let params: Location.SearchPlaceIndexForPositionRequest = {
            IndexName: placesName,
            Position: [e.lngLat.lng, e.lngLat.lat],
            Language: "en",
            MaxResults: 5,
        };

        //Search for results around clicked point
        location.searchPlaceIndexForPosition(params, (err, data) => {
            if (err) {
                // Write JSON response error to HTML
                console.log(JSON.stringify(err, undefined, 2));
            } else {
                // Write JSON response data to HTML
                searchCallback(data);
            }
        });
    });

    return map;
};

export const searchPlaceSuggestions = (text: string, searchCallback: (results: any[]) => void, longitude?: number, latitude?: number) => {
    const location = new Location({ credentials, region: AWS.config.region });

    let params: Location.SearchPlaceIndexForTextRequest = {
        IndexName: placesName,
        Text: text,
        BiasPosition: longitude && latitude ? [longitude, latitude] : [-74.09297263093944, 4.663252353581347]
    };

    // Search for results around clicked point
    location.searchPlaceIndexForText(params, (err, data) => {
        if (err) {
            // Write JSON response error to HTML
            console.log(JSON.stringify(err, undefined, 2));
        } else {
            // Write JSON response data to HTML
            searchCallback(data.Results);
        }
    });

}