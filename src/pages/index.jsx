import React from 'react';
import styles from './index.less';
import Simple1 from './demo/Simple1';
import Simple2 from './demo/Simple2';
import Simple3 from './demo/Simple3';

export default () => {
  return (
    <div>
      <h1 className={styles.title}>Duke的demo项目</h1>
      {/* <Simple1 /> */}
      <br />
      {/* <Simple2 /> */}
      <br />
      <Simple3 />
    </div>
  );
}
