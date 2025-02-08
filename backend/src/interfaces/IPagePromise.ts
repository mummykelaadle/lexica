import IWordPromise from "./IWordPromise";

interface IPagePromise {
  pageNumber: number;
  words: Promise<IWordPromise>[];
}

export default IPagePromise;
