export default function InputCheckBox2({ name, id, label, value, setValue }) {

    return (
        <div
            id="inputCheckBox1"
            style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "10px",
                padding: "10px",
                borderRadius: "4px"
            }}>
            <input
                type="checkbox"
                name={name}
                id={id}
                style={{
                    minHeight: "16px",
                    minWidth: "16px",
                    accentColor: "#514C9F",
                    borderRadius: "4px"
                }}
                checked={!!value}
                onChange={(e) => { setValue(e.target.checked) }}
            />
            <label
                htmlFor={id}
                style={{
                    fontSize: "14px",
                    lineHeight: "18px",
                    userSelect: "none"
                }}>{label}</label>
        </div>
    )
}