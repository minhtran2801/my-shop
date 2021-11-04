import React, { useState } from "react";

const CategoryCheckbox = ({ categories, handleFilters }) => {
  const [checked, setChecked] = useState([]);

  const handleCheck = (category) => () => {
    const currentCategoryId = checked.indexOf(category);
    const newCheckCategoryId = [...checked];

    // If not exist, add category to state list
    // Else, delete it from the list
    if (currentCategoryId === -1) {
      newCheckCategoryId.push(category);
    } else {
      newCheckCategoryId.splice(currentCategoryId, 1);
    }
    setChecked(newCheckCategoryId);
    handleFilters(newCheckCategoryId);
  };

  return categories.map((category, i) => (
    <li key={i} className="category-li list-unstyled">
      <input
        type="checkbox"
        className="form-check-input"
        value={checked.indexOf(category._id) !== -1}
        onChange={handleCheck(category._id)}
      />
      <label className="form-check-label ps-2">{category.name}</label>
    </li>
  ));
};

export default CategoryCheckbox;
