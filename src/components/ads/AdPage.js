import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Spinner from '../common/spinner/Spinner.js';
import styles from './AdsPage.module.css';
import ErrorDisplay from '../common/error/errorDisplay/ErrorDisplay.js';
import Button from '../common/Button.js';
import Confirm from '../common/confirm_element/Confirm.js';
import AdModel from './ad_model/AdModel.js';
import { useSelector, useDispatch } from 'react-redux';
import { getAdById, getUi } from '../../store/selectors.js';
import { adLoad, deleteAd, uiResetError } from '../../store/actions.js';

const AdPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const ad = useSelector(getAdById(id));
  console.log(ad);
  const { error, isFetching } = useSelector(getUi);
  const [isDeleted, setIsDeleted] = useState(false);
  const [confirm, setConfirm] = useState(false);

  const handleConfirm = () => setConfirm(true);

  const deletedAd = () => {

    dispatch(deleteAd(id));

    !error && setIsDeleted(true);       
  };

  const resetError = () => dispatch(uiResetError());

  useEffect(() => {
    const getAd = (id) => {
      dispatch(adLoad(id));
    };
    getAd(id);
  }, [id, dispatch]);

  return (
    <div className={styles.ads__page}>
      {!isFetching && isDeleted && <h1>Publicación borrada</h1>}
      {ad && !isDeleted ? (
        <div key={ad.id} className={styles.ad__container}>
          <AdModel ad={ad} />
          {!isDeleted && !confirm && (
            <Button variant='primary' onClick={handleConfirm}>
              Delete Ad
            </Button>
          )}
          {confirm && !isDeleted && (
            <Confirm
              children='seguro que quiere eliminar la publicación?'
              confirm={deletedAd}
              notConfirm={() => setConfirm(false)}
            ></Confirm>
          )}
        </div>
      ) : (
        <Spinner />
      )}

      {error && <ErrorDisplay error={error} resetError={resetError} />}
      {isFetching && !isDeleted && (
        <div>
          <Spinner />

        </div>
      )}
    </div>
  );
};

export default AdPage;