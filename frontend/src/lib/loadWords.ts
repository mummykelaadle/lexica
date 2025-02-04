import axios from "axios";

function loadWords(bookId:string,lastCount:number,limit:number){
    console.log("-------------->"+lastCount+"     "+limit);
    const reqObject=axios.get(`http://localhost:5000/api/v1/book/pages?bookId=${bookId}&page=${lastCount}&limit=${limit}`,{
        withCredentials: true,
      });
    return reqObject;
}

export {loadWords};