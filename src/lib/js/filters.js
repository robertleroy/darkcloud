
export function titlecase(value) {
  if (!value) return '';
  value = value.toString().toLowerCase();
  return value.replace(/(^|\s)\S/g, function(t) { return t.toUpperCase() });
}

export function sentencecase(value) {
  if (!value) return ''
  value = value.toString()  ;
    return value.toLowerCase().replace(/(^\s*\w|[.!?]\s*\w)/g,function(c){return c.toUpperCase()});
}

export function round(num,d = 0) {
  return Math.round((num) * (Math.pow(10, d))) / (Math.pow(10, d));
} /* round(3.14159265359,2) */

export function addDays(d,n) {
  const dt = new Date(d);
  dt.setDate(dt.getDate() + n);
  return dt;
} /* addDays(new Date(), 1) */

export function mmToInches(mm) {
  return (mm / 25.4);
}


// export const weatherCodes = {
//   0: "Unknown",
//   1000: "Clear, Sunny",
//   1001: "Cloudy",
//   1100: "Mostly Clear",
//   1101: "Partly Cloudy",
//   1102: "Mostly Cloudy",
//   2000: "Fog",
//   2100: "Light Fog",
//   4000: "Drizzle",
//   4001: "Rain",
//   4200: "Light Rain",
//   4201: "Heavy Rain",
//   5000: "Snow",
//   5001: "Flurries",
//   5100: "Light Snow",
//   5101: "Heavy Snow",
//   6000: "Freezing Drizzle",
//   6001: "Freezing Rain",
//   6200: "Light Freezing Rain",
//   6201: "Heavy Freezing Rain",
//   7000: "Ice Pellets",
//   7101: "Heavy Ice Pellets",
//   7102: "Light Ice Pellets",
//   8000: "Thunderstorm"
// }

// export const conditions = {
//   0: "cloudy",
//   1000: "clear",
//   1001: "cloudy",
//   1100: "partly cloudy",
//   1101: "partly cloudy",
//   1102: "mostly cloudy",
//   2000: "fog",
//   2100: "fog",
//   4000: "drizzle",
//   4001: "rain",
//   4200: "drizzle",
//   4201: "rain",
//   5000: "snow",
//   5001: "flurries",
//   5100: "flurries",
//   5101: "snow",
//   6000: "sleet",
//   6001: "sleet",
//   6200: "sleet",
//   6201: "sleet",
//   7000: "sleet",
//   7101: "sleet",
//   7102: "sleet",
//   8000: "thunderstorm"
// };

// export const summaries = {
//   0: "cloudy",
//   1000: "clear",
//   1001: "cloudy",
//   1100: "partly cloudy",
//   1101: "partly cloudy",
//   1102: "mostly cloudy",
//   2000: "fog",
//   2100: "fog",
//   4000: "light rain",
//   4001: "rain",
//   4200: "light rain",
//   4201: "rain",
//   5000: "snow",
//   5001: "flurries",
//   5100: "flurries",
//   5101: "snow",
//   6000: "sleet",
//   6001: "sleet",
//   6200: "sleet",
//   6201: "sleet",
//   7000: "sleet",
//   7101: "sleet",
//   7102: "sleet",
//   8000: "thunderstorm"
// };


// export const dayCodes = {
//   0: "cloudy",
//   1000: "clear-day",
//   1001: "cloudy",
//   1100: "partly-cloudy-day",
//   1101: "partly-cloudy-day",
//   1102: "mostly-cloudy-day",
//   2000: "fog",
//   2100: "fog",
//   4000: "drizzle",
//   4001: "rain",
//   4200: "drizzle",
//   4201: "rain",
//   5000: "snow",
//   5001: "flurries",
//   5100: "flurries",
//   5101: "snow",
//   6000: "sleet",
//   6001: "sleet",
//   6200: "sleet",
//   6201: "sleet",
//   7000: "sleet",
//   7101: "sleet",
//   7102: "sleet",
//   8000: "thunderstorm"
// }

// export const nightCodes = {
//   0: "cloudy",
//   1000: "clear-night",
//   1001: "cloudy",
//   1100: "partly-cloudy-night",
//   1101: "partly-cloudy-night",
//   1102: "mostly-cloudy-night",
//   2000: "fog",
//   2100: "fog",
//   4000: "drizzle",
//   4001: "rain",
//   4200: "drizzle",
//   4201: "rain",
//   5000: "snow",
//   5001: "flurries",
//   5100: "flurries",
//   5101: "snow",
//   6000: "sleet",
//   6001: "sleet",
//   6200: "sleet",
//   6201: "sleet",
//   7000: "sleet",
//   7101: "sleet",
//   7102: "sleet",
//   8000: "thunderstorm"
// }
  
export const weatherCodes = {
  conditions: {
    0: "Unknown",
    1000: "Clear, Sunny",
    1001: "Cloudy",
    1100: "Mostly Clear",
    1101: "Partly Cloudy",
    1102: "Mostly Cloudy",
    2000: "Fog",
    2100: "Light Fog",
    3000: "Light Wind",
    3001: "Wind",
    3002: "Strong Wind",
    4000: "Drizzle",
    4001: "Rain",
    4200: "Light Rain",
    4201: "Heavy Rain",
    5000: "Snow",
    5001: "Flurries",
    5100: "Light Snow",
    5101: "Heavy Snow",
    6000: "Freezing Drizzle",
    6001: "Freezing Rain",
    6200: "Light Freezing Rain",
    6201: "Heavy Freezing Rain",
    7000: "Ice Pellets",
    7101: "Heavy Ice Pellets",
    7102: "Light Ice Pellets",
    8000: "Thunderstorm"
  },
  dayCodes: {
    0: "cloudy",
    1000: "clear-day",
    1001: "cloudy",
    1100: "partly-cloudy-day",
    1101: "partly-cloudy-day",
    1102: "mostly-cloudy-day",
    2000: "fog",
    2100: "fog",
    3000: "wind",
    3001: "wind",
    3002: "wind",
    4000: "drizzle",
    4001: "rain",
    4200: "drizzle",
    4201: "rain",
    5000: "snow",
    5001: "flurries",
    5100: "flurries",
    5101: "snow",
    6000: "sleet",
    6001: "sleet",
    6200: "sleet",
    6201: "sleet",
    7000: "sleet",
    7101: "sleet",
    7102: "sleet",
    8000: "thunderstorm"
  },
  nightCodes: {
    0: "cloudy",
    1000: "clear-night",
    1001: "cloudy",
    1100: "partly-cloudy-night",
    1101: "partly-cloudy-night",
    1102: "mostly-cloudy-night",
    2000: "fog",
    2100: "fog",
    3000: "wind",
    3001: "wind",
    3002: "wind",
    4000: "drizzle",
    4001: "rain",
    4200: "drizzle",
    4201: "rain",
    5000: "snow",
    5001: "flurries",
    5100: "flurries",
    5101: "snow",
    6000: "sleet",
    6001: "sleet",
    6200: "sleet",
    6201: "sleet",
    7000: "sleet",
    7101: "sleet",
    7102: "sleet",
    8000: "thunderstorm"
  },
  summaries: {
    0: "cloudy",
    1000: "clear",
    1001: "cloudy",
    1100: "partly cloudy",
    1101: "partly cloudy",
    1102: "mostly cloudy",
    2000: "fog",
    2100: "fog",
    3000: "wind",
    3001: "wind",
    3002: "wind",
    4000: "light rain",
    4001: "rain",
    4200: "light rain",
    4201: "rain",
    5000: "snow",
    5001: "flurries",
    5100: "flurries",
    5101: "snow",
    6000: "sleet",
    6001: "sleet",
    6200: "sleet",
    6201: "sleet",
    7000: "sleet",
    7101: "sleet",
    7102: "sleet",
    8000: "thunderstorm"
  }
}