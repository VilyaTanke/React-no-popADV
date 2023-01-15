import { useEffect } from "react";
import { useParams } from "react-router-dom";
import Spinner from "../common/spinner/Spinner.js";
import styles from "./AdsPage.module.css";
import ErrorDisplay from "../common/error/errorDisplay/ErrorDisplay.js";
import Button from "../common/Button.js";
import { messageDeleteAd } from '../../store/notifications.js';
import AdModel from "./ad_model/AdModel.js";
import { useSelector, useDispatch } from "react-redux";
import { getAdById, getUi } from "../../store/selectors.js";
import {
  adLoad,
  uiConfirm,
  uiResetError,
} from "../../store/actions.js";

const AdPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const ad = useSelector(getAdById(id));
  const { error, isFetching, confirm, notification } = useSelector(getUi);

  const handleConfirm = () => dispatch(uiConfirm({
    message: messageDeleteAd,
    id,
  }));


  const resetError = () => dispatch(uiResetError());

  useEffect(() => {
    const getAd = (id) => {
      dispatch(adLoad(id));
    };
    getAd(id);
  }, [id, dispatch]);

  return (
    <div className={styles.ads__page}>
    {!isFetching && notification && <h1>{notification}</h1>}
    {ad && !isFetching && !notification ? (
        <div key={ad.id} className={styles.ad__container}>
          <AdModel ad={ad} />
          {!confirm && (
            <Button variant="primary" onClick={handleConfirm}>
              Delete Ad
            </Button>
          )}
          
        </div>
      ) : (
        <Spinner />
      )}

      {error && <ErrorDisplay error={error} resetError={resetError} />}
      
    </div>
  );
};

export default AdPage;
