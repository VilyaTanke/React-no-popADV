import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { deleteAd } from './service.js';
import Spinner from '../common/spinner/Spinner.js';
import styles from './AdsPage.module.css';
import ErrorDisplay from '../common/error/errorDisplay/ErrorDisplay.js';
import Button from '../common/Button.js';
import Confirm from '../common/confirm_element/Confirm.js';
import AdModel from './ad_model/AdModel.js';
import { useSelector, useDispatch } from 'react-redux';
import { getAdById, getUi } from '../../store/selectors.js';
import { adLoad, uiResetError } from '../../store/actions.js';

const AdPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch()

  const ad = useSelector(getAdById(id));
  console.log(ad)
  const {error, isFetching} = useSelector(getUi)
  const [isDeleted, setIsDeleted] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const navigate = useNavigate();

  const handleConfirm = () => setConfirm(true);

  // const deletedAd = async () => {
  //   try {
  //     setIsFetching(true);

  //     await deleteAd(id);

  //     setIsDeleted(true);

  //     setIsFetching(false)

  //     setTimeout(() => {
  //       navigate('/');
  //     }, 1000);
  //   } catch (err) {
  //     setError(err);
  //   }
  // };

  const resetError = () => dispatch(uiResetError());

  useEffect(() => {
    
    const getAd = async (id) => {
      try {
        await dispatch(adLoad(id))
      } catch (err) {
        if (err.status === 404) {
          navigate('404');
        }

      }
    };
    getAd(id);
  }, [id, navigate, dispatch]);

  return (
    <div className={styles.ads__page}>
      {!isFetching && isDeleted && <h1>Deleted Ad</h1>}
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
              children='Are you sure for delete ad?'
              /* confirm={deletedAd} */
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