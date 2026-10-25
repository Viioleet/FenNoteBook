# List of Chess Games

A small web application for saving chess positions. When you enter a FEN code and add a name and note to the position, the application displays the board as a card. Your list is saved in your browser.

## Screenshot

<img width="2559" height="1439" alt="resim" src="https://github.com/user-attachments/assets/0d29bae6-2068-4609-bdff-bf1f545c0478" />

<img width="2559" height="1266" alt="resim" src="https://github.com/user-attachments/assets/aee649a7-62ac-4c3f-a175-4e8ef695146c" />

## Features

- **Add Position:** Enter a FEN code, name, and note. The board view is generated automatically.
- **Edit:** Change the name or note of any card.
- **Delete:** Delete a position by its name.
- **Search:** Find a position by its name.
- **Duplicate name check:** You cannot add two games with the same name.
- **Automatically saved:** Your list is stored in localStorage, so it persists even when you refresh the page.
- **Card grid:** Each position is displayed as a card along with its board.

## Technologies Used

- HTML
- CSS
- JavaScript (async/await, localStorage, DOM)
- SweetAlert2 for pop-ups
- Lichess FEN images for board visuals

## Running the Application

1. Clone the repository:
   ```bash
   git clone https://github.com/Viioleet/FenNoteBook.git
   ```
2. Open the `index.html` file in your browser.

No API key is required. An internet connection is required because the board images and SweetAlert2 are loaded online.
Live Demo : https://viioleet.github.io/FenNoteBook/

Created by **Viioleet** as a personal development project.
 
