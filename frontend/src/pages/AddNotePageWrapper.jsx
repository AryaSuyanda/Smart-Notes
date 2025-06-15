// AddNotePageWrapper.jsx
import { useParams } from "react-router-dom";
import AddNotePage from "./AddNotePage";

export default function AddNotePageWrapper() {
  const { tabId } = useParams();
  return <AddNotePage key={tabId} />;
}
