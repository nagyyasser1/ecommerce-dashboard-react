import styles from "./styles/AddNewSubCatForm.module.css";

interface SubCat {
  id: string;
  name: string;
}

const AddNewSubCatForm = (subCategories: SubCat[]) => {
  return (
    <div>
      <form className={styles.addNewSubCatForm}>
        <input type="text" placeholder="sub-category'name" />
        <button>add</button>
      </form>
      <ul>
        {subCategories.map((subCat) => (
          <li>{subCat.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default AddNewSubCatForm;
