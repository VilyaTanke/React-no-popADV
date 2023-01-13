import { useState, useEffect } from 'react';
import FormField from '../common/formField/FormField.js';
import Button from '../common/Button.js';
import { createAd, getTags } from './service.js';
import ErrorDisplay from '../common/error/errorDisplay/ErrorDisplay.js';
import { useNavigate } from 'react-router-dom';
import Spinner from '../common/spinner/Spinner.js';
import styles from './NewAdPage.module.css';

const NewAdPage = () => {
  const [name, setName] = useState('');
  const [sale, setSale] = useState(true);
  const [price, setPrice] = useState('');
  const [tags, setTags] = useState([]);
  const [photo, setPhoto] = useState(null);
  const [error, setError] = useState(null);
  const [isFetching, setIsFetching] = useState(false);
  const [listTags, setListTags] = useState([]);
  const navigate = useNavigate();

  const getListTags = async () => {
    try {
      const listTags = await getTags();
      setListTags(listTags);
    } catch (error) {
      setError(error);
    }
  };

  const handleChangeName = (event) => setName(event.target.value);
  const handleChangeSale = (event) => setSale(JSON.parse(event.target.value));
  const handleChangePrice = (event) => setPrice(parseInt(event.target.value));
  const handleChangeTags = (event) => {
    const selectedTags = event.target.selectedOptions;
    const finallyTags = Array.from(selectedTags).map((e) => e.value);
    setTags(finallyTags);
  };

  const handlePhoto = (event) => {
    setPhoto(event.target.files[0]);
  };

  const isButtonEnabled = () => name && price && tags.length > 0;

  const resetError = () => setError(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('sale', sale);
    formData.append('price', price);
    photo && formData.append('photo', photo);
    formData.append('tags', tags);
    resetError();
    setIsFetching(true);
    try {
      const createNewAd = await createAd(formData);
      const newAd = createNewAd.id;

      navigate(`/ads/${newAd}`);
    } catch (err) {
      setError(err);
    }
    setIsFetching(false);
  };

  useEffect(() => {
    getListTags();
  }, []);

  return (
    <div className={styles.newAdPage__container}>
      {isFetching && <Spinner />}
      <h1>Agregar producto</h1>
      <form className={styles.form__container} onSubmit={handleSubmit}>
        <FormField
          type='text'
          name='name'
          label='Titulo de su producto'
          onChange={handleChangeName}
          value={name}
          placeholder='Requerido*'
        />
        <fieldset>
          <legend>Quiere vender o comprar?:</legend>
          <label htmlFor='sale'>vender</label>
          <input
            type='radio'
            name='sale'
            id='sale'
            value={true}
            onChange={handleChangeSale}
            checked={sale}
          />
          <label htmlFor='wanted'>Comprar</label>
          <input
            type='radio'
            name='sale'
            id='wanted'
            onChange={handleChangeSale}
            value={false}
            checked={!sale}
          />
        </fieldset>
        <FormField
          type='number'
          name='price'
          label='Indique el precio'
          onChange={handleChangePrice}
          value={price}
          placeholder='Requerido*'
          min='0'
        />
        
        <label htmlFor='tags'>Tags</label>
        <select
          name='tags'
          id='tags'
          value={tags}
          onChange={handleChangeTags}
          multiple={true}
          size={listTags.length + 1}
        >
          <optgroup label='Requerido*'>
            {listTags.map((e) => (
              <option key={e} name={e} value={e}>
                {e}
              </option>
            ))}
          </optgroup>
        </select>
        <div className='creAdsForm2'>
        <label htmlFor='photo'>Agregue una foto</label>
        <p className={styles.recomendation__size}>
          *Recomended size 300px / 300px
        </p>
        <input
          onChange={handlePhoto}
          type='file'
          name='photo'
          id='photo'
          photo={photo}
        />
        {isButtonEnabled() && (
          <Button
            type='submit'
            className='loginForm-submit'
            disabled={!isButtonEnabled()}
          >
            Agregar producto
          </Button>
        )}
        </div>
      </form>
      {error && <ErrorDisplay error={error} resetError={resetError} />}
    </div>
  );
};

export default NewAdPage;
