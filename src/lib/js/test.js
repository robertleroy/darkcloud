const fetch = require("node-fetch");
const queryString = require('query-string');
const moment = require("moment");

// set the Timelines GET endpoint as the target URL
const getTimelineURL = "https://api.tomorrow.io/v4/timelines";

// get your key from app.tomorrow.io/development/keys
const apikey = "F2Xa6m3krQz3vVj93Zy2aPZRuhgqNE6t";

// pick the location, as a latlong pair
let location = [35.5648,-97.6361];

// list the fields
const fields = [
  "weatherCode",
  "temperature",
  "temperatureApparent",
  "cloudCover",
  "cloudBase",
  "cloudCeiling",
  "humidity",
  "visibility",
  "windSpeed",
  "windGust",
  "windDirection",
  "pressureSurfaceLevel",
  "uvIndex",
  "uvHealthConcern",
  "precipitationProbability",
  "rainIntensity",
  "snowIntensity",
  "sleetIntensity",
  "freezingRainIntensity",
];

// choose the unit system, either metric or imperial
const units = "imperial";

// set the timesteps, like "current", "1h" and "1d"
const timesteps = ["1m", "1h", "1d"];

// configure the time frame up to 6 hours back and 15 days out
const now = moment.utc();
const startTime = moment.utc(now).add(0, "minutes").toISOString();
const endTime = moment.utc(now).add(5, "days").toISOString();

// specify the timezone, using standard IANA timezone format
const timezone = "America/Chicago";

// request the timelines with all the query string parameters as options
const getTimelineParameters =  queryString.stringify({
    apikey,
    location,
    fields,
    units,
    timesteps,
    startTime,
    endTime,
    timezone,
}, {arrayFormat: "comma"});

fetch(getTimelineURL + "?" + getTimelineParameters, {method: "GET", compress: true})
  .then((result) => result.json())
  .then((json) => console.log(json)
  .catch((error) => console.error("error: " + err)));

/*

---- [PREMIUM FEATURE] contact sales@tomorrow.io ----

// set the Timelines POST endpoint as the target URL
const postTimelineURL = 'https://api.tomorrow.io/v4/timelines' + "?apikey=" + apikey;

fields = {
  "precipitationIntensityMax",
  "precipitationTypeMax",
  "windSpeedAverage",
  "temperatureMin",
  "temperatureMax",
  "cloudCoverMax"
}

location = {
     "type":"Polygon",
        "coordinates":
        [[[-73.985043,40.753554],[-73.990724,40.75595],[-73.984726,40.764167],[-73.979057,40.761747],[-73.985043,40.753554]]]
      }

const postTimelineOptions = {method: 'POST', compress: true,
  				headers: { 'Content-Type': 'application/json' },
                 body: JSON.stringify({
                   location
                   fields,
                   units,
                   timesteps,
                   startTime,
                   endTime,
                   timezone
                 })};

fetch(postTimelineURL, postTimelineOptions)
  .then(res => res.json())
  .then(json => console.log(json))
  .catch(err => console.error('error: ' + err));

*/