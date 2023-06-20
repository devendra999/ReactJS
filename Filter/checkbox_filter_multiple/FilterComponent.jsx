function FilterComponent({ options, selectedOptions, onChange }) {
    return (
        <div>
            {options.map((option) => (
                <label key={option}>
                    <input
                        type="checkbox"
                        value={option}
                        checked={selectedOptions.includes(option)}
                        onChange={onChange}
                    />
                    {option}
                </label>
            ))}
        </div>
    );
}

export default FilterComponent;
