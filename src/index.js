import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'reactstrap';
import { Table } from 'reactstrap';

/*  import App from './App'; */
import * as serviceWorker from './serviceWorker';

 const SizeBoard = 20;
 let isLose = false; 

 function Square(props) {
    return (
      <button className="square" onClick={props.onClick}>
        {props.value}
      </button>
    );
  }
  
  class Board extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        squares: Array(SizeBoard*SizeBoard).fill(null),
        xIsNext: true,
        XorO: null,
      };
      this.handleReset = this.handleReset.bind(this);
    }
  
    handleClick(i) {
      const squares = this.state.squares.slice();
      if (isLose === true || squares[i]) {
        return;
      }
       squares[i] = this.state.xIsNext ? 'X' : 'O';
       let value = i;
      this.setState({
        squares: squares,
        xIsNext: !this.state.xIsNext,
        XorO: value,
      });
      
    }

    handleReset() {
        let newBoard = Array(SizeBoard * SizeBoard).fill(null);
        this.setState({ squares: newBoard, xIsNext: true, XorO: null });
        isLose = false; 
    }
  
    renderSquare(i) {
      return (
        <Square
          value={this.state.squares[i]}
          onClick={() => this.handleClick(i)}
        />
      );
    }
  
    render() {
      const winner = calculateWinner(this.state.squares, this.state.XorO);
      let status;
      if (winner) {
        status = 'Winner: ' + winner;
       
      } else {
        status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
      }
      let gameBoard = [];
        for (let i = 0; i < SizeBoard; i++) {
            let row = [];
            for (let j = 0; j < SizeBoard; j++) {
                row.push(this.renderSquare(i * SizeBoard + j));
            }
            gameBoard.push(<div className="board-row">{row}</div>)
        }
    let restartBtn = <Button color="primary" onClick={this.handleReset}>Restart game</Button>

   
  
      return (
        <div>
          <Table borderless>
                    <thead>
                        <tr></tr>
                        <tr></tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><div>{gameBoard}</div></td>
                            <td>
                                
                                <div className="status">{status}</div>
                                <br></br>
                                <div>{restartBtn}</div>
                            </td>
                        </tr>
                    </tbody>
                </Table>
        </div>
      );
    }
  }
  
  class Game extends React.Component {
    render() {
      return (
        <div className="game">
          <div className="game-board">
            <Board />
          </div>
          <div className="game-info">
            <div>{/* status */}</div>
            <ol>{/* TODO */}</ol>
          </div>
        </div>
      );
    }
  }

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
function checkHorizontally(squares, cell)
{
    var count = 1;
    var rowId = Math.floor(cell / SizeBoard);
    var colId = cell - rowId * SizeBoard;
    var curSqr = squares[cell];
    var temp = colId-1; 
    while (temp >= 0 && squares[rowId*SizeBoard+temp]===curSqr){
        count = count + 1;
        temp = temp - 1;
    }
    temp = colId+1;
    while (temp  <= 19 && squares[rowId*SizeBoard+temp]===curSqr){
        count = count + 1;
        temp = temp + 1;
    }
    if (count === 5){
        return curSqr;
    }
    else return;
}
function checkVertically(squares, cell)
{
    var count = 1;
    var rowId = Math.floor(cell / SizeBoard);
    var colId = cell - rowId * SizeBoard;
    var curSqr = squares[cell];
    var temp = rowId-1; 
    while (temp >= 0 && squares[temp*SizeBoard+colId]===curSqr){
        count = count + 1;
        temp = temp - 1;
    }
    temp = rowId+1;
    while (temp  <= 19 && squares[temp*SizeBoard+colId]===curSqr){
        count = count + 1;
        temp = temp + 1;
    }
    if (count === 5){
        return curSqr;
    }
    else return;
}
function checkDuongCheo1(squares, cell)
{
    var count = 1;
    var rowId = Math.floor(cell / SizeBoard);
    var colId = cell - rowId * SizeBoard;
    var curSqr = squares[cell];
    var tempCol = colId - 1; 
    var tempRow = rowId + 1;
    while (tempCol >= 0 && tempRow <= 19 && squares[tempRow*SizeBoard+tempCol]===curSqr){
        count = count + 1;
        tempCol = tempCol - 1;
        tempRow = tempRow + 1;
    }
    tempCol = colId + 1; 
    tempRow = rowId - 1;
    while (tempCol <= 19 && tempRow >= 0 && squares[tempRow*SizeBoard+tempCol]===curSqr){
        count = count + 1;
        tempCol = tempCol + 1;
        tempRow = tempRow - 1;
    }
    if (count === 5){
        return curSqr;
    }
    else return;
}
function checkDuongCheo2(squares, cell){
    var count = 1;
    var rowId = Math.floor(cell / SizeBoard);
    var colId = cell - rowId * SizeBoard;
    var curSqr = squares[cell];
    var tempCol = colId + 1; 
    var tempRow = rowId + 1;
    while (tempCol <= 19 && tempRow <= 19 && squares[tempRow*SizeBoard+tempCol]===curSqr){
        count = count + 1;
        tempCol = tempCol + 1;
        tempRow = tempRow + 1;
    }
    tempCol = colId - 1; 
    tempRow = rowId - 1;
    while (tempCol >= 0 && tempRow >= 0 && squares[tempRow*SizeBoard+tempCol]===curSqr){
        count = count + 1;
        tempCol = tempCol - 1;
        tempRow = tempRow - 1;
    }
    if (count === 5){
        return curSqr;
    }
    else return;
}
function calculateWinner(squares, cell) {
    var horizontally = checkHorizontally(squares,cell);
    var vertically = checkVertically(squares,cell);
    var duongcheo1 = checkDuongCheo1(squares,cell);
    var duongcheo2 = checkDuongCheo2(squares,cell);

    if (horizontally)
    {
      isLose = true;
        return horizontally;
    }
    else if (vertically)
    {
      isLose = true;
        return vertically;
    }
    else if (duongcheo1)
    {
      isLose = true;
        return duongcheo1;
    }
    else if (duongcheo2)
    {
      isLose = true;
        return duongcheo2;
    }
    return null;
  }
  ReactDOM.render(<Game />, document.getElementById('root'));