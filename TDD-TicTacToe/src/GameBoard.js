import React from 'react';
import BoardSquare from './BoardSquare'
export default class GameBoard extends React.Component {
    constructor(props) {
        super(props);
        this.handleBoardSquareClick = this.handleBoardSquareClick.bind(this);
        this.state = {
            boardstate: new Array(9).fill(''),
            turn: 'X'
        }
    }

    createBoard() {
        return (
            <div className='board'>
                <div className='row'>
                    <BoardSquare onClick={this.handleBoardSquareClick} index={0} state={this.state.boardstate[0]} />
                    <BoardSquare onClick={this.handleBoardSquareClick} index={1} state={this.state.boardstate[1]} />
                    <BoardSquare onClick={this.handleBoardSquareClick} index={2} state={this.state.boardstate[2]} />
                </div>
                <div className='row'>
                    <BoardSquare onClick={this.handleBoardSquareClick} index={3} state={this.state.boardstate[3]} />
                    <BoardSquare onClick={this.handleBoardSquareClick} index={4} state={this.state.boardstate[4]} />
                    <BoardSquare onClick={this.handleBoardSquareClick} index={5} state={this.state.boardstate[5]} />
                </div>
                <div className='row'>
                    <BoardSquare onClick={this.handleBoardSquareClick} index={6} state={this.state.boardstate[6]} />
                    <BoardSquare onClick={this.handleBoardSquareClick} index={7} state={this.state.boardstate[7]} />
                    <BoardSquare onClick={this.handleBoardSquareClick} index={8} state={this.state.boardstate[8]} />
                </div>
            </div>);
    }

    getCharacterForTurn() {
        return this.state.turn;
    }

    completeTurn() {
        this.setState({ turn: this.state.turn === 'X' ? 'O' : 'X' });

        if (this.isGameBoardComplete(this.state.boardstate)) {
            this.props.reportCompletion(this.calculateWinner(this.state.boardstate));
        }
    }

    isGameBoardComplete(board) {
        return this.isBoardFull(board) || this.calculateWinner(board);
    }

    isBoardFull(board) {
        return board.every(element => element !== '');
    }

    calculateWinner(squares) {
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];
        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                return squares[a];
            }
        }
        return null;
    }

    isBoardItemPopulated(clickedSquareId) {
        return this.state.boardstate[clickedSquareId] !== '';
    }

    getUpdatedBoardState(clickedSquareId) {
        let boardstate = this.state.boardstate.map((item, index) => {
            if (this.isBoardItemPopulated(clickedSquareId)) return item;
            return clickedSquareId === index ? this.getCharacterForTurn() : item;
        });

        return boardstate;
    }

    handleBoardSquareClick(event) {
        var clickedSquareId = parseInt(event.target.id);
        this.setState({ boardstate: this.getUpdatedBoardState(clickedSquareId) }, () => { this.completeTurn() });
    }

    render() {
        return this.createBoard();
    }
}
