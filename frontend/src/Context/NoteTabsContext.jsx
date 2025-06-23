import { createContext, useContext, useState } from "react";

const NoteTabsContext = createContext();

export function NoteTabsProvider({ children }) {
  const [tabs, setTabs] = useState([]);
  const [activeNoteTab, setActiveNoteTab] = useState(null);

  const addNewTab = (tab) => {
    setTabs((prev) => [tab, ...prev]);
    setActiveNoteTab(tab.id);
  };

  const closeTab = (id) => {
    setTabs((prev) => prev.filter((tab) => tab.id !== id));
    setActiveNoteTab((prevActiveId) =>
      prevActiveId === id ? null : prevActiveId
    );
  };

  const updateTabTitle = (id, newTitle) => {
    setTabs((prevTabs) =>
      prevTabs.map((tab) => (tab.id === id ? { ...tab, title: newTitle } : tab))
    );
  };

  const updateTabNoteId = (tabId, noteId) => {
    setTabs((prevTabs) =>
      prevTabs.map((tab) => (tab.id === tabId ? { ...tab, noteId } : tab))
    );
  };

  const removeTab = (tabId) => {
    setTabs((prevTabs) => prevTabs.filter((tab) => tab.id !== tabId));

    // Jika tab yang dihapus adalah tab aktif, kosongkan activeNoteTab atau pindah ke tab lain
    setActiveNoteTab((prev) => (prev === tabId ? null : prev));
  };
  return(
    <NoteTabsContext.Provider
      value={{
        tabs,
        setTabs,
        activeNoteTab,
        setActiveNoteTab,
        addNewTab,
        updateTabTitle,
        closeTab,
        updateTabNoteId,
        removeTab,
      }}
    >
      {children}
    </NoteTabsContext.Provider>
  );
}

export function useNoteTabs() {
  return useContext(NoteTabsContext);
}
