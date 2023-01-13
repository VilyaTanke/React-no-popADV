import { Fragment } from 'react';
import styles from './AdModel.module.css'

const AdModel = ({ ad }) => {
  return (
    <Fragment>
      <h2 className={styles.model__sale}>{ad.sale ? 'For Sale' : 'Wanted'}</h2>
      <h3 className={styles.model__name}>{ad.name}</h3>
      <div className={styles.model__img}>
        <img
          src={
            ad.photo || 'https://shop.sarmy.net.nz/missing_product_image.jpg'
          }
          alt='Foto'
        />
      </div>
      <h3 className={styles.model__price}>{ad.sale ? `Price : ${ad.price}` : `Max price : ${ad.price}`}</h3>
      <h3 className={styles.model__tags}>TAGS</h3>
      <p>
        {ad.tags && ad.tags.map((tag) => <span key={tag}>{` -${tag}- `}</span>)}
      </p>
    </Fragment>
  );
};

export default AdModel;
