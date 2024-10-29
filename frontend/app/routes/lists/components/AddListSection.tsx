import { AddItemSection } from "../../../components";

export default function AddListSection() {
  return (
    <AddItemSection
      name="name"
      placeholder="Reading list name"
      successMessage="Reading list created successfully"
      errorMessage="Failed to create reading list"
      validateFunction={(value) => value.length > 0}
    />
  );
}
