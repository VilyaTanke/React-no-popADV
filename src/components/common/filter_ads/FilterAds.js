import { useState } from 'react';
import styles from'./FilterAds.module.css';
import FormField from '../formField/FormField.js';
import Range from 'rc-slider';
import 'rc-slider/assets/index.css';
import storage from '../../../utils/storage.js';
import Button from '../Button';
export const filterConfig = {
  name:'', 
  sale: 'all',
  range: [0, 1100],
  tags: []};

const FilterAds = ({getFilters,listTags}) => {
  const filters = storage.get('filter');
  const [active, setActive] = useState(false);
  const [name, setName] = useState(filters?.name || filterConfig.name);
  const [sale, setSale] = useState(filters?.sale || filterConfig.sale);
  const [range, setRange] = useState(filters?.range || filterConfig.range);
  const [tags, setTags] = useState(filters?.tags || filterConfig.tags);

  const currentFilter = {name,sale,range,tags};
  
  const handleActive = () => {
      setActive(!!!active);
      active && storage.set('filter', currentFilter)
  }; 
 
  const handleName = (event) => {
    setName(event.target.value);
    getFilters({ ...currentFilter, name: event.target.value});
    storage.set('filter', {...currentFilter, name: event.target.value});
  };

  const handleSale = (event) => {
    setSale(event.target.value);
    getFilters({ ...currentFilter, sale: event.target.value});
    storage.set('filter', {...currentFilter, sale: event.target.value});
  };

  const handleRange = (event) => {
    setRange(event);
    getFilters({ ...currentFilter, range: event});
    storage.set('filter', {...currentFilter, range: event});
  };

  const handleChangeTags = (event) => {
    const selectedTags = event.target.selectedOptions;
    const finallyTags = Array.from(selectedTags).map((e) => e.value);
    setTags(finallyTags);
    getFilters({ ...currentFilter, tags: finallyTags});
    storage.set('filter', {...currentFilter, tags: finallyTags});
  };

  const handleReset = (event) => {
    event.preventDefault();
    setName(filterConfig.name);
    setSale(filterConfig.sale);
    setRange(filterConfig.range);
    setTags(filterConfig.tags);
    getFilters(filterConfig);
    storage.set('filter', filterConfig);
    setActive(!!!active);
  };

  return (
    <div className={styles.filter__container}>
      <div className={`${styles.filter__active} ${!active && styles.filter__inactive}`} onClick={handleActive}>
        filtrar productos🔍
      </div>
      {active && (
        <form className={styles.filter__form}>
          <fieldset>
            <legend>por venta o compra:</legend>
            <label htmlFor='sale'>todos</label>
            <input
              type='radio'
              name='sale'
              id='all'
              value={'all'}
              onChange={handleSale}
             checked={!sale || sale === 'all'}
            />
            <label htmlFor='sale'>En Venta</label>
            <input type='radio' name='sale' id='sale' value={'forSale'}  onChange={handleSale} checked={sale === 'forSale'}/>
            <label htmlFor='wanted'>Compra</label>
            <input type='radio' name='sale' id='wanted' value={'wanted'}  onChange={handleSale} checked={sale === 'wanted'}/>
          </fieldset>
          <FormField
            type='text'
            name='name'
            label='Title Advertisment'
            onChange={handleName}
            value={name}
          />
          <label htmlFor=''>Rango de precios</label>
          <Range
            min={0}
            max={1100}
            step={100}
            onChange={handleRange}
            marks={{
              0: { label: 0 },
              100: { label: '100' },
              200: { label: '200' },
              300: { label: '300' },
              400: { label: '400' },
              500: { label: '500' },
              600: { label: '600' },
              700: { label: '700' },
              800: { label: '800' },
              900: { label: '900' },
              1000: { label: '1000' },
              1100: { label: 'No limit' },
            }}
            range={[0, 1100]}
            defaultValue={range}
            handleStyle={[{border: 'solid 4px red'},{border: 'solid 4px #18349b'}]}
            allowCross={false}
          />

          <select
            name='tags'
            id='tags'
            value={tags}
            onChange={handleChangeTags}
            multiple={true}
            size={listTags.length + 1}
          >
            <optgroup label='TAGS'>
              {listTags.map(e => 
                <option key={e} name={e} value={e}>
                {e}
              </option>
              )}
            </optgroup>
          </select>
          <Button onClick={handleReset}>Reiniciar filtros</Button>
        </form>
      )}
    </div>
  );
};

export default FilterAds;
