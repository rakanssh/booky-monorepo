import { AddItemSection } from "../../../components";

export default function AddBookSection() {
  return (
    <AddItemSection
      name="isbn"
      placeholder="ISBN"
      successMessage="Book added successfully"
      errorMessage="Failed to add book"
      validateFunction={(value) => value.length === 13 || value.length === 10}
    />
  );
}
