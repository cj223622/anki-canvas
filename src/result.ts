import * as hs from 'hyperscript';
import * as styles from './styles';
import { redraw, load } from './touch';
import { render } from './dom';
import { CANVAS_SIZE, RESULT_SIZE } from './constants';

const h = hs.context();
const RATIO = RESULT_SIZE / CANVAS_SIZE;

const canvas = h('canvas', {
  style: styles.result,
  width: RESULT_SIZE,
  height: RESULT_SIZE,
});

render('result', canvas);

redraw(
  canvas,
  load().map(l => l.map(z => ({ x: z.x * RATIO, y: z.y * RATIO }))),
  {
    lineWidth: 3,
  },
);
