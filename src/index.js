import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();

//adding to array prototype if not there
//fill is not supported by ie :(
if (!Array.prototype.fill) {
    Array.prototype.fill = function (value) {
        return Array.prototype.map.call(this, () => {
            return value;
        });
    };
}

/*
 document.addEventListener('gesturestart', function (e) {
 e.preventDefault();
 });

 document.addEventListener('touchmove', function(e) {
 e.preventDefault();
 });
 */

window.addEventListener('mousedown', function(e) {
    document.body.classList.add('mouse-navigation');
    document.body.classList.remove('kbd-navigation');
    e.preventDefault();
});

window.addEventListener('keydown', function(e) {
    if (e.keyCode === 9) {
        document.body.classList.add('kbd-navigation');
        document.body.classList.remove('mouse-navigation');
    }
});

window.addEventListener('click', function(e) {
    if (e.target.tagName === 'A' && e.target.getAttribute('href') === '#') {
        e.preventDefault();
    }
});

//disable default right click menu to allow flagging with right click.
window.oncontextmenu = () => {
    return false;
};