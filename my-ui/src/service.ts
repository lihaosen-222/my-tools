import axios from "axios";

export async function getTodayStatus(){
  return axios.get('/api/getTodayStatus')
}

export async function getWinStatus(){
  return axios.get('/api/getWin')
}

