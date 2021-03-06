import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});

it('point return expecteds values', () => {
    var P1 = new Point(1,1);
    var P2 = new Point(2,4);
    expect(P1.Plus(P2).x).toEqual(3);
    expect(P1.Plus(P2).y).toEqual(5);
  }
);
