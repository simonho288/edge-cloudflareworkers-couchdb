const Router = require('./router')

/**
 * Example of how router can be used in an application
 *  */
addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

function handler(request) {
  const init = {
    headers: { 'content-type': 'application/json' },
  }
  const body = JSON.stringify({ some: 'json' })
  return new Response(body, init)
}

async function handleRequest(request) {
  let countryCode = request.headers.get('cf-ipcountry')

  const r = new Router()
  // Replace with the approriate paths and handlers
  r.get('/country-code', () => new Response(`country code: ${countryCode}`))
  r.get('/find-server', () => new Response(`nearest server: ${findNearestCdb(countryCode)}`))
  r.get('/', () => new Response('Hello worker!')) // return a default message for the root route

  const resp = await r.route(request)
  return resp
}

function findNearestCdb(countryCode) {
  // List all countries and its continent
  // Copied from: https://datahub.io/JohnSnowLabs/country-and-continent-codes-list
  const countriesContinent = {
    'AF': 'AS', // Afghanistan, Islamic Republic of
    'AL': 'EU', // Albania, Republic of
    'AQ': 'AN', // Antarctica (the territory South of 60 deg S)
    'DZ': 'AF', // Algeria, People's Democratic Republic of
    'AS': 'OC', // American Samoa
    'AD': 'EU', // Andorra, Principality of
    'AO': 'AF', // Angola, Republic of
    'AG': 'NA', // Antigua and Barbuda
    'AZ': 'EU', // Azerbaijan, Republic of	
    'AR': 'SA', // Argentina, Argentine Republic
    'AU': 'OC', // Australia, Commonwealth of
    'AT': 'EU', // Austria, Republic of
    'BS': 'NA', // Bahamas, Commonwealth of the
    'BH': 'AS', // Bahrain, Kingdom of
    'BD': 'AS', // Bangladesh, People's Republic of
    'AM': 'EU', // Armenia, Republic of
    'BB': 'NA', // Barbados
    'BE': 'EU', // Belgium, Kingdom of
    'BM': 'NA', // Bermuda
    'BT': 'AS', // Bhutan, Kingdom of
    'BO': 'SA', // Bolivia, Republic of
    'BA': 'EU', // Bosnia and Herzegovina
    'BW': 'AF', // Botswana, Republic of
    'BV': 'AN', // Bouvet Island (Bouvetoya)
    'BR': 'SA', // Brazil, Federative Republic of
    'BZ': 'NA', // Belize
    'IO': 'AS', // British Indian Ocean Territory (Chagos Archipelago)
    'SB': 'OC', // Solomon Islands
    'VG': 'NA', // British Virgin Islands
    'BN': 'AS', // Brunei Darussalam
    'BG': 'EU', // Bulgaria, Republic of
    'MM': 'AS', // Myanmar, Union of
    'BI': 'AF', // Burundi, Republic of
    'BY': 'EU', // Belarus, Republic of
    'KH': 'AS', // Cambodia, Kingdom of
    'CM': 'AF', // Cameroon, Republic of
    'CA': 'NA', // Canada
    'CV': 'AF', // Cape Verde, Republic of
    'KY': 'NA', // Cayman Islands
    'CF': 'AF', // Central African Republic
    'LK': 'AS', // Sri Lanka, Democratic Socialist Republic of
    'TD': 'AF', // Chad, Republic of
    'CL': 'SA', // Chile, Republic of
    'CN': 'AS', // China, People's Republic of
    'TW': 'AS', // Taiwan
    'CX': 'AS', // Christmas Island
    'CC': 'AS', // Cocos (Keeling) Islands
    'CO': 'SA', // Colombia, Republic of
    'KM': 'AF', // Comoros, Union of the
    'YT': 'AF', // Mayotte
    'CG': 'AF', // Congo, Republic of the
    'CD': 'AF', // Congo, Democratic Republic of the
    'CK': 'OC', // Cook Islands
    'CR': 'NA', // Costa Rica, Republic of
    'HR': 'EU', // Croatia, Republic of
    'CU': 'NA', // Cuba, Republic of
    'CY': 'EU', // Cyprus, Republic of
    'CZ': 'EU', // Czech Republic
    'BJ': 'AF', // Benin, Republic of
    'DK': 'EU', // Denmark, Kingdom of
    'DM': 'NA', // Dominica, Commonwealth of
    'DO': 'NA', // Dominican Republic
    'EC': 'SA', // Ecuador, Republic of
    'SV': 'NA', // El Salvador, Republic of
    'GQ': 'AF', // Equatorial Guinea, Republic of
    'ET': 'AF', // Ethiopia, Federal Democratic Republic of
    'ER': 'AF', // Eritrea, State of
    'EE': 'EU', // Estonia, Republic of
    'FO': 'EU', // Faroe Islands
    'FK': 'SA', // Falkland Islands (Malvinas)
    'GS': 'AN', // South Georgia and the South Sandwich Islands
    'FJ': 'OC', // Fiji, Republic of the Fiji Islands
    'FI': 'EU', // Finland, Republic of
    'AX': 'EU', // Åland Islands
    'FR': 'EU', // France, French Republic
    'GF': 'SA', // French Guiana
    'PF': 'OC', // French Polynesia
    'TF': 'AN', // French Southern Territories
    'DJ': 'AF', // Djibouti, Republic of
    'GA': 'AF', // Gabon, Gabonese Republic
    'GE': 'EU', // Georgia
    'GM': 'AF', // Gambia, Republic of the
    'PS': 'AS', // Palestinian Territory, Occupied
    'DE': 'EU', // Germany, Federal Republic of
    'GH': 'AF', // Ghana, Republic of
    'GI': 'EU', // Gibraltar
    'KI': 'OC', // Kiribati, Republic of
    'GR': 'EU', // Greece, Hellenic Republic
    'GL': 'NA', // Greenland
    'GD': 'NA', // Grenada
    'GP': 'NA', // Guadeloupe
    'GU': 'OC', // Guam
    'GT': 'NA', // Guatemala, Republic of
    'GN': 'AF', // Guinea, Republic of
    'GY': 'SA', // Guyana, Co-operative Republic of
    'HT': 'NA', // Haiti, Republic of
    'HM': 'AN', // Heard Island and McDonald Islands
    'VA': 'EU', // Holy See (Vatican City State)
    'HN': 'NA', // Honduras, Republic of
    'HK': 'AS', // Hong Kong, Special Administrative Region of China
    'HU': 'EU', // Hungary, Republic of
    'IS': 'EU', // Iceland, Republic of
    'IN': 'AS', // India, Republic of
    'ID': 'AS', // Indonesia, Republic of
    'IR': 'AS', // Iran, Islamic Republic of
    'IQ': 'AS', // Iraq, Republic of
    'IE': 'EU', // Ireland
    'IL': 'AS', // Israel, State of
    'IT': 'EU', // Italy, Italian Republic
    'CI': 'AF', // Cote d'Ivoire, Republic of
    'JM': 'NA', // Jamaica
    'JP': 'AS', // Japan
    'KZ': 'EU', // Kazakhstan, Republic of
    'JO': 'AS', // Jordan, Hashemite Kingdom of
    'KE': 'AF', // Kenya, Republic of
    'KP': 'AS', // Korea, Democratic People's Republic of
    'KR': 'AS', // Korea, Republic of
    'KW': 'AS', // Kuwait, State of
    'KG': 'AS', // Kyrgyz Republic
    'LA': 'AS', // Lao People's Democratic Republic
    'LB': 'AS', // Lebanon, Lebanese Republic
    'LS': 'AF', // Lesotho, Kingdom of
    'LV': 'EU', // Latvia, Republic of
    'LR': 'AF', // Liberia, Republic of
    'LY': 'AF', // Libyan Arab Jamahiriya
    'LI': 'EU', // Liechtenstein, Principality of
    'LT': 'EU', // Lithuania, Republic of
    'LU': 'EU', // Luxembourg, Grand Duchy of
    'MO': 'AS', // Macao, Special Administrative Region of China
    'MG': 'AF', // Madagascar, Republic of
    'MW': 'AF', // Malawi, Republic of
    'MY': 'AS', // Malaysia
    'MV': 'AS', // Maldives, Republic of
    'ML': 'AF', // Mali, Republic of
    'MT': 'EU', // Malta, Republic of
    'MQ': 'NA', // Martinique
    'MR': 'AF', // Mauritania, Islamic Republic of
    'MU': 'AF', // Mauritius, Republic of
    'MX': 'NA', // Mexico, United Mexican States
    'MC': 'EU', // Monaco, Principality of
    'MN': 'AS', // Mongolia
    'MD': 'EU', // Moldova, Republic of
    'ME': 'EU', // Montenegro, Republic of
    'MS': 'NA', // Montserrat
    'MA': 'AF', // Morocco, Kingdom of
    'MZ': 'AF', // Mozambique, Republic of
    'OM': 'AS', // Oman, Sultanate of
    'NA': 'AF', // Namibia, Republic of
    'NR': 'OC', // Nauru, Republic of
    'NP': 'AS', // Nepal, State of
    'NL': 'EU', // Netherlands, Kingdom of the
    'AN': 'NA', // Netherlands Antilles
    'CW': 'NA', // Curaçao
    'AW': 'NA', // Aruba
    'SX': 'NA', // Sint Maarten (Netherlands)
    'BQ': 'NA', // Bonaire, Sint Eustatius and Saba
    'NC': 'OC', // New Caledonia
    'VU': 'OC', // Vanuatu, Republic of
    'NZ': 'OC', // New Zealand
    'NI': 'NA', // Nicaragua, Republic of
    'NE': 'AF', // Niger, Republic of
    'NG': 'AF', // Nigeria, Federal Republic of
    'NU': 'OC', // Niue
    'NF': 'OC', // Norfolk Island
    'NO': 'EU', // Norway, Kingdom of
    'MP': 'OC', // Northern Mariana Islands, Commonwealth of the
    'UM': 'OC', // United States Minor Outlying Islands
    'FM': 'OC', // Micronesia, Federated States of
    'MH': 'OC', // Marshall Islands, Republic of the
    'PW': 'OC', // Palau, Republic of
    'PK': 'AS', // Pakistan, Islamic Republic of
    'PA': 'NA', // Panama, Republic of
    'PG': 'OC', // Papua New Guinea, Independent State of
    'PY': 'SA', // Paraguay, Republic of
    'PE': 'SA', // Peru, Republic of
    'PH': 'AS', // Philippines, Republic of the
    'PN': 'OC', // Pitcairn Islands
    'PL': 'EU', // Poland, Republic of
    'PT': 'EU', // Portugal, Portuguese Republic
    'GW': 'AF', // Guinea-Bissau, Republic of
    'TL': 'AS', // Timor-Leste, Democratic Republic of
    'PR': 'NA', // Puerto Rico, Commonwealth of
    'QA': 'AS', // Qatar, State of
    'RE': 'AF', // Reunion
    'RO': 'EU', // Romania
    'RU': 'EU', // Russian Federation
    'RW': 'AF', // Rwanda, Republic of
    'BL': 'NA', // Saint Barthelemy
    'SH': 'AF', // Saint Helena
    'KN': 'NA', // Saint Kitts and Nevis, Federation of
    'AI': 'NA', // Anguilla
    'LC': 'NA', // Saint Lucia
    'MF': 'NA', // Saint Martin
    'PM': 'NA', // Saint Pierre and Miquelon
    'VC': 'NA', // Saint Vincent and the Grenadines
    'SM': 'EU', // San Marino, Republic of
    'ST': 'AF', // Sao Tome and Principe, Democratic Republic of
    'SA': 'AS', // Saudi Arabia, Kingdom of
    'SN': 'AF', // Senegal, Republic of
    'RS': 'EU', // Serbia, Republic of
    'SC': 'AF', // Seychelles, Republic of
    'SL': 'AF', // Sierra Leone, Republic of
    'SG': 'AS', // Singapore, Republic of
    'SK': 'EU', // Slovakia (Slovak Republic)
    'VN': 'AS', // Vietnam, Socialist Republic of
    'SI': 'EU', // Slovenia, Republic of
    'SO': 'AF', // Somalia, Somali Republic
    'ZA': 'AF', // South Africa, Republic of
    'ZW': 'AF', // Zimbabwe, Republic of
    'ES': 'EU', // Spain, Kingdom of
    'SS': 'AF', // South Sudan
    'EH': 'AF', // Western Sahara
    'SD': 'AF', // Sudan, Republic of
    'SR': 'SA', // Suriname, Republic of
    'SJ': 'EU', // Svalbard & Jan Mayen Islands
    'SZ': 'AF', // Swaziland, Kingdom of
    'SE': 'EU', // Sweden, Kingdom of
    'CH': 'EU', // Switzerland, Swiss Confederation
    'SY': 'AS', // Syrian Arab Republic
    'TJ': 'AS', // Tajikistan, Republic of
    'TH': 'AS', // Thailand, Kingdom of
    'TG': 'AF', // Togo, Togolese Republic
    'TK': 'OC', // Tokelau
    'TO': 'OC', // Tonga, Kingdom of
    'TT': 'NA', // Trinidad and Tobago, Republic of
    'AE': 'AS', // United Arab Emirates
    'TN': 'AF', // Tunisia, Tunisian Republic
    'TR': 'EU', // Turkey, Republic of
    'TM': 'AS', // Turkmenistan
    'TC': 'NA', // Turks and Caicos Islands
    'TV': 'OC', // Tuvalu
    'UG': 'AF', // Uganda, Republic of
    'UA': 'EU', // Ukraine
    'MK': 'EU', // Macedonia, The Former Yugoslav Republic of
    'EG': 'AF', // Egypt, Arab Republic of
    'GB': 'EU', // United Kingdom of Great Britain & Northern Ireland
    'GG': 'EU', // Guernsey, Bailiwick of
    'JE': 'EU', // Jersey, Bailiwick of
    'IM': 'EU', // Isle of Man
    'TZ': 'AF', // Tanzania, United Republic of
    'US': 'NA', // United States of America
    'VI': 'NA', // United States Virgin Islands
    'BF': 'AF', // Burkina Faso
    'UY': 'SA', // Uruguay, Eastern Republic of
    'UZ': 'AS', // Uzbekistan, Republic of
    'VE': 'SA', // Venezuela, Bolivarian Republic of
    'WF': 'OC', // Wallis and Futuna
    'WS': 'OC', // Samoa, Independent State of
    'YE': 'AS', // Yemen
    'ZM': 'AF', // Zambia, Republic of
    'XX': 'OC', // Disputed Territor	
    'XE': 'AS', // Iraq-Saudi Arabia Neutral Zone
    'XD': 'AS', // United Nations Neutral Zone
    'XS': 'AS', // Spratly Islands
  }
  const dbEdgeLocs = {
    'AS': '[hk-database-server-uri]', // Asia
    'EU': '[uk-database-server-uri]', // Europe
    'NA': '[us-database-server-uri]', // North America
    'SA': '[us-database-server-uri]', // South America
    'OC': '[hk-database-server-uri]', // Oceania
    'AF': '[uk-database-server-uri]', // Africa
    'AN': '[us-database-server-uri]', // Antarctica
  }

  let continent = countriesContinent[countryCode]
  return dbEdgeLocs[continent]
}

