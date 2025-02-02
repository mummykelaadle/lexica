import { Request, Response } from 'express';
import Book from '../models/bookModel';

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

export default { getBookWithDetails, getBookPages };