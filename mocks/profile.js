const body = {
  "title": "Mr",
  "firstName": "Chandrashekhar",
  "lastName": "Tripathi",
  "dob": "2001-03-17",
  "sex": "male",
  "category": "gen",
  "nationality": "Indian",
  "religion": "Hinduism",
  "address": "HIG-29",
  "pincode": "791113",
  "state": "Arunachal Pradesh",
  "city": "Itanagar",
  "country": "India",
  "phone": "8004600238",
  "altPhone": "",
  "email": "tripathics17@gmail.com",
  "altEmail": "",
  "linkedin": "",
  "github": "",
  "courseCompleted": "btech",
  "registrationNo": "12345",
  "rollNo": "CSE/20/38",
  "discipline": "Computer Science and Engineering",
  "gradYear": "2024"
}

let sql = 'INSERT INTO profile (userId, ';
let values = ['12345'];

const profileKeys = [
  "title", "firstName", "lastName", "dob", "sex", "category", "nationality", "religion", "address", "pincode", "state", "city", "country", "phone", "altPhone", "email", "altEmail", "linkedin", "github", "courseCompleted", "registrationNo", "rollNo", "discipline", "gradYear"
]

profileKeys.forEach(key => {
  if (body[key]) {
    sql += `${key}, `;
    values.push(body[key]);
  }
})

sql = sql.slice(0, -2) + ') VALUES (?, ';
profileKeys.forEach(key => {
  if (body[key]) {
    sql += '?, ';
  }
})

sql = sql.slice(0, -2) + ') ON DUPLICATE KEY UPDATE ';

profileKeys.forEach(key => {
  if (body[key]) {
    sql += `${key} = ?, `;
    values.push(body[key]);
  }
})

sql = sql.slice(0, -2);
console.log(sql);