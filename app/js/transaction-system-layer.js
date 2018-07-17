"use strict";
(function() {
	console.log("transaction-system-layer.js v18.7.17a");

	window.mwdspace = window.mwdspace || {};

	window.mwdspace.transactionLayer = window.mwdspace.transactionLayer || {};
	var transactionLayer = window.mwdspace.transactionLayer;

	var apiConstants = {
		baseUrl: "https://platform.funraise.io/public/api/v2/",
		testBaseUrl: "https://test.funraise.io/public/api/v2/",
		testOrganizationId: "1e78fec4-8fd0-4a3e-b82b-866c29012531",
		testFormId: 10,
	};

	var inTestMode = window.mwdspace.sharedUtils.getUrlParameter("test") == "true";
	if (inTestMode) {
		console.warn("TEST MODE - transaction-system-layer.js", apiConstants);
	}

	var requestTimeoutSeconds = 45;
	var requestInitialPollDelay = 4000;
	window.mwdspace = window.mwdspace || {};

	window.mwdspace.donationInProgress = false;
	window.mwdspace.donationStartTime = false;

	window.mwdspace.validCurrencyList = [
		{
			code: "USD",
			name: "U.S. Dollar",
			symbol: "$",
		},
		{
			code: "CAD",
			name: "Canadian Dollar",
			symbol: "C$",
		},
		{
			code: "MXN",
			name: "Mexican Peso",
			symbol: "MX$ ",
		},
		{
			code: "BRL",
			name: "Brazilian Real",
			symbol: "R$",
		},
		{
			code: "INR",
			name: "Indian Rupee",
			symbol: "₹ ",
		},
	];

	window.mwdspace.validPayMethodList = [
		{
			code: "card",
			name: "Card",
			description: "Donate With Card",
			minimumAmount: 5.0,
			frequencies: ["single", "monthly"],
		},
		{
			code: "bitcoin",
			name: "Bitcoin",
			description: "Donate With Bitcoin",
			minimumAmount: 1.0,
			frequencies: ["single"],
		},
	];

	window.mwdspace.validFrequencyList = [
		{
			code: "single",
			name: "One-Time",
		},
		{
			code: "monthly",
			name: "Monthly",
		},
	];

	window.mwdspace.validCountryList = [
		{
			name: "United States",
			code: "US",
			regions: [
				{ name: "Alaska" },
				{ name: "Alabama" },
				{ name: "Arkansas" },
				{ name: "American Samoa" },
				{ name: "Arizona" },
				{ name: "California" },
				{ name: "Colorado" },
				{ name: "Connecticut" },
				{ name: "District of Columbia" },
				{ name: "Delaware" },
				{ name: "Florida" },
				{ name: "Georgia" },
				{ name: "Guam" },
				{ name: "Hawaii" },
				{ name: "Iowa" },
				{ name: "Idaho" },
				{ name: "Illinois" },
				{ name: "Indiana" },
				{ name: "Kansas" },
				{ name: "Kentucky" },
				{ name: "Louisiana" },
				{ name: "Massachusetts" },
				{ name: "Maryland" },
				{ name: "Maine" },
				{ name: "Michigan" },
				{ name: "Minnesota" },
				{ name: "Missouri" },
				{ name: "Northern Mariana Islands" },
				{ name: "Mississippi" },
				{ name: "Montana" },
				{ name: "North Carolina" },
				{ name: "North Dakota" },
				{ name: "Nebraska" },
				{ name: "New Hampshire" },
				{ name: "New Jersey" },
				{ name: "New Mexico" },
				{ name: "Nevada" },
				{ name: "New York" },
				{ name: "Ohio" },
				{ name: "Oklahoma" },
				{ name: "Oregon" },
				{ name: "Pennsylvania" },
				{ name: "Puerto Rico" },
				{ name: "Rhode Island" },
				{ name: "South Carolina" },
				{ name: "South Dakota" },
				{ name: "Tennessee" },
				{ name: "Texas" },
				{ name: "United States Minor Outlying Islands" },
				{ name: "Utah" },
				{ name: "Virginia" },
				{ name: "Virgin Islands" },
				{ name: "Vermont" },
				{ name: "Washington" },
				{ name: "Wisconsin" },
				{ name: "West Virginia" },
				{ name: "Wyoming" },
			],
		},
		{
			name: "Canada",
			code: "CA",
			regions: [
				{ name: "Alberta" },
				{ name: "British Columbia" },
				{ name: "Manitoba" },
				{ name: "New Brunswick" },
				{ name: "Newfoundland and Labrador" },
				{ name: "Nova Scotia" },
				{ name: "Northwest Territories" },
				{ name: "Nunavut" },
				{ name: "Ontario" },
				{ name: "Prince Edward Island" },
				{ name: "Quebec" },
				{ name: "Saskatchewan" },
				{ name: "Yukon" },
			],
		},
		{
			name: "United Kingdom",
			code: "GB",
			regions: [
				{ name: "Aberdeenshire" },
				{ name: "Aberdeen City" },
				{ name: "Argyll and Bute" },
				{ name: "Isle of Anglesey;Sir Ynys Môn" },
				{ name: "Angus" },
				{ name: "Antrim" },
				{ name: "Ards" },
				{ name: "Armagh" },
				{ name: "Bath and North East Somerset" },
				{ name: "Blackburn with Darwen" },
				{ name: "Bedford" },
				{ name: "Barking and Dagenham" },
				{ name: "Brent" },
				{ name: "Bexley" },
				{ name: "Belfast" },
				{ name: "Bridgend;Pen-y-bont ar Ogwr" },
				{ name: "Blaenau Gwent" },
				{ name: "Birmingham" },
				{ name: "Buckinghamshire" },
				{ name: "Ballymena" },
				{ name: "Ballymoney" },
				{ name: "Bournemouth" },
				{ name: "Banbridge" },
				{ name: "Barnet" },
				{ name: "Brighton and Hove" },
				{ name: "Barnsley" },
				{ name: "Bolton" },
				{ name: "Blackpool" },
				{ name: "Bracknell Forest" },
				{ name: "Bradford" },
				{ name: "Bromley" },
				{ name: "Bristol, City of" },
				{ name: "Bury" },
				{ name: "Cambridgeshire" },
				{ name: "Caerphilly;Caerffili" },
				{ name: "Central Bedfordshire" },
				{ name: "Ceredigion;Sir Ceredigion" },
				{ name: "Craigavon" },
				{ name: "Cheshire East" },
				{ name: "Cheshire West and Chester" },
				{ name: "Carrickfergus" },
				{ name: "Cookstown" },
				{ name: "Calderdale" },
				{ name: "Clackmannanshire" },
				{ name: "Coleraine" },
				{ name: "Cumbria" },
				{ name: "Camden" },
				{ name: "Carmarthenshire;Sir Gaerfyrddin" },
				{ name: "Cornwall" },
				{ name: "Coventry" },
				{ name: "Cardiff;Caerdydd" },
				{ name: "Croydon" },
				{ name: "Castlereagh" },
				{ name: "Conwy" },
				{ name: "Darlington" },
				{ name: "Derbyshire" },
				{ name: "Denbighshire;Sir Ddinbych" },
				{ name: "Derby" },
				{ name: "Devon" },
				{ name: "Dungannon" },
				{ name: "Dumfries and Galloway" },
				{ name: "Doncaster" },
				{ name: "Dundee City" },
				{ name: "Dorset" },
				{ name: "Down" },
				{ name: "Derry" },
				{ name: "Dudley" },
				{ name: "Durham" },
				{ name: "Ealing" },
				{ name: "England and Wales" },
				{ name: "East Ayrshire" },
				{ name: "Edinburgh, City of" },
				{ name: "East Dunbartonshire" },
				{ name: "East Lothian" },
				{ name: "Eilean Siar" },
				{ name: "Enfield" },
				{ name: "England" },
				{ name: "East Renfrewshire" },
				{ name: "East Riding of Yorkshire" },
				{ name: "Essex" },
				{ name: "East Sussex" },
				{ name: "Falkirk" },
				{ name: "Fermanagh" },
				{ name: "Fife" },
				{ name: "Flintshire;Sir y Fflint" },
				{ name: "Gateshead" },
				{ name: "Great Britain" },
				{ name: "Glasgow City" },
				{ name: "Gloucestershire" },
				{ name: "Greenwich" },
				{ name: "Gwynedd" },
				{ name: "Halton" },
				{ name: "Hampshire" },
				{ name: "Havering" },
				{ name: "Hackney" },
				{ name: "Herefordshire" },
				{ name: "Hillingdon" },
				{ name: "Highland" },
				{ name: "Hammersmith and Fulham" },
				{ name: "Hounslow" },
				{ name: "Hartlepool" },
				{ name: "Hertfordshire" },
				{ name: "Harrow" },
				{ name: "Haringey" },
				{ name: "Isle of Wight" },
				{ name: "Islington" },
				{ name: "Inverclyde" },
				{ name: "Kensington and Chelsea" },
				{ name: "Kent" },
				{ name: "Kingston upon Hull" },
				{ name: "Kirklees" },
				{ name: "Kingston upon Thames" },
				{ name: "Knowsley" },
				{ name: "Lancashire" },
				{ name: "Lambeth" },
				{ name: "Leicester" },
				{ name: "Leeds" },
				{ name: "Leicestershire" },
				{ name: "Lewisham" },
				{ name: "Lincolnshire" },
				{ name: "Liverpool" },
				{ name: "Limavady" },
				{ name: "London, City of" },
				{ name: "Larne" },
				{ name: "Lisburn" },
				{ name: "Luton" },
				{ name: "Manchester" },
				{ name: "Middlesbrough" },
				{ name: "Medway" },
				{ name: "Magherafelt" },
				{ name: "Milton Keynes" },
				{ name: "Midlothian" },
				{ name: "Monmouthshire;Sir Fynwy" },
				{ name: "Merton" },
				{ name: "Moray" },
				{ name: "Merthyr Tydfil;Merthyr Tudful" },
				{ name: "Moyle" },
				{ name: "North Ayrshire" },
				{ name: "Northumberland" },
				{ name: "North Down" },
				{ name: "North East Lincolnshire" },
				{ name: "Newcastle upon Tyne" },
				{ name: "Norfolk" },
				{ name: "Nottingham" },
				{ name: "Northern Ireland" },
				{ name: "North Lanarkshire" },
				{ name: "North Lincolnshire" },
				{ name: "North Somerset" },
				{ name: "Newtownabbey" },
				{ name: "Northamptonshire" },
				{ name: "Neath Port Talbot;Castell-nedd Port Talbot" },
				{ name: "Nottinghamshire" },
				{ name: "North Tyneside" },
				{ name: "Newham" },
				{ name: "Newport;Casnewydd" },
				{ name: "North Yorkshire" },
				{ name: "Newry and Mourne" },
				{ name: "Oldham" },
				{ name: "Omagh" },
				{ name: "Orkney Islands" },
				{ name: "Oxfordshire" },
				{ name: "Pembrokeshire;Sir Benfro" },
				{ name: "Perth and Kinross" },
				{ name: "Plymouth" },
				{ name: "Poole" },
				{ name: "Portsmouth" },
				{ name: "Powys" },
				{ name: "Peterborough" },
				{ name: "Redcar and Cleveland" },
				{ name: "Rochdale" },
				{ name: "Rhondda, Cynon, Taff;Rhondda, Cynon,Taf" },
				{ name: "Redbridge" },
				{ name: "Reading" },
				{ name: "Renfrewshire" },
				{ name: "Richmond upon Thames" },
				{ name: "Rotherham" },
				{ name: "Rutland" },
				{ name: "Sandwell" },
				{ name: "South Ayrshire" },
				{ name: "Scottish Borders, The" },
				{ name: "Scotland" },
				{ name: "Suffolk" },
				{ name: "Sefton" },
				{ name: "South Gloucestershire" },
				{ name: "Sheffield" },
				{ name: "St. Helens" },
				{ name: "Shropshire" },
				{ name: "Stockport" },
				{ name: "Salford" },
				{ name: "Slough" },
				{ name: "South Lanarkshire" },
				{ name: "Sunderland" },
				{ name: "Solihull" },
				{ name: "Somerset" },
				{ name: "Southend-on-Sea" },
				{ name: "Surrey" },
				{ name: "Strabane" },
				{ name: "Stoke-on-Trent" },
				{ name: "Stirling" },
				{ name: "Southampton" },
				{ name: "Sutton" },
				{ name: "Staffordshire" },
				{ name: "Stockton-on-Tees" },
				{ name: "South Tyneside" },
				{ name: "Swansea;Abertawe" },
				{ name: "Swindon" },
				{ name: "Southwark" },
				{ name: "Tameside" },
				{ name: "Telford and Wrekin" },
				{ name: "Thurrock" },
				{ name: "Torbay" },
				{ name: "Torfaen;Tor-faen" },
				{ name: "Trafford" },
				{ name: "Tower Hamlets" },
				{ name: "United Kingdom" },
				{ name: "Vale of Glamorgan, The;Bro Morgannwg" },
				{ name: "Warwickshire" },
				{ name: "West Berkshire" },
				{ name: "West Dunbartonshire" },
				{ name: "Waltham Forest" },
				{ name: "Wigan" },
				{ name: "Wakefield" },
				{ name: "Walsall" },
				{ name: "West Lothian" },
				{ name: "Wales" },
				{ name: "Wolverhampton" },
				{ name: "Wandsworth" },
				{ name: "Windsor and Maidenhead" },
				{ name: "Wokingham" },
				{ name: "Worcestershire" },
				{ name: "Wirral" },
				{ name: "Warrington" },
				{ name: "Wrexham;Wrecsam" },
				{ name: "Westminster" },
				{ name: "West Sussex" },
				{ name: "York" },
				{ name: "Shetland Islands" },
			],
		},
		{ name: "Afghanistan", code: "AF" },
		{ name: "Albania", code: "AL" },
		{ name: "Algeria", code: "DZ" },
		{ name: "American Samoa", code: "AS" },
		{ name: "Andorra", code: "AD" },
		{ name: "Angola", code: "AO" },
		{ name: "Anguilla", code: "AI" },
		{ name: "Antarctica", code: "AQ" },
		{ name: "Antigua and Barbuda", code: "AG" },
		{ name: "Argentina", code: "AR" },
		{ name: "Armenia", code: "AM" },
		{ name: "Aruba", code: "AW" },
		{ name: "Australia", code: "AU" },
		{ name: "Austria", code: "AT" },
		{ name: "Azerbaijan", code: "AZ" },
		{ name: "Bahamas", code: "BS" },
		{ name: "Bahrain", code: "BH" },
		{ name: "Bangladesh", code: "BD" },
		{ name: "Barbados", code: "BB" },
		{ name: "Belarus", code: "BY" },
		{ name: "Belgium", code: "BE" },
		{ name: "Belize", code: "BZ" },
		{ name: "Benin", code: "BJ" },
		{ name: "Bermuda", code: "BM" },
		{ name: "Bhutan", code: "BT" },
		{ name: "Bolivia, Plurinational State of", code: "BO" },
		{ name: "Bonaire, Sint Eustatius and Saba", code: "BQ" },
		{ name: "Bosnia and Herzegovina", code: "BA" },
		{ name: "Botswana", code: "BW" },
		{ name: "Bouvet Island", code: "BV" },
		{
			name: "Brazil",
			code: "BR",
			regions: [
				{ name: "Acre" },
				{ name: "Alagoas" },
				{ name: "Amazonas" },
				{ name: "Amapá" },
				{ name: "Bahia" },
				{ name: "Ceará" },
				{ name: "Distrito Federal" },
				{ name: "Espírito Santo" },
				{ name: "Fernando de Noronha" },
				{ name: "Goiás" },
				{ name: "Maranhão" },
				{ name: "Minas Gerais" },
				{ name: "Mato Grosso do Sul" },
				{ name: "Mato Grosso" },
				{ name: "Pará" },
				{ name: "Paraíba" },
				{ name: "Pernambuco" },
				{ name: "Piauí" },
				{ name: "Paraná" },
				{ name: "Rio de Janeiro" },
				{ name: "Rio Grande do Norte" },
				{ name: "Rondônia" },
				{ name: "Roraima" },
				{ name: "Rio Grande do Sul" },
				{ name: "Santa Catarina" },
				{ name: "Sergipe" },
				{ name: "São Paulo" },
				{ name: "Tocantins" },
			],
		},
		{ name: "British Indian Ocean Territory", code: "IO" },
		{ name: "Brunei Darussalam", code: "BN" },
		{ name: "Bulgaria", code: "BG" },
		{ name: "Burkina Faso", code: "BF" },
		{ name: "Burundi", code: "BI" },
		{ name: "Cambodia", code: "KH" },
		{ name: "Cameroon", code: "CM" },
		{ name: "Cape Verde", code: "CV" },
		{ name: "Cayman Islands", code: "KY" },
		{ name: "Central African Republic", code: "CF" },
		{ name: "Chad", code: "TD" },
		{ name: "Chile", code: "CL" },
		{ name: "China", code: "CN" },
		{ name: "Christmas Island", code: "CX" },
		{ name: "Cocos (Keeling) Islands", code: "CC" },
		{ name: "Colombia", code: "CO" },
		{ name: "Comoros", code: "KM" },
		{ name: "Congo", code: "CG" },
		{ name: "Congo, The Democratic Republic of the", code: "CD" },
		{ name: "Cook Islands", code: "CK" },
		{ name: "Costa Rica", code: "CR" },
		{ name: "Croatia", code: "HR" },
		{ name: "Cuba", code: "CU" },
		{ name: "Curaçao", code: "CW" },
		{ name: "Cyprus", code: "CY" },
		{ name: "Czech Republic", code: "CZ" },
		{ name: "Côte d'Ivoire", code: "CI" },
		{ name: "Denmark", code: "DK" },
		{ name: "Djibouti", code: "DJ" },
		{ name: "Dominica", code: "DM" },
		{ name: "Dominican Republic", code: "DO" },
		{ name: "Ecuador", code: "EC" },
		{ name: "Egypt", code: "EG" },
		{ name: "El Salvador", code: "SV" },
		{ name: "Equatorial Guinea", code: "GQ" },
		{ name: "Eritrea", code: "ER" },
		{ name: "Estonia", code: "EE" },
		{ name: "Ethiopia", code: "ET" },
		{ name: "Falkland Islands (Malvinas)", code: "FK" },
		{ name: "Faroe Islands", code: "FO" },
		{ name: "Fiji", code: "FJ" },
		{ name: "Finland", code: "FI" },
		{ name: "France", code: "FR" },
		{ name: "French Guiana", code: "GF" },
		{ name: "French Polynesia", code: "PF" },
		{ name: "French Southern Territories", code: "TF" },
		{ name: "Gabon", code: "GA" },
		{ name: "Gambia", code: "GM" },
		{ name: "Georgia", code: "GE" },
		{ name: "Germany", code: "DE" },
		{ name: "Ghana", code: "GH" },
		{ name: "Gibraltar", code: "GI" },
		{ name: "Greece", code: "GR" },
		{ name: "Greenland", code: "GL" },
		{ name: "Grenada", code: "GD" },
		{ name: "Guadeloupe", code: "GP" },
		{ name: "Guam", code: "GU" },
		{ name: "Guatemala", code: "GT" },
		{ name: "Guernsey", code: "GG" },
		{ name: "Guinea", code: "GN" },
		{ name: "Guinea-Bissau", code: "GW" },
		{ name: "Guyana", code: "GY" },
		{ name: "Haiti", code: "HT" },
		{ name: "Heard Island and McDonald Islands", code: "HM" },
		{ name: "Holy See (Vatican City State)", code: "VA" },
		{ name: "Honduras", code: "HN" },
		{ name: "Hong Kong", code: "HK" },
		{ name: "Hungary", code: "HU" },
		{ name: "Iceland", code: "IS" },
		{
			name: "India",
			code: "IN",
			regions: [
				{ name: "Andaman and Nicobar Islands" },
				{ name: "Andhra Pradesh" },
				{ name: "Arunāchal Pradesh" },
				{ name: "Assam" },
				{ name: "Bihār" },
				{ name: "Chandīgarh" },
				{ name: "Chhattīsgarh" },
				{ name: "Damān and Diu" },
				{ name: "Delhi" },
				{ name: "Dādra and Nagar Haveli" },
				{ name: "Goa" },
				{ name: "Gujarāt" },
				{ name: "Himāchal Pradesh" },
				{ name: "Haryāna" },
				{ name: "Jharkhand" },
				{ name: "Jammu and Kashmīr" },
				{ name: "Karnātaka" },
				{ name: "Kerala" },
				{ name: "Lakshadweep" },
				{ name: "Mahārāshtra" },
				{ name: "Meghālaya" },
				{ name: "Manipur" },
				{ name: "Madhya Pradesh" },
				{ name: "Mizoram" },
				{ name: "Nāgāland" },
				{ name: "Orissa" },
				{ name: "Punjab" },
				{ name: "Pondicherry" },
				{ name: "Rājasthān" },
				{ name: "Sikkim" },
				{ name: "Tamil Nādu" },
				{ name: "Tripura" },
				{ name: "Uttaranchal" },
				{ name: "Uttar Pradesh" },
				{ name: "West Bengal" },
			],
		},
		{ name: "Indonesia", code: "ID" },
		{ name: "Iran, Islamic Republic of", code: "IR" },
		{ name: "Iraq", code: "IQ" },
		{ name: "Ireland", code: "IE" },
		{ name: "Isle of Man", code: "IM" },
		{ name: "Israel", code: "IL" },
		{ name: "Italy", code: "IT" },
		{ name: "Jamaica", code: "JM" },
		{ name: "Japan", code: "JP" },
		{ name: "Jersey", code: "JE" },
		{ name: "Jordan", code: "JO" },
		{ name: "Kazakhstan", code: "KZ" },
		{ name: "Kenya", code: "KE" },
		{ name: "Kiribati", code: "KI" },
		{ name: "Korea, Democratic People's Republic of", code: "KP" },
		{ name: "Korea, Republic of", code: "KR" },
		{ name: "Kuwait", code: "KW" },
		{ name: "Kyrgyzstan", code: "KG" },
		{ name: "Lao People's Democratic Republic", code: "LA" },
		{ name: "Latvia", code: "LV" },
		{ name: "Lebanon", code: "LB" },
		{ name: "Lesotho", code: "LS" },
		{ name: "Liberia", code: "LR" },
		{ name: "Libya", code: "LY" },
		{ name: "Liechtenstein", code: "LI" },
		{ name: "Lithuania", code: "LT" },
		{ name: "Luxembourg", code: "LU" },
		{ name: "Macao", code: "MO" },
		{ name: "Macedonia, Republic of", code: "MK" },
		{ name: "Madagascar", code: "MG" },
		{ name: "Malawi", code: "MW" },
		{ name: "Malaysia", code: "MY" },
		{ name: "Maldives", code: "MV" },
		{ name: "Mali", code: "ML" },
		{ name: "Malta", code: "MT" },
		{ name: "Marshall Islands", code: "MH" },
		{ name: "Martinique", code: "MQ" },
		{ name: "Mauritania", code: "MR" },
		{ name: "Mauritius", code: "MU" },
		{ name: "Mayotte", code: "YT" },
		{
			name: "Mexico",
			code: "MX",
			regions: [
				{ name: "Aguascalientes" },
				{ name: "Baja California" },
				{ name: "Baja California Sur" },
				{ name: "Campeche" },
				{ name: "Chihuahua" },
				{ name: "Chiapas" },
				{ name: "Coahuila" },
				{ name: "Colima" },
				{ name: "Distrito Federal" },
				{ name: "Durango" },
				{ name: "Guerrero" },
				{ name: "Guanajuato" },
				{ name: "Hidalgo" },
				{ name: "Jalisco" },
				{ name: "México" },
				{ name: "Michoacán" },
				{ name: "Morelos" },
				{ name: "Nayarit" },
				{ name: "Nuevo León" },
				{ name: "Oaxaca" },
				{ name: "Puebla" },
				{ name: "Querétaro" },
				{ name: "Quintana Roo" },
				{ name: "Sinaloa" },
				{ name: "San Luis Potosí" },
				{ name: "Sonora" },
				{ name: "Tabasco" },
				{ name: "Tamaulipas" },
				{ name: "Tlaxcala" },
				{ name: "Veracruz" },
				{ name: "Yucatán" },
				{ name: "Zacatecas" },
			],
		},
		{ name: "Micronesia, Federated States of", code: "FM" },
		{ name: "Moldova, Republic of", code: "MD" },
		{ name: "Monaco", code: "MC" },
		{ name: "Mongolia", code: "MN" },
		{ name: "Montenegro", code: "ME" },
		{ name: "Montserrat", code: "MS" },
		{ name: "Morocco", code: "MA" },
		{ name: "Mozambique", code: "MZ" },
		{ name: "Myanmar", code: "MM" },
		{ name: "Namibia", code: "NA" },
		{ name: "Nauru", code: "NR" },
		{ name: "Nepal", code: "NP" },
		{ name: "Netherlands", code: "NL" },
		{ name: "New Caledonia", code: "NC" },
		{ name: "New Zealand", code: "NZ" },
		{ name: "Nicaragua", code: "NI" },
		{ name: "Niger", code: "NE" },
		{ name: "Nigeria", code: "NG" },
		{ name: "Niue", code: "NU" },
		{ name: "Norfolk Island", code: "NF" },
		{ name: "Northern Mariana Islands", code: "MP" },
		{ name: "Norway", code: "NO" },
		{ name: "Oman", code: "OM" },
		{ name: "Pakistan", code: "PK" },
		{ name: "Palau", code: "PW" },
		{ name: "Palestinian Territory, Occupied", code: "PS" },
		{ name: "Panama", code: "PA" },
		{ name: "Papua New Guinea", code: "PG" },
		{ name: "Paraguay", code: "PY" },
		{ name: "Peru", code: "PE" },
		{ name: "Philippines", code: "PH" },
		{ name: "Pitcairn", code: "PN" },
		{ name: "Poland", code: "PL" },
		{ name: "Portugal", code: "PT" },
		{ name: "Puerto Rico", code: "PR" },
		{ name: "Qatar", code: "QA" },
		{ name: "Romania", code: "RO" },
		{ name: "Russian Federation", code: "RU" },
		{ name: "Rwanda", code: "RW" },
		{ name: "Réunion", code: "RE" },
		{ name: "Saint Barthélemy", code: "BL" },
		{ name: "Saint Helena, Ascension and Tristan da Cunha", code: "SH" },
		{ name: "Saint Kitts and Nevis", code: "KN" },
		{ name: "Saint Lucia", code: "LC" },
		{ name: "Saint Martin (French part)", code: "MF" },
		{ name: "Saint Pierre and Miquelon", code: "PM" },
		{ name: "Saint Vincent and the Grenadines", code: "VC" },
		{ name: "Samoa", code: "WS" },
		{ name: "San Marino", code: "SM" },
		{ name: "Sao Tome and Principe", code: "ST" },
		{ name: "Saudi Arabia", code: "SA" },
		{ name: "Senegal", code: "SN" },
		{ name: "Serbia", code: "RS" },
		{ name: "Seychelles", code: "SC" },
		{ name: "Sierra Leone", code: "SL" },
		{ name: "Singapore", code: "SG" },
		{ name: "Sint Maarten (Dutch part)", code: "SX" },
		{ name: "Slovakia", code: "SK" },
		{ name: "Slovenia", code: "SI" },
		{ name: "Solomon Islands", code: "SB" },
		{ name: "Somalia", code: "SO" },
		{ name: "South Africa", code: "ZA" },
		{ name: "South Georgia and the South Sandwich Islands", code: "GS" },
		{ name: "South Sudan", code: "SS" },
		{ name: "Spain", code: "ES" },
		{ name: "Sri Lanka", code: "LK" },
		{ name: "Sudan", code: "SD" },
		{ name: "Suriname", code: "SR" },
		{ name: "Svalbard and Jan Mayen", code: "SJ" },
		{ name: "Swaziland", code: "SZ" },
		{ name: "Sweden", code: "SE" },
		{ name: "Switzerland", code: "CH" },
		{ name: "Syrian Arab Republic", code: "SY" },
		{ name: "Taiwan", code: "TW" },
		{ name: "Tajikistan", code: "TJ" },
		{ name: "Tanzania, United Republic of", code: "TZ" },
		{ name: "Thailand", code: "TH" },
		{ name: "Timor-Leste", code: "TL" },
		{ name: "Togo", code: "TG" },
		{ name: "Tokelau", code: "TK" },
		{ name: "Tonga", code: "TO" },
		{ name: "Trinidad and Tobago", code: "TT" },
		{ name: "Tunisia", code: "TN" },
		{ name: "Turkey", code: "TR" },
		{ name: "Turkmenistan", code: "TM" },
		{ name: "Turks and Caicos Islands", code: "TC" },
		{ name: "Tuvalu", code: "TV" },
		{ name: "Uganda", code: "UG" },
		{ name: "Ukraine", code: "UA" },
		{ name: "United Arab Emirates", code: "AE" },
		{ name: "United States Minor Outlying Islands", code: "UM" },
		{ name: "Uruguay", code: "UY" },
		{ name: "Uzbekistan", code: "UZ" },
		{ name: "Vanuatu", code: "VU" },
		{ name: "Venezuela, Bolivarian Republic of", code: "VE" },
		{ name: "Viet Nam", code: "VN" },
		{ name: "Virgin Islands, British", code: "VG" },
		{ name: "Virgin Islands, U.S.", code: "VI" },
		{ name: "Wallis and Futuna", code: "WF" },
		{ name: "Western Sahara", code: "EH" },
		{ name: "Yemen", code: "YE" },
		{ name: "Zambia", code: "ZM" },
		{ name: "Zimbabwe", code: "ZW" },
		{ name: "Åland Islands", code: "AX" },
	];

	transactionLayer.validateSendData = function(sendData) {
		var returnObject = {
			valid: true,
			rejectMessages: [],
		};

		function addReject(propertyName, value, message) {
			returnObject.valid = false;
			returnObject.rejectMessages.push({
				propertyName: propertyName,
				value: value,
				message: message,
			});
		}
		function requireStringNonEmpty(key) {
			var value = sendData[key] || null;
			if (typeof value != "string" || !value.trim()) {
				addReject(key, value, "empty or not a string");
			}
		}
		function requireNumberNonZero(key) {
			var value = sendData[key] || null;
			if (typeof value != "number" || !value <= 0) {
				addReject(key, value, "empty or not a number above zero");
			}
		}
		function requireBoolean(key) {
			var value = sendData[key] || null;
			if (typeof value != "undefined" && typeof value != "boolean") {
				addReject(key, value, "not a boolean");
			}
		}

		try {
			requireStringNonEmpty("organizationId");
			requireNumberNonZero("formId");

			//donor info
			requireStringNonEmpty("firstName");
			requireStringNonEmpty("lastName");
			requireStringNonEmpty("email");
			requireStringNonEmpty("address");
			requireStringNonEmpty("city");
			requireStringNonEmpty("state");
			requireStringNonEmpty("postalCode");
			requireStringNonEmpty("country");

			// payment & currency
			requireNumberNonZero("amount");
			requireNumberNonZero("baseAmount");
			if (!transactionLayer.validateCurrencyCode(sendData.currency)) {
				addReject("currency", sendData.currency, "invalid currency code");
			}

			if (!transactionLayer.validatePayMethod(sendData.paymentType)) {
				addReject("paymentType", sendData.paymentType, "invalid payment type");
			}

			// card payment values
			if (sendData.paymentType == "card") {
				requireStringNonEmpty("paymentToken"); // Spreedly token
				requireNumberNonZero("month"); //expire month
				requireNumberNonZero("year"); //expire year
			}

			// company match
			requireBoolean("donateDouble");
			if (sendData.donateDouble) {
				requireStringNonEmpty("company");
				requireStringNonEmpty("employeeEmail");
			}

			return true;
		} catch (err) {
			console.log("buildTransactionSendData() caught error: ", err.message);
		}
		return false;
	};

	transactionLayer.validateCurrencyCode = function(currencyCode) {
		for (var i = 0; i < window.mwdspace.validCurrencyList.length; i++) {
			if (currencyCode == window.mwdspace.validCurrencyList[i].code) {
				return true;
			}
		}
		return false;
	};

	transactionLayer.validatePayMethod = function(payMethodCode) {
		for (var i = 0; i < window.mwdspace.validPayMethodList.length; i++) {
			if (payMethodCode == window.mwdspace.validPayMethodList[i].code) {
				return true;
			}
		}
		return false;
	};

	transactionLayer.startDonation = function(sendData, successFunction, failFunction) {
		console.log(">>>> startDonation()");
		if (typeof sendData == "undefined") {
			var sendData = {};
		}
		window.mwdspace.donationInProgress = true;

		sendData.sourceUrl =
			sendData.sourceUrl ||
			window.location.protocol +
				"//" +
				window.location.hostname +
				window.location.pathname;
		sendData.referrer = sendData.referrer || document.referrer || "";

		var baseUrl = apiConstants.baseUrl;
		if (inTestMode) {
			baseUrl = apiConstants.testBaseUrl;
			sendData.organizationId = apiConstants.testOrganizationId;
			sendData.formId = apiConstants.testFormId;
		}

		var donationOptions = {
			method: "post",
			url: baseUrl + "donation",
			sendData: sendData,
			verbose: true,
		};

		//initial post to create donation
		try {
			sendXhrRequest(
				donationOptions,
				function(response) {
					console.log("response INITIAL", typeof response, response);
					if (!response.json || !response.json.id) {
						console.error('startDonation(): Invalid response, no "id":');
						console.log(response);
						return failFunction(response);
					}
					var donateId = response.json.id;
					window.mwdspace.donationStartTime = new Date();
					window.mwdspace.sharedUtils.setSessionValue("donationId", donateId);
					window.mwdspace.sharedUtils.setSessionValue(
						"donationStartTime",
						window.mwdspace.donationStartTime.toUTCString()
					);
					completeDonation(
						donateId,
						requestInitialPollDelay,
						successFunction,
						failFunction
					);
				},
				failFunction
			);
		} catch (err) {
			console.error("startDonation CAUGHT ERROR", err);
			failFunction({});
		}
	};

	//poll API for response
	function completeDonation(donateId, delayMilliseconds, successFunction, failFunction) {
		if (typeof donateId == "undefined") {
			var donateId = "";
		}
		if (typeof delayMilliseconds == "undefined") {
			var delayMilliseconds = 0;
		}

		if (!donateId) {
			console.error("completeDonation(): Empty id given");
			failFunction({});
		}
		if (delayMilliseconds <= 1000) {
			delayMilliseconds = 1000;
		} else if (delayMilliseconds > 5000) {
			delayMilliseconds = 5000;
		}
		console.log(
			">>>> completeDonation() (",
			typeof donateId,
			")",
			donateId,
			delayMilliseconds
		);
		var elapsedMilliseconds =
			new Date().getTime() - window.mwdspace.donationStartTime.getTime();
		console.log("elapsedMilliseconds", elapsedMilliseconds);
		if (elapsedMilliseconds > requestTimeoutSeconds * 1000) {
			console.error(
				"completeDonation(): request timeout reached, calling fail function."
			);
			return failFunction({
				text:
					"Timeout after no response from the server for " +
					requestTimeoutSeconds +
					" seconds.",
			});
		}

		setTimeout(function() {
			console.log("completeDonation() RUNNING");

			var baseUrl = apiConstants.baseUrl;
			if (inTestMode) {
				baseUrl = apiConstants.testBaseUrl;
			}

			var donationOptions = {
				method: "get",
				url: baseUrl + "donation/" + donateId,
				verbose: true,
			};

			sendXhrRequest(
				donationOptions,
				function(response) {
					// console.log("response POLL", response);

					if (response.status == 204) {
						console.warn("DONATION STILL PROCESSING");
						return completeDonation(donateId, 3000, successFunction, failFunction);
					} else if (response.status == 200) {
						var transactionStatus = String(response.json.status);
						var transactionType = String(response.json.type);

						if (
							transactionStatus.match(/complete/i) ||
							(transactionStatus.match(/pending/i) &&
								transactionType.match(/bitcoin/i))
						) {
							window.mwdspace.sharedUtils.removeSessionValue("donationId");
							window.mwdspace.sharedUtils.removeSessionValue("donationStartTime");
							return successFunction(response);
						}
					}

					console.error("completeDonation(): Invalid response follows:");
					console.warn(response);
					return failFunction(response);
				},
				failFunction
			);
		}, delayMilliseconds);
	}

	// GENERAL AJAX CALL
	function sendXhrRequest(options, successFunction, failFunction) {
		if (typeof options == "undefined") {
			var options = {};
		}

		// process options
		var requestMethod = options.method || "post";
		var requestUrl = options.url || "";
		var sendContentType = getContentType(options.sendContentType || null);
		var acceptContentType = getContentType(options.acceptContentType || null);
		var progressCallback =
			typeof options.progressFunction === "function" ? options.progressFunction : false;
		var verboseMode = options.verbose === true ? true : false;

		var sendData = options.sendData || {};
		if (sendData && typeof sendData != "string") {
			sendData = window.mwdspace.sharedUtils.safeJsonString(sendData);
		}

		var xhr = new XMLHttpRequest();

		xhr.addEventListener("load", requestComplete);
		xhr.addEventListener("error", requestFailed);
		if (progressCallback) {
			xhr.addEventListener("progress", requestProgress);
		}

		xhr.open(requestMethod, requestUrl, true);
		xhr.setRequestHeader("Content-Type", sendContentType);
		xhr.setRequestHeader("Accept", "application/json, text/javascript, */*; q=0.01");

		if (verboseMode) {
			console.log(">>> sendXhrRequest() sending with data", requestUrl, sendData);
		}
		xhr.send(sendData);

		function requestComplete() {
			var response = {
				status: this.status,
				statusText: this.statusText,
				text: this.responseText,
				json: {},
			};
			if (this.responseText) {
				response.json =
					window.mwdspace.sharedUtils.safeJsonParse(this.responseText) || {};
			}
			successFunction(response);
		}

		function requestFailed(event) {
			console.log("event.status", event.status);
			console.warn("sendXhrRequest(): request failed", this);
			console.log(event);
			failFunction(this);
		}

		function requestProgress(event) {
			event.percentComplete = event.lengthComputable
				? (event.loaded / event.total) * 100
				: null;
			progressCallback(event);
		}
	}

	function getContentType(input) {
		input = window.mwdspace.sharedUtils.ensureString(input).toLowerCase();

		//default to JSON
		switch (input) {
			case "url":
			case "urlencoded":
				return "application/x-www-form-urlencoded";
				break;
			case "text":
				return "text/plain";
				break;
			default:
				return "application/json; charset=UTF-8";
		}
	}
})();
