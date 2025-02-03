import { Request, Response } from 'express';
import Book from '../models/bookModel';
import Page from '../models/pageModel';
import mongoose, { Document } from 'mongoose';

/**
 * Retrieves a book by its ID along with its associated pages and words.
 *
 * This function fetches a book from the database using the book ID from the request body,
 * populating its pages and the words within those pages. It returns the populated book details
 * in the response or a 404 status if the book is not found. In case of an internal error, 
 * it returns a 500 status.
 *
 * @param {Request} req - The request object containing the book ID in the body.
 * @param {Response} res - The response object used to send the response back to the client.
 */
const getBookWithDetails = (req: Request, res: Response) => {
  const { bookId } = req.body;
  console.log(bookId);

  // Fetch the book with pages and words populated
  Book.findById(bookId)
    .populate({
      path: "pages",
      populate: {
        path: "words",
      },
    })
    .then((book) => {
      // Check if the book exists
      if (!book) {
        return res.status(404).json({ message: "Book not found" });
      }

      // Send the populated book as the response
      res.status(200).json(book);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ message: "Internal server error", error });
    });
};

/**
 * Retrieves a book's pages by its ID with pagination.
 *
 * This function fetches a book from the database using the book ID from the query parameters,
 * populating its pages and the words within those pages. It applies pagination based on the
 * provided page number and limit, returning the populated pages in the response or a 404 status
 * if the book is not found. In case of an internal error, it returns a 500 status.
 *
 * based on the limit the book is divided into total_pages/limit number of sets
 * page param here denotes the set number
 * E.g.: limit = 3
 *       set  pages
 *        1   1,2,3
 *        2   4,5,6
 *        3   7,8,9
 *
 * @param {Request} req - The request object containing the book ID, page number, and limit in the query.
 * @param {Response} res - The response object used to send the response back to the client.
 */
const getBookPages = (req: Request, res: Response) => {
  const { bookId, page = 1, limit = 3 } = req.query;
  const num_page = Number(page);
  const num_limit = Number(limit);
  const str_limit = String(limit);

  // Fetch the book with pages populated and apply pagination
  Book.findById(bookId)
    .populate({
      path: 'pages',
      options: { sort: { pageNumber: 1 },skip: (num_page - 1) * num_limit, limit: parseInt(str_limit) },
      populate: { path: 'words' }
    })
    .then((book) => {
      // Check if the book exists
      if (!book) {
        return res.status(404).json({ error: 'Book not found' });
      }

      // Send the populated pages as the response
      res.json({ pages: book.pages });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ error: 'Something went wrong' });
    });
};

/**
 * Interface representing a page in a book.
 *
 * @interface IPage
 * @extends Document
 *
 * @property {mongoose.Types.ObjectId} bookId - The ID of the book this page belongs to.
 * @property {Date} createdAt - The creation date of the page.
 * @property {number} pageNumber - The page number in the book.
 **/
interface IPage extends Document {
  bookId: mongoose.Types.ObjectId;
  createdAt: Date;
  pageNumber: number;
}

/**
 * Sorts the pages of a book by their creation date and updates their page numbers accordingly.
 *
 * This function retrieves all pages associated with a given book ID, sorts them by the 
 * `createdAt` field in ascending order, and then updates each page's `pageNumber` 
 * field based on their sorted position. The function performs a bulk update to optimize 
 * the database operations.
 *
 * @param {string} bookId - The ID of the book whose pages are to be sorted and
**/
const sortAndUpdatePages = (bookId: string): Promise<void> => {
  // Step 1: Retrieve and sort pages using aggregation
  return Page.aggregate<IPage>([
      { $match: { bookId: bookId } }, // Match pages for the specific book
      { $sort: { createdAt: 1 } }, // Sort by createdAt or any other field
      { $project: { _id: 1 } } // Project only the _id field
  ])
  .then((sortedPages) => {
      // Step 2: Update the pageNumber field based on the sorted order
      const bulkOps = sortedPages.map((page, index) => ({
          updateOne: {
              filter: { _id: page._id },
              update: { $set: { pageNumber: index + 1 } }
          }
      }));

      // Execute bulk update
      return Page.bulkWrite(bulkOps);
  })
  .then(() => {
      console.log('Pages sorted and updated successfully.');
  })
  .catch((error) => {
      console.error('Error sorting and updating pages:', error);
      throw error; // Rethrow the error to handle it in the calling function
  });
};

