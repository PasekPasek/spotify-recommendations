import React, { useState } from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

const SeedSelect = ({
    label, placeholder, loadOptions, setSelected, defaultOptions,
}) => {
    const [options, setOptions] = useState([]);
    const [loading, setLoading] = useState(false);

    const onInput = async (event, value) => {
        setLoading(true);
        const fetchedOptions = await loadOptions(value);
        setOptions(fetchedOptions);
        setLoading(false);
    };

    const onChange = (event, value) => {
        setSelected(value);
    };

    const getOptionsSelected = (option, value) => option.value === value.value;

    return (
        <Autocomplete
            limitTags={3}
            size="small"
            multiple
            onOpen={() => onInput('')}
            loading={loading}
            onInputChange={onInput}
            defaultValue={defaultOptions}
            options={options}
            onChange={onChange}
            getOptionLabel={(option) => option.label}
            getOptionSelected={getOptionsSelected}
            filterSelectedOptions
            renderInput={(args) => (
                <TextField
                    // eslint-disable-next-line react/jsx-props-no-spreading
                    {...args}
                    variant="outlined"
                    label={label}
                    placeholder={placeholder}
                />
            )}
        />
    );
};

const ArrayShape = PropTypes.shape({
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
});

SeedSelect.propTypes = {
    defaultOptions: PropTypes.arrayOf(ArrayShape),
    placeholder: PropTypes.string,
    label: PropTypes.string.isRequired,
    loadOptions: PropTypes.func.isRequired,
    setSelected: PropTypes.func.isRequired,
};

SeedSelect.defaultProps = {
    defaultOptions: [],
    placeholder: 'Type to search...',
};

export default SeedSelect;
