"use strict";(function(){function a(c,d,f,g){if("undefined"==typeof c)var c="";if("undefined"==typeof d)var d=0;c||(console.error("completeDonation(): Empty id given"),g({})),0>=d?d=1500:5e3<d&&(d=5e3),console.log(">>>> completeDonation() (",typeof c,")",c,d);var h=new Date().getTime()-window.mwdspace.donationStartTime.getTime();return console.log("elapsedMilliseconds",h),20000<h?(console.error("completeDonation(): request timeout reached, calling fail function."),g({})):void setTimeout(function(){console.log("completeDonation() RUNNING");var d=e.baseUrl+"donation/"+c;if("live"==window.mwdspace.sharedUtils.getUrlParameter("data"))console.log("SENDING LIVE POLL REQUEST"),b({method:"get",url:d,verbose:!0},function(b){return(console.log("response POLL",typeof b,b),200==b.status&&b.json)?"Complete"==(reponse.json.status+"").toLowerCase()?(window.mwdspace.sharedUtils.removeSessionValue("donationId"),window.mwdspace.sharedUtils.removeSessionValue("donationStartTime"),f(b)):(console.log("*********** DONATION STILL PROCESSING"),a(c,1e3,f,g)):(console.error("completeDonation(): Invalid response follows:"),console.warn(b),g(b))},g);else{console.log("RETURNING TEST DATA");var h;h="bitcoin"==window.mwdspace.transactionSendData.paymentType?{payment_id:"https://bitpay.com/i/X19hQRxwvD87QBRcADXrDX",donation_id:644353,checkout_url:"https://bitpay.com/i/X19hQRxwvD87QBRcADXrDX",img_data:"iVBORw0KGgoAAAANSUhEUgAAAMgAAADIAQAAAACFI5MzAAABd0lEQVR42u2XQY6DMAxFf8QiS46Qm8DFKoHExeAmOUKWWSA830bq0KIuazQjIhWRvi4s+/vbhXw6uMlN/gDJABpBKEOWrR15a70JP5PI3E5SOz6IvUkF7wjE+pbRXUJyDXyN25Wka1fIRcTqg14MnyvnQFSj9qU+Tup1IPvR0qhCzh38fZKjFCR0DFAWu/qTmRHVvjwSm3WFqdWVCAsypjjjQY1iyIe8eRGRMohFxACHQ3a8CIMpTQazA5PJS//4kMphIeoPrBR7RGZ3wqo0TIyMqapQ6RnOhKVhYmBOEQpQn27pRVSUI8wo48JWOUbtRGxY0C7YJYv+5tdHvQidYkwsElMU9Lq5E22LbJuDWJcc+tSLzM/9TbvkkB0nYkdzspo8X13MhexzW70qwfa33p3o7mJC1ZmlyWq9ie2wNEqODYaJuMglhGNDrRq7c19Boi4NNjEQxJtYfdSmEsfGJG9btAcxjdrixNJQK2/q/T65/73f5L+RH2btkZ0kpUV3AAAAAElFTkSuQmCC",exp:1530874922224,type:"bitcoin",alt_amount:"0.000777",transaction_id:"X19hQRxwvD87QBRcADXrDX",status:"Pending",invoice_status:"new",id:644353,errors:null}:{payment_id:"1111",donation_id:15697,checkout_url:null,img_data:null,exp:17067456e5,type:"card",alt_amount:null,transaction_id:"68",status:"Complete",invoice_status:null,id:15697,errors:"Succeeded!"},h.exp=new Date().getTime()+899123,window.mwdspace.sharedUtils.removeSessionValue("donationId"),window.mwdspace.sharedUtils.removeSessionValue("donationStartTime"),f(h)}},d)}function b(a,b,d){if("undefined"==typeof a)var a={};var e=a.method||"post",f=a.url||"",g=c(a.sendContentType||null),h=c(a.acceptContentType||null),i=!("function"!=typeof a.progressFunction)&&a.progressFunction,j=!(!0!==a.verbose),k=a.sendData||{};k&&"string"!=typeof k&&(k=window.mwdspace.sharedUtils.safeJsonString(k));var l=new XMLHttpRequest;l.addEventListener("load",function(){var a={status:this.status,text:this.responseText,json:{}};this.responseText&&(a.json=window.mwdspace.sharedUtils.safeJsonParse(this.responseText)||{}),b(a)}),l.addEventListener("error",function(a){console.log("event.status",a.status),console.warn("sendXhrRequest(): request failed",this),console.log(a),d(this)}),l.addEventListener("abort",function(a){console.warn("sendXhrRequest(): request canceled",this),console.log(a),d(this)}),i&&l.addEventListener("progress",function(a){a.percentComplete=a.lengthComputable?100*(a.loaded/a.total):null,i(a)}),l.open(e,f,!0),l.setRequestHeader("Content-Type",g),l.setRequestHeader("Accept","application/json, text/javascript, */*; q=0.01"),j&&console.log(">>> sendXhrRequest() sending with data",f,k),l.send(k)}function c(a){switch(a=window.mwdspace.sharedUtils.ensureString(a).toLowerCase(),a){case"url":case"urlencoded":return"application/x-www-form-urlencoded";break;case"text":return"text/plain";break;default:return"application/json; charset=UTF-8";}}console.log("transaction-system-layer.js v18.7.10a"),window.mwdspace=window.mwdspace||{},window.mwdspace.transactionLayer=window.mwdspace.transactionLayer||{};var d=window.mwdspace.transactionLayer,e={baseUrl:"https://test.funraise.io/public/api/v2/"};"live"==window.mwdspace.sharedUtils.getUrlParameter("api")&&(e.baseUrl="https://platform.funraise.io/public/api/v2/");var f=4e3;window.mwdspace=window.mwdspace||{},window.mwdspace.donationInProgress=!1,window.mwdspace.donationStartTime=!1,window.mwdspace.validCurrencyList=[{code:"USD",name:"U.S. Dollar",symbol:"$"},{code:"CAD",name:"Canadian Dollar",symbol:"$"},{code:"MXN",name:"Mexican Peso",symbol:"MX$ "},{code:"BRL",name:"Brazilian Real",symbol:"R$"},{code:"INR",name:"Indian Rupee",symbol:"\u20B9 "}],window.mwdspace.validPayMethodList=[{code:"card",name:"Card",description:"Donate With Card",minimumAmount:5,frequencies:["single","monthly"]},{code:"bitcoin",name:"Bitcoin",description:"Donate With Bitcoin",minimumAmount:1,frequencies:["single"]}],window.mwdspace.validFrequencyList=[{code:"single",name:"One-Time"},{code:"monthly",name:"Monthly"}],window.mwdspace.validCountryList=[{name:"United States",code:"US",regions:[{name:"Alaska"},{name:"Alabama"},{name:"Arkansas"},{name:"American Samoa"},{name:"Arizona"},{name:"California"},{name:"Colorado"},{name:"Connecticut"},{name:"District of Columbia"},{name:"Delaware"},{name:"Florida"},{name:"Georgia"},{name:"Guam"},{name:"Hawaii"},{name:"Iowa"},{name:"Idaho"},{name:"Illinois"},{name:"Indiana"},{name:"Kansas"},{name:"Kentucky"},{name:"Louisiana"},{name:"Massachusetts"},{name:"Maryland"},{name:"Maine"},{name:"Michigan"},{name:"Minnesota"},{name:"Missouri"},{name:"Northern Mariana Islands"},{name:"Mississippi"},{name:"Montana"},{name:"North Carolina"},{name:"North Dakota"},{name:"Nebraska"},{name:"New Hampshire"},{name:"New Jersey"},{name:"New Mexico"},{name:"Nevada"},{name:"New York"},{name:"Ohio"},{name:"Oklahoma"},{name:"Oregon"},{name:"Pennsylvania"},{name:"Puerto Rico"},{name:"Rhode Island"},{name:"South Carolina"},{name:"South Dakota"},{name:"Tennessee"},{name:"Texas"},{name:"United States Minor Outlying Islands"},{name:"Utah"},{name:"Virginia"},{name:"Virgin Islands"},{name:"Vermont"},{name:"Washington"},{name:"Wisconsin"},{name:"West Virginia"},{name:"Wyoming"}]},{name:"Canada",code:"CA",regions:[{name:"Alberta"},{name:"British Columbia"},{name:"Manitoba"},{name:"New Brunswick"},{name:"Newfoundland and Labrador"},{name:"Nova Scotia"},{name:"Northwest Territories"},{name:"Nunavut"},{name:"Ontario"},{name:"Prince Edward Island"},{name:"Quebec"},{name:"Saskatchewan"},{name:"Yukon"}]},{name:"United Kingdom",code:"GB",regions:[{name:"Aberdeenshire"},{name:"Aberdeen City"},{name:"Argyll and Bute"},{name:"Isle of Anglesey;Sir Ynys M\xF4n"},{name:"Angus"},{name:"Antrim"},{name:"Ards"},{name:"Armagh"},{name:"Bath and North East Somerset"},{name:"Blackburn with Darwen"},{name:"Bedford"},{name:"Barking and Dagenham"},{name:"Brent"},{name:"Bexley"},{name:"Belfast"},{name:"Bridgend;Pen-y-bont ar Ogwr"},{name:"Blaenau Gwent"},{name:"Birmingham"},{name:"Buckinghamshire"},{name:"Ballymena"},{name:"Ballymoney"},{name:"Bournemouth"},{name:"Banbridge"},{name:"Barnet"},{name:"Brighton and Hove"},{name:"Barnsley"},{name:"Bolton"},{name:"Blackpool"},{name:"Bracknell Forest"},{name:"Bradford"},{name:"Bromley"},{name:"Bristol, City of"},{name:"Bury"},{name:"Cambridgeshire"},{name:"Caerphilly;Caerffili"},{name:"Central Bedfordshire"},{name:"Ceredigion;Sir Ceredigion"},{name:"Craigavon"},{name:"Cheshire East"},{name:"Cheshire West and Chester"},{name:"Carrickfergus"},{name:"Cookstown"},{name:"Calderdale"},{name:"Clackmannanshire"},{name:"Coleraine"},{name:"Cumbria"},{name:"Camden"},{name:"Carmarthenshire;Sir Gaerfyrddin"},{name:"Cornwall"},{name:"Coventry"},{name:"Cardiff;Caerdydd"},{name:"Croydon"},{name:"Castlereagh"},{name:"Conwy"},{name:"Darlington"},{name:"Derbyshire"},{name:"Denbighshire;Sir Ddinbych"},{name:"Derby"},{name:"Devon"},{name:"Dungannon"},{name:"Dumfries and Galloway"},{name:"Doncaster"},{name:"Dundee City"},{name:"Dorset"},{name:"Down"},{name:"Derry"},{name:"Dudley"},{name:"Durham"},{name:"Ealing"},{name:"England and Wales"},{name:"East Ayrshire"},{name:"Edinburgh, City of"},{name:"East Dunbartonshire"},{name:"East Lothian"},{name:"Eilean Siar"},{name:"Enfield"},{name:"England"},{name:"East Renfrewshire"},{name:"East Riding of Yorkshire"},{name:"Essex"},{name:"East Sussex"},{name:"Falkirk"},{name:"Fermanagh"},{name:"Fife"},{name:"Flintshire;Sir y Fflint"},{name:"Gateshead"},{name:"Great Britain"},{name:"Glasgow City"},{name:"Gloucestershire"},{name:"Greenwich"},{name:"Gwynedd"},{name:"Halton"},{name:"Hampshire"},{name:"Havering"},{name:"Hackney"},{name:"Herefordshire"},{name:"Hillingdon"},{name:"Highland"},{name:"Hammersmith and Fulham"},{name:"Hounslow"},{name:"Hartlepool"},{name:"Hertfordshire"},{name:"Harrow"},{name:"Haringey"},{name:"Isle of Wight"},{name:"Islington"},{name:"Inverclyde"},{name:"Kensington and Chelsea"},{name:"Kent"},{name:"Kingston upon Hull"},{name:"Kirklees"},{name:"Kingston upon Thames"},{name:"Knowsley"},{name:"Lancashire"},{name:"Lambeth"},{name:"Leicester"},{name:"Leeds"},{name:"Leicestershire"},{name:"Lewisham"},{name:"Lincolnshire"},{name:"Liverpool"},{name:"Limavady"},{name:"London, City of"},{name:"Larne"},{name:"Lisburn"},{name:"Luton"},{name:"Manchester"},{name:"Middlesbrough"},{name:"Medway"},{name:"Magherafelt"},{name:"Milton Keynes"},{name:"Midlothian"},{name:"Monmouthshire;Sir Fynwy"},{name:"Merton"},{name:"Moray"},{name:"Merthyr Tydfil;Merthyr Tudful"},{name:"Moyle"},{name:"North Ayrshire"},{name:"Northumberland"},{name:"North Down"},{name:"North East Lincolnshire"},{name:"Newcastle upon Tyne"},{name:"Norfolk"},{name:"Nottingham"},{name:"Northern Ireland"},{name:"North Lanarkshire"},{name:"North Lincolnshire"},{name:"North Somerset"},{name:"Newtownabbey"},{name:"Northamptonshire"},{name:"Neath Port Talbot;Castell-nedd Port Talbot"},{name:"Nottinghamshire"},{name:"North Tyneside"},{name:"Newham"},{name:"Newport;Casnewydd"},{name:"North Yorkshire"},{name:"Newry and Mourne"},{name:"Oldham"},{name:"Omagh"},{name:"Orkney Islands"},{name:"Oxfordshire"},{name:"Pembrokeshire;Sir Benfro"},{name:"Perth and Kinross"},{name:"Plymouth"},{name:"Poole"},{name:"Portsmouth"},{name:"Powys"},{name:"Peterborough"},{name:"Redcar and Cleveland"},{name:"Rochdale"},{name:"Rhondda, Cynon, Taff;Rhondda, Cynon,Taf"},{name:"Redbridge"},{name:"Reading"},{name:"Renfrewshire"},{name:"Richmond upon Thames"},{name:"Rotherham"},{name:"Rutland"},{name:"Sandwell"},{name:"South Ayrshire"},{name:"Scottish Borders, The"},{name:"Scotland"},{name:"Suffolk"},{name:"Sefton"},{name:"South Gloucestershire"},{name:"Sheffield"},{name:"St. Helens"},{name:"Shropshire"},{name:"Stockport"},{name:"Salford"},{name:"Slough"},{name:"South Lanarkshire"},{name:"Sunderland"},{name:"Solihull"},{name:"Somerset"},{name:"Southend-on-Sea"},{name:"Surrey"},{name:"Strabane"},{name:"Stoke-on-Trent"},{name:"Stirling"},{name:"Southampton"},{name:"Sutton"},{name:"Staffordshire"},{name:"Stockton-on-Tees"},{name:"South Tyneside"},{name:"Swansea;Abertawe"},{name:"Swindon"},{name:"Southwark"},{name:"Tameside"},{name:"Telford and Wrekin"},{name:"Thurrock"},{name:"Torbay"},{name:"Torfaen;Tor-faen"},{name:"Trafford"},{name:"Tower Hamlets"},{name:"United Kingdom"},{name:"Vale of Glamorgan, The;Bro Morgannwg"},{name:"Warwickshire"},{name:"West Berkshire"},{name:"West Dunbartonshire"},{name:"Waltham Forest"},{name:"Wigan"},{name:"Wakefield"},{name:"Walsall"},{name:"West Lothian"},{name:"Wales"},{name:"Wolverhampton"},{name:"Wandsworth"},{name:"Windsor and Maidenhead"},{name:"Wokingham"},{name:"Worcestershire"},{name:"Wirral"},{name:"Warrington"},{name:"Wrexham;Wrecsam"},{name:"Westminster"},{name:"West Sussex"},{name:"York"},{name:"Shetland Islands"}]},{name:"Afghanistan",code:"AF"},{name:"Albania",code:"AL"},{name:"Algeria",code:"DZ"},{name:"American Samoa",code:"AS"},{name:"Andorra",code:"AD"},{name:"Angola",code:"AO"},{name:"Anguilla",code:"AI"},{name:"Antarctica",code:"AQ"},{name:"Antigua and Barbuda",code:"AG"},{name:"Argentina",code:"AR"},{name:"Armenia",code:"AM"},{name:"Aruba",code:"AW"},{name:"Australia",code:"AU"},{name:"Austria",code:"AT"},{name:"Azerbaijan",code:"AZ"},{name:"Bahamas",code:"BS"},{name:"Bahrain",code:"BH"},{name:"Bangladesh",code:"BD"},{name:"Barbados",code:"BB"},{name:"Belarus",code:"BY"},{name:"Belgium",code:"BE"},{name:"Belize",code:"BZ"},{name:"Benin",code:"BJ"},{name:"Bermuda",code:"BM"},{name:"Bhutan",code:"BT"},{name:"Bolivia, Plurinational State of",code:"BO"},{name:"Bonaire, Sint Eustatius and Saba",code:"BQ"},{name:"Bosnia and Herzegovina",code:"BA"},{name:"Botswana",code:"BW"},{name:"Bouvet Island",code:"BV"},{name:"Brazil",code:"BR",regions:[{name:"Acre"},{name:"Alagoas"},{name:"Amazonas"},{name:"Amap\xE1"},{name:"Bahia"},{name:"Cear\xE1"},{name:"Distrito Federal"},{name:"Esp\xEDrito Santo"},{name:"Fernando de Noronha"},{name:"Goi\xE1s"},{name:"Maranh\xE3o"},{name:"Minas Gerais"},{name:"Mato Grosso do Sul"},{name:"Mato Grosso"},{name:"Par\xE1"},{name:"Para\xEDba"},{name:"Pernambuco"},{name:"Piau\xED"},{name:"Paran\xE1"},{name:"Rio de Janeiro"},{name:"Rio Grande do Norte"},{name:"Rond\xF4nia"},{name:"Roraima"},{name:"Rio Grande do Sul"},{name:"Santa Catarina"},{name:"Sergipe"},{name:"S\xE3o Paulo"},{name:"Tocantins"}]},{name:"British Indian Ocean Territory",code:"IO"},{name:"Brunei Darussalam",code:"BN"},{name:"Bulgaria",code:"BG"},{name:"Burkina Faso",code:"BF"},{name:"Burundi",code:"BI"},{name:"Cambodia",code:"KH"},{name:"Cameroon",code:"CM"},{name:"Cape Verde",code:"CV"},{name:"Cayman Islands",code:"KY"},{name:"Central African Republic",code:"CF"},{name:"Chad",code:"TD"},{name:"Chile",code:"CL"},{name:"China",code:"CN"},{name:"Christmas Island",code:"CX"},{name:"Cocos (Keeling) Islands",code:"CC"},{name:"Colombia",code:"CO"},{name:"Comoros",code:"KM"},{name:"Congo",code:"CG"},{name:"Congo, The Democratic Republic of the",code:"CD"},{name:"Cook Islands",code:"CK"},{name:"Costa Rica",code:"CR"},{name:"Croatia",code:"HR"},{name:"Cuba",code:"CU"},{name:"Cura\xE7ao",code:"CW"},{name:"Cyprus",code:"CY"},{name:"Czech Republic",code:"CZ"},{name:"C\xF4te d'Ivoire",code:"CI"},{name:"Denmark",code:"DK"},{name:"Djibouti",code:"DJ"},{name:"Dominica",code:"DM"},{name:"Dominican Republic",code:"DO"},{name:"Ecuador",code:"EC"},{name:"Egypt",code:"EG"},{name:"El Salvador",code:"SV"},{name:"Equatorial Guinea",code:"GQ"},{name:"Eritrea",code:"ER"},{name:"Estonia",code:"EE"},{name:"Ethiopia",code:"ET"},{name:"Falkland Islands (Malvinas)",code:"FK"},{name:"Faroe Islands",code:"FO"},{name:"Fiji",code:"FJ"},{name:"Finland",code:"FI"},{name:"France",code:"FR"},{name:"French Guiana",code:"GF"},{name:"French Polynesia",code:"PF"},{name:"French Southern Territories",code:"TF"},{name:"Gabon",code:"GA"},{name:"Gambia",code:"GM"},{name:"Georgia",code:"GE"},{name:"Germany",code:"DE"},{name:"Ghana",code:"GH"},{name:"Gibraltar",code:"GI"},{name:"Greece",code:"GR"},{name:"Greenland",code:"GL"},{name:"Grenada",code:"GD"},{name:"Guadeloupe",code:"GP"},{name:"Guam",code:"GU"},{name:"Guatemala",code:"GT"},{name:"Guernsey",code:"GG"},{name:"Guinea",code:"GN"},{name:"Guinea-Bissau",code:"GW"},{name:"Guyana",code:"GY"},{name:"Haiti",code:"HT"},{name:"Heard Island and McDonald Islands",code:"HM"},{name:"Holy See (Vatican City State)",code:"VA"},{name:"Honduras",code:"HN"},{name:"Hong Kong",code:"HK"},{name:"Hungary",code:"HU"},{name:"Iceland",code:"IS"},{name:"India",code:"IN",regions:[{name:"Andaman and Nicobar Islands"},{name:"Andhra Pradesh"},{name:"Arun\u0101chal Pradesh"},{name:"Assam"},{name:"Bih\u0101r"},{name:"Chand\u012Bgarh"},{name:"Chhatt\u012Bsgarh"},{name:"Dam\u0101n and Diu"},{name:"Delhi"},{name:"D\u0101dra and Nagar Haveli"},{name:"Goa"},{name:"Gujar\u0101t"},{name:"Him\u0101chal Pradesh"},{name:"Hary\u0101na"},{name:"Jharkhand"},{name:"Jammu and Kashm\u012Br"},{name:"Karn\u0101taka"},{name:"Kerala"},{name:"Lakshadweep"},{name:"Mah\u0101r\u0101shtra"},{name:"Megh\u0101laya"},{name:"Manipur"},{name:"Madhya Pradesh"},{name:"Mizoram"},{name:"N\u0101g\u0101land"},{name:"Orissa"},{name:"Punjab"},{name:"Pondicherry"},{name:"R\u0101jasth\u0101n"},{name:"Sikkim"},{name:"Tamil N\u0101du"},{name:"Tripura"},{name:"Uttaranchal"},{name:"Uttar Pradesh"},{name:"West Bengal"}]},{name:"Indonesia",code:"ID"},{name:"Iran, Islamic Republic of",code:"IR"},{name:"Iraq",code:"IQ"},{name:"Ireland",code:"IE"},{name:"Isle of Man",code:"IM"},{name:"Israel",code:"IL"},{name:"Italy",code:"IT"},{name:"Jamaica",code:"JM"},{name:"Japan",code:"JP"},{name:"Jersey",code:"JE"},{name:"Jordan",code:"JO"},{name:"Kazakhstan",code:"KZ"},{name:"Kenya",code:"KE"},{name:"Kiribati",code:"KI"},{name:"Korea, Democratic People's Republic of",code:"KP"},{name:"Korea, Republic of",code:"KR"},{name:"Kuwait",code:"KW"},{name:"Kyrgyzstan",code:"KG"},{name:"Lao People's Democratic Republic",code:"LA"},{name:"Latvia",code:"LV"},{name:"Lebanon",code:"LB"},{name:"Lesotho",code:"LS"},{name:"Liberia",code:"LR"},{name:"Libya",code:"LY"},{name:"Liechtenstein",code:"LI"},{name:"Lithuania",code:"LT"},{name:"Luxembourg",code:"LU"},{name:"Macao",code:"MO"},{name:"Macedonia, Republic of",code:"MK"},{name:"Madagascar",code:"MG"},{name:"Malawi",code:"MW"},{name:"Malaysia",code:"MY"},{name:"Maldives",code:"MV"},{name:"Mali",code:"ML"},{name:"Malta",code:"MT"},{name:"Marshall Islands",code:"MH"},{name:"Martinique",code:"MQ"},{name:"Mauritania",code:"MR"},{name:"Mauritius",code:"MU"},{name:"Mayotte",code:"YT"},{name:"Mexico",code:"MX",regions:[{name:"Aguascalientes"},{name:"Baja California"},{name:"Baja California Sur"},{name:"Campeche"},{name:"Chihuahua"},{name:"Chiapas"},{name:"Coahuila"},{name:"Colima"},{name:"Distrito Federal"},{name:"Durango"},{name:"Guerrero"},{name:"Guanajuato"},{name:"Hidalgo"},{name:"Jalisco"},{name:"M\xE9xico"},{name:"Michoac\xE1n"},{name:"Morelos"},{name:"Nayarit"},{name:"Nuevo Le\xF3n"},{name:"Oaxaca"},{name:"Puebla"},{name:"Quer\xE9taro"},{name:"Quintana Roo"},{name:"Sinaloa"},{name:"San Luis Potos\xED"},{name:"Sonora"},{name:"Tabasco"},{name:"Tamaulipas"},{name:"Tlaxcala"},{name:"Veracruz"},{name:"Yucat\xE1n"},{name:"Zacatecas"}]},{name:"Micronesia, Federated States of",code:"FM"},{name:"Moldova, Republic of",code:"MD"},{name:"Monaco",code:"MC"},{name:"Mongolia",code:"MN"},{name:"Montenegro",code:"ME"},{name:"Montserrat",code:"MS"},{name:"Morocco",code:"MA"},{name:"Mozambique",code:"MZ"},{name:"Myanmar",code:"MM"},{name:"Namibia",code:"NA"},{name:"Nauru",code:"NR"},{name:"Nepal",code:"NP"},{name:"Netherlands",code:"NL"},{name:"New Caledonia",code:"NC"},{name:"New Zealand",code:"NZ"},{name:"Nicaragua",code:"NI"},{name:"Niger",code:"NE"},{name:"Nigeria",code:"NG"},{name:"Niue",code:"NU"},{name:"Norfolk Island",code:"NF"},{name:"Northern Mariana Islands",code:"MP"},{name:"Norway",code:"NO"},{name:"Oman",code:"OM"},{name:"Pakistan",code:"PK"},{name:"Palau",code:"PW"},{name:"Palestinian Territory, Occupied",code:"PS"},{name:"Panama",code:"PA"},{name:"Papua New Guinea",code:"PG"},{name:"Paraguay",code:"PY"},{name:"Peru",code:"PE"},{name:"Philippines",code:"PH"},{name:"Pitcairn",code:"PN"},{name:"Poland",code:"PL"},{name:"Portugal",code:"PT"},{name:"Puerto Rico",code:"PR"},{name:"Qatar",code:"QA"},{name:"Romania",code:"RO"},{name:"Russian Federation",code:"RU"},{name:"Rwanda",code:"RW"},{name:"R\xE9union",code:"RE"},{name:"Saint Barth\xE9lemy",code:"BL"},{name:"Saint Helena, Ascension and Tristan da Cunha",code:"SH"},{name:"Saint Kitts and Nevis",code:"KN"},{name:"Saint Lucia",code:"LC"},{name:"Saint Martin (French part)",code:"MF"},{name:"Saint Pierre and Miquelon",code:"PM"},{name:"Saint Vincent and the Grenadines",code:"VC"},{name:"Samoa",code:"WS"},{name:"San Marino",code:"SM"},{name:"Sao Tome and Principe",code:"ST"},{name:"Saudi Arabia",code:"SA"},{name:"Senegal",code:"SN"},{name:"Serbia",code:"RS"},{name:"Seychelles",code:"SC"},{name:"Sierra Leone",code:"SL"},{name:"Singapore",code:"SG"},{name:"Sint Maarten (Dutch part)",code:"SX"},{name:"Slovakia",code:"SK"},{name:"Slovenia",code:"SI"},{name:"Solomon Islands",code:"SB"},{name:"Somalia",code:"SO"},{name:"South Africa",code:"ZA"},{name:"South Georgia and the South Sandwich Islands",code:"GS"},{name:"South Sudan",code:"SS"},{name:"Spain",code:"ES"},{name:"Sri Lanka",code:"LK"},{name:"Sudan",code:"SD"},{name:"Suriname",code:"SR"},{name:"Svalbard and Jan Mayen",code:"SJ"},{name:"Swaziland",code:"SZ"},{name:"Sweden",code:"SE"},{name:"Switzerland",code:"CH"},{name:"Syrian Arab Republic",code:"SY"},{name:"Taiwan",code:"TW"},{name:"Tajikistan",code:"TJ"},{name:"Tanzania, United Republic of",code:"TZ"},{name:"Thailand",code:"TH"},{name:"Timor-Leste",code:"TL"},{name:"Togo",code:"TG"},{name:"Tokelau",code:"TK"},{name:"Tonga",code:"TO"},{name:"Trinidad and Tobago",code:"TT"},{name:"Tunisia",code:"TN"},{name:"Turkey",code:"TR"},{name:"Turkmenistan",code:"TM"},{name:"Turks and Caicos Islands",code:"TC"},{name:"Tuvalu",code:"TV"},{name:"Uganda",code:"UG"},{name:"Ukraine",code:"UA"},{name:"United Arab Emirates",code:"AE"},{name:"United States Minor Outlying Islands",code:"UM"},{name:"Uruguay",code:"UY"},{name:"Uzbekistan",code:"UZ"},{name:"Vanuatu",code:"VU"},{name:"Venezuela, Bolivarian Republic of",code:"VE"},{name:"Viet Nam",code:"VN"},{name:"Virgin Islands, British",code:"VG"},{name:"Virgin Islands, U.S.",code:"VI"},{name:"Wallis and Futuna",code:"WF"},{name:"Western Sahara",code:"EH"},{name:"Yemen",code:"YE"},{name:"Zambia",code:"ZM"},{name:"Zimbabwe",code:"ZW"},{name:"\xC5land Islands",code:"AX"}],d.validateSendData=function(a){function b(a,b,c){g.valid=!1,g.rejectMessages.push({propertyName:a,value:b,message:c})}function c(c){var d=a[c]||null;"string"==typeof d&&d.trim()||b(c,d,"empty or not a string")}function e(c){var d=a[c]||null;("number"!=typeof d||0>=!d)&&b(c,d,"empty or not a number above zero")}function f(c){var d=a[c]||null;"undefined"!=typeof d&&"boolean"!=typeof d&&b(c,d,"not a boolean")}var g={valid:!0,rejectMessages:[]};try{return c("organizationId"),e("formId"),c("firstName"),c("lastName"),c("email"),c("address"),c("city"),c("state"),c("postalCode"),c("country"),e("amount"),e("baseAmount"),d.validateCurrencyCode(a.currency)||b("currency",a.currency,"invalid currency code"),d.validatePayMethod(a.paymentType)||b("paymentType",a.paymentType,"invalid payment type"),"card"==a.paymentType&&(c("paymentToken"),e("month"),e("year")),f("donateDouble"),a.donateDouble&&(c("company"),c("employeeEmail")),!0}catch(a){console.log("buildTransactionSendData() caught error: ",a.message)}return!1},d.validateCurrencyCode=function(a){for(var b=0;b<window.mwdspace.validCurrencyList.length;b++)if(a==window.mwdspace.validCurrencyList[b].code)return!0;return!1},d.validatePayMethod=function(a){for(var b=0;b<window.mwdspace.validPayMethodList.length;b++)if(a==window.mwdspace.validPayMethodList[b].code)return!0;return!1},d.startDonation=function(c,d,g){if(console.log(">>>> startDonation()"),"undefined"==typeof c)var c={};window.mwdspace.donationInProgress=!0,c.sourceUrl=c.sourceUrl||window.location.protocol+"//"+window.location.hostname+window.location.pathname,c.referrer=c.referrer||document.referrer||"";var h={method:"post",url:e.baseUrl+"donation",sendData:c,verbose:!0};if("live"==window.mwdspace.sharedUtils.getUrlParameter("data")){console.log("SENDING LIVE DONATION POST");try{b(h,function(b){if(console.log("response INITIAL",typeof b,b),!b.json||!b.json.id)return console.error("startDonation(): Invalid response, no \"id\":"),console.log(b),g(b);var c=b.json.id;window.mwdspace.donationStartTime=new Date,window.mwdspace.sharedUtils.setSessionValue("donationId",c),window.mwdspace.sharedUtils.setSessionValue("donationStartTime",window.mwdspace.donationStartTime.toUTCString()),a(c,f,d,g)},g)}catch(a){console.error("startDonation CAUGHT ERROR",a),g({})}}else{console.log("RETURNING TEST DONATION ID");window.mwdspace.donationStartTime=new Date,window.mwdspace.sharedUtils.setSessionValue("donationId","a4f29f88-e392-41ca-9a3a-881926d3228d"),window.mwdspace.sharedUtils.setSessionValue("donationStartTime",window.mwdspace.donationStartTime.toUTCString()),a("a4f29f88-e392-41ca-9a3a-881926d3228d",f,d,g)}}})();