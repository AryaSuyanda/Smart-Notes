// AddNotePageWrapper.jsx
import { useParams } from "react-router-dom";
import AddNotePage from "../pages/AddNotePage";

export default function AddNotePageWrapper() {
  const { tabId } = useParams();
  return <AddNotePage key={tabId} />;
}
