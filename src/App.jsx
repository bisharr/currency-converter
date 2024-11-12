function App() {
  return (
    <div className="currency-conveter">
      <h2 className="converter-title">currency Converter</h2>
      <form className="converter-from">
        <div className="form-group">
          <label className="from-label">Enter amoun</label>
          <input
            type="number"
            className="from-input"
            required
            placeholder="100"
          />
        </div>
        <div className="form-group">
          <div className="from-section">
            <label className="from-label">from</label>

            <div className="currency-select">
              <img src="https://flagsapi.com/US/flat/64.png" alt="flag" />
              <select>
                <option value="usd">usd</option>
                <option value="ind">ind</option>
                <option value="ug">ug</option>
              </select>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default App;
