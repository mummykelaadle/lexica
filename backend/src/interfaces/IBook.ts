import IPagePromise from "./IPagePromise";

interface IBookPromise {
  pages: Promise<IPagePromise>[];
}

export default IBookPromise;

