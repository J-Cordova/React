import React from 'react';
import ReactDOM from 'react-dom';
import  chai  from 'chai';
import spies from 'chai-spies'
import { shallow, mount, render } from 'enzyme';
import GameBoard from './GameBoard';

chai.use(spies);
const expect = chai.expect;

describe('The GameBoard', () => {

  it('has board element', () => {
    let app = shallow(<GameBoard />);
    expect(app.find('.board').length).to.equal(1);
  });

  it('has 3 rows', () => {
    let app = shallow(<GameBoard />);
    expect(app.find('.row').length).to.equal(3);
  });

  it('has 9 squares', () => {
    let app = render(<GameBoard />);
    expect(app.find('.square').length).to.equal(9);
  });

});
  
  describe('when a game has been complete', () => {
    it('calls reportCompletion callback function', () => {
      const spy = chai.spy(() => {});

      let app = mount(<GameBoard reportCompletion={spy} />); 

      app.find('.square').at(0).simulate('click');
      app.find('.square').at(4).simulate('click');

      app.find('.square').at(3).simulate('click');
      app.find('.square').at(5).simulate('click');

      app.find('.square').at(6).simulate('click');
      app.find('.square').at(1).simulate('click');

      expect(spy).to.have.been.called();
    });

    it('can calculate X as winner', () => {
      let app = shallow(<GameBoard />);
      var appInstance = app.instance();
      var result = appInstance.calculateWinner([
        'X','O','O',
        'X','O','X',
        'X','X','O',
      ]);
      expect(result).to.equal('X');
    });

    it('can calculate O as winner', () => {
      let app = shallow(<GameBoard />);
      var appInstance = app.instance();
      var result = appInstance.calculateWinner([
        'X','O','X',
        'X','O','X',
        'O','O','O',
      ]);
      expect(result).to.equal('O');
    });

    it('can calculate O as winner with empty entries', () => {
      let app = shallow(<GameBoard />);
      var appInstance = app.instance();
      var result = appInstance.calculateWinner([
        'X','O','',
        'X','O','X',
        'O','O','O',
      ]);
      expect(result).to.equal('O');
    });

    it('can check if board is complete', () => {
      let app = shallow(<GameBoard />);
      var appInstance = app.instance();
      var result = appInstance.isBoardFull([
        'X','O','X',
        'X','O','X',
        'O','O','O',
      ]);
      expect(result).to.equal(true);
    });

  });

  describe('when a board square is clicked', () => {
    it('Should display X', () => {
      let app = mount(<GameBoard />);  
      app.find('.square').first().simulate('click');
      expect(app.find('.square').first().text()).to.equal('X');
    });
    
  });

  describe('when 2 board squares are clicked the second displays an O', () => {
    it('Should display O', () => {
      let app = mount(<GameBoard />);  

      app.find('.square').at(0).simulate('click');
      app.find('.square').at(1).simulate('click');

      app.update();

      expect(app.find('.square').at(1).text()).to.equal('O');
    });

  });

