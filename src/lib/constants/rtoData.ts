/**
 * RTO Data Constants
 *
 * Comprehensive mapping of Indian state codes to state names and RTO offices.
 * Covers all 28 states, 8 UTs, and common RTO office codes for each.
 */

export interface RTOOffice {
  code: string;
  name: string;
  city: string;
}

export interface StateInfo {
  code: string;
  name: string;
  rtoOffices: RTOOffice[];
}

/**
 * Complete mapping of Indian state/UT codes to state info and RTO offices.
 * Keys are 2-letter state codes as used in vehicle registration numbers.
 */
export const STATE_RTO_DATA: Record<string, StateInfo> = {
  AP: {
    code: "AP",
    name: "Andhra Pradesh",
    rtoOffices: [
      { code: "01", name: "RTO Vijayawada", city: "Vijayawada" },
      { code: "02", name: "RTO Guntur", city: "Guntur" },
      { code: "03", name: "RTO Ongole", city: "Ongole" },
      { code: "05", name: "RTO Nellore", city: "Nellore" },
      { code: "07", name: "RTO Tirupati", city: "Tirupati" },
      { code: "09", name: "RTO Anantapur", city: "Anantapur" },
      { code: "10", name: "RTO Kadapa", city: "Kadapa" },
      { code: "11", name: "RTO Kurnool", city: "Kurnool" },
      { code: "12", name: "RTO Visakhapatnam", city: "Visakhapatnam" },
      { code: "13", name: "RTO Rajahmundry", city: "Rajahmundry" },
    ],
  },
  AR: {
    code: "AR",
    name: "Arunachal Pradesh",
    rtoOffices: [
      { code: "01", name: "RTO Itanagar", city: "Itanagar" },
      { code: "02", name: "RTO Naharlagun", city: "Naharlagun" },
      { code: "03", name: "RTO Tawang", city: "Tawang" },
      { code: "04", name: "RTO Bomdila", city: "Bomdila" },
      { code: "05", name: "RTO Ziro", city: "Ziro" },
      { code: "06", name: "RTO Pasighat", city: "Pasighat" },
    ],
  },
  AS: {
    code: "AS",
    name: "Assam",
    rtoOffices: [
      { code: "01", name: "RTO Guwahati", city: "Guwahati" },
      { code: "02", name: "RTO Nagaon", city: "Nagaon" },
      { code: "03", name: "RTO Jorhat", city: "Jorhat" },
      { code: "04", name: "RTO Dibrugarh", city: "Dibrugarh" },
      { code: "05", name: "RTO Tinsukia", city: "Tinsukia" },
      { code: "06", name: "RTO Silchar", city: "Silchar" },
      { code: "07", name: "RTO Tezpur", city: "Tezpur" },
    ],
  },
  BR: {
    code: "BR",
    name: "Bihar",
    rtoOffices: [
      { code: "01", name: "RTO Patna", city: "Patna" },
      { code: "02", name: "RTO Gaya", city: "Gaya" },
      { code: "03", name: "RTO Muzaffarpur", city: "Muzaffarpur" },
      { code: "04", name: "RTO Bhagalpur", city: "Bhagalpur" },
      { code: "05", name: "RTO Darbhanga", city: "Darbhanga" },
      { code: "06", name: "RTO Purnia", city: "Purnia" },
      { code: "07", name: "RTO Chapra", city: "Chapra" },
      { code: "08", name: "RTO Begusarai", city: "Begusarai" },
    ],
  },
  CG: {
    code: "CG",
    name: "Chhattisgarh",
    rtoOffices: [
      { code: "01", name: "RTO Raipur", city: "Raipur" },
      { code: "02", name: "RTO Bilaspur", city: "Bilaspur" },
      { code: "03", name: "RTO Durg", city: "Durg" },
      { code: "04", name: "RTO Rajnandgaon", city: "Rajnandgaon" },
      { code: "05", name: "RTO Jagdalpur", city: "Jagdalpur" },
      { code: "06", name: "RTO Korba", city: "Korba" },
      { code: "07", name: "RTO Ambikapur", city: "Ambikapur" },
    ],
  },
  DL: {
    code: "DL",
    name: "Delhi",
    rtoOffices: [
      { code: "01", name: "RTO Sarai Kale Khan", city: "New Delhi" },
      { code: "02", name: "RTO Sheikh Sarai", city: "New Delhi" },
      { code: "03", name: "RTO Wazirpur", city: "New Delhi" },
      { code: "04", name: "RTO Janakpuri", city: "New Delhi" },
      { code: "05", name: "RTO Loni Road", city: "New Delhi" },
      { code: "06", name: "RTO Vasant Vihar", city: "New Delhi" },
      { code: "07", name: "RTO Rohini", city: "New Delhi" },
      { code: "08", name: "RTO Mayur Vihar", city: "New Delhi" },
      { code: "09", name: "RTO Mall Road", city: "New Delhi" },
      { code: "10", name: "RTO Dwarka", city: "New Delhi" },
    ],
  },
  GA: {
    code: "GA",
    name: "Goa",
    rtoOffices: [
      { code: "01", name: "RTO Panaji", city: "Panaji" },
      { code: "02", name: "RTO Margao", city: "Margao" },
      { code: "03", name: "RTO Mapusa", city: "Mapusa" },
      { code: "04", name: "RTO Ponda", city: "Ponda" },
      { code: "05", name: "RTO Vasco da Gama", city: "Vasco da Gama" },
    ],
  },
  GJ: {
    code: "GJ",
    name: "Gujarat",
    rtoOffices: [
      { code: "01", name: "RTO Ahmedabad", city: "Ahmedabad" },
      { code: "02", name: "RTO Mehsana", city: "Mehsana" },
      { code: "03", name: "RTO Rajkot", city: "Rajkot" },
      { code: "04", name: "RTO Bhavnagar", city: "Bhavnagar" },
      { code: "05", name: "RTO Surat", city: "Surat" },
      { code: "06", name: "RTO Vadodara", city: "Vadodara" },
      { code: "07", name: "RTO Jamnagar", city: "Jamnagar" },
      { code: "08", name: "RTO Junagadh", city: "Junagadh" },
      { code: "09", name: "RTO Gandhinagar", city: "Gandhinagar" },
      { code: "10", name: "RTO Anand", city: "Anand" },
    ],
  },
  HR: {
    code: "HR",
    name: "Haryana",
    rtoOffices: [
      { code: "01", name: "RTO Ambala", city: "Ambala" },
      { code: "02", name: "RTO Karnal", city: "Karnal" },
      { code: "03", name: "RTO Panipat", city: "Panipat" },
      { code: "05", name: "RTO Rohtak", city: "Rohtak" },
      { code: "06", name: "RTO Gurugram", city: "Gurugram" },
      { code: "10", name: "RTO Faridabad", city: "Faridabad" },
      { code: "12", name: "RTO Hisar", city: "Hisar" },
      { code: "14", name: "RTO Sonipat", city: "Sonipat" },
      { code: "26", name: "RTO Panchkula", city: "Panchkula" },
      { code: "29", name: "RTO Gurugram-2", city: "Gurugram" },
    ],
  },
  HP: {
    code: "HP",
    name: "Himachal Pradesh",
    rtoOffices: [
      { code: "01", name: "RTO Shimla", city: "Shimla" },
      { code: "02", name: "RTO Mandi", city: "Mandi" },
      { code: "03", name: "RTO Kangra", city: "Kangra" },
      { code: "04", name: "RTO Kullu", city: "Kullu" },
      { code: "05", name: "RTO Solan", city: "Solan" },
      { code: "06", name: "RTO Bilaspur", city: "Bilaspur" },
      { code: "07", name: "RTO Hamirpur", city: "Hamirpur" },
    ],
  },
  JH: {
    code: "JH",
    name: "Jharkhand",
    rtoOffices: [
      { code: "01", name: "RTO Ranchi", city: "Ranchi" },
      { code: "02", name: "RTO Jamshedpur", city: "Jamshedpur" },
      { code: "03", name: "RTO Dhanbad", city: "Dhanbad" },
      { code: "04", name: "RTO Bokaro", city: "Bokaro" },
      { code: "05", name: "RTO Hazaribagh", city: "Hazaribagh" },
      { code: "06", name: "RTO Deoghar", city: "Deoghar" },
      { code: "07", name: "RTO Dumka", city: "Dumka" },
    ],
  },
  JK: {
    code: "JK",
    name: "Jammu & Kashmir",
    rtoOffices: [
      { code: "01", name: "RTO Srinagar", city: "Srinagar" },
      { code: "02", name: "RTO Jammu", city: "Jammu" },
      { code: "03", name: "RTO Anantnag", city: "Anantnag" },
      { code: "04", name: "RTO Baramulla", city: "Baramulla" },
      { code: "05", name: "RTO Udhampur", city: "Udhampur" },
      { code: "06", name: "RTO Kathua", city: "Kathua" },
    ],
  },
  KA: {
    code: "KA",
    name: "Karnataka",
    rtoOffices: [
      { code: "01", name: "RTO Bengaluru Central", city: "Bengaluru" },
      { code: "02", name: "RTO Bengaluru West", city: "Bengaluru" },
      { code: "03", name: "RTO Bengaluru East", city: "Bengaluru" },
      { code: "04", name: "RTO Bengaluru North", city: "Bengaluru" },
      { code: "05", name: "RTO Bengaluru South", city: "Bengaluru" },
      { code: "06", name: "RTO Tumkur", city: "Tumkur" },
      { code: "09", name: "RTO Mysuru", city: "Mysuru" },
      { code: "12", name: "RTO Mangaluru", city: "Mangaluru" },
      { code: "19", name: "RTO Hubli", city: "Hubli" },
      { code: "20", name: "RTO Belgaum", city: "Belgaum" },
    ],
  },
  KL: {
    code: "KL",
    name: "Kerala",
    rtoOffices: [
      { code: "01", name: "RTO Thiruvananthapuram", city: "Thiruvananthapuram" },
      { code: "02", name: "RTO Kollam", city: "Kollam" },
      { code: "03", name: "RTO Pathanamthitta", city: "Pathanamthitta" },
      { code: "04", name: "RTO Alappuzha", city: "Alappuzha" },
      { code: "05", name: "RTO Kottayam", city: "Kottayam" },
      { code: "06", name: "RTO Idukki", city: "Idukki" },
      { code: "07", name: "RTO Ernakulam", city: "Ernakulam" },
      { code: "08", name: "RTO Thrissur", city: "Thrissur" },
      { code: "09", name: "RTO Palakkad", city: "Palakkad" },
      { code: "11", name: "RTO Kozhikode", city: "Kozhikode" },
    ],
  },
  LA: {
    code: "LA",
    name: "Ladakh",
    rtoOffices: [
      { code: "01", name: "RTO Leh", city: "Leh" },
      { code: "02", name: "RTO Kargil", city: "Kargil" },
    ],
  },
  MP: {
    code: "MP",
    name: "Madhya Pradesh",
    rtoOffices: [
      { code: "01", name: "RTO Bhopal", city: "Bhopal" },
      { code: "02", name: "RTO Indore", city: "Indore" },
      { code: "03", name: "RTO Gwalior", city: "Gwalior" },
      { code: "04", name: "RTO Jabalpur", city: "Jabalpur" },
      { code: "05", name: "RTO Ujjain", city: "Ujjain" },
      { code: "06", name: "RTO Sagar", city: "Sagar" },
      { code: "07", name: "RTO Rewa", city: "Rewa" },
      { code: "08", name: "RTO Satna", city: "Satna" },
      { code: "09", name: "RTO Dewas", city: "Dewas" },
    ],
  },
  MH: {
    code: "MH",
    name: "Maharashtra",
    rtoOffices: [
      { code: "01", name: "RTO Mumbai Central", city: "Mumbai" },
      { code: "02", name: "RTO Mumbai Western", city: "Mumbai" },
      { code: "03", name: "RTO Mumbai Eastern", city: "Mumbai" },
      { code: "04", name: "RTO Thane", city: "Thane" },
      { code: "05", name: "RTO Kalyan", city: "Kalyan" },
      { code: "06", name: "RTO Raigad", city: "Raigad" },
      { code: "12", name: "RTO Pune", city: "Pune" },
      { code: "14", name: "RTO Pimpri-Chinchwad", city: "Pune" },
      { code: "20", name: "RTO Aurangabad", city: "Aurangabad" },
      { code: "27", name: "RTO Nagpur", city: "Nagpur" },
    ],
  },
  MN: {
    code: "MN",
    name: "Manipur",
    rtoOffices: [
      { code: "01", name: "RTO Imphal West", city: "Imphal" },
      { code: "02", name: "RTO Imphal East", city: "Imphal" },
      { code: "03", name: "RTO Bishnupur", city: "Bishnupur" },
      { code: "04", name: "RTO Thoubal", city: "Thoubal" },
      { code: "05", name: "RTO Churachandpur", city: "Churachandpur" },
    ],
  },
  ML: {
    code: "ML",
    name: "Meghalaya",
    rtoOffices: [
      { code: "01", name: "RTO East Khasi Hills", city: "Shillong" },
      { code: "02", name: "RTO West Garo Hills", city: "Tura" },
      { code: "03", name: "RTO Jaintia Hills", city: "Jowai" },
      { code: "04", name: "RTO East Garo Hills", city: "Williamnagar" },
      { code: "05", name: "RTO Ri-Bhoi", city: "Nongpoh" },
    ],
  },
  MZ: {
    code: "MZ",
    name: "Mizoram",
    rtoOffices: [
      { code: "01", name: "RTO Aizawl", city: "Aizawl" },
      { code: "02", name: "RTO Lunglei", city: "Lunglei" },
      { code: "03", name: "RTO Champhai", city: "Champhai" },
      { code: "04", name: "RTO Serchhip", city: "Serchhip" },
      { code: "05", name: "RTO Kolasib", city: "Kolasib" },
    ],
  },
  NL: {
    code: "NL",
    name: "Nagaland",
    rtoOffices: [
      { code: "01", name: "RTO Kohima", city: "Kohima" },
      { code: "02", name: "RTO Dimapur", city: "Dimapur" },
      { code: "03", name: "RTO Mokokchung", city: "Mokokchung" },
      { code: "04", name: "RTO Tuensang", city: "Tuensang" },
      { code: "05", name: "RTO Wokha", city: "Wokha" },
    ],
  },
  OD: {
    code: "OD",
    name: "Odisha",
    rtoOffices: [
      { code: "01", name: "RTO Cuttack", city: "Cuttack" },
      { code: "02", name: "RTO Bhubaneswar", city: "Bhubaneswar" },
      { code: "03", name: "RTO Sambalpur", city: "Sambalpur" },
      { code: "04", name: "RTO Berhampur", city: "Berhampur" },
      { code: "05", name: "RTO Rourkela", city: "Rourkela" },
      { code: "06", name: "RTO Balasore", city: "Balasore" },
      { code: "07", name: "RTO Puri", city: "Puri" },
      { code: "08", name: "RTO Koraput", city: "Koraput" },
    ],
  },
  PB: {
    code: "PB",
    name: "Punjab",
    rtoOffices: [
      { code: "01", name: "RTO Amritsar", city: "Amritsar" },
      { code: "02", name: "RTO Jalandhar", city: "Jalandhar" },
      { code: "03", name: "RTO Ludhiana", city: "Ludhiana" },
      { code: "04", name: "RTO Patiala", city: "Patiala" },
      { code: "05", name: "RTO Bathinda", city: "Bathinda" },
      { code: "06", name: "RTO Sangrur", city: "Sangrur" },
      { code: "07", name: "RTO Hoshiarpur", city: "Hoshiarpur" },
      { code: "08", name: "RTO Mohali", city: "Mohali" },
    ],
  },
  PY: {
    code: "PY",
    name: "Puducherry",
    rtoOffices: [
      { code: "01", name: "RTO Puducherry", city: "Puducherry" },
      { code: "02", name: "RTO Karaikal", city: "Karaikal" },
      { code: "03", name: "RTO Mahe", city: "Mahe" },
      { code: "04", name: "RTO Yanam", city: "Yanam" },
      { code: "05", name: "RTO Ozhukarai", city: "Ozhukarai" },
    ],
  },
  RJ: {
    code: "RJ",
    name: "Rajasthan",
    rtoOffices: [
      { code: "01", name: "RTO Ajmer", city: "Ajmer" },
      { code: "02", name: "RTO Alwar", city: "Alwar" },
      { code: "06", name: "RTO Bikaner", city: "Bikaner" },
      { code: "09", name: "RTO Chittorgarh", city: "Chittorgarh" },
      { code: "14", name: "RTO Jaipur", city: "Jaipur" },
      { code: "19", name: "RTO Jodhpur", city: "Jodhpur" },
      { code: "20", name: "RTO Kota", city: "Kota" },
      { code: "27", name: "RTO Sikar", city: "Sikar" },
      { code: "30", name: "RTO Tonk", city: "Tonk" },
      { code: "45", name: "RTO Jaipur Rural", city: "Jaipur" },
    ],
  },
  SK: {
    code: "SK",
    name: "Sikkim",
    rtoOffices: [
      { code: "01", name: "RTO Gangtok", city: "Gangtok" },
      { code: "02", name: "RTO Namchi", city: "Namchi" },
      { code: "03", name: "RTO Gyalshing", city: "Gyalshing" },
      { code: "04", name: "RTO Mangan", city: "Mangan" },
      { code: "05", name: "RTO Jorethang", city: "Jorethang" },
    ],
  },
  TN: {
    code: "TN",
    name: "Tamil Nadu",
    rtoOffices: [
      { code: "01", name: "RTO Chennai Central", city: "Chennai" },
      { code: "02", name: "RTO Chennai South", city: "Chennai" },
      { code: "03", name: "RTO Chennai West", city: "Chennai" },
      { code: "04", name: "RTO Chennai North", city: "Chennai" },
      { code: "07", name: "RTO Vellore", city: "Vellore" },
      { code: "09", name: "RTO Salem", city: "Salem" },
      { code: "10", name: "RTO Coimbatore", city: "Coimbatore" },
      { code: "11", name: "RTO Tirupur", city: "Tirupur" },
      { code: "14", name: "RTO Madurai", city: "Madurai" },
      { code: "18", name: "RTO Tiruchirappalli", city: "Tiruchirappalli" },
    ],
  },
  TS: {
    code: "TS",
    name: "Telangana",
    rtoOffices: [
      { code: "01", name: "RTO Hyderabad West", city: "Hyderabad" },
      { code: "02", name: "RTO Hyderabad East", city: "Hyderabad" },
      { code: "03", name: "RTO Hyderabad South", city: "Hyderabad" },
      { code: "04", name: "RTO Hyderabad Central", city: "Hyderabad" },
      { code: "05", name: "RTO Ranga Reddy", city: "Hyderabad" },
      { code: "07", name: "RTO Warangal", city: "Warangal" },
      { code: "08", name: "RTO Karimnagar", city: "Karimnagar" },
      { code: "09", name: "RTO Nizamabad", city: "Nizamabad" },
      { code: "10", name: "RTO Khammam", city: "Khammam" },
    ],
  },
  TR: {
    code: "TR",
    name: "Tripura",
    rtoOffices: [
      { code: "01", name: "RTO Agartala", city: "Agartala" },
      { code: "02", name: "RTO Dharmanagar", city: "Dharmanagar" },
      { code: "03", name: "RTO Udaipur", city: "Udaipur" },
      { code: "04", name: "RTO Ambassa", city: "Ambassa" },
      { code: "05", name: "RTO Belonia", city: "Belonia" },
    ],
  },
  UK: {
    code: "UK",
    name: "Uttarakhand",
    rtoOffices: [
      { code: "01", name: "RTO Dehradun", city: "Dehradun" },
      { code: "02", name: "RTO Mussoorie", city: "Mussoorie" },
      { code: "03", name: "RTO Haridwar", city: "Haridwar" },
      { code: "04", name: "RTO Roorkee", city: "Roorkee" },
      { code: "05", name: "RTO Nainital", city: "Nainital" },
      { code: "06", name: "RTO Haldwani", city: "Haldwani" },
      { code: "07", name: "RTO Almora", city: "Almora" },
      { code: "08", name: "RTO Rudrapur", city: "Rudrapur" },
    ],
  },
  UP: {
    code: "UP",
    name: "Uttar Pradesh",
    rtoOffices: [
      { code: "14", name: "RTO Lucknow", city: "Lucknow" },
      { code: "15", name: "RTO Lucknow-2", city: "Lucknow" },
      { code: "16", name: "RTO Kanpur", city: "Kanpur" },
      { code: "20", name: "RTO Agra", city: "Agra" },
      { code: "25", name: "RTO Allahabad", city: "Prayagraj" },
      { code: "32", name: "RTO Varanasi", city: "Varanasi" },
      { code: "65", name: "RTO Noida", city: "Noida" },
      { code: "70", name: "RTO Ghaziabad", city: "Ghaziabad" },
      { code: "78", name: "RTO Greater Noida", city: "Greater Noida" },
      { code: "80", name: "RTO Meerut", city: "Meerut" },
    ],
  },
  WB: {
    code: "WB",
    name: "West Bengal",
    rtoOffices: [
      { code: "01", name: "RTO Kolkata Central", city: "Kolkata" },
      { code: "02", name: "RTO Kolkata South", city: "Kolkata" },
      { code: "03", name: "RTO Kolkata North", city: "Kolkata" },
      { code: "04", name: "RTO Barrackpore", city: "Barrackpore" },
      { code: "06", name: "RTO Howrah", city: "Howrah" },
      { code: "10", name: "RTO Asansol", city: "Asansol" },
      { code: "14", name: "RTO Siliguri", city: "Siliguri" },
      { code: "18", name: "RTO Durgapur", city: "Durgapur" },
      { code: "23", name: "RTO Burdwan", city: "Burdwan" },
    ],
  },
  CH: {
    code: "CH",
    name: "Chandigarh",
    rtoOffices: [
      { code: "01", name: "RTO Chandigarh", city: "Chandigarh" },
      { code: "02", name: "RTO Chandigarh-2", city: "Chandigarh" },
      { code: "03", name: "RTO Chandigarh-3", city: "Chandigarh" },
      { code: "04", name: "RTO Industrial Area", city: "Chandigarh" },
    ],
  },
  AN: {
    code: "AN",
    name: "Andaman & Nicobar Islands",
    rtoOffices: [
      { code: "01", name: "RTO Port Blair", city: "Port Blair" },
      { code: "02", name: "RTO Car Nicobar", city: "Car Nicobar" },
    ],
  },
  DD: {
    code: "DD",
    name: "Dadra & Nagar Haveli and Daman & Diu",
    rtoOffices: [
      { code: "01", name: "RTO Silvassa", city: "Silvassa" },
      { code: "02", name: "RTO Daman", city: "Daman" },
      { code: "03", name: "RTO Diu", city: "Diu" },
    ],
  },
  LD: {
    code: "LD",
    name: "Lakshadweep",
    rtoOffices: [
      { code: "01", name: "RTO Kavaratti", city: "Kavaratti" },
    ],
  },
};

/**
 * Returns the state name for a given 2-letter state code.
 * Falls back to the code itself if not found.
 */
export function getStateName(stateCode: string): string {
  return STATE_RTO_DATA[stateCode.toUpperCase()]?.name ?? stateCode;
}

/**
 * Returns the RTO office info for a given state code and RTO code.
 * Falls back to a generic office name if not found.
 */
export function getRTOOffice(stateCode: string, rtoCode: string): RTOOffice {
  const state = STATE_RTO_DATA[stateCode.toUpperCase()];
  if (!state) {
    return { code: rtoCode, name: `RTO ${stateCode}-${rtoCode}`, city: "Unknown" };
  }
  const office = state.rtoOffices.find((o) => o.code === rtoCode);
  return office ?? { code: rtoCode, name: `RTO ${state.name} - ${rtoCode}`, city: state.name };
}

/**
 * All valid state codes as an array, useful for validation.
 */
export const VALID_STATE_CODES = Object.keys(STATE_RTO_DATA);
