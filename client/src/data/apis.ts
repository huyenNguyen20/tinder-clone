import axios from "axios";
import { User } from "./interface";

export const getUsers = async () => {
  try{
    const data = await axios.get("http://localhost:3000/user");
    if(data && data.status >= 200 && data.status < 300){
      return {users: data.data};
    }
    throw new Error("Something went wrong!")
  } catch(e) {
    console.log(e);
    return {message: e.message || "Something went wrong!"}
  }
};

export const getUser = async (id: string) => {
  try{
    const data = await axios.get(`http://localhost:3000/user/${id}`);
    if(data && data.status >= 200 && data.status < 300){
      return {user: data.data};
    }
    throw new Error("Something went wrong!")
  } catch(e) {
    console.log(e);
    return {message: e.message || "Something went wrong!"}
  }
};

export const postLikedUser = async (userId: string, otherId: string) => {
  try{
    const data = await axios.post(`http://localhost:3000/user/like`, {
      userId,
      likedUserId: otherId
    });
    if(data && data.status >= 200 && data.status < 300){
      return {users: data.data};
    }
    throw new Error("Something went wrong!")
  } catch(e) {
    console.log(e);
    return {message: e.message || "Something went wrong!"}
  }
};

export const postPassedUser = async (userId: string, otherId: string) => {
  try{
    const data = await axios.post(`http://localhost:3000/user/pass`, {
      userId,
      passedUserId: otherId
    });
    console.log(data);
    if(data && data.status >= 200 && data.status < 300){
      return {users: data.data};
    }
    throw new Error("Something went wrong!")
  } catch(e) {
    console.log(e);
    return {message: e.message || "Something went wrong!"}
  }
};