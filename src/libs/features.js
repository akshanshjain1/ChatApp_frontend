import moment from "moment";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { googleapikey } from "../constants/config";
const fileformat = (url) => {
  const fileExtention = url.split(".").pop().toString();

  if (
    fileExtention === "mp4" ||
    fileExtention === "webm" ||
    fileExtention === "ogg"
  )
    return "video";
  else if (fileExtention === "mp3" || fileExtention === "wav") return "audio";
  else if (
    fileExtention == "png" ||
    fileExtention == "jpg" ||
    fileExtention == "jpeg" ||
    fileExtention == "gif"
  ) {
    return "image";
  } else return "file";
};
const transformimage = (url = "", width = 100) => {
  const newUrl=url.replace("uplaod/",`upload/dpr_auto/w_${width}/`)
  return newUrl;
};
const getlastsevendays = () => {
  const currdate = moment();
  const lastsevendays = [];
  for (let i = 0; i < 7; i++) {
    const daydate = currdate.clone().subtract(i, "days");
    const dayname = daydate.format("dddd");
    lastsevendays.unshift(dayname);
  }
  return lastsevendays;
};

const getorsavefromstorage=({key,value,get})=>{
  if(get)
      return localStorage.getItem(key)?JSON.parse(localStorage.getItem(key)):null;
    else  localStorage.setItem(key,JSON.stringify(value))
}
async function generateresponse(data){
 
  const genAI = new GoogleGenerativeAI(googleapikey);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  
  const prompt = data;
  
  const result = await model.generateContent(prompt);
  return result.response.text();
  }
export { fileformat, transformimage, getlastsevendays,
  getorsavefromstorage, generateresponse
 };





