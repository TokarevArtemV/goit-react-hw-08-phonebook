import { useDispatch, useSelector } from 'react-redux';
import { selectFilter, setFilter } from '../../redux';
import css from 'components/Filter/Filter.module.css';

export const Filter = () => {
  const dispatch = useDispatch();
  const filter = useSelector(selectFilter);

  return (
    <div>
      <label className={css.label}>
        <span className={css.text}>Filter</span>
        <input
          className={css.input}
          type="text"
          name="filter"
          value={filter}
          onChange={evt => dispatch(setFilter(evt.target.value))}
        />
      </label>
    </div>
  );
};
