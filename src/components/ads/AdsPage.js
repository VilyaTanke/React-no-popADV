import { useEffect, useState } from 'react';
import { getAds, getTags } from './service';
import { Link, useNavigate } from 'react-router-dom';
import Confirm from '../common/confirm_element/Confirm.js';
import styles from './AdsPage.module.css';
import ErrorDisplay from '../common/error/errorDisplay/ErrorDisplay.js';
import AdModel from './ad_model/AdModel.js';
import FilterAds, { filterConfig } from '../common/filter_ads/FilterAds.js';
import storage from '../../utils/storage';
const AdsPage = () => {
  const [ads, setAds] = useState([]);
  const [filters, setFilters] = useState(storage.get('filter') || filterConfig);
  const [listTags, setListTags] = useState([]);
  const [charge, setCharge] = useState(false);
  const [confirm, setConfirm] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const getListAds = async () => {
    try {
      const listAds = await getAds();
      const listTags = await getTags();
      setAds(listAds);
      setListTags(listTags);
      setCharge(true);
    } catch (err) {
      setError(err);
    }
  };

  const getFilters = (filters) => {
    setFilters(filters);
  };

  const resetError = () => setError(null);

  const goToCreate = () => navigate('/ads/new');
  const notConfirm = () => {
    setConfirm(false);
    navigate('/');
  };

  const message = () => {
    return (
      <div>
        <h2>No hay productos</h2>
        <h2>Le gustaria crear alguno?</h2>
      </div>
    );
  };

  useEffect(() => {
    !charge && getListAds();
    getFilters(filters);
  }, [charge, filters]);

  const filterAds = (ads, filter) => {
    const adverts = ads
      .filter((ad) =>
        filter.sale === 'all'
          ? ad
          : filter.sale === 'forSale'
          ? ad.sale
          : !ad.sale
      )
      .filter((ad) => ad.name.toLowerCase().includes(filter.name.toLowerCase()))
      .filter((ad) =>
        filter.range[1] > 1000
          ? ad.price >= filter.range[0]
          : ad.price >= filter.range[0] && ad.price <= filter.range[1]
      )
      .filter((ad) =>
        !filter.tags.length
          ? ad
          : ad.tags.includes(filter.tags.find((e) => ad.tags.includes(e)))
      );

    return adverts;
  };

  const filteredAds = filterAds(ads, filters);

  return (
    <div className={styles.ads__page}>
      {filteredAds.length < 1 && confirm && (
        <Confirm confirm={goToCreate} notConfirm={notConfirm}>
          {message()}
        </Confirm>
      )}
      <FilterAds listTags={listTags} getFilters={getFilters} />
      {filteredAds.map((ad) => (
        <div key={ad.id} className={styles.ad__container}>
          <Link className={styles.ad__link} to={`/ads/${ad.id}`}>
            <AdModel ad={ad} />
          </Link>
        </div>
      ))}
      {error && <ErrorDisplay error={error} resetError={resetError} />}
    </div>
  );
};

export default AdsPage;
