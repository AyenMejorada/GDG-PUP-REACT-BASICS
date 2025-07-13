import React, { useState, useEffect } from "react";
import "./AssignmentFour.css"; // import css file for styles

function AssignmentFour() {
  // storing options for dropdowns
  const [regions, setRegions] = useState([]);
  const [provinces, setProvinces] = useState([]);
  const [cities, setCities] = useState([]);
  const [barangays, setBarangays] = useState([]);

  // storing the selected items
  const [selectedRegion, setSelectedRegion] = useState("");
  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedBarangay, setSelectedBarangay] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [otherAddress, setOtherAddress] = useState("");
  const [displayAddress, setDisplayAddress] = useState("");

  // this one runs when the component loads
  // it gets all the regions from the api
  useEffect(() => {
    fetch("https://psgc.cloud/api/regions")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setRegions(data);
      })
      .catch((err) => console.error("error getting regions:", err));
  }, []);

  // if region is changed, fetch its provinces
  const handleRegionChange = (e) => {
    const regionCode = e.target.value;
    setSelectedRegion(regionCode);
    setSelectedProvince("");
    setSelectedCity("");
    setSelectedBarangay("");
    setProvinces([]);
    setCities([]);
    setBarangays([]);

    if (regionCode) {
      fetch(`https://psgc.cloud/api/regions/${regionCode}/provinces`)
        .then((res) => res.json())
        .then((data) => setProvinces(data))
        .catch((err) => console.error("error getting provinces:", err));
    }
  };

  // if province is changed, fetch its cities or municipalities
  const handleProvinceChange = (e) => {
    const provinceCode = e.target.value;
    setSelectedProvince(provinceCode);
    setSelectedCity("");
    setSelectedBarangay("");
    setCities([]);
    setBarangays([]);

    if (provinceCode) {
      fetch(`https://psgc.cloud/api/provinces/${provinceCode}/cities-municipalities`)
        .then((res) => res.json())
        .then((data) => setCities(data))
        .catch((err) => console.error("error getting cities:", err));
    }
  };

  // when city is selected, get all its barangays
  const handleCityChange = (e) => {
    const cityCode = e.target.value;
    setSelectedCity(cityCode);
    setSelectedBarangay("");
    setBarangays([]);

    if (cityCode) {
      fetch(`https://psgc.cloud/api/municipalities/${cityCode}/barangays`)
        .then((res) => res.json())
        .then((data) => setBarangays(data))
        .catch((err) => console.error("error getting barangays:", err));
    }
  };

  // this one shows the final full address after clicking confirm
  const handleConfirm = () => {
    if (
      !selectedRegion ||
      !selectedProvince ||
      !selectedCity ||
      !selectedBarangay ||
      !zipCode
    ) {
      alert("please complete all required fields.");
      return;
    }

    // find names of selected codes for display
    const regionName = regions.find((r) => r.code === selectedRegion)?.name || "unknown region";
    const provinceName = provinces.find((p) => p.code === selectedProvince)?.name || "unknown province";
    const cityName = cities.find((c) => c.code === selectedCity)?.name || "unknown city";
    const barangayName = barangays.find((b) => b.code === selectedBarangay)?.name || "unknown barangay";

    // set the final result to be shown on screen
    setDisplayAddress(
      `you live at ${otherAddress ? otherAddress + ", " : ""}${barangayName}, ${cityName}, ${provinceName}, ${regionName}, ${zipCode}, philippines.`
    );
  };

  return (
    <div className="address-container">
      <div className="address-wrapper">
        <div className="title-container">
          <h1>📍 My Address</h1>
          <p>
            This one uses a public api so we can select our region, province,
            city, and barangay. We also try conditional rendering here like showing
            things only when data is ready.
          </p>
        </div>

        {/* this part only shows if the address is complete */}
        {displayAddress && <div className="address-display">{displayAddress}</div>}

        {/* region dropdown */}
        <div className="form-group">
          <label htmlFor="region">Region</label>
          <select id="region" value={selectedRegion} onChange={handleRegionChange}>
            <option value="">Select Region</option>
            {regions.map((region) => (
              <option key={region.code} value={region.code}>
                {region.name}
              </option>
            ))}
          </select>
        </div>

        {/* province dropdown */}
        <div className="form-group">
          <label htmlFor="province">Province</label>
          <select id="province" value={selectedProvince} onChange={handleProvinceChange}>
            <option value="">Select Province</option>
            {provinces.map((province) => (
              <option key={province.code} value={province.code}>
                {province.name}
              </option>
            ))}
          </select>
        </div>

        {/* city/municipality dropdown */}
        <div className="form-group">
          <label htmlFor="city">City / Municipality</label>
          <select id="city" value={selectedCity} onChange={handleCityChange}>
            <option value="">Select City</option>
            {cities.map((city) => (
              <option key={city.code} value={city.code}>
                {city.name}
              </option>
            ))}
          </select>
        </div>

        {/* barangay dropdown */}
        <div className="form-group">
          <label htmlFor="barangay">Barangay</label>
          <select
            id="barangay"
            value={selectedBarangay}
            onChange={(e) => setSelectedBarangay(e.target.value)}
          >
            <option value="">Select Barangay</option>
            {barangays.map((barangay) => (
              <option key={barangay.code} value={barangay.code}>
                {barangay.name}
              </option>
            ))}
          </select>
        </div>

        {/* zip code input */}
        <div className="form-group">
          <label htmlFor="zipCode">Zip Code</label>
          <input
            id="zipCode"
            type="text"
            value={zipCode}
            onChange={(e) => setZipCode(e.target.value)}
            placeholder="e.g. 4000"
          />
        </div>

        {/* other address input (optional) */}
        <div className="form-group">
          <label htmlFor="otherAddress">Other Address (Optional)</label>
          <input
            id="otherAddress"
            type="text"
            value={otherAddress}
            onChange={(e) => setOtherAddress(e.target.value)}
            placeholder="e.g. Blk 12 Lot 4"
          />
        </div>

        {/* confirm button to show final output */}
        <button onClick={handleConfirm}>Confirm Address</button>
      </div>
    </div>
  );
}

export default AssignmentFour;
