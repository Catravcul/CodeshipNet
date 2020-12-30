const mode = 'PROD'
// import "dotenv/config";
//  console.log(process.env)
const development = {
 spaceship: {
 urlBASE : 'http://localhost:5000',
 login : '/auth/login',
 signup: '/signup'
 }
 }
 const test = {
 spaceship: {
 urlBASE : 'http://localhost:5000',
 login : '/auth/login',
 signup: '/signup'
 }
 }
 const production = {
 spaceship: {
 urlBASE : 'https://codeship-api.herokuapp.com',
 login : '/auth/login',
 signup: '/signup',
 product: '/product'
 }
 }
 
export function getSpaceshipConfig() {
 switch(mode) {
 case "DEV" :
 return development;
 case "TEST" :
 return test;
 default :
 return production;
 }
}