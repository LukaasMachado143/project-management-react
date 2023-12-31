import styles from './TextField.module.css'
function TextField({ type, text, name, placeholder, handleOnChange, value }) {
    return (
        <div className={styles.formControl}>
            {text &&
                <label htmlFor={name}>
                    {text}:
                </label>
            }
            <input
                type={type}
                name={name}
                id={name}
                placeholder={placeholder}
                onChange={handleOnChange}
                value={value}
            />
        </div>
    )
}
export default TextField