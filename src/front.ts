import * as hs from 'hyperscript';
import { html, render } from './dom';
import * as styles from './styles';
import { CANVAS_SIZE } from './constants';
import * as icons from './icons';

import { handleAdd, handleUndo, handleClear, save, empty } from './app';
import {
  handleStart,
  handleMove,
  handleEnd,
  handleCancel,
  redraw,
} from './draw';

const h = hs.context();

const canvas = h('canvas', {
  style: styles.canvas,
  width: CANVAS_SIZE,
  height: CANVAS_SIZE,
});

const undo = h('button', { style: styles.action }, html(icons.undo));
const clear = h('button', { style: styles.action }, html(icons.clear));
const actions = h('div', { style: styles.actions }, [clear, undo]);
const T = h('div', {}, [canvas, actions]);

render('ac-front', T);

const state = empty();
save(state); // reset saved state on reinit

undo.addEventListener('touchstart', redraw(canvas)(handleUndo(state)), false);
clear.addEventListener('touchstart', redraw(canvas)(handleClear(state)), false);
canvas.addEventListener('touchstart', handleStart(canvas), false);
canvas.addEventListener('touchend', handleEnd(canvas, handleAdd(state)), false);
canvas.addEventListener('touchcancel', handleCancel(), false);
canvas.addEventListener('touchmove', handleMove(canvas), false);
canvas.addEventListener('click', e => e.preventDefault(), false);
