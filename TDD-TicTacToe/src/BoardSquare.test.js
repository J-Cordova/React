import React from 'react';
import ReactDOM from 'react-dom';
import  chai  from 'chai';
import spies from 'chai-spies'
import { shallow, mount, render } from 'enzyme';
import GameBoard from './GameBoard';
import BoardSquare from './BoardSquare';

chai.use(spies);
const expect = chai.expect;

describe('The BoardSquare', () => {

  it('has button with class square', () => {
    let app = shallow(<BoardSquare />);
    expect(app.find('button.square').length).to.equal(1);
  });

  it('when clicked calls click handler', () => {
    const spy = chai.spy(() => {});
    let app = mount(<BoardSquare onClick={spy} />); 
    app.find('.square').simulate('click');
    expect(spy).to.have.been.called();
  });


});