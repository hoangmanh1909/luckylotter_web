import React from 'react';
import { connect } from 'dva';
import { Button, WingBlank } from 'antd-mobile';
import styles from '../utils/main.less';
import Example from '../components/Example';

function IndexPage() {

  return (
    <Example/>
  );
}

const mapStateToProps = (state) => {
  return { example: state.example };
}


IndexPage.propTypes = {
};

export default connect(mapStateToProps)(IndexPage);
