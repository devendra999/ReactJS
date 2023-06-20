function FilterComponent({ isChecked, onChange }) {
    return (
        <label>
            <input type="checkbox" checked={isChecked} onChange={onChange} />
            Filter
        </label>
    );
}

export default FilterComponent;
