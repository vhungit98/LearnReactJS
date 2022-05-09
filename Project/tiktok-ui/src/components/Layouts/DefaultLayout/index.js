import classNames from 'classnames/bind';
import Header from '~/components/Layouts/components/Header';
import styles from './Default.module.scss';
import Sidebar from './Sidebar';

const cx = classNames.bind(styles);

export default function DefaultLayout({ children }) {
  return (
    <div className={cx('wrapper')}>
      <Header />
      <div className={cx('container')}>
        <Sidebar />
        <div className={cx('content')}>{children}</div>
      </div>
    </div>
  );
}
