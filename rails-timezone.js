/*!
 * rails-timezone.js
 * https://github.com/davidwood/rails-timezone-js
 *
 * Copyright (c) 2013 David Wood <bitprobe@gmail.com>
 * Licensed under The MIT License
 * http://opensource.org/licenses/MIT
 */
(function() {

  // Keys are Rails TimeZone names, values are TZInfo identifiers.
  // Source: https://github.com/rails/rails/blob/master/activesupport/lib/active_support/values/time_zone.rb
  var MAPPING = {
    "International Date Line West" : "Etc/GMT+12",
    "Midway Island"                : "Pacific/Midway",
    "American Samoa"               : "Pacific/Pago_Pago",
    "Hawaii"                       : "Pacific/Honolulu",
    "Alaska"                       : "America/Juneau",
    "Pacific Time (US & Canada)"   : "America/Los_Angeles",
    "Tijuana"                      : "America/Tijuana",
    "Mountain Time (US & Canada)"  : "America/Denver",
    "Arizona"                      : "America/Phoenix",
    "Chihuahua"                    : "America/Chihuahua",
    "Mazatlan"                     : "America/Mazatlan",
    "Central Time (US & Canada)"   : "America/Chicago",
    "Saskatchewan"                 : "America/Regina",
    "Guadalajara"                  : "America/Mexico_City",
    "Mexico City"                  : "America/Mexico_City",
    "Monterrey"                    : "America/Monterrey",
    "Central America"              : "America/Guatemala",
    "Eastern Time (US & Canada)"   : "America/New_York",
    "Indiana (East)"               : "America/Indiana/Indianapolis",
    "Bogota"                       : "America/Bogota",
    "Lima"                         : "America/Lima",
    "Quito"                        : "America/Lima",
    "Atlantic Time (Canada)"       : "America/Halifax",
    "Caracas"                      : "America/Caracas",
    "La Paz"                       : "America/La_Paz",
    "Santiago"                     : "America/Santiago",
    "Newfoundland"                 : "America/St_Johns",
    "Brasilia"                     : "America/Sao_Paulo",
    "Buenos Aires"                 : "America/Argentina/Buenos_Aires",
    "Montevideo"                   : "America/Montevideo",
    "Georgetown"                   : "America/Guyana",
    "Puerto Rico"                  : "America/Puerto_Rico",
    "Greenland"                    : "America/Godthab",
    "Mid-Atlantic"                 : "Atlantic/South_Georgia",
    "Azores"                       : "Atlantic/Azores",
    "Cape Verde Is."               : "Atlantic/Cape_Verde",
    "Dublin"                       : "Europe/Dublin",
    "Edinburgh"                    : "Europe/London",
    "Lisbon"                       : "Europe/Lisbon",
    "London"                       : "Europe/London",
    "Casablanca"                   : "Africa/Casablanca",
    "Monrovia"                     : "Africa/Monrovia",
    "UTC"                          : "Etc/UTC",
    "Belgrade"                     : "Europe/Belgrade",
    "Bratislava"                   : "Europe/Bratislava",
    "Budapest"                     : "Europe/Budapest",
    "Ljubljana"                    : "Europe/Ljubljana",
    "Prague"                       : "Europe/Prague",
    "Sarajevo"                     : "Europe/Sarajevo",
    "Skopje"                       : "Europe/Skopje",
    "Warsaw"                       : "Europe/Warsaw",
    "Zagreb"                       : "Europe/Zagreb",
    "Brussels"                     : "Europe/Brussels",
    "Copenhagen"                   : "Europe/Copenhagen",
    "Madrid"                       : "Europe/Madrid",
    "Paris"                        : "Europe/Paris",
    "Amsterdam"                    : "Europe/Amsterdam",
    "Berlin"                       : "Europe/Berlin",
    "Bern"                         : "Europe/Zurich",
    "Zurich"                       : "Europe/Zurich",
    "Rome"                         : "Europe/Rome",
    "Stockholm"                    : "Europe/Stockholm",
    "Vienna"                       : "Europe/Vienna",
    "West Central Africa"          : "Africa/Algiers",
    "Bucharest"                    : "Europe/Bucharest",
    "Cairo"                        : "Africa/Cairo",
    "Helsinki"                     : "Europe/Helsinki",
    "Kyiv"                         : "Europe/Kiev",
    "Riga"                         : "Europe/Riga",
    "Sofia"                        : "Europe/Sofia",
    "Tallinn"                      : "Europe/Tallinn",
    "Vilnius"                      : "Europe/Vilnius",
    "Athens"                       : "Europe/Athens",
    "Istanbul"                     : "Europe/Istanbul",
    "Minsk"                        : "Europe/Minsk",
    "Jerusalem"                    : "Asia/Jerusalem",
    "Harare"                       : "Africa/Harare",
    "Pretoria"                     : "Africa/Johannesburg",
    "Kaliningrad"                  : "Europe/Kaliningrad",
    "Moscow"                       : "Europe/Moscow",
    "St. Petersburg"               : "Europe/Moscow",
    "Volgograd"                    : "Europe/Volgograd",
    "Samara"                       : "Europe/Samara",
    "Kuwait"                       : "Asia/Kuwait",
    "Riyadh"                       : "Asia/Riyadh",
    "Nairobi"                      : "Africa/Nairobi",
    "Baghdad"                      : "Asia/Baghdad",
    "Tehran"                       : "Asia/Tehran",
    "Abu Dhabi"                    : "Asia/Muscat",
    "Muscat"                       : "Asia/Muscat",
    "Baku"                         : "Asia/Baku",
    "Tbilisi"                      : "Asia/Tbilisi",
    "Yerevan"                      : "Asia/Yerevan",
    "Kabul"                        : "Asia/Kabul",
    "Ekaterinburg"                 : "Asia/Yekaterinburg",
    "Islamabad"                    : "Asia/Karachi",
    "Karachi"                      : "Asia/Karachi",
    "Tashkent"                     : "Asia/Tashkent",
    "Chennai"                      : "Asia/Kolkata",
    "Kolkata"                      : "Asia/Kolkata",
    "Mumbai"                       : "Asia/Kolkata",
    "New Delhi"                    : "Asia/Kolkata",
    "Kathmandu"                    : "Asia/Kathmandu",
    "Astana"                       : "Asia/Dhaka",
    "Dhaka"                        : "Asia/Dhaka",
    "Sri Jayawardenepura"          : "Asia/Colombo",
    "Almaty"                       : "Asia/Almaty",
    "Novosibirsk"                  : "Asia/Novosibirsk",
    "Rangoon"                      : "Asia/Rangoon",
    "Bangkok"                      : "Asia/Bangkok",
    "Hanoi"                        : "Asia/Bangkok",
    "Jakarta"                      : "Asia/Jakarta",
    "Krasnoyarsk"                  : "Asia/Krasnoyarsk",
    "Beijing"                      : "Asia/Shanghai",
    "Chongqing"                    : "Asia/Chongqing",
    "Hong Kong"                    : "Asia/Hong_Kong",
    "Urumqi"                       : "Asia/Urumqi",
    "Kuala Lumpur"                 : "Asia/Kuala_Lumpur",
    "Singapore"                    : "Asia/Singapore",
    "Taipei"                       : "Asia/Taipei",
    "Perth"                        : "Australia/Perth",
    "Irkutsk"                      : "Asia/Irkutsk",
    "Ulaanbaatar"                  : "Asia/Ulaanbaatar",
    "Seoul"                        : "Asia/Seoul",
    "Osaka"                        : "Asia/Tokyo",
    "Sapporo"                      : "Asia/Tokyo",
    "Tokyo"                        : "Asia/Tokyo",
    "Yakutsk"                      : "Asia/Yakutsk",
    "Darwin"                       : "Australia/Darwin",
    "Adelaide"                     : "Australia/Adelaide",
    "Canberra"                     : "Australia/Melbourne",
    "Melbourne"                    : "Australia/Melbourne",
    "Sydney"                       : "Australia/Sydney",
    "Brisbane"                     : "Australia/Brisbane",
    "Hobart"                       : "Australia/Hobart",
    "Vladivostok"                  : "Asia/Vladivostok",
    "Guam"                         : "Pacific/Guam",
    "Port Moresby"                 : "Pacific/Port_Moresby",
    "Magadan"                      : "Asia/Magadan",
    "Srednekolymsk"                : "Asia/Srednekolymsk",
    "Solomon Is."                  : "Pacific/Guadalcanal",
    "New Caledonia"                : "Pacific/Noumea",
    "Fiji"                         : "Pacific/Fiji",
    "Kamchatka"                    : "Asia/Kamchatka",
    "Marshall Is."                 : "Pacific/Majuro",
    "Auckland"                     : "Pacific/Auckland",
    "Wellington"                   : "Pacific/Auckland",
    "Nuku'alofa"                   : "Pacific/Tongatapu",
    "Tokelau Is."                  : "Pacific/Fakaofo",
    "Chatham Is."                  : "Pacific/Chatham",
    "Samoa"                        : "Pacific/Apia"
  };

  var api = {

    // Convert from a Rails TimeZone name
    from: function(value) {
      return MAPPING[value];
    },

    // Convert to a Rails TimeZone name
    to: function(value) {
      for (var key in MAPPING) {
        if (MAPPING[key] === value) return key;
      }
    },

    list: function() {
      var list = [];
      for (var key in MAPPING) {
        list.push(key);
      }
      return list;
    },
  };

  if (typeof module !== 'undefined' && Object(module) === module) {
    // node.js / CommonJS
    module.exports = api;
  } else {
    // Export as a top level object
    this.RailsTimeZone = api;
  }

}).call(this);
