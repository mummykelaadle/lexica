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