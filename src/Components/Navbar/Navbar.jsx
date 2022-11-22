import React, { useState } from 'react';
import classes from './Navbar.module.css';

const Navbar = (props) => {
  const solveGrid = async () => {
    props.setIsLoading(true);
    //
    const validate = (array) => {
      const digits = array.filter((character) => character !== 0);
      return digits.length === [...new Set(digits)].length;
    };

    const isValidSudoku = (bd) => {
      const [validated, grids] = [[], []];
      bd.forEach((row, rowIndex) => {
        validated.push(validate(row));
        const column = [];
        for (let columnIndex = 0; columnIndex < bd.length; columnIndex++) {
          column.push(bd[columnIndex][rowIndex]);
        }
        validated.push(validate(column));
        grids.push([]);
      });
      bd.forEach((row, rowIndex) => {
        row.forEach((character, charIndex) => {
          let gridRow = 0;
          if (rowIndex >= 3 && rowIndex <= 5) gridRow = 1;
          else if (rowIndex >= 6 && rowIndex <= 8) gridRow = 2;

          if (charIndex >= 3 && charIndex <= 5) gridRow += 3;
          else if (charIndex >= 6 && charIndex <= 8) gridRow += 6;

          grids[gridRow].push(character);
        });
      });
      grids.forEach((grid) => validated.push(validate(grid)));
      return validated.every((value) => value === true);
    };

    //
    const solver = (bd) => {
      if (isValidSudoku(bd)) {
        const isValid = (row, col, bd, val) => {
          let rowDiff = Math.floor(row / 3) * 3;
          let colDiff = Math.floor(col / 3) * 3;

          for (let i = 0; i < bd.length; i++) {
            if (bd[row][i] === val) return false;
            if (bd[i][col] === val) return false;
            if (bd[rowDiff + Math.floor(i / 3)][colDiff + (i % 3)] === val) {
              return false;
            }
          }
          return true;
        };

        //
        const solve = (bod) => {
          for (let row = 0; row < bod.length; row++) {
            for (let col = 0; col < bod[row].length; col++) {
              if (bod[row][col] === 0) {
                for (let i = 1; i <= 9; i++) {
                  if (isValid(row, col, bod, i)) {
                    bod[row][col] = i;
                    if (solve(bod)) {
                      return true;
                    }
                    bd[row][col] = 0;
                  }
                }
                return false;
              }
            }
          }
          return true;
        };
        //
        solve(bd);
      }
      return bd;
    };
    const solvedSudoku = await solver(props.grid);
    props.setGrid(solvedSudoku);
    props.setIsLoading(false);
  };

  const resetGrid = () => {
    props.setIsLoading(true);
    props.setGrid(props.e);
    props.setIsLoading(false);
  };

  return (
    <>
      <h1 className={classes.Title}>Sudoku</h1>
      <div className={classes.button}>
        <div onClick={solveGrid}>Solve</div>
        <div onClick={resetGrid}>Reset</div>
      </div>
    </>
  );
};

export default Navbar;
